# Acceptance Criteria

## Overview

A support ticket management system allowing users to create, view, update, filter, and delete support tickets with status workflow enforcement.

## Feature Acceptance Criteria

### Ticket List
- [ ] Display paginated list of tickets sorted by newest first
- [ ] Filter by status and priority
- [ ] Search by title and description
- [ ] Show status and priority badges on each ticket

### Create Ticket
- [ ] Form with title, description, and priority fields
- [ ] Title required (max 200 characters)
- [ ] Description required (min 10 characters)
- [ ] New tickets default to OPEN status

### View Ticket
- [ ] Display full ticket details (title, description, status, priority, timestamps)
- [ ] Navigate to edit page
- [ ] Delete ticket with confirmation

### Edit Ticket
- [ ] Update title, description, status, and priority
- [ ] Enforce valid status transitions (e.g. OPEN → IN_PROGRESS, not OPEN → RESOLVED)
- [ ] Show validation errors from API

### API
- [ ] `GET /api/tickets` — list with filters and pagination
- [ ] `GET /api/tickets/:id` — single ticket
- [ ] `POST /api/tickets` — create ticket
- [ ] `PATCH /api/tickets/:id` — update ticket
- [ ] `DELETE /api/tickets/:id` — delete ticket

## Cross-Cutting Criteria

- [ ] Responsive layout on mobile and desktop
- [ ] API returns consistent JSON error responses
- [ ] Data persisted in PostgreSQL

## Definition of Done

- All acceptance criteria checked
- Unit tests pass for validation logic
- Application runs locally with `npm run dev`
- Database seeded with sample tickets
