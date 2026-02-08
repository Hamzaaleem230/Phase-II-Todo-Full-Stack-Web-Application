# Feature Specification: REST API Endpoints

**Feature Branch**: `1-todo-app-phase-2`  
**Created**: 2026-02-05  
**Status**: Draft  
**Input**: User description: "You are now operating under the previously accepted project constitution. Your task in THIS STEP is to PRODUCE COMPLETE, EXPLICIT, AND REVIEWER-PROOF SPECIFICATIONS for Hackathon II – Phase 2: Todo Full-Stack Web Application. DO NOT generate plans, tasks, or implementation. DO NOT write code. ONLY write specifications. SCOPE OF SPECIFICATION (MANDATORY): You must create or update the following specs under the /specs directory, strictly following Spec-Kit conventions and monorepo structure. 1. specs/overview.md Include: - Project purpose (evolution from CLI to full-stack web app) - Current phase: Phase II – Full-Stack Web Application - Clear definition of “Phase 2 complete” - High-level architecture summary (Frontend, Backend, Database, Auth) - Explicit statement that: - No in-memory storage is allowed - JWT authentication is mandatory for all APIs - Multi-user isolation is enforced everywhere 2. specs/architecture.md Define: - Monorepo architecture (frontend/, backend/, specs/) - Responsibility boundaries: - Frontend (Next.js + Better Auth) - Backend (FastAPI + SQLModel) - Database (Neon PostgreSQL) - Auth flow using JWT: - Token issuance - Token transport - Token verification - User identity extraction - How user isolation is enforced end-to-end - How this architecture remains extensible for future phases 3. specs/features/task-crud.md Define: - User stories for all 5 basic features: - Create task - View tasks - Update task - Delete task - Toggle completion - Acceptance criteria for EACH operation: - Validation rules - Ownership enforcement - Error cases (401, 403, 404) - Explicit requirement: - Every task MUST belong to exactly one authenticated user - No task can exist without a user_id 4. specs/features/authentication.md Define: - Signup and signin using Better Auth (frontend) - JWT issuance requirements: - Token contents (user_id, email) - Expiry expectations - Security requirements: - Backend never trusts client-provided user_id - Backend derives user identity ONLY from JWT - Logout behavior - Failure cases (invalid token, expired token) 5. specs/api/rest-endpoints.md Define ALL REST endpoints explicitly, including: - Method - Path - Authentication requirement (JWT mandatory) - Request headers - Request body (if any) - Response structure - Error responses Endpoints MUST include: - GET /api/{user_id}/tasks - POST /api/{user_id}/tasks - GET /api/{user_id}/tasks/{id} - PUT /api/{user_id}/tasks/{id} - DELETE /api/{user_id}/tasks/{id} - PATCH /api/{user_id}/tasks/{id}/complete Explicitly state: - user_id in URL MUST match authenticated user - Backend must reject mismatches with proper HTTP errors 6. specs/database/schema.md Define: - PostgreSQL schema using SQLModel concepts - users table (managed by Better Auth, referenced only) - tasks table with: - id - user_id (foreign key) - title - description - completed - created_at - updated_at - Indexing requirements - Referential integrity rules 7. specs/ui/pages.md Define required UI pages: - Signup - Login - Task list - Task create/edit - Logout behavior Define: - Which pages require authentication - High-level UX behavior (no styling code) 8. specs/ui/components.md Define reusable UI components: - Task list - Task item - Forms - Auth guard / protected layout STRICT SPEC RULES (NON-NEGOTIABLE): - Specs MUST be explicit enough that implementation decisions are obvious. - NO vague language like “should”, “maybe”, or “optional” for core logic. - If something is required, say MUST. - If something is forbidden, say MUST NOT. - Do NOT assume defaults. - Do NOT reference future phases unless explicitly stating extensibility. COMPLETION RULE: When ALL required spec files are written: - STOP immediately. - Do NOT generate plans, tasks, or code. - End with ONLY this confirmation message: "Phase 2 specifications complete. Ready for sp.plan." Wait for the user to provide the sp.plan prompt."

## User Scenarios & Testing *(mandatory)*

