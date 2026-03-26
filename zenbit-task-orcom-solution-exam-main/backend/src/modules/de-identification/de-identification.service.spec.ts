import { Test } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeIdentificationService } from './de-identification.service';
import type { MulterFile } from './de-identification.service';
import { Document } from './entities/document.entity';
import { PresidioService } from './presidio.service';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const makeFile = (overrides: Partial<MulterFile> & { content?: string } = {}): MulterFile => {
  const { content = 'hello', ...rest } = overrides;
  const buf = Buffer.from(content, 'utf-8');
  return {
    buffer: buf,
    size: buf.length,
    mimetype: 'text/plain',
    originalname: 'test.txt',
    filename: 'stored-test.txt',
    ...rest,
  };
};

const makeCsvFile = (rows: string[]): MulterFile =>
  makeFile({ content: rows.join('\n'), mimetype: 'text/csv', originalname: 'data.csv' });

const makeJsonFile = (data: unknown): MulterFile =>
  makeFile({
    content: JSON.stringify(data),
    mimetype: 'application/json',
    originalname: 'data.json',
  });

// ─── Mocks ────────────────────────────────────────────────────────────────────

const mockDocumentRepository = {
  save: jest.fn(),
  findAndCount: jest.fn(),
  findOneBy: jest.fn(),
};

