import type { JobResults } from '@/pages/DeIdentify/types';
import { api } from './api';

export const resultsService = {
  async getResults(id: string): Promise<JobResults> {
    const response = await api.get<JobResults>(`/app/results/${id}`);
    return response.data;
  },

  async exportJson(id: string): Promise<void> {
    const response = await api.get(`/app/results/${id}/export/json`, {
      responseType: 'blob',
    });
    this._downloadFile(response.data, `result-${id}.json`);
  },

  async exportCsv(id: string): Promise<void> {
    const response = await api.get(`/app/results/${id}/export/csv`, {
      responseType: 'blob',
    });
    this._downloadFile(response.data, `result-${id}.csv`);
  },

  async exportPdf(id: string): Promise<void> {
    const response = await api.get(`/app/results/${id}/export/pdf`, {
      responseType: 'blob',
    });
    this._downloadFile(response.data, `Compliance_Report_${id}.pdf`);
  },

  _downloadFile(data: Blob, filename: string) {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
};