### API Endpoints Overview

This document explicitly defines all REST API endpoints for the Todo Full-Stack Web Application, including methods, paths, authentication requirements, request/response structures, and error handling.

## Requirements *(mandatory)*

### General API Requirements

-   All API endpoints MUST be defined using RESTful principles.
-   Authentication via JWT is MANDATORY for all endpoints unless explicitly stated otherwise (e.g., signup/signin endpoints might have different auth mechanisms initially).
-   Request headers for authenticated requests MUST include `Authorization: Bearer <token>`.
-   All responses MUST be in JSON format.
-   Error responses MUST follow a consistent structure.

### Endpoints

#### 1. Signup Endpoint

-   **Method**: `POST`
-   **Path**: `/api/signup` (or similar, managed by Better Auth on Backend)
-   **Authentication**: None (public endpoint)
-   **Request Headers**: `Content-Type: application/json`
-   **Request Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "secure_password"
    }
    ```
-   **Response Structure (Success 201 Created)**:
    ```json
    {
        "message": "User registered successfully",
        "user_id": "uuid_of_new_user",
        "email": "user@example.com"
    }
    ```
-   **Error Responses**:
    -   `400 Bad Request`: Invalid input (e.g., malformed email, weak password).
    -   `409 Conflict`: Email already registered.

#### 2. Signin Endpoint

-   **Method**: `POST`
-   **Path**: `/api/signin` (or similar, managed by Better Auth on Backend)
-   **Authentication**: None (public endpoint)
-   **Request Headers**: `Content-Type: application/json`
-   **Request Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "secure_password"
    }
    ```
-   **Response Structure (Success 200 OK)**:
    ```json
    {
        "message": "Login successful",
        "access_token": "jwt_token_string",
        "token_type": "bearer",
        "expires_in": 3600 // seconds
    }
    ```
-   **Error Responses**:
    -   `401 Unauthorized`: Invalid credentials (e.g., incorrect email or password).
    -   `400 Bad Request`: Malformed request.

#### 3. Get All Tasks for a User

-   **Method**: `GET`
-   **Path**: `/api/{user_id}/tasks`
-   **Authentication**: JWT Mandatory
-   **Request Headers**: `Authorization: Bearer <token>`
-   **Request Body**: None
-   **Response Structure (Success 200 OK)**:
    ```json
    [
        {
            "id": "task_uuid_1",
            "user_id": "user_uuid",
            "title": "Buy groceries",
            "description": "Milk, eggs, bread",
            "completed": false,
            "created_at": "2026-02-05T12:00:00Z",
            "updated_at": "2026-02-05T12:00:00Z"
        },
        {
            "id": "task_uuid_2",
            "user_id": "user_uuid",
            "title": "Walk the dog",
            "description": null,
            "completed": true,
            "created_at": "2026-02-04T10:00:00Z",
            "updated_at": "2026-02-04T11:00:00Z"
        }
    ]
    ```
-   **Error Responses**:
    -   `401 Unauthorized`: Invalid or missing JWT.
    -   `403 Forbidden`: Authenticated `user_id` does not match `user_id` in URL.

#### 4. Create New Task for a User

-   **Method**: `POST`
-   **Path**: `/api/{user_id}/tasks`
-   **Authentication**: JWT Mandatory
-   **Request Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
-   **Request Body**:
    ```json
    {
        "title": "New Task Title",
        "description": "Optional description for the task"
    }
    ```
-   **Response Structure (Success 201 Created)**:
    ```json
    {
        "id": "new_task_uuid",
        "user_id": "user_uuid",
        "title": "New Task Title",
        "description": "Optional description for the task",
        "completed": false,
        "created_at": "2026-02-05T12:30:00Z",
        "updated_at": "2026-02-05T12:30:00Z"
    }
    ```
-   **Error Responses**:
    -   `401 Unauthorized`: Invalid or missing JWT.
    -   `403 Forbidden`: Authenticated `user_id` does not match `user_id` in URL.
    -   `400 Bad Request`: Invalid input (e.g., empty title).

#### 5. Get Single Task for a User

