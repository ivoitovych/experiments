# Огляд проєкту та технологічний стек

[← Головна](./00-index.md) | [Інфраструктура та Docker →](./02-infrastructure-docker.md)

---

## Мета проєкту

**Clinical Data De-Identification & Synthetic Data Studio** — це повнофункціональний веб-застосунок для де-ідентифікації клінічних текстових даних. Головна мета — видалення або маскування персональної медичної інформації (PHI — Protected Health Information) відповідно до міжнародних нормативних стандартів:

| Фреймворк | Опис |
|-----------|------|
| **HIPAA** | Health Insurance Portability and Accountability Act (США). Методи: Safe Harbor (18 ідентифікаторів) та Expert Determination |
| **GDPR** | General Data Protection Regulation (ЄС). Рівні ризику: Low / Medium / High |
| **UK DPA** | UK Data Protection Act (Великобританія). Аналогічно GDPR з рівнями ризику |
| **Swiss FADP** | Swiss Federal Act on Data Protection (Швейцарія). Аналогічно GDPR |
| **Custom** | Довільний набір сутностей, обраних користувачем вручну |

---

## Архітектурна діаграма

```
┌─────────────────────────┐     HTTP/JSON     ┌───────────────────────┐
│   React 18 Frontend     │ ────────────────► │  NestJS 10 Backend    │
│   Vite + TypeScript     │  :5173 → :3000    │  TypeScript + TypeORM │
│   Redux Toolkit         │                   │  MySQL 8 (Docker)     │
│   MUI + react-i18next   │                   │  Swagger /api/docs    │
└─────────────────────────┘                   └──────────┬────────────┘
                                                         │ HTTP
                                              ┌──────────┴────────────┐
                                              │  Presidio Services    │
                                              │  (Docker containers)  │
                                              │  analyzer   :5001     │
                                              │  anonymizer :5002     │
                                              └──────────┬────────────┘
                                                         │
                                              ┌──────────┴────────────┐
                                              │  MySQL :3307 (host)   │
                                              │  :3306 (container)    │
                                              └───────────────────────┘
```

**Потік даних:**
1. Користувач через React UI вводить клінічний текст або завантажує файл
2. Фронтенд відправляє запит до NestJS бекенду (`POST /api/de-identification/analyze`)
3. Бекенд проксує запит до **Presidio Analyzer** (розпізнавання PII-сутностей)
4. Результат аналізу повертається на фронтенд для перегляду
5. Користувач запускає анонімізацію — бекенд проксує до **Presidio Anonymizer**
6. Результат зберігається у **MySQL** та відображається на сторінці Results

---

## Структура директорій проєкту

