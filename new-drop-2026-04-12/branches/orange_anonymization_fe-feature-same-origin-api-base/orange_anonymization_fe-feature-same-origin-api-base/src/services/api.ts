import axios, { type AxiosError } from 'axios';
import { API_BASE_URL, AUTH_TOKEN_KEY, ROUTES } from '@/constants';
import type { ApiError } from '@/services/types';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      window.location.href = ROUTES.LOGIN;
      return Promise.reject(new Error('Session expired. Please sign in again.'));
    }

    const serverMessage = error.response?.data?.message;
    const message = Array.isArray(serverMessage)
      ? serverMessage.join(', ')
      : (serverMessage ?? error.message ?? 'An unexpected error occurred');

    return Promise.reject(new Error(message));
  },
);

export default api;
