
# Clinical Data De-Identification & Synthetic Data Studio

A full-stack learning project demonstrating HIPAA-compliant clinical text de-identification using **Microsoft Presidio**, built with React 18 + NestJS 10.

---

## Architecture Overview

```
┌─────────────────────────┐     HTTP/JSON     ┌───────────────────────┐
│   React 18 Frontend     │ ────────────────  │  NestJS 10 Backend    │
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

## Project Structure

```
zenbit-task-orcom-solution-exam/
├── frontend/                          # React 18 + Vite + TypeScript
│   ├── public/locales/en/
│   │   └── translation.json           # All i18n strings (react-i18next)
│   ├── src/
│   │   ├── components/
│   │   │   ├── DocumentDetailDialog/  # Modal: original/anonymized text + entity list
│   │   │   ├── ErrorBoundary/         # Class component error boundary
│   │   │   ├── FileUpload/            # Drag-and-drop CSV/JSON/TXT uploader
│   │   │   ├── HipaaConfig/           # Step 3: Safe Harbor vs Expert Determ. UI
│   │   │   ├── LoadingSpinner/        # Reusable loading indicator
│   │   │   ├── RiskSliderConfig/      # Step 3: GDPR/UK_DPI/Swiss FADP risk slider
│   │   │   └── StrategySelect/        # Anonymization strategy dropdown
│   │   ├── constants/index.ts         # ROUTES, PRESIDIO_ENTITIES, framework presets
│   │   ├── hooks/useAuth.ts           # Auth state hook + returnUrl redirect
│   │   ├── layouts/
│   │   │   ├── AuthLayout/            # Centered card layout for auth pages
│   │   │   ├── LandingLayout/         # Public landing page shell
│   │   │   └── MainLayout/            # App shell: sidebar nav + AppBar + user menu + logout
│   │   ├── pages/
│   │   │   ├── About/                 # Static about page
│   │   │   ├── Auth/                  # Magic link request + verify flow + Auth.test.tsx
│   │   │   ├── Contact/               # Static contact page
│   │   │   ├── Dashboard/             # Stats cards + document list + Recharts
│   │   │   ├── DeIdentify/            # 4-step de-identification wizard
│   │   │   │   ├── DeIdentify.tsx     # Step 0-3: framework → input → settings → review
│   │   │   │   └── DeIdentify.step3.test.tsx
│   │   │   ├── Landing/sections/      # Hero, Features, Compliance, Trust badges, etc.
│   │   │   ├── Main/                  # App entry after login
│   │   │   ├── Processing/            # Polls job status → redirects to Results
│   │   │   │   ├── Processing.tsx
│   │   │   │   └── Processing.test.tsx
│   │   │   ├── Results/               # De-ID results with 7 interactive features (see below)
│   │   │   │   ├── Results.tsx        # Entity toggle, sync scroll, copy cell, PDF export,
│   │   │   │   │                      # compliance audit trail, re-run with tweaks, navigation
│   │   │   │   └── Results.test.tsx   # 27 tests covering all 7 features + edge cases
│   │   │   └── SyntheticData/         # Fake PHI generation form
│   │   ├── routes/
│   │   │   ├── index.tsx              # Lazy-loaded route definitions
│   │   │   └── ProtectedRoute.tsx     # JWT guard wrapper
│   │   ├── services/                  # Axios API clients (one file per domain)
│   │   │   ├── api.ts                 # Axios instance + JWT interceptor + 401 session handler
│   │   │   ├── api.test.ts            # Interceptor tests (axios-mock-adapter)
│   │   │   ├── authService.ts             # magic-link request + verify token
│   │   │   ├── dashboardService.ts        # GET /dashboard/stats
│   │   │   ├── deIdentificationService.ts # analyze, anonymize, upload, getDocuments
│   │   │   ├── jobsService.ts             # create/get/update/run job
│   │   │   └── syntheticDataService.ts    # generate + list synthetic records
│   │   ├── store/
│   │   │   ├── store.ts               # configureStore + typed hooks
│   │   │   └── slices/
│   │   │       ├── authSlice.ts                + .test.ts
│   │   │       ├── dashboardSlice.ts
│   │   │       ├── deIdentificationSlice.ts   + .test.ts
│   │   │       ├── jobsSlice.ts               + .test.ts
│   │   │       └── syntheticDataSlice.ts
│   │   ├── styles/theme.ts            # MUI theme overrides
│   │   ├── test/
│   │   │   ├── makeTestStore.ts       # RTK store factory for tests (combineReducers)
│   │   │   └── setup.ts               # Vitest global setup (@testing-library/jest-dom)
│   │   ├── types/index.ts             # Shared TypeScript types
│   │   └── utils/index.ts             # formatScore, formatBytes, etc.
│   ├── tsconfig.json                  # Dev tsconfig (includes test files)
│   ├── tsconfig.build.json            # Build tsconfig (excludes *.test.* files)
│   ├── tsconfig.test.json             # Vitest tsconfig
│   ├── vitest.config.ts               # Vitest + jsdom setup
│   └── vite.config.ts
├── backend/                           # NestJS 10 + TypeORM + MySQL
│   └── src/
│       ├── modules/
│       │   ├── auth/                  # Magic link + JWT strategy (Passport)
│       │   │   ├── auth.service.ts    + .spec.ts
│       │   │   ├── auth.controller.ts
│       │   │   └── strategies/jwt.strategy.ts
│       │   ├── users/                 # Users CRUD
│       │   │   └── users.service.ts   + .spec.ts
│       │   ├── de-identification/     # Core de-identification module
│       │   │   ├── entities/
│       │   │   │   ├── document.entity.ts   # Processed document + audit fields
│       │   │   │   └── job.entity.ts        # Wizard job + JobStatus enum
│       │   │   ├── dto/
│       │   │   │   ├── analyze-text.dto.ts    # text, language, entities[], minScore
│       │   │   │   ├── anonymize-text.dto.ts  # analyzerResults[], strategy, framework, hipaaMethod, riskLevel
│       │   │   │   ├── create-job.dto.ts      # optional framework field
│       │   │   │   └── update-job.dto.ts      # ALLOWED_STATUS_TRANSITIONS map
│       │   │   ├── presidio.service.ts      # HTTP proxy to Presidio + operator map
│       │   │   │                              + .spec.ts
│       │   │   ├── de-identification.service.ts  # analyze/anonymize/upload/resolveOverlaps
│       │   │   │                                   + .spec.ts
│       │   │   ├── de-identification.controller.ts
│       │   │   ├── jobs.service.ts          # CRUD + runJob pipeline
│       │   │   │                              + .spec.ts
│       │   │   └── jobs.controller.ts
│       │   ├── synthetic-data/        # Fake PHI generation
│       │   └── dashboard/             # Aggregated stats endpoint
│       ├── common/
│       │   ├── decorators/current-user.decorator.ts  # @CurrentUser() → JwtPayload from request
│       │   ├── filters/http-exception.filter.ts      # formats all errors as { statusCode, message }
│       │   ├── guards/auth.guard.ts                  # JwtAuthGuard — validates Bearer token
│       │   └── interceptors/transform.interceptor.ts # wraps every response in { data: ... }
│       ├── config/configuration.ts    # ConfigService factory
│       └── database/
│           ├── data-source.ts         # TypeORM CLI data source
│           ├── migrations/            # SQL migrations (run in prod)
│           └── seeds/seed.ts          # Initial admin user
├── docker-compose.yml                 # MySQL 8 + Presidio analyzer/anonymizer
├── .github/pull_request_template.md
└── README.md
```

---

## Quick Start

### 1. Prerequisites

- Node.js 20+
- Docker + Docker Compose

### 2. Start infrastructure (MySQL + Presidio)

```bash
# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit backend/.env with your settings, then:
docker compose up -d
```

Wait for containers to be healthy (Presidio loads ML models, takes ~30 s on first start):

```bash
docker compose ps
```

### 3. Start the backend

```bash
cd backend
npm install
npm run start:dev
# API:     http://localhost:3000
# Swagger: http://localhost:3000/api/docs
```

### 4. (Optional) Run migrations + seed

```bash
# Apply schema migrations (required when DB_SYNCHRONIZE=false in prod):
npm run migration:run

