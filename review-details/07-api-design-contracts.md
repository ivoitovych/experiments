# API Design & Frontend-Backend Contract Review

## Critical
1. **Frontend API base URL missing `/api` prefix** -- all service calls 404 without env override

## High
1. **IDOR on documents** -- no ownership check on `GET /documents/:id`
2. **No role guards on users controller** -- privilege escalation
3. **Missing `GET /synthetic-data` endpoint** -- frontend expects it but doesn't exist

## Medium
1. Duplicate `/me` endpoints (`GET /auth/me` and `GET /users/me`)
2. No pagination on jobs listing
3. No pagination on users listing
4. Frontend Document type includes fields backend excludes from list response
5. Frontend User type missing `isActive`, `updatedAt` from backend
6. `ApiResponse<T>` type defined but never used by backend
7. No API versioning (`/api` not `/api/v1`)

## Low
1. Missing `ParseUUIDPipe` on document and user ID params
2. `getDocument` returns null (200) instead of 404
3. Swagger response schemas incomplete
4. HTTP status code inconsistencies (Post returns 201 but docs say 200)
5. Upload endpoint missing user context for audit
6. Error response shape mismatch (backend has extra fields)
