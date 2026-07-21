# Database Setup Notes

## Prerequisites

- PostgreSQL 14 or later installed and running locally
- A database created for this project (e.g. `support_tickets`)

## Local PostgreSQL Setup

1. Install PostgreSQL for your OS.
2. Create a database:

```sql
CREATE DATABASE support_tickets;
```

3. Note your connection credentials (host, port, user, password).

## Connection Configuration

Copy `.env.example` to `.env` and set `DATABASE_URL`:

```
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/support_tickets?schema=public
```

Replace `USER` and `PASSWORD` with your PostgreSQL credentials.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (required for DB health check) |
| `PORT` | API server port (default: 3001) |
| `CLIENT_URL` | Frontend origin for CORS (default: http://localhost:5173) |

## Migration Approach

- **M1:** Prisma schema exists with datasource only; no tables yet.
- **M2:** Ticket tables will be added to `prisma/schema.prisma` and mirrored in `database/schema.sql`.
- Use `npm run db:push` for local development; migrations will be added in M2.

## Running Migrations

```bash
npm run db:generate   # Generate Prisma client after schema changes
npm run db:push       # Apply schema to database (M2+)
```

## Seeding Data

Seed scripts will be added in `database/seed-data.sql` during M2.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Health check shows `database: disconnected` | Verify PostgreSQL is running and `DATABASE_URL` is correct |
| `PrismaClientInitializationError` | Run `npm run db:generate` after `npm install` |
| Connection refused | Check host/port in `DATABASE_URL` |
