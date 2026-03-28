# 10. Frontend Bootstrap та Routing

## Зміст

1. [Огляд завантаження додатку](#1-огляд-завантаження-додатку)
2. [index.html — HTML-оболонка](#2-indexhtml--html-оболонка)
3. [Vite конфігурація — vite.config.ts](#3-vite-конфігурація--viteconfigts)
4. [Точка входу — main.tsx](#4-точка-входу--maintsx)
5. [Кореневий компонент — App.tsx](#5-кореневий-компонент--apptsx)
6. [React Router конфігурація — routes/index.tsx](#6-react-router-конфігурація--routesindextsx)
7. [ProtectedRoute — захист маршрутів](#7-protectedroute--захист-маршрутів)
8. [Дерево маршрутів](#8-дерево-маршрутів)
9. [Code Splitting та Lazy Loading](#9-code-splitting-та-lazy-loading)
10. [Залежності проєкту](#10-залежності-проєкту)

---

## 1. Огляд завантаження додатку

Послідовність ініціалізації React-додатку:

1. Браузер завантажує `index.html`
2. Vite впроваджує `<script type="module" src="/src/main.tsx">`
3. `main.tsx` імпортує `i18n.ts` (налаштовує інтернаціоналізацію)
4. `main.tsx` рендерить `<App />` всередині `React.StrictMode`
5. `App.tsx` відновлює JWT-токен з `localStorage` через `loadFromStorage()`
6. `App.tsx` обгортає додаток у `Provider` (Redux), `ThemeProvider` (MUI), `BrowserRouter`
7. `<AppRoutes />` визначає дерево маршрутів з lazy-loaded сторінками

---

## 2. index.html -- HTML-оболонка

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- Іконка додатку (SVG від Vite) -->
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <!-- Адаптивний viewport для мобільних пристроїв -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- SEO опис додатку -->
    <meta name="description" content="Clinical Data De-Identification & Synthetic Data Studio — HIPAA & GDPR compliant patient data anonymization powered by Microsoft Presidio." />
    <title>Clinical Data Studio</title>
    <!-- Шрифт Inter від Google Fonts — використовується в MUI темі -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <!-- Кореневий DOM-елемент, куди React монтує додаток -->
    <div id="root"></div>
    <!-- Vite впроваджує скомпільований бандл нижче -->
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Ключові моменти:**
- `<div id="root">` — єдиний DOM-вузол, в який React монтує все дерево компонентів
- `type="module"` — Vite використовує нативні ES-модулі браузера для швидкого HMR у dev-режимі
- `preconnect` до Google Fonts прискорює завантаження шрифту Inter

---

## 3. Vite конфігурація -- vite.config.ts

```typescript
// Імпорт функції для створення конфігурації Vite
import { defineConfig } from 'vite';
// Офіційний плагін React для Vite — забезпечує Fast Refresh (HMR) та JSX-трансформацію
import react from '@vitejs/plugin-react';
// Node.js модуль для роботи зі шляхами файлової системи
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // Підключення плагіну React (Babel для JSX, Fast Refresh для HMR)
  plugins: [react()],

  resolve: {
    alias: {
      // Аліас '@' дозволяє писати:
      //   import { theme } from '@/styles/theme'
      // замість:
      //   import { theme } from '../../styles/theme'
      // Це спрощує навігацію та рефакторинг імпортів
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    // Порт для dev-сервера Vite
    port: 5173,

    // Проксі для API-запитів до NestJS бекенду під час розробки.
    // Всі запити на /api/* перенаправляються на http://localhost:3000
    // Це вирішує проблему CORS у dev-режимі, бо браузер бачить
    // один origin (localhost:5173) для фронтенду і API.
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // changeOrigin: true підміняє Host заголовок на target URL
        changeOrigin: true,
      },
    },
  },
});
```

**Ключові моменти:**
- **Аліас `@`** — всі імпорти у проєкті використовують `@/...` замість відносних шляхів
- **Proxy `/api`** — у розробці запити до API проксуються на порт 3000 (NestJS), що усуває проблеми з CORS
- **Порт 5173** — стандартний порт Vite

---

## 4. Точка входу -- main.tsx

```typescript
/**
 * main.tsx — точка входу застосунку
 *
 * Файл index.html містить <script type="module" src="/src/main.tsx">,
 * тому цей модуль виконується першим.
 *
 * Послідовність ініціалізації:
 *  1. Імпорт i18n.ts — налаштовує i18next з HTTP-бекендом для перекладів
 *  2. React.StrictMode — вмикає додаткові перевірки у режимі розробки
 *  3. App — рендерить повне дерево компонентів
 */
import React from 'react';
import ReactDOM from 'react-dom/client';

// i18n ОБОВ'ЯЗКОВО імпортується ДО будь-якого компонента,
// що використовує useTranslation() — інакше переклади не будуть готові
import './i18n';

// Кореневий компонент додатку
import App from './App';

// Знаходимо DOM-елемент <div id="root"> з index.html
const rootElement = document.getElementById('root');
// Якщо елемент не знайдено — кидаємо помилку (захист від помилок у HTML)
if (!rootElement) throw new Error('Root element #root not found in index.html');

// Створюємо React root (React 18 Concurrent API) та монтуємо додаток
ReactDOM.createRoot(rootElement).render(
  // StrictMode рендерить компоненти двічі в dev-режимі,
  // щоб виявити побічні ефекти. В production не має жодного впливу.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

**Ключові моменти:**
- `ReactDOM.createRoot()` — React 18 API для Concurrent Mode
- `React.StrictMode` — подвійний рендеринг у dev-режимі для виявлення проблем з side-effects
- Імпорт `./i18n` виконується ДО рендерингу, щоб переклади були доступні у компонентах

---

## 5. Кореневий компонент -- App.tsx

```typescript
/**
 * App — кореневий компонент.
 *
 * Відповідальності:
 * 1. Обгортка в MUI ThemeProvider (кастомна тема)
 * 2. Забезпечення Redux store через <Provider>
 * 3. Налаштування React Router через <BrowserRouter>
 * 4. Відновлення auth-стану з localStorage при завантаженні
 * 5. Рендеринг дерева маршрутів через <AppRoutes>
 */
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store } from '@/store/store';
import { loadFromStorage } from '@/store/slices/authSlice';
import { theme } from '@/styles/theme';
import { AppRoutes } from '@/routes';

// Відновлення збереженого JWT-токена при старті додатку.
// Виконується ТУТ (поза деревом компонентів), щоб токен був доступний
// ДО того, як ProtectedRoute перевірить isAuthenticated.
store.dispatch(loadFromStorage());

function App() {
  return (
    // Provider — робить Redux store доступним для всіх дочірніх компонентів
    <Provider store={store}>
      {/* ThemeProvider — передає кастомну MUI-тему всім MUI-компонентам */}
      <ThemeProvider theme={theme}>
        {/* CssBaseline — нормалізація CSS від MUI (аналог normalize.css),
            встановлює базові стилі: box-sizing, margin: 0, шрифт тощо */}
        <CssBaseline />
        {/* BrowserRouter — використовує HTML5 History API для навігації
            (чисті URL без #, наприклад /app/dashboard замість /#/app/dashboard) */}
        <BrowserRouter>
          {/* AppRoutes — дерево маршрутів з lazy-loaded сторінками */}
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
```

**Ієрархія обгорток:**

```
<Provider store={store}>           // Redux — глобальний стан
  <ThemeProvider theme={theme}>    // MUI — кастомна тема
    <CssBaseline />                // MUI — CSS-нормалізація
    <BrowserRouter>                // React Router — маршрутизація
      <AppRoutes />                // Дерево маршрутів
    </BrowserRouter>
  </ThemeProvider>
</Provider>
```

**Важливо:** `store.dispatch(loadFromStorage())` виконується синхронно ДО першого рендеру. Це гарантує, що `isAuthenticated` вже буде `true`, коли `ProtectedRoute` перевіряє авторизацію.

---

## 6. React Router конфігурація -- routes/index.tsx

```typescript
/**
 * Конфігурація маршрутів
 *
 * React Router v6 використовує декларативне дерево <Routes>.
 * Layout-маршрути (маршрути тільки з element, без path) обгортають
 * дочірні маршрути спільним макетом без додавання URL-сегмента.
 *
 * Дерево маршрутів:
 *   /                     -> Landing (публічна, LandingLayout)
 *   /auth/login           -> Auth/Login (публічна, AuthLayout)
 *   /auth/verify          -> Auth/Verify (публічна, AuthLayout)
 *   /app/*                -> ProtectedRoute -> MainLayout (sidebar + AppBar + logout)
 *     /app/dashboard      -> Dashboard
 *     /app/de-identify    -> DeIdentify (степер)
 *     /app/synthetic-data -> SyntheticData
 *     /app/processing/:id -> Processing (цикл опитування)
 *     /app/results/:id    -> Results (7 інтерактивних функцій)
 */
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { ProtectedRoute } from './ProtectedRoute';
import { ROUTES } from '@/constants';
import { LandingLayout } from '@/layouts/LandingLayout';
import { MainLayout } from '@/layouts/MainLayout';

// ---- Lazy-loaded сторінки ----
// Code splitting: кожна сторінка — окремий JS-чанк, який завантажується за потребою.
// Це зменшує розмір початкового бандлу.
const Main = lazy(() => import('@/pages/Main'));           // Головна (landing)
const About = lazy(() => import('@/pages/About'));         // Про нас
const Contact = lazy(() => import('@/pages/Contact'));     // Контакти
const Auth = lazy(() => import('@/pages/Auth'));           // Логін / Верифікація
const Dashboard = lazy(() => import('@/pages/Dashboard')); // Дашборд
const DeIdentify = lazy(() => import('@/pages/DeIdentify')); // Деідентифікація (степер)
const SyntheticData = lazy(() => import('@/pages/SyntheticData')); // Синтетичні дані
const Processing = lazy(() => import('@/pages/Processing')); // Обробка (polling)
const Results = lazy(() => import('@/pages/Results'));     // Результати

// Компонент-заглушка, який показується під час завантаження lazy-компонента
function PageLoader() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );
}

export function AppRoutes() {
  return (
    // Suspense перехоплює lazy()-компоненти і показує fallback,
    // поки JavaScript-чанк сторінки завантажується
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Публічні landing-сторінки — обгорнуті LandingLayout (header + footer) */}
        <Route element={<LandingLayout />}>
          <Route path={ROUTES.LANDING} element={<Main />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
        </Route>

        {/* Сторінки авторизації — окремий макет */}
        <Route path="/auth/*" element={<Auth />} />

        {/* Захищені маршрути — всі вкладені під /app,
            обгорнуті ProtectedRoute (перевірка JWT) та MainLayout (sidebar + AppBar) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.DE_IDENTIFY} element={<DeIdentify />} />
            <Route path={ROUTES.SYNTHETIC_DATA} element={<SyntheticData />} />
            <Route path={`${ROUTES.PROCESSING}/:jobId`} element={<Processing />} />
            <Route path={`${ROUTES.RESULTS}/:jobId`} element={<Results />} />
          </Route>
        </Route>

        {/* Catch-all: перенаправлення невідомих шляхів на головну */}
        <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
      </Routes>
    </Suspense>
  );
}
```

---

## 7. ProtectedRoute -- захист маршрутів

```typescript
/**
 * ProtectedRoute
 *
 * Обгортка для маршрутів, що вимагають авторизації.
 * Якщо користувач не авторизований — перенаправляє на /auth/login.
 * Пропс `replace` замінює поточний запис в history, щоб користувач
 * не міг натиснути "Назад" і повернутися на захищену сторінку після logout.
 */
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/store';
import { ROUTES } from '@/constants';

export function ProtectedRoute() {
  // Читаємо стан авторизації з Redux store
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  // Поточна локація — зберігаємо для можливого redirect-back після логіну
  const location = useLocation();

  if (!isAuthenticated) {
    // Передаємо поточний шлях як "from" у state навігації,
    // щоб після логіну можна було перенаправити назад.
    // ПРИМІТКА: наразі verifyToken завжди переходить на ROUTES.DASHBOARD.
    // Для redirect-back потрібно читати location.state.from у flow верифікації.
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Outlet рендерить дочірній маршрут, що збігся з поточним URL
  return <Outlet />;
}
```

**Принцип роботи:**
1. `useAppSelector` читає `state.auth.isAuthenticated` з Redux store
2. Якщо `false` — `<Navigate>` перенаправляє на `/auth/login`
3. Якщо `true` — `<Outlet />` рендерить дочірній маршрут (Dashboard, DeIdentify тощо)
4. `state={{ from: location }}` зберігає URL, з якого прийшов користувач (для redirect-back)

---

## 8. Дерево маршрутів

```
/                                    [LandingLayout]
|-- /                                  Main (Landing)
|-- /about                             About
|-- /contact                           Contact
|
/auth/*                              [Auth Layout]
|-- /auth/login                        Login (magic link form)
|-- /auth/verify                       Verify (?token=xxx)
|
/app/*                               [ProtectedRoute -> MainLayout]
|-- /app/dashboard                     Dashboard
|-- /app/de-identify                   DeIdentify (4-step stepper)
|-- /app/synthetic-data                SyntheticData
|-- /app/processing/:jobId             Processing (poll loop)
|-- /app/results/:jobId                Results
|
/*                                   -> Navigate to / (catch-all)
```

**Константи маршрутів** (з `@/constants`):

| Константа          | Значення              | Тип       |
|--------------------|-----------------------|-----------|
| `ROUTES.LANDING`   | `/`                   | Публічний |
| `ROUTES.ABOUT`     | `/about`              | Публічний |
| `ROUTES.CONTACT`   | `/contact`            | Публічний |
| `ROUTES.LOGIN`     | `/auth/login`         | Публічний |
| `ROUTES.VERIFY`    | `/auth/verify`        | Публічний |
| `ROUTES.DASHBOARD` | `/app/dashboard`      | Захищений |
| `ROUTES.DE_IDENTIFY` | `/app/de-identify`  | Захищений |
| `ROUTES.SYNTHETIC_DATA` | `/app/synthetic-data` | Захищений |
| `ROUTES.PROCESSING`| `/app/processing`     | Захищений |
| `ROUTES.RESULTS`   | `/app/results`        | Захищений |

---

## 9. Code Splitting та Lazy Loading

### Як це працює

React `lazy()` у поєднанні з `Suspense` реалізує **code splitting** — розбиття коду на окремі чанки:

```
// Кожен виклик lazy() створює окремий JS-чанк при build:
const Dashboard = lazy(() => import('@/pages/Dashboard'));
// При першому переході на /app/dashboard браузер завантажить Dashboard.chunk.js
```

**Потік:**
1. Користувач переходить на `/app/dashboard`
2. React Router знаходить відповідний `<Route>` з `element={<Dashboard />}`
3. `Dashboard` ще не завантажений (lazy) — `Suspense` показує `<PageLoader />`
4. Браузер завантажує `Dashboard.chunk.js` по мережі
5. Після завантаження React рендерить компонент `Dashboard`
6. При повторному переході чанк вже у кеші — рендериться миттєво

### Переваги

- **Менший початковий бандл** — користувач завантажує тільки код поточної сторінки
- **Швидший TTI** (Time to Interactive) — менше JS для парсингу при першому завантаженні
- **Кешування** — чанки кешуються браузером, повторні завантаження миттєві

### Lazy-loaded сторінки

| Сторінка      | Чанк                  | Коли завантажується             |
|---------------|-----------------------|--------------------------------|
| Main          | `Main.chunk.js`       | Перехід на `/`                  |
| About         | `About.chunk.js`      | Перехід на `/about`             |
| Contact       | `Contact.chunk.js`    | Перехід на `/contact`           |
| Auth          | `Auth.chunk.js`       | Перехід на `/auth/*`            |
| Dashboard     | `Dashboard.chunk.js`  | Перехід на `/app/dashboard`     |
| DeIdentify    | `DeIdentify.chunk.js` | Перехід на `/app/de-identify`   |
| SyntheticData | `SyntheticData.chunk.js` | Перехід на `/app/synthetic-data` |
| Processing    | `Processing.chunk.js` | Перехід на `/app/processing/:id`|
| Results       | `Results.chunk.js`    | Перехід на `/app/results/:id`   |

---

## 10. Залежності проєкту

### Основні залежності (dependencies)

| Пакет                        | Версія    | Призначення                              |
|------------------------------|-----------|------------------------------------------|
| `react`                      | ^18.2.0   | UI-бібліотека                            |
| `react-dom`                  | ^18.2.0   | Рендеринг React у DOM                    |
| `react-router-dom`           | ^6.22.3   | Клієнтська маршрутизація                 |
| `@reduxjs/toolkit`           | ^2.2.1    | Управління станом (Redux)                |
| `react-redux`                | ^9.1.0    | Зв'язок React та Redux                  |
| `axios`                      | ^1.6.7    | HTTP-клієнт для API-запитів              |
| `@mui/material`              | ^5.15.14  | UI-компоненти Material Design            |
| `@mui/icons-material`        | ^5.15.14  | Іконки Material Design                   |
| `@emotion/react`             | ^11.11.4  | CSS-in-JS рушій (для MUI)               |
| `@emotion/styled`            | ^11.11.5  | Styled-компоненти (для MUI)              |
| `react-hook-form`            | ^7.51.0   | Управління формами                       |
| `@hookform/resolvers`        | ^3.3.4    | Валідатори для react-hook-form           |
| `yup`                        | ^1.3.3    | Схеми валідації                          |
| `i18next`                    | ^23.10.1  | Інтернаціоналізація                      |
| `react-i18next`              | ^14.1.0   | React-обгортка для i18next               |
| `i18next-http-backend`       | ^2.5.0    | Завантаження перекладів по HTTP          |
| `i18next-browser-languagedetector` | ^7.2.1 | Автодетекція мови браузера          |
| `recharts`                   | ^2.12.2   | Бібліотека графіків (для Dashboard)      |
| `jspdf`                      | ^4.2.1    | Генерація PDF-файлів                     |

### Dev-залежності (devDependencies)

| Пакет                        | Версія    | Призначення                              |
|------------------------------|-----------|------------------------------------------|
| `vite`                       | ^5.2.0    | Збирач та dev-сервер                     |
| `@vitejs/plugin-react`       | ^4.2.1    | React-плагін для Vite                    |
| `typescript`                 | ^5.2.2    | TypeScript компілятор                    |
| `vitest`                     | ^1.6.1    | Тестовий фреймворк                       |
| `@testing-library/react`     | ^14.3.1   | Утиліти тестування React                 |
| `@testing-library/jest-dom`  | ^6.9.1    | Кастомні матчери для DOM-тестів          |
| `@testing-library/user-event`| ^14.6.1   | Симуляція подій користувача              |
| `jsdom`                      | ^24.1.3   | DOM-середовище для тестів                |
| `eslint`                     | ^8.57.0   | Лінтер коду                              |
| `prettier`                   | ^3.2.5    | Форматування коду                        |
| `axios-mock-adapter`         | ^2.1.0    | Мок Axios для тестів                     |

### npm-скрипти

| Скрипт     | Команда                          | Призначення                    |
|------------|----------------------------------|-------------------------------|
| `dev`      | `vite`                           | Запуск dev-сервера з HMR      |
| `build`    | `tsc -p tsconfig.build.json && vite build` | TypeScript + Vite production build |
| `lint`     | `eslint . --ext ts,tsx ...`      | Перевірка коду ESLint          |
| `test`     | `vitest run`                     | Запуск тестів одноразово       |
| `test:watch` | `vitest`                       | Тести у watch-режимі          |
| `preview`  | `vite preview`                   | Перегляд production build      |
| `format`   | `prettier --write "src/**/*"`    | Автоформатування коду          |
