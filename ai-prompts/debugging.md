# Debugging Prompts

## Session Overview

Debugging sessions focused on environment setup (GitHub auth, PostgreSQL credentials, Node version) and one application-level startup race (`ECONNREFUSED` on `/api/tickets`). All resolved during M2–M5 local integration.

---

## Prompt 1: Git Push Permission Denied (403)

### Prompt Summary
Resolve `git push` failure: `Permission to jasmeenkaurttn/ai-practical-assessment.git denied to jasmeenkaur7202`.

### Project Context
- Repository remote: `jasmeenkaurttn/ai-practical-assessment`
- Windows Credential Manager caching wrong GitHub account

### AI Response Summary
Diagnosed account mismatch — Git authenticated as `jasmeenkaur7202` but remote belongs to `jasmeenkaurttn`. Provided three options: re-authenticate as correct account, change remote to personal account, or add collaborator access. Recommended clearing Windows cached GitHub credentials and using a Personal Access Token.

### What Was Accepted
- Clear cached credentials in Windows Credential Manager
- Sign in as `jasmeenkaurttn` with PAT on next push

### What Was Modified
- N/A

### What Was Rejected
- N/A

### Reasoning Behind the Decision
403 errors with a different username in the message always indicate credential/account mismatch, not a code issue.

### Validation or Outcome
Resolution depends on user action. No repository code changes required.

---

## Prompt 2: PostgreSQL Authentication Failure (P1000)

### Prompt Summary
Fix `prisma db push` error: `P1000: Authentication failed` for user `postgres`.

### Project Context
- **Phase:** M2 — Data Layer
- `.env` `DATABASE_URL` using placeholder password from `.env.example`
- PostgreSQL 16 installed locally on port 5432

### AI Response Summary
Explained that PostgreSQL runs locally with no online login required. Identified that `.env` password did not match the user's actual PostgreSQL install password. Provided steps: verify PostgreSQL service running, test with `psql`, create `support_tickets` database, update `.env` with real credentials, URL-encode special characters in passwords.

### What Was Accepted
- Local PostgreSQL only (no cloud account required)
- Edit `.env` (not `.env.example`) with real password
- Create `support_tickets` database before `db:push`

### What Was Modified
- N/A

### What Was Rejected
- N/A

### Reasoning Behind the Decision
P1000 specifically indicates authentication failure while the server is reachable — credentials in `DATABASE_URL` are the root cause, not Prisma or schema code.

### Validation or Outcome
User successfully created database via SQL Shell (`CREATE DATABASE support_tickets;`). `db:push` still failing until `.env` password is corrected to match psql login.

---

## Prompt 3: PostgreSQL Installer and SQL Shell Usage

### Prompt Summary
Guidance on Stack Builder screens during PostgreSQL installation and correct usage of SQL Shell (psql) connection prompts.

### Project Context
- User installing PostgreSQL 16 on Windows
- Confusion entering SQL commands at connection setup prompts

### AI Response Summary
Advised cancelling Stack Builder (optional, not needed for project). Instructed to press Enter for default connection values, enter password only when prompted, then run `CREATE DATABASE support_tickets;` at the `postgres=#` prompt. Offered pgAdmin as a GUI alternative.

### What Was Accepted
- Cancel Stack Builder
- Use PostgreSQL 16 on port 5432
- Enter SQL only after successful connection (`postgres=#`)

### What Was Modified
- N/A

### What Was Rejected
- Installing additional Stack Builder packages (drivers, PostGIS, etc.)

### Reasoning Behind the Decision
Stack Builder extras are unnecessary for Prisma + Node.js. SQL Shell setup prompts are connection parameters, not a SQL execution environment.

### Validation or Outcome
User successfully connected and created `support_tickets` database. `db:push` and `db:seed` succeed after `.env` password alignment.

---

## Prompt 4: API Startup Race (ECONNREFUSED)

### Prompt Summary
Fix `ECONNREFUSED` errors when the Vite client requests `/api/tickets` immediately on page load.

### Project Context
- **Phase:** M5 — Integration
- `npm run dev` starts server and client concurrently; Vite proxy hits API before Express is listening

### AI Response Summary
Diagnosed startup race condition. Added `wait-on` dependency and updated dev script to wait for `http://localhost:3001/api/health` before starting Vite client. Improved `src/client/services/http.ts` to surface clearer API error messages.

### What Was Accepted
- `wait-on` in `package.json` dev script
- Improved HTTP client error handling

### What Was Modified
- N/A

### What Was Rejected
- N/A

### Reasoning Behind the Decision
Health-check gating is a standard fix for concurrent dev startup; no production behavior change.

### Validation or Outcome
Committed as `f35320f fix(dev): wait for API before starting client and improve error handling`. `/tickets` loads without proxy errors after restart.

---

## Prompt 5: Node.js Version Too Old for Tooling

### Prompt Summary
Resolve `npm install` / Prisma postinstall failures caused by Node.js v12.

### Project Context
- **Phase:** M2 — Data Layer
- Prisma 6 and Vite 6 require Node 18+; project specifies Node 20+ in `.nvmrc`

### AI Response Summary
Identified Node 12 as root cause of install and build failures. Directed user to upgrade to Node 20 LTS using nvm or official installer. Confirmed `.nvmrc` and `engines` field already enforce Node 20+.

### What Was Accepted
- Upgrade local Node to 20+
- Use `.nvmrc` for version consistency

### What Was Modified
- N/A

### What Was Rejected
- Downgrading Prisma/Vite to support Node 12

### Reasoning Behind the Decision
Modern toolchain requires current Node; downgrading dependencies would create security and compatibility issues.

### Validation or Outcome
User upgraded to Node 20. `npm install`, `npm run test`, and `npm run dev` succeed.

---

## Follow-Up Actions

- [x] Confirm `npm run db:push` and `npm run db:seed` succeed after `.env` fix
- [x] Resolve ECONNREFUSED startup race with `wait-on`
- [x] Upgrade Node.js to 20+ for Prisma/Vite compatibility
