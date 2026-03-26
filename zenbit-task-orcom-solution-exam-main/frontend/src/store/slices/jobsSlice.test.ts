import { describe, it, expect, vi, beforeEach } from 'vitest';
import { makeTestStore } from '@/test/makeTestStore';
import { pollJob, createJob, runJob } from './jobsSlice';
import { JobStatus } from '@/types';
import type { Job } from '@/types';

// ─── Mock jobsService ─────────────────────────────────────────────────────────

vi.mock('@/services/jobsService', () => ({
  jobsService: {
    getJob: vi.fn(),
    getJobs: vi.fn(),
    createJob: vi.fn(),
    updateJob: vi.fn(),
    runJob: vi.fn(),
  },
}));

import { jobsService } from '@/services/jobsService';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const makeJob = (overrides: Partial<Job> = {}): Job => ({
  id: 'job-1',
  status: JobStatus.PROCESSING,
  currentStep: 3,
  wizardState: {},
  progress: 50,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('jobsSlice — pollJob thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update currentJob without touching loading state', async () => {
    const job = makeJob({ status: JobStatus.PROCESSING, progress: 75 });
    vi.mocked(jobsService.getJob).mockResolvedValue(job);

    const store = makeTestStore();
    // loading should stay false the whole time
    const loadingBefore = store.getState().jobs.loading;

    await store.dispatch(pollJob('job-1'));

    expect(store.getState().jobs.loading).toBe(loadingBefore);
    expect(store.getState().jobs.currentJob).toEqual(job);
  });

  it('should update an existing job in the jobs array', async () => {
    const oldJob = makeJob({ progress: 25 });
    const updatedJob = makeJob({ progress: 75 });
    vi.mocked(jobsService.getJob).mockResolvedValue(updatedJob);

    const store = makeTestStore({ jobs: { jobs: [oldJob], currentJob: oldJob, loading: false, error: null } });

    await store.dispatch(pollJob('job-1'));

    expect(store.getState().jobs.jobs[0].progress).toBe(75);
  });

  it('should NOT set error when pollJob is rejected', async () => {
    vi.mocked(jobsService.getJob).mockRejectedValue(new Error('network error'));

    const store = makeTestStore();
    await store.dispatch(pollJob('job-1'));

    expect(store.getState().jobs.error).toBeNull();
  });

  it('should NOT set loading: true when pollJob is pending', async () => {
    let resolveFn!: (v: Job) => void;
    vi.mocked(jobsService.getJob).mockReturnValue(
      new Promise<Job>((resolve) => { resolveFn = resolve; }),
    );

    const store = makeTestStore();
    const promise = store.dispatch(pollJob('job-1'));

    // While pending, loading must remain false
    expect(store.getState().jobs.loading).toBe(false);

    resolveFn(makeJob());
    await promise;
  });
});

describe('jobsSlice — createJob thunk', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should set currentJob and add to jobs array on success', async () => {
    const newJob = makeJob({ status: JobStatus.DRAFT });
    vi.mocked(jobsService.createJob).mockResolvedValue(newJob);

    const store = makeTestStore();
    await store.dispatch(createJob({ framework: 'hipaa' }));

    expect(store.getState().jobs.currentJob).toEqual(newJob);
    expect(store.getState().jobs.jobs).toHaveLength(1);
  });

  it('should set loading: true while pending and false when done', async () => {
    vi.mocked(jobsService.createJob).mockResolvedValue(makeJob({ status: JobStatus.DRAFT }));
    const store = makeTestStore();
    const promise = store.dispatch(createJob({}));

    expect(store.getState().jobs.loading).toBe(true);
    await promise;
    expect(store.getState().jobs.loading).toBe(false);
  });
});

describe('jobsSlice — runJob thunk', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should update currentJob to SUCCEEDED on success', async () => {
    const succeededJob = makeJob({ status: JobStatus.SUCCEEDED, progress: 100 });
    vi.mocked(jobsService.runJob).mockResolvedValue(succeededJob);

    const store = makeTestStore();
    await store.dispatch(runJob('job-1'));

    expect(store.getState().jobs.currentJob?.status).toBe(JobStatus.SUCCEEDED);
  });

  it('should set error on rejection', async () => {
    vi.mocked(jobsService.runJob).mockRejectedValue(new Error('run failed'));

    const store = makeTestStore();
    await store.dispatch(runJob('job-1'));

    expect(store.getState().jobs.error).toBeTruthy();
  });
});
