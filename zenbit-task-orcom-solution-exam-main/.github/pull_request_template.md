## Summary

<!--
Describe what this PR does in 2-3 sentences.
Closes #<ticket>
-->

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Refactor
- [ ] Documentation update
- [ ] Dependency update

## Changes Made

<!--
- Added X to Y
- Updated Z to support W
-->

---

## PII / PHI Considerations

Does this PR touch code that processes, stores, or transmits patient data?

- [ ] This PR does not handle PHI/PII
- [ ] This PR handles PHI/PII — safeguards described below:

<!--
Describe safeguards: input validation, no logging of PHI, Presidio pipeline used, etc.
-->

---

## General Checklist

- [ ] Assigned myself + appropriate labels + reviewers
- [ ] Self-reviewed the diff
- [ ] No `any` in TypeScript (enforced by ESLint + strict mode)
- [ ] No `console.log` left in code
- [ ] No commented-out code
- [ ] No magic numbers — values are in constants
- [ ] No hardcoded strings (env vars in `.env`, config in constants)
- [ ] `.env` is in `.gitignore`; `.env.example` updated if new vars added
- [ ] Imports ordered: `node_modules` → absolute (`@/`) → relative
- [ ] camelCase for variables and functions
- [ ] Date/time formats defined in constants, not inline
- [ ] No nested ternary operators
- [ ] Try/catch used in all async functions that can throw
- [ ] Functions/methods are `public` only if used outside the class
- [ ] Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

---

## Frontend Checklist

- [ ] Business logic extracted to custom hook (no logic inline in JSX)
- [ ] All user-facing strings in `locales/en/translation.json` (no hardcoded text)
- [ ] No inline styles — colors, fonts, spacing come from MUI theme / constants
- [ ] Absolute imports used (`@/components/...` not `../../../components/...`)
- [ ] Screenshot attached below if there are visual changes
- [ ] Components covered by tests

---

## Backend Checklist

- [ ] Swagger `@ApiOperation` + `@ApiResponse` (2xx, 4xx, 5xx) on every endpoint
- [ ] `ConfigService` used instead of `process.env` directly
- [ ] UUID primary keys on new entities
- [ ] `@Index` added to columns used in `WHERE` / `JOIN` clauses
- [ ] Database mutations across multiple tables wrapped in a transaction
- [ ] DTOs have `class-validator` decorators; `forbidNonWhitelisted: true` respected
- [ ] NestJS ESLint rules respected (`.eslintrc.js`)
- [ ] REST API naming convention followed (`GET /resources`, `POST /resources`, etc.)
- [ ] Unit tests added / updated (`npm test`)

---

## Testing

- [ ] Unit tests pass: `npm test` (backend) / `npm test` (frontend)
- [ ] Smoke tests pass against running server: `npm run test:smoke`
- [ ] Manual testing performed

**Manual test steps:**
1.
2.
3.

---

## Screenshots / Recordings

<!-- Attach if there are visual changes -->
