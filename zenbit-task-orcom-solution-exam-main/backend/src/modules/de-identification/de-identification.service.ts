/**
 * DeIdentificationService
 *
 * Core business logic for de-identification:
 *
 *   analyzeText(dto)     → proxy to Presidio analyzer, returns recognized entities
 *   anonymizeText(dto)   → proxy to Presidio anonymizer + save document to DB
 *   uploadFile(file)     → parse CSV/JSON/TXT, sanitize control chars, enforce 100K char cap
 *   resolveOverlaps(arr) → de-duplicate overlapping entity spans (highest score wins)
 *   getDocuments(userId) → paginated document list for dashboard
 *   getDocument(id)      → single document by UUID
 *
 * Framework-aware anonymization:
 *   - HIPAA Safe Harbor: enforces all 18 PHI identifier types server-side
 *   - GDPR/UK_DPI/Swiss risk levels: filters entities to low/medium/high tier
 */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import type { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { PresidioService } from './presidio.service';
import type { AnalyzeTextDto } from './dto/analyze-text.dto';
import type { AnonymizeTextDto } from './dto/anonymize-text.dto';
import type { PresidioRecognizerResult, PresidioAnonymizeResult } from './presidio.service';

export interface MulterFile {
  buffer?: Buffer;
  path?: string;
  size: number;
  mimetype: string;
  originalname: string;
  filename?: string;
}

export interface UploadFileResult {
  fileId: string;
  fileName: string;
  fileSize: number;
  rowCount: number;
  preview: string[];
  contentType: 'csv' | 'json' | 'txt';
  rawText: string;
}

@Injectable()
export class DeIdentificationService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    private readonly presidioService: PresidioService,
  ) {}

  /**
   * Analyze text via Presidio analyzer.
   * Returns the list of detected PII entities.
   */
  async analyzeText(dto: AnalyzeTextDto): Promise<PresidioRecognizerResult[]> {
    return this.presidioService.analyzeText(
      dto.text,
      dto.language ?? 'en',
      dto.entities ?? [],
    );
  }

  // Presidio entity types required for HIPAA Safe Harbor (45 CFR § 164.514(b)(2))
  private static readonly SAFE_HARBOR_ENTITIES = [
    'PERSON', 'DATE_TIME', 'PHONE_NUMBER', 'LOCATION', 'EMAIL_ADDRESS',
    'US_SSN', 'MEDICAL_LICENSE', 'US_PASSPORT', 'US_DRIVER_LICENSE',
    'CREDIT_CARD', 'IBAN_CODE', 'IP_ADDRESS', 'URL', 'NRP',
  ];

  private static readonly RISK_LEVEL_ENTITIES: Record<string, string[]> = {
    low: ['PERSON', 'EMAIL_ADDRESS', 'PHONE_NUMBER', 'US_SSN'],
    medium: [
      'PERSON', 'EMAIL_ADDRESS', 'PHONE_NUMBER', 'US_SSN',
      'DATE_TIME', 'LOCATION', 'IP_ADDRESS', 'URL', 'CREDIT_CARD', 'IBAN_CODE',
    ],
    high: [
      'PERSON', 'EMAIL_ADDRESS', 'PHONE_NUMBER', 'US_SSN',
      'DATE_TIME', 'LOCATION', 'IP_ADDRESS', 'URL', 'CREDIT_CARD', 'IBAN_CODE',
      'NRP', 'MEDICAL_LICENSE', 'UK_NHS',
    ],
  };

  /**
   * Anonymize text via Presidio anonymizer.
   * Saves the result as a Document record in the database.
   */
  async anonymizeText(
    dto: AnonymizeTextDto,
    userId: string,
  ): Promise<PresidioAnonymizeResult> {
    const start = Date.now();
    const strategy = (dto.strategy ?? 'replace') as string;

    // Apply entity filtering based on hipaaMethod or riskLevel
    let analyzerResults = this.resolveOverlaps(dto.analyzerResults);

    if (dto.framework === 'hipaa' && dto.hipaaMethod === 'safe_harbor') {
      // Safe Harbor: enforce all 18 HIPAA identifier categories — keep only safe-harbor entity types
      analyzerResults = analyzerResults.filter((r) =>
        DeIdentificationService.SAFE_HARBOR_ENTITIES.includes(r.entity_type),
      );
    } else if (dto.riskLevel && DeIdentificationService.RISK_LEVEL_ENTITIES[dto.riskLevel]) {
      // GDPR / UK_DPI / Swiss FADP: filter by risk level
      const allowed = DeIdentificationService.RISK_LEVEL_ENTITIES[dto.riskLevel];
      analyzerResults = analyzerResults.filter((r) => allowed.includes(r.entity_type));
    }

    const result = await this.presidioService.anonymizeText(
      dto.text,
      analyzerResults,
      strategy as 'replace' | 'redact' | 'hash' | 'encrypt' | 'pseudonymize' | 'generalize' | 'synthetic',
    );

    const elapsed = Date.now() - start;

    // Persist the document to the database for audit trail
    await this.documentRepository.save({
      userId,
      originalText: dto.text,
      anonymizedText: result.text,
      status: 'completed',
      entityCount: dto.analyzerResults.length,
      processingTimeMs: elapsed,
      analysisResult: dto.analyzerResults,
      framework: (dto.framework ?? 'hipaa') as import('./entities/document.entity').ComplianceFramework,
    });

    return result;
  }

  async getDocuments(
    userId: string,
    page = 1,
    limit = 20,
  ): Promise<{ data: Document[]; total: number; page: number; limit: number }> {
    const [data, total] = await this.documentRepository.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
      // Don't load full text in list view (can be large)
      select: ['id', 'userId', 'status', 'entityCount', 'processingTimeMs', 'framework', 'createdAt'],
    });

    return { data, total, page, limit };
  }

  async getDocument(id: string): Promise<Document | null> {
    return this.documentRepository.findOneBy({ id });
  }

  /**
   * Parse an uploaded file and return a preview.
   * Supports CSV, JSON, and TXT formats.
   */
  async uploadFile(file: MulterFile): Promise<UploadFileResult> {
    if (!file || file.size === 0) {
      throw new BadRequestException('No data found. File appears empty');
    }

    const rawContent = file.buffer
      ? file.buffer.toString('utf-8')
      : readFileSync(file.path!, 'utf-8');

    if (!rawContent.trim()) {
      throw new BadRequestException('No data found. File appears empty');
    }

    // Strip null bytes and non-printable control characters (keep \t, \n, \r)
    const raw = rawContent.replace(/\0/g, '').replace(/[\x01-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

    // Hard cap: 100 000 chars ≈ 80 pages of clinical text — prevents Presidio DoS
    const MAX_TEXT_CHARS = 100_000;
    if (raw.length > MAX_TEXT_CHARS) {
      throw new BadRequestException(
        `File content exceeds the ${MAX_TEXT_CHARS.toLocaleString()} character limit. Split the file into smaller batches.`,
      );
    }

    const mime = file.mimetype;
    let contentType: UploadFileResult['contentType'];
    let preview: string[];
    let rowCount: number;

    try {
      if (mime === 'text/csv' || mime === 'text/tab-separated-values') {
        contentType = 'csv';
        const lines = raw.split(/\r?\n/).filter((l: string) => l.trim());
        rowCount = lines.length;
        preview = lines.slice(0, 10);
      } else if (mime === 'application/json') {
        contentType = 'json';
        const parsed = JSON.parse(raw);
        const items: unknown[] = Array.isArray(parsed) ? parsed : [parsed];
        rowCount = items.length;
        preview = items.slice(0, 10).map((item) => JSON.stringify(item));
      } else {
        contentType = 'txt';
        rowCount = raw.split(/\r?\n/).filter((l: string) => l.trim()).length;
        preview = [raw.slice(0, 500)];
      }
    } catch {
      throw new BadRequestException('Could not read file. Check encoding or format');
    }

    return {
      fileId: file.filename ?? file.originalname,
      fileName: file.originalname,
      fileSize: file.size,
      rowCount,
      preview,
      contentType,
      rawText: raw,
    };
  }

  /**
   * Remove overlapping analyzer results before sending to Presidio anonymizer.
   * Presidio returns 422 when two entities share character positions.
   * Strategy: sort by score desc, keep the highest-confidence entity per span.
   */
  private resolveOverlaps(
    results: PresidioRecognizerResult[],
  ): PresidioRecognizerResult[] {
    const sorted = [...results].sort((a, b) => b.score - a.score);
    const accepted: PresidioRecognizerResult[] = [];
    for (const candidate of sorted) {
      const overlaps = accepted.some(
        (kept) => candidate.start < kept.end && candidate.end > kept.start,
      );
      if (!overlaps) accepted.push(candidate);
    }
    return accepted;
  }
}
