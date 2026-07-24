# Final AI Usage Summary

## Overview

This project was built using **Cursor AI** as the primary development assistant across planning, implementation, debugging, UX polish, testing, and documentation phases (M0–M8). AI was used as a pair-programming partner with the developer reviewing, accepting, or modifying all outputs before commit.

**Project:** Support Ticket Management System  
**Repository:** ai-practical-assessment  
**Assessment phase:** Full Stack AI Practical Assessment

## Tools Used

| Tool | Purpose |
|------|---------|
| **Cursor (Agent mode)** | Code generation, refactoring, debugging, commits |
| **Cursor (Plan mode)** | M0 planning scaffold and architecture |
| **Cursor (Ask mode)** | Technical guidance (test safety, next steps) |
| **Git / GitHub** | Version control and remote push |
| **Vitest** | Unit test execution (AI-assisted test authoring) |

## Prompt Categories

| Category | File | Sessions |
|----------|------|----------|
| Planning | `ai-prompts/planning.md` | M0 scaffold, Git strategy, stack selection |
| Design | `ai-prompts/design.md` | Architecture, data model, UI flow |
| Implementation | `ai-prompts/implementation.md` | M1 bootstrap, M2–M4 ticket CRUD, UX polish |
| Testing | `ai-prompts/testing.md` | Test strategy, 46 unit tests |
| Debugging | `ai-prompts/debugging.md` | PostgreSQL auth, ECONNREFUSED, Git 403 |
| Code review | `ai-prompts/code-review.md` | M7 self-review, review-fixes tracking |
| Documentation | `ai-prompts/documentation.md` | Doc scaffolds, prompt history, M8 delivery |

## Effectiveness Assessment

### What worked well
- **Structured planning first** prevented scope creep and produced reviewable milestones.
- **Incremental commits** (planning → foundation → features → UX → tests → docs) kept history clean.
- **AI debugging** quickly identified startup race condition and PostgreSQL credential issues.
- **Shared validation module** was easy to extend with AI-generated unit tests.

### Limitations observed
- AI initially suggested features not in the assessment brief (corrected by user constraint).
- `npm install` / Prisma postinstall failed on Node 12 — environment issue, not AI fault.
- Integration and E2E tests deferred due to time; AI correctly flagged these as next steps.

### Human decisions retained
- Technology stack confirmation (React + Node + PostgreSQL)
- Separate commits for features vs documentation
- UX choices: remove Search button, toast top-right, delete modal, redirect to list after create/delete

## Recommendations

1. **Always constrain AI scope** — explicitly state "do not invent features" for assessment work.
2. **Commit planning before code** — preserves traceability for reviewers.
3. **Run `npm run test` before each feature commit** — catches validation regressions early.
4. **Keep `ai-prompts/` updated** — demonstrates transparent AI usage for assessment evaluators.
5. **Add integration tests next** — highest-value follow-up after unit test coverage.

## M8 Delivery Checklist

- [x] Application runs locally (`npm run dev`)
- [x] Ticket CRUD fully functional
- [x] 46 unit tests passing
- [x] Acceptance criteria checked off
- [x] Test results documented
- [x] PR description and reflection written
- [x] AI prompt history organized
- [x] Code review notes completed (M7)
