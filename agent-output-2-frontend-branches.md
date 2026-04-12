# Agent 2: Frontend Branches Analysis (2026-04-12 Drop)

## Branch Maturity Order (least to most mature)

1. **feature-app-layout** — Base layout shell (desktop only)
2. **feature-mobile-layout** — Responsive layout system
3. **feature-dashboard-route** — Route path fix
4. **feature-landing-page** — Complete landing with NetworkWave
5. **feature-same-origin-api-base** — API fallback + auth form + contact
6. **feat-ci-notify-backend-deploy** — CI/CD workflow
7. **develop (2)** — Most complete (TokenPage, LogoutPopup, ProtectedRoute fix)

---

## Branch 1: `feature-app-layout` (Earliest)

- Base desktop-only layout: Sidebar + Header + MainLayout
- No Landing, no Contact, no TokenPage
- ProtectedRoute: STUB (`<Outlet />` only)
- No auth services, no SVGR, no CI
- ROUTES.DASHBOARD = `/app/dashboard` (later changed to `/app`)

---

## Branch 2: `feature-mobile-layout`

- Added `useMainLayout` hook with `useMediaQuery` for isMobile
- Sidebar: MUI Drawer (temporary) on mobile, fixed Box on desktop
- Header: hamburger menu on mobile, hides subtitle/email
- MainLayout: responsive padding

---

## Branch 3: `feature-dashboard-route`

- `ROUTES.DASHBOARD` changed from `/app/dashboard` to `/app`
- Has mobile layout merged
- ProtectedRoute still STUB

---

## Branch 4: `feature-landing-page`

- Full Landing page: HeroSection, StatsSection, FeaturesSection, ComplianceSection, CtaSection, FaqSection, LandingFooter, LandingNav
- `useLanding` hook for FAQ + scroll
- `NetworkWave` procedural SVG generator (272 lines)
- ProtectedRoute still STUB, no auth services

---

## Branch 5: `feature-same-origin-api-base`

- **Critical change:** `API_BASE_URL` falls back to `'/api'` for same-origin deployment
- Has: full Landing + LandingLayout + LandingHeader, Contact page, Auth page with full form
- Auth API services (login, verify), emailService
- `vite-plugin-svgr` added
- `LandingSectionDecoration` replaces NetworkWave
- ProtectedRoute still STUB

---

## Branch 6: `feat-ci-notify-backend-deploy`

- `.github/workflows/notify-backend.yml` — triggers backend redeploy on push to develop
- Nearly matches develop but missing TokenPage and LogoutPopup
- ProtectedRoute checks localStorage token (partially fixed)

---

## Branch 7: `develop (2)` — MOST ADVANCED

### New files since 2026-04-04 snapshot

- `pages/Auth/` — full rewrite: constants.ts, schema.ts, styled.ts, useAuthForm.ts
- `pages/Contact/` — new contact page with form
- `pages/TokenPage/` — magic link token verification handler
- `pages/Landing/sections/LandingHeader.tsx` — persistent AppBar
- `components/layouts/LandingLayout.tsx` — layout wrapper
- `components/LandingSectionDecoration.tsx` — static SVG (replaced NetworkWave)
- `components/business/contact/ContactForm.tsx` — Yup validated form
- `components/business/contact/SubmittedState.tsx` — success state
- `components/popups/BasePopup.tsx` — framer-motion animated modal
- `components/popups/LogoutPopup.tsx` — logout confirmation
- `services/auth/auth.api.ts` — login + verify endpoints
- `services/emailService.ts` — contact form email
- `.github/workflows/notify-backend.yml` — CI/CD

### Key changes from 2026-04-04

| Area | Before (Apr 4) | Now (Apr 12) |
|------|----------------|--------------|
| ProtectedRoute | Stub — just `<Outlet />` | FIXED — checks localStorage token, redirects to login |
| Auth page | `<h1>Auth</h1>` stub | Full magic-link login form with validation, i18n, styled |
| API_BASE_URL | Could be undefined | Falls back to `'/api'` |
| Routes | 4 routes | 7 routes (added LANDING, CONTACT, TOKEN) |
| Landing | Inline nav/footer, NetworkWave | LandingLayout + LandingHeader, static SVG decoration |
| Contact | Did not exist | Full validated form with submitted state |
| TokenPage | Did not exist | Handles magic link callback, stores token, redirects |
| Logout | Direct signOut | Confirmation popup (BasePopup + LogoutPopup) |
| CI/CD | None | notify-backend.yml triggers backend redeploy |

### Still MISSING

- **Redux store is EMPTY** — `reducer: {}`, no slices
- **Zero tests** — no test files, no testing framework configured
- **Dashboard, DeIdentify, SyntheticData** — placeholder stubs only
- **No Processing or Results pages**
- **No components**: FileUpload, HipaaConfig, RiskSliderConfig, StrategySelect, LoadingSpinner, DocumentDetailDialog, ErrorBoundary
- **User email hardcoded**: `'demo@clinic.com'` in MainLayout
- **TokenPage doesn't call verify()** — just stores URL param token blindly
- **No domain types** (User, Job, Document) — only generic API types

### Overall Frontend Progress: ~25% (up from ~15% on April 4)
