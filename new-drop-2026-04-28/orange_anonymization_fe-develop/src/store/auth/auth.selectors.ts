import type { RootState } from '@/store/store';

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.user);
export const selectAuthInitialized = (state: RootState) => state.auth.initialized;
