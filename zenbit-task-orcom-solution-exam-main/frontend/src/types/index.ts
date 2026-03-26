/**
 * Shared TypeScript interfaces and types
 *
 * These are the "domain types" used across the entire frontend.
 * Backend DTOs should mirror these (with minor differences for API shape).
 */

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;           // UUID
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  createdAt: string;    // ISO 8601
}

export type UserRole = 'admin' | 'analyst' | 'viewer';

export interface AuthTokenPayload {
  token: string;        // JWT
  user: User;
}

// ─── Presidio / De-Identification ────────────────────────────────────────────

export interface PresidioEntity {
  entity_type: string;  // e.g. "PERSON", "US_SSN"
  start: number;        // character index (inclusive)
  end: number;          // character index (exclusive)
  score: number;        // 0.0 – 1.0 confidence
  text?: string;        // original text at this span (populated client-side)
}

export interface AnonymizeResult {
  text: string;                   // the anonymized text
  items: AnonymizedItem[];        // list of replacements made
}

export interface AnonymizedItem {
  operator: string;               // e.g. "replace", "hash"
  entity_type: string;
  start: number;
  end: number;
  text: string;                   // the replacement value (e.g. "<PERSON>")
}

export type AnonymizationStrategy = 'replace' | 'redact' | 'hash' | 'encrypt' | 'synthetic' | 'pseudonymize' | 'generalize';
export type ComplianceFramework = 'hipaa' | 'gdpr' | 'uk_dpi' | 'swiss_fadp' | 'custom';
export type HipaaMethod = 'safe_harbor' | 'expert_determination';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface DeIdentificationSettings {
  framework: ComplianceFramework;
  strategy: AnonymizationStrategy;
  entities: string[];
  language: string;
  minScore: number;   // minimum confidence threshold (0–1)
}

// ─── Document ─────────────────────────────────────────────────────────────────

export type DocumentStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface Document {
  id: string;           // UUID
  userId: string;
  originalText: string;
  anonymizedText: string | null;
  status: DocumentStatus;
  entityCount: number;
  processingTimeMs: number | null;
  framework: ComplianceFramework;
  analysisResult?: PresidioEntity[];  // populated by backend when saved via runJob
  createdAt: string;    // ISO 8601
}

// ─── Job ──────────────────────────────────────────────────────────────────────

export enum JobStatus {
  DRAFT = 'draft',
  CONFIGURED = 'configured',
  QUEUED = 'queued',
  PROCESSING = 'processing',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export interface Job {
  id: string;
  status: JobStatus;
  currentStep: number;
  wizardState: Record<string, any>;
  progress: number;
  documentId?: string;
  error?: { code: string; message: string };
  createdAt: string;
  updatedAt: string;
}

// ─── Synthetic Data ───────────────────────────────────────────────────────────

export interface SyntheticRecord {
  id: string;
  entityType: string;
  value: string;
  locale: string;
}

export interface SyntheticGenerationSettings {
  recordCount: number;
  entityTypes: string[];
  locale: string;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface DashboardMetrics {
  totalDocuments: number;
  entitiesDetected: number;
  anonymizationRate: number;   // percentage 0–100
  syntheticRecords: number;
  realDocumentCount: number;   // actual DB count (before mock fallback)
}

export interface ActivityDataPoint {
  date: string;           // "2024-03-01"
  documents: number;
  entities: number;
}

export interface EntityDistributionItem {
  entityType: string;
  count: number;
  percentage: number;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  activityChart: ActivityDataPoint[];
  entityDistribution: EntityDistributionItem[];
  recentDocuments: Document[];
}

// ─── API Response wrappers ────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}