# Create the first admin user:
npm run db:seed
```

### 5. Start the frontend

```bash
cd frontend
npm install
npm run dev
# App: http://localhost:5173
```

---

## Testing

### Frontend unit tests (Vitest + Testing Library)

```bash
cd frontend
npm test              # run all *.test.tsx in watch mode
npm run test:run      # single run (CI)
npm run test:cov      # with v8 coverage report
```

Key test files:

| File | What is tested |
|------|---------------|
| `src/store/slices/deIdentificationSlice.test.ts` | Redux slice reducers + async thunks |
| `src/store/slices/jobsSlice.test.ts` | Jobs slice async thunks |
| `src/store/slices/authSlice.test.ts` | Auth slice: errorCode, logout clears state, clearError, loadFromStorage |
| `src/pages/DeIdentify/DeIdentify.step3.test.tsx` | Step 3 framework-dependent config UI |
| `src/pages/Processing/Processing.test.tsx` | Polling logic + status transitions |
| `src/pages/Results/Results.test.tsx` | Results page — 27 tests: entity toggle, sync scroll, copy cell, PDF export, audit trail, navigation, edge cases |
| `src/pages/Auth/Auth.test.tsx` | Verify view: TOKEN_EXPIRED/TOKEN_INVALID messages, "Request new link" button, redirect |
| `src/services/api.test.ts` | Axios interceptors: 401 handling, returnUrl save, auto-save draft, error code preservation |

### Backend unit tests (Jest — mocked repository/service layer)

```bash
cd backend
npm test              # run all *.spec.ts
npm run test:cov      # with coverage report
```

### Smoke tests (real HTTP against running server)

Requires the backend and Docker stack to be running:

```bash
cd backend
npm run test:smoke
```

The smoke test:

1. Calls `POST /api/auth/magic-link`
2. Reads the magic link token directly from MySQL via `docker exec`
3. Calls `POST /api/auth/verify` → gets a JWT
4. Hits every protected endpoint and asserts 200/201/204

---

## Authentication Flow (Magic Link)

```
1. POST /api/auth/magic-link  { email }
   → Creates/finds user, generates UUID token, logs magic link URL to console

