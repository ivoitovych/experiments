/**
 * Redux Store
 *
 * The store is the single source of truth for the entire application state.
 *
 * Slices:
 *  - auth:             JWT, user object, magic link flow
 *  - deIdentification: 4-step de-id workflow + document history
 *  - syntheticData:    generation settings + generated records
 *  - dashboard:        metrics, charts, recent activity
 *
 * State shape:
 * {
 *   auth:             AuthState,
 *   deIdentification: DeIdentificationState,
 *   syntheticData:    SyntheticDataState,
 *   dashboard:        DashboardState,
 * }
 *
 * Usage in components:
 *   const dispatch = useAppDispatch();
 *   const user = useAppSelector(state => state.auth.user);
 */
import { configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/authSlice';
import deIdentificationReducer from './slices/deIdentificationSlice';
import syntheticDataReducer from './slices/syntheticDataSlice';
import dashboardReducer from './slices/dashboardSlice';
import jobsReducer from './slices/jobsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    deIdentification: deIdentificationReducer,
    syntheticData: syntheticDataReducer,
    dashboard: dashboardReducer,
    jobs: jobsReducer,
  },
  // Redux Toolkit includes redux-thunk middleware by default.
  // serializabilityCheck warns if non-serializable values (Dates, functions)
  // end up in state — keep state plain and serializable.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore this action because the User object from the API may contain
        // fields that trigger false-positive serialization warnings.
        ignoredActions: ['auth/verifyMagicLink/fulfilled'],
      },
    }),
  devTools: import.meta.env.DEV, // Redux DevTools only in development
});

// ─── Typed hooks ──────────────────────────────────────────────────────────────
// Use these instead of plain useDispatch / useSelector so TypeScript
// knows the full shape of our state and the type of dispatch.

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
