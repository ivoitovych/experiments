import { Test } from '@nestjs/testing';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JobsService } from './jobs.service';
import { Job, JobStatus } from './entities/job.entity';
import { Document } from './entities/document.entity';
import { PresidioService } from './presidio.service';
import type { PresidioRecognizerResult, PresidioAnonymizeResult } from './presidio.service';

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const USER_ID = 'user-uuid-1';
const OTHER_USER_ID = 'user-uuid-2';
const JOB_ID = 'job-uuid-1';
const DOC_ID = 'doc-uuid-1';

const makeJob = (overrides: Partial<Job> = {}): Job =>
  ({
    id: JOB_ID,
    userId: USER_ID,
    status: JobStatus.DRAFT,
    currentStep: 1,
    wizardState: null,
    progress: 0,
    documentId: null,
    error: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }) as Job;

const analysisResult: PresidioRecognizerResult[] = [
  { entity_type: 'PERSON', start: 8, end: 18, score: 0.9 },
  { entity_type: 'US_SSN', start: 25, end: 36, score: 0.95 },
];

const anonymizeResult: PresidioAnonymizeResult = {
  text: 'Patient <PERSON> SSN: <US_SSN>',
  items: [
    { operator: 'replace', entity_type: 'PERSON', start: 8, end: 16, text: '<PERSON>' },
    { operator: 'replace', entity_type: 'US_SSN', start: 22, end: 30, text: '<US_SSN>' },
  ],
};

// ─── Mocks ────────────────────────────────────────────────────────────────────

const mockJobRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
};

const mockDocumentRepository = {
  save: jest.fn(),
};

