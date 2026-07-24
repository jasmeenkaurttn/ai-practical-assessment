# Reflection

## What Went Well

- **Planning-first approach** kept scope manageable and produced clear documentation before coding.
- **Vertical slice delivery** (data layer → API → UI) made each milestone testable independently.
- **Shared validation** in `src/shared/validation.ts` ensured consistent rules between API and UI.
- **UX polish** (skeletons, toasts, delete modal, debounced search) improved the app without large refactors.
- **Unit tests** (46 passing) give confidence in status transition and input validation logic.

## Challenges

- **PostgreSQL setup on Windows** — initial `P1000` authentication errors due to incorrect `.env` credentials; resolved by creating `support_tickets` database and matching the install password.
- **SQL Shell confusion** — entering SQL commands at connection prompts instead of after `postgres=#`; resolved with step-by-step guidance.
- **Startup race condition** — Vite client called the API before Express was ready (`ECONNREFUSED`); fixed with `wait-on` in the dev script.
- **Git push 403** — wrong GitHub account cached in Windows Credential Manager.

## What Would I Do Differently

- Set up a **dedicated test database** earlier and add integration tests alongside API development.
- Export the Express `app` separately from `listen()` from the start to simplify Supertest setup.
- Add **GitHub Actions CI** (lint + test) in the foundation milestone rather than at the end.

## Key Learnings

- AI-assisted development works best with **clear scope boundaries** and small, reviewable commits.
- **Debounced search** made a separate Search button redundant — simpler UX is often better.
- **Toast + redirect to list** after create/delete gives clearer feedback than navigating to detail pages.
- Keeping validation logic pure and well-tested reduces bugs in both frontend and backend layers.

## M8 Delivery

- All acceptance criteria verified and checked off.
- 46 unit tests passing; results recorded in `test-results.md`.
- PR description, reflection, and `final-ai-usage-summary.md` completed for submission.
- Repository pushed to GitHub: `jasmeenkaurttn/ai-practical-assessment`.
