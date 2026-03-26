/**
 * Application-wide constants
 *
 * Rule: no magic strings or numbers scattered across components.
 * Import from here so that changes propagate automatically.
 */

// ─── API ──────────────────────────────────────────────────────────────────────
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:3000';

// ─── Auth ─────────────────────────────────────────────────────────────────────
// Key used to store the JWT in localStorage
export const AUTH_TOKEN_KEY = 'clinical_studio_token';
// Key used to store user info in localStorage (for page refresh persistence)
export const AUTH_USER_KEY = 'clinical_studio_user';

// ─── Routes ──────────────────────────────────────────────────────────────────
export const ROUTES = {
  // Public
  LANDING: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/auth/login',
  VERIFY: '/auth/verify',       // ?token=xxx — magic link verification

  // Protected (require JWT)
  DASHBOARD: '/app/dashboard',
  DE_IDENTIFY: '/app/de-identify',
  SYNTHETIC_DATA: '/app/synthetic-data',
  PROCESSING: '/app/processing',
  RESULTS: '/app/results',
} as const;

// ─── Presidio Entity Types ────────────────────────────────────────────────────
// Subset of all supported Presidio entity types.
// Full list: https://microsoft.github.io/presidio/supported_entities/
export const PRESIDIO_ENTITIES = [
  'PERSON',
  'EMAIL_ADDRESS',
  'PHONE_NUMBER',
  'US_SSN',
  'US_DRIVER_LICENSE',
  'US_PASSPORT',
  'CREDIT_CARD',
  'IBAN_CODE',
  'IP_ADDRESS',
  'LOCATION',
  'DATE_TIME',
  'NRP',            // Nationality, Religious, Political group
  'MEDICAL_LICENSE',
  'URL',
  'UK_NHS',         // UK National Health Service number
] as const;

export type PresidioEntityType = (typeof PRESIDIO_ENTITIES)[number];

// ─── Anonymization Strategies ─────────────────────────────────────────────────
export const ANONYMIZATION_STRATEGIES = ['replace', 'redact', 'hash', 'encrypt', 'synthetic', 'pseudonymize', 'generalize'] as const;
export type AnonymizationStrategy = (typeof ANONYMIZATION_STRATEGIES)[number];

// ─── HIPAA Safe Harbor PHI Identifiers ───────────────────────────────────────
// 45 CFR § 164.514(b)(2) — the 18 HIPAA identifiers
export const HIPAA_ENTITIES: PresidioEntityType[] = [
  'PERSON',
  'DATE_TIME',
  'PHONE_NUMBER',
  'LOCATION',
  'EMAIL_ADDRESS',
  'US_SSN',
  'MEDICAL_LICENSE',
  'US_PASSPORT',
  'US_DRIVER_LICENSE',
];

// Display labels for the 18 HIPAA Safe Harbor identifiers (45 CFR § 164.514(b)(2))
// Used as read-only UI labels in Safe Harbor mode
export const HIPAA_SAFE_HARBOR_LABELS = [
  'NAME', 'DATE', 'SSN', 'PHONE', 'FAX', 'EMAIL',
  'ZIP', 'MRN', 'ACCOUNT_NUMBER', 'LICENSE_NUMBER',
  'VEHICLE_ID', 'DEVICE_ID', 'URL', 'IP_ADDRESS',
  'BIOMETRIC_ID', 'PHOTO', 'OTHER_UNIQUE', 'AGE_OVER_89',
] as const;

// Presidio entities used when Safe Harbor is selected (covers all available HIPAA-relevant types)
export const HIPAA_SAFE_HARBOR_ENTITIES: PresidioEntityType[] = [
  'PERSON',
  'DATE_TIME',
  'PHONE_NUMBER',
  'LOCATION',
  'EMAIL_ADDRESS',
  'US_SSN',
  'MEDICAL_LICENSE',
  'US_PASSPORT',
  'US_DRIVER_LICENSE',
  'CREDIT_CARD',
  'IBAN_CODE',
  'IP_ADDRESS',
  'URL',
  'NRP',
];

// ─── GDPR Personal Data Categories ───────────────────────────────────────────
// Art. 4(1) GDPR — data that can identify a natural person
export const GDPR_ENTITIES: PresidioEntityType[] = [
  'PERSON',
  'EMAIL_ADDRESS',
  'PHONE_NUMBER',
  'LOCATION',
  'DATE_TIME',
  'IP_ADDRESS',
  'CREDIT_CARD',
  'IBAN_CODE',
  'NRP',
];

// ─── UK Data Protection Act 2018 (UK DPI / UK GDPR) ─────────────────────────
// Personal data categories relevant post-Brexit UK legislation
export const UK_DPI_ENTITIES: PresidioEntityType[] = [
  'PERSON',
  'EMAIL_ADDRESS',
  'PHONE_NUMBER',
  'LOCATION',
  'DATE_TIME',
  'IP_ADDRESS',
  'CREDIT_CARD',
  'IBAN_CODE',
  'UK_NHS',
];

// ─── Swiss Federal Act on Data Protection (Swiss FADP / revFADP 2023) ────────
// Personal identifiers under Switzerland's revised FADP
export const SWISS_FADP_ENTITIES: PresidioEntityType[] = [
  'PERSON',
  'EMAIL_ADDRESS',
  'PHONE_NUMBER',
  'LOCATION',
  'DATE_TIME',
  'IP_ADDRESS',
  'IBAN_CODE',
  'NRP',
];

// ─── Risk Level Entity Sets (for GDPR / UK_DPI / Swiss FADP) ─────────────────
// Low:    direct identifiers only
// Medium: all PII entities
// High:   PII + quasi-identifiers
export const RISK_LEVEL_ENTITIES: Record<'low' | 'medium' | 'high', string[]> = {
  low: [
    'PERSON', 'EMAIL_ADDRESS', 'PHONE_NUMBER', 'US_SSN',
  ],
  medium: [
    'PERSON', 'EMAIL_ADDRESS', 'PHONE_NUMBER', 'US_SSN',
    'DATE_TIME', 'LOCATION', 'IP_ADDRESS', 'URL', 'CREDIT_CARD', 'IBAN_CODE',
  ],
  high: [
    'PERSON', 'EMAIL_ADDRESS', 'PHONE_NUMBER', 'US_SSN',
    'DATE_TIME', 'LOCATION', 'IP_ADDRESS', 'URL', 'CREDIT_CARD', 'IBAN_CODE',
    'NRP', 'MEDICAL_LICENSE', 'UK_NHS',
  ],
};

// ─── Supported Languages ─────────────────────────────────────────────────────
export const PRESIDIO_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'de', label: 'German' },
  { code: 'fr', label: 'French' },
] as const;

// ─── Date / Time formats ─────────────────────────────────────────────────────
export const DATE_FORMAT = 'MMM d, yyyy';
export const DATETIME_FORMAT = 'MMM d, yyyy HH:mm';

// ─── Pagination ───────────────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 20;