2. [dev] Open link: http://localhost:5173/auth/verify?token=<uuid>
   → Frontend reads ?token= from URL, calls POST /api/auth/verify

3. POST /api/auth/verify  { token }
   → Validates token + expiry, clears token (one-time use), returns JWT
   → Expired token → 401 { code: 'TOKEN_EXPIRED' } (token cleared from DB)
   → Invalid/missing token → 401 { code: 'TOKEN_INVALID' }

4. Frontend stores JWT in Redux + localStorage
   → All subsequent requests: Authorization: Bearer <jwt>
```

---

## De-Identification Flow

4-step wizard in the frontend:

```
Step 1 — Select Framework: hipaa | gdpr | uk_dpi | swiss_fadp | custom
         Pre-populates entity list; saved as metadata on each document.

Step 2 — Input Text: paste text or upload a file (CSV / JSON / TXT, max 5 MB)
         POST /api/de-identification/upload
         Body: multipart/form-data  file=<binary>
         → Validates MIME type, strips null bytes + control chars, enforces 100 000 char cap
         → Parses file, returns { fileId, fileName, fileSize, rowCount, preview, contentType, rawText }

Step 3 — Anonymization Config (framework-dependent):

  HIPAA → method selector:
    • Safe Harbor    — all 18 PHI identifiers pre-selected (read-only), strategy picker
    • Expert Determ. — manual entity selection + expert disclaimer, strategy picker

  GDPR / UK_DPI / Swiss FADP → risk level slider:
    • Low    — direct identifiers only (PERSON, EMAIL, PHONE, SSN)
    • Medium — all PII entities (+ DATE, LOCATION, IP, URL, ACCOUNT)
    • High   — including quasi-identifiers (+ NRP, MEDICAL_LICENSE, UK_NHS)
    Slider auto-updates entity list; strategy picker always visible.

  CUSTOM → full manual entity chip selection + strategy picker (unchanged)

  Common for all: language selector, minimum confidence threshold slider.

Step 4 — Review & Run:
  Summary card shows: framework, input source, entity count, strategy, language, min. confidence.
  "Run Analysis" creates a Job, sets status→configured, fires POST /jobs/:id/run, redirects to Processing page.
  Processing page polls GET /jobs/:id until status=succeeded|failed, then redirects to Results page.

  Pipeline (executed by jobs.service.ts → runJob):
  a. POST /api/de-identification/analyze
     Body: { text, language, entities[], minScore }
     → NestJS proxies to presidio-analyzer (port 5001) with score_threshold param
     → Returns: [{ entity_type, start, end, score }]
     → Overlapping results resolved server-side before anonymization (highest score wins)

  b. POST /api/de-identification/anonymize
     Body: { text, analyzerResults[], strategy, language, framework, hipaaMethod?, riskLevel? }
     → hipaaMethod=safe_harbor: enforces all 18 Safe Harbor entity types server-side
     → riskLevel: filters analyzerResults to allowed entity types for that level
     → Builds per-entity-type operator map (e.g. PERSON → <PERSON>) — no Presidio template vars
     → NestJS proxies to presidio-anonymizer (port 5002)
     → Returns: { text: "<anonymized>", items: [...] }
     → Saves document to MySQL for audit trail (with framework tag)
```

Available anonymization strategies: `replace` · `redact` · `hash` · `encrypt` · `synthetic` · `pseudonymize` · `generalize`

---

## Results Page — 7 Interactive Features

After a de-identification job succeeds, the Results screen (`/app/results/:jobId`) provides:

### 1. Entity Toggle
Filter chips for each detected entity type (PERSON, US_SSN, DATE_TIME, …) showing counts. Clicking a chip toggles it off/on — disabled types are hidden from highlight spans in the original text panel and their table rows are dimmed to 35 % opacity.

### 2. Sync Scroll
The left (original) and right (anonymized) `<pre>` panels scroll in lockstep. A shared `isSyncing` ref guard prevents infinite recursion; the flag resets on the next `requestAnimationFrame`.

### 3. Copy Cell
Hovering any highlighted entity span reveals a MUI Tooltip with the entity type label and a copy icon. Clicking the icon writes the entity text to `navigator.clipboard` and shows a Snackbar confirmation.

### 4. Export PDF
Generates a jsPDF document with report metadata (date, framework, entity count) and the full anonymized text. Non-Latin-1 characters (e.g. Cyrillic) are sanitized to `?` because jsPDF's built-in Helvetica only supports the Latin-1 range (U+0000–U+00FF). Auto-paginates if text overflows.

### 5. Compliance Audit Trail
Expandable MUI Accordion showing:
- **Framework** (e.g. HIPAA — Safe Harbor)
- **Method** (Automated de-identification via Microsoft Presidio)
- **Entities detected** with per-type breakdown
- **Strategies applied** (read from the job's `wizardState.strategy`)
- **Processing time** and **Timestamp**
- **Download Compliance Report** — separate PDF with all audit fields

### 6. Re-run with Tweaks
"Adjust Settings" button navigates to `/app/de-identify?jobId=<id>&step=3`, sending the user back to the wizard's configuration step with the current job pre-loaded.

### 7. Navigation
- **New Analysis** — resets Redux workflow state, navigates to `/app/de-identify`
- **Generate Synthetic Data** — navigates to `/app/synthetic-data?documentId=<id>`
- **Go to Dashboard** — dispatches `resetWorkflow()` (clears stale document/job state), then navigates to `/app/dashboard`

Supported compliance frameworks: `HIPAA` · `GDPR` · `UK DPA (uk_dpi)` · `Swiss FADP` · `Custom`

---

## Job Lifecycle (Wizard)

Jobs track the 4-step anonymization wizard from draft to completion.

### Status flow

```
DRAFT → CONFIGURED → QUEUED → PROCESSING → SUCCEEDED
                                          → FAILED
```

- **DRAFT** — job created, wizard in progress
- **CONFIGURED** — all wizard steps filled, ready to run
- **QUEUED / PROCESSING** — set automatically by `POST /jobs/:id/run`
- **SUCCEEDED** — Presidio pipeline complete, document created
- **FAILED** — error captured in `job.error`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/de-identification/jobs` | Create a new draft job |
| `GET` | `/api/de-identification/jobs` | List current user's jobs (sorted by updatedAt desc) |
| `GET` | `/api/de-identification/jobs/:id` | Get job with wizard state |
| `PATCH` | `/api/de-identification/jobs/:id` | Update wizard state (auto-save) |
| `POST` | `/api/de-identification/jobs/:id/run` | Run the Presidio pipeline (requires status = configured) |

### Wizard state

The `wizardState` JSON field stores the wizard snapshot:

```json
{
  "framework": "hipaa",
  "hipaaMethod": "safe_harbor",
  "riskLevel": "medium",
  "inputText": "Patient Dr. Sarah Johnson...",
  "strategy": "replace",
  "language": "en",
  "entities": ["PERSON", "US_SSN"],
  "minScore": 0.65
}
```

### Files

| File | Purpose |
|------|---------|
| `backend/src/modules/de-identification/entities/job.entity.ts` | Job entity + JobStatus enum |
| `backend/src/modules/de-identification/jobs.service.ts` | CRUD + run pipeline |
| `backend/src/modules/de-identification/jobs.controller.ts` | REST endpoints |
| `backend/src/modules/de-identification/dto/create-job.dto.ts` | Create DTO |
| `backend/src/modules/de-identification/dto/update-job.dto.ts` | Update DTO with status transition validation |
| `backend/src/database/migrations/1710000000001-CreateJobsTable.ts` | Jobs table migration |
| `frontend/src/services/jobsService.ts` | API client |
| `frontend/src/store/slices/jobsSlice.ts` | Redux slice + async thunks |

---

## Environment Variables

See `backend/.env.example` and `frontend/.env.example` for all required variables.

Key backend variables:

| Variable                    | Default                         | Notes                                                        |
| --------------------------- | ------------------------------- | ------------------------------------------------------------ |
| `DB_SYNCHRONIZE`          | `true`                        | Set `false` in prod; use `npm run migration:run` instead |
| `JWT_SECRET`              | —                              | Must be a long random string in production                   |
| `PRESIDIO_ANALYZER_URL`   | `http://localhost:5001`       |                                                              |
| `PRESIDIO_ANONYMIZER_URL` | `http://localhost:5002`       |                                                              |
| `SEED_ADMIN_EMAIL`        | `admin@clinical-studio.local` | Used by `npm run db:seed`                                  |

---

## API Documentation

Once the backend is running:

- **Swagger UI**: http://localhost:3000/api/docs
- **OpenAPI JSON**: http://localhost:3000/api/docs-json

---

## Key Learning Concepts

### Frontend

| Concept                          | Where to look                                        |
| -------------------------------- | ---------------------------------------------------- |
| Redux Toolkit slices             | `frontend/src/store/slices/`                       |
| Async thunks (API calls)         | `authSlice.ts` → `requestMagicLink` thunk       |
| React Hook Form + Yup validation | `Auth.tsx`, `SyntheticData.tsx`                  |
| MUI theming                      | `src/styles/theme.ts`                              |
| i18n with react-i18next          | `src/i18n.ts`, `public/locales/en/translation.json` |
| Protected routes                 | `src/routes/ProtectedRoute.tsx`                    |
| Custom hooks                     | `src/hooks/useAuth.ts`                             |
| ErrorBoundary (class component)  | `src/components/ErrorBoundary/`                    |
| Recharts                         | `Dashboard.tsx`                                    |
| Lazy loading routes              | `src/routes/index.tsx`                             |
| Jobs async thunks + slice        | `store/slices/jobsSlice.ts`                        |
| API service layer                | `services/jobsService.ts`                          |
| Drag-and-drop file upload        | `src/components/FileUpload/FileUpload.tsx`         |
| Multi-step wizard (stepper)      | `src/pages/DeIdentify/DeIdentify.tsx`             |
| Compliance framework presets     | `store/slices/deIdentificationSlice.ts` → `setFramework` |
| Framework-dependent Step 3 UI    | `components/HipaaConfig/`, `components/RiskSliderConfig/` |
| Reusable strategy dropdown       | `components/StrategySelect/`                       |
| Conditional rendering by state   | `DeIdentify.tsx` → `case 2` (hipaa/gdpr/custom branches) |
| Vitest + Testing Library setup   | `vitest.config.ts`, `tsconfig.test.json`, `src/test/setup.ts` |
| Mocking Redux dispatch in tests  | `Results.test.tsx`, `Processing.test.tsx` — mock dispatch chain with fulfilled action types |
| combineReducers for RTK tests    | `src/test/makeTestStore.ts` — fixes overload resolution with preloadedState |
| Separate tsconfig for builds     | `tsconfig.build.json` — excludes `*.test.*` so `tsc -p tsconfig.build.json` is clean |

### Backend

| Concept                               | Where to look                                        |
| ------------------------------------- | ---------------------------------------------------- |
| NestJS module system                  | `app.module.ts`                                    |
| ConfigService (never `process.env`) | `config/configuration.ts`, any service             |
| class-validator DTOs                  | `de-identification/dto/analyze-text.dto.ts`        |
| TypeORM entity with UUID PK           | `users/entities/user.entity.ts`                    |
| Magic link auth                       | `auth/auth.service.ts`                             |
| JWT strategy (Passport)               | `auth/strategies/jwt.strategy.ts`                  |
| Custom param decorator                | `common/decorators/current-user.decorator.ts`      |
| Global exception filter               | `common/filters/http-exception.filter.ts`          |
| Presidio HTTP proxy                   | `de-identification/presidio.service.ts`            |
| TypeORM migrations                    | `database/migrations/` + `npm run migration:run` |
| Database seed                         | `database/seeds/seed.ts` + `npm run db:seed`     |
| Swagger decorators                    | Any controller file                                  |
| Unit tests (Jest)                     | `**/*.spec.ts` files                               |
| Smoke tests                           | `test/smoke.ts` + `npm run test:smoke`           |
| Job entity + status enum              | `de-identification/entities/job.entity.ts`       |
| Status transition validation          | `de-identification/dto/update-job.dto.ts`        |
| Multi-step pipeline (run job)         | `de-identification/jobs.service.ts` → `runJob`   |
| File upload (multer + diskStorage)    | `de-identification/de-identification.controller.ts` → `POST /upload` |
| CSV / JSON / TXT parsing              | `de-identification/de-identification.service.ts` → `uploadFile` |
| Optional DTO field with IsIn          | `de-identification/dto/anonymize-text.dto.ts` → `framework` |
| Overlap resolution before Presidio    | `de-identification/de-identification.service.ts` → `resolveOverlaps` |
| Framework-driven entity filtering     | `de-identification/de-identification.service.ts` → `anonymizeText` (hipaaMethod / riskLevel) |
| Per-entity-type anonymizer map        | `de-identification/presidio.service.ts` → `buildOperatorForEntity` (avoids Presidio template-var limitation) |
| score_threshold in Presidio analyze   | `de-identification/presidio.service.ts` → `analyzeText` — passes `minScore` as `score_threshold` |
| File upload security (3 layers)       | MIME check (controller) → size limit 5 MB (multer) → 100 K char cap + sanitization (service) |
| Processing page + poll loop           | `frontend/src/pages/Processing/Processing.tsx` — polls GET /jobs/:id every 1.5 s |
| Results page (7 features)             | `frontend/src/pages/Results/Results.tsx` — entity toggle, sync scroll, copy cell, PDF export, audit trail, re-run, navigation |
| 401 session expiry handling           | `frontend/src/services/api.ts` — auto-save draft, returnUrl, re-entrancy guard |
| Structured auth error codes           | `backend/src/modules/auth/auth.service.ts` — TOKEN_EXPIRED / TOKEN_INVALID |
| Return URL after re-auth              | `frontend/src/hooks/useAuth.ts` — reads returnUrl from query/localStorage |
| Axios interceptor tests               | `frontend/src/services/api.test.ts` — axios-mock-adapter based tests |
| jsPDF generation + Latin-1 sanitization | `Results.tsx` → `handleExportPdf`, `handleComplianceReportPdf`, `sanitizeForPdf` |
| Entity highlight rendering            | `Results.tsx` → `buildHighlightedText` — overlapping entity resolution, tooltip copy |
| Clipboard API in React                | `Results.tsx` → `handleCopy` — `navigator.clipboard.writeText` + Snackbar feedback |
| Sync scroll between panels            | `Results.tsx` → `handleScroll` — `isSyncing` ref guard + `requestAnimationFrame` |

