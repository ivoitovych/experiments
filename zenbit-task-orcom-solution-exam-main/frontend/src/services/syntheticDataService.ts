/**
 * syntheticDataService — API client for synthetic data generation.
 *
 *   generate(settings)  → POST /synthetic-data/generate
 *   getRecords()        → GET  /synthetic-data (list all records)
 */
import api from './api';
import type { SyntheticRecord, SyntheticGenerationSettings } from '@/types';

export const syntheticDataService = {
  /**
   * Generate synthetic records.
   * The backend uses simple random generation per entity type.
   * (Could be extended to use Presidio's built-in synthetic generation.)
   */
  async generate(settings: SyntheticGenerationSettings): Promise<SyntheticRecord[]> {
    const { data } = await api.post<SyntheticRecord[]>('/synthetic-data/generate', settings);
    return data;
  },
};
