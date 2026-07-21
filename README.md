# Support Ticket Management System

A full-stack web application for managing support tickets, built as part of the AI Practical Assessment.

## Technology Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 18, TypeScript, Vite          |
| Backend  | Node.js, Express, TypeScript        |
| Database | PostgreSQL, Prisma                  |
| Testing  | Vitest, Supertest, Playwright       |

## Project Status

**Current phase:** M2–M4 — Ticket management (data layer, API, UI)

Features implemented: ticket CRUD, status workflow, filtering, search, pagination.

## Prerequisites

- **Node.js 20+** (required — Prisma 6 and Vite 6 do not run on Node 12/14/16)
- PostgreSQL 14+
- npm 10+

If you use [nvm](https://github.com/nvm-sh/nvm): `nvm install` (reads `.nvmrc`)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set your `DATABASE_URL` to point at a local PostgreSQL database.

### 3. Push schema and seed data

```bash
npm run db:push
npm run db:seed
```

### 4. Generate Prisma client

```bash
npm run db:generate
```

### 5. Start development servers

```bash
npm run dev
```

- **Client:** http://localhost:5173
- **API:** http://localhost:3001
- **Health check:** http://localhost:3001/api/health

The health endpoint returns `degraded` (503) if PostgreSQL is not reachable — the API still starts.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start client and server concurrently |
| `npm run dev:client` | Vite dev server only |
| `npm run dev:server` | Express API only |
| `npm run build` | Build client and server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed sample tickets |
| `npm run test` | Run unit tests |

## Repository Structure

```
├── database/          # Schema, seed data, setup notes
├── prisma/            # Prisma schema and migrations
├── src/
│   ├── client/        # React frontend (Vite)
│   ├── server/        # Express API
│   └── shared/        # Shared TypeScript types
├── tests/             # Test suites
├── ai-prompts/        # AI-assisted development prompt logs
└── tool-specific/     # Tool-specific workflow documentation
```

## Documentation

| Document | Purpose |
|----------|---------|
| [requirements-analysis.md](requirements-analysis.md) | Functional and non-functional requirements |
| [acceptance-criteria.md](acceptance-criteria.md) | Definition of done for each feature |
| [implementation-plan.md](implementation-plan.md) | Milestones, Git strategy, implementation order |
| [design-notes.md](design-notes.md) | Architecture and design decisions |
| [api-contract.md](api-contract.md) | REST API specification |
| [data-model.md](data-model.md) | Entities, relationships, validations |
| [ui-flow.md](ui-flow.md) | Pages, routes, and user flows |
| [test-strategy.md](test-strategy.md) | Testing approach and coverage goals |
