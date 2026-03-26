# Project Review: Clinical Data De-Identification Studio

## Overview
Full-stack NestJS + React/TypeScript application for healthcare data de-identification using Microsoft Presidio. Includes magic-link auth, multi-framework compliance (HIPAA/GDPR), synthetic data generation, and a dashboard.

---

## Critical Issues

| # | Issue | Location |
|---|-------|----------|
| 1 | **JWT secret defaults to known string** `'CHANGE_ME_IN_PRODUCTION'` -- app starts silently with forgeable tokens | `backend/src/config/configuration.ts:32` |
| 2 | **Encryption key defaults to `'0000000000000000'`** -- PHI "encrypted" with a zero key is trivially reversible | `backend/src/config/configuration.ts:45` |
| 3 | **No role-based authorization** -- any authenticated user can list/update/delete all users and escalate to admin via `PATCH /users/:id { role: 'admin' }` | `backend/src/modules/users/users.controller.ts` |
| 4 | **IDOR on documents** -- `GET /documents/:id` has no ownership check; any user can read any other user's PHI | `backend/src/modules/de-identification/de-identification.controller.ts:122` |
| 5 | **Dashboard returns fake data** -- hardcoded mock numbers (24 docs, 516 entities) shown when no real data exists; activity chart is always random | `backend/src/modules/dashboard/dashboard.service.ts:54-81` |
| 6 | **No CI/CD pipeline** -- zero automated testing, linting, or security scanning on PRs | Project root |
| 7 | **No Dockerfiles** for backend or frontend -- cannot deploy to any container platform | Project root |
| 8 | **Frontend API base URL missing `/api` prefix** -- all frontend service calls will 404 without env override | `frontend/src/constants/index.ts:9` |

## High Severity

| # | Issue | Area |
|---|-------|------|
| 1 | Magic link token stored in plaintext in DB | Auth/Security |
| 2 | JWT stored in localStorage (XSS-vulnerable), not httpOnly cookies | Frontend Security |
| 3 | No rate limiting on any endpoint (magic-link abuse, DoS) | API Security |
| 4 | No Helmet/security headers middleware | API Security |
| 5 | PHI (originalText) stored unencrypted at rest in DB | HIPAA Compliance |
| 6 | No audit trail for PHI data access | HIPAA Compliance |
| 7 | JWT expiry defaults to 7 days with no revocation mechanism | Auth |
| 8 | Migration ENUM drift -- `documents.framework` missing `uk_dpi`, `swiss_fadp` | Database |
| 9 | Uploaded files never cleaned up from disk | Backend |
| 10 | DB port mismatch -- `.env.example` says 3306, docker-compose maps to 3307 | DevOps |
| 11 | Backend path alias `@/*` not resolved after `nest build` -- production will crash | Build |
| 12 | Missing `helmet` and `@nestjs/throttler` dependencies | Dependencies |
| 13 | Presidio Docker images use `:latest` tag -- non-reproducible builds | DevOps |
| 14 | File upload drop zone not keyboard-accessible (a11y) | Frontend UX |
| 15 | Synthetic data `GET` endpoint missing -- cannot retrieve generated records | API |

## Medium Severity

| # | Issue | Area |
|---|-------|------|
| 1 | No config validation at startup -- missing env vars silently use insecure defaults | Backend Config |
| 2 | Global exception filter only catches `HttpException`, not all errors | Error Handling |
| 3 | Magic link URL hardcoded to `localhost:5173` | Auth |
| 4 | `entityCount` saved from unfiltered results (wrong count stored) | Business Logic |
| 5 | `findOrCreate` race condition on concurrent signups | Users |
| 6 | Faker locale never actually applied to faker instance | Synthetic Data |
| 7 | No pagination on jobs or users listing endpoints | API Design |
| 8 | Frontend-backend type misalignment (Document fields, User fields) | Type Safety |
| 9 | No consistent API response envelope | API Design |
| 10 | `Results.tsx` is 723-line god component | Frontend Architecture |
| 11 | Circular dependency: `api.ts` -> `jobsSlice` -> `jobsService` -> `api.ts` | Frontend |
| 12 | `deIdentificationSlice` uses `as unknown as string[]` cast 6 times | Type Safety |
| 13 | Duplicate contact form implementations across Landing and Contact pages | Frontend |
| 14 | ErrorBoundary component exists but is never used in the route tree | Frontend UX |
| 15 | `DB_SYNCHRONIZE=true` default can silently drop columns | DevOps |
| 16 | Stepper not mobile-friendly (labels overflow on small screens) | Frontend UX |

## Test Coverage Summary

| Area | Covered | Total | % |
|------|:---:|:---:|:---:|
| Backend services | 5 | 7 | 71% |
| Backend controllers | 0 | 6 | 0% |
| Frontend pages | 4 | ~9 | 44% |
| Frontend slices | 3 | 5 | 60% |
| Frontend services | 1 | 5 | 20% |

**Key gaps**: Zero controller tests, no tests for dashboard/synthetic-data services, no tests for auth guard, incomplete de-identification service tests (only `uploadFile`).

## Architecture Positives

- Clean NestJS module organization with proper DI
- Well-structured Redux Toolkit state management with typed hooks
- Consistent React Hook Form + Yup validation pattern
- Good lazy loading and code splitting
- Solid responsive design with MUI breakpoints
- Comprehensive Swagger/OpenAPI documentation
- Well-written tests where they exist (especially auth service, Results page)
- Thorough README with architecture diagrams

## Recommendations (Priority Order)

1. **Fail fast on missing secrets** -- refuse to start without `JWT_SECRET` and `ENCRYPTION_KEY`
2. **Add role-based guards** -- implement `@Roles()` decorator and `RolesGuard`
3. **Fix IDOR vulnerabilities** -- add `userId` filtering to all document/resource queries
4. **Move JWT to httpOnly cookies** -- eliminate XSS token theft risk
5. **Add rate limiting** (`@nestjs/throttler`) and **Helmet** security headers
6. **Set up CI/CD** with lint, type-check, test, and security audit steps
7. **Create Dockerfiles** for backend and frontend
8. **Replace dashboard mock data** with real queries or show zeros
9. **Add missing migrations** for `uk_dpi`/`swiss_fadp` framework enum values
10. **Increase test coverage** -- prioritize controllers, auth guard, and frontend services
