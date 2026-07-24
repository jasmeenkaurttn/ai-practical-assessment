# Acceptance Criteria

## Overview

A support ticket management system allowing users to create, view, update, filter, and delete support tickets with status workflow enforcement.

## Feature Acceptance Criteria

### Ticket List
- [x] Display paginated list of tickets sorted by newest first
- [x] Filter by status and priority
- [x] Search by title and description (debounced input)
- [x] Show status and priority badges on each ticket

### Create Ticket
- [x] Form with title, description, and priority fields
- [x] Title required (max 200 characters)
- [x] Description required (min 10 characters)
- [x] New tickets default to OPEN status

### View Ticket
- [x] Display full ticket details (title, description, status, priority, timestamps)
- [x] Navigate to edit page
- [x] Delete ticket with confirmation modal

### Edit Ticket
- [x] Update title, description, status, and priority
- [x] Enforce valid status transitions (e.g. OPEN → IN_PROGRESS, not OPEN → RESOLVED)
- [x] Show validation errors from API

### API
- [x] `GET /api/tickets` — list with filters and pagination
- [x] `GET /api/tickets/:id` — single ticket
- [x] `POST /api/tickets` — create ticket
- [x] `PATCH /api/tickets/:id` — update ticket
- [x] `DELETE /api/tickets/:id` — delete ticket

## Cross-Cutting Criteria

- [x] Responsive layout on mobile and desktop
- [x] API returns consistent JSON error responses
- [x] Data persisted in PostgreSQL

## Definition of Done

- [x] All acceptance criteria checked
- [x] Unit tests pass for validation logic (46 tests)
- [x] Application runs locally with `npm run dev`
- [x] Database seeded with sample tickets
