# Review Fixes

Tracking fixes from M7 self-review (`code-review-notes.md`). Items marked **Done** were addressed during implementation; **Deferred** items are acceptable for assessment delivery but recommended before production.

## Fixes Applied

| ID | Finding | Fix | Verified |
|----|---------|-----|----------|
| RF-01 | Startup race — Vite called API before Express was ready (`ECONNREFUSED`) | Added `wait-on` to `npm run dev` so the client starts after the API health check | Manual: `npm run dev` loads `/tickets` without proxy errors |
| RF-02 | Inconsistent error messaging on failed API calls | Improved `src/client/services/http.ts` to surface API error bodies | Manual: invalid create shows server validation messages |
| RF-03 | Delete used `window.confirm` | Replaced with `ConfirmModal` component | Manual: delete flow shows modal on ticket detail |
| RF-04 | No loading feedback on ticket list | Added `TicketListSkeleton` during fetch | Manual: skeleton visible while list loads |
| RF-05 | No user feedback on create/update/delete | Added toast system (`ToastContext`, top-right) | Manual: success toasts after create/delete |
| RF-06 | Redundant search button | Removed; debounced search (400ms) updates URL params | Manual: typing in search filters list without button |
| RF-07 | Validation logic untested | Added `tests/validation.test.ts` — 46 unit tests, all passing | `npm run test` |
| RF-08 | Acceptance criteria undocumented as complete | Checked off `acceptance-criteria.md` and synced cursor-workflow copy | Doc review |
| RF-09 | M7 review findings undocumented | Completed `code-review-notes.md` | Doc review |

## Outstanding Items

| ID | Priority | Item | Source | Suggested approach | Status |
|----|----------|------|--------|------------------|--------|
| RF-10 | P2 | API integration tests (CRUD, filters, pagination, status transitions) | Medium — no integration tests | Supertest + test PostgreSQL database; spin up Express app without listening | Deferred |
| RF-11 | P2 | E2E smoke tests (create → list → edit → delete) | Medium — no E2E tests | Playwright against `npm run dev` or preview build | Deferred |
| RF-12 | P3 | CI pipeline (`npm test`, `npm run build`) | Recommendations #3 | GitHub Actions workflow on push/PR | Deferred |
| RF-13 | P3 | Harden `parseListQuery` for non-finite `page`/`limit` | Low — `NaN` from `parseInt` | Use `Number.isFinite` after `parseInt`; omit invalid values or return 400 early | Deferred |
| RF-14 | P3 | UUID validation on `:id` route param | Low — no UUID validation | Small middleware: reject malformed IDs with 400 before Prisma | Deferred |
| RF-15 | P4 | Reduce duplicate DB lookups on update/delete | Low — extra `findUnique` | Catch Prisma `P2025` on `update`/`delete`; keep `findUnique` only where status transition check needs current row | Deferred |
| RF-16 | P4 | Centralize `StatusTransitionError` in error middleware | Informational | Extend `errorHandler` to map domain errors to 400 responses | Deferred |
| RF-17 | — | Client-side pre-submit validation in `TicketForm` | Low — advisory only | Optional: block submit when title/description fail limits before API call | Won't fix (server enforces; acceptable) |
| RF-18 | — | Auth and rate limiting | Informational — out of scope | Document in deployment README if exposing publicly | Won't fix (out of scope) |

### Notes on deferrals

- **RF-10 / RF-11** are the highest-value follow-ups for confidence beyond unit tests.
- **RF-12** should be added once integration or E2E tests exist so CI has meaningful coverage.
- **RF-13–RF-16** are polish/hardening; current behavior is correct for the assessment scope.

## Verification

When an outstanding item is implemented:

1. Update its **Status** column above (`Deferred` → `Done` or `Won't fix`).
2. Move the row to **Fixes Applied** with a short description of the change and how it was verified.
3. Re-run relevant checks and record in `test-results.md` if new tests were added.

**Current baseline (no outstanding fixes applied):**

```bash
npm run test          # 46 passed
npm run dev           # client :5173, API :3001
```

**Target verification when P2 items are done:**

```bash
npm run test          # unit + integration
npm run test:e2e      # Playwright (to be added)
npm run build         # production build succeeds
```
