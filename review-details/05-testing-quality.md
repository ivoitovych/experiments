# Test Suite Review

## Coverage

| Area | Covered | Total | % |
|------|:---:|:---:|:---:|
| Backend services | 5 | 7 | 71% |
| Backend controllers | 0 | 6 | 0% |
| Backend guards | 0 | 1 | 0% |
| Frontend pages | 4 | ~9 | 44% |
| Frontend slices | 3 | 5 | 60% |
| Frontend services | 1 | 5 | 20% |

## Strengths
- `auth.service.spec.ts`: Excellent -- UUID validation, token uniqueness, expiry timing, one-time-use clearing
- `jobs.service.spec.ts`: Good state machine testing with `statusLog` array
- `Results.test.tsx`: 27 tests covering entity toggling, clipboard, PDF export, edge cases
- `api.test.ts`: Proper axios-mock-adapter for interceptor testing
- `makeTestStore`: Real reducers, type-safe, fresh store per call

## Critical Gaps
1. **Zero controller tests** -- HTTP layer (guards, pipes, DTOs, status codes) completely untested
2. **No auth guard tests**
3. **dashboard.service.ts** and **synthetic-data.service.ts** -- no tests at all
4. **de-identification.service.ts** -- only `uploadFile()` tested
5. **All frontend services** -- always mocked, never tested directly

## Medium Gaps
- Pages untested: Dashboard, SyntheticData, Landing, About, Contact
- Slices untested: syntheticDataSlice, dashboardSlice
- DeIdentify Steps 0-2 untested (only Step 3)
- Auth LoginView untested (only VerifyView)
- `useAuth` hook always mocked

## Quality Issues
- Weak dispatch assertions (`toHaveBeenCalled()` without verifying action type/payload)
- `Results.test.tsx` mutates `navigator.clipboard` and `document.createElement` without cleanup
- "sync scroll" test just checks elements exist, not actual scroll behavior
- Inconsistent error assertion patterns (`try/catch + fail()` vs `rejects.toThrow()`)

## Smoke Test
- Good e2e flow coverage but SQL string interpolation, hardcoded DB password, not CI-ready
