import { createAsyncThunk } from '@reduxjs/toolkit';
import { AUTH_SESSION_STARTED_AT_KEY, AUTH_TOKEN_KEY } from '@/constants';
import { getCurrentUser } from '@/services/user/user.api';
import { verify } from '@/services/auth/auth.api';
import { setUser, clearUser, setInitialized } from './auth.slice';
import { mapUser } from './auth.mappers';
import { AUTH_THUNK_TYPES } from './auth.constants';

export const initializeAuth = createAsyncThunk(
  AUTH_THUNK_TYPES.INITIALIZE,
  async (_, { dispatch }) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (!token) {
      dispatch(clearUser());
      dispatch(setInitialized(true));
      return;
    }

    try {
      const userResponse = await getCurrentUser();

      dispatch(setUser(mapUser(userResponse)));
    } catch {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      dispatch(clearUser());
    } finally {
      dispatch(setInitialized(true));
    }
  },
);

export const verifyMagicLink = createAsyncThunk(
  AUTH_THUNK_TYPES.VERIFY_MAGIC_LINK,
  async (token: string, { dispatch }) => {
    const data = await verify(token);

    localStorage.setItem(AUTH_TOKEN_KEY, data.accessToken);
    localStorage.setItem(AUTH_SESSION_STARTED_AT_KEY, Date.now().toString());

    const userResponse = await getCurrentUser();

    dispatch(setUser(mapUser(userResponse)));

    return userResponse;
  },
);

export const logout = createAsyncThunk(AUTH_THUNK_TYPES.LOGOUT, async (_, { dispatch }) => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_SESSION_STARTED_AT_KEY);
  dispatch(clearUser());
  dispatch(setInitialized(true));
});
