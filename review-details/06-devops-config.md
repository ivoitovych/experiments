# DevOps & Configuration Review

## Critical
1. **No CI/CD pipeline** -- no GitHub Actions, no automated testing/linting/security scanning
2. **No Dockerfiles** for backend or frontend -- cannot deploy to containers

## High
1. **DB port mismatch** -- `.env.example:11` says 3306, `docker-compose.yml:14` maps to 3307
2. **ENCRYPTION_KEY placeholder is 17 chars** -- documented as "16 chars (AES-128)"
3. **Presidio images use `:latest`** -- non-reproducible builds
4. **Migration ENUM mismatch** -- `framework` column missing `uk_dpi`, `swiss_fadp`
5. **Missing `helmet` and `@nestjs/throttler`** dependencies
6. **Backend path alias `@/*` not resolved after `nest build`** -- production crash
7. **JWT_SECRET has functional placeholder** -- app runs with known insecure secret
8. **No automated security scanning** -- no npm audit, no Dependabot
9. **No health check endpoint** for load balancers/K8s

## Medium
1. No Presidio health checks in docker-compose
2. No container resource limits
3. MySQL root/user same password
4. `DB_SYNCHRONIZE=true` default
5. No pre-commit hooks (lint-staged/husky)
6. No `engines` field in package.json
7. Missing `test:cov` script (README references it)
8. No monorepo workspace config
9. No error tracking/APM
10. `ZEROFILL` deprecated in MySQL 8.0.17+

## Low
1. `version: '3.8'` deprecated in Compose V2
2. No dedicated Docker network
3. ESLint 8 end-of-life
4. `synthetic_records` no FK constraint
5. Migration `down()` missing `IF EXISTS`
6. No troubleshooting in README

## Positives
- Excellent README with architecture diagrams
- Idempotent seed script
- Proper .gitignore
- Consistent Prettier configs
