# Implementation Plan

## Overview

## Architecture

## Development Milestones

| Milestone | Goal | Key Deliverables |
|-----------|------|------------------|
| **M0 — Planning** | Repo scaffold + docs | All markdown/SQL placeholders, folder structure |
| **M1 — Foundation** | Runnable monorepo shell | package.json, Vite client, Express server, DB connection, health endpoint |
| **M2 — Data Layer** | Schema + migrations | `schema.sql`, Prisma/migrations, seed data |
| **M3 — API Core** | Ticket REST endpoints | CRUD per `api-contract.md`, validation, error handling |
| **M4 — Frontend Core** | Ticket UI | List, create, detail, edit per `ui-flow.md` |
| **M5 — Integration** | End-to-end flows | Client ↔ API ↔ DB working locally |
| **M6 — Testing** | Automated tests | Unit + integration; results in `test-results.md` |
| **M7 — Hardening** | Quality pass | Debugging notes, code review, review fixes |
| **M8 — Delivery** | PR + reflection | `pr-description.md`, `reflection.md`, `final-ai-usage-summary.md` |

## Git Commit Strategy

| Phase | Commit pattern | Example |
|-------|----------------|---------|
| Scaffold | `chore: initialize repository structure` | Folders + `.gitignore` |
| Docs | `docs: add planning document scaffolds` | All root markdown headings |
| Database docs | `docs: add database placeholder files` | `database/*` |
| AI workflow | `docs: add ai-prompts and cursor-workflow scaffolds` | `ai-prompts/`, `tool-specific/` |
| Planning content | `docs: complete requirements and implementation plan` | Populated planning sections |
| Implementation | `feat(scope): description` | Per milestone/feature |
| Tests | `test(scope): description` | Per test suite |
| Fixes | `fix(scope): description` | From `review-fixes.md` |

### Commit Rules

- One logical change per commit
- Never commit `.env` or secrets
- Reference milestone in PR description, not necessarily every commit
- Tag planning complete before first `feat` commit

## Recommended Implementation Order

1. **Planning scaffold** — folders + heading-only docs
2. **Fill acceptance criteria** — define ticket features explicitly (blocks M2+)
3. **Finalize data model + API contract** — based on acceptance criteria
4. **Project bootstrap** — monorepo tooling, TypeScript, ESLint, dev scripts
5. **Database setup** — PostgreSQL, schema, migrations, seed
6. **Backend API** — models, routes, validation, error handling
7. **Frontend shell** — routing, layout, API client
8. **Ticket features** — implement vertical slices (create → list → view → update)
9. **Auth** (if required by acceptance criteria)
10. **Tests** — unit → integration → E2E
11. **Documentation pass** — README setup instructions, API examples
12. **Review & delivery** — code review notes, PR, reflection

## Dependencies and Risks

## Folder Structure
