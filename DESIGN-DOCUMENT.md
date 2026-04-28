# Design Document — Clinical Data De-Identification Portal

**Document Type:** Architectural Design Document
**Project:** Clinical Data De-Identification Portal (Orange Team)
**Status:** Draft
**Last Updated:** 2026-04-28
**Document Version:** 0.1

---

## Table of Contents

1. [Document Overview](#1-document-overview)
2. [Product Vision & Goals](#2-product-vision--goals)
3. [System Overview](#3-system-overview)
4. [User Journeys](#4-user-journeys)
5. [Functional Architecture](#5-functional-architecture)
6. [Technical Architecture](#6-technical-architecture)
7. [Data Design](#7-data-design)
8. [API Design](#8-api-design)
9. [Compliance Design](#9-compliance-design)
10. [Security Architecture](#10-security-architecture)
11. [Test Architecture](#11-test-architecture)
12. [Architectural Agility](#12-architectural-agility)
13. [Infrastructure & Deployment](#13-infrastructure--deployment)
14. [Quality, Observability, Performance](#14-quality-observability-performance)

---

## 1. Document Overview

### 1.1 Purpose

This document defines the **architectural blueprint** for the Clinical Data De-Identification Portal — a web platform that automatically detects and masks Protected Health Information (PHI) in clinical text data, in compliance with HIPAA, GDPR, UK DPA, and Swiss FADP regulations.

It serves as the **single source of truth** for:
- What we are building (product vision and scope)
- How the pieces fit together (architecture)
- Why specific decisions were made (rationale)
- How quality, security, and compliance are achieved (cross-cutting concerns)

### 1.2 Audience

| Audience | Primary Use |
|----------|-------------|
| **Engineers (current and new)** | Onboarding, implementation guidance, decision context |
| **Project Manager** | Scope, dependencies, risk identification, roadmap input |
| **Stakeholder / CTO (Lyudmyla)** | Validation that architecture matches product intent |
| **Code reviewers** | Reference for what "consistent with design" means |
| **Security/compliance reviewers** | Verification that compliance and security are designed-in, not bolted-on |

### 1.3 Scope

**In scope:**
- Core de-identification workflow (upload → analyze → anonymize → results)
- Magic Link authentication, JWT-based API authorization
- Multi-framework compliance (HIPAA Safe Harbor / Expert Determination, GDPR risk levels, UK DPA, Swiss FADP)
- Synthetic data generation (planned, not yet built)
- Dashboard with metrics
- PDF compliance report export
- Multi-environment deployment (local, staging, production)

**Out of scope (explicitly):**
- On-premise deployment (cloud-only)
- Real-time streaming de-identification (batch only)
- Multi-tenant SaaS isolation (single-tenant per deployment for v1)
- ML model training (we use pre-trained Microsoft Presidio recognizers)
- Mobile native apps (responsive web only)

### 1.4 Status & Maturity

| Aspect | Status |
|--------|--------|
| Document version | **0.1 — Draft** |
| Authoritativeness | **Aspirational + descriptive.** Documents both what exists today and what should exist. |
| Approval | Pending review by Lyudmyla |
| Implementation alignment | ~58% as of 2026-04-28 |

This document is a **living artifact**. It is expected to be updated as architecture evolves. See [Section 12 — Architectural Agility](#12-architectural-agility) for the change procedure.

### 1.5 Document Conventions

- **Decision tables** use the format: *Option / Chosen Y/N / Rationale*
- **Diagrams** are ASCII for portability and version-control friendliness
- **Code references** use repository-relative paths: `backend/src/modules/auth/auth.service.ts:62`
- **Quotes from team** are clearly attributed to the source meeting
- **🔴 / 🟠 / 🟡 / 🟢** denote severity (critical / high / medium / low)

### 1.6 Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 0.1 | 2026-04-28 | Architecture team | Initial draft — captures current state + intended design |

---

## 2. Product Vision & Goals

### 2.1 Problem Statement

Healthcare and research organizations need to share clinical text data (patient discharge summaries, medical notes, research datasets) for collaborative work, but data protection regulations (HIPAA in the US, GDPR in the EU) prohibit disclosure of personally identifiable information.

Current practice — manual redaction by medical staff — is:
- **Slow:** Hours per document
- **Expensive:** Skilled labor at clinical rates
- **Error-prone:** A single missed identifier can trigger seven-figure compliance fines
- **Unscalable:** Cannot handle research datasets with thousands of records

### 2.2 Vision Statement

> **A self-serve web platform that lets healthcare organizations de-identify clinical text in minutes, not hours, with verifiable compliance to HIPAA, GDPR, UK DPA, and Swiss FADP.**

### 2.3 Target Users

| Persona | Role | Primary Need |
|---------|------|--------------|
| **Clinical Data Analyst** | Hospital/research IT | Bulk-process text datasets for research partnerships |
| **Compliance Officer** | Hospital legal/governance | Auditable evidence that PHI was removed per HIPAA Safe Harbor |
| **Researcher** | Academic / pharma | Receive de-identified data sets for analysis |
| **Solo Practitioner** | Individual clinic | Occasional de-identification for case sharing or publication |

**Not a target user (yet):**
- Real-time clinical workflows (we are batch-oriented)
- Multi-hospital aggregation platforms (single-tenant for v1)
- Imaging / DICOM data (text only)

### 2.4 Product Goals

| Goal | Success Criterion (v1 MVP) |
|------|----------------------------|
| **G1: Functional de-identification** | User uploads ≤5 MB text → all 18 HIPAA Safe Harbor identifiers detected and replaced with chosen strategy |
| **G2: Multi-framework support** | User can select HIPAA / GDPR / UK DPA / Swiss FADP and receive correctly scoped de-identification |
| **G3: Auditable compliance** | Every job produces an exportable PDF audit trail with framework, method, entity counts, processing metadata |
| **G4: Frictionless authentication** | User signs in via email Magic Link in ≤3 clicks; no password management |
| **G5: Self-service onboarding** | A new user can land, sign in, and complete first de-identification in <10 minutes |
| **G6: Compliance-grade security** | All PHI handling adheres to industry security baselines (TLS in transit, encryption at rest, audit logs) |

### 2.5 Non-Goals (v1)

These are deliberately excluded:

| Non-Goal | Rationale |
|----------|-----------|
| Custom compliance frameworks beyond the 4 supported | Lyudmyla decision (Mar 27): scope creep risk; HIPAA/GDPR/UK/Swiss cover ≥95% of target market |
| Storing original PHI text in DB | Privacy-by-design: original text only in transient memory or `localOriginalTexts` (sessionStorage) |
| User registration with passwords | Magic Link only — fewer attack vectors |
| Real-time API integration with EHR systems | Web UI only for v1; API access is internal |
| ML model fine-tuning | Use Microsoft Presidio's pre-trained models as-is |
| Multi-language UI initially | English only; i18n infrastructure is in place but other languages deferred |
| Edit-detected-entity feature | Lyudmyla on demo (Apr 23): "for synthetic data more useful, here in this step it's not" — moved to Synthetic Data feature |

### 2.6 Success Metrics

For the MVP launch:

- **Time to first de-identification:** <10 minutes (from landing to first download)
- **De-identification accuracy:** ≥90% Safe Harbor identifier detection on test corpus
- **Job processing time:** <30 seconds for 5 MB text
- **Demo readiness:** Working end-to-end flow on staging server
- **Stakeholder satisfaction:** Lyudmyla's positive demo feedback (achieved Sprint 2 demo: *"actually very good progress"*)

### 2.7 Strategic Constraints

These shape design decisions:

- **Internship project context:** Team capacity is ~4-5 part-time developers, ~4 hours/day each. Architecture must be approachable, not enterprise-grade complex.
- **Single reviewer (Lyudmyla):** PR review is a known bottleneck; architecture should minimize cross-cutting changes.
- **Privacy by design:** No PHI in DB. Original text only in transient memory and client-side sessionStorage.
- **Cloud-first:** Heroku for v1 deployment. Architecture must containerize cleanly.
- **No ML training:** Reuse Microsoft Presidio. We integrate, not train.

---

## 3. System Overview

### 3.1 High-Level Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                              END USER                                   │
│                       (browser, desktop or mobile)                      │
└────────────────────────────────┬───────────────────────────────────────┘
                                  │ HTTPS
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│   FRONTEND TIER                                                         │
│   React 19 + Vite + Redux Toolkit + MUI 7 + react-i18next               │
│   ─ Landing page (public)                                               │
│   ─ Auth flow (Magic Link)                                              │
│   ─ De-Identify Wizard (4 steps)                                        │
│   ─ Dashboard (planned)                                                 │
│   ─ Synthetic Data (planned)                                            │
└────────────────────────────────┬───────────────────────────────────────┘
                                  │  REST API (/api/*)
                                  │  Bearer JWT
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│   BACKEND TIER                                                          │
│   NestJS 10 + TypeORM + Passport JWT                                    │
│   ─ AuthModule       (Magic Link issuance + JWT verification)           │
│   ─ UsersModule      (user upsert, profile)                             │
│   ─ EmailModule      (SMTP, magic-link template, contact form)          │
│   ─ JobsModule       (wizard state, async pipeline, results)            │
│   ─ DashboardModule  (metrics aggregation)                              │
│   ─ Common           (guards, filters, decorators, interceptors)        │
└─────────┬─────────────────────────────────────────────────┬─────────────┘
          │                                                  │
          ▼                                                  ▼
┌─────────────────────────┐               ┌──────────────────────────────┐
│  DATA TIER              │               │  PII PROCESSING TIER         │
│  MySQL 8                │               │  Microsoft Presidio          │
│  ─ users                │               │  ─ Analyzer  (port 5001)     │
│  ─ jobs                 │               │  ─ Anonymizer (port 5002)    │
│  ─ documents            │               │  Containerized (Docker)      │
│  (Note: only            │               │  Pre-trained spaCy NER       │
│   metadata persists,    │               │                              │
│   no raw PHI)           │               │                              │
└─────────────────────────┘               └──────────────────────────────┘

  Cross-cutting:
  ┌──────────────────────────────────────────────────────────────────────┐
  │  Infrastructure: Docker, docker-compose, Heroku, GitHub Actions CI   │
  │  Observability: NestJS Logger, structured logs (planned)             │
  └──────────────────────────────────────────────────────────────────────┘
```

### 3.2 Key Components

| Component | Responsibility | Technology |
|-----------|----------------|-----------|
| **Frontend SPA** | All UI interactions, client-side state, routing | React 19, Vite, Redux Toolkit, MUI 7 |
| **Backend API** | Business logic, persistence, integrations, security | NestJS 10, TypeORM, Express |
| **MySQL Database** | Persistent storage for users, jobs, results metadata | MySQL 8, InnoDB |
| **Presidio Analyzer** | NER detection of PII entities in text | Microsoft Presidio, spaCy, FastAPI |
| **Presidio Anonymizer** | Application of anonymization operators (replace/redact/hash/mask) | Microsoft Presidio, FastAPI |
| **Email Provider (SMTP)** | Magic-link delivery, contact form receipts | Gmail SMTP / Postmark / SendGrid (configurable) |
| **CI/CD Pipeline** | Automated build, test, deploy | GitHub Actions, Heroku Container Registry |

### 3.3 Cross-Component Data Flow (De-identification)

```
1.  User pastes/uploads text in Wizard Step 2
        │
        ▼
2.  Frontend stores text locally (localOriginalTexts in sessionStorage)
    PATCH /api/jobs/:id  { wizardState }
        │
        ▼
3.  User selects framework, entities, strategy in Step 3
    PATCH /api/jobs/:id  { wizardState }
        │
        ▼
4.  User clicks "Run Analysis" in Step 4
    POST /api/jobs/:id/run
        │
        ▼
5.  Backend emits 'job.run' event
    @OnEvent('job.run') processJob() runs asynchronously
        │
        ▼
6.  processJob() calls Presidio Analyzer:
    POST {analyzerUrl}/analyze  { text, language, entities, score_threshold }
    ←  RecognizerResult[]  (entity_type, start, end, score)
        │
        ▼
7.  processJob() calls Presidio Anonymizer:
    POST {anonymizerUrl}/anonymize  { text, analyzer_results, anonymizers }
    ←  { text: anonymized, items: [...] }
        │
        ▼
8.  Backend persists job record (status=COMPLETED, processingTime, metadata)
    Note: original text NOT persisted (privacy-by-design)
        │
        ▼
9.  Frontend (Wizard Step 4) polls GET /api/jobs/:id every 2s
    Detects status === COMPLETED
        │
        ▼
10. Frontend fetches GET /app/results/:id
    Displays original (left) | anonymized (right) with highlights
        │
        ▼
11. User clicks "Download PDF"
    GET /app/results/:id/export/pdf
    ← Branded compliance audit-trail PDF
```

### 3.4 Deployment Topology

**Local development:**
```
docker-compose up -d
├── back              (NestJS, port 3000)
├── mysql             (port 3307→3306)
├── presidio-analyzer (port 5001→3000)
└── presidio-anonymizer (port 5002→3000)

Frontend: npm run dev  (Vite, port 5173, proxies /api → :3000)
```

**Production (Heroku):**
```
GitHub push to develop (FE)
   ↓ notify-backend.yml
   ↓ repository_dispatch
GitHub Actions (BE) — unified-build.yml
   ↓ checkout BE + FE (via GH_PAT)
   ↓ build FE → frontend-dist/
   ↓ build BE
   ↓ docker build → push to Heroku Container Registry
   ↓ heroku container:release
Heroku app (single container: NestJS serves SPA + API)
```

**Limitation:** Presidio containers are **not deployed** to production yet. This is a known gap (see Section 13).

---

## 4. User Journeys

These journeys describe end-to-end user-facing flows. They drive component design and identify cross-system contracts.

### 4.1 Journey: First-Time Sign-In (Magic Link)

```
ACTOR: New user (unauthenticated)
GOAL:  Get into the application using only an email address

┌─────────────────────────────────────────────────────────────────────┐
│ Step 1. User opens https://app.example.com (Landing page)            │
│         Sees Hero, Features, Compliance, FAQ. Clicks "Get Started". │
├─────────────────────────────────────────────────────────────────────┤
│ Step 2. User redirected to /auth/login                               │
│         Sees email-only form (no password fields).                   │
│         Enters email → Yup validation → Submit.                      │
│         FE → POST /api/auth/login { email }                          │
├─────────────────────────────────────────────────────────────────────┤
│ Step 3. BE: AuthService → upsert User by email → sign JWT            │
│         BE: EmailModule sends Magic Link email to user.              │
│         FE: Shows "Check your inbox" view with Resend option.        │
├─────────────────────────────────────────────────────────────────────┤
│ Step 4. User opens email, clicks Sign-In button.                     │
│         Browser opens /auth/verify/token/:token                      │
│         FE: TokenPage extracts token from URL.                       │
│         FE: dispatch(verifyMagicLink(token))                         │
│             → POST /api/auth/verify { token }                        │
│             ← { accessToken: "..." }                                  │
│         FE: Stores accessToken + sessionStartedAt in localStorage.   │
│             → GET /api/users/me  (with Bearer)                       │
│             ← { id, email, createdAt }                                │
│         FE: dispatch(setUser(...))                                   │
├─────────────────────────────────────────────────────────────────────┤
│ Step 5. FE redirects to /app (Dashboard).                            │
│         User is now authenticated. Session = 1 hour from now.        │
└─────────────────────────────────────────────────────────────────────┘

Failure paths:
- Invalid email format → form validation, no API call
- Email not deliverable → user sees "check inbox" but no email arrives
  (no anti-enumeration in current design — see Security section)
- Token expired (>15 min) or invalid → /auth/login with error
- Token consumed already → same as expired
- Network failure during /verify → user sees error, can retry
```

### 4.2 Journey: De-identify a Document (Happy Path)

```
ACTOR: Authenticated user (Clinical Data Analyst)
GOAL:  De-identify clinical text using HIPAA Safe Harbor and download a PDF

┌─────────────────────────────────────────────────────────────────────┐
│ Step 1. User clicks "De-Identify" in sidebar → /app/de-identify     │
│         FE: GET /api/jobs/latest-draft                               │
│             ← Either existing draft OR creates new draft via POST   │
├─────────────────────────────────────────────────────────────────────┤
│ Step 2. WIZARD STEP 1 — Compliance                                   │
│         Sees framework selector: HIPAA / GDPR / UK DPA / Swiss FADP │
│         Selects HIPAA. Clicks Next.                                  │
│         FE: PATCH /api/jobs/:id { wizardState: { framework } }      │
├─────────────────────────────────────────────────────────────────────┤
│ Step 3. WIZARD STEP 2 — DataInput                                    │
│         Choice: paste text OR drag-drop file (txt/json/csv ≤5MB).   │
│         Validates 50-5000 chars (Yup).                               │
│         FE saves text to localOriginalTexts (sessionStorage).        │
│         FE: PATCH /api/jobs/:id { wizardState: { input, fileName } }│
│         (For file upload: POST /api/jobs/:id/upload — multipart)    │
├─────────────────────────────────────────────────────────────────────┤
│ Step 4. WIZARD STEP 3 — Configuration                                │
│         HIPAA branch: select Method (Safe Harbor or Expert Determ.).│
│         Safe Harbor: 18 entities locked, default strategy = Redact. │
│         Expert: user toggles entities, selects per-entity strategy. │
│         Selects threshold preset: Conservative/Balanced/Aggressive. │
│         Selects language (default English).                          │
│         FE: PATCH /api/jobs/:id { wizardState: { configSettings } } │
├─────────────────────────────────────────────────────────────────────┤
│ Step 5. WIZARD STEP 4 — Review & Run                                 │
│         User clicks "Analyze".                                       │
│         FE: POST /api/jobs/:id/run                                   │
│         BE: emits 'job.run' event → processJob() async               │
│           1) Maps HIPAA entities → Presidio entity types             │
│           2) POST {analyzerUrl}/analyze                              │
│           3) POST {anonymizerUrl}/anonymize                          │
│           4) UPDATE jobs SET status=COMPLETED, anonymizedText, ...  │
│         FE polls GET /api/jobs/:id every 2s                          │
│         When status=COMPLETED:                                       │
│           FE: GET /app/results/:id                                   │
│         Shows side-by-side: original (with highlights) | anonymized.│
├─────────────────────────────────────────────────────────────────────┤
│ Step 6. EXPORT                                                       │
│         User clicks Download → drop-up menu: Text or PDF.            │
│         For PDF: GET /app/results/:id/export/pdf                     │
│         BE: PDFKit generates branded compliance report:              │
│           - Title, Date, Framework, Method                           │
│           - Original vs Anonymized text                              │
│           - Per-entity audit table (count, score)                    │
│           - HIPAA 18 identifiers checklist with applied/skipped     │
│           - Processing metadata                                       │
│         User downloads PDF.                                          │
└─────────────────────────────────────────────────────────────────────┘

Failure paths:
- Network drop mid-wizard → user can resume via getLatestDraft (state in BE + sessionStorage)
- Token expires during wizard → 401 → redirect to /session-expired → re-login → resume
- Presidio call fails → job marked FAILED → user sees error in Step 4 → can Retry
- Job stuck PROCESSING > 5 min → watchdog marks FAILED → user can Retry
```

### 4.3 Journey: Session Expiration

```
ACTOR: Authenticated user past 1-hour session
GOAL:  Get back into the app gracefully without losing in-progress work

Trigger paths:
A) Background poll in MainLayout (every 30s) detects sessionStartedAt + 1h ≤ now
B) API call returns 401 (token expired)
C) User opens app after long pause → ProtectedRoute checks expiration

Flow:
┌─────────────────────────────────────────────────────────────────────┐
│ 1. Detection (any of A/B/C above)                                    │
│ 2. FE: dispatch(logout()) — clears localStorage, store               │
│ 3. FE: navigate(ROUTES.SESSION_EXPIRED)                              │
│ 4. /session-expired page renders branded illustration + CTA          │
│    "Your session has expired. Sign in again."                        │
│ 5. User clicks → /auth/login                                         │
│ 6. After successful re-login → /app/dashboard                        │
│    BUT in-flight Wizard state? If draft existed in DB, getLatestDraft│
│    restores it. Original text in sessionStorage may persist.         │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.4 Journey: Compliance Officer Reviewing an Audit Trail

```
ACTOR: Compliance Officer (different user, may have analyst role)
GOAL:  Verify that a specific document was de-identified correctly per HIPAA

Flow:
1. Officer logs in (Magic Link) — own account
2. Navigates to /app/dashboard (planned) → sees recent jobs list
3. Clicks a job → Results view
4. Reviews framework, method, entity counts
5. Clicks Download PDF
6. PDF includes:
   - Job ID (UUID — for traceability)
   - User (analyst's email)
   - Timestamp
   - Framework: HIPAA, Method: Safe Harbor
   - 18-identifier checklist with detection counts
   - Processing duration, model version (Presidio)
7. PDF is signed/timestamped (planned for v2)
```

### 4.5 Journey: Generate Synthetic Data (Planned)

This journey is **planned but not implemented**. Captured here as design intent.

```
ACTOR: Researcher
GOAL:  Generate synthetic patient records resembling real distribution

Flow:
1. Navigate /app/synthetic-data
2. Configure: number of records, locale, entity types to generate
3. Submit → BE generates via Faker.js → returns CSV/JSON
4. Download
```

### 4.6 Journey: Contact-Form Inquiry

```
ACTOR: Anonymous visitor (from Landing page)
GOAL:  Send inquiry to support

Flow:
1. /contact form: first name, last name, email, company, message
2. Yup validation on submit
3. POST /api/email/contact
4. BE: ContactForm DTO → EmailSenderService.sendContactForm()
   a) Notify admin (admin-notification template)
   b) Auto-reply receipt to user (contact-receipt template) ← Sprint 3 task
5. FE shows "Submitted" success state
```

---

## 5. Functional Architecture

This section describes **what the system does**, decomposed into modules and their responsibilities. It is technology-agnostic — implementation details are in Section 6.

### 5.1 Module Boundaries

The system is decomposed into seven functional modules, each with a clear responsibility and a stable interface:

```
┌─────────────────────────────────────────────────────────────────────┐
│                      AUTHENTICATION                                  │
│  Issue Magic Links, verify them, mint JWTs, validate JWTs           │
│  Boundary: Owns user session lifecycle. No business data.           │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      USER MANAGEMENT                                 │
│  Upsert users, retrieve profile, manage roles (planned)             │
│  Boundary: Owns User identity. No PHI.                              │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      EMAIL DELIVERY                                  │
│  Send Magic Link, contact form notifications, auto-replies          │
│  Boundary: Owns SMTP integration. Templates are inputs.             │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                  DE-IDENTIFICATION (CORE)                            │
│  Manage Job lifecycle, orchestrate Presidio, persist results        │
│  Boundary: Owns the Job entity and pipeline.                        │
│  Sub-components:                                                     │
│    ─ Wizard state management                                         │
│    ─ File upload + parsing                                           │
│    ─ Presidio Analyzer client                                        │
│    ─ Presidio Anonymizer client                                      │
│    ─ Results assembly + PDF export                                   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      DASHBOARD                                       │
│  Aggregate metrics, recent activity                                  │
│  Boundary: Read-only view over Jobs and Users.                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      SYNTHETIC DATA (PLANNED)                        │
│  Generate fake clinical records via Faker.js                        │
│  Boundary: Independent of De-Identification module.                 │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      COMMON / CROSS-CUTTING                          │
│  Guards, decorators, exception filters, interceptors                 │
│  Boundary: Reusable across feature modules.                         │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.2 Module Responsibilities Matrix

| Module | Owns | Reads | Calls | Emits Events |
|--------|------|-------|-------|--------------|
| **Auth** | JWT signing/verification, Magic Link tokens | User (via UserService) | Email (for delivery) | — |
| **Users** | User entity (id, email) | — | — | — |
| **Email** | SMTP transport, templates | — | External SMTP | — |
| **De-Identification** | Job entity, pipeline state | User (via decorator) | Presidio Analyzer + Anonymizer | `'job.run'` |
| **Dashboard** | — | Job, User | — | — |
| **Synthetic Data** (planned) | SyntheticRecord entity | — | Faker.js (in-process) | — |
| **Common** | Filters, guards, decorators | Request context | — | — |

### 5.3 Inter-Module Dependencies

```
                    ┌────────────┐
                    │   AUTH     │◄─────────────┐
                    └──┬─────────┘              │
                       │                         │ uses guard
                       ▼                         │
                    ┌────────────┐              │
                    │   USERS    │              │
                    └──┬─────────┘              │
                       ▲                         │
                       │ resolves user           │
                       │                         │
                    ┌──┴─────────┐              │
                    │   EMAIL    │◄─── Auth uses for Magic Link delivery
                    └────────────┘
                       
                    ┌────────────┐
                    │ DE-IDENT   │── uses guard ───► AUTH
                    └──┬─────────┘── reads user ───► USERS
                       │── calls ──► PRESIDIO (external)
                       ▼
                    ┌────────────┐
                    │ DASHBOARD  │── reads ────► JOBS, USERS
                    └────────────┘

DEPENDENCY DIRECTION:
   Higher-level features depend on lower-level ones.
   No circular dependencies.
   Common is leaf-level, depended-upon by all.
```

### 5.4 Frontend Composition

The frontend is structured by **page**, with shared components:

```
Public:
  ─ LandingLayout
    ─ LandingHeader, Hero, Stats, Features, Compliance, CTA, FAQ, Footer
  ─ Contact (form)
  ─ NotFound (404)

Auth:
  ─ AuthLayout
    ─ LoginPage      (Magic Link request)
    ─ TokenPage       (token verification handler)
    ─ Inactivity      (session expired)

Authenticated (under MainLayout):
  ─ MainLayout
    ─ Sidebar (navigation)
    ─ Header (user info)
    ─ Dashboard (planned)
    ─ DeIdentify
      ─ CustomizedStepper
        ─ Step 1: Compliance
        ─ Step 2: DataInput
        ─ Step 3: Configuration
        ─ Step 4: ReviewAndRun
    ─ SyntheticData (planned)
```

### 5.5 Cross-Cutting Concerns

These cut across modules and are factored into the Common layer:

| Concern | Implementation |
|---------|----------------|
| **Authentication enforcement** | JwtAuthGuard, applied per-controller |
| **User context propagation** | `@CurrentUser()` parameter decorator |
| **Error formatting** | Global HttpExceptionFilter |
| **Response envelope** | TransformInterceptor (designed, not currently global) |
| **Validation** | Global ValidationPipe (whitelist + forbidNonWhitelisted) |
| **Logging** | NestJS Logger per service (structured logs planned) |
| **Configuration** | ConfigService (no `process.env` access in business code) |

### 5.6 Functional Boundaries — What's Inside vs Outside

**Inside the system (we own):**
- All NestJS modules
- Frontend SPA
- MySQL database
- Docker compose orchestration
- CI/CD scripts

**Outside the system (we depend on):**
- Microsoft Presidio (Analyzer + Anonymizer) — versioned containers
- SMTP provider — pluggable (Gmail / SES / Postmark)
- Heroku platform — deployment target
- GitHub Actions — CI runner
- (Future) Cloud KMS for encryption keys
- (Future) Object storage (S3) for large file uploads

This boundary is enforced by **adapter pattern**: PresidioService is an adapter, EmailSenderService is an adapter. Replacing either should not require changes outside that adapter.

---

## 6. Technical Architecture

This section documents **technology choices and patterns**, with rationale.

### 6.1 Technology Stack — Decision Table

| Layer | Technology | Version | Rationale | Alternatives Rejected |
|-------|-----------|---------|-----------|----------------------|
| **Frontend framework** | React | 19 | Most familiar to team; vast ecosystem; strong TypeScript support | Vue (smaller team experience), Svelte (less mature ecosystem) |
| **Frontend bundler** | Vite | 7 | Fast HMR, modern tooling, ESM-native | Webpack (slower DX), Parcel (less common) |
| **Frontend state** | Redux Toolkit + redux-persist | 2.x | Predictable state for complex wizard, sessionStorage persistence for in-progress draft | Zustand/Jotai (smaller scale, but team familiar with RTK), MobX (rejected: imperative model conflicts with RSC) |
| **UI library** | Material UI (MUI) | 7 | Accessible, themable, dense ecosystem; medical-software aesthetic | Chakra (smaller component set), Tailwind alone (slower for complex UI) |
| **Forms** | react-hook-form + Yup | 7.x / 1.x | Performant (uncontrolled), schema-based validation | Formik (more re-renders), zod (later candidate) |
| **i18n** | react-i18next + http-backend | 14.x / 2.x | De-facto standard for React i18n; lazy-load translation files | react-intl (more verbose), Lingui (smaller community) |
| **PDF rendering** | pdfjs-dist | latest | Display PDFs in-app (planned for receipt preview) | PDFKit-only (server-side only) |
| **Backend framework** | NestJS | 10 | Modular DI architecture; class-based; built-in Swagger; TypeScript-first | Express alone (no structure), Fastify (less ecosystem at our scale) |
| **ORM** | TypeORM | 0.3 | Decorator-based; works well with Nest; schema-first or code-first | Prisma (additional generation step), Sequelize (older API) |
| **Database** | MySQL | 8 | Familiar; widely supported on Heroku; sufficient for scale | PostgreSQL (better JSON, but team chose MySQL), SQLite (no clustering) |
| **Authentication** | Passport JWT + custom Magic Link | 4 / — | Industry-standard JWT pattern; passwordless reduces attack surface | Auth0/Clerk (cost), session cookies (CSRF complexity) |
| **PII engine** | Microsoft Presidio | latest | Open-source, pre-trained, used in production | AWS Comprehend Medical (cost, lock-in), Google DLP (lock-in) |
| **Email** | nodemailer + @nestjs-modules/mailer | 6 / 2 | Flexible SMTP; works with any provider | SendGrid SDK (lock-in), AWS SES SDK (lock-in for v1) |
| **Container** | Docker / docker-compose | 24+ | Standard packaging; reproducible local + production | LXC (heavier), no containers (envrionment drift) |
| **CI/CD** | GitHub Actions | — | Free for public repos; native GitHub integration | CircleCI / GitLab CI (more setup), Jenkins (overhead) |
| **Hosting** | Heroku Container Registry | — | Simple; Docker-native; cheap for MVP | AWS Fargate (more setup), DigitalOcean App Platform (similar but team chose Heroku) |
| **Test framework** | Vitest (FE) + Jest (BE) | 1.x / 29 | Vitest matches Vite; Jest is standard for NestJS | Mocha (older API), Playwright (e2e only) |

### 6.2 Architectural Patterns

**Backend:**

| Pattern | Where Applied | Why |
|---------|---------------|-----|
| **Modular Monolith** | Whole NestJS app | Single deployable unit, but internal modules with clear boundaries. Fits team size. |
| **Dependency Injection** | NestJS-wide | Testability, loose coupling, swap implementations |
| **Repository Pattern** | TypeORM `Repository<Entity>` injection | Persistence abstraction |
| **Adapter Pattern** | PresidioService, EmailSenderService | Wrap external APIs behind own interface |
| **Event-Driven** | EventEmitter2 for `'job.run'` | Async processing without blocking HTTP request |
| **Pipeline / Chain** | Job processing (analyze → resolve overlaps → anonymize → save) | Clear sequential steps, easy to extend |
| **DTO Validation** | class-validator decorators | Centralized input validation at boundary |
| **Global Filter** | HttpExceptionFilter | Uniform error response shape |
| **Strategy Pattern** | Anonymization operators (replace, redact, hash, mask) | Pluggable algorithms |

**Frontend:**

| Pattern | Where Applied | Why |
|---------|---------------|-----|
| **Container/Presentational split** | `pages/` vs `components/` | Separation of routing/state from UI |
| **Custom Hooks** | useAuth, useMainLayout, useSidebar | Logic reuse, separation from rendering |
| **Slice Pattern** | Redux Toolkit slices | Co-located reducers, actions, selectors |
| **Thunks** | Async API calls | Encapsulate loading/error states |
| **Lazy Loading** | React.lazy + Suspense | Code-splitting per route |
| **Selector Pattern** | `selectIsAuthenticated`, `selectAuthInitialized` | Memoized derived state |
| **Mappers** | `auth.mappers.ts` (UserResponse → User) | API/domain decoupling |

### 6.3 Module Layering (Backend)

```
┌──────────────────────────────────────────────────────┐
│                     CONTROLLER                        │  ← HTTP boundary
│   - Routing, Swagger annotations, guards, DTOs        │
│   - Translates HTTP ↔ Service                         │
└─────────────────┬─────────────────────────────────────┘
                  │ depends on
                  ▼
┌──────────────────────────────────────────────────────┐
│                     SERVICE                           │  ← Business logic
│   - Use-case orchestration                            │
│   - Cross-entity transactions                         │
│   - Calls repositories and adapters                   │
└─────────────────┬─────────────────────────────────────┘
                  │ depends on
                  ▼
┌──────────────────────────────────────────────────────┐
│                  REPOSITORY / ADAPTER                 │  ← Persistence + External
│   - TypeORM Repository<Entity>                        │
│   - HTTP adapters (PresidioService, EmailSender)      │
└──────────────────────────────────────────────────────┘
```

**Rule:** Higher layers depend on lower layers, never vice versa. Controllers never instantiate adapters directly.

### 6.4 Frontend Layering

```
┌──────────────────────────────────────────────────────┐
│                       PAGES                           │  ← Route handlers
│   - Lazy-loaded                                        │
│   - Compose layouts + components                      │
└─────────────────┬─────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────────────────┐
│                    COMPONENTS                         │  ← Reusable UI
│   - business/        (feature-specific)              │
│   - common/          (cross-feature: PageLoader, UI) │
│   - layouts/         (Sidebar, Header, MainLayout)   │
└─────────────────┬─────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────────────────┐
│                       STORE                           │  ← Redux Toolkit
│   - slices/          (state + reducers)              │
│   - thunks           (async actions)                 │
│   - selectors        (memoized derived state)        │
└─────────────────┬─────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────────────────┐
│                     SERVICES                          │  ← API clients
│   - api.ts                                            │
│   - jobsService, authService, etc.                   │
└──────────────────────────────────────────────────────┘
```

### 6.5 Coding Standards

| Rule | Enforcement |
|------|-------------|
| TypeScript strict mode | tsconfig `"strict": true` |
| No `any` | ESLint rule (per Git rules document) |
| No `process.env` in business code | ESLint rule; use `ConfigService` |
| Conventional commits | Husky + commitlint (planned) |
| Prettier formatting | Pre-commit (Husky + lint-staged) |
| 1 task = 1 commit = 1 PR | Team agreement (Apr 2) |
| PR reviewed before merge | Process rule (Mar 30, restored Apr 23) |
| Swagger annotations on every endpoint | Per Git rules |
| Yup schema for every form | FE convention |
| i18n keys for every visible string | FE convention |
| UUIDs as primary keys | DB convention |
| ESM imports (no CommonJS in source) | Vite default; tsconfig `"module": "ESNext"` |

---

## 7. Data Design

### 7.1 Persistence Strategy

**Privacy-by-design principles applied:**

| Principle | Application |
|-----------|-------------|
| **Minimize PHI in persistent storage** | Original text is **never persisted** to DB. It lives only in transient memory during processing or in client-side sessionStorage (`localOriginalTexts` in Redux-persist). |
| **Encrypt at rest where unavoidable** | Anonymized text in DB is post-PHI-removal, but should still be encrypted at rest in production (planned). |
| **Audit before content** | Job records persist metadata (status, timing, framework, entity counts) but not raw content. |
| **Data lifecycle defined** | Job records eligible for purge after retention window (TBD with legal). |

### 7.2 Logical Entity Model

```
                ┌─────────────────────────────┐
                │            User              │
                │─────────────────────────────│
                │ id              UUID  (PK)   │
                │ email           varchar(UQ)  │
                │ firstName       varchar      │  ← in migration; missing in entity
                │ lastName        varchar      │  ← drift to fix
                │ role            enum         │  ← drift to fix
                │ isActive        boolean      │  ← drift to fix
                │ magicLinkToken  varchar      │  ← drift to fix (or remove if JWT-only)
                │ createdAt       datetime     │
                │ updatedAt       datetime     │
                └────────────┬────────────────┘
                             │ 1:N
                             ▼
                ┌─────────────────────────────┐
                │             Job              │
                │─────────────────────────────│
                │ id              UUID  (PK)   │
                │ userId          UUID  (FK)   │
                │ status          enum         │  draft | processing | completed | failed
                │ framework       varchar      │  hipaa | gdpr | uk_dpi | swiss_fadp
                │ wizardState     json         │  flexible blob for wizard
                │ anonymizedText  text         │  result text (post-PHI)
                │ processingTime  int (ms)     │
                │ analysisMetadata json        │  entity counts, scores
                │ errorMessage    varchar?     │
                │ createdAt       datetime     │
                │ updatedAt       datetime     │
                │                              │
                │ NOT PERSISTED:                │
                │  ─ originalText (PHI!)       │  ← intentional. carried in event payload only.
                └─────────────────────────────┘

   Future:
   ┌────────────────────────┐    ┌──────────────────────────┐
   │   SyntheticRecord      │    │   AuditLog (planned)     │
   │   id, userId, type,    │    │   id, userId, action,    │
   │   payload, createdAt   │    │   resourceType, ts, ip   │
   └────────────────────────┘    └──────────────────────────┘
```

### 7.3 Schema Decisions

**Why JSON for `wizardState`?**

The wizard state is **deeply variable** by framework: HIPAA has Safe Harbor vs Expert Determination, each with different shapes; GDPR has risk levels and entity sets. Using a strict columnar schema would either explode column count or require many sub-tables. JSON gives flexibility, with the cost that we lose schema validation at the DB level — mitigated by Yup validation on the FE and class-validator DTOs on the BE.

**Why `wizardState.input` instead of column?**

For privacy: we explicitly do NOT want long-form PHI text in a column with default backups. Storing it inside JSON makes it possible to wipe quickly via JSON path operations during retention purges.

**Why store `anonymizedText` then?**

Because anonymized text is **post-de-identification** — by definition no PHI. It's safe to persist for re-export, audit-trail rendering, and dashboard previews.

### 7.4 Entity ↔ Migration Drift (Known Issue)

**Current state:** `User` TypeORM entity has 4 fields; migration creates 10 columns.

This drift is a **known issue** introduced before April 12 and not yet remediated. See [Section 12 — Architectural Agility](#12-architectural-agility) for the procedural fix.

**Resolution plan:**
1. Add missing fields to entity (firstName, lastName, role, isActive, etc.)
2. OR remove unused columns from migration
3. Decide which based on whether features (roles, names) are actually planned

### 7.5 Migrations

| Convention | Decision |
|------------|----------|
| **Migration tool** | TypeORM CLI |
| **Naming** | `<timestamp>-<DescriptiveName>.ts` |
| **Storage** | `backend/src/database/migrations/` |
| **Run on deploy** | Should run in CI pre-deploy step (gap: not yet integrated) |
| **Rollback** | Each migration must implement `down()` |
| **Synchronize** | Disabled in production (`DB_SYNCHRONIZE=false`); enabled in local dev |

**Status:** Migration `1710000000000-InitialSchema.ts` exists but lacks the `jobs` table. This must be added.

### 7.6 Data Retention & Lifecycle

| Entity | Retention Policy (proposed) |
|--------|-----------------------------|
| **User** | Indefinite while active. Hard-delete on user request (GDPR right to erasure). |
| **Job** (status=COMPLETED) | 90 days, then hard-delete. Configurable per deployment. |
| **Job** (status=FAILED) | 30 days for diagnostics, then delete. |
| **Job** (status=DRAFT) | 7 days idle, then delete to clean up abandoned wizards. |
| **AuditLog** (planned) | 7 years (HIPAA-compliant). |

These policies are **proposed** and require legal review before production deployment.

### 7.7 Data Privacy Decisions

| Decision | Rationale |
|----------|-----------|
| **No PHI in DB** | Smallest blast radius if DB is compromised |
| **Original text in sessionStorage only** | Survives page refreshes during wizard, cleared on logout/expiration |
| **Anonymized text in DB** | Safe (no PHI by definition) |
| **JWT in localStorage** | Standard practice; mitigated by 1-hour expiry; tradeoff vs httpOnly cookie complexity |
| **Email in DB** | Required for Magic Link delivery; minimum-necessary |
| **No analytics on PHI** | Forbidden by HIPAA — no tracking pixels on de-id results pages |

---

## 8. API Design

### 8.1 API Style

**Decision:** RESTful HTTP/JSON with Swagger/OpenAPI documentation.

**Rationale:** REST is well-understood, tooling is universal, OpenAPI generates client types. GraphQL was considered but rejected for v1 — overkill for our endpoint count, and team less familiar.

### 8.2 URL Conventions

```
Base URL:           /api
Authentication:     /api/auth/*
Users:              /api/users/*
Jobs:               /api/jobs/*
Results (renders):  /app/results/*    ← legacy from earlier design; should normalize to /api/results in v1.1
Email:              /api/email/*
Dashboard:          /app/dashboard    ← same comment
```

**Conventions:**
- Resource names: plural nouns (`/jobs`, `/users`)
- Sub-resources: nested under parent (`/jobs/:id/run`, `/jobs/:id/upload`)
- Actions on a resource (non-CRUD): POST with verb (`/jobs/:id/run` rather than `PUT /jobs/:id?action=run`)
- IDs: UUIDs in path

### 8.3 HTTP Methods

| Method | Use |
|--------|-----|
| GET | Read; idempotent; cacheable |
| POST | Create; non-idempotent; returns 201 |
| PATCH | Partial update; returns 200 |
| PUT | Full replacement (not currently used) |
| DELETE | Remove (planned for retention purges) |

### 8.4 Authentication & Authorization

**Authentication:** Bearer JWT in `Authorization: Bearer <token>` header.

**Token issuance:** `POST /api/auth/login` (Magic Link) → email → `POST /api/auth/verify` → JWT.

**Token lifetime:** 1 hour. Refresh: re-login (no refresh tokens in v1 — simplification).

**Authorization:** Per-resource ownership. Each Job has a `userId`; service-layer guards reject access if `req.user.id !== job.userId`.

**Decision:** No role-based access in v1. All authenticated users have analyst role implicitly. Roles are designed-for (User entity has `role` field) but not enforced. v2 will add admin/analyst/viewer.

### 8.5 Response Envelope

**Decision:** Domain objects returned directly (no wrapper). Errors use shared schema.

**Success (2xx):**
```json
{
  "id": "uuid",
  "status": "completed",
  ...
}
```

**Error (4xx/5xx):**
```json
{
  "statusCode": 400,
  "message": "...",
  "error": "Bad Request",
  "timestamp": "2026-04-28T10:00:00.000Z",
  "path": "/api/jobs"
}
```

This shape is enforced by `HttpExceptionFilter`. The `timestamp` and `path` make logs/debugging easier.

### 8.6 Validation & Error Codes

**Validation:** Global `ValidationPipe` with:
- `whitelist: true` — strips unknown fields
- `forbidNonWhitelisted: true` — rejects unknown fields with 400
- `transform: true` — transforms plain objects to class instances

**Standard error codes:**

| Status | Use | Example |
|--------|-----|---------|
| 400 | Validation error, malformed payload | `email` is not valid email |
| 401 | Missing or invalid JWT | Token expired |
| 403 | Authenticated but not authorized | Accessing another user's job |
| 404 | Resource not found | Job UUID does not exist |
| 409 | Conflict (rare; not used yet) | — |
| 422 | Unprocessable entity (semantic validation) | (Reserved) |
| 429 | Rate limited (planned) | Too many magic-link requests |
| 500 | Server error | Unhandled exception |
| 503 | Upstream unavailable | Presidio container down |

### 8.7 Pagination, Filtering, Sorting

**v1 minimal:** Most endpoints return all records for current user (small per-user dataset).

**Future:**
- `?page=1&pageSize=20` for list endpoints
- `?status=completed` for filtering
- `?sort=createdAt:desc` for sorting

### 8.8 API Versioning

**Decision:** Path-based versioning when needed.

**v1:** `/api/...` (unversioned, implicit v1)

**v2:** `/api/v2/...` when breaking changes are needed.

**Rationale:** Path-based is simplest for SPA + curl; works with caching; visible in logs. Header-based versioning is more elegant but creates more debugging friction.

**Backward compatibility window:** Once a v2 ships, v1 endpoints supported for ≥3 months.

### 8.9 Documentation (Swagger / OpenAPI)

**Single source of truth:** code-first via NestJS `@ApiOperation`, `@ApiResponse`, `@ApiBody`.

**Available at:** `GET /api/docs` (Swagger UI) and `GET /api/docs-json` (OpenAPI JSON for client codegen).

**Per Git rules:** Every endpoint must document at least one 2xx, one 4xx, one 5xx response.

### 8.10 Public API Endpoints (Current State)

| Method | Path | Auth | Purpose |
|--------|------|:----:|---------|
| POST | `/api/auth/login` | — | Request Magic Link by email |
| GET  | `/api/auth/verify` | — | (Some implementations have this for token redirection) |
| POST | `/api/auth/verify` | — | Exchange Magic Link token for JWT |
| GET  | `/api/users/me` | JWT | Current user profile |
| POST | `/api/jobs` | JWT | Create draft job |
| GET  | `/api/jobs/latest-draft` | JWT | Resume the user's latest in-progress draft |
| GET  | `/api/jobs/:id` | JWT | Read job (poll for status) |
| PATCH | `/api/jobs/:id` | JWT | Update wizardState |
| POST | `/api/jobs/:id/upload` | JWT | Upload text file (multipart) |
| POST | `/api/jobs/:id/run` | JWT | Trigger async pipeline |
| GET  | `/app/results/:id` | JWT | Render results JSON |
| GET  | `/app/results/:id/export/pdf` | JWT | Download PDF audit |
| GET  | `/app/results/:id/export/json` | JWT | Download JSON |
| GET  | `/app/dashboard` | JWT | Dashboard metrics |
| POST | `/api/email/contact` | — | Submit contact form |

### 8.11 Cross-cutting API Concerns

| Concern | Approach |
|---------|----------|
| **Idempotency** | GET, PATCH naturally idempotent. POST `/jobs/:id/run` is **not** idempotent — running twice would re-process. Consider idempotency keys in v2. |
| **Concurrency** | TypeORM optimistic locking via `updatedAt` (planned). |
| **Long-running ops** | `/jobs/:id/run` returns 202-style: returns immediately, work happens async. Client polls. (Future: WebSocket or Server-Sent Events.) |
| **Large uploads** | Multipart `/jobs/:id/upload`, max 5 MB. Stored to disk briefly, then validated and discarded after parsing. |
| **Rate limiting** | Not implemented. Planned: per-user, per-endpoint via `@nestjs/throttler`. |
| **CORS** | Configured per-environment via `CORS_ORIGIN` env var. Production: app domain only. |

---

## 9. Compliance Design

This section describes how the architecture supports the four compliance frameworks. Compliance is **designed-in**, not bolted-on.

### 9.1 Frameworks Supported

| Framework | Region | Method(s) | Status (Apr 2026) |
|-----------|--------|-----------|---------------------|
| **HIPAA** | USA | Safe Harbor (default) + Expert Determination | Implemented |
| **GDPR** | EU | Risk-level (Low/Medium/High) | UI placeholder; logic in progress |
| **UK DPA** | UK | Aligned with GDPR | Planned |
| **Swiss FADP** | Switzerland | Aligned with GDPR | Planned |

### 9.2 HIPAA Safe Harbor — 18 Identifier Types

HIPAA Safe Harbor (45 CFR § 164.514(b)(2)) requires removal of 18 specific identifier types. Our system maps each to Microsoft Presidio recognizer types:

| # | HIPAA Identifier | Presidio Type | Notes |
|--:|-----------------|----------------|-------|
| 1 | Names | `PERSON` | First, last, full names |
| 2 | Geographic subdivisions smaller than state | `LOCATION` | Street, city, county, ZIP-3 |
| 3 | Dates (DOB, admission, etc.) | `DATE_TIME` | Year-only allowed if ≤89 years old |
| 4 | Telephone numbers | `PHONE_NUMBER` | |
| 5 | Fax numbers | `PHONE_NUMBER` | (No separate Presidio recognizer) |
| 6 | Email addresses | `EMAIL_ADDRESS` | |
| 7 | Social Security numbers | `US_SSN` | |
| 8 | Medical record numbers | `MEDICAL_RECORD_NUMBER` (custom) | **Note:** not standard Presidio. Future: register custom recognizer. |
| 9 | Health plan beneficiary numbers | `US_HEALTH_NUMBER` (custom) | Same note as above. |
| 10 | Account numbers | `US_BANK_NUMBER` | |
| 11 | Certificate/license numbers | `US_PASSPORT`/`US_DRIVER_LICENSE` | Approximate mapping |
| 12 | Vehicle identifiers (VIN) | (no native Presidio match) | Needs custom recognizer |
| 13 | Device identifiers (serial #s) | (no native Presidio match) | Needs custom recognizer |
| 14 | Web URLs | `URL` | |
| 15 | IP addresses | `IP_ADDRESS` | |
| 16 | Biometric identifiers | (no native Presidio match) | Needs custom recognizer |
| 17 | Full-face photographs | (text-only, N/A) | Out of scope (we are text-only) |
| 18 | Any other unique identifying number/code | (general-purpose) | Custom rules |

**Known gaps in current implementation:**
- Items 8, 9, 12, 13, 16: Presidio doesn't recognize these natively. Current code maps them to nonexistent recognizer names → silently skipped at runtime.
- **Action required:** Either register custom Presidio recognizers, or document these as out-of-scope and require manual review.

### 9.3 HIPAA Expert Determination

Alternative to Safe Harbor: a qualified expert applies statistical methods to determine that re-identification risk is "very small."

**Our implementation:**
- User selects Expert Determination in Step 3 of wizard
- Custom entity selection becomes editable
- User chooses which 18 identifiers to apply
- User adjusts confidence threshold per entity
- Output PDF documents the expert's choices for compliance evidence

**Note:** Our system **does not** perform statistical risk analysis. It **enables** an expert to apply their analysis. The expert is the user; we are the tool.

### 9.4 GDPR Risk Levels (Planned)

GDPR doesn't define rigid identifier lists like HIPAA, but maps to risk-based reasoning. Our planned UX:

| Level | Entities Removed | Use Case |
|-------|------------------|----------|
| **Low** | Direct identifiers only (name, email, phone, SSN-equivalents) | Sharing within a research consortium with strong legal agreements |
| **Medium** | Direct + quasi-identifiers (dates, locations, IPs) | Public research datasets |
| **High** | All possibly-identifying data | Maximum anonymization; closer to HIPAA Safe Harbor |

This is a **simplification** of GDPR's actual requirements. A formal Data Protection Impact Assessment (DPIA) is the user's responsibility.

### 9.5 Audit Trail (Compliance Evidence)

Every job produces a downloadable PDF that serves as compliance evidence:

```
[Header: "De-Identification Audit Trail"]
─────────────────────────────────────────
Job ID:           550e8400-e29b-41d4-a716-446655440000
User:             analyst@example.com
Timestamp:        2026-04-28 14:32:11 UTC
Document Hash:    sha256:abc...  (planned)

[Framework Section]
─────────────────────────────────────────
Framework:        HIPAA
Method:           Safe Harbor
Threshold:        Balanced (0.5)

[Identifier Coverage]
─────────────────────────────────────────
✓ PERSON              detected: 12  applied: 12 (Redact)
✓ DATE_TIME           detected: 4   applied: 4  (Redact)
✓ US_SSN              detected: 2   applied: 2  (Redact)
✗ MEDICAL_RECORD_NUMBER (recognizer not available)
...

[Original Excerpt]
─────────────────────────────────────────
"Patient John Smith, DOB 03/15/1948, was..."

[Anonymized Output]
─────────────────────────────────────────
"Patient <PERSON>, DOB <DATE_TIME>, was..."

[Processing Metadata]
─────────────────────────────────────────
Engine:           Microsoft Presidio v2.x
Processing time:  3.2 seconds
Strategy:         Redact
```

**Why a PDF and not just JSON?**
- PDFs are easier for non-technical compliance officers
- PDFs can be printed, signed, archived
- PDFs are tamper-evident (with future digital signatures)

### 9.6 Compliance Boundaries — What We Do NOT Cover

These are user responsibilities, not platform responsibilities:

| Out-of-Scope | Why |
|--------------|-----|
| Statistical re-identification risk analysis | Requires domain expert; tool can't certify |
| Business Associate Agreement with Microsoft (Presidio) | User's legal department |
| Patient consent management | User's consent management system |
| Encryption key management for HIPAA | User's KMS |
| Multi-party data agreements | User's legal department |
| Audit log immutability (WORM storage) | Hosting decision (planned for production) |

We provide **automation and evidence generation**. We do **not** provide legal certification.

### 9.7 Compliance-Driven Design Decisions

| Design Decision | Compliance Driver |
|-----------------|-------------------|
| No PHI in DB | Minimize breach surface (HIPAA, GDPR) |
| Anonymized text in DB | Safe (no PHI by definition) |
| 1-hour JWT lifetime | Minimum-necessary access (HIPAA security rule) |
| Email-only auth (no SMS, no SSO) | Reduce data shared (privacy by design, GDPR Art. 25) |
| Audit-trail PDF on every job | "Accountability" principle (GDPR Art. 5) |
| HTTPS only in production | Encryption in transit (HIPAA, GDPR, etc.) |
| `select: false` on sensitive User fields (planned) | Defense in depth |
| Minimum-necessary fields in DTOs | GDPR data minimization |
| 90-day retention default | Aligned with research-norm retention (configurable) |

### 9.8 Future Compliance Work

| Item | Driver |
|------|--------|
| Custom Presidio recognizers for MRN, VIN, device IDs | Close HIPAA identifier gaps |
| Encryption at rest (column-level) | HIPAA security rule §164.312(a)(2)(iv) |
| Audit log table (immutable) | HIPAA §164.312(b) |
| Digital signatures on PDFs | Tamper evidence |
| BAA-friendly hosting (HIPAA-eligible cloud tier) | Required for real PHI workloads |
| GDPR DSR (Data Subject Request) endpoints | Right to access, erasure |
| Cookie consent banner | GDPR ePrivacy Directive |
| DPIA template | GDPR Art. 35 |

---

## 10. Security Architecture

### 10.1 Multi-Layer Security Model

Security is built in **defense-in-depth** layers. No single layer is trusted to provide complete protection — each compensates for failures in others.

```
┌────────────────────────────────────────────────────────────────────┐
│   LAYER 1 — NETWORK SECURITY                                        │
│   HTTPS-only, CORS, security headers, port hardening                │
└────────────────────────────────────────────────────────────────────┘
              ▲ if breached, attacker still hits...
              │
┌────────────────────────────────────────────────────────────────────┐
│   LAYER 2 — AUTHENTICATION                                          │
│   Magic Link, JWT, short-lived tokens                               │
└────────────────────────────────────────────────────────────────────┘
              ▲ if breached, still must pass...
              │
┌────────────────────────────────────────────────────────────────────┐
│   LAYER 3 — AUTHORIZATION                                           │
│   Resource ownership checks, role guards (planned)                  │
└────────────────────────────────────────────────────────────────────┘
              ▲ if breached, must still get past...
              │
┌────────────────────────────────────────────────────────────────────┐
│   LAYER 4 — INPUT VALIDATION                                        │
│   DTO validation, file MIME/size checks, SQL injection prevention   │
└────────────────────────────────────────────────────────────────────┘
              ▲ even if validated, data is still...
              │
┌────────────────────────────────────────────────────────────────────┐
│   LAYER 5 — DATA PROTECTION                                         │
│   No PHI in DB, encryption, secrets management                      │
└────────────────────────────────────────────────────────────────────┘
              ▲ all of which is...
              │
┌────────────────────────────────────────────────────────────────────┐
│   LAYER 6 — AUDIT & LOGGING                                         │
│   Detect, alert, attribute. Compliance evidence.                    │
└────────────────────────────────────────────────────────────────────┘
```

**Principle:** A successful attack requires breaching multiple layers. Mistakes in one layer do not catastrophically compromise the system.

### 10.2 Layer 1: Network Security

| Control | Decision | Status |
|---------|----------|:------:|
| **HTTPS only in production** | All traffic over TLS 1.2+. Heroku terminates TLS. | Achieved via Heroku |
| **HTTP→HTTPS redirect** | Forced by Heroku for `*.herokuapp.com`; configure for custom domain | Default |
| **HSTS header** | `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (planned) | Gap |
| **CORS** | `Access-Control-Allow-Origin` = configured frontend domain only. Credentials enabled. | Achieved (configurable) |
| **CSP header** | Strict Content-Security-Policy; report-only initially (planned) | Gap |
| **X-Frame-Options** | `DENY` to prevent clickjacking | Gap |
| **X-Content-Type-Options** | `nosniff` | Gap |
| **Referrer-Policy** | `strict-origin-when-cross-origin` | Gap |
| **DB port not exposed** | MySQL only on internal Docker network in production | Achieved |
| **Presidio not exposed** | Internal-only on Docker network | Achieved (where deployed) |
| **Rate limiting** | 100 req/min per IP for `/auth/*`; per-user limits elsewhere (planned) | Gap |

**Decision Rationale:**
- HTTPS is non-negotiable for HIPAA. Heroku gives us TLS for free.
- CORS configurable because we deploy to multiple environments (local, staging, prod).
- Security headers will be added once we move from Heroku-default to a reverse proxy or middleware layer.

### 10.3 Layer 2: Authentication

#### 10.3.1 Magic Link Design

**Why Magic Link, not passwords?**

| Factor | Password | Magic Link |
|--------|----------|------------|
| Phishing resistance | Low (users reuse passwords) | High (single-use tokens) |
| Storage burden | Hash + salt + rotation policy | Token + expiry |
| Reset flow | Required (forgot password) | Login *is* reset |
| User friction | Memorize password | Click email link |
| Account enumeration | Login form leaks valid emails | Can be designed to not leak |
| Best for | Frequent login | Occasional login (clinical use case) |

**Decision:** Magic Link wins on attack surface and user experience for our user base (clinical staff, occasional logins).

#### 10.3.2 Magic Link Flow Security

```
1. User enters email
2. Backend generates a UUIDv4 token  (≥122 bits of entropy)
3. Token stored hashed (SHA-256) — original sent only to email
4. Token TTL: 15 minutes
5. Token is single-use (consumed on verification)
6. Email contains link with token in URL fragment OR query
7. On verify:
   - Lookup user by token hash
   - Check expiry
   - Issue JWT
   - Invalidate token (rotate)
```

**Decisions:**
- **UUIDv4 over short codes:** UUIDs are 122 bits — brute force is infeasible. Short codes (e.g., 6-digit) need rate limiting.
- **Hashed storage:** If DB leaks, attackers can't immediately log in as users.
- **15-min TTL:** Balances UX (slow inboxes) and security (smaller exposure window).
- **Single-use:** Replay protection.

**Current implementation gap:** Token storage may be plaintext in some snapshots. Hashed storage is the design intent.

#### 10.3.3 JWT Design

| Property | Value |
|----------|-------|
| Algorithm | HS256 (symmetric, server-only secret) |
| Issuer | `clinical-deid-portal` |
| Audience | `clinical-deid-portal` |
| Subject | User UUID |
| Expiry | 1 hour |
| Refresh | None (re-login required) |
| Revocation | Stateless — relies on short expiry. Future: deny-list for emergency revocation. |
| Storage on client | localStorage |

**localStorage vs httpOnly cookie tradeoff:**

| Storage | XSS exposure | CSRF exposure | Implementation cost |
|---------|--------------|---------------|---------------------|
| localStorage | High (JS can read) | None | Low |
| httpOnly cookie | None | High (need CSRF token) | Higher (CSRF infra) |

**Decision:** localStorage in v1, accepting XSS risk because:
1. We have strict CSP planned to mitigate XSS
2. Short JWT expiry (1h) limits impact
3. Higher dev velocity for MVP

For v2 (production with real PHI workloads), consider httpOnly cookies with SameSite=Strict.

#### 10.3.4 Auth Flow Security Properties

| Property | How Achieved |
|----------|--------------|
| **No passwords transmitted** | Email-only |
| **Token freshness** | 15-min Magic Link, 1-hr JWT |
| **Token theft mitigation** | Short expiry; future: device binding |
| **Email enumeration prevention** | Backend always returns 200 to `/auth/login` regardless of email validity (planned; current implementation may differ) |
| **Brute force resistance** | Rate limiting (planned), 122-bit tokens |
| **Session fixation prevention** | New JWT issued per verification; no session ID reuse |

### 10.4 Layer 3: Authorization

#### 10.4.1 Authorization Model

**v1 model:** Resource ownership.

Every Job has a `userId`. Service-layer guards reject access if `req.user.id !== job.userId`. This prevents **IDOR** (Insecure Direct Object Reference) — the most common API authorization bug.

```typescript
// Pseudocode of the pattern
async getJob(jobId: string, requestingUserId: string) {
  const job = await this.repo.findOneByOrFail({ id: jobId });
  if (job.userId !== requestingUserId) {
    throw new ForbiddenException('Access denied');
  }
  return job;
}
```

**Decision:** Authorization is enforced in **service layer**, not just guards. Reasons:
1. Guards can be bypassed if a developer forgets `@UseGuards(...)`
2. Service-layer checks survive controller refactors
3. Service-layer checks work for non-HTTP entry points (events, scheduled jobs)

#### 10.4.2 Roles (Designed, Not Enforced)

The User entity has a `role` field designed for:

| Role | Permissions (planned) |
|------|----------------------|
| `viewer` | Read jobs, read results. No mutation. |
| `analyst` | Default. Create/run jobs, download results. |
| `admin` | All analyst permissions + manage users + access all jobs in tenant |

**Status:** Field exists in design; not yet wired to guards. v2 work.

#### 10.4.3 IDOR Prevention Checklist

For every endpoint that accepts a resource ID:

- [ ] Service-layer ownership check before returning data
- [ ] Service-layer ownership check before mutation
- [ ] No guessable IDs (UUID v4, not auto-increment)
- [ ] Error responses don't leak existence (use 403 or 404 consistently)
- [ ] List endpoints filter by `userId` automatically

#### 10.4.4 Inconsistencies to Fix

**Current code has two competing JWT guards** with different payload shapes:

- `auth/guards/auth.guard.ts` — payload: `{sub, email}`
- `auth/guards/jwt-auth.guard.ts` — payload: `{id, email}`

Some controllers use `req.user.sub`, others `req.user.id`. **Resolution:** Pick one; the Passport-based guard is more idiomatic. Migrate all controllers to `{id, email}`.

### 10.5 Layer 4: Input Validation

#### 10.5.1 Validation Boundary

**Decision:** Validate at the **edge** (controller boundary). Inner code trusts validated data.

#### 10.5.2 Validation Stack (Backend)

```
Incoming request
       │
       ▼
NestJS ValidationPipe (global)
   - whitelist: true             ← strips unknown fields
   - forbidNonWhitelisted: true  ← rejects unknown fields
   - transform: true             ← class instances
       │
       ▼
DTO with class-validator decorators
   @IsEmail(), @IsString(), @IsUUID(), @MaxLength(), etc.
       │
       ▼
Custom service-layer validation (where needed)
       │
       ▼
TypeORM (parameterized queries → SQL injection-safe)
```

#### 10.5.3 Specific Inputs & Their Validators

| Input | Validation |
|-------|-----------|
| Email | `@IsEmail()` + `@MaxLength(254)` |
| User-provided text | `@MinLength(50) @MaxLength(5000)` (per Sprint 2 wizard) |
| File upload | MIME whitelist (`text/plain`, `application/json`, `text/csv`); max 5 MB; magic-byte check (planned) |
| UUIDs | `@IsUUID('4')` |
| Framework | `@IsIn(['hipaa','gdpr','uk_dpi','swiss_fadp'])` |
| Method | `@IsIn(['Safe Harbor','Expert Determination'])` |
| Strategy | `@IsIn(['Redact','Replace','Hash','Mask','Synthetic'])` |
| Threshold preset | `@IsIn(['Conservative','Balanced','Aggressive'])` |
| Language | `@IsIn(ALL_LANGUAGES)` (~32 ISO codes) |

#### 10.5.4 SQL Injection

**Mitigation:** TypeORM parameterizes all queries by default. We use `repository.findOneBy({ id })` and `QueryBuilder.where('x = :y', { y })` exclusively. No string concatenation in queries.

#### 10.5.5 XSS

**Mitigation:**
- React escapes by default — no `dangerouslySetInnerHTML` allowed
- Email templates: HTML-escape user-provided values (already in templates)
- CSP planned (Layer 1)

#### 10.5.6 File Upload Risks

| Risk | Mitigation |
|------|-----------|
| Malicious file content | Parse only as text; never execute |
| Path traversal | Multer's filename sanitization |
| Disk filling | 5 MB max per upload + cleanup after parsing |
| Polyglot files | MIME + magic-byte check (planned) |
| Embedded scripts in CSV | We treat CSV as text, never as Excel — no formula execution |

#### 10.5.7 Wizard State JSON Validation

`wizardState` is stored as JSON (per Section 7.3) but **must be validated** before write. Use Yup schema mirroring on FE; class-validator nested DTO on BE.

### 10.6 Layer 5: Data Protection

#### 10.6.1 Classification

| Data Type | Classification | Persistent? | Encryption Required |
|-----------|----------------|:-----------:|:--------------------:|
| Email | PII | Yes (User) | At rest (production) |
| User UUID | Internal | Yes | No |
| **Original PHI text** | **PHI** | **No** | (Doesn't apply — not stored) |
| Anonymized text | Non-PHI | Yes (Job) | At rest (defense in depth) |
| JWT secret | Secret | No (env var) | KMS or env-encrypted |
| SMTP password | Secret | No (env var) | KMS or env-encrypted |
| ENCRYPTION_KEY | Secret | No (env var) | KMS |
| Audit logs | Internal | Yes (planned) | At rest |

#### 10.6.2 Encryption at Rest

**Database-level:**
- Production: enable Heroku Postgres/MySQL encryption (or migrate to RDS with KMS)
- Local dev: not encrypted (acceptable; no real PHI)

**Application-level (planned for v2):**
- Anonymized text: column-level encryption with rotated keys
- Email: optional column-level encryption

**Decision:** Defer column-level to v2. v1 relies on database-level + access control.

#### 10.6.3 Encryption in Transit

- All client → server: HTTPS (Heroku-terminated)
- Server → SMTP: STARTTLS or implicit TLS
- Server → Presidio: HTTPS in production (currently HTTP local; planned)
- Server → Database: TLS to Heroku DB; local dev plaintext

#### 10.6.4 Secrets Management

**Current:** Environment variables (`.env`, Heroku Config Vars).

**Rules:**
- Never commit secrets (`.env` in `.gitignore`)
- Never log secrets (sanitize log output)
- Rotate secrets every 90 days (manual; planned: vault integration)
- Different secrets per environment

**Future:** Migrate to a secret manager (Heroku has built-in; AWS Secrets Manager / HashiCorp Vault for self-host).

#### 10.6.5 Data Minimization

**Principle:** Collect and persist only what's needed.

Examples:
- We don't store user names initially — only email. Add only when there's a use case.
- We don't store IP addresses (planned: in audit logs only)
- File uploads aren't kept — parsed in-memory then discarded
- Original text isn't persisted — held only in user's sessionStorage

#### 10.6.6 Backup & Restore

**Backups:** Heroku-managed daily snapshots (paid tier).

**Encryption:** Backups encrypted at rest by Heroku.

**Retention:** 30 days rolling.

**Test restore:** Quarterly drill (procedure to be documented).

### 10.7 Layer 6: Audit & Logging

*[Section 10.7 — to be filled]*

### 10.8 Threat Model (STRIDE)

*[Section 10.8 — to be filled]*

---

## 11. Test Architecture

### 11.1 Test Pyramid & Coverage Targets

*[Section 11.1 — to be filled]*

### 11.2 Tooling Decisions

*[Section 11.2 — to be filled]*

### 11.3 File Placement & Naming Conventions

*[Section 11.3 — to be filled]*

### 11.4 Mocking Strategy

*[Section 11.4 — to be filled]*

### 11.5 CI/CD Integration

*[Section 11.5 — to be filled]*

### 11.6 Current State & Remediation Path

*[Section 11.6 — to be filled]*

---

## 12. Architectural Agility

### 12.1 Design Principles for Change

*[Section 12.1 — to be filled]*

### 12.2 Stability vs Agility Boundary

*[Section 12.2 — to be filled]*

### 12.3 Architectural Decision Records (ADRs)

*[Section 12.3 — to be filled]*

### 12.4 Reversibility & Two-Way Doors

*[Section 12.4 — to be filled]*

### 12.5 Versioning Strategy

*[Section 12.5 — to be filled]*

### 12.6 Feature Flags & Config-Driven Behavior

*[Section 12.6 — to be filled]*

### 12.7 Refactoring Practices

*[Section 12.7 — to be filled]*

---

## 13. Infrastructure & Deployment

*[Section 13 — to be filled]*

---

## 14. Quality, Observability, Performance

*[Section 14 — to be filled]*

---

*End of Design Document*
