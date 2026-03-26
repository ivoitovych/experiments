/**
 * De-Identification Slice
 *
 * State for the 4-step de-identification workflow:
 *   Step 1: selectFramework  → stores framework choice
 *   Step 2: inputText        → stores the text to analyze
 *   Step 3: settings         → stores anonymization settings
 *   Step 4: results          → stores analysis + anonymization results
 *
 * The stepper currentStep is kept here so it survives navigation between the
 * stepper sub-routes (though this could also be local component state).
 */
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { deIdentificationService } from '@/services/deIdentificationService';
import type { UploadFileResult } from '@/services/deIdentificationService';
import type {
  PresidioEntity,
  AnonymizeResult,
  DeIdentificationSettings,
  Document,
  HipaaMethod,
  RiskLevel,
} from '@/types';
import {
  GDPR_ENTITIES,
  HIPAA_ENTITIES,
  HIPAA_SAFE_HARBOR_ENTITIES,
  RISK_LEVEL_ENTITIES,
  SWISS_FADP_ENTITIES,
  UK_DPI_ENTITIES,
} from '@/constants';

interface DeIdentificationState {
  // Stepper
  currentStep: number;

  // Step 1
  framework: DeIdentificationSettings['framework'];

  // Step 3 — framework-specific config
  hipaaMethod: HipaaMethod;
  riskLevel: RiskLevel;

  // Step 2 — text input
  inputText: string;

  // Step 2 — file upload
  uploadedFile: UploadFileResult | null;
  isUploading: boolean;
  uploadError: string | null;

  // Step 3
  settings: Omit<DeIdentificationSettings, 'framework'>;

  // Step 4 — results
  analysisResult: PresidioEntity[] | null;
  anonymizeResult: AnonymizeResult | null;
  processingTimeMs: number | null;

  // Saved documents
  documents: Document[];
  totalDocuments: number;
  currentDocument: Document | null;

  // Loading / error
  isAnalyzing: boolean;
  isAnonymizing: boolean;
  error: string | null;
}

const initialState: DeIdentificationState = {
  currentStep: 0,
  framework: 'hipaa',
  hipaaMethod: 'safe_harbor',
  riskLevel: 'medium',
  inputText: '',
  uploadedFile: null,
  isUploading: false,
  uploadError: null,
  settings: {
    strategy: 'replace',
    entities: HIPAA_ENTITIES as unknown as string[],
    language: 'en',
    minScore: 0.65,
  },
  analysisResult: null,
  anonymizeResult: null,
  processingTimeMs: null,
  documents: [],
  totalDocuments: 0,
  currentDocument: null,
  isAnalyzing: false,
  isAnonymizing: false,
  error: null,
};

// ─── Async Thunks ─────────────────────────────────────────────────────────────

export const analyzeText = createAsyncThunk(
  'deIdentification/analyzeText',
  async (
    payload: { text: string; language: string; entities: string[] },
    { rejectWithValue },
  ) => {
    try {
      return await deIdentificationService.analyzeText(payload);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Analysis failed';
      return rejectWithValue(message);
    }
  },
);

export const anonymizeText = createAsyncThunk(
  'deIdentification/anonymizeText',
  async (
    payload: {
      text: string;
      analyzerResults: PresidioEntity[];
      strategy: string;
      language: string;
      framework?: string;
      hipaaMethod?: string;
      riskLevel?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const start = Date.now();
      const result = await deIdentificationService.anonymizeText(payload);
      const elapsed = Date.now() - start;
      return { result, elapsed };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Anonymization failed';
      return rejectWithValue(message);
    }
  },
);

export const fetchDocuments = createAsyncThunk(
  'deIdentification/fetchDocuments',
  async (params: { page: number; limit: number } = { page: 1, limit: 20 }, { rejectWithValue }) => {
    try {
      return await deIdentificationService.getDocuments(params);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load documents';
      return rejectWithValue(message);
    }
  },
);

export const uploadFile = createAsyncThunk(
  'deIdentification/uploadFile',
  async (file: File, { rejectWithValue }) => {
    try {
      return await deIdentificationService.uploadFile(file);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      return rejectWithValue(message);
    }
  },
);

