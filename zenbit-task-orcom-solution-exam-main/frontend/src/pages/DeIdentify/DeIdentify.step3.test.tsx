/**
 * Tests for Step 3 (Review & Run) of the DeIdentify wizard.
 * Other steps (0–2) are not touched — tested separately if needed.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JobStatus } from '@/types';
import type { Job } from '@/types';

// ─── Module mocks ─────────────────────────────────────────────────────────────

const mockNavigate = vi.fn();
const mockDispatch = vi.fn();

// State returned by useAppSelector
let mockDeIdState = {
  currentStep: 3,
  framework: 'hipaa' as const,
  hipaaMethod: 'safe_harbor' as const,
  riskLevel: 'medium' as const,
  inputText: 'Patient data here with more than fifty characters total.',
  uploadedFile: null as null | { fileId: string; fileName: string; fileSize: number; rowCount: number; preview: unknown[]; contentType: string; rawText: string },
  settings: { strategy: 'replace', entities: ['PERSON', 'EMAIL_ADDRESS', 'PHONE_NUMBER', 'US_SSN'], language: 'en', minScore: 0.5 },
  error: null,
  // remaining fields needed by selector
  analysisResult: null, anonymizeResult: null, processingTimeMs: null,
  isAnalyzing: false, isAnonymizing: false,
  documents: [], totalDocuments: 0, currentDocument: null,
  isUploading: false, uploadError: null,
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate, useParams: () => ({}) };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (k: string) => k }),
}));

vi.mock('@/store/store', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (s: object) => unknown) =>
    selector({
      deIdentification: mockDeIdState,
      jobs: { currentJob: null, loading: false, error: null, jobs: [] },
    }),
}));

// ─── Import AFTER mocks ───────────────────────────────────────────────────────

import DeIdentify from './DeIdentify';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const makeCreatedJob = (): Job => ({
  id: 'new-job-id',
  status: JobStatus.DRAFT,
  currentStep: 1,
  wizardState: {},
  progress: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('DeIdentify — Step 3 (Review & Run)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDeIdState = {
      ...mockDeIdState,
      currentStep: 3,
      framework: 'hipaa',
      inputText: 'Patient data here with more than fifty characters total.',
      uploadedFile: null,
      settings: { strategy: 'replace', entities: ['PERSON', 'EMAIL_ADDRESS', 'PHONE_NUMBER', 'US_SSN'], language: 'en', minScore: 0.5 },
    };
  });

  it('should render the Review & Run title', () => {
    render(<DeIdentify />);
    expect(screen.getByText('deIdentify.review.title')).toBeInTheDocument();
  });

  it('should show the selected framework label in the summary', () => {
    render(<DeIdentify />);
    expect(screen.getByText('deIdentify.framework.hipaa.label')).toBeInTheDocument();
  });

  it('should show pasted text character count when no file uploaded', () => {
    render(<DeIdentify />);
    // t('deIdentify.review.pastedText', {count: N}) → returns the key
    expect(screen.getByText('deIdentify.review.pastedText')).toBeInTheDocument();
  });

  it('should show entity count in the summary', () => {
    render(<DeIdentify />);
    expect(screen.getByText('deIdentify.review.entityCount')).toBeInTheDocument();
  });

  it('should show the selected strategy chip', () => {
    render(<DeIdentify />);
    expect(screen.getByText('replace')).toBeInTheDocument();
  });

  it('should show Run Analysis button', () => {
    render(<DeIdentify />);
    expect(screen.getByText('deIdentify.review.runAnalysis')).toBeInTheDocument();
  });

  it('should show Back button in step 3', () => {
    render(<DeIdentify />);
    expect(screen.getByText('common.back')).toBeInTheDocument();
  });

  it('should dispatch prevStep when Back is clicked', async () => {
    const user = userEvent.setup();
    render(<DeIdentify />);

    await user.click(screen.getByText('common.back'));

    // prevStep action dispatched
    expect(mockDispatch).toHaveBeenCalled();
    const dispatchedAction = mockDispatch.mock.calls[0][0];
    expect(dispatchedAction).toMatchObject({ type: 'deIdentification/prevStep' });
  });

  it('should dispatch createJob when Run Analysis is clicked', async () => {
    const user = userEvent.setup();
    // Make dispatch return a fulfilled createJob result
    mockDispatch
      .mockResolvedValueOnce({ type: 'jobs/createJob/fulfilled', payload: makeCreatedJob() })
      .mockResolvedValueOnce({ type: 'jobs/updateJob/fulfilled', payload: makeCreatedJob() })
      .mockResolvedValue({});

    render(<DeIdentify />);
    await user.click(screen.getByText('deIdentify.review.runAnalysis'));

    // First dispatch should be createJob thunk
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should navigate to /app/processing/:jobId after Run Analysis', async () => {
    const user = userEvent.setup();
    mockDispatch
      .mockResolvedValueOnce({ type: 'jobs/createJob/fulfilled', payload: makeCreatedJob() })
      .mockResolvedValueOnce({ type: 'jobs/updateJob/fulfilled', payload: makeCreatedJob() })
      .mockResolvedValue({});

    render(<DeIdentify />);
    await user.click(screen.getByText('deIdentify.review.runAnalysis'));

    // Wait for async handleRunAnalysis to complete
    await new Promise((r) => setTimeout(r, 0));

    expect(mockNavigate).toHaveBeenCalledWith('/app/processing/new-job-id');
  });

  it('should show uploaded file name when a file was uploaded', () => {
    mockDeIdState = {
      ...mockDeIdState,
      uploadedFile: {
        fileId: 'f1', fileName: 'patients.csv', fileSize: 1024,
        rowCount: 50, preview: [], contentType: 'csv', rawText: '',
      },
    };
    render(<DeIdentify />);
    expect(screen.getByText('deIdentify.review.uploadedFile')).toBeInTheDocument();
  });
});
