import type { Language } from '@/pages/DeIdentify/types';

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '/api';
export const AUTH_TOKEN_KEY = 'clinical_studio_token';
export const AUTH_USER_KEY = 'clinical_studio_user';
export const AUTH_SESSION_STARTED_AT_KEY = 'clinical_studio_session_started_at';
export const AUTH_SESSION_MAX_AGE_MS = 60 * 60 * 1000;

export const ROUTES = {
  LANDING: '/',
  CONTACT: '/contact',
  LOGIN: '/auth/login',
  AUTH: '/auth/*',
  VERIFY_BASE: '/auth/verify',
  SESSION_EXPIRED: '/session-expired',
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

export const RECENTLY_USED: Language[] = [
  { code: 'es', name: 'Spanish' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'German' },
];

export const ALL_LANGUAGES: Language[] = [
  { code: 'ar', name: 'Arabic' },
  { code: 'bn', name: 'Bengali' },
  { code: 'zh', name: 'Chinese (Simplified)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)' },
  { code: 'cs', name: 'Czech' },
  { code: 'da', name: 'Danish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'en', name: 'English' },
  { code: 'fi', name: 'Finnish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'el', name: 'Greek' },
  { code: 'he', name: 'Hebrew' },
  { code: 'hi', name: 'Hindi' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'id', name: 'Indonesian' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'no', name: 'Norwegian' },
  { code: 'pl', name: 'Polish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ro', name: 'Romanian' },
  { code: 'ru', name: 'Russian' },
  { code: 'sk', name: 'Slovak' },
  { code: 'es', name: 'Spanish' },
  { code: 'sv', name: 'Swedish' },
  { code: 'th', name: 'Thai' },
  { code: 'tr', name: 'Turkish' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'vi', name: 'Vietnamese' },
];

export const ITEM_TO_ENTITY_MAP: Record<string, string> = {
  'deIdentify.settings.identifiers.items.names': 'NAME',
  'deIdentify.settings.identifiers.items.dates': 'DATE',
  'deIdentify.settings.identifiers.items.fax': 'FAX',
  'deIdentify.settings.identifiers.items.email': 'EMAIL',
  'deIdentify.settings.identifiers.items.phone': 'PHONE',
  'deIdentify.settings.identifiers.items.geographic': 'ZIP',
  'deIdentify.settings.identifiers.items.address': 'ADDRESS',
  'deIdentify.settings.identifiers.items.ssn': 'SSN',
  'deIdentify.settings.identifiers.items.account': 'ACCOUNT',
  'deIdentify.settings.identifiers.items.medical': 'MRN',
  'deIdentify.settings.identifiers.items.health': 'HEALTH_PLAN',
  'deIdentify.settings.identifiers.items.beneficiary': 'BENEFICIARY',
  'deIdentify.settings.identifiers.items.ip': 'IP',
  'deIdentify.settings.identifiers.items.device': 'DEVICE',
  'deIdentify.settings.identifiers.items.url': 'URL',
  'deIdentify.settings.identifiers.items.fingerprints': 'BIOMETRIC',
  'deIdentify.settings.identifiers.items.photos': 'PHOTO',
  'deIdentify.settings.identifiers.items.vehicle': 'VEHICLE',
  'deIdentify.settings.identifiers.items.certificate': 'CERTIFICATE',
};

export const IDENTIFIER_GROUPS = [
  {
    title: 'deIdentify.settings.identifiers.groups.personal',
    items: [
      'deIdentify.settings.identifiers.items.names',
      'deIdentify.settings.identifiers.items.dates',
    ],
  },
  {
    title: 'deIdentify.settings.identifiers.groups.contact',
    items: [
      'deIdentify.settings.identifiers.items.fax',
      'deIdentify.settings.identifiers.items.email',
      'deIdentify.settings.identifiers.items.phone',
    ],
  },
  {
    title: 'deIdentify.settings.identifiers.groups.location',
    items: [
      'deIdentify.settings.identifiers.items.address',
      'deIdentify.settings.identifiers.items.geographic',
    ],
  },
  {
    title: 'deIdentify.settings.identifiers.groups.financial',
    items: [
      'deIdentify.settings.identifiers.items.ssn',
      'deIdentify.settings.identifiers.items.account',
    ],
  },
  {
    title: 'deIdentify.settings.identifiers.groups.medical',
    items: [
      'deIdentify.settings.identifiers.items.medical',
      'deIdentify.settings.identifiers.items.health',
    ],
  },
  {
    title: 'deIdentify.settings.identifiers.groups.technical',
    items: [
      'deIdentify.settings.identifiers.items.ip',
      'deIdentify.settings.identifiers.items.device',
      'deIdentify.settings.identifiers.items.url',
    ],
  },
  {
    title: 'deIdentify.settings.identifiers.groups.biometric',
    items: [
      'deIdentify.settings.identifiers.items.fingerprints',
      'deIdentify.settings.identifiers.items.photos',
      'deIdentify.settings.identifiers.items.vehicle',
      'deIdentify.settings.identifiers.items.certificate',
    ],
  },
];
