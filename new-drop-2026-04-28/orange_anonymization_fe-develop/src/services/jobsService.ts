import type { IJob } from '@/pages/DeIdentify/types';
import { api } from './api';

export const jobsService = {
  async createJob(): Promise<IJob> {
    const response = await api.post<IJob>('/jobs');
    return response.data;
  },

  async getLatestDraft(): Promise<IJob | null> {
    const response = await api.get<IJob | null>('/jobs/latest-draft');
    return response.data;
  },

  async updateJob(id: string, updateData: Partial<IJob>): Promise<IJob> {
    const response = await api.patch<IJob>(`/jobs/${id}`, updateData);
    return response.data;
  },

  async uploadFile(id: string, file: File): Promise<IJob> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<IJob>(`/jobs/${id}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async runAnalysis(id: string, originalText: string): Promise<IJob> {
    const response = await api.post<IJob>(`/jobs/${id}/run`, { originalText });
    return response.data;
  },

  async getJobById(id: string): Promise<IJob> {
    const response = await api.get<IJob>(`/jobs/${id}`);
    return response.data;
  },
};
