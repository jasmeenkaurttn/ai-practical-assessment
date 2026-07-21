# Debugging Prompts

## Session Overview

Debugging sessions focused on environment setup issues: GitHub authentication for push, PostgreSQL credential configuration, and local database tooling. No application-level code bugs were reported or fixed.

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
User successfully connected and created `support_tickets` database. Remaining blocker is `.env` credential alignment.

---

## Follow-Up Actions

- [ ] Confirm `npm run db:push` and `npm run db:seed` succeed after `.env` fix
- [ ] Record resolution in `debugging-notes.md` once database connection is verified
- [ ] Document any application-level bugs discovered during M5 integration testing
