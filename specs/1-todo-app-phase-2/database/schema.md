# Feature Specification: Database Schema

**Feature Branch**: `1-todo-app-phase-2`  
**Created**: 2026-02-05  
**Status**: Draft  
**Input**: User description: "You are now operating under the previously accepted project constitution. Your task in THIS STEP is to PRODUCE COMPLETE, EXPLICIT, AND REVIEWER-PROOF SPECIFICATIONS for Hackathon II – Phase 2: Todo Full-Stack Web Application. DO NOT generate plans, tasks, or implementation. DO NOT write code. ONLY write specifications. SCOPE OF SPECIFICATION (MANDATORY): You must create or update the following specs under the /specs directory, strictly following Spec-Kit conventions and monorepo structure. 1. specs/overview.md Include: - Project purpose (evolution from CLI to full-stack web app) - Current phase: Phase II – Full-Stack Web Application - Clear definition of “Phase 2 complete” - High-level architecture summary (Frontend, Backend, Database, Auth) - Explicit statement that: - No in-memory storage is allowed - JWT authentication is mandatory for all APIs - Multi-user isolation is enforced everywhere 2. specs/architecture.md Define: - Monorepo architecture (frontend/, backend/, specs/) - Responsibility boundaries: - Frontend (Next.js + Better Auth) - Backend (FastAPI + SQLModel) - Database (Neon PostgreSQL) - Auth flow using JWT: - Token issuance - Token transport - Token verification - User identity extraction - How user isolation is enforced end-to-end - How this architecture remains extensible for future phases 3. specs/features/task-crud.md Define: - User stories for all 5 basic features: - Create task - View tasks - Update task - Delete task - Toggle completion - Acceptance criteria for EACH operation: - Validation rules - Ownership enforcement - Error cases (401, 403, 404) - Explicit requirement: - Every task MUST belong to exactly one authenticated user - No task can exist without a user_id 4. specs/features/authentication.md Define: - Signup and signin using Better Auth (frontend) - JWT issuance requirements: - Token contents (user_id, email) - Expiry expectations - Security requirements: - Backend never trusts client-provided user_id - Backend derives user identity ONLY from JWT - Logout behavior - Failure cases (invalid token, expired token) 5. specs/api/rest-endpoints.md Define ALL REST endpoints explicitly, including: - Method - Path - Authentication requirement (JWT mandatory) - Request headers - Request body (if any) - Response structure - Error responses Endpoints MUST include: - GET /api/{user_id}/tasks - POST /api/{user_id}/tasks - GET /api/{user_id}/tasks/{id} - PUT /api/{user_id}/tasks/{id} - DELETE /api/{user_id}/tasks/{id} - PATCH /api/{user_id}/tasks/{id}/complete Explicitly state: - user_id in URL MUST match authenticated user - Backend must reject mismatches with proper HTTP errors 6. specs/database/schema.md Define: - PostgreSQL schema using SQLModel concepts - users table (managed by Better Auth, referenced only) - tasks table with: - id - user_id (foreign key) - title - description - completed - created_at - updated_at - Indexing requirements - Referential integrity rules 7. specs/ui/pages.md Define required UI pages: - Signup - Login - Task list - Task create/edit - Logout behavior Define: - Which pages require authentication - High-level UX behavior (no styling code) 8. specs/ui/components.md Define reusable UI components: - Task list - Task item - Forms - Auth guard / protected layout STRICT SPEC RULES (NON-NEGOTIABLE): - Specs MUST be explicit enough that implementation decisions are obvious. - NO vague language like “should”, “maybe”, or “optional” for core logic. - If something is required, say MUST. - If something is forbidden, say MUST NOT. - Do NOT assume defaults. - Do NOT reference future phases unless explicitly stating extensibility. COMPLETION RULE: When ALL required spec files are written: - STOP immediately. - Do NOT generate plans, tasks, or code. - End with ONLY this confirmation message: "Phase 2 specifications complete. Ready for sp.plan." Wait for the user to provide the sp.plan prompt."

## User Scenarios & Testing *(mandatory)*

### Database Schema Overview

This document defines the PostgreSQL database schema using SQLModel concepts for the Todo Full-Stack Web Application, including table definitions, relationships, indexing, and referential integrity rules.

## Requirements *(mandatory)*

### PostgreSQL Schema using SQLModel Concepts

The database schema MUST be defined using SQLModel, ensuring a clear and consistent object-relational mapping.

#### 1. `users` table

-   This table is managed by Better Auth.
-   It is referenced by other tables (e.g., `tasks`) via a foreign key relationship.
-   The structure of this table (e.g., `id`, `email`, `hashed_password`) is implicitly handled by Better Auth.

#### 2. `tasks` table

-   This table MUST store individual task items for users.
-   **Columns**:
    -   `id`: Primary key, UUID, auto-generated.
    -   `user_id`: Foreign key referencing the `id` column in the `users` table. This field MUST be non-nullable.
    -   `title`: String, non-nullable, stores the task's title. Maximum length TBD.
    -   `description`: String, nullable, stores an optional longer description for the task.
    -   `completed`: Boolean, non-nullable, default value `FALSE`. Indicates if the task is completed.
    -   `created_at`: Datetime with timezone, non-nullable, auto-set on creation.
    -   `updated_at`: Datetime with timezone, non-nullable, auto-set on update.

### Indexing Requirements

-   An index MUST be created on the `user_id` column in the `tasks` table to optimize queries for retrieving a user's tasks.
-   An index MAY be considered on the `completed` column in the `tasks` table if filtering by completion status is a frequent operation.

### Referential Integrity Rules

-   The `user_id` in the `tasks` table MUST have a foreign key constraint to the `id` in the `users` table.
-   When a user is deleted from the `users` table, all associated tasks in the `tasks` table MUST be cascaded and deleted (ON DELETE CASCADE).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The database schema is correctly defined using SQLModel, accurately reflecting the `users` and `tasks` tables.
- **SC-002**: All specified columns for the `tasks` table (id, user_id, title, description, completed, created_at, updated_at) are present with correct data types and nullability constraints.
- **SC-003**: The foreign key relationship between `tasks.user_id` and `users.id` is correctly established, ensuring data consistency.
- **SC-004**: The `user_id` column in the `tasks` table is indexed, and referential integrity rules (ON DELETE CASCADE) are properly implemented.
- **SC-005**: All task entries in the database are uniquely associated with an existing user.
