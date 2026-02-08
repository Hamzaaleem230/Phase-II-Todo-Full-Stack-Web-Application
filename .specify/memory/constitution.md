<!--
Sync Impact Report:

Version change: None (initial creation) → 1.0.0
List of modified principles: All principles were newly added.
Added sections: All sections were newly added based on user input.
Removed sections: None.
Templates requiring updates:
- .specify/templates/plan-template.md (⚠ pending)
- .specify/templates/spec-template.md (⚠ pending)
- .specify/templates/tasks-template.md (⚠ pending)
Follow-up TODOs if any placeholders intentionally deferred: None.
-->
# Hackathon II – Phase 2: Todo Full-Stack Web Application Constitution

## Core Principles

### I. NO DUMMY IMPLEMENTATIONS
- Do NOT use mock data, fake APIs, hardcoded users, in-memory lists, placeholder auth, or bypass logic.
- Do NOT use comments like “TODO”, “mock”, “later”, or “example only” for any core requirement.
- Wherever real production logic is technically possible, it MUST be implemented fully.

### II. REAL FULL-STACK ARCHITECTURE IS MANDATORY
- Frontend MUST be a real Next.js 16+ App Router application.
- Backend MUST be a real FastAPI service.
- Database MUST be Neon Serverless PostgreSQL using SQLModel.
- Data MUST persist across restarts (no memory storage).
- Authentication MUST use Better Auth with real JWT issuance and verification.

### III. AUTHENTICATION & SECURITY ARE CRITICAL
- JWT tokens MUST be issued by Better Auth on the frontend.
- Every backend request MUST require a valid Authorization: Bearer <token>.
- FastAPI MUST verify JWT signature using a shared secret.
- User identity MUST be extracted from the token, NOT trusted from request input.
- All database queries MUST be filtered by the authenticated user.
- User A MUST NEVER see or modify User B’s data under any condition.

### IV. MONOREPO + SPEC-KIT STRUCTURE IS REQUIRED
- Use a monorepo with frontend/, backend/, specs/, and .spec-kit/config.yaml.
- Specs MUST be organized by type: features, api, database, ui.
- Multiple CLAUDE.md files MUST exist:
  - Root CLAUDE.md (project-wide rules)
  - frontend/CLAUDE.md (frontend-specific rules)
  - backend/CLAUDE.md (backend-specific rules)

### V. SPEC-FIRST WORKFLOW (NO EXCEPTIONS)
- Always follow this order:
  Write/Update Spec → Generate Plan → Break into Tasks → Implement
- NEVER implement before specs exist.
- All implementations MUST trace back to explicit specs.
- If a requirement is unclear, STOP and require clarification in specs.

### VI. CONFIGURATION VS DUMMY (IMPORTANT DISTINCTION)
- External credentials (Neon DB URL, Better Auth keys, JWT secret) CANNOT be invented.
- These MUST be represented as environment variables with clear names.
- At the END of implementation, you MUST explicitly list:
  - What the user must configure
  - In which file
  - With what type of value
- You MUST NOT silently skip or fake any external dependency.

### VII. FUTURE-PROOFING
- Architecture MUST be extensible for later phases (chatbot, MCP tools, event-driven systems).
- Avoid tightly coupled or hacky solutions.
- Code and specs MUST be clean, readable, and maintainable.

## Success Definition
Phase 2 is considered complete ONLY if:
- A real multi-user web app works end-to-end
- Auth is real and enforced everywhere
- Data persists in Neon PostgreSQL
- User isolation is guaranteed
- All work is driven by specs and documented clearly

## Governance
This constitution supersedes all other practices. Amendments require documentation, approval, and a migration plan. All PRs/reviews must verify compliance. Complexity must be justified. Use `CLAUDE.md` for runtime development guidance.

**Version**: 1.0.0 | **Ratified**: 2026-02-05 | **Last Amended**: 2026-02-05