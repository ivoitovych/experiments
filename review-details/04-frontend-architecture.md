# Frontend Architecture & Code Quality Review

## Critical
- **`Results.tsx`** -- 723 lines. God component containing highlighting logic, scroll sync, clipboard, PDF generation (2 functions), audit trail, entity toggles, data fetching. Needs decomposition.

## Major
- `App.tsx:21` -- `store.dispatch(loadFromStorage())` at module evaluation time. Side effect at import, untestable.
- `deIdentificationSlice.ts:82` -- `as unknown as string[]` cast appears 6 times. Type-safety escape hatch.
- `jobsSlice.ts` -- Thunks don't use `rejectWithValue` unlike all other slices. Inconsistent error handling.
- `StrategySelect.tsx:21` -- JSDoc declares `disabled` prop but it's absent from Props interface. Broken contract.
- `Processing.tsx:105-110` -- `handleRetry` starts new intervals without clearing old ones.
- `DeIdentify.tsx:270-303` -- Entity picker duplicated with `HipaaConfig.tsx:109-127`.
- `Dashboard.tsx:182,198,217` -- Hardcoded route strings instead of `ROUTES` constants.
- `api.ts:17` -- Circular dependency: `api.ts` -> `jobsSlice` -> `jobsService` -> `api.ts`.
- `api.ts:65-100` -- `isHandling401` flag never reset after redirect. Subsequent 401s swallowed.

## Minor
- `authSlice.ts:89` -- `JSON.parse(userRaw)` without try/catch. Malformed localStorage crashes app.
- `dashboardSlice.ts:59` -- `lastFetchedAt` set but never read. Dead state.
- `DocumentDetailDialog.tsx:37-48` -- Direct service call instead of Redux thunk. Inconsistent.
- `FileUpload.tsx:41-42` -- Selects entire slice, unnecessary re-renders.
- `Results.tsx:198-216` -- Nested `.then()` chains instead of async/await.
- `SyntheticData.tsx:66-68` -- Form values drift from Redux after navigation.
- `deIdentificationService.ts:90` -- `Content-Type: undefined` trick is fragile.
- Hardcoded colors in Dashboard, Results, HeroSection instead of theme tokens.
- `theme.ts:163` -- `AppTheme` type exported but never used.
- `constants/index.ts:9` -- `API_BASE_URL` absolute URL bypasses Vite proxy.
- `constants/index.ts:59` -- `AnonymizationStrategy` duplicate with `types/index.ts:49`.
- `types/index.ts:94` -- `wizardState: Record<string, any>` type-safety hole.

## Code Smells
- Duplicated contact form logic in `ContactSection.tsx` and `Contact.tsx`
- `AboutSection.tsx` exported but never imported/rendered
- `buildHighlightedText` not memoized -- rebuilds DOM tree on every render
- `ErrorBoundary` exists but never used in route tree
- `fetchDocuments.pending/rejected` don't set loading/error state
