# Feature Specification: User Authentication

**Feature Branch**: `1-todo-app-phase-2`  
**Created**: 2026-02-05  
**Status**: Draft  
**Input**: User description: "You are now operating under the previously accepted project constitution. Your task in THIS STEP is to PRODUCE COMPLETE, EXPLICIT, AND REVIEWER-PROOF SPECIFICATIONS for Hackathon II – Phase 2: Todo Full-Stack Web Application. DO NOT generate plans, tasks, or implementation. DO NOT write code. ONLY write specifications. SCOPE OF SPECIFICATION (MANDATORY): You must create or update the following specs under the /specs directory, strictly following Spec-Kit conventions and monorepo structure. 1. specs/overview.md Include: - Project purpose (evolution from CLI to full-stack web app) - Current phase: Phase II – Full-Stack Web Application - Clear definition of “Phase 2 complete” - High-level architecture summary (Frontend, Backend, Database, Auth) - Explicit statement that: - No in-memory storage is allowed - JWT authentication is mandatory for all APIs - Multi-user isolation is enforced everywhere 2. specs/architecture.md Define: - Monorepo architecture (frontend/, backend/, specs/) - Responsibility boundaries: - Frontend (Next.js + Better Auth) - Backend (FastAPI + SQLModel) - Database (Neon PostgreSQL) - Auth flow using JWT: - Token issuance - Token transport - Token verification - User identity extraction - How user isolation is enforced end-to-end - How this architecture remains extensible for future phases 3. specs/features/task-crud.md Define: - User stories for all 5 basic features: - Create task - View tasks - Update task - Delete task - Toggle completion - Acceptance criteria for EACH operation: - Validation rules - Ownership enforcement - Error cases (401, 403, 404) - Explicit requirement: - Every task MUST belong to exactly one authenticated user - No task can exist without a user_id 4. specs/features/authentication.md Define: - Signup and signin using Better Auth (frontend) - JWT issuance requirements: - Token contents (user_id, email) - Expiry expectations - Security requirements: - Backend never trusts client-provided user_id - Backend derives user identity ONLY from JWT - Logout behavior - Failure cases (invalid token, expired token) 5. specs/api/rest-endpoints.md Define ALL REST endpoints explicitly, including: - Method - Path - Authentication requirement (JWT mandatory) - Request headers - Request body (if any) - Response structure - Error responses Endpoints MUST include: - GET /api/{user_id}/tasks - POST /api/{user_id}/tasks - GET /api/{user_id}/tasks/{id} - PUT /api/{user_id}/tasks/{id} - DELETE /api/{user_id}/tasks/{id} - PATCH /api/{user_id}/tasks/{id}/complete Explicitly state: - user_id in URL MUST match authenticated user - Backend must reject mismatches with proper HTTP errors 6. specs/database/schema.md Define: - PostgreSQL schema using SQLModel concepts - users table (managed by Better Auth, referenced only) - tasks table with: - id - user_id (foreign key) - title - description - completed - created_at - updated_at - Indexing requirements - Referential integrity rules 7. specs/ui/pages.md Define required UI pages: - Signup - Login - Task list - Task create/edit - Logout behavior Define: - Which pages require authentication - High-level UX behavior (no styling code) 8. specs/ui/components.md Define reusable UI components: - Task list - Task item - Forms - Auth guard / protected layout STRICT SPEC RULES (NON-NEGOTIABLE): - Specs MUST be explicit enough that implementation decisions are obvious. - NO vague language like “should”, “maybe”, or “optional” for core logic. - If something is required, say MUST. - If something is forbidden, say MUST NOT. - Do NOT assume defaults. - Do NOT reference future phases unless explicitly stating extensibility. COMPLETION RULE: When ALL required spec files are written: - STOP immediately. - Do NOT generate plans, tasks, or code. - End with ONLY this confirmation message: "Phase 2 specifications complete. Ready for sp.plan." Wait for the user to provide the sp.plan prompt."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - User Signup (Priority: P1)

**Description**: As a new user, I want to create an account so that I can use the task management application.

**Why this priority**: Essential for onboarding new users.

**Independent Test**: A new user can successfully register an account with unique credentials.

