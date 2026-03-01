# Investigation & Correction Plan

Based on two independent code reviews of the AutoRia Clone project, this document
catalogues every confirmed issue, its root cause, and the exact correction applied.

---

## P0 — Critical Issues

### P0.1 — Listing PATCH/DELETE accessible to non-owners (Security)

**Reported:** Any authenticated user can edit or delete any other user's listing.

**Investigation:**
- `apps/listings/views.py` `get_permissions()` returns only `[IsAuthenticated()]`
  for both `partial_update` and `destroy` actions.
- `core/permissions.py` already defines `IsOwnerOrReadOnly` that checks
  `obj.seller == request.user`, but it is **never imported or used** in listings.
- `get_queryset()` returns all active listings for any authenticated user, so
  the object lookup succeeds for any listing id.

**Root cause:** Missing object-level ownership permission on write actions.

**Fix:**
1. Import `IsOwnerOrReadOnly` in `apps/listings/views.py`.
2. In `get_permissions()`, add `IsOwnerOrReadOnly()` to `partial_update` and
   `destroy` permission lists alongside `IsAuthenticated()`.
3. For manager/admin, the `deactivate`/`activate` actions already have separate
   permission classes, so no change needed there.

---

### P0.2 — Profanity detector format / loader

**Reported:** `profanity/words.txt` might be one giant line, making the loader
read a single "word" that never matches.

**Investigation:**
- `profanity/words.txt` actually has **15 words, one per line**. Format is correct.
- The loader in `apps/listings/validators.py` uses `f.readlines()` + `strip()` +
  `lower()` — this correctly reads one word per line.
- Tests in `apps/listings/tests.py` exercise `check_profanity()` with known words.

**Conclusion:** This issue was **not confirmed** in the current codebase. The words
file is properly formatted (one word per line), and the loader handles it correctly.
No code change needed, but we add a defensive `.split()` fallback to protect against
future edits that might introduce space-separated words on a single line.

---

### P0.3 — BrandRequest approve does not create CarBrand/CarModel

**Reported:** When admin sets a BrandRequest status to `approved`, no CarBrand or
CarModel records are created.

**Investigation:**
- `BrandRequestViewSet` has no `perform_update()` override.
- `BrandRequestUpdateSerializer` only exposes `status` and `admin_comment` fields.
- The `brand_name` and `model_name` from the request are stored but never acted on.

**Root cause:** Missing post-approval side-effect logic.

**Fix:**
1. Override `perform_update()` in `BrandRequestViewSet`.
2. When `status` transitions to `'approved'`, use `get_or_create` for both
   `CarBrand` and `CarModel`.
3. Invalidate the brands/models cache so new entries appear immediately.

---

### P0.4 — Currency rates not bootstrapped; no daily schedule

**Reported:** On first run, currency rates may be empty (all listing prices NULL).
No `PeriodicTask` is created for Celery Beat's `DatabaseScheduler`.

**Investigation:**
- `configs/settings.py` sets `CELERY_BEAT_SCHEDULER = 'django_celery_beat.schedulers:DatabaseScheduler'`
  but there is no `CELERY_BEAT_SCHEDULE` dict and no code that creates a
  `PeriodicTask` entry.
- The `seed_data` management command does **not** fetch initial rates.
- The `fetch_currency_rates` shared task exists but is never scheduled.

**Root cause:** Missing initial data load + missing schedule registration.

**Fix:**
1. In `seed_data` command, call `fetch_privatbank_rates()` synchronously after
   seeding base data.
2. In `seed_data` command, create an `IntervalSchedule` + `PeriodicTask` for
   `apps.currency.tasks.fetch_currency_rates` to run every 24 hours.

---

### P0.5 — 3-attempt profanity lock can be bypassed

**Reported:** After a listing becomes `inactive` (3 failed edits), a subsequent
edit can reset `edit_attempts = 0` and change status back to `needs_edit`.

**Investigation:**
- In `apps/listings/views.py` `partial_update()`, the guard checks
  `listing.status == 'needs_edit' and listing.edit_attempts >= 3` — this does
  NOT catch `status == 'inactive'`.
- In `apps/listings/services.py` `process_listing_edit()`, the branch
  `if listing.status != 'needs_edit'` is entered for inactive listings, and if
  profanity is detected, sets `status = 'needs_edit'` and `edit_attempts = 0`,
  effectively resetting the counter.

**Root cause:** Guard in the view doesn't block edits on `inactive` listings.
Service layer doesn't refuse edits on `inactive` listings.

**Fix:**
1. In the view's `partial_update()`, reject edits when `listing.status == 'inactive'`.
2. In `process_listing_edit()`, return `None` early if `listing.status == 'inactive'`.

---

## P1 — Quality Improvements

### P1.1 — No validation that car_model belongs to car_brand

**Investigation:**
- `ListingCreateSerializer` has no `validate()` method at all.
- A user can submit `car_brand=BMW` with `car_model=Camry` (Toyota) and it saves.

**Fix:** Add a `validate()` method to `ListingCreateSerializer` that checks
`car_model.brand_id == car_brand.id`.

---

### P1.2 — Brand/model list cache not invalidated after changes

**Investigation:**
- `CarBrandViewSet.list` and `CarModelViewSet.list` are decorated with
  `@cache_page(86400)` (24h).
- No cache invalidation on create/update/delete of brands or models.

**Fix:** Add `cache.delete()` calls in `perform_create`, `perform_update`, and
`perform_destroy` for both brand and model viewsets. Use known cache key patterns.

---

### P1.3 — `seed_data 2>/dev/null` suppresses errors in Docker

**Investigation:**
- `docker-compose.yml` runs `python manage.py seed_data 2>/dev/null`.
- All errors during seeding are silently swallowed.

**Fix:** Remove `2>/dev/null` from the command. Use `|| true` instead if the
intent is to not block gunicorn startup on seed failure.

---

## Execution Order

1. P0.1 — Listing permissions (security-critical, simple change)
2. P0.5 — Lock profanity flow (closely related to listings)
3. P0.3 — BrandRequest approve logic
4. P0.4 — Currency bootstrap + schedule
5. P0.2 — Profanity loader hardening
6. P1.1 — car_model/car_brand validation
7. P1.2 — Cache invalidation
8. P1.3 — Docker stderr fix
9. Run full test suite, fix any regressions
10. Commit & push

---

## Verification

All 8 fixes applied. Full test suite (35 tests) passes with no regressions.

### Files Modified

| File | Changes |
|------|---------|
| `apps/listings/views.py` | P0.1: Added `IsOwnerOrReadOnly` to PATCH/DELETE permissions. P0.5: Block edits on inactive listings. |
| `apps/listings/services.py` | P0.5: Return `None` early for inactive listings in `process_listing_edit()`. |
| `apps/listings/validators.py` | P0.2: Hardened loader to handle both line-separated and space-separated word formats. |
| `apps/listings/serializers.py` | P1.1: Added `validate()` to `ListingCreateSerializer` checking car_model belongs to car_brand. |
| `apps/cars/views.py` | P0.3: Added `perform_update()` to create CarBrand/CarModel on approve. P1.2: Added cache invalidation on all mutating operations. |
| `apps/roles/management/commands/seed_data.py` | P0.4: Added initial currency rate fetch + Celery Beat `PeriodicTask` creation. |
| `docker-compose.yml` | P1.3: Replaced `2>/dev/null` with `\|\| true` for seed_data. |
