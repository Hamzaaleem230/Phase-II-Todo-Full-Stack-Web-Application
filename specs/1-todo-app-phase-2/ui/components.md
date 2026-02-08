# Feature Specification: Reusable UI Components

**Feature Branch**: `1-todo-app-phase-2`  
**Created**: 2026-02-05  
**Status**: Draft  
**Input**: User description: "You are now operating under the previously accepted project constitution. Your task in THIS STEP is to PRODUCE COMPLETE, EXPLICIT, AND REVIEWER-PROOF SPECIFICATIONS for Hackathon II – Phase 2: Todo Full-Stack Web Application. DO NOT generate plans, tasks, or implementation. DO NOT write code. ONLY write specifications. SCOPE OF SPECIFICATION (MANDATORY): You must create or update the following specs under the /specs directory, strictly following Spec-Kit conventions and monorepo structure. 1. specs/overview.md Include: - Project purpose (evolution from CLI to full-stack web app) - Current phase: Phase II – Full-Stack Web Application - Clear definition of “Phase 2 complete” - High-level architecture summary (Frontend, Backend, Database, Auth) - Explicit statement that: - No in-memory storage is allowed - JWT authentication is mandatory for all APIs - Multi-user isolation is enforced everywhere 2. specs/architecture.md Define: - Monorepo architecture (frontend/, backend/, specs/) - Responsibility boundaries: - Frontend (Next.js + Better Auth) - Backend (FastAPI + SQLModel) - Database (Neon PostgreSQL) - Auth flow using JWT: - Token issuance - Token transport - Token verification - User identity extraction - How user isolation is enforced end-to-end - How this architecture remains extensible for future phases 3. specs/features/task-crud.md Define: - User stories for all 5 basic features: - Create task - View tasks - Update task - Delete task - Toggle completion - Acceptance criteria for EACH operation: - Validation rules - Ownership enforcement - Error cases (401, 403, 404) - Explicit requirement: - Every task MUST belong to exactly one authenticated user - No task can exist without a user_id 4. specs/features/authentication.md Define: - Signup and signin using Better Auth (frontend) - JWT issuance requirements: - Token contents (user_id, email) - Expiry expectations - Security requirements: - Backend never trusts client-provided user_id - Backend derives user identity ONLY from JWT - Logout behavior - Failure cases (invalid token, expired token) 5. specs/api/rest-endpoints.md Define ALL REST endpoints explicitly, including: - Method - Path - Authentication requirement (JWT mandatory) - Request headers - Request body (if any) - Response structure - Error responses Endpoints MUST include: - GET /api/{user_id}/tasks - POST /api/{user_id}/tasks - GET /api/{user_id}/tasks/{id} - PUT /api/{user_id}/tasks/{id} - DELETE /api/{user_id}/tasks/{id} - PATCH /api/{user_id}/tasks/{id}/complete Explicitly state: - user_id in URL MUST match authenticated user - Backend must reject mismatches with proper HTTP errors 6. specs/database/schema.md Define: - PostgreSQL schema using SQLModel concepts - users table (managed by Better Auth, referenced only) - tasks table with: - id - user_id (foreign key) - title - description - completed - created_at - updated_at - Indexing requirements - Referential integrity rules 7. specs/ui/pages.md Define required UI pages: - Signup - Login - Task list - Task create/edit - Logout behavior Define: - Which pages require authentication - High-level UX behavior (no styling code) 8. specs/ui/components.md Define reusable UI components: - Task list - Task item - Forms - Auth guard / protected layout STRICT SPEC RULES (NON-NEGOTIABLE): - Specs MUST be explicit enough that implementation decisions are obvious. - NO vague language like “should”, “maybe”, or “optional” for core logic. - If something is required, say MUST. - If something is forbidden, say MUST NOT. - Do NOT assume defaults. - Do NOT reference future phases unless explicitly stating extensibility. COMPLETION RULE: When ALL required spec files are written: - STOP immediately. - Do NOT generate plans, tasks, or code. - End with ONLY this confirmation message: "Phase 2 specifications complete. Ready for sp.plan." Wait for the user to provide the sp.plan prompt."

## User Scenarios & Testing *(mandatory)*

### Reusable UI Components Overview

This document defines reusable UI components for the Todo Full-Stack Web Application, including their purpose and high-level functionality.

## Requirements *(mandatory)*

### Reusable UI Components

The Frontend MUST implement the following reusable UI components:

#### 1. Task List Component

-   **Purpose**: Displays a collection of task items.
-   **Functionality**:
    -   Receives a list of task objects as props.
    -   Renders each task using the "Task Item Component".
    -   Handles actions (e.g., delete, toggle completion) by delegating to parent components or a state management solution.

#### 2. Task Item Component

-   **Purpose**: Displays a single task and allows interaction with it.
-   **Functionality**:
    -   Receives a single task object as props.
    -   Displays the task's title, description (if present), and completion status.
    -   Provides a mechanism (e.g., checkbox, button) to toggle the task's `completed` status.
    -   Provides options to edit or delete the task (e.g., buttons or icons).

#### 3. Forms Component (Generic)

-   **Purpose**: Provides a reusable structure for input forms (e.g., Signup, Login, Task Create/Edit).
-   **Functionality**:
    -   Receives form fields configuration (e.g., input type, label, validation rules).
    -   Manages form state and input changes.
    -   Handles form submission and displays validation errors.

#### 4. Auth Guard / Protected Layout Component

-   **Purpose**: Protects routes and content that require user authentication.
-   **Functionality**:
    -   Checks if a user is authenticated (e.g., by verifying the presence and validity of a JWT).
    -   If authenticated, renders its children components.
    -   If not authenticated, redirects the user to the Login or Signup page.
    -   Optionally displays a loading indicator while checking authentication status.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All defined reusable UI components (Task List, Task Item, Forms, Auth Guard) are implemented and functional.
- **SC-002**: The Task List component correctly renders a dynamic list of Task Item components.
- **SC-003**: The Task Item component accurately displays task details and allows toggling completion status.
- **SC-004**: The Forms component is successfully used for Signup, Login, and Task Create/Edit pages, handling input and validation.
- **SC-005**: The Auth Guard / Protected Layout component correctly restricts access to authenticated-only pages and redirects unauthenticated users.