const mockPresidioService = {
  analyzeText: jest.fn(),
  anonymizeText: jest.fn(),
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('JobsService', () => {
  let service: JobsService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        JobsService,
        { provide: getRepositoryToken(Job), useValue: mockJobRepository },
        { provide: getRepositoryToken(Document), useValue: mockDocumentRepository },
        { provide: PresidioService, useValue: mockPresidioService },
      ],
    }).compile();

    service = module.get(JobsService);
  });

  // ─── createJob ────────────────────────────────────────────────────────────

  describe('createJob', () => {
    it('should create a DRAFT job and persist it', async () => {
      const job = makeJob();
      mockJobRepository.create.mockReturnValue(job);
      mockJobRepository.save.mockResolvedValue(job);

      const result = await service.createJob(USER_ID, {});

      expect(mockJobRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ userId: USER_ID, status: JobStatus.DRAFT }),
      );
      expect(mockJobRepository.save).toHaveBeenCalledWith(job);
      expect(result).toBe(job);
    });

    it('should seed wizardState with framework when provided', async () => {
      const job = makeJob({ wizardState: { framework: 'hipaa' } });
      mockJobRepository.create.mockReturnValue(job);
      mockJobRepository.save.mockResolvedValue(job);

      await service.createJob(USER_ID, { framework: 'hipaa' });

      expect(mockJobRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ wizardState: { framework: 'hipaa' } }),
      );
    });

    it('should set wizardState to null when no framework given', async () => {
      const job = makeJob();
      mockJobRepository.create.mockReturnValue(job);
      mockJobRepository.save.mockResolvedValue(job);

      await service.createJob(USER_ID, {});

      expect(mockJobRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ wizardState: null }),
      );
    });
  });

  // ─── getJobs ──────────────────────────────────────────────────────────────

  describe('getJobs', () => {
    it('should return all jobs for a user ordered by updatedAt DESC', async () => {
      const jobs = [makeJob(), makeJob({ id: 'job-2' })];
      mockJobRepository.find.mockResolvedValue(jobs);

      const result = await service.getJobs(USER_ID);

      expect(mockJobRepository.find).toHaveBeenCalledWith({
        where: { userId: USER_ID },
        order: { updatedAt: 'DESC' },
      });
      expect(result).toBe(jobs);
    });
  });

  // ─── getJob ───────────────────────────────────────────────────────────────

  describe('getJob', () => {
    it('should return the job when it exists and belongs to the user', async () => {
      const job = makeJob();
      mockJobRepository.findOne.mockResolvedValue(job);

      const result = await service.getJob(JOB_ID, USER_ID);

      expect(mockJobRepository.findOne).toHaveBeenCalledWith({ where: { id: JOB_ID } });
      expect(result).toBe(job);
    });

    it('should throw NotFoundException when job does not exist', async () => {
      mockJobRepository.findOne.mockResolvedValue(null);

      await expect(service.getJob(JOB_ID, USER_ID)).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException when job belongs to a different user', async () => {
      const job = makeJob({ userId: OTHER_USER_ID });
      mockJobRepository.findOne.mockResolvedValue(job);

      await expect(service.getJob(JOB_ID, USER_ID)).rejects.toThrow(ForbiddenException);
    });
  });

  // ─── updateJob ────────────────────────────────────────────────────────────

  describe('updateJob', () => {
    it('should update currentStep and save', async () => {
      const job = makeJob();
      mockJobRepository.findOne.mockResolvedValue(job);
      mockJobRepository.save.mockResolvedValue({ ...job, currentStep: 2 });

      await service.updateJob(JOB_ID, USER_ID, { currentStep: 2 });

      expect(mockJobRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ currentStep: 2 }),
      );
    });

    it('should merge wizardState (partial update)', async () => {
      const job = makeJob({ wizardState: { framework: 'hipaa', inputText: 'old' } });
      mockJobRepository.findOne.mockResolvedValue(job);
      mockJobRepository.save.mockResolvedValue(job);

      await service.updateJob(JOB_ID, USER_ID, { wizardState: { inputText: 'new' } });

      expect(mockJobRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          wizardState: { framework: 'hipaa', inputText: 'new' },
        }),
      );
    });

    it('should allow DRAFT → CONFIGURED status transition', async () => {
      const job = makeJob({ status: JobStatus.DRAFT });
      mockJobRepository.findOne.mockResolvedValue(job);
      mockJobRepository.save.mockResolvedValue({ ...job, status: JobStatus.CONFIGURED });

      await service.updateJob(JOB_ID, USER_ID, { status: JobStatus.CONFIGURED });

      expect(mockJobRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ status: JobStatus.CONFIGURED }),
      );
    });

    it('should allow CONFIGURED → DRAFT status transition', async () => {
      const job = makeJob({ status: JobStatus.CONFIGURED });
      mockJobRepository.findOne.mockResolvedValue(job);
      mockJobRepository.save.mockResolvedValue({ ...job, status: JobStatus.DRAFT });

      await service.updateJob(JOB_ID, USER_ID, { status: JobStatus.DRAFT });

      expect(mockJobRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ status: JobStatus.DRAFT }),
      );
    });

    it('should throw BadRequestException on invalid status transition (DRAFT → SUCCEEDED)', async () => {
      const job = makeJob({ status: JobStatus.DRAFT });
      mockJobRepository.findOne.mockResolvedValue(job);

      await expect(
        service.updateJob(JOB_ID, USER_ID, { status: JobStatus.SUCCEEDED as any }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should not modify status when dto.status equals current status', async () => {
      const job = makeJob({ status: JobStatus.DRAFT });
      mockJobRepository.findOne.mockResolvedValue(job);
      mockJobRepository.save.mockResolvedValue(job);

      await service.updateJob(JOB_ID, USER_ID, { status: JobStatus.DRAFT });

      // save still called but status unchanged
      expect(mockJobRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ status: JobStatus.DRAFT }),
      );
    });
  });

  // ─── runJob ───────────────────────────────────────────────────────────────

  describe('runJob', () => {
    const configuredJob = makeJob({
      status: JobStatus.CONFIGURED,
      wizardState: {
        inputText: 'Patient John Doe SSN: 523-45-6789',
        language: 'en',
        entities: ['PERSON', 'US_SSN'],
        strategy: 'replace',
        framework: 'hipaa',
      },
    });

    const savedDoc: Document = {
      id: DOC_ID,
      userId: USER_ID,
      originalText: configuredJob.wizardState!.inputText as string,
      anonymizedText: anonymizeResult.text,
      status: 'completed',
      entityCount: analysisResult.length,
      framework: 'hipaa',
      analysisResult,
      processingTimeMs: null,
      createdAt: new Date(),
    } as unknown as Document;

    beforeEach(() => {
      mockJobRepository.findOne.mockResolvedValue({ ...configuredJob });
      mockJobRepository.save.mockImplementation((job: Partial<Job>) => Promise.resolve(job));
      mockPresidioService.analyzeText.mockResolvedValue(analysisResult);
      mockPresidioService.anonymizeText.mockResolvedValue(anonymizeResult);
      mockDocumentRepository.save.mockResolvedValue(savedDoc);
    });

    it('should throw BadRequestException when job status is not CONFIGURED', async () => {
      mockJobRepository.findOne.mockResolvedValue(makeJob({ status: JobStatus.DRAFT }));

      await expect(service.runJob(JOB_ID, USER_ID)).rejects.toThrow(BadRequestException);
      await expect(service.runJob(JOB_ID, USER_ID)).rejects.toThrow('"configured" status');
    });

    it('should throw BadRequestException when wizardState has no inputText', async () => {
      mockJobRepository.findOne.mockResolvedValue(
        makeJob({ status: JobStatus.CONFIGURED, wizardState: { framework: 'hipaa' } }),
      );

      await expect(service.runJob(JOB_ID, USER_ID)).rejects.toThrow(BadRequestException);
      await expect(service.runJob(JOB_ID, USER_ID)).rejects.toThrow('no input text');
    });

    it('should transition CONFIGURED → QUEUED → PROCESSING before calling Presidio', async () => {
      const statusLog: JobStatus[] = [];
      mockJobRepository.save.mockImplementation((job: Partial<Job>) => {
        if (job.status) statusLog.push(job.status);
        return Promise.resolve(job);
      });

      await service.runJob(JOB_ID, USER_ID);

      expect(statusLog[0]).toBe(JobStatus.QUEUED);
      expect(statusLog[1]).toBe(JobStatus.PROCESSING);
    });

    it('should call presidio.analyzeText with text, language and entities from wizardState', async () => {
      await service.runJob(JOB_ID, USER_ID);

      expect(mockPresidioService.analyzeText).toHaveBeenCalledWith(
        'Patient John Doe SSN: 523-45-6789',
        'en',
        ['PERSON', 'US_SSN'],
      );
    });

    it('should set progress to 50 after analyze and save', async () => {
      const progressLog: number[] = [];
      mockJobRepository.save.mockImplementation((job: Partial<Job>) => {
        if (job.progress !== undefined) progressLog.push(job.progress);
        return Promise.resolve(job);
      });

      await service.runJob(JOB_ID, USER_ID);

      expect(progressLog).toContain(50);
    });

    it('should call presidio.anonymizeText with analyzeResult and strategy', async () => {
      await service.runJob(JOB_ID, USER_ID);

      expect(mockPresidioService.anonymizeText).toHaveBeenCalledWith(
        'Patient John Doe SSN: 523-45-6789',
        analysisResult,
        'replace',
      );
    });

    it('should save a Document with originalText, anonymizedText, analysisResult', async () => {
      await service.runJob(JOB_ID, USER_ID);

      expect(mockDocumentRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: USER_ID,
          originalText: 'Patient John Doe SSN: 523-45-6789',
          anonymizedText: anonymizeResult.text,
          analysisResult,
          entityCount: analysisResult.length,
          framework: 'hipaa',
        }),
      );
    });

    it('should end with status SUCCEEDED, progress 100 and documentId set', async () => {
      const result = await service.runJob(JOB_ID, USER_ID);

      expect(result.status).toBe(JobStatus.SUCCEEDED);
      expect(result.progress).toBe(100);
      expect(result.documentId).toBe(DOC_ID);
      expect(result.error).toBeNull();
    });

    it('should transition to FAILED and persist error when Presidio analyze throws', async () => {
      mockPresidioService.analyzeText.mockRejectedValue(new Error('Presidio unavailable'));

      const result = await service.runJob(JOB_ID, USER_ID);

      expect(result.status).toBe(JobStatus.FAILED);
      expect(result.error).toMatchObject({
        code: 'PROCESSING_ERROR',
        message: 'Presidio unavailable',
      });
    });

    it('should transition to FAILED when anonymizeText throws', async () => {
      mockPresidioService.anonymizeText.mockRejectedValue(new Error('Anonymizer down'));

      const result = await service.runJob(JOB_ID, USER_ID);

      expect(result.status).toBe(JobStatus.FAILED);
      expect(result.error?.message).toBe('Anonymizer down');
    });

    it('should not create a document when processing fails', async () => {
      mockPresidioService.analyzeText.mockRejectedValue(new Error('boom'));

      await service.runJob(JOB_ID, USER_ID);

      expect(mockDocumentRepository.save).not.toHaveBeenCalled();
    });

    it('should default language to "en" when not in wizardState', async () => {
      mockJobRepository.findOne.mockResolvedValue(
        makeJob({
          status: JobStatus.CONFIGURED,
          wizardState: { inputText: 'Some text', entities: [], strategy: 'replace' },
        }),
      );

      await service.runJob(JOB_ID, USER_ID);

      expect(mockPresidioService.analyzeText).toHaveBeenCalledWith(
        'Some text',
        'en',
        [],
      );
    });

    it('should default strategy to "replace" when not in wizardState', async () => {
      mockJobRepository.findOne.mockResolvedValue(
        makeJob({
          status: JobStatus.CONFIGURED,
          wizardState: { inputText: 'Some text', language: 'en', entities: [] },
        }),
      );

      await service.runJob(JOB_ID, USER_ID);

      expect(mockPresidioService.anonymizeText).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Array),
        'replace',
      );
    });
  });
});
