import { Test } from '@nestjs/testing';
import { ServiceUnavailableException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of, throwError } from 'rxjs';
import { PresidioService } from './presidio.service';
import type {
  PresidioRecognizerResult,
  PresidioAnonymizeResult,
} from './presidio.service';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const analyzerResults: PresidioRecognizerResult[] = [
  { entity_type: 'PERSON', start: 0, end: 10, score: 0.9 },
  { entity_type: 'EMAIL_ADDRESS', start: 20, end: 40, score: 0.85 },
];

const anonymizeResult: PresidioAnonymizeResult = {
  text: '<PERSON> was treated at hospital',
  items: [
    { operator: 'replace', entity_type: 'PERSON', start: 0, end: 8, text: '<PERSON>' },
  ],
};

// ─── Mocks ────────────────────────────────────────────────────────────────────

const mockHttpService = {
  post: jest.fn(),
  get: jest.fn(),
};

const mockConfigService = {
  get: jest.fn((key: string) => {
    if (key === 'presidio.analyzerUrl') return 'http://analyzer:5001';
    if (key === 'presidio.anonymizerUrl') return 'http://anonymizer:5002';
    if (key === 'encryption.key') return 'test16charkeys!';
    return undefined;
  }),
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('PresidioService', () => {
  let service: PresidioService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        PresidioService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get(PresidioService);
  });

  // ─── analyzeText ─────────────────────────────────────────────────────────

  describe('analyzeText', () => {
    it('should POST to analyzer /analyze and return results', async () => {
      mockHttpService.post.mockReturnValue(of({ data: analyzerResults }));

      const results = await service.analyzeText('John Doe was treated at hospital');

      expect(mockHttpService.post).toHaveBeenCalledWith(
        'http://analyzer:5001/analyze',
        expect.objectContaining({ text: 'John Doe was treated at hospital', language: 'en' }),
      );
      expect(results).toEqual(analyzerResults);
    });

    it('should include entities in payload when provided', async () => {
      mockHttpService.post.mockReturnValue(of({ data: analyzerResults }));

      await service.analyzeText('text', 'en', ['PERSON', 'EMAIL_ADDRESS']);

      const [, payload] = mockHttpService.post.mock.calls[0];
      expect(payload.entities).toEqual(['PERSON', 'EMAIL_ADDRESS']);
    });

    it('should NOT include entities key when array is empty', async () => {
      mockHttpService.post.mockReturnValue(of({ data: analyzerResults }));

      await service.analyzeText('text', 'en', []);

      const [, payload] = mockHttpService.post.mock.calls[0];
      expect(payload).not.toHaveProperty('entities');
    });

    it('should use provided score_threshold', async () => {
      mockHttpService.post.mockReturnValue(of({ data: [] }));

      await service.analyzeText('text', 'en', [], 0.8);

      const [, payload] = mockHttpService.post.mock.calls[0];
      expect(payload.score_threshold).toBe(0.8);
    });

    it('should throw ServiceUnavailableException on ECONNREFUSED', async () => {
      const error = Object.assign(new Error('connect ECONNREFUSED'), { code: 'ECONNREFUSED' });
      mockHttpService.post.mockReturnValue(throwError(() => error));

      await expect(service.analyzeText('text')).rejects.toThrow(ServiceUnavailableException);
    });

    it('should throw ServiceUnavailableException on timeout (ERR_CANCELED)', async () => {
      const error = Object.assign(new Error('timeout'), { code: 'ERR_CANCELED' });
      mockHttpService.post.mockReturnValue(throwError(() => error));

      await expect(service.analyzeText('text')).rejects.toThrow(ServiceUnavailableException);
    });
  });

  // ─── anonymizeText ────────────────────────────────────────────────────────

  describe('anonymizeText', () => {
    it('should POST to anonymizer /anonymize with replace operator by default', async () => {
      mockHttpService.post.mockReturnValue(of({ data: anonymizeResult }));

      const result = await service.anonymizeText('John Doe', analyzerResults);

      expect(mockHttpService.post).toHaveBeenCalledWith(
        'http://anonymizer:5002/anonymize',
        expect.objectContaining({
          text: 'John Doe',
          analyzer_results: analyzerResults,
          anonymizers: {
            DEFAULT: { type: 'replace', new_value: '<{{entity_type}}>' },
          },
        }),
      );
      expect(result).toEqual(anonymizeResult);
    });

    it('should send redact operator when strategy is redact', async () => {
      mockHttpService.post.mockReturnValue(of({ data: anonymizeResult }));

      await service.anonymizeText('text', analyzerResults, 'redact');

      const [, payload] = mockHttpService.post.mock.calls[0];
      expect(payload.anonymizers.DEFAULT).toEqual({ type: 'redact' });
    });

    it('should send hash operator with sha256 when strategy is hash', async () => {
      mockHttpService.post.mockReturnValue(of({ data: anonymizeResult }));

      await service.anonymizeText('text', analyzerResults, 'hash');

      const [, payload] = mockHttpService.post.mock.calls[0];
      expect(payload.anonymizers.DEFAULT).toEqual({ type: 'hash', hash_type: 'sha256' });
    });

    it('should send encrypt operator with key from config when strategy is encrypt', async () => {
      mockHttpService.post.mockReturnValue(of({ data: anonymizeResult }));

      await service.anonymizeText('text', analyzerResults, 'encrypt');

      const [, payload] = mockHttpService.post.mock.calls[0];
      expect(payload.anonymizers.DEFAULT).toEqual({
        type: 'encrypt',
        key: 'test16charkeys!',
      });
    });

    it('should throw ServiceUnavailableException when anonymizer is unreachable', async () => {
      const error = Object.assign(new Error('ECONNREFUSED'), { code: 'ECONNREFUSED' });
      mockHttpService.post.mockReturnValue(throwError(() => error));

      await expect(
        service.anonymizeText('text', analyzerResults),
      ).rejects.toThrow(ServiceUnavailableException);
    });
  });

  // ─── healthCheck ──────────────────────────────────────────────────────────

  describe('healthCheck', () => {
    it('should return true for both services when they respond', async () => {
      mockHttpService.get.mockReturnValue(of({ data: 'ok' }));

      const result = await service.healthCheck();

      expect(result.analyzer).toBe(true);
      expect(result.anonymizer).toBe(true);
    });

    it('should return false for analyzer when it is unreachable', async () => {
      mockHttpService.get.mockImplementation((url: string) => {
        if (url.includes('5001')) return throwError(() => new Error('ECONNREFUSED'));
        return of({ data: 'ok' });
      });

      const result = await service.healthCheck();

      expect(result.analyzer).toBe(false);
      expect(result.anonymizer).toBe(true);
    });

    it('should return false for anonymizer when it is unreachable', async () => {
      mockHttpService.get.mockImplementation((url: string) => {
        if (url.includes('5002')) return throwError(() => new Error('ECONNREFUSED'));
        return of({ data: 'ok' });
      });

      const result = await service.healthCheck();

      expect(result.analyzer).toBe(true);
      expect(result.anonymizer).toBe(false);
    });

    it('should return false for both when both are unreachable', async () => {
      mockHttpService.get.mockReturnValue(throwError(() => new Error('ECONNREFUSED')));

      const result = await service.healthCheck();

      expect(result.analyzer).toBe(false);
      expect(result.anonymizer).toBe(false);
    });
  });
});
