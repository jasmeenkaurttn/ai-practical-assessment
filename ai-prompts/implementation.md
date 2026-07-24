# Implementation Prompts

## Session Overview

Implementation progressed through **M0** documentation scaffold, **M1** monorepo foundation, **M2–M4** ticket management (data layer, REST API, React UI), and post-M4 **UX polish** (skeletons, toasts, debounced search, delete modal). No application code was written during M0.

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
Feature code complete. User configured PostgreSQL, ran `db:push`/`db:seed`, and verified `npm run dev` locally.

---

## Prompt 4: UX Polish (Loading, Toasts, Counters, Search)

### Prompt Summary
Implement frontend UX improvements: loading skeleton, character counters on form fields, success toasts, empty state CTA, and debounced search (replacing Enter-only search).

### Project Context
- **Phase:** Post M4 — UX polish
- Ticket list showed plain "Loading tickets..." text; no user feedback on mutations

### AI Response Summary
Added `TicketListSkeleton`, `ToastContext`/`ToastContainer`, character counters in `TicketForm` (title 200, description min 10), empty state with link to `/tickets/new`, and 400ms debounced search via `useDebounce` hook. Exported length constants from `validation.ts`.

### What Was Accepted
- Toast system (no new npm dependency)
- Debounced search updating URL params
- Skeleton loader on list page
- Character counters with visual limit indicators

### What Was Modified
- Initial toast position was bottom; user requested top-right in follow-up (Prompt 5)

### What Was Rejected
- N/A

### Reasoning Behind the Decision
All changes are frontend-only with no API contract changes — lowest regression risk while improving perceived quality.

### Validation or Outcome
Committed as `c3617d7 feat(ui): add loading skeletons, toasts, character counters, and search polish`.

---

## Prompt 5: Toast Position, Redirects, Delete Modal, Search Cleanup

### Prompt Summary
Follow-up UX refinements: move toasts to top-right with animation, redirect to list after create/delete success, remove redundant Search button, replace `window.confirm` with delete confirmation modal.

### Project Context
- **Phase:** Post M4 — UX polish (iteration 2)
- Debounced search made Search button redundant

### AI Response Summary
Repositioned toasts top-right with slide-in animation and icon badges. Changed create success redirect from detail page to `/tickets`. Removed Search button and Enter handler from list filters. Added `ConfirmModal` with Escape/backdrop dismiss and loading state on delete.

### What Was Accepted
- Top-right toast with CSS animation
- Redirect to list after create and delete (edit still goes to detail)
- `ConfirmModal` replacing native confirm dialog
- Search input-only filtering

### What Was Modified
- N/A

### What Was Rejected
- N/A

### Reasoning Behind the Decision
User explicitly requested toast position and post-mutation redirects. Modal improves UX consistency over browser `confirm()`.

### Validation or Outcome
Committed as `0fa065a` (toast/redirect) and `f5d11ff` (modal/search cleanup).

---

## Follow-Up Actions

- [x] M5: End-to-end integration verified locally (`npm run dev`, full CRUD flow)
- [ ] M6: API integration tests and Playwright E2E (deferred — see `review-fixes.md` RF-10/RF-11)
- [x] M7: Hardening pass documented in `code-review-notes.md`
