import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JobStatus } from '@/types';
import type { Job } from '@/types';

// ─── Module mocks (hoisted) ───────────────────────────────────────────────────

const mockNavigate = vi.fn();
const mockDispatch = vi.fn();

// Mutable state object — each test can reassign `mockCurrentJob`
let mockCurrentJob: Job | null = null;

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate, useParams: () => ({ jobId: 'job-1' }) };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (k: string) => k }),
}));

vi.mock('@/store/store', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (s: object) => unknown) =>
    selector({ jobs: { currentJob: mockCurrentJob, loading: false, error: null, jobs: [] } }),
}));

// ─── Import component AFTER mocks ────────────────────────────────────────────

import Processing from './Processing';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const makeJob = (overrides: Partial<Job> = {}): Job => ({
  id: 'job-1',
  status: JobStatus.PROCESSING,
  currentStep: 3,
  wizardState: {},
  progress: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Processing page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    mockCurrentJob = null;
    mockDispatch.mockResolvedValue({});
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render the processing title', () => {
    render(<Processing />);
    expect(screen.getByText('deIdentify.processing.title')).toBeInTheDocument();
  });

  it('should dispatch pollJob with the jobId from params on mount', () => {
    render(<Processing />);
    // First dispatch call should be pollJob('job-1')
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch pollJob again after 2 seconds (polling interval)', async () => {
    render(<Processing />);
    const callsAfterMount = mockDispatch.mock.calls.length;

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    expect(mockDispatch.mock.calls.length).toBeGreaterThan(callsAfterMount);
  });

  it('should redirect to results when job status is SUCCEEDED', () => {
    mockCurrentJob = makeJob({ status: JobStatus.SUCCEEDED });
    render(<Processing />);
    expect(mockNavigate).toHaveBeenCalledWith('/app/results/job-1');
  });

  it('should show FAILED error message when job status is FAILED', () => {
    mockCurrentJob = makeJob({
      status: JobStatus.FAILED,
      error: { code: 'PROCESSING_ERROR', message: 'Presidio is down' },
    });
    render(<Processing />);
    expect(screen.getByText('Presidio is down')).toBeInTheDocument();
  });

  it('should show Retry and Go to Dashboard buttons on FAILED', () => {
    mockCurrentJob = makeJob({ status: JobStatus.FAILED, error: { code: 'ERR', message: 'fail' } });
    render(<Processing />);
    expect(screen.getByText('deIdentify.processing.retry')).toBeInTheDocument();
    expect(screen.getByText('deIdentify.processing.goToDashboard')).toBeInTheDocument();
  });

  it('should show progress percentage in the progress bar label', () => {
    mockCurrentJob = makeJob({ status: JobStatus.PROCESSING, progress: 50 });
    render(<Processing />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('should show "Analyzing entities..." when progress is 0', () => {
    mockCurrentJob = makeJob({ status: JobStatus.PROCESSING, progress: 0 });
    render(<Processing />);
    expect(screen.getByText('deIdentify.processing.analyzing')).toBeInTheDocument();
  });

  it('should show "Anonymizing data..." when progress is 50', () => {
    mockCurrentJob = makeJob({ status: JobStatus.PROCESSING, progress: 50 });
    render(<Processing />);
    expect(screen.getByText('deIdentify.processing.anonymizing')).toBeInTheDocument();
  });

  it('should show timeout notice after 5 minutes', async () => {
    mockCurrentJob = makeJob({ status: JobStatus.PROCESSING, progress: 10 });
    render(<Processing />);

    await act(async () => {
      vi.advanceTimersByTime(5 * 60 * 1000 + 1000);
    });

    expect(screen.getByText('deIdentify.processing.stillProcessing')).toBeInTheDocument();
  });

  it('should dispatch runJob when Retry is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    mockCurrentJob = makeJob({ status: JobStatus.FAILED, error: { code: 'ERR', message: 'err' } });
    render(<Processing />);

    await user.click(screen.getByText('deIdentify.processing.retry'));

    expect(mockDispatch).toHaveBeenCalled();
  });
});
