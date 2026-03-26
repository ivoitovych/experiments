import { describe, it, expect, vi, beforeEach } from 'vitest';
import { makeTestStore } from '@/test/makeTestStore';
import {
  clearCurrentDocument,
  fetchDocumentById,
  resetWorkflow,
} from './deIdentificationSlice';
import type { Document } from '@/types';

// ─── Mock deIdentificationService ────────────────────────────────────────────

vi.mock('@/services/deIdentificationService', () => ({
  deIdentificationService: {
    getDocument: vi.fn(),
    analyzeText: vi.fn(),
    anonymizeText: vi.fn(),
    getDocuments: vi.fn(),
    uploadFile: vi.fn(),
  },
}));

import { deIdentificationService } from '@/services/deIdentificationService';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const makeDocument = (overrides: Partial<Document> = {}): Document => ({
  id: 'doc-1',
  userId: 'user-1',
  originalText: 'Patient John Doe',
  anonymizedText: 'Patient <PERSON>',
  status: 'completed',
  entityCount: 1,
  processingTimeMs: 350,
  framework: 'hipaa',
  analysisResult: [{ entity_type: 'PERSON', start: 8, end: 16, score: 0.95 }],
  createdAt: new Date().toISOString(),
  ...overrides,
});

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('deIdentificationSlice — clearCurrentDocument', () => {
  it('should set currentDocument to null', () => {
    const store = makeTestStore({
      deIdentification: { currentDocument: makeDocument() },
    });

    store.dispatch(clearCurrentDocument());

    expect(store.getState().deIdentification.currentDocument).toBeNull();
  });

  it('should be a no-op when currentDocument is already null', () => {
    const store = makeTestStore();
    store.dispatch(clearCurrentDocument());
    expect(store.getState().deIdentification.currentDocument).toBeNull();
  });
});

describe('deIdentificationSlice — fetchDocumentById thunk', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should store the fetched document in currentDocument', async () => {
    const doc = makeDocument();
    vi.mocked(deIdentificationService.getDocument).mockResolvedValue(doc);

    const store = makeTestStore();
    await store.dispatch(fetchDocumentById('doc-1'));

    expect(store.getState().deIdentification.currentDocument).toEqual(doc);
  });

  it('should call getDocument with the provided id', async () => {
    vi.mocked(deIdentificationService.getDocument).mockResolvedValue(makeDocument());

    const store = makeTestStore();
    await store.dispatch(fetchDocumentById('doc-abc'));

    expect(vi.mocked(deIdentificationService.getDocument)).toHaveBeenCalledWith('doc-abc');
  });

  it('should NOT update currentDocument when the request fails', async () => {
    vi.mocked(deIdentificationService.getDocument).mockRejectedValue(new Error('not found'));

    const store = makeTestStore();
    await store.dispatch(fetchDocumentById('doc-bad'));

    expect(store.getState().deIdentification.currentDocument).toBeNull();
  });

  it('should set error message when the request fails', async () => {
    vi.mocked(deIdentificationService.getDocument).mockRejectedValue(new Error('not found'));

    const store = makeTestStore();
    await store.dispatch(fetchDocumentById('doc-bad'));

    expect(store.getState().deIdentification.error).toBeTruthy();
  });
});

describe('deIdentificationSlice — resetWorkflow', () => {
  it('should reset step, text, analysis and errors to initial values', () => {
    const store = makeTestStore({
      deIdentification: {
        currentStep: 3,
        inputText: 'some text',
        analysisResult: [{ entity_type: 'PERSON', start: 0, end: 4, score: 0.9 }],
        error: 'previous error',
        currentDocument: makeDocument(),
      },
    });

    store.dispatch(resetWorkflow());

    const state = store.getState().deIdentification;
    expect(state.currentStep).toBe(0);
    expect(state.inputText).toBe('');
    expect(state.analysisResult).toBeNull();
    expect(state.error).toBeNull();
  });
});
