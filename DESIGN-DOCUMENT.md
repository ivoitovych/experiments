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

*[Section 5 — to be filled]*

---

## 6. Technical Architecture

*[Section 6 — to be filled]*

---

## 7. Data Design

*[Section 7 — to be filled]*

---

## 8. API Design

*[Section 8 — to be filled]*

---

## 9. Compliance Design

*[Section 9 — to be filled]*

---

## 10. Security Architecture

### 10.1 Multi-Layer Security Model

*[Section 10.1 — to be filled]*

### 10.2 Layer 1: Network Security

*[Section 10.2 — to be filled]*

### 10.3 Layer 2: Authentication

*[Section 10.3 — to be filled]*

### 10.4 Layer 3: Authorization

*[Section 10.4 — to be filled]*

### 10.5 Layer 4: Input Validation

*[Section 10.5 — to be filled]*

### 10.6 Layer 5: Data Protection

*[Section 10.6 — to be filled]*

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
