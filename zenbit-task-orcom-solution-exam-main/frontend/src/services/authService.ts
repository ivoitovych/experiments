/**
 * authService — API client for authentication endpoints.
 *
 *   requestMagicLink(email)  → POST /auth/magic-link
 *   verifyMagicLink(token)   → POST /auth/verify → returns JWT + user
 *   getMe()                  → GET  /auth/me     → returns user profile
 */
import api from './api';
import type { AuthTokenPayload } from '@/types';

export const authService = {
  /**
   * Request a magic link.
   * Backend generates a one-time token. In dev, the link is logged to the console.
   * In production, an email would be sent via a mail service.
   * Returns void — the user will click the link to verify.
   */
  async requestMagicLink(email: string): Promise<void> {
    await api.post('/auth/magic-link', { email });
  },

  /**
   * Verify a magic link token (from the URL query param).
   * Returns the JWT + user object on success.
   */
  async verifyMagicLink(token: string): Promise<AuthTokenPayload> {
    const { data } = await api.post<AuthTokenPayload>('/auth/verify', { token });
    return data;
  },

  /**
   * Get the currently authenticated user's profile.
   */
  async getMe(): Promise<AuthTokenPayload['user']> {
    const { data } = await api.get<AuthTokenPayload['user']>('/auth/me');
    return data;
  },
};
