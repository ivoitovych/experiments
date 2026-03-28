# Тестування

[← API контракти](./22-api-contracts.md) | [Головна →](./00-index.md)

---

## Стратегія тестування

| Рівень | Інструмент | Де |
|--------|------------|----|
| Backend Unit | Jest 29 | `backend/src/**/*.spec.ts` |
| Frontend Unit | Vitest 1.6 + Testing Library | `frontend/src/**/*.test.{ts,tsx}` |
| Frontend Component | Vitest + @testing-library/react | `frontend/src/pages/**/*.test.tsx` |
| E2E Smoke | ts-node (ручний) | `backend/test/smoke.ts` |

---

## Backend тести (Jest)

### auth.service.spec.ts
- UUID формат токену
- Унікальність токенів при повторних запитах
- Час expiry з допуском ±2 сек
- Одноразове використання (clearing після верифікації)
- Активація користувача при першому вході
- Коди помилок: TOKEN_EXPIRED, TOKEN_INVALID
- Видалення sensitive полів з відповіді

### jobs.service.spec.ts
- Створення Job зі статусом DRAFT
- Валідація переходів статусів
- Заборона доступу іншого користувача (ForbiddenException)
- Pipeline: analyze → anonymize → save → SUCCEEDED
- Обробка помилок → FAILED

### presidio.service.spec.ts
- Коректне проксування до Presidio Analyzer
- Коректне проксування до Presidio Anonymizer
- Обробка помилок підключення (ECONNREFUSED)
- Обробка таймаутів

### users.service.spec.ts
- CRUD операції (create, findOne, update, remove)
- findOrCreate (ідемпотентність)
- setMagicLinkToken / clearMagicLinkToken

---

## Frontend тести (Vitest)

### authSlice.test.ts
```typescript
// Приклад: тест logout
it('should clear auth state on logout', () => {
  const store = makeTestStore({ auth: { token: 'jwt', user: mockUser, isAuthenticated: true } });
  store.dispatch(logout());
  expect(store.getState().auth.isAuthenticated).toBe(false);
  expect(store.getState().auth.token).toBeNull();
});
```

### Results.test.tsx (27 тестів)
- Entity toggle: вмикання/вимикання типів
- Sync scroll: перевірка наявності панелей
- Copy cell: clipboard API
- PDF export: jsPDF виклик
- Audit trail: розгортання секції
- Edge cases: пустий документ, відсутні entities

### api.test.ts (axios-mock-adapter)
```typescript
// Перевірка JWT interceptor
it('should add Authorization header', async () => {
  localStorage.setItem('token', 'test-jwt');
  mock.onGet('/test').reply(200, {});
  await api.get('/test');
  expect(mock.history.get[0].headers.Authorization).toBe('Bearer test-jwt');
});
```

---

## makeTestStore — хелпер для тестів

```typescript
// frontend/src/test/makeTestStore.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';

// Використовує реальні reducer'и (не моки!)
const rootReducer = combineReducers({
  auth: authReducer,
  deIdentification: deIdentificationReducer,
  jobs: jobsReducer,
  dashboard: dashboardReducer,
  syntheticData: syntheticDataReducer,
});

export function makeTestStore(preloadedState?: Record<string, any>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as any,
    middleware: (getDefault) => getDefault({ serializableCheck: false }),
  });
}
```

---

## Smoke тест (E2E)

```typescript
// backend/test/smoke.ts — запускається проти працюючого бекенду + Docker
// npm run test:smoke

// Потік:
// 1. POST /auth/magic-link → запит лінку
// 2. SELECT magicLinkToken FROM users → витягнути токен з БД (docker exec mysql)
// 3. POST /auth/verify → обміняти на JWT
// 4. GET /auth/me → перевірити профіль
// 5. POST /de-identification/analyze → перевірити Presidio
// 6. POST /synthetic-data/generate → перевірити генерацію
```

---

## Команди запуску

```bash
# Backend
cd backend
npm test                    # Юніт-тести (Jest)
npm run test:cov            # З покриттям
npm run test:smoke          # Smoke E2E

# Frontend
cd frontend
npm test                    # Одноразовий запуск (Vitest)
npm run test:watch          # Авто-перезапуск при змінах
```

---

## Таблиця покриття

| Область | З тестами | Всього | % |
|---------|:---------:|:------:|:-:|
| Backend сервіси | 5 | 7 | 71% |
| Backend контролери | 0 | 6 | 0% |
| Frontend сторінки | 4 | ~9 | 44% |
| Frontend slices | 3 | 5 | 60% |
| Frontend сервіси | 1 | 5 | 20% |
