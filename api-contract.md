# API Contract

## Base URL

- Development: `http://localhost:3001/api`
- Client proxy: `/api` (Vite dev server proxies to port 3001)

## Authentication

Not implemented in M2–M4. All endpoints are public.

## Endpoints

### Health

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | System health check |

### Tickets

| Method | Path | Description |
|--------|------|-------------|
| GET | `/tickets` | List tickets (paginated, filterable) |
| GET | `/tickets/:id` | Get ticket by ID |
| POST | `/tickets` | Create a new ticket |
| PATCH | `/tickets/:id` | Update a ticket |
| DELETE | `/tickets/:id` | Delete a ticket |

## Request Schemas

### POST /tickets

```json
{
  "title": "string (required, max 200)",
  "description": "string (required, min 10)",
  "priority": "LOW | MEDIUM | HIGH (optional, default MEDIUM)"
}
```

### PATCH /tickets/:id

```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "status": "OPEN | IN_PROGRESS | RESOLVED | CLOSED (optional)",
  "priority": "LOW | MEDIUM | HIGH (optional)"
}
```

### GET /tickets query parameters

| Param | Type | Description |
|-------|------|-------------|
| `status` | string | Filter by status |
| `priority` | string | Filter by priority |
| `search` | string | Search title and description |
| `page` | number | Page number (default 1) |
| `limit` | number | Items per page (default 10, max 100) |

## Response Schemas

### Ticket

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "status": "OPEN | IN_PROGRESS | RESOLVED | CLOSED",
  "priority": "LOW | MEDIUM | HIGH",
  "createdAt": "ISO 8601",
  "updatedAt": "ISO 8601"
}
```

### Paginated list

```json
{
  "data": [ "Ticket" ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

## Error Codes

| Code | Meaning |
|------|---------|
| 400 | Validation failed or invalid status transition |
| 404 | Ticket not found |
| 500 | Internal server error |

Error body:

```json
{
  "error": {
    "message": "string",
    "statusCode": 400,
    "details": ["optional array of validation messages"]
  }
}
```

## Versioning

Unversioned (`/api`). Version prefix may be added in future milestones.
