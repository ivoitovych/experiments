import type { IJob } from '@/pages/DeIdentify/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface JobState {
  items: IJob[];
  currentJob: IJob | null;
  localOriginalTexts: Record<string, string>;
}

const initialState: JobState = {
  items: [],
  currentJob: null,
  localOriginalTexts: {},
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobsAC: (state, action: { payload: IJob[] }) => {
      state.items = action.payload;
    },
    setJobAC: (state, action: { payload: IJob }) => {
      state.currentJob = action.payload;
    },
    removeJobsAC: (state) => {
      state.items = [];
    },
    removeJobAC: (state) => {
      state.currentJob = null;
    },
    resetJobState: (state) => {
      state.items = [];
      state.currentJob = null;
      state.localOriginalTexts = {};
    },
    setLocalOriginalTextAC: (state, action: PayloadAction<{ jobId: string; text: string }>) => {
      const { jobId, text } = action.payload;
      state.localOriginalTexts[jobId] = text;
    },
  },
});

export const {
  setJobsAC,
  setJobAC,
  removeJobsAC,
  removeJobAC,
  resetJobState,
  setLocalOriginalTextAC,
} = jobsSlice.actions;
export default jobsSlice.reducer;
