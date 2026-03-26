# Frontend UX Patterns Review

## Accessibility (HIGH)
1. **Entity chips lack ARIA labels** -- `DeIdentify.tsx`, `HipaaConfig.tsx`, `RiskSliderConfig.tsx`
2. **File upload drop zone not keyboard-accessible** -- no `role`, `tabIndex`, `onKeyDown`

## Accessibility (MEDIUM)
1. Sliders lack `aria-label`/`aria-labelledby`
2. Dashboard table rows clickable but not keyboard-accessible

## User Flow (MEDIUM)
1. No validation feedback for 50-char minimum on step 1 (button silently disabled)
2. Step 2 allows proceeding with zero entities on Custom framework
3. `handleRunAnalysis` swallows errors silently
4. ErrorBoundary exists but not used in route tree

## Responsive (MEDIUM)
1. Stepper labels overflow on small screens -- no MobileStepper alternative

## i18n (MEDIUM)
1. Duplicate key `strategiesApplied` in translation.json
2. Hardcoded English: FileUpload headers, Results errors, PDF text, About stats

## Performance (MEDIUM)
1. `buildHighlightedText` not memoized -- rebuilds DOM tree on every render
2. Entity toggle re-renders entire Results page

## Reuse (MEDIUM)
1. Duplicated text panel styles across Results and DocumentDetailDialog
2. Duplicated contact form in ContactSection and Contact pages

## Positives
- Consistent loading states (skeletons, progress bars, spinners)
- Good responsive design (Drawer modes, breakpoints, responsive padding)
- Well-structured route architecture with lazy loading
- Consistent form pattern (react-hook-form + Yup + yupResolver)
- Mobile hamburger menus have proper ARIA labels