export const fetchDocumentById = createAsyncThunk(
  'deIdentification/fetchDocumentById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await deIdentificationService.getDocument(id);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load document';
      return rejectWithValue(message);
    }
  },
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const deIdentificationSlice = createSlice({
  name: 'deIdentification',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    nextStep(state) {
      state.currentStep = Math.min(state.currentStep + 1, 3);
    },
    prevStep(state) {
      state.currentStep = Math.max(state.currentStep - 1, 0);
    },
    setFramework(state, action: PayloadAction<DeIdentificationSettings['framework']>) {
      state.framework = action.payload;
      if (action.payload === 'hipaa') {
        state.hipaaMethod = 'safe_harbor';
        state.settings.entities = HIPAA_SAFE_HARBOR_ENTITIES as unknown as string[];
      } else if (action.payload === 'gdpr') {
        state.riskLevel = 'medium';
        state.settings.entities = GDPR_ENTITIES as unknown as string[];
      } else if (action.payload === 'uk_dpi') {
        state.riskLevel = 'medium';
        state.settings.entities = UK_DPI_ENTITIES as unknown as string[];
      } else if (action.payload === 'swiss_fadp') {
        state.riskLevel = 'medium';
        state.settings.entities = SWISS_FADP_ENTITIES as unknown as string[];
      }
      // custom: keep whatever entities were set previously (full manual control)
    },
    setHipaaMethod(state, action: PayloadAction<HipaaMethod>) {
      state.hipaaMethod = action.payload;
      if (action.payload === 'safe_harbor') {
        // Lock entities to full Safe Harbor set
        state.settings.entities = HIPAA_SAFE_HARBOR_ENTITIES as unknown as string[];
      } else {
        // Expert Determination: start with current HIPAA preset (user can edit)
        state.settings.entities = HIPAA_ENTITIES as unknown as string[];
      }
    },
    setRiskLevel(state, action: PayloadAction<RiskLevel>) {
      state.riskLevel = action.payload;
      state.settings.entities = RISK_LEVEL_ENTITIES[action.payload];
    },
    setInputText(state, action: PayloadAction<string>) {
      state.inputText = action.payload;
    },
    updateSettings(
      state,
      action: PayloadAction<Partial<Omit<DeIdentificationSettings, 'framework'>>>,
    ) {
      state.settings = { ...state.settings, ...action.payload };
    },
    resetWorkflow(state) {
      state.currentStep = 0;
      state.inputText = '';
      state.uploadedFile = null;
      state.uploadError = null;
      state.analysisResult = null;
      state.anonymizeResult = null;
      state.processingTimeMs = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
    clearUpload(state) {
      state.uploadedFile = null;
      state.uploadError = null;
      state.inputText = '';
    },
    clearCurrentDocument(state) {
      state.currentDocument = null;
    },
  },
  extraReducers: (builder) => {
    // analyzeText
    builder
      .addCase(analyzeText.pending, (state) => {
        state.isAnalyzing = true;
        state.error = null;
      })
      .addCase(analyzeText.fulfilled, (state, action) => {
        state.isAnalyzing = false;
        state.analysisResult = action.payload;
      })
      .addCase(analyzeText.rejected, (state, action) => {
        state.isAnalyzing = false;
        state.error = action.payload as string;
      });

    // anonymizeText
    builder
      .addCase(anonymizeText.pending, (state) => {
        state.isAnonymizing = true;
        state.error = null;
      })
      .addCase(anonymizeText.fulfilled, (state, action) => {
        state.isAnonymizing = false;
        state.anonymizeResult = action.payload.result;
        state.processingTimeMs = action.payload.elapsed;
      })
      .addCase(anonymizeText.rejected, (state, action) => {
        state.isAnonymizing = false;
        state.error = action.payload as string;
      });

    // uploadFile
    builder
      .addCase(uploadFile.pending, (state) => {
        state.isUploading = true;
        state.uploadError = null;
        state.uploadedFile = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isUploading = false;
        state.uploadedFile = action.payload;
        state.inputText = action.payload.rawText;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isUploading = false;
        state.uploadError = action.payload as string;
      });

    // fetchDocuments
    builder
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.documents = action.payload.data;
        state.totalDocuments = action.payload.total;
      });

    // fetchDocumentById
    builder
      .addCase(fetchDocumentById.fulfilled, (state, action) => {
        state.currentDocument = action.payload;
      })
      .addCase(fetchDocumentById.rejected, (state, action) => {
        state.error = (action.payload as string) ?? 'Failed to load document';
      });
  },
});

export const {
  setStep,
  nextStep,
  prevStep,
  setFramework,
  setHipaaMethod,
  setRiskLevel,
  setInputText,
  updateSettings,
  resetWorkflow,
  clearError,
  clearUpload,
  clearCurrentDocument,
} = deIdentificationSlice.actions;
export default deIdentificationSlice.reducer;
