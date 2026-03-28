# Фронтенд: Hooks, утиліти, константи, типи

[← Layouts](./19-frontend-layouts.md) | [i18n та тема →](./21-frontend-i18n-theming.md)

---

## useAuth() — кастомний hook

```typescript
// frontend/src/hooks/useAuth.ts
export function useAuth() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  // Селектори auth стану
  const token = useAppSelector(s => s.auth.token);
  const user = useAppSelector(s => s.auth.user);
  const isAuthenticated = useAppSelector(s => s.auth.isAuthenticated);
  const isLoading = useAppSelector(s => s.auth.isLoading);
  const error = useAppSelector(s => s.auth.error);
  const errorCode = useAppSelector(s => s.auth.errorCode);

  // returnUrl: з query params або localStorage
  const returnUrl = searchParams.get('returnUrl') ?? localStorage.getItem('returnUrl');

  return { token, user, isAuthenticated, isLoading, error, errorCode, returnUrl };
}
```

---

## utils/index.ts — допоміжні функції

```typescript
// Форматування score (0.85 → "85%")
export const formatScore = (score: number): string => `${Math.round(score * 100)}%`;

// Форматування розміру файлу (1024 → "1 KB")
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

// Форматування дати (ISO → "Mar 15, 2024")
export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// Санітизація для PDF (non-Latin-1 → "?")
export const sanitizeForPdf = (text: string): string =>
  text.replace(/[^\x00-\xFF]/g, '?');
```

---

## constants/index.ts — константи

```typescript
// Маршрути додатку
export const ROUTES = {
  LANDING: '/',
  LOGIN: '/auth/login',
  VERIFY: '/auth/verify',
  DASHBOARD: '/app/dashboard',
  DE_IDENTIFY: '/app/de-identify',
  PROCESSING: '/app/processing',
  RESULTS: '/app/results',
  SYNTHETIC_DATA: '/app/synthetic-data',
};

// Базовий URL API
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) ?? 'http://localhost:3000';

// Типи PII сутностей Presidio
export const PRESIDIO_ENTITIES = [
  'PERSON', 'EMAIL_ADDRESS', 'PHONE_NUMBER', 'US_SSN', 'DATE_TIME',
  'LOCATION', 'CREDIT_CARD', 'IBAN_CODE', 'IP_ADDRESS', 'URL',
  'US_PASSPORT', 'US_DRIVER_LICENSE', 'MEDICAL_LICENSE', 'NRP',
  'US_BANK_NUMBER', 'US_ITIN', 'UK_NHS',
];

// Набори сутностей за фреймворком
export const HIPAA_ENTITIES = ['PERSON', 'DATE_TIME', 'PHONE_NUMBER', ...];
export const GDPR_LOW_ENTITIES = ['PERSON', 'EMAIL_ADDRESS', 'PHONE_NUMBER', 'US_SSN'];
// ... та інші рівні ризику

// Стратегії анонімізації
export const ANONYMIZATION_STRATEGIES = [
  'replace', 'redact', 'hash', 'encrypt', 'synthetic', 'pseudonymize', 'generalize',
];
```

---

## types/index.ts — TypeScript інтерфейси

```typescript
// Користувач
export interface User {
  id: string; email: string; firstName?: string; lastName?: string;
  role: 'admin' | 'analyst' | 'viewer'; createdAt: string;
}

// Документ (результат де-ідентифікації)
export interface Document {
  id: string; userId: string; originalText: string; anonymizedText: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  entityCount: number; processingTimeMs: number;
  framework: ComplianceFramework; analysisResult: AnalyzerResult[];
  createdAt: string;
}

// Job (задача де-ідентифікації)
export interface Job {
  id: string; userId: string; status: JobStatus; currentStep: number;
  wizardState: Record<string, any>; progress: number;
  documentId: string | null; error: { code: string; message: string } | null;
  createdAt: string; updatedAt: string;
}

// Статуси Job
export enum JobStatus {
  DRAFT = 'draft', CONFIGURED = 'configured', QUEUED = 'queued',
  PROCESSING = 'processing', SUCCEEDED = 'succeeded', FAILED = 'failed',
}

// Результат аналізу Presidio
export interface AnalyzerResult {
  entity_type: string; start: number; end: number; score: number;
}
```
