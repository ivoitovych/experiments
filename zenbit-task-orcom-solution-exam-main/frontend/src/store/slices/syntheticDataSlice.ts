/**
 * syntheticDataSlice — Redux state for synthetic data generation.
 *
 * State:
 *   records     → SyntheticRecord[]  (generated fake PHI records)
 *   settings    → SyntheticGenerationSettings  (form values)
 *   isLoading   → generation in progress
 *   error       → last error message
 *
 * Async thunks:
 *   generateSyntheticData(settings) → POST /synthetic-data/generate
 *   fetchSyntheticRecords()         → GET  /synthetic-data
 */
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { syntheticDataService } from '@/services/syntheticDataService';
import type { SyntheticRecord, SyntheticGenerationSettings } from '@/types';

interface SyntheticDataState {
  records: SyntheticRecord[];
  settings: SyntheticGenerationSettings;
  isGenerating: boolean;
  error: string | null;
}

const initialState: SyntheticDataState = {
  records: [],
  settings: {
    recordCount: 10,
    entityTypes: ['PERSON', 'EMAIL_ADDRESS', 'PHONE_NUMBER', 'LOCATION'],
    locale: 'en_US',
  },
  isGenerating: false,
  error: null,
};

export const generateSyntheticData = createAsyncThunk(
  'syntheticData/generate',
  async (settings: SyntheticGenerationSettings, { rejectWithValue }) => {
    try {
      return await syntheticDataService.generate(settings);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Generation failed';
      return rejectWithValue(message);
    }
  },
);

const syntheticDataSlice = createSlice({
  name: 'syntheticData',
  initialState,
  reducers: {
    updateSettings(state, action: PayloadAction<Partial<SyntheticGenerationSettings>>) {
      state.settings = { ...state.settings, ...action.payload };
    },
    clearRecords(state) {
      state.records = [];
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateSyntheticData.pending, (state) => {
        state.isGenerating = true;
        state.error = null;
      })
      .addCase(generateSyntheticData.fulfilled, (state, action) => {
        state.isGenerating = false;
        state.records = action.payload;
      })
      .addCase(generateSyntheticData.rejected, (state, action) => {
        state.isGenerating = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateSettings, clearRecords, clearError } = syntheticDataSlice.actions;
export default syntheticDataSlice.reducer;
