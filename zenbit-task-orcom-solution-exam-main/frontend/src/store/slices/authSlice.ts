/**
 * Auth Slice
 *
 * Manages authentication state: user, JWT token, magic link flow.
 *
 * Flow:
 *  1. User enters email → dispatch requestMagicLink(email)
 *     → sets magicLinkSent = true, stores email
 *  2. User clicks link in email → app calls verifyMagicLink(token)
 *     → sets user, token, isAuthenticated = true
 *  3. On page refresh, token is rehydrated from localStorage via loadFromStorage()
 *  4. logout() clears everything and removes from localStorage
 */
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/services/authService';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '@/constants';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  errorCode: string | null;
  // Magic link flow
  magicLinkSent: boolean;
  magicLinkEmail: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  errorCode: null,
  magicLinkSent: false,
  magicLinkEmail: null,
};

// ─── Async Thunks ─────────────────────────────────────────────────────────────

export const requestMagicLink = createAsyncThunk(
  'auth/requestMagicLink',
  async (email: string, { rejectWithValue }) => {
    try {
      await authService.requestMagicLink(email);
      return email;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to send magic link';
      return rejectWithValue(message);
    }
  },
);

export const verifyMagicLink = createAsyncThunk(
  'auth/verifyMagicLink',
  async (token: string, { rejectWithValue }) => {
    try {
      const result = await authService.verifyMagicLink(token);
      // Persist to localStorage so token survives page refresh
      localStorage.setItem(AUTH_TOKEN_KEY, result.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(result.user));
      return result;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Verification failed';
      const code = (err as Error & { code?: string })?.code ?? null;
      return rejectWithValue({ message, code });
    }
  },
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Called on app startup to rehydrate auth state from localStorage.
     * This prevents the user from being logged out on every page refresh.
     */
    loadFromStorage(state) {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      const userRaw = localStorage.getItem(AUTH_USER_KEY);
      if (token && userRaw) {
        state.token = token;
        state.user = JSON.parse(userRaw) as User;
        state.isAuthenticated = true;
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.magicLinkSent = false;
      state.magicLinkEmail = null;
      state.error = null;
      state.errorCode = null;
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    },
    clearError(state) {
      state.error = null;
      state.errorCode = null;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    // requestMagicLink
    builder
      .addCase(requestMagicLink.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestMagicLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.magicLinkSent = true;
        state.magicLinkEmail = action.payload;
      })
      .addCase(requestMagicLink.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // verifyMagicLink
    builder
      .addCase(verifyMagicLink.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(verifyMagicLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(verifyMagicLink.rejected, (state, action) => {
        state.isLoading = false;
        const payload = action.payload as { message: string; code: string | null } | undefined;
        state.error = payload?.message ?? 'Verification failed';
        state.errorCode = payload?.code ?? null;
      });
  },
});

export const { loadFromStorage, logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