**Acceptance Scenarios**:

1.  **Given** a user who does not have an account, **When** they provide a unique email and a valid password, **Then** a new user account is created, and they are automatically logged in.
2.  **Given** a user, **When** they attempt to sign up with an email that is already registered, **Then** the system MUST return an appropriate error message indicating the email is taken.
3.  **Given** a user, **When** they provide an invalid email format or a weak password (e.g., less than 8 characters), **Then** the system MUST reject the signup attempt with clear validation errors.

### User Story 2 - User Login (Priority: P1)

**Description**: As an existing user, I want to log in to my account so that I can access my tasks.

**Why this priority**: Core functionality for returning users.

**Independent Test**: An existing user can successfully log in with their credentials.

**Acceptance Scenarios**:

1.  **Given** a registered user, **When** they provide their correct email and password, **Then** they are successfully authenticated and receive a JWT.
2.  **Given** a user, **When** they provide incorrect login credentials (email or password), **Then** the system MUST return an authentication failure error.
3.  **Given** a user, **When** they provide valid credentials but their account is inactive/locked, **Then** the system MUST return an appropriate error.

### User Story 3 - User Logout (Priority: P2)

**Description**: As a logged-in user, I want to log out of my account so that I can secure my session.

**Why this priority**: Ensures session termination for security.

**Independent Test**: A logged-in user can successfully log out.

**Acceptance Scenarios**:

1.  **Given** a logged-in user, **When** they initiate the logout process, **Then** their current session is terminated, and the JWT is invalidated/removed from the client.
2.  **Given** a user, **When** they attempt to access protected resources after logging out, **Then** the system MUST return a 401 Unauthorized error.

## Requirements *(mandatory)*

### Signup and Signin using Better Auth (Frontend)

-   The Frontend MUST provide user interfaces for both signup and signin.
-   Authentication interactions (sending credentials, receiving tokens) MUST leverage Better Auth on the Frontend.

### JWT Issuance Requirements

-   Upon successful authentication (signup or signin), the Backend MUST issue a JSON Web Token (JWT).
-   **Token Contents**: The JWT payload MUST contain at least the following claims:
    -   `user_id`: The unique identifier for the authenticated user.
    -   `email`: The email address of the authenticated user.
-   **Expiry Expectations**: The JWT MUST have a clearly defined expiration time (e.g., 15 minutes for access tokens, with a longer-lived refresh token mechanism if implemented for better UX).

### Security Requirements

-   The Backend MUST NEVER trust client-provided `user_id` or `email` in API requests (e.g., in request body or URL).
-   The Backend MUST derive user identity ONLY from the verified JWT present in the `Authorization: Bearer <token>` header.
-   All requests to protected API endpoints MUST be validated with a valid, non-expired JWT.

### Logout Behavior

-   Initiating logout from the Frontend MUST result in the client-side removal or invalidation of the JWT.
-   Backend-side JWT invalidation (e.g., via a blacklist/revocation list) is OPTIONAL for access tokens (given short expiry) but RECOMMENDED for refresh tokens if present.

### Failure Cases

-   **Invalid Token**: Attempts to access protected resources with a syntactically malformed or invalid JWT MUST result in a `401 Unauthorized` error.
-   **Expired Token**: Attempts to access protected resources with an expired JWT MUST result in a `401 Unauthorized` error.
-   **Missing Token**: Requests to protected resources without an `Authorization: Bearer` header MUST result in a `401 Unauthorized` error.
-   **Incorrect Credentials**: Signin attempts with incorrect email/password MUST result in an authentication failure message (e.g., `401 Unauthorized` or `400 Bad Request` with specific error details).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: New users can successfully sign up and log in, receiving a valid JWT.
- **SC-002**: Existing users can successfully log in with correct credentials and obtain a valid JWT.
- **SC-003**: Unauthorized access attempts (invalid, expired, or missing JWTs; incorrect credentials) are consistently rejected with appropriate HTTP status codes.
- **SC-004**: User identity on the backend is exclusively derived from the verified JWT, ensuring security and data integrity.
- **SC-005**: Users can successfully log out, terminating their session and invalidating client-side JWTs.