---

## Session Timeout & Auth Edge Cases

When a JWT expires or becomes invalid during an active session:

### Backend — Structured Error Codes

`auth.service.ts → verifyMagicLink()` returns structured errors:
- `{ code: 'TOKEN_EXPIRED', message: '...' }` — magic link expired (token cleared from DB)
- `{ code: 'TOKEN_INVALID', message: '...' }` — token not found or already used

### Frontend — 401 Interceptor (`services/api.ts`)

The Axios response interceptor handles session expiry:
1. **Saves `returnUrl`** — current path stored in `localStorage` for redirect after re-auth
2. **Auto-saves wizard draft** — if user is mid-wizard with a `draft` job, PATCHes wizard state before logout
3. **Dispatches `logout()`** — clears Redux auth state + localStorage
4. **Redirects to `/auth/login?returnUrl=...`** — user can re-authenticate and return
5. **Re-entrancy guard** — `isHandling401` flag prevents recursive 401 handling (the auto-save PATCH could itself get 401)

### Frontend — Return URL Flow (`hooks/useAuth.ts`)

After successful `verifyToken()`:
1. Checks `returnUrl` query param → `localStorage` fallback
2. Validates path starts with `/` (prevents open redirect)
3. Navigates to saved path instead of always going to dashboard
4. Clears `returnUrl` from localStorage

### Frontend — Error Messages (`pages/Auth/Auth.tsx`)

The Verify view shows context-specific messages:
- `TOKEN_EXPIRED` → "Your magic link has expired…" + "Request new link" button
- `TOKEN_INVALID` → "This magic link is invalid…" + "Request new link" button
- Generic error → fallback message

### i18n Keys Added

| Key | Text |
|-----|------|
| `auth.tokenExpired` | Your magic link has expired. Please request a new one. |
| `auth.tokenInvalid` | This magic link is invalid or has already been used. |
| `auth.requestNewLink` | Request new link |
| `auth.checkInbox` | Check your inbox |
| `auth.sessionExpired` | Your session has expired. Please log in again. |

---

## Code Quality Rules

- **No `any` types** — enforced by TypeScript `strict: true` + ESLint
- **No hardcoded strings in React** — all text via `t('key')` (react-i18next)
- **No `process.env` directly in backend** — use `ConfigService`
- **UUID primary keys** on all entities (prevents enumeration attacks)
- **`@Index` on lookup columns** — email, userId, magicLinkToken
- **Magic link tokens excluded from default SELECT** — `select: false` on `magicLinkToken`
- **Prettier** enforces consistent formatting (`npm run format`)
- **Conventional Commits** for all commit messages
