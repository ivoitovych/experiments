/**
 * JobsService
 *
 * Manages the wizard job lifecycle:
 *   - CRUD operations (create, findAll, findOne, update)
 *   - Status transition validation (ALLOWED_STATUS_TRANSITIONS)
 *   - runJob() pipeline: analyze text → anonymize → save document → update status
 *
 * The runJob method orchestrates the full Presidio pipeline:
 *   1. Sets status to QUEUED → PROCESSING
 *   2. Calls DeIdentificationService.analyzeText (Presidio analyzer)
 *   3. Calls DeIdentificationService.anonymizeText (Presidio anonymizer + document save)
 *   4. Sets status to SUCCEEDED (or FAILED on error)
 */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Job, JobStatus } from './entities/job.entity';
import { Document } from './entities/document.entity';
import { PresidioService } from './presidio.service';
import type { CreateJobDto } from './dto/create-job.dto';
import type { UpdateJobDto } from './dto/update-job.dto';
import { ALLOWED_STATUS_TRANSITIONS } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    private readonly presidioService: PresidioService,
  ) {}

  async createJob(userId: string, dto: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create({
      userId,
      status: JobStatus.DRAFT,
      currentStep: 1,
      wizardState: dto.framework ? { framework: dto.framework } : null,
    });
    return this.jobRepository.save(job);
  }

  async getJobs(userId: string): Promise<Job[]> {
    return this.jobRepository.find({
      where: { userId },
      order: { updatedAt: 'DESC' },
    });
  }

  async getJob(jobId: string, userId: string): Promise<Job> {
    const job = await this.jobRepository.findOne({ where: { id: jobId } });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    if (job.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    return job;
  }

  async updateJob(jobId: string, userId: string, dto: UpdateJobDto): Promise<Job> {
    const job = await this.getJob(jobId, userId);

    if (dto.status && dto.status !== job.status) {
      const allowed = ALLOWED_STATUS_TRANSITIONS[job.status];
      if (!allowed || !allowed.includes(dto.status)) {
        throw new BadRequestException(
          `Cannot transition from ${job.status} to ${dto.status}`,
        );
      }
      job.status = dto.status;
    }

    if (dto.currentStep !== undefined) {
      job.currentStep = dto.currentStep;
    }

    if (dto.wizardState !== undefined) {
      job.wizardState = { ...job.wizardState, ...dto.wizardState };
    }

    return this.jobRepository.save(job);
  }

  async runJob(jobId: string, userId: string): Promise<Job> {
    const job = await this.getJob(jobId, userId);

    if (job.status !== JobStatus.CONFIGURED) {
      throw new BadRequestException(
        `Job must be in "configured" status to run. Current status: ${job.status}`,
      );
    }

    const wizardState = job.wizardState ?? {};
    const inputText: string | undefined = wizardState.inputText;

    if (!inputText) {
      throw new BadRequestException('Job has no input text configured');
    }

    if (inputText.length > 100_000) {
      throw new BadRequestException(
        'Input text exceeds the 100,000 character limit. Split the text into smaller batches.',
      );
    }

    // Transition: CONFIGURED → QUEUED
    job.status = JobStatus.QUEUED;
    job.progress = 0;
    await this.jobRepository.save(job);

    // Transition: QUEUED → PROCESSING
    job.status = JobStatus.PROCESSING;
    await this.jobRepository.save(job);

    try {
      // Step 1: Analyze
      const language = (wizardState.language as string) ?? 'en';
      const entities = (wizardState.entities as string[]) ?? [];
      const minScore = (wizardState.minScore as number) ?? 0.5;
      const analysisResult = await this.presidioService.analyzeText(
        inputText,
        language,
        entities,
        minScore,
      );

      job.progress = 50;
      await this.jobRepository.save(job);

      // Step 2: Anonymize
      const strategy = (wizardState.strategy ?? 'replace') as
        | 'replace'
        | 'redact'
        | 'hash'
        | 'encrypt';
      const anonymizeResult = await this.presidioService.anonymizeText(
        inputText,
        analysisResult,
        strategy,
      );

      job.progress = 75;
      await this.jobRepository.save(job);

      // Step 3: Save document
      const document = await this.documentRepository.save({
        userId,
        originalText: inputText,
        anonymizedText: anonymizeResult.text,
        status: 'completed' as const,
        entityCount: analysisResult.length,
        framework: (wizardState.framework as any) ?? 'hipaa',
        analysisResult,
      });

      // Step 4: Mark succeeded
      job.progress = 100;
      job.status = JobStatus.SUCCEEDED;
      job.documentId = document.id;
      job.error = null;
      return this.jobRepository.save(job);
    } catch (err) {
      this.logger.error(`Job ${jobId} failed: ${(err as Error).message}`);
      job.status = JobStatus.FAILED;
      job.error = {
        code: 'PROCESSING_ERROR',
        message: (err as Error).message,
      };
      return this.jobRepository.save(job);
    }
  }
}
