# Design Prompts

## Session Overview

Design decisions were made during M0 planning and refined during M2–M4 implementation. Architecture follows a three-tier pattern: React client, Express API, PostgreSQL database. No authentication layer was designed pending acceptance criteria.

---

## Prompt 1: System Architecture and Technology Selection

### Prompt Summary
Recommend a technology stack with justification and define project architecture for the Support Ticket Management System.

### Project Context
- **Phase:** M0 — Planning
- **Constraints:** React (frontend), Node.js (backend), PostgreSQL (database)

### AI Response Summary
Proposed React 18 + TypeScript + Vite (client), Node.js + Express + TypeScript (API), PostgreSQL with Prisma (data access), Vitest + Supertest + Playwright (testing). Defined layered architecture: Pages/Components → API Service → REST Routes → Controllers → Services → Database.

### What Was Accepted
- Vite for client tooling
- Express for REST API
- Prisma as ORM
- Monorepo layout: `src/client/`, `src/server/`, `src/shared/`
- REST JSON API with contract-first approach via `api-contract.md`

### What Was Modified
- UI styling left as CSS Modules or Tailwind (deferred to implementation; plain CSS chosen in M4)

### What Was Rejected
- Auth mechanism (JWT/session) — marked TBD until acceptance criteria define it

### Reasoning Behind the Decision
Stack aligns with user-mandated technologies while minimizing setup friction for a time-boxed assessment. Prisma accelerates schema iteration and pairs naturally with PostgreSQL.

### Validation or Outcome
Architecture documented in `design-notes.md` (headings), `implementation-plan.md`, and `tool-specific/cursor-workflow/project-context.md`. Implemented in M1 bootstrap.

---

## Prompt 2: Data Model and Status Workflow Design

### Prompt Summary
Define the Ticket entity, field constraints, and status transition rules for the support ticket domain.

### Project Context
- **Phase:** M2 — Data Layer
- No user roles or multi-entity relationships specified in assessment brief

### AI Response Summary
Designed a single `Ticket` entity with fields: `id`, `title`, `description`, `status`, `priority`, `createdAt`, `updatedAt`. Status enum: OPEN, IN_PROGRESS, RESOLVED, CLOSED. Priority enum: LOW, MEDIUM, HIGH. Defined directed status transitions enforcing a support workflow (e.g., OPEN cannot jump directly to RESOLVED).

### What Was Accepted
- UUID primary keys
- Title max 200 characters; description min 10 characters
- Status transition matrix enforced at service layer
- PostgreSQL enums mirrored in `database/schema.sql` and Prisma schema

### What Was Modified
- N/A

### What Was Rejected
- User, Comment, Category, and Assignment entities (not specified in assessment brief)

### Reasoning Behind the Decision
Minimal viable data model supports CRUD and workflow demonstration without scope creep. Transition rules prevent invalid state changes and demonstrate business logic design.

### Validation or Outcome
Schema applied via `prisma/schema.prisma`, `database/schema.sql`. Documented in `data-model.md` with ER diagram. Transition logic implemented in `src/shared/validation.ts` and `src/server/services/ticketService.ts`.

---

## Prompt 3: UI Flow and Component Structure

### Prompt Summary
Design frontend pages, routes, and component hierarchy for ticket management.

### Project Context
- **Phase:** M4 — Frontend Core
- API contract defined in M3

### AI Response Summary
Designed route map: `/tickets` (list), `/tickets/new` (create), `/tickets/:id` (detail), `/tickets/:id/edit` (edit). Component breakdown: `Layout`, `TicketCard`, `TicketForm`, `StatusBadge`, `PriorityBadge`. List page includes status/priority filters, search, and pagination.

### What Was Accepted
- React Router with nested layout route
- Shared `TicketForm` for create and edit
- Status dropdown on edit limited to allowed transitions from current state
- Responsive CSS without external UI framework

### What Was Modified
- Home page with health status widget removed in favor of ticket-centric navigation

### What Was Rejected
- Global state library (Redux/Zustand) — local state sufficient for current scope

### Reasoning Behind the Decision
Vertical slice UI maps 1:1 to API endpoints. Shared form reduces duplication. Transition-limited status dropdown mirrors server-side rules for consistent UX.

### Validation or Outcome
UI implemented across `src/client/pages/` and `src/client/components/`. Flow documented in `ui-flow.md`.

---

## Follow-Up Actions

- [ ] Design authentication and authorization model when acceptance criteria require it
- [ ] Evaluate Tailwind or component library if UI complexity grows in later milestones
- [ ] Add dashboard/analytics views if specified in future requirements
