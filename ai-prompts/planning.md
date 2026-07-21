# Planning Prompts

## Session Overview

Planning covered milestones **M0 (Planning)** through commit strategy for **M1 (Foundation)**. The repository started empty; requirements were derived strictly from the assessment brief in chat, with no invented features. Technology stack was confirmed as React, Node.js, and PostgreSQL before any code was written.

---

## Prompt 1: Initial Project Planning and Repository Preparation

### Prompt Summary
Act as Senior Full Stack Engineer and Technical Architect for a **Support Ticket Management System**. Break down functional and non-functional requirements, define entities and business rules, specify frontend/backend/database/API/testing needs, create a milestone plan, recommend technology stack and folder structure, and scaffold documentation files with headings only. Do not implement business logic until planning is complete.

### Project Context
- **Repository:** `ai-practical-assessment` (empty at start)
- **Phase:** M0 — Planning
- **Deliverables requested:** `README.md`, planning docs, `database/`, `src/`, `tests/`, `ai-prompts/`, `tool-specific/cursor-workflow/`

### AI Response Summary
Produced a structured plan covering scope boundaries, minimal domain inference (Ticket entity only), open TBD items (auth, roles, notifications), recommended stack (React + Vite + Express + Prisma + PostgreSQL), architecture diagram, milestones M0–M8, Git commit strategy, and implementation order. Flagged that detailed features must wait for acceptance criteria.

### What Was Accepted
- Milestone-based roadmap (M0–M8)
- Documentation-first approach before implementation
- React + Node.js + PostgreSQL stack direction
- Mandated repository structure and file list
- Constraint: no feature invention beyond project title

### What Was Modified
- User later clarified requirements must come **only from the chat specification**, not assumed industry-standard features

### What Was Rejected
- Defining detailed ticket features (roles, comments, notifications) without explicit specification

### Reasoning Behind the Decision
Assessment scope was intentionally minimal. Inventing features risked building the wrong product. Open items were documented as TBD in `requirements-analysis.md` and `acceptance-criteria.md`.

### Validation or Outcome
Plan approved. M0 scaffold completed with 34 placeholder files across root docs, `database/`, `ai-prompts/`, and `tool-specific/cursor-workflow/`.

---

## Prompt 2: Requirements and Technology Constraints

### Prompt Summary
Clarify how functional requirements should be defined and whether a mandated technology stack applies.

### Project Context
- Empty repository with no official requirements document
- Planning phase in progress

### AI Response Summary
Asked whether to define standard assessment requirements, wait for official spec, or scope a minimal MVP; and whether stack was constrained.

### What Was Accepted
- **Requirements:** Use only assessment requirements provided in chat; do not invent additional features
- **Stack:** React + Node.js + PostgreSQL (mandated)

### What Was Modified
- N/A

### What Was Rejected
- Auto-generating a full feature spec from industry assumptions

### Reasoning Behind the Decision
User explicitly constrained scope to chat content, ensuring traceability between assessment brief and deliverables.

### Validation or Outcome
Plan updated with scope boundary section. Prisma, Vite, and Express recommended as supporting tools within the mandated stack.

---

## Prompt 3: Execute M0 Planning Scaffold

### Prompt Summary
Implement the approved planning plan: create all folders, placeholder documentation (headings only), `.gitignore`, and populate `implementation-plan.md` with milestones and Git strategy. Do not edit the plan file itself.

### Project Context
- **Phase:** M0 — Planning
- Plan file attached as reference

### AI Response Summary
Created full directory tree, 18 root markdown scaffolds, database placeholders, AI prompt logs, Cursor workflow files, empty `src/` and `tests/`, and `.gitignore`. `README.md` received a brief project overview; other docs received section headings only.

### What Was Accepted
- Complete file list from the plan
- Heading-only content policy (except `README.md` and `implementation-plan.md`)

### What Was Modified
- N/A

### What Was Rejected
- N/A

### Reasoning Behind the Decision
Strict separation of planning artifacts from implementation code keeps M0 reviewable and aligns with assessment instructions.

### Validation or Outcome
All M0 todos completed. Repository ready for M1 bootstrap upon user approval.

---

## Prompt 4: Git Commit Timing Before Bootstrap

### Prompt Summary
Proceed with M1 project bootstrap and advise when the first Git commit should be made — specifically, whether to commit before bootstrap.

### Project Context
- M0 planning scaffold complete
- Git not yet initialized

### AI Response Summary
Recommended committing M0 planning work **before** M1 bootstrap as a separate `docs:` commit, then a `feat(foundation):` commit for bootstrap. Provided suggested commit messages aligned with the plan's conventional commit strategy.

### What Was Accepted
- Two-commit approach: planning first, then foundation
- Conventional commit prefixes (`chore:`, `docs:`, `feat:`)

### What Was Modified
- N/A

### What Was Rejected
- Single combined commit mixing planning docs and application code

### Reasoning Behind the Decision
Plan explicitly states: "Tag planning complete before first `feat` commit." Separating commits preserves milestone traceability for assessment review.

### Validation or Outcome
User advised to `git init`, commit M0 docs, then commit M1 bootstrap separately.

---

## Follow-Up Actions

- [ ] Fill `acceptance-criteria.md` with assessor-provided criteria if additional spec is issued
- [ ] Update planning notes when M5+ milestones begin
- [ ] Record formal sign-off when planning phase is marked complete in `implementation-plan.md`
