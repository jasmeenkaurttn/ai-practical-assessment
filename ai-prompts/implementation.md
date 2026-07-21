# Implementation Prompts

## Session Overview

Implementation progressed through three phases: **M0** documentation scaffold, **M1** monorepo foundation, and **M2–M4** ticket management (data layer, REST API, React UI). No application code was written during M0.

---

## Prompt 1: M0 Documentation and Folder Scaffold

### Prompt Summary
Implement the approved planning plan — create all mandated folders and placeholder documentation files with headings only. Complete all plan todos without editing the plan file.

### Project Context
- **Phase:** M0 — Planning
- Empty `ai-practical-assessment` repository

### AI Response Summary
Created 34 files: root planning docs, `database/` placeholders, `ai-prompts/` scaffolds, `tool-specific/cursor-workflow/`, `.gitignore`, and empty `src/`/`tests/` directories.

### What Was Accepted
- Full file list and folder structure from plan
- Heading-only policy for planning documents

### What Was Modified
- N/A

### What Was Rejected
- Application source code during M0

### Reasoning Behind the Decision
Assessment requires planning artifacts before implementation. Scaffold provides traceability structure for subsequent milestones.

### Validation or Outcome
M0 complete. All planning todos marked done.

---

## Prompt 2: M1 Project Bootstrap

### Prompt Summary
Proceed with project bootstrap (M1 Foundation): runnable monorepo with Vite React client, Express server, Prisma DB connection, and health endpoint.

### Project Context
- **Phase:** M1 — Foundation
- Planning scaffold committed or ready to commit

### AI Response Summary
Added `package.json`, TypeScript configs, Vite, ESLint, Express server with `GET /api/health`, Prisma client with connection check, React shell with health status display, `.env.example`, `.nvmrc` (Node 20+), and updated `README.md` setup instructions.

### What Was Accepted
- Concurrent dev scripts (`npm run dev`)
- Vite proxy for `/api` → port 3001
- Prisma datasource without models (models deferred to M2)
- Health endpoint returns `degraded` when DB unreachable

### What Was Modified
- `tsconfig.server.json` `rootDir` adjusted to `src` for correct build output

### What Was Rejected
- N/A

### Reasoning Behind the Decision
Foundation must be runnable before feature work. Health endpoint validates full stack connectivity early.

### Validation or Outcome
M1 code in place. `npm install` blocked on user's Node v12 environment; `.nvmrc` and `engines` field added requiring Node 20+.

---

## Prompt 3: M2–M4 Ticket Management System

### Prompt Summary
Start UI and tasks related to M2 ticket management system — implement data layer, API, and frontend for ticket CRUD.

### Project Context
- **Phase:** M2 (Data), M3 (API), M4 (UI)
- M1 foundation in place

### AI Response Summary
Implemented full ticket vertical slice:
- **M2:** Prisma `Ticket` model, `schema.sql`, `seed-data.sql`, `prisma/seed.ts`
- **M3:** REST endpoints (`GET/POST/PATCH/DELETE /api/tickets`), validation, status transition enforcement, pagination and filters
- **M4:** Ticket list, create, detail, edit pages; badges, shared form, layout navigation
- **Tests:** `tests/validation.test.ts` with Vitest

### What Was Accepted
- Full CRUD API with search, status/priority filters, pagination
- Status workflow rules at service layer
- React Router pages and responsive CSS
- Shared types in `src/shared/types.ts`
- Vitest for validation unit tests

### What Was Modified
- Acceptance criteria, `api-contract.md`, `data-model.md`, and `ui-flow.md` populated during implementation (were heading-only)

### What Was Rejected
- N/A

### Reasoning Behind the Decision
Vertical slice delivery demonstrates end-to-end capability within assessment scope. Shared validation between client hints and server enforcement ensures data integrity.

### Validation or Outcome
Feature code complete. Pending local validation: user must configure `.env` with correct PostgreSQL credentials and run `db:push`, `db:seed`, `dev`.

---

## Follow-Up Actions

- [ ] M5: End-to-end integration verification once database is connected
- [ ] M6: Expand test coverage (API integration tests, optional Playwright E2E)
- [ ] M7: Hardening pass based on code review findings
