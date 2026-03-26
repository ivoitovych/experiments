# Backend Architecture & Code Structure Review

## Overview

NestJS backend with 5 feature modules (Auth, Users, De-Identification, Synthetic Data, Dashboard), TypeORM/MySQL persistence, JWT auth via magic links, and Presidio integration for PII detection/anonymization.

---

## Findings

### Critical

| # | Issue | File |
|---|-------|------|
| 7 | **Insecure JWT secret default** `'CHANGE_ME_IN_PRODUCTION'` -- app should refuse to start without proper secret | `configuration.ts:32` |
| 8 | **Insecure encryption key default** `'0000000000000000'` -- trivially decryptable PHI | `configuration.ts:45` |

### Major

| # | Issue | File |
|---|-------|------|
| 6 | Global exception filter only catches `HttpException`, not all exceptions (TypeErrors, DB errors bypass it) | `http-exception.filter.ts:28` |
| 9 | No config validation at startup -- missing env vars silently use insecure defaults | `configuration.ts` |
| 13 | Magic link URL hardcoded to `localhost:5173` | `auth.service.ts:62` |
| 14 | Magic link token stored in plaintext in DB | `auth.service.ts:57-58` |
| 15 | `getDocument` lacks user ownership check -- IDOR vulnerability | `de-identification.controller.ts:122` |
| 16 | `UsersController` lacks role-based authorization -- any user can CRUD all users | `users.controller.ts:39-67` |
| 17 | Dashboard returns fake/mock data mixed with real data | `dashboard.service.ts:54-81` |
| 21 | No `RolesGuard` or `@Roles()` decorator exists despite `User.role` field | N/A (missing) |
| 22 | Migration ENUM drift -- `framework` column missing `uk_dpi`, `swiss_fadp` values | `InitialSchema.ts:33` |

### Minor

| # | Issue | File |
|---|-------|------|
| 1 | Unused `PresidioService` export from DeIdentificationModule | `de-identification.module.ts:24` |
| 2 | DashboardModule bypasses service layer with direct repository access | `dashboard.module.ts:9` |
| 5 | Manually duplicated entity list between AppModule and data-source.ts | `app.module.ts:52`, `data-source.ts:32` |
| 10 | data-source.ts password default inconsistency with configuration.ts | `data-source.ts:30` |
| 11 | Swagger exposed in all environments (info disclosure for PHI app) | `main.ts:59-86` |
| 12 | `enableImplicitConversion: true` can cause unexpected type coercion | `main.ts:54` |
| 18 | `remove()` is hard delete despite docstring saying "soft-delete" | `users.service.ts:107-110` |
| 19 | `findOrCreate` has a race condition on concurrent signups | `users.service.ts:101-105` |
| 20 | PresidioService swallows original error details | `presidio.service.ts:226-236` |

### Nitpick

| # | Issue | File |
|---|-------|------|
| 4 | `Repository` imported as type-only (acceptable but fragile) | Multiple services |
| 24 | Manual UUID generation conflicts with `@PrimaryGeneratedColumn('uuid')` | `synthetic-data.service.ts:97-98` |
| 25 | `Document` entity lacks `@UpdateDateColumn` | `document.entity.ts` |
