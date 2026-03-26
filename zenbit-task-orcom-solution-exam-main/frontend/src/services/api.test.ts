import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// ─── Mock store module BEFORE api.ts is imported ─────────────────────────────

const mockDispatch = vi.fn().mockResolvedValue({});
const mockGetState = vi.fn();

vi.mock('@/store/store', () => ({
  store: {
    dispatch: (...args: unknown[]) => mockDispatch(...args),
    getState: () => mockGetState(),
  },
}));

vi.mock('@/store/slices/authSlice', () => ({
  logout: () => ({ type: 'auth/logout' }),
}));

vi.mock('@/store/slices/jobsSlice', () => ({
  updateJob: (payload: unknown) => ({ type: 'jobs/updateJob', payload }),
}));

// ─── Import api AFTER mocks ─────────────────────────────────────────────────

import { api, _resetHandling401 } from './api';

// ─── Setup ──────────────────────────────────────────────────────────────────

let mock: MockAdapter;

describe('api interceptors', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    _resetHandling401();
    // Mock axios adapter on the actual api instance
    mock = new MockAdapter(api);
    // Default state: no current job
    mockGetState.mockReturnValue({
      jobs: { currentJob: null, jobs: [], loading: false, error: null },
      deIdentification: { currentStep: 0, framework: 'hipaa', inputText: '' },
    });
  });

  afterEach(() => {
    mock.restore();
  });

  // ── Request interceptor ─────────────────────────────────────────────────

  describe('request interceptor', () => {
    it('should attach Authorization header when token exists', async () => {
      localStorage.setItem('clinical_studio_token', 'my-jwt');
      mock.onGet('/test').reply(200, { ok: true });

      await api.get('/test');

      expect(mock.history.get[0].headers?.Authorization).toBe('Bearer my-jwt');
    });

    it('should NOT attach Authorization header when no token', async () => {
      mock.onGet('/test').reply(200, { ok: true });

      await api.get('/test');

      expect(mock.history.get[0].headers?.Authorization).toBeUndefined();
    });
  });

  // ── Response interceptor: error code preservation ───────────────────────

  describe('error code preservation', () => {
    it('should preserve error code from backend response on auth endpoints', async () => {
      mock.onPost('/auth/verify').reply(401, {
        code: 'TOKEN_EXPIRED',
        message: 'Token has expired',
      });

      try {
        await api.post('/auth/verify', { token: 'expired' });
        expect.fail('Should have thrown');
      } catch (err) {
        expect((err as Error).message).toBe('Token has expired');
        expect((err as Error & { code: string }).code).toBe('TOKEN_EXPIRED');
      }
    });

    it('should preserve TOKEN_INVALID code', async () => {
      mock.onPost('/auth/verify').reply(401, {
        code: 'TOKEN_INVALID',
        message: 'Invalid or already used token',
      });

      try {
        await api.post('/auth/verify', { token: 'used' });
        expect.fail('Should have thrown');
      } catch (err) {
        expect((err as Error & { code: string }).code).toBe('TOKEN_INVALID');
      }
    });

    it('should not set code when backend response has no code field', async () => {
      mock.onPost('/auth/verify').reply(401, {
        message: 'Unauthorized',
      });

      try {
        await api.post('/auth/verify', { token: 'bad' });
        expect.fail('Should have thrown');
      } catch (err) {
        expect((err as Error & { code?: string }).code).toBeUndefined();
      }
    });
  });

  // ── Response interceptor: 401 session expiry ────────────────────────────

  describe('401 session expiry (non-auth endpoints)', () => {
    // Note: window.location.href assignment is a no-op in jsdom,
    // but we can still verify side effects (localStorage, dispatch)

    it('should save returnUrl to localStorage on 401', async () => {
      mock.onGet('/dashboard/metrics').reply(401, { message: 'Unauthorized' });

      try {
        await api.get('/dashboard/metrics');
      } catch {
        // expected
      }

      expect(localStorage.getItem('returnUrl')).toBeTruthy();
    });

    it('should dispatch logout on 401', async () => {
      mock.onGet('/users/me').reply(401, { message: 'Unauthorized' });

      try {
        await api.get('/users/me');
      } catch {
        // expected
      }

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'auth/logout' });
    });

    it('should NOT intercept 401 on /auth/verify endpoint', async () => {
      mock.onPost('/auth/verify').reply(401, {
        code: 'TOKEN_EXPIRED',
        message: 'Token has expired',
      });

      try {
        await api.post('/auth/verify', { token: 'expired' });
      } catch {
        // expected
      }

      // Should NOT dispatch logout for auth endpoints
      expect(mockDispatch).not.toHaveBeenCalledWith({ type: 'auth/logout' });
    });

    it('should NOT intercept 401 on /auth/magic-link endpoint', async () => {
      mock.onPost('/auth/magic-link').reply(401, { message: 'Unauthorized' });

      try {
        await api.post('/auth/magic-link', { email: 'test@test.com' });
      } catch {
        // expected
      }

      expect(mockDispatch).not.toHaveBeenCalledWith({ type: 'auth/logout' });
    });

    it('should auto-save wizard state when draft job exists on 401', async () => {
      mockGetState.mockReturnValue({
        jobs: {
          currentJob: { id: 'job-1', status: 'draft' },
          jobs: [],
          loading: false,
          error: null,
        },
        deIdentification: {
          currentStep: 2,
          framework: 'gdpr',
          inputText: 'Patient John Doe was admitted...',
        },
      });

      mock.onGet('/dashboard/metrics').reply(401, { message: 'Unauthorized' });

      try {
        await api.get('/dashboard/metrics');
      } catch {
        // expected
      }

      // Should have dispatched updateJob with wizard state
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'jobs/updateJob',
        payload: {
          id: 'job-1',
          data: {
            currentStep: 2,
            wizardState: {
              framework: 'gdpr',
              text: 'Patient John Doe was admitted...',
            },
          },
        },
      });
    });

    it('should NOT auto-save when no current job on 401', async () => {
      mockGetState.mockReturnValue({
        jobs: { currentJob: null, jobs: [], loading: false, error: null },
        deIdentification: { currentStep: 0, framework: 'hipaa', inputText: '' },
      });

      mock.onGet('/dashboard/metrics').reply(401, { message: 'Unauthorized' });

      try {
        await api.get('/dashboard/metrics');
      } catch {
        // expected
      }

      // Only logout should be dispatched, NOT updateJob
      const updateCalls = mockDispatch.mock.calls.filter(
        (call) => call[0]?.type === 'jobs/updateJob',
      );
      expect(updateCalls).toHaveLength(0);
    });

    it('should NOT auto-save when job is not in draft status', async () => {
      mockGetState.mockReturnValue({
        jobs: {
          currentJob: { id: 'job-1', status: 'processing' },
          jobs: [],
          loading: false,
          error: null,
        },
        deIdentification: { currentStep: 3, framework: 'hipaa', inputText: 'data' },
      });

      mock.onGet('/dashboard/metrics').reply(401, { message: 'Unauthorized' });

      try {
        await api.get('/dashboard/metrics');
      } catch {
        // expected
      }

      const updateCalls = mockDispatch.mock.calls.filter(
        (call) => call[0]?.type === 'jobs/updateJob',
      );
      expect(updateCalls).toHaveLength(0);
    });
  });

  // ── Error message normalization ─────────────────────────────────────────

  describe('error message normalization', () => {
    it('should extract message string from response', async () => {
      mock.onGet('/test').reply(400, { message: 'Bad request' });

      try {
        await api.get('/test');
        expect.fail('Should have thrown');
      } catch (err) {
        expect((err as Error).message).toBe('Bad request');
      }
    });

    it('should join array messages', async () => {
      mock.onGet('/test').reply(400, {
        message: ['field1 is required', 'field2 must be a string'],
      });

      try {
        await api.get('/test');
        expect.fail('Should have thrown');
      } catch (err) {
        expect((err as Error).message).toBe(
          'field1 is required, field2 must be a string',
        );
      }
    });
  });
});
