/**
 * jobsService — API client for wizard job endpoints.
 *
 *   createJob(data?)       → POST  /de-identification/jobs
 *   getJobs()              → GET   /de-identification/jobs
 *   getJob(id)             → GET   /de-identification/jobs/:id
 *   updateJob(id, data)    → PATCH /de-identification/jobs/:id  (auto-save)
 *   runJob(id)             → POST  /de-identification/jobs/:id/run
 */
import api from './api';
import type { Job } from '@/types';

export const jobsService = {
  async createJob(data?: { framework?: string }): Promise<Job> {
    const { data: job } = await api.post<Job>('/de-identification/jobs', data ?? {});
    return job;
  },

  async getJobs(): Promise<Job[]> {
    const { data } = await api.get<Job[]>('/de-identification/jobs');
    return data;
  },

  async getJob(id: string): Promise<Job> {
    const { data } = await api.get<Job>(`/de-identification/jobs/${id}`);
    return data;
  },

  async updateJob(
    id: string,
    data: {
      currentStep?: number;
      wizardState?: Record<string, any>;
      status?: string;
    },
  ): Promise<Job> {
    const { data: job } = await api.patch<Job>(`/de-identification/jobs/${id}`, data);
    return job;
  },

  async runJob(id: string): Promise<Job> {
    const { data } = await api.post<Job>(`/de-identification/jobs/${id}/run`);
    return data;
  },
};