-   **Method**: `GET`
-   **Path**: `/api/{user_id}/tasks/{id}`
-   **Authentication**: JWT Mandatory
-   **Request Headers**: `Authorization: Bearer <token>`
-   **Request Body**: None
-   **Response Structure (Success 200 OK)**:
    ```json
    {
        "id": "task_uuid_1",
        "user_id": "user_uuid",
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "completed": false,
        "created_at": "2026-02-05T12:00:00Z",
        "updated_at": "2026-02-05T12:00:00Z"
    }
    ```
-   **Error Responses**:
    -   `401 Unauthorized`: Invalid or missing JWT.
    -   `403 Forbidden`: Authenticated `user_id` does not match `user_id` in URL.
    -   `404 Not Found`: Task with `{id}` not found or does not belong to the authenticated user.

#### 6. Update Single Task for a User

-   **Method**: `PUT`
-   **Path**: `/api/{user_id}/tasks/{id}`
-   **Authentication**: JWT Mandatory
-   **Request Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
-   **Request Body**:
    ```json
    {
        "title": "Updated Task Title",
        "description": "Updated description",
        "completed": true
    }
    ```
-   **Response Structure (Success 200 OK)**:
    ```json
    {
        "id": "task_uuid_1",
        "user_id": "user_uuid",
        "title": "Updated Task Title",
        "description": "Updated description",
        "completed": true,
        "created_at": "2026-02-05T12:00:00Z",
        "updated_at": "2026-02-05T13:00:00Z"
    }
    ```
-   **Error Responses**:
    -   `401 Unauthorized`: Invalid or missing JWT.
    -   `403 Forbidden`: Authenticated `user_id` does not match `user_id` in URL.
    -   `404 Not Found`: Task with `{id}` not found or does not belong to the authenticated user.
    -   `400 Bad Request`: Invalid input (e.g., empty title).

#### 7. Delete Single Task for a User

-   **Method**: `DELETE`
-   **Path**: `/api/{user_id}/tasks/{id}`
-   **Authentication**: JWT Mandatory
-   **Request Headers**: `Authorization: Bearer <token>`
-   **Request Body**: None
-   **Response Structure (Success 204 No Content)**: (Empty body)
-   **Error Responses**:
    -   `401 Unauthorized`: Invalid or missing JWT.
    -   `403 Forbidden`: Authenticated `user_id` does not match `user_id` in URL.
    -   `404 Not Found`: Task with `{id}` not found or does not belong to the authenticated user.

#### 8. Toggle Task Completion for a User

-   **Method**: `PATCH`
-   **Path**: `/api/{user_id}/tasks/{id}/complete`
-   **Authentication**: JWT Mandatory
-   **Request Headers**: `Authorization: Bearer <token>`
-   **Request Body**: None
-   **Response Structure (Success 200 OK)**:
    ```json
    {
        "id": "task_uuid_1",
        "user_id": "user_uuid",
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "completed": true, // or false
        "created_at": "2026-02-05T12:00:00Z",
        "updated_at": "2026-02-05T13:30:00Z"
    }
    ```
-   **Error Responses**:
    -   `401 Unauthorized`: Invalid or missing JWT.
    -   `403 Forbidden`: Authenticated `user_id` does not match `user_id` in URL.
    -   `404 Not Found`: Task with `{id}` not found or does not belong to the authenticated user.

### Explicit State Requirements

-   The `user_id` in the URL path (e.g., `/api/{user_id}/tasks`) MUST match the `user_id` extracted from the authenticated user's JWT.
-   The Backend MUST reject any request where the `user_id` in the URL does not match the authenticated user's `user_id`, returning an appropriate HTTP error (e.g., `403 Forbidden`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All defined REST endpoints function correctly, returning expected responses for valid requests.
- **SC-002**: JWT authentication is strictly enforced on all protected endpoints, correctly rejecting unauthorized attempts.
- **SC-003**: The `user_id` in the URL path is consistently validated against the authenticated user's ID, with all mismatches resulting in a `403 Forbidden` error.
- **SC-004**: All specified error responses (401, 403, 404, 400) are returned accurately under their respective conditions.