```
zenbit-task-orcom-solution-exam-main/
├── .github/
│   └── pull_request_template.md    # Шаблон PR для GitHub
├── .gitignore                      # Правила ігнорування файлів Git
├── README.md                       # Документація проєкту (англійською)
├── docker-compose.yml              # Інфраструктура: MySQL + Presidio
│
├── backend/                        # NestJS 10 бекенд
│   ├── .env.example                # Приклад змінних оточення
│   ├── .eslintrc.cjs               # Конфігурація ESLint
│   ├── .prettierrc                 # Конфігурація Prettier
│   ├── nest-cli.json               # Конфігурація NestJS CLI
│   ├── package.json                # Залежності та скрипти
│   ├── tsconfig.json               # TypeScript конфігурація
│   ├── tsconfig.build.json         # TypeScript для продакшн-збірки
│   ├── test/
│   │   └── smoke.ts                # E2E smoke-тест
│   └── src/
│       ├── main.ts                 # Точка входу NestJS
│       ├── app.module.ts           # Кореневий модуль
│       ├── config/
│       │   └── configuration.ts    # Фабрика конфігурації
│       ├── common/                 # Загальні утиліти
│       │   ├── decorators/         # @CurrentUser() декоратор
│       │   ├── filters/            # HttpExceptionFilter
│       │   ├── guards/             # JwtAuthGuard
│       │   └── interceptors/       # TransformInterceptor
│       ├── database/
│       │   ├── data-source.ts      # TypeORM DataSource для CLI
│       │   ├── migrations/         # SQL міграції
│       │   └── seeds/              # Скрипт створення admin користувача
│       └── modules/
│           ├── auth/               # Magic Link автентифікація + JWT
│           ├── users/              # CRUD користувачів
│           ├── de-identification/  # Presidio інтеграція, Jobs
│           ├── synthetic-data/     # Генерація синтетичних PHI
│           └── dashboard/          # Агреговані метрики
│
└── frontend/                       # React 18 + Vite фронтенд
    ├── .env.example                # Змінні оточення фронтенду
    ├── .eslintrc.cjs               # ESLint конфігурація
    ├── .prettierrc                 # Prettier конфігурація
    ├── index.html                  # HTML точка входу
    ├── package.json                # Залежності та скрипти
    ├── vite.config.ts              # Vite конфігурація + проксі
    ├── vitest.config.ts            # Vitest конфігурація тестів
    ├── tsconfig.json               # TypeScript (dev + test)
    ├── tsconfig.build.json         # TypeScript (prod build)
    ├── tsconfig.test.json          # TypeScript (тести)
    ├── public/
    │   └── locales/en/
    │       └── translation.json    # Всі i18n рядки (react-i18next)
    └── src/
        ├── main.tsx                # Точка входу React
        ├── App.tsx                 # Кореневий компонент
        ├── i18n.ts                 # Налаштування i18next
        ├── components/             # Перевикористовувані компоненти
        ├── constants/              # Маршрути, сутності, стратегії
        ├── hooks/                  # useAuth() кастомний хук
        ├── layouts/                # AuthLayout, LandingLayout, MainLayout
        ├── pages/                  # Сторінки додатку
        ├── routes/                 # React Router конфігурація
        ├── services/               # Axios API клієнти
        ├── store/                  # Redux Toolkit store + slices
        ├── styles/                 # MUI theme
        ├── test/                   # Утиліти для тестів
        ├── types/                  # TypeScript інтерфейси
        └── utils/                  # Допоміжні функції
```

---

## Технологічний стек

### Бекенд

| Бібліотека | Версія | Призначення |
|------------|--------|-------------|
| `@nestjs/core` | ^10.0.0 | Ядро NestJS — фреймворк для побудови серверних застосунків |
| `@nestjs/config` | ^3.2.0 | Завантаження `.env` файлів та надання `ConfigService` |
| `@nestjs/typeorm` | ^10.0.2 | Інтеграція TypeORM з NestJS через модулі |
| `typeorm` | ^0.3.20 | ORM для роботи з MySQL (entities, migrations, repository) |
| `mysql2` | ^3.9.2 | MySQL драйвер для Node.js |
| `@nestjs/passport` | ^10.0.3 | Інтеграція Passport.js для автентифікації |
| `passport-jwt` | ^4.0.1 | JWT стратегія для Passport (Bearer token) |
| `@nestjs/jwt` | ^10.2.0 | Генерація та верифікація JWT токенів |
| `@nestjs/axios` | ^3.0.2 | HTTP клієнт для викликів до Presidio сервісів |
| `@nestjs/swagger` | ^7.3.0 | Автогенерація OpenAPI документації |
| `class-validator` | ^0.14.1 | Декоратори валідації для DTO (`@IsEmail()`, `@IsString()`) |
| `class-transformer` | ^0.5.1 | Трансформація plain objects → class instances |
| `@faker-js/faker` | ^10.3.0 | Генерація реалістичних синтетичних даних (імена, SSN, адреси) |
| `uuid` | ^9.0.1 | Генерація UUID v4 для ідентифікаторів |

### Фронтенд

