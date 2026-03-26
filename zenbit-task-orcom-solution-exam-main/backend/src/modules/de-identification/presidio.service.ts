/**
 * PresidioService
 *
 * HTTP client for Microsoft Presidio's two microservices:
 *   - presidio-analyzer  (port 5001): detects PII entities in text
 *   - presidio-anonymizer (port 5002): replaces detected entities
 *
 * Both services run as Docker containers (see docker-compose.yml).
 *
 * Presidio Analyzer API:
 *   POST /analyze
 *   Body: { text, language, entities?, score_threshold? }
 *   Returns: RecognizerResult[] = [{ entity_type, start, end, score }]
 *
 * Presidio Anonymizer API:
 *   POST /anonymize
 *   Body: {
 *     text,
 *     analyzer_results: RecognizerResult[],
 *     anonymizers: {
 *       [entity_type]: { type: "replace" | "redact" | "hash" | "encrypt", ... }
 *     }
 *   }
 *   Returns: { text: string, items: AnonymizedItem[] }
 *
 * Docs: https://microsoft.github.io/presidio/api/
 */
import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, timeout } from 'rxjs';
import type { AxiosError } from 'axios';

// ─── Presidio response types ──────────────────────────────────────────────────

export interface PresidioRecognizerResult {
  entity_type: string;
  start: number;
  end: number;
  score: number;
}

export interface PresidioAnonymizedItem {
  operator: string;
  entity_type: string;
  start: number;
  end: number;
  text: string;  // replacement value
}

export interface PresidioAnonymizeResult {
  text: string;                       // full anonymized text
  items: PresidioAnonymizedItem[];    // list of replacements
}

// ─── Anonymizer operator configs ─────────────────────────────────────────────
// Presidio supports these operator types with their specific options:

interface ReplaceOperator {
  type: 'replace';
  new_value: string;  // e.g. "<PERSON>"
}

interface RedactOperator {
  type: 'redact';
}

interface HashOperator {
  type: 'hash';
  hash_type: 'sha256' | 'sha512' | 'md5';
}

interface EncryptOperator {
  type: 'encrypt';
  key: string;  // encryption key
}

type AnonymizerOperator = ReplaceOperator | RedactOperator | HashOperator | EncryptOperator;

