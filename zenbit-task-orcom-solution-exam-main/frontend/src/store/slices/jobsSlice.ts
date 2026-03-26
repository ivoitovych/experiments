/**
 * jobsSlice — Redux state for wizard jobs.
 *
 * State:
 *   jobs        → Job[]           (user's job list)
 *   currentJob  → Job | null      (active wizard job)
 *   isLoading   → fetch in progress
 *   error       → last error message
 *
 * Async thunks:
 *   createJob()        → POST new draft job
 *   fetchJobs()        → GET all user jobs
 *   fetchJob(id)       → GET single job
 *   updateJob({id,…})  → PATCH wizard state (auto-save)
 *   runJob(id)         → POST run Presidio pipeline
 */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { jobsService } from '@/services/jobsService';
import type { Job } from '@/types';

interface JobsState {
  jobs: Job[];
  currentJob: Job | null;
  loading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  jobs: [],
  currentJob: null,
  loading: false,
  error: null,
};

export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (data?: { framework?: string }) => {
    return jobsService.createJob(data);
  },
);

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  return jobsService.getJobs();
});

export const fetchJob = createAsyncThunk(
  'jobs/fetchJob',
  async (id: string) => {
    return jobsService.getJob(id);
  },
);

export const updateJob = createAsyncThunk(
  'jobs/updateJob',
  async ({
    id,
    data,
  }: {
    id: string;
    data: { currentStep?: number; wizardState?: Record<string, any>; status?: string };
  }) => {
    return jobsService.updateJob(id, data);
  },
);

export const runJob = createAsyncThunk(
  'jobs/runJob',
  async (id: string) => {
    return jobsService.runJob(id);
  },
);

// pollJob is a lightweight thunk used by the Processing page to poll job status
// without toggling the global loading spinner.
export const pollJob = createAsyncThunk(
  'jobs/pollJob',
  async (id: string) => {
    return jobsService.getJob(id);
  },
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearCurrentJob(state) {
      state.currentJob = null;
    },
    clearJobsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // createJob
    builder
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload;
        state.jobs.unshift(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to create job';
      });

    // fetchJobs
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch jobs';
      });

    // fetchJob
    builder
      .addCase(fetchJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJob.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload;
      })
      .addCase(fetchJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch job';
      });

    // updateJob
    builder
      .addCase(updateJob.pending, (state) => {
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.currentJob = action.payload;
        const idx = state.jobs.findIndex((j) => j.id === action.payload.id);
        if (idx !== -1) {
          state.jobs[idx] = action.payload;
        }
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to update job';
      });

    // runJob
    builder
      .addCase(runJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(runJob.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload;
        const idx = state.jobs.findIndex((j) => j.id === action.payload.id);
        if (idx !== -1) {
          state.jobs[idx] = action.payload;
        }
      })
      .addCase(runJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to run job';
      });

    // pollJob — silent update, no loading spinner
    builder
      .addCase(pollJob.fulfilled, (state, action) => {
        state.currentJob = action.payload;
        const idx = state.jobs.findIndex((j) => j.id === action.payload.id);
        if (idx !== -1) {
          state.jobs[idx] = action.payload;
        }
      })
      .addCase(pollJob.rejected, (_state, _action) => {
        // ignore poll errors silently
      });
  },
});

export const { clearCurrentJob, clearJobsError } = jobsSlice.actions;
export default jobsSlice.reducer;
