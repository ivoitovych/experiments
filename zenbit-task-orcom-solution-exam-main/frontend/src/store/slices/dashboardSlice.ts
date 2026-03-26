/**
 * dashboardSlice — Redux state for the Dashboard page.
 *
 * State:
 *   data       → DashboardData (metrics, charts, recent docs) | null
 *   isLoading  → fetch in progress
 *   error      → last error message
 *
 * Async thunk:
 *   fetchDashboard() → calls dashboardService.getDashboard()
 */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dashboardService } from '@/services/dashboardService';
import type { DashboardData } from '@/types';

interface DashboardState {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  lastFetchedAt: string | null;
}

const initialState: DashboardState = {
  data: null,
  isLoading: false,
  error: null,
  lastFetchedAt: null,
};

export const fetchDashboard = createAsyncThunk(
  'dashboard/fetch',
  async (_: void, { rejectWithValue }) => {
    try {
      return await dashboardService.getDashboardData();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load dashboard';
      return rejectWithValue(message);
    }
  },
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.lastFetchedAt = new Date().toISOString();
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
