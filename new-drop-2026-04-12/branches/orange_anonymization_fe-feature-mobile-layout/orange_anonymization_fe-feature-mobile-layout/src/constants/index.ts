export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;
export const AUTH_TOKEN_KEY = 'clinical_studio_token';
export const AUTH_USER_KEY = 'clinical_studio_user';

export const ROUTES = {
  LOGIN: '/auth/login',
  DASHBOARD: '/app/dashboard',
  DE_IDENTIFY: '/app/de-identify',
  SYNTHETIC_DATA: '/app/synthetic-data',
} as const;
