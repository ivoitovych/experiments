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

*[Section 4 — to be filled]*

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