@Injectable()
export class PresidioService {
  private readonly logger = new Logger(PresidioService.name);
  private readonly analyzerUrl: string;
  private readonly anonymizerUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.analyzerUrl = this.configService.get<string>('presidio.analyzerUrl') ?? 'http://localhost:5001';
    this.anonymizerUrl = this.configService.get<string>('presidio.anonymizerUrl') ?? 'http://localhost:5002';
  }

  /**
   * Analyze text for PII entities.
   *
   * @param text - The clinical text to analyze
   * @param language - ISO 639-1 language code (e.g. 'en')
   * @param entities - Optional list of entity types to detect. If empty, all are detected.
   * @param scoreThreshold - Minimum confidence score (0–1). Default 0.5.
   */
  async analyzeText(
    text: string,
    language = 'en',
    entities: string[] = [],
    scoreThreshold = 0.5,
  ): Promise<PresidioRecognizerResult[]> {
    this.logger.debug(`Analyzing ${text.length} chars in ${language}`, { entities });

    const payload: Record<string, unknown> = {
      text,
      language,
      score_threshold: scoreThreshold,
    };

    // Only send entities array if non-empty (empty means detect all)
    if (entities.length > 0) {
      payload.entities = entities;
    }

    try {
      const response = await firstValueFrom(
        this.httpService
          .post<PresidioRecognizerResult[]>(`${this.analyzerUrl}/analyze`, payload)
          .pipe(timeout(30_000)), // 30s timeout — Presidio ML can be slow on cold start
      );
      this.logger.debug(`Found ${response.data.length} entities`);
      return response.data;
    } catch (err: unknown) {
      this.handlePresidioError(err, 'analyzer');
    }
  }

  /**
   * Anonymize text using the results from analyzeText().
   *
   * The anonymizers map specifies the operator for each entity type.
   * If an entity type is not in the map, Presidio uses the DEFAULT operator.
   *
   * @param text - The original text
   * @param analyzerResults - Output from analyzeText()
   * @param strategy - 'replace' | 'redact' | 'hash' | 'encrypt'
   */
  async anonymizeText(
    text: string,
    analyzerResults: PresidioRecognizerResult[],
    strategy: 'replace' | 'redact' | 'hash' | 'encrypt' | 'pseudonymize' | 'generalize' | 'synthetic' = 'replace',
  ): Promise<PresidioAnonymizeResult> {
    this.logger.debug(`Anonymizing ${analyzerResults.length} entities with strategy: ${strategy}`);

    // Build per-entity-type operators so each replacement shows the actual type name.
    // Presidio does NOT support template substitution in new_value — must be explicit.
    // e.g. PERSON → <PERSON>, EMAIL_ADDRESS → <EMAIL_ADDRESS>
    const uniqueTypes = [...new Set(analyzerResults.map((r) => r.entity_type))];
    const anonymizers: Record<string, AnonymizerOperator> = {
      DEFAULT: this.buildOperatorForEntity('ENTITY', strategy),
    };
    for (const entityType of uniqueTypes) {
      anonymizers[entityType] = this.buildOperatorForEntity(entityType, strategy);
    }

    const payload = {
      text,
      analyzer_results: analyzerResults,
      anonymizers,
    };

    try {
      const response = await firstValueFrom(
        this.httpService
          .post<PresidioAnonymizeResult>(`${this.anonymizerUrl}/anonymize`, payload)
          .pipe(timeout(30_000)),
      );
      return response.data;
    } catch (err: unknown) {
      this.handlePresidioError(err, 'anonymizer');
    }
  }

  /**
   * Check if both Presidio services are reachable.
   * Used by the health check endpoint.
   */
  async healthCheck(): Promise<{ analyzer: boolean; anonymizer: boolean }> {
    const check = async (url: string): Promise<boolean> => {
      try {
        await firstValueFrom(
          this.httpService.get(`${url}/health`).pipe(timeout(5_000)),
        );
        return true;
      } catch {
        return false;
      }
    };

    const [analyzer, anonymizer] = await Promise.all([
      check(this.analyzerUrl),
      check(this.anonymizerUrl),
    ]);

    return { analyzer, anonymizer };
  }

  // ─── Private helpers ────────────────────────────────────────────────────────

  private buildOperatorForEntity(entityType: string, strategy: string): AnonymizerOperator {
    switch (strategy) {
      case 'redact':
        return { type: 'redact' };
      case 'hash':
        return { type: 'hash', hash_type: 'sha256' };
      case 'encrypt':
        return {
          type: 'encrypt',
          key: this.configService.get<string>('encryption.key') ?? '0000000000000000',
        };
      case 'pseudonymize':
        return { type: 'replace', new_value: `<${entityType}_PSEUDO>` };
      case 'generalize':
        return { type: 'replace', new_value: `<${entityType}_GENERALIZED>` };
      default: // 'replace' | 'synthetic'
        return { type: 'replace', new_value: `<${entityType}>` };
    }
  }

  private handlePresidioError(err: unknown, service: string): never {
    const axiosErr = err as AxiosError;
    if (axiosErr.code === 'ECONNREFUSED' || axiosErr.code === 'ERR_CANCELED') {
      this.logger.error(`Presidio ${service} is unreachable at configured URL`);
      throw new ServiceUnavailableException(
        `Presidio ${service} is unavailable. Ensure the Docker container is running.`,
      );
    }
    this.logger.error(`Presidio ${service} error: ${axiosErr.message}`);
    throw new ServiceUnavailableException(`Presidio ${service} returned an error`);
  }
}
