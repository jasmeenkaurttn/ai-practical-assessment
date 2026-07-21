-- Support Ticket Management System
-- PostgreSQL schema (mirrors prisma/schema.prisma)

CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');
CREATE TYPE "TicketPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

CREATE TABLE "tickets" (
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "title"       VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "status"      "TicketStatus" NOT NULL DEFAULT 'OPEN',
    "priority"    "TicketPriority" NOT NULL DEFAULT 'MEDIUM',
    "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX "tickets_status_idx" ON "tickets" ("status");
CREATE INDEX "tickets_priority_idx" ON "tickets" ("priority");
CREATE INDEX "tickets_created_at_idx" ON "tickets" ("created_at" DESC);
