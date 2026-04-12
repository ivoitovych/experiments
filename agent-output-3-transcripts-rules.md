# Agent 3: Transcripts, Rules & Meeting Analysis (2026-04-12 Drop)

## 1. Git Rules Document Summary

The PDF establishes strict development rules:

**Branching:** Each PR from `develop` only. master/main for init + production only. Delete remote branches when done.

**PR Checklist:**
- Types for all parameters, no `any`, try/catch for errors
- No magic numbers, no hardcoded values, no commented code, no console.log
- camelCase, conventional commits, covered by tests
- Backend: Swagger docs, minimize DB requests, ConfigService (not process.env), UUIDs, @Index
- Frontend: logic in hooks (not components), colors/fonts in theme, i18n, absolute imports
- Screenshots required for visual changes

**Review Process:** 3 PRs must pass review or work redone. PR link to chat daily, tag Liudmyla.

## 2. Developer Rules Image

Three Git flow diagrams:
- General: master → develop → feature/fix branches, PRs only
- Hot Fixes: from master, merge back to develop
- 8-step project creation flow

## 3. Transcription Prompt

Template for CTO-level meeting analysis: Clean Transcript, Decisions, Action Items, Risks, Agile Analysis, System Design, Developer Growth, Uncertainties.

---

## 4. Full Meeting Chronology

### March 26 — Project Kickoff & Sprint Planning
- Tech stack confirmed: NestJS + TypeORM + MySQL / React 19 + Vite 7 + Tailwind + RTK
- Auth: Magic Link with JWT
- Mykola had built backend structure (User module, CRUD, DTO, JWT, Swagger, Docker)
- Oleksandr built frontend template
- **Ignat demonstrated working reference project** with auth, file upload, compliance checking
- Team voted: start with Wizard, not Landing
- First demo set for April 10, internal check April 8
- File upload: 5MB, PDF required

### March 27 — Sprint Planning (Deep Dive)
- **Custom framework officially removed** — 4 remain: HIPAA, UK DPA, Swiss FADP, GDPR
- Sprint: 2 weeks, 4h/day, 280h total, 20% risk buffer
- **Liudmyla communicated live**: simplify to 3 modules (Auth, File Upload, Presidio)
- Repository should start nearly empty (growth through commits)
- **Privacy:** sensitive data NOT in DB; localStorage only; only anonymized results to DB
- **Contact form sends to email, not DB**
- Sprint 1 scope changed 4 times; final: Contact Us + Auth flow; Wizard → Sprint 2
- Each developer is full-stack (owns FE + BE of their feature)

### March 30 — Daily Standup / Kickoff
- Team restructured: 7 devs → split to max 5
- Kanban: To Do → Doing → On Review → Blocked → Merged
- Liuda reviews PRs at 20:00-22:00
- **Mykola's backend template doesn't launch** — he's unresponsive
- Igor assigned to create clean backend from scratch
- MySQL: local Docker; Presidio: remote, don't connect yet

### March 31 — Team Sync
- **Team reduced to 4** — two moved to "Red" team
- Ignat: mobile adaptation approved
- **Routing:** Dashboard = `/app`, remove `/dashboard`
- **Mark: Magic Link email service working** (tested via Swagger). But Docker config deleted during cleanup.
- Mark's Docker config PR = Critical blocker
- Backend cleanup: lead removed premature modules

### April 1 — Daily + Planning
- **Luiza introduced as new junior PM**
- **Mark's PR has 42 files** — "unrealistic for one email"
- **Deploy on Heroku** (not AWS); Terraform too complex
- Presidio: Docker container, API by URL+port
- Dark theme for landing; light dashboard with dark sidebar
- Self-run dailies starting next day

### April 2 — Daily Standup
- Sasha demoed contact form with validation
- Oleksandr showed login page
- **Critical issues raised:**
  - Backend volunteer disappeared
  - Liudmyla not approving PRs (2-day delay)
  - Need acceptance criteria
- **PR discipline enforced:** 1 task = 1 commit = 1 PR
- Mark: email service refactored, `full_name` instead of `first_name/last_name`
- **Trello ToDo empty** — no new tasks until PRs approved
- Demo call moved to April 9