const mockPresidioService = {
  analyzeText: jest.fn(),
  anonymizeText: jest.fn(),
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('DeIdentificationService — uploadFile', () => {
  let service: DeIdentificationService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        DeIdentificationService,
        { provide: getRepositoryToken(Document), useValue: mockDocumentRepository },
        { provide: PresidioService, useValue: mockPresidioService },
      ],
    }).compile();

    service = module.get(DeIdentificationService);
  });

  // ─── Empty file validation ─────────────────────────────────────────────────

  describe('empty file validation', () => {
    it('should throw 400 when file size is 0', async () => {
      const file = makeFile({ content: '', size: 0 });

      await expect(service.uploadFile(file)).rejects.toThrow(BadRequestException);
      await expect(service.uploadFile(file)).rejects.toThrow('No data found. File appears empty');
    });

    it('should throw 400 when buffer contains only whitespace', async () => {
      const file = makeFile({ content: '   \n\n\t  ' });

      await expect(service.uploadFile(file)).rejects.toThrow(BadRequestException);
      await expect(service.uploadFile(file)).rejects.toThrow('No data found. File appears empty');
    });
  });

  // ─── TXT ──────────────────────────────────────────────────────────────────

  describe('TXT files', () => {
    it('should return contentType txt', async () => {
      const file = makeFile({ content: 'Patient data here.' });

      const result = await service.uploadFile(file);

      expect(result.contentType).toBe('txt');
    });

    it('should return first 500 characters as preview[0]', async () => {
      const content = 'A'.repeat(1000);
      const file = makeFile({ content });

      const result = await service.uploadFile(file);

      expect(result.preview).toHaveLength(1);
      expect(result.preview[0]).toBe('A'.repeat(500));
    });

    it('should return full content when shorter than 500 chars', async () => {
      const content = 'Short text.';
      const file = makeFile({ content });

      const result = await service.uploadFile(file);

      expect(result.preview[0]).toBe('Short text.');
    });

    it('should return correct rowCount for TXT', async () => {
      const file = makeFile({ content: 'line1\nline2\nline3\n\nline4' });

      const result = await service.uploadFile(file);

      expect(result.rowCount).toBe(4); // empty line filtered
    });

    it('should return correct fileName and fileSize', async () => {
      const file = makeFile({ content: 'some text', originalname: 'notes.txt', size: 9 });

      const result = await service.uploadFile(file);

      expect(result.fileName).toBe('notes.txt');
      expect(result.fileSize).toBe(9);
    });

    it('should use filename as fileId when available', async () => {
      const file = makeFile({ content: 'text', filename: '12345-stored.txt' });

      const result = await service.uploadFile(file);

      expect(result.fileId).toBe('12345-stored.txt');
    });

    it('should fall back to originalname as fileId when filename is absent', async () => {
      const file = makeFile({ content: 'text', originalname: 'original.txt', filename: undefined });

      const result = await service.uploadFile(file);

      expect(result.fileId).toBe('original.txt');
    });
  });

  // ─── CSV ──────────────────────────────────────────────────────────────────

  describe('CSV files', () => {
    it('should return contentType csv for text/csv', async () => {
      const file = makeCsvFile(['name,age', 'Alice,30']);

      const result = await service.uploadFile(file);

      expect(result.contentType).toBe('csv');
    });

    it('should return contentType csv for text/tab-separated-values', async () => {
      const file = makeFile({
        content: 'name\tage\nAlice\t30',
        mimetype: 'text/tab-separated-values',
        originalname: 'data.tsv',
      });

      const result = await service.uploadFile(file);

      expect(result.contentType).toBe('csv');
    });

    it('should return all rows in preview when 10 or fewer rows', async () => {
      const rows = ['header', 'row1', 'row2', 'row3'];
      const file = makeCsvFile(rows);

      const result = await service.uploadFile(file);

      expect(result.preview).toEqual(rows);
      expect(result.rowCount).toBe(4);
    });

    it('should limit preview to 10 rows when file has more', async () => {
      const rows = Array.from({ length: 25 }, (_, i) => `row${i},value${i}`);
      const file = makeCsvFile(rows);

      const result = await service.uploadFile(file);

      expect(result.preview).toHaveLength(10);
      expect(result.rowCount).toBe(25);
    });

    it('should filter out empty lines from CSV', async () => {
      const file = makeCsvFile(['header', '', 'row1', '', 'row2']);

      const result = await service.uploadFile(file);

      expect(result.rowCount).toBe(3);
      expect(result.preview).toEqual(['header', 'row1', 'row2']);
    });

    it('should handle Windows-style line endings (CRLF)', async () => {
      const file = makeFile({
        content: 'header\r\nrow1\r\nrow2',
        mimetype: 'text/csv',
        originalname: 'data.csv',
      });

      const result = await service.uploadFile(file);

      expect(result.rowCount).toBe(3);
    });
  });

  // ─── JSON ─────────────────────────────────────────────────────────────────

  describe('JSON files', () => {
    it('should return contentType json', async () => {
      const file = makeJsonFile([{ name: 'Alice' }]);

      const result = await service.uploadFile(file);

      expect(result.contentType).toBe('json');
    });

    it('should count rows from a JSON array', async () => {
      const data = Array.from({ length: 5 }, (_, i) => ({ id: i }));
      const file = makeJsonFile(data);

      const result = await service.uploadFile(file);

      expect(result.rowCount).toBe(5);
    });

    it('should limit preview to 10 items from a large JSON array', async () => {
      const data = Array.from({ length: 30 }, (_, i) => ({ id: i }));
      const file = makeJsonFile(data);

      const result = await service.uploadFile(file);

      expect(result.preview).toHaveLength(10);
      expect(result.rowCount).toBe(30);
    });

    it('should wrap a JSON object (non-array) in an array — rowCount 1', async () => {
      const file = makeJsonFile({ name: 'Alice', age: 30 });

      const result = await service.uploadFile(file);

      expect(result.rowCount).toBe(1);
      expect(result.preview).toHaveLength(1);
    });

    it('should serialize each item to a JSON string in preview', async () => {
      const file = makeJsonFile([{ name: 'Alice' }, { name: 'Bob' }]);

      const result = await service.uploadFile(file);

      expect(result.preview[0]).toBe('{"name":"Alice"}');
      expect(result.preview[1]).toBe('{"name":"Bob"}');
    });

    it('should throw 400 on invalid JSON', async () => {
      const file = makeFile({
        content: '{ invalid json :::',
        mimetype: 'application/json',
        originalname: 'bad.json',
      });

      await expect(service.uploadFile(file)).rejects.toThrow(BadRequestException);
      await expect(service.uploadFile(file)).rejects.toThrow(
        'Could not read file. Check encoding or format',
      );
    });
  });

  // ─── Response shape ────────────────────────────────────────────────────────

  describe('response shape', () => {
    it('should return all required fields including rawText', async () => {
      const file = makeCsvFile(['col1,col2', 'a,b']);

      const result = await service.uploadFile(file);

      expect(result).toMatchObject({
        fileId: expect.any(String),
        fileName: expect.any(String),
        fileSize: expect.any(Number),
        rowCount: expect.any(Number),
        preview: expect.any(Array),
        contentType: expect.any(String),
        rawText: expect.any(String),
      });
    });

    it('rawText should contain the full file content', async () => {
      const content = 'col1,col2\na,b\nc,d';
      const file = makeCsvFile(['col1,col2', 'a,b', 'c,d']);

      const result = await service.uploadFile(file);

      expect(result.rawText).toBe(content);
    });
  });
});
