# Code Review Prompts

## Session Overview

M7 self-review was performed after M2–M4 implementation and UX polish. AI assisted in reviewing the ticket API, shared validation, Prisma service layer, and React UI patterns. Findings were logged in `code-review-notes.md` and tracked in `review-fixes.md`.

---

## Prompt 1: M7 Self-Review and Documentation

### Prompt Summary
Complete M7 code review: document strengths, issues, and recommendations in `code-review-notes.md`. Track applied fixes and deferred items in `review-fixes.md`.

### Project Context
- **Phase:** M7 — Hardening
- Full ticket CRUD, UX polish, and 46 validation unit tests in place
- No formal Bugbot or external reviewer used

### AI Response Summary
Conducted structured self-review across API controllers, `ticketService`, shared validation, and React pages/components. Identified strengths (layered architecture, shared validation, status workflow, consistent error shape, list UX). Logged deferred items: integration/E2E tests, CI, query parsing hardening, UUID middleware. Populated `review-fixes.md` with RF-01–RF-18 tracking table (9 applied, 7 deferred, 2 won't fix).

### What Was Accepted
- Self-review format with strengths, findings by severity, recommendations, and action items table
- Deferred items explicitly marked acceptable for assessment delivery
- Cross-reference between `code-review-notes.md` and `review-fixes.md`

### What Was Modified
- N/A

### What Was Rejected
- Treating missing integration/E2E tests as blocking for M8 delivery

### Reasoning Behind the Decision
Assessment scope is met with working CRUD, unit tests, and local verification. Deferred items are documented for transparency without blocking delivery.

### Validation or Outcome
`code-review-notes.md` and `review-fixes.md` committed. Verdict: acceptable for assessment delivery.

---

## Follow-Up Actions

- [ ] Run Bugbot or external review if assessor requests formal third-party review
- [ ] Implement RF-10 (integration tests) and RF-11 (E2E) when extending beyond assessment scope
- [ ] Move completed deferred items from `review-fixes.md` Outstanding → Fixes Applied as they ship