### April 3 — Sprint Planning / Sync
- Liudmyla gave extensive PR review feedback (code duplication, constants)
- Igor: frontend auth nearly complete
- **Ignat blocked:** Heroku 2FA issue with Liudmyla's account
- **Testing raised as critical:** "We have material but no tests"
- Ignat shared transcription tooling (OBS + PyTorch/CUDA)

### April 6 — Daily Standup
- Background waves: can be image (Liudmyla approved)
- File upload: TXT + PDF, 5MB limit confirmed
- **Sasha showed stepper (wizard)** — steps 1-2 working
- Natalia: step 3 design tonight, needs Liudmyla approval
- **Ignat's comprehensive project audit:**
  - **Critical blocker: unresolved API contract between FE and BE**
  - Contact form: FE sends Name/Email/Company/Message; BE expects different DTO — mismatch
  - Auth: FE has UI with mock; BE has email service but NO public endpoint for Magic Link
  - **Proposed Definition of Done:** UI + endpoint + integration + API docs + PR checklist + screenshots
  - Called for integration owner — nobody responsible for connecting branches
  - **Presidio flagged as infrastructure risk** — needs owner and deadline

### April 7 — Screen Recording
- **No transcript data** — all files empty. Recording exists but not transcribed.

### April 8 — Pre-Demo Sync
- Brief: color values, theme alignment with Figma
- **April 12/14 is first demo** (shifted from April 9)
- Everything needs to be deployed to server
- Plan: demonstrate landing, auth flow, email template on server
- Natalia's Figma designs nearly complete

---

## 5. Key Decisions Summary

| Decision | When |
|----------|------|
| NestJS + TypeORM + MySQL / React 19 + Vite 7 + RTK | Mar 26 |
| Magic Link auth (JWT, 1h expiry) | Mar 26-27 |
| Microsoft Presidio for PII | Mar 26-27 |
| Custom framework removed (4 remain) | Mar 27 |
| Sensitive data NOT in DB | Mar 27 |
| Deploy on Heroku (not AWS) | Apr 1 |
| 1 task = 1 commit = 1 PR | Apr 2 |
| Each dev is full-stack | Mar 27 |
| Dark landing, light dashboard | Apr 1 |
| File: PDF + TXT, 5MB | Mar 26, Apr 6 |

---

## 6. Team as of April 8

| Person | Role | Status |
|--------|------|--------|
| **Ignat** | De facto tech lead, FE/infra | Most proactive, audits, Heroku, transcription |
| **Oleksandr (Sasha)** | FE/fullstack lead | Contact form, stepper, auth, raises org issues |
| **Igor** | FE/BE dev | Auth UI + backend auth |
| **Mark** | BE dev (email) | Email service; frequently absent; PR quality issues |
| **Natalia** | Designer (Figma) | Sometimes has connectivity issues; wants design approved before devs proceed |
| **Luiza** | Junior PM (joined Apr 1) | Trello, ceremonies; still onboarding |
| ~~Mykola~~ | Backend (ghost) | Disappeared |
| **Liudmyla** | Mentor/CTO | Sole reviewer, single point of failure |

---

## 7. Blockers as of April 8

1. **API contract mismatch** — FE and BE endpoints/DTOs don't match
2. **No integration owner** — nobody connects FE to BE
3. **PR approval bottleneck** — Liudmyla sole reviewer, days of wait
4. **Zero tests** — flagged as critical before demo
5. **Presidio not started** — no owner, no deadline
6. **Heroku blocked** — 2FA issue
7. **Design instability** — changes mid-sprint
8. **No Definition of Done**

---

## 8. Deployment Status

**Nothing deployed to server as of April 8.** Everything local only. Heroku is target but blocked. Demo shifted to April 12/14.

---

## 9. State Summary

The team has working UI pieces (landing, auth, contact, stepper steps 1-2) and working backend services (email, auth). But **pieces were built in isolation without agreed API contracts**. Frontend and backend have never been connected. No server deployment, no tests.