| Бібліотека | Версія | Призначення |
|------------|--------|-------------|
| `react` | ^18.2.0 | Бібліотека для побудови UI |
| `react-dom` | ^18.2.0 | Рендеринг React у DOM |
| `react-router-dom` | ^6.22.3 | Клієнтська маршрутизація (SPA) |
| `@reduxjs/toolkit` | ^2.2.1 | Redux з спрощеним API (createSlice, createAsyncThunk) |
| `react-redux` | ^9.1.0 | Прив'язка Redux до React (Provider, useSelector) |
| `@mui/material` | ^5.15.14 | Material UI — бібліотека компонентів |
| `@mui/icons-material` | ^5.15.14 | Іконки Material Design |
| `@emotion/react` | ^11.11.4 | CSS-in-JS движок для MUI |
| `axios` | ^1.6.7 | HTTP клієнт для API запитів |
| `react-hook-form` | ^7.51.0 | Управління формами без зайвих рендерів |
| `@hookform/resolvers` | ^3.3.4 | Інтеграція Yup валідації з react-hook-form |
| `yup` | ^1.3.3 | Схеми валідації для форм |
| `i18next` | ^23.10.1 | Фреймворк інтернаціоналізації |
| `react-i18next` | ^14.1.0 | React-обгортка для i18next |
| `recharts` | ^2.12.2 | Бібліотека графіків для Dashboard |
| `jspdf` | ^4.2.1 | Генерація PDF звітів на клієнті |

### Інфраструктура

| Компонент | Версія | Призначення |
|-----------|--------|-------------|
| Docker Compose | 3.8 | Оркестрація контейнерів |
| MySQL | 8.0 | Реляційна БД для зберігання сутностей |
| Presidio Analyzer | latest | Розпізнавання PII сутностей (NER моделі spaCy) |
| Presidio Anonymizer | latest | Анонімізація тексту (заміна, хешування, шифрування) |

### Інструменти розробки

| Інструмент | Призначення |
|------------|-------------|
| Vite 5 | Збірник фронтенду з HMR (Hot Module Replacement) |
| Vitest 1.6 | Фреймворк тестів для фронтенду (сумісний з Jest API) |
| Jest 29 | Фреймворк тестів для бекенду |
| ESLint 8 | Лінтер коду (TypeScript правила) |
| Prettier 3 | Автоформатування коду |
| TypeScript 5.3 | Статична типізація |

---

## npm скрипти

### Бекенд (`backend/package.json`)

```jsonc
{
  "scripts": {
    "build": "nest build",                    // Компіляція TypeScript → JavaScript
    "start": "nest start",                    // Запуск без hot-reload
    "start:dev": "nest start --watch",        // Запуск з автоперезавантаженням
    "start:debug": "nest start --debug --watch", // Запуск з дебагером
    "start:prod": "node dist/main",           // Продакшн запуск
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "test": "jest",                           // Юніт-тести
    "test:watch": "jest --watch",             // Тести з автоперезапуском
    "test:cov": "jest --coverage",            // Тести з покриттям
    "test:smoke": "ts-node -r tsconfig-paths/register test/smoke.ts", // E2E smoke тест
    "migration:run": "npm run typeorm -- migration:run -d src/database/data-source.ts",
    "migration:revert": "npm run typeorm -- migration:revert -d src/database/data-source.ts",
    "db:seed": "ts-node -r tsconfig-paths/register src/database/seeds/seed.ts"
  }
}
```

### Фронтенд (`frontend/package.json`)

```jsonc
{
  "scripts": {
    "dev": "vite",                            // Dev-сервер з HMR (порт 5173)
    "build": "tsc -p tsconfig.build.json && vite build", // Типи + збірка
    "lint": "eslint . --ext ts,tsx",          // Перевірка коду
    "test": "vitest run",                     // Одноразовий запуск тестів
    "test:watch": "vitest",                   // Тести з автоперезапуском
    "preview": "vite preview",                // Локальний перегляд prod-збірки
    "format": "prettier --write \"src/**/*.{ts,tsx,json}\""
  }
}
```
