# Testing Prompts

## Session Overview

Testing strategy was defined during M0 planning. Unit tests for validation logic were implemented during M2–M4. Integration, E2E, and CI testing are planned for M6 but not yet executed.

---

## Prompt 1: Test Strategy Definition (Planning Phase)

### Prompt Summary
Define testing requirements as part of the initial project planning — specify approach for unit, integration, and E2E testing before implementation.

### Project Context
- **Phase:** M0 — Planning
- `test-strategy.md` scaffold created

### AI Response Summary
Recommended Vitest for unit tests (validation utilities, services), Supertest for API + database integration tests, Playwright for optional E2E critical flows. Defined `test-results.md` as the results log artifact.

### What Was Accepted
- Vitest as primary unit test runner
- Supertest for API integration (planned)
- Playwright for E2E (optional for MVP)
- Test results documented in `test-results.md`

### What Was Modified
- N/A

### What Was Rejected
- Jest (Vitest preferred for Vite ecosystem alignment)

### Reasoning Behind the Decision
Vitest integrates cleanly with the Vite + TypeScript toolchain. Layered testing pyramid matches assessment non-functional requirement for documented test strategy.

### Validation or Outcome
`test-strategy.md` scaffolded with section headings. Strategy referenced in `README.md` and `implementation-plan.md` M6 milestone.

---

## Prompt 2: Validation Unit Tests (M2–M4 Implementation)

### Prompt Summary
Add meaningful test coverage as part of ticket management implementation.

### Project Context
- **Phase:** M2–M4
- Validation and status transition logic in `src/shared/validation.ts`

### AI Response Summary
Created `tests/validation.test.ts` covering `validateCreateTicketInput`, `validateUpdateTicketInput`, and `isValidStatusTransition`. Added `vitest` dev dependency, `vitest.config.ts`, and `npm run test` script.

### What Was Accepted
- Unit tests for shared validation module
- Tests for valid input, empty title, short description, invalid status, and transition rules

### What Was Modified
- N/A

### What Was Rejected
- Trivial tests that only assert obvious behavior

### Reasoning Behind the Decision
Validation logic is shared between API and UI layers; unit tests provide fast feedback on business rules without requiring a running database.

### Validation or Outcome
Test file created. Execution pending on user's Node 20+ environment (`npm run test` not yet confirmed locally).

---

## Not Yet Performed

The following testing activities are planned for **M6** and will be updated in future milestones:

- API integration tests (Supertest + test database)
- End-to-end tests (Playwright: create → list → view → edit ticket flow)
- CI pipeline integration
- Coverage report logged in `test-results.md`

---

## Follow-Up Actions

- [ ] Run `npm run test` after Node 20+ setup and record results in `test-results.md`
- [ ] Add Supertest integration tests for `/api/tickets` endpoints
- [ ] Add Playwright E2E for critical user flows
- [ ] Define coverage goals in `test-strategy.md` once baseline is established
