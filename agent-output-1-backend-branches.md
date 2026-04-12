# Agent 1: Backend Branches Analysis (2026-04-12 Drop)

## Branch Evolution Order (Oldest to Newest)

1. **feature-docker-setup** (earliest/baseline)
2. **fix-config-defaults-heroku-setup**
3. **fix-review-remove-hardcoded-defaults-and-comments**
4. **feature-serve-spa**
5. **ci-unified-build**
6. **feature-heroku-deploy**
7. **feature-repository-dispatch-trigger**
8. **ci-frontend-repo-vars**
9. **dev** (most advanced, integrates everything)

---

## Branch 1: `feature-docker-setup` (Earliest baseline)

**Modules:** ConfigModule, TypeOrmModule, ExampleModule

**Structure:** app.module.ts, main.ts, config/configuration.ts, database/data-source.ts, migrations, seeds, modules/example/

**What's new vs bare scaffold:**
- Multi-stage Dockerfile (node:20-alpine)
- docker-compose.yml with 4 services: `back` (NestJS), `mysql:8.0`, `presidio-analyzer`, `presidio-anonymizer`
- TypeORM with MySQL, InitialSchema migration (users, documents, synthetic_records, word_counts tables)
- Configuration via .env with error-string defaults (`'get host error'`)
- Swagger always enabled
- CORS: `origin: "*"` (wide open)
- ExampleModule: hello-world GET /api/example

---

## Branch 2: `fix-config-defaults-heroku-setup`

**Modules:** ConfigModule, TypeOrmModule only (ExampleModule REMOVED)

**Changes:**
- ExampleModule removed entirely
- configuration.ts rewritten with proper `toInt()` and `toBool()` helpers
- Added config sections for `auth`, `encryption`, `presidio`, `mail`
- main.ts: production env check for Swagger, CORS from config, proper error handling
- app.module.ts: Added `autoLoadEntities: true`
- heroku.yml added
- presidio/ directory with thin Dockerfiles
- docker-compose.yml: Removed deprecated `version: '3.8'`

---

## Branch 3: `fix-review-remove-hardcoded-defaults-and-comments`

**Changes from branch 2:**
- Hardcoded defaults REMOVED from configuration.ts
- `corsOrigin` defaults to `''`, `presidio` URLs default to `''`
- Review cleanup — everything comes strictly from env vars

---

## Branch 4: `feature-serve-spa`

**Modules:** ConfigModule, ServeStaticModule, TypeOrmModule, **AuthModule** (NEW)

**New files:**
- `modules/auth/auth.controller.ts`, `auth.module.ts`, `auth.service.ts`
- `modules/auth/dto/login-response.dto.ts`, `login.dto.ts`
- `modules/users/user.entity.ts`, `users.module.ts`, `users.service.ts`

**Changes:**
- **ServeStaticModule** serves React SPA from `frontend-dist/`
- **AuthModule**: `POST /api/auth/login` — takes email, upserts user, signs JWT, returns `{ user, accessToken }` directly (no magic link email yet)
- **UsersModule**: User entity (UUID PK, email unique), UsersService with `upsert()`
- Dockerfile copies `frontend-dist/` into production image
- `@nestjs/serve-static` added as dependency

---

## Branch 5: `ci-unified-build`

**Same modules as branch 4**

**New:** `.github/workflows/unified-build.yml`
- Checks out backend + frontend repos
- Builds frontend, copies dist to `frontend-dist/`
- Builds backend
- Triggers: push to `dev`, `workflow_dispatch`
- **No deploy job yet** — build only

---

## Branch 6: `feature-heroku-deploy`

**Modules:** ConfigModule, ServeStaticModule, TypeOrmModule, **MailerModule** (NEW), AuthModule

**New files:**
- `modules/email/email.module.ts`, `services/email-sender.service.ts`, `templates/magic-link.template.ts`
- `modules/auth/dto/contact-form.dto.ts`, `send-email.dto.ts`

**Changes:**
- **MailerModule** with SMTP transport (Gmail)
- **EmailModule**: `sendRawEmail()`, `sendMagicLink()`, `sendContactForm()`
- Magic link email template (branded HTML)
- Auth service still returns token directly (doesn't send email yet)
- unified-build.yml: Added **deploy job** — Heroku Container Registry push + release
- `@nestjs-modules/mailer` + `nodemailer` added

---

## Branch 7: `feature-repository-dispatch-trigger`

**Changes from branch 6:**
- unified-build.yml: Added `repository_dispatch` trigger (type `frontend-updated`)
- Frontend repo changed to `IhnatVelykoivan/orange_anonymization_fe`
- Cross-repo CI: frontend pushes trigger backend rebuild+redeploy

---

## Branch 8: `ci-frontend-repo-vars`

**New files:**
- `modules/email/email.controller.ts` — `POST /api/email/contact` endpoint
- `modules/email/dto/contact-form.dto.ts`

**Changes:**
- Frontend repo/branch in CI now use **repository variables** (configurable)
- `${{ vars.FRONTEND_REPO || 'ZenBit-Tech/orange_anonymization_fe' }}`

---

## Branch 9: `dev` (Most Advanced)

**Changes from branch 8:**
- **Auth service NOW SENDS magic link email** instead of returning token directly
- `auth.service.ts` injects `EmailSenderService`, calls `requestMagicLink(email, token)`
- Returns `{ message: 'Magic link sent' }` — completing the magic link flow
- `EmailSenderService` enhanced with `requestMagicLink()` method
- Configuration: strict validation — throws if CORS origin not set
- Same CI as branch 8

---

## Overall Backend Progress Summary

### New Modules (vs previous ExampleModule-only scaffold)
1. **AuthModule** — Magic link auth: email → upsert user → JWT → send magic link email
2. **UsersModule** — User entity (UUID, email), upsert service
3. **EmailModule** — Email sending + magic link template + contact form endpoint

### CI/CD Pipeline
- GitHub Actions "Unified Build": checkout BE+FE → build FE → inject SPA → build BE → deploy to Heroku
- Triggers: push to dev, workflow_dispatch, repository_dispatch (cross-repo)
- Parameterized frontend repo via GitHub variables

### Deployment: Heroku via Docker Container Registry

### Key Issues
- User entity only has `id` + `email` in code; migration defines many more columns (mismatch)
- Email service creates raw nodemailer transport alongside injected MailerService (redundant)
- Database migration defines tables (documents, synthetic_records, word_counts) with NO corresponding entities/modules
