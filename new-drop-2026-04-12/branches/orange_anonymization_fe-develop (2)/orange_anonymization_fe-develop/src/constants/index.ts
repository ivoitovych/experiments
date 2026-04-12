export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '/api';
export const AUTH_TOKEN_KEY = 'clinical_studio_token';
export const AUTH_USER_KEY = 'clinical_studio_user';

export const ROUTES = {
  LANDING: '/',
  CONTACT: '/contact',
  LOGIN: '/auth/login',
  TOKEN: '/auth/verify/token/:token',
  DASHBOARD: '/app',
  DE_IDENTIFY: '/app/de-identify',
  SYNTHETIC_DATA: '/app/synthetic-data',
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 64,
  h4: 22,
  h3: 28,
  h2: 36,
  h1: 48,
} as const;

export const LINE_HEIGHTS = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
} as const;
