# Feature Specification: Task CRUD Operations

**Feature Branch**: `1-todo-app-phase-2`  
**Created**: 2026-02-05  
**Status**: Draft  
**Input**: User description: "You are now operating under the previously accepted project constitution. Your task in THIS STEP is to PRODUCE COMPLETE, EXPLICIT, AND REVIEWER-PROOF SPECIFICATIONS for Hackathon II – Phase 2: Todo Full-Stack Web Application. DO NOT generate plans, tasks, or implementation. DO NOT write code. ONLY write specifications. SCOPE OF SPECIFICATION (MANDATORY): You must create or update the following specs under the /specs directory, strictly following Spec-Kit conventions and monorepo structure. 1. specs/overview.md Include: - Project purpose (evolution from CLI to full-stack web app) - Current phase: Phase II – Full-Stack Web Application - Clear definition of “Phase 2 complete” - High-level architecture summary (Frontend, Backend, Database, Auth) - Explicit statement that: - No in-memory storage is allowed - JWT authentication is mandatory for all APIs - Multi-user isolation is enforced everywhere 2. specs/architecture.md Define: - Monorepo architecture (frontend/, backend/, specs/) - Responsibility boundaries: - Frontend (Next.js + Better Auth) - Backend (FastAPI + SQLModel) - Database (Neon PostgreSQL) - Auth flow using JWT: - Token issuance - Token transport - Token verification - User identity extraction - How user isolation is enforced end-to-end - How this architecture remains extensible for future phases 3. specs/features/task-crud.md Define: - User stories for all 5 basic features: - Create task - View tasks - Update task - Delete task - Toggle completion - Acceptance criteria for EACH operation: - Validation rules - Ownership enforcement - Error cases (401, 403, 404) - Explicit requirement: - Every task MUST belong to exactly one authenticated user - No task can exist without a user_id 4. specs/features/authentication.md Define: - Signup and signin using Better Auth (frontend) - JWT issuance requirements: - Token contents (user_id, email) - Expiry expectations - Security requirements: - Backend never trusts client-provided user_id - Backend derives user identity ONLY from JWT - Logout behavior - Failure cases (invalid token, expired token) 5. specs/api/rest-endpoints.md Define ALL REST endpoints explicitly, including: - Method - Path - Authentication requirement (JWT mandatory) - Request headers - Request body (if any) - Response structure - Error responses Endpoints MUST include: - GET /api/{user_id}/tasks - POST /api/{user_id}/tasks - GET /api/{user_id}/tasks/{id} - PUT /api/{user_id}/tasks/{id} - DELETE /api/{user_id}/tasks/{id} - PATCH /api/{user_id}/tasks/{id}/complete Explicitly state: - user_id in URL MUST match authenticated user - Backend must reject mismatches with proper HTTP errors 6. specs/database/schema.md Define: - PostgreSQL schema using SQLModel concepts - users table (managed by Better Auth, referenced only) - tasks table with: - id - user_id (foreign key) - title - description - completed - created_at - updated_at - Indexing requirements - Referential integrity rules 7. specs/ui/pages.md Define required UI pages: - Signup - Login - Task list - Task create/edit - Logout behavior Define: - Which pages require authentication - High-level UX behavior (no styling code) 8. specs/ui/components.md Define reusable UI components: - Task list - Task item - Forms - Auth guard / protected layout STRICT SPEC RULES (NON-NEGOTIABLE): - Specs MUST be explicit enough that implementation decisions are obvious. - NO vague language like “should”, “maybe”, or “optional” for core logic. - If something is required, say MUST. - If something is forbidden, say MUST NOT. - Do NOT assume defaults. - Do NOT reference future phases unless explicitly stating extensibility. COMPLETION RULE: When ALL required spec files are written: - STOP immediately. - Do NOT generate plans, tasks, or code. - End with ONLY this confirmation message: "Phase 2 specifications complete. Ready for sp.plan." Wait for the user to provide the sp.plan prompt."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create Task (Priority: P1)

**Description**: As an authenticated user, I want to create a new task so that I can organize my to-do list.

**Why this priority**: Core functionality for any to-do application.

**Independent Test**: A user can successfully create a new task and see it appear in their list.

**Acceptance Scenarios**:

1.  **Given** an authenticated user, **When** they provide a valid task title and description, **Then** a new task is created and associated with their user ID.
2.  **Given** an authenticated user, **When** they attempt to create a task with an empty title, **Then** the system MUST return a 400 Bad Request error with a clear message.
3.  **Given** an unauthenticated user, **When** they attempt to create a task, **Then** the system MUST return a 401 Unauthorized error.

### User Story 2 - View Tasks (Priority: P1)

**Description**: As an authenticated user, I want to view a list of my tasks so that I can see what I need to do.

**Why this priority**: Essential for interacting with tasks after creation.

**Independent Test**: A user can successfully retrieve a list of their tasks.

**Acceptance Scenarios**:

1.  **Given** an authenticated user with existing tasks, **When** they request their tasks, **Then** the system MUST return a list containing only tasks belonging to that user.
2.  **Given** an authenticated user with no existing tasks, **When** they request their tasks, **Then** the system MUST return an empty list.
3.  **Given** an unauthenticated user, **When** they attempt to view tasks, **Then** the system MUST return a 401 Unauthorized error.
4.  **Given** User A, **When** they request tasks, **Then** the system MUST NOT return any tasks belonging to User B.

### User Story 3 - Update Task (Priority: P2)

**Description**: As an authenticated user, I want to update an existing task (title, description) so that I can keep my tasks current.

**Why this priority**: Allows modification of task details.

**Independent Test**: A user can successfully update their own task's details.

**Acceptance Scenarios**:

1.  **Given** an authenticated user and an existing task belonging to them, **When** they provide a valid new title or description, **Then** the task's details are updated.
2.  **Given** an authenticated user, **When** they attempt to update a task that does not belong to them, **Then** the system MUST return a 403 Forbidden or 404 Not Found error.
3.  **Given** an authenticated user, **When** they attempt to update a non-existent task, **Then** the system MUST return a 404 Not Found error.
4.  **Given** an unauthenticated user, **When** they attempt to update a task, **Then** the system MUST return a 401 Unauthorized error.

### User Story 4 - Delete Task (Priority: P2)

**Description**: As an authenticated user, I want to delete an existing task so that I can remove completed or irrelevant items.

**Why this priority**: Allows removal of tasks from the list.

**Independent Test**: A user can successfully delete their own task.

**Acceptance Scenarios**:

1.  **Given** an authenticated user and an existing task belonging to them, **When** they request to delete the task, **Then** the task is permanently removed from their list.
2.  **Given** an authenticated user, **When** they attempt to delete a task that does not belong to them, **Then** the system MUST return a 403 Forbidden or 404 Not Found error.
3.  **Given** an authenticated user, **When** they attempt to delete a non-existent task, **Then** the system MUST return a 404 Not Found error.
4.  **Given** an unauthenticated user, **When** they attempt to delete a task, **Then** the system MUST return a 401 Unauthorized error.

### User Story 5 - Toggle Completion (Priority: P1)

**Description**: As an authenticated user, I want to mark a task as completed or incomplete so that I can track my progress.

**Why this priority**: Essential for managing task status.

**Independent Test**: A user can successfully change the completion status of their own task.

**Acceptance Scenarios**:

1.  **Given** an authenticated user and an existing task belonging to them, **When** they request to toggle the task's completion status, **Then** the `completed` status of the task is updated.
2.  **Given** an authenticated user, **When** they attempt to toggle completion of a task that does not belong to them, **Then** the system MUST return a 403 Forbidden or 404 Not Found error.
3.  **Given** an authenticated user, **When** they attempt to toggle completion of a non-existent task, **Then** the system MUST return a 404 Not Found error.
4.  **Given** an unauthenticated user, **When** they attempt to toggle completion of a task, **Then** the system MUST return a 401 Unauthorized error.

## Requirements *(mandatory)*

### Explicit Requirements

-   Every task MUST belong to exactly one authenticated user.
-   No task can exist without a `user_id`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully perform all CRUD operations (Create, View, Update, Delete, Toggle Completion) on their own tasks.
- **SC-002**: Data validation rules are correctly applied to task creation and updates, rejecting invalid input.
- **SC-003**: Ownership enforcement is correctly implemented for all task operations, preventing unauthorized access or modification of other users' tasks.
- **SC-004**: Appropriate HTTP error codes (401 Unauthorized, 403 Forbidden, 404 Not Found, 400 Bad Request) are returned for all defined error cases.
