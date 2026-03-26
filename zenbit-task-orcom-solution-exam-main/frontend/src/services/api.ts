/**
 * Axios instance — the single HTTP client used by all service modules.
 *
 * What it does:
 * 1. Sets baseURL from VITE_API_BASE_URL env var (never hardcode URLs)
 * 2. Attaches the JWT from localStorage on every request via a request interceptor
 * 3. Handles 401 Unauthorized by redirecting to /auth/login
 *    (except auth endpoints like /auth/verify — those return 401 legitimately
 *     for invalid tokens, which is NOT a "session expired" situation)
 * 4. Normalizes error shapes so callers get a consistent ApiError
 */
import axios, { type AxiosError } from 'axios';
import { API_BASE_URL, AUTH_TOKEN_KEY, ROUTES } from '@/constants';
import type { ApiError } from '@/types';
import { store } from '@/store/store';
import { logout } from '@/store/slices/authSlice';
import { updateJob } from '@/store/slices/jobsSlice';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000, // 30 s — Presidio can be slow on first request
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Runs before every outgoing request.
// Reads the JWT from localStorage and injects it as a Bearer token.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
// Runs after every response. Handles global error cases:
// - 401: token expired or invalid → clear storage, redirect to login
// - 4xx/5xx: normalize error message for the UI

// Guard against re-entrant 401 handling (e.g. the wizard auto-save PATCH
// itself returns 401 while we're already redirecting).
let isHandling401 = false;

/** @internal Reset the 401 guard — only used by tests. */
export function _resetHandling401() {
  isHandling401 = false;
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      // Don't intercept 401 on auth endpoints — those are legitimate
      // "invalid token" responses, not "session expired" errors.
      const url = error.config?.url ?? '';
      const isAuthEndpoint = url.includes('/auth/verify') || url.includes('/auth/magic-link');

      if (!isAuthEndpoint && !isHandling401) {
        isHandling401 = true;
        // Save the current URL so we can redirect back after re-authentication
        const returnUrl = window.location.pathname + window.location.search;
        localStorage.setItem('returnUrl', returnUrl);

        // Auto-save wizard state if an in-progress job exists
        const state = store.getState();
        const currentJob = state.jobs.currentJob;
        if (currentJob && currentJob.status === 'draft') {
          const deIdState = state.deIdentification;
          try {
            // Fire-and-forget: best effort save before redirect
            void store.dispatch(
              updateJob({
                id: currentJob.id,
                data: {
                  currentStep: deIdState.currentStep,
                  wizardState: {
                    framework: deIdState.framework,
                    text: deIdState.inputText,
                  },
                },
              }),
            );
          } catch {
            // Ignore — session is already expired, save is best-effort
          }
        }

        // Clear auth state
        store.dispatch(logout());

        // Redirect to login with returnUrl
        window.location.href = `${ROUTES.LOGIN}?returnUrl=${encodeURIComponent(returnUrl)}`;
        return Promise.reject(new Error('Session expired. Please sign in again.'));
      }
    }

    // Extract the most useful error message from the NestJS error shape
    const serverMessage = error.response?.data?.message;
    const message = Array.isArray(serverMessage)
      ? serverMessage.join(', ')
      : (serverMessage ?? error.message ?? 'An unexpected error occurred');

    // Preserve the error code from structured backend responses (e.g. TOKEN_EXPIRED)
    const serverCode = (error.response?.data as Record<string, unknown> | undefined)?.code;
    const apiError = new Error(message);
    if (typeof serverCode === 'string') {
      (apiError as Error & { code: string }).code = serverCode;
    }

    return Promise.reject(apiError);
  },
);

export default api;
