/**
 * Factory that creates a fresh Redux store for each test.
 * Uses the same reducers as the production store so selectors work correctly.
 */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import deIdentificationReducer from '@/store/slices/deIdentificationSlice';
import syntheticDataReducer from '@/store/slices/syntheticDataSlice';
import dashboardReducer from '@/store/slices/dashboardSlice';
import jobsReducer from '@/store/slices/jobsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  deIdentification: deIdentificationReducer,
  syntheticData: syntheticDataReducer,
  dashboard: dashboardReducer,
  jobs: jobsReducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeTestStore(preloadedState?: Record<string, any>) {
  return configureStore({
    reducer: rootReducer,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    preloadedState: preloadedState as any,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
}

export type TestStore = ReturnType<typeof makeTestStore>;
