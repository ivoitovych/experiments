/**
 * dashboardService — API client for the dashboard endpoint.
 *
 *   getDashboard() → GET /dashboard → metrics, charts, recent documents
 */
import api from './api';
import type { DashboardData } from '@/types';

export const dashboardService = {
  /**
   * Fetch all dashboard data in a single request:
   * metrics, activity chart data, entity distribution, recent documents.
   */
  async getDashboardData(): Promise<DashboardData> {
    const { data } = await api.get<DashboardData>('/dashboard');
    return data;
  },
};
