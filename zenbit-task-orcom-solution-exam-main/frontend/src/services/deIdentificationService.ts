/**
 * deIdentificationService — API client for de-identification endpoints.
 *
 *   analyzeText(dto)             → POST /de-identification/analyze
 *   anonymizeText(dto)           → POST /de-identification/anonymize
 *   uploadFile(file)             → POST /de-identification/upload  (multipart)
 *   getDocuments(page, limit)    → GET  /de-identification/documents
 *   getDocument(id)              → GET  /de-identification/documents/:id
 */
import api from './api';
import type {
  PresidioEntity,
  AnonymizeResult,
  Document,
  PaginatedResponse,
} from '@/types';

export interface UploadFileResult {
  fileId: string;
  fileName: string;
  fileSize: number;
  rowCount: number;
  preview: string[];
  contentType: 'csv' | 'json' | 'txt';
  rawText: string;
}

export const deIdentificationService = {
  /**
   * Step 1: Call the backend /de-identification/analyze endpoint.
   * The backend forwards the request to the Presidio Analyzer container.
   * Returns a list of detected PII entities (type, position, confidence).
   */
  async analyzeText(payload: {
    text: string;
    language: string;
    entities: string[];
  }): Promise<PresidioEntity[]> {
    const { data } = await api.post<PresidioEntity[]>('/de-identification/analyze', payload);
    return data;
  },

  /**
   * Step 2: Call the backend /de-identification/anonymize endpoint.
   * The backend forwards to the Presidio Anonymizer container.
   * Returns the anonymized text and the list of replacements made.
   */
  async anonymizeText(payload: {
    text: string;
    analyzerResults: PresidioEntity[];
    strategy: string;
    language: string;
    framework?: string;
    hipaaMethod?: string;
    riskLevel?: string;
  }): Promise<AnonymizeResult> {
    const { data } = await api.post<AnonymizeResult>('/de-identification/anonymize', payload);
    return data;
  },

  /**
   * Fetch the user's document history (paginated).
   */
  async getDocuments(params: {
    page: number;
    limit: number;
  }): Promise<PaginatedResponse<Document>> {
    const { data } = await api.get<PaginatedResponse<Document>>('/de-identification/documents', {
      params,
    });
    return data;
  },

  /**
   * Fetch a single document by ID.
   */
  async getDocument(id: string): Promise<Document> {
    const { data } = await api.get<Document>(`/de-identification/documents/${id}`);
    return data;
  },

  /**
   * Upload a file (CSV, JSON, TXT) for de-identification.
   * Returns parsed preview from the backend.
   */
  async uploadFile(file: File): Promise<UploadFileResult> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post<UploadFileResult>('/de-identification/upload', formData, {
      headers: { 'Content-Type': undefined }, // let axios set multipart/form-data with boundary
    });
    return data;
  },
};
