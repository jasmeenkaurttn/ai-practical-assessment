# UI Flow

## Pages and Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Redirect | Redirects to `/tickets` |
| `/tickets` | TicketListPage | Paginated list with filters and search |
| `/tickets/new` | TicketCreatePage | Create new ticket form |
| `/tickets/:id` | TicketDetailPage | View ticket details, edit, delete |
| `/tickets/:id/edit` | TicketEditPage | Edit ticket with status transition rules |

## Components

| Component | Purpose |
|-----------|---------|
| `Layout` | App shell with header navigation |
| `TicketCard` | Ticket summary in list view |
| `TicketForm` | Shared create/edit form |
| `StatusBadge` | Colored status label |
| `PriorityBadge` | Colored priority label |

## State Management

Local component state with `useState`/`useEffect`. No global store in M2–M4.

## Forms and Validation

- Client-side HTML5 validation (required fields)
- Server-side validation with error display in `TicketForm`
- Status dropdown limited to allowed transitions on edit

## Error Handling

- API errors surfaced via `ApiRequestError` with message and details
- Loading and empty states on list and detail pages
- 404 handling for missing tickets

## Accessibility

- Semantic HTML (`main`, `article`, `nav`, `form`)
- Form labels associated with inputs
- `role="alert"` on validation error blocks
- `aria-label` on filter selects
