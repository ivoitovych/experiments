import { describe, it, expect, vi, beforeEach } from 'vitest';
import { makeTestStore } from '@/test/makeTestStore';
import {
  requestMagicLink,
  verifyMagicLink,
  logout,
  clearError,
  loadFromStorage,
} from './authSlice';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '@/constants';
import type { User, AuthTokenPayload } from '@/types';

// ─── Mock authService ─────────────────────────────────────────────────────────

vi.mock('@/services/authService', () => ({
  authService: {
    requestMagicLink: vi.fn(),
    verifyMagicLink: vi.fn(),
    getMe: vi.fn(),
  },
}));

import { authService } from '@/services/authService';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const makeUser = (overrides: Partial<User> = {}): User => ({
  id: 'user-1',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  role: 'analyst',
  createdAt: new Date().toISOString(),
  ...overrides,
});

const makeAuthPayload = (overrides: Partial<AuthTokenPayload> = {}): AuthTokenPayload => ({
  token: 'jwt-token-123',
  user: makeUser(),
  ...overrides,
});

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('authSlice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  // ── Initial state ─────────────────────────────────────────────────────────

  it('should have errorCode: null in initial state', () => {
    const store = makeTestStore();
    expect(store.getState().auth.errorCode).toBeNull();
    expect(store.getState().auth.error).toBeNull();
  });

  // ── requestMagicLink ──────────────────────────────────────────────────────

  describe('requestMagicLink', () => {
    it('should set magicLinkSent and email on success', async () => {
      vi.mocked(authService.requestMagicLink).mockResolvedValue(undefined);

      const store = makeTestStore();
      await store.dispatch(requestMagicLink('test@example.com'));

      const state = store.getState().auth;
      expect(state.magicLinkSent).toBe(true);
      expect(state.magicLinkEmail).toBe('test@example.com');
      expect(state.isLoading).toBe(false);
    });

    it('should set error on failure', async () => {
      vi.mocked(authService.requestMagicLink).mockRejectedValue(
        new Error('Network error'),
      );

      const store = makeTestStore();
      await store.dispatch(requestMagicLink('test@example.com'));

      expect(store.getState().auth.error).toBe('Network error');
      expect(store.getState().auth.magicLinkSent).toBe(false);
    });
  });

  // ── verifyMagicLink ───────────────────────────────────────────────────────

  describe('verifyMagicLink', () => {
    it('should set user, token, and isAuthenticated on success', async () => {
      const payload = makeAuthPayload();
      vi.mocked(authService.verifyMagicLink).mockResolvedValue(payload);

      const store = makeTestStore();
      await store.dispatch(verifyMagicLink('valid-token'));

      const state = store.getState().auth;
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(payload.user);
      expect(state.token).toBe('jwt-token-123');
      expect(state.error).toBeNull();
      expect(state.errorCode).toBeNull();
    });

    it('should persist token and user to localStorage on success', async () => {
      const payload = makeAuthPayload();
      vi.mocked(authService.verifyMagicLink).mockResolvedValue(payload);

      const store = makeTestStore();
      await store.dispatch(verifyMagicLink('valid-token'));

      expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBe('jwt-token-123');
      expect(JSON.parse(localStorage.getItem(AUTH_USER_KEY)!)).toEqual(payload.user);
    });

    it('should set error and errorCode when rejected with TOKEN_EXPIRED', async () => {
      const err = new Error('Token has expired') as Error & { code: string };
      err.code = 'TOKEN_EXPIRED';
      vi.mocked(authService.verifyMagicLink).mockRejectedValue(err);

      const store = makeTestStore();
      await store.dispatch(verifyMagicLink('expired-token'));

      const state = store.getState().auth;
      expect(state.error).toBe('Token has expired');
      expect(state.errorCode).toBe('TOKEN_EXPIRED');
      expect(state.isAuthenticated).toBe(false);
    });

    it('should set error and errorCode when rejected with TOKEN_INVALID', async () => {
      const err = new Error('Invalid or already used token') as Error & { code: string };
      err.code = 'TOKEN_INVALID';
      vi.mocked(authService.verifyMagicLink).mockRejectedValue(err);

      const store = makeTestStore();
      await store.dispatch(verifyMagicLink('used-token'));

      const state = store.getState().auth;
      expect(state.error).toBe('Invalid or already used token');
      expect(state.errorCode).toBe('TOKEN_INVALID');
    });

    it('should set errorCode to null when error has no code', async () => {
      vi.mocked(authService.verifyMagicLink).mockRejectedValue(
        new Error('Some generic error'),
      );

      const store = makeTestStore();
      await store.dispatch(verifyMagicLink('bad-token'));

      const state = store.getState().auth;
      expect(state.error).toBe('Some generic error');
      expect(state.errorCode).toBeNull();
    });

    it('should clear error and errorCode on pending', async () => {
      // Pre-set error state
      const err = new Error('Token has expired') as Error & { code: string };
      err.code = 'TOKEN_EXPIRED';
      vi.mocked(authService.verifyMagicLink).mockRejectedValue(err);

      const store = makeTestStore();
      await store.dispatch(verifyMagicLink('expired-token'));

      expect(store.getState().auth.errorCode).toBe('TOKEN_EXPIRED');

      // Now dispatch again — pending should clear old error
      let resolveFn!: (v: AuthTokenPayload) => void;
      vi.mocked(authService.verifyMagicLink).mockReturnValue(
        new Promise((resolve) => { resolveFn = resolve; }),
      );

      const promise = store.dispatch(verifyMagicLink('new-token'));

      // While pending, error and errorCode should be cleared
      expect(store.getState().auth.error).toBeNull();
      expect(store.getState().auth.errorCode).toBeNull();
      expect(store.getState().auth.isLoading).toBe(true);

      resolveFn(makeAuthPayload());
      await promise;
    });
  });

  // ── logout ────────────────────────────────────────────────────────────────

  describe('logout', () => {
    it('should clear errorCode along with everything else', async () => {
      // Set up authenticated + error state
      const err = new Error('expired') as Error & { code: string };
      err.code = 'TOKEN_EXPIRED';
      vi.mocked(authService.verifyMagicLink).mockRejectedValue(err);

      const store = makeTestStore();
      await store.dispatch(verifyMagicLink('bad'));
      expect(store.getState().auth.errorCode).toBe('TOKEN_EXPIRED');

      store.dispatch(logout());

      const state = store.getState().auth;
      expect(state.errorCode).toBeNull();
      expect(state.error).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
    });

    it('should remove token and user from localStorage', async () => {
      localStorage.setItem(AUTH_TOKEN_KEY, 'some-jwt');
      localStorage.setItem(AUTH_USER_KEY, '{}');

      const store = makeTestStore();
      store.dispatch(logout());

      expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBeNull();
      expect(localStorage.getItem(AUTH_USER_KEY)).toBeNull();
    });
  });

  // ── clearError ────────────────────────────────────────────────────────────

  describe('clearError', () => {
    it('should clear both error and errorCode', async () => {
      const err = new Error('expired') as Error & { code: string };
      err.code = 'TOKEN_EXPIRED';
      vi.mocked(authService.verifyMagicLink).mockRejectedValue(err);

      const store = makeTestStore();
      await store.dispatch(verifyMagicLink('bad'));

      expect(store.getState().auth.error).toBeTruthy();
      expect(store.getState().auth.errorCode).toBe('TOKEN_EXPIRED');

      store.dispatch(clearError());

      expect(store.getState().auth.error).toBeNull();
      expect(store.getState().auth.errorCode).toBeNull();
    });
  });

  // ── loadFromStorage ───────────────────────────────────────────────────────

  describe('loadFromStorage', () => {
    it('should rehydrate auth state from localStorage', () => {
      const user = makeUser();
      localStorage.setItem(AUTH_TOKEN_KEY, 'stored-jwt');
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

      const store = makeTestStore();
      store.dispatch(loadFromStorage());

      const state = store.getState().auth;
      expect(state.isAuthenticated).toBe(true);
      expect(state.token).toBe('stored-jwt');
      expect(state.user).toEqual(user);
    });

    it('should NOT set authenticated when localStorage is empty', () => {
      const store = makeTestStore();
      store.dispatch(loadFromStorage());

      expect(store.getState().auth.isAuthenticated).toBe(false);
    });
  });
});
