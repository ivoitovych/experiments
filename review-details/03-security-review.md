# Comprehensive Security Review

## CRITICAL

| # | Issue | File |
|---|-------|------|
| 1.1 | **Hardcoded JWT secret fallback** `'CHANGE_ME_IN_PRODUCTION'` -- forged tokens possible | `configuration.ts:32` |
| 1.6 | **No role-based auth on Users controller** -- any user can escalate to admin | `users.controller.ts:39-67` |

## HIGH

| # | Issue | File |
|---|-------|------|
| 1.2 | JWT default expiry 7 days with no revocation mechanism | `configuration.ts:33` |
| 1.3 | Magic link token stored in plaintext in DB | `auth.service.ts:57-58` |
| 1.5 | No rate limiting on any endpoint | `auth.controller.ts:48-54` |
| 1.7 | Document endpoint IDOR -- any user can read any PHI | `de-identification.controller.ts:121-124` |
| 3.1 | PHI (originalText) stored unencrypted at rest | `document.entity.ts:27-28` |
| 3.2 | No audit trail for PHI data access | N/A (missing) |
| 3.3 | Encryption key fallback to all zeros | `configuration.ts:45` |
| 4.1 | No Helmet/security headers middleware | `main.ts` |
| 4.2 | No rate limiting anywhere (brute-force, DoS, email bombing) | `main.ts`, `app.module.ts` |
| 6.1 | JWT stored in localStorage (XSS-vulnerable) | `authSlice.ts:63`, `api.ts:32` |

## MEDIUM

| # | Issue | File |
|---|-------|------|
| 1.4 | Magic link logged to console with full URL | `auth.service.ts:62-63` |
| 2.2 | Uploaded PHI files never cleaned from disk | `de-identification.controller.ts:141-156` |
| 2.3 | MIME type check can be bypassed (client-supplied) | `de-identification.controller.ts:149-151` |
| 3.4 | `DB_SYNCHRONIZE=true` in .env.example -- can drop columns | `.env.example:16` |
| 4.3 | Swagger UI exposed in all environments | `main.ts:60-86` |
| 4.5 | No request body size limit (memory exhaustion) | `main.ts` |
| 5.1 | Weak default DB credentials in .env.example | `.env.example:13-14` |
| 5.2 | Docker Compose: root and user share same password | `docker-compose.yml:9-12` |
| 6.2 | User object parsed from localStorage without validation | `authSlice.ts:88-89` |
| 6.3 | No CSRF protection mechanism | N/A |
| 7.2 | Presidio images use `:latest` tag | `docker-compose.yml:23,32` |

## LOW

| # | Issue | File |
|---|-------|------|
| 2.1 | VerifyMagicLink DTO missing `@IsUUID()` | `verify-magic-link.dto.ts:9-11` |
| 2.4 | wizardState accepts `Record<string, any>` | `update-job.dto.ts:29` |
| 5.3 | MySQL port exposed to host | `docker-compose.yml:14` |
| 6.4 | Open redirect risk mitigated but fragile | `useAuth.ts:50` |
| 7.1 | No dependency auditing scripts | Both `package.json` |
