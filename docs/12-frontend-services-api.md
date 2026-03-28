# Фронтенд: API клієнти та сервіси

[← Redux](./11-frontend-state-management.md) | [Сторінки: Auth та Landing →](./13-frontend-pages-auth-landing.md)

---

## API клієнт — api.ts

Центральний Axios instance з interceptor'ами для JWT та обробки 401.

```typescript
// frontend/src/services/api.ts
import axios from 'axios';
import { API_BASE_URL } from '@/constants';

// Створення Axios instance з базовою URL та заголовками
const api = axios.create({
  baseURL: API_BASE_URL,                    // http://localhost:3000/api
  headers: { 'Content-Type': 'application/json' },
});

// ─── Request interceptor: додавання JWT токену ──────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Bearer JWT
  }
  return config;
});

// ─── Response interceptor: обробка 401 (сесія закінчилась) ──────────
let isHandling401 = false; // Re-entrancy guard

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !isHandling401) {
      isHandling401 = true;

      // Auto-save стан wizard у localStorage (якщо є draft job)
      try {
        const state = store.getState();
        if (state.jobs.currentJob) {
          await store.dispatch(updateJob({
            id: state.jobs.currentJob.id,
            data: { wizardState: state.deIdentification.settings },
          }));
        }
      } catch { /* ігноруємо помилки auto-save */ }

      // Збереження returnUrl для redirect після re-auth
      localStorage.setItem('returnUrl', window.location.pathname);
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Redirect на сторінку логіну
      window.location.href = '/auth/login?session=expired';
    }

    // Збереження error code для фронтенду
    if (error.response?.data?.code) {
      error.code = error.response.data.code;
    }
    return Promise.reject(error);
  },
);

export default api;
```

---

## Сервіси (по доменах)

### authService.ts

```typescript
export const authService = {
  requestMagicLink: (email: string) =>
    api.post('/auth/magic-link', { email }).then(r => r.data),

  verifyMagicLink: (token: string) =>
    api.post('/auth/verify', { token }).then(r => r.data),

  getMe: () =>
    api.get('/auth/me').then(r => r.data),
};
```

### deIdentificationService.ts

```typescript
export const deIdentificationService = {
  analyzeText: (data: AnalyzeRequest) =>
    api.post('/de-identification/analyze', data).then(r => r.data),

  anonymizeText: (data: AnonymizeRequest) =>
    api.post('/de-identification/anonymize', data).then(r => r.data),

  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/de-identification/upload', formData, {
      headers: { 'Content-Type': undefined }, // Дозволяє axios встановити boundary
    }).then(r => r.data);
  },

  getDocuments: (page = 1, limit = 20) =>
    api.get(`/de-identification/documents?page=${page}&limit=${limit}`).then(r => r.data),

  getDocument: (id: string) =>
    api.get(`/de-identification/documents/${id}`).then(r => r.data),
};
```

### jobsService.ts

```typescript
export const jobsService = {
  createJob: (data?: { framework?: string }) =>
    api.post('/de-identification/jobs', data ?? {}).then(r => r.data),
  getJob: (id: string) =>
    api.get(`/de-identification/jobs/${id}`).then(r => r.data),
  getJobs: () =>
    api.get('/de-identification/jobs').then(r => r.data),
  updateJob: (id: string, data: UpdateJobData) =>
    api.patch(`/de-identification/jobs/${id}`, data).then(r => r.data),
  runJob: (id: string) =>
    api.post(`/de-identification/jobs/${id}/run`).then(r => r.data),
};
```

### dashboardService.ts / syntheticDataService.ts

```typescript
// GET /dashboard — метрики
export const dashboardService = {
  getStats: () => api.get('/dashboard').then(r => r.data),
};

// POST /synthetic-data/generate — генерація синтетичних даних
export const syntheticDataService = {
  generate: (data: GenerateRequest) =>
    api.post('/synthetic-data/generate', data).then(r => r.data),
};
```
