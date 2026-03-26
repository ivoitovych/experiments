# Backend Business Logic Review

## Critical

| # | Issue | File |
|---|-------|------|
| 1.1 | Magic link token stored in plaintext -- timing attack risk | `users.service.ts:64-71` |
| 2.1 | IDOR on `getDocument` -- any user can read any other user's PHI | `de-identification.controller.ts:122` |
| 2.2 | `getDocument` returns `null` instead of 404 | `de-identification.service.ts:151-153` |
| 5.1 | Dashboard returns fake data in production (24 docs, 516 entities when empty) | `dashboard.service.ts:54-57` |
| 6.1 | No role guards on admin endpoints -- privilege escalation possible | `users.controller.ts:39-41` |

## Major

| # | Issue | File |
|---|-------|------|
| 1.2 | `getProfile` returns full User entity including internal fields | `auth.service.ts:100-102` |
| 1.3 | JWT secret falls back to empty string | `jwt.strategy.ts:42` |
| 2.3 | `entityCount` saved from unfiltered results (wrong count stored) | `de-identification.service.ts:125` |
| 2.4 | Race condition in `findOrCreate` for concurrent signups | `users.service.ts:101-105` |
| 2.5 | No upper bound on pagination `limit` -- DoS risk | `de-identification.controller.ts:115` |
| 2.6 | Uploaded files never cleaned up from disk | `de-identification.controller.ts:141-147` |
| 2.7 | No `ParseUUIDPipe` on document ID parameter | `de-identification.controller.ts:122` |
| 3.1 | QUEUED->PROCESSING transition is two consecutive saves (pointless) | `jobs.service.ts:117-124` |
| 4.1 | Faker locale never actually applied | `synthetic-data.service.ts:92` |
| 4.2 | Entity type round-robin cycling produces confusing results | `synthetic-data.service.ts:95-96` |
| 5.2 | Entity distribution is hardcoded percentages, not real data | `dashboard.service.ts:64-81` |
| 5.3 | Activity chart is random mock data on every page load | `dashboard.service.ts:61` |
| 6.2 | Mass assignment via `Object.assign` allows role escalation | `users.service.ts:73-76` |
| 6.3 | Hard delete despite docstring saying "soft-delete" | `users.service.ts:107-110` |
| 7.1 | Encryption key falls back to `'0000000000000000'` | `presidio.service.ts:214-215` |

## Minor

| # | Issue | File |
|---|-------|------|
| 1.4 | Hardcoded frontend URL in magic link | `auth.service.ts:62` |
| 1.5 | VerifyMagicLinkDto lacks `@IsUUID()` | `verify-magic-link.dto.ts:9-10` |
| 2.8 | `AnalyzeTextDto` MinLength(10) inconsistent with AnonymizeTextDto MinLength(1) | `analyze-text.dto.ts:11` |
| 2.9 | MIME type spoofing risk in file upload | `de-identification.controller.ts:149-155` |
| 3.2 | `wizardState.strategy` not validated against known values | `jobs.service.ts:142-146` |
| 3.3 | `CreateJobDto` doesn't validate `framework` against enum | `create-job.dto.ts:9-11` |
| 4.3 | Empty `entityTypes` array causes division by zero | `generate-synthetic.dto.ts:24` |
| 4.4 | No foreign key on SyntheticRecord to User | `synthetic-record.entity.ts:15-16` |
| 7.2 | `pseudonymize`/`generalize` strategies identical to `replace` | `presidio.service.ts:217-220` |
