# Фронтенд: Redux та управління станом

[← Запуск та маршрутизація](./10-frontend-bootstrap-routing.md) | [API клієнти →](./12-frontend-services-api.md)

---

## Архітектура Redux Store

```
Redux Store
├── auth                    ← Автентифікація (token, user, loading, error)
├── deIdentification        ← Де-ідентифікація (framework, entities, documents)
├── jobs                    ← Jobs (currentJob, jobs[], loading)
├── dashboard               ← Dashboard (data, loading)
└── syntheticData           ← Синтетичні дані (records, loading)
```

### Конфігурація Store

```typescript
// frontend/src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import deIdentificationReducer from './slices/deIdentificationSlice';
import jobsReducer from './slices/jobsSlice';
import dashboardReducer from './slices/dashboardSlice';
import syntheticDataReducer from './slices/syntheticDataSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    deIdentification: deIdentificationReducer,
    jobs: jobsReducer,
    dashboard: dashboardReducer,
    syntheticData: syntheticDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ігнорування серіалізації для JWT відповіді (User об'єкт)
        ignoredActions: ['auth/verifyMagicLink/fulfilled'],
      },
    }),
});

// Типізовані hooks для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Кастомні hooks замість стандартних useDispatch/useSelector
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

---

## authSlice — автентифікація

```typescript
// frontend/src/store/slices/authSlice.ts

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  errorCode: string | null;     // TOKEN_EXPIRED, TOKEN_INVALID
}

// Async thunk: запит magic link
export const requestMagicLink = createAsyncThunk(
  'auth/requestMagicLink',
  async (email: string, { rejectWithValue }) => {
    try {
      return await authService.requestMagicLink(email);
    } catch (err) { return rejectWithValue(err.response?.data?.message); }
  },
);

// Async thunk: верифікація токену
export const verifyMagicLink = createAsyncThunk(
  'auth/verifyMagicLink',
  async (token: string, { rejectWithValue }) => {
    try {
      const data = await authService.verifyMagicLink(token);
      // Збереження в localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message,
        code: err.response?.data?.code,       // TOKEN_EXPIRED, TOKEN_INVALID
      });
    }
  },
);

// Завантаження auth стану з localStorage при старті додатку
export const loadFromStorage = createAction('auth/loadFromStorage');

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearError: (state) => { state.error = null; state.errorCode = null; },
  },
  extraReducers: (builder) => {
    builder
      // requestMagicLink
      .addCase(requestMagicLink.pending, (state) => { state.isLoading = true; })
      .addCase(requestMagicLink.fulfilled, (state) => { state.isLoading = false; })
      .addCase(requestMagicLink.rejected, (state, action) => { state.error = action.payload; })
      // verifyMagicLink
      .addCase(verifyMagicLink.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(verifyMagicLink.rejected, (state, action) => {
        state.errorCode = action.payload?.code;
        state.error = action.payload?.message;
      })
      // loadFromStorage — відновлення з localStorage
      .addCase(loadFromStorage, (state) => {
        const token = localStorage.getItem('token');
        const userRaw = localStorage.getItem('user');
        if (token && userRaw) {
          state.token = token;
          state.user = JSON.parse(userRaw) as User;
          state.isAuthenticated = true;
        }
      });
  },
});
```

---

## deIdentificationSlice — де-ідентифікація

Зберігає стан wizard та результати аналізу/анонімізації.

**Ключові reducer'и:** `setFramework`, `setStrategy`, `setEntities`, `setMinScore`, `setLanguage`, `setInputText`, `resetWorkflow`

**Async thunks:** `analyzeText`, `anonymizeText`, `uploadFile`, `fetchDocuments`, `fetchDocumentById`

---

## jobsSlice — управління задачами

**State:** `{ currentJob, jobs[], isLoading, error }`

**Thunks:** `createJob`, `fetchJob`, `fetchJobs`, `updateJob`, `runJob`, `pollJob`

`pollJob` — спеціальний thunk для polling (GET /jobs/:id кожні 1.5 сек зі сторінки Processing).

---

## dashboardSlice / syntheticDataSlice

Прості слайси з одним async thunk кожен: `fetchDashboard` та `generateSyntheticData`.
