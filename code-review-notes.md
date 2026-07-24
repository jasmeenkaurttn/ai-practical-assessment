# Code Review Notes

## Review Summary

Self-review of the Support Ticket Management System after M2–M4 implementation and UX polish. Scope: REST API, shared validation, Prisma data layer, and React UI.

**Overall:** The codebase is well-structured for a small full-stack app. Shared validation between client and server is a strong choice. Main gaps are test coverage beyond unit tests, a few edge-case hardening items, and minor duplication in controller error responses.

**Verdict:** Acceptable for assessment delivery. Recommended follow-ups are non-blocking and documented below.

## Findings

### Strengths

| Area | Notes |
|------|-------|
| **Layered architecture** | Routes → controllers → services → Prisma keeps concerns separated and is easy to navigate. |
| **Shared validation** | `src/shared/validation.ts` is used by API and mirrored in the UI (`TicketForm`, character counters). Reduces drift between client and server rules. |
| **Status workflow** | Transition rules live in one place; `StatusTransitionError` gives clear API feedback. Edit form restricts status options via `allowedStatuses`. |
| **Consistent API errors** | 400/404/500 responses use `{ error: { message, statusCode, details? } }` shape throughout controllers. |
| **List UX** | URL-driven filters/search/pagination, debounced search (400ms), skeleton loading, empty state with CTA, and confirmation modal for delete. |
| **Type safety** | Shared types in `src/shared/types.ts`; Prisma enums align with `TICKET_STATUSES` / `TICKET_PRIORITIES`. |

### Issues & Observations

#### Medium — No integration or E2E tests

Only `tests/validation.test.ts` (46 unit tests) exists. API routes, Prisma queries, and UI flows are untested automatically. Acceptable for current milestone; risky for production without Supertest + test DB or Playwright.

#### Low — `parseListQuery` accepts `NaN` for page/limit

`parseInt` on invalid strings yields `NaN`, which fails `validateTicketListQuery` only when the value is present. Malformed `?page=abc` is rejected; behavior is correct but could use explicit `Number.isFinite` in the parser for clarity.

#### Low — Duplicate 404 lookups on update/delete

`updateTicket` and `deleteTicket` each call `findUnique` before mutating. Correct for transition checks, but adds an extra round trip. Could use `update`/`delete` try/catch on Prisma `P2025` for not-found in a future refactor.

#### Low — No UUID validation on `:id` param

Invalid IDs hit the database and return 404. Harmless; optional improvement is validating UUID format before Prisma calls.

#### Low — Client-side validation is advisory only

`TicketForm` relies on API errors for enforcement (appropriate). Title/description limits are shown in UI but not blocked on submit client-side before the request—server still validates.

#### Informational — No auth or rate limiting

Out of scope per requirements. All endpoints are public; document if deploying beyond local demo.

#### Informational — `StatusTransitionError` handled in controller, not middleware

`patchTicket` catches `StatusTransitionError` inline while other errors go to `errorHandler`. Works today; centralizing domain errors in middleware would scale better.

## Recommendations

1. **Add API integration tests** — Supertest against Express app with a test database; cover CRUD, filters, pagination, and invalid transitions.
2. **Add E2E smoke tests** — Playwright: create ticket → list → edit status → delete.
3. **CI pipeline** — GitHub Actions: `npm test`, `npm run build`, optional lint.
4. **Harden list query parsing** — Reject non-finite `page`/`limit` in `parseListQuery` before validation.
5. **Optional** — Validate ticket ID format in a small middleware to fail fast on malformed params.

## Action Items

| Priority | Item | Status |
|----------|------|--------|
| P1 | Unit tests for validation (46 tests) | Done |
| P2 | Integration tests for ticket API | Deferred |
| P2 | E2E tests for core UI flows | Deferred |
| P3 | CI workflow (`npm test` + build) | Deferred |
| P3 | UUID param validation middleware | Deferred |
| — | M7 self-review documented | Done |
