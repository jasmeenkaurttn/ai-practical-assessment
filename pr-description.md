# Pull Request Description

## Summary

This PR delivers a full-stack **Support Ticket Management System** built as part of the AI Practical Assessment. Users can create, view, update, filter, search, and delete support tickets with enforced status workflow rules.

## Changes

### Backend
- Express REST API with ticket CRUD endpoints
- Prisma + PostgreSQL data layer with `Ticket` model
- Shared validation and status transition rules
- Health check endpoint with database connectivity status

### Frontend
- React + TypeScript + Vite ticket management UI
- Ticket list with pagination, status/priority filters, and debounced search
- Create, detail, and edit pages with shared form component
- Toast notifications, loading skeletons, delete confirmation modal
- Character counters on form fields

### Testing & docs
- 46 unit tests for validation logic (`tests/validation.test.ts`)
- Planning and assessment documentation (`ai-prompts/`, acceptance criteria, API contract)

## Test Plan

- [x] `npm run test` — 46 unit tests pass
- [x] `npm run dev` — client and API start successfully
- [x] Create ticket → redirects to list with success toast
- [x] Edit ticket → status transitions enforced (e.g. OPEN cannot jump to RESOLVED)
- [x] Delete ticket → confirmation modal, redirects to list
- [x] Filter by status/priority and search by keyword
- [x] Pagination works when more than 10 tickets exist
- [ ] `npm run build` — verify production build (manual)

## How to Run

```bash
npm install
cp .env.example .env   # set DATABASE_URL
npm run db:push
npm run db:seed
npm run dev
```

- **UI:** http://localhost:5173/tickets
- **API:** http://localhost:3001/api/health

## Screenshots

_Add screenshots of ticket list, create form, detail page, and delete modal._

## Related Issues

N/A — AI Practical Assessment submission.
