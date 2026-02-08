# Feature Specification: Phase 2: Todo Full-Stack Web Application Architecture

**Feature Branch**: `1-todo-app-phase-2`  
**Created**: 2026-02-05  
**Status**: Draft  
**Input**: User description: "You are now operating under the previously accepted project constitution. Your task in THIS STEP is to PRODUCE COMPLETE, EXPLICIT, AND REVIEWER-PROOF SPECIFICATIONS for Hackathon II – Phase 2: Todo Full-Stack Web Application. DO NOT generate plans, tasks, or implementation. DO NOT write code. ONLY write specifications. SCOPE OF SPECIFICATION (MANDATORY): You must create or update the following specs under the /specs directory, strictly following Spec-Kit conventions and monorepo structure. 1. specs/overview.md Include: - Project purpose (evolution from CLI to full-stack web app) - Current phase: Phase II – Full-Stack Web Application - Clear definition of “Phase 2 complete” - High-level architecture summary (Frontend, Backend, Database, Auth) - Explicit statement that: - No in-memory storage is allowed - JWT authentication is mandatory for all APIs - Multi-user isolation is enforced everywhere 2. specs/architecture.md Define: - Monorepo architecture (frontend/, backend/, specs/) - Responsibility boundaries: - Frontend (Next.js + Better Auth) - Backend (FastAPI + SQLModel) - Database (Neon PostgreSQL) - Auth flow using JWT: - Token issuance - Token transport - Token verification - User identity extraction - How user isolation is enforced end-to-end - How this architecture remains extensible for future phases 3. specs/features/task-crud.md Define: - User stories for all 5 basic features: - Create task - View tasks - Update task - Delete task - Toggle completion - Acceptance criteria for EACH operation: - Validation rules - Ownership enforcement - Error cases (401, 403, 404) - Explicit requirement: - Every task MUST belong to exactly one authenticated user - No task can exist without a user_id 4. specs/features/authentication.md Define: - Signup and signin using Better Auth (frontend) - JWT issuance requirements: - Token contents (user_id, email) - Expiry expectations - Security requirements: - Backend never trusts client-provided user_id - Backend derives user identity ONLY from JWT - Logout behavior - Failure cases (invalid token, expired token) 5. specs/api/rest-endpoints.md Define ALL REST endpoints explicitly, including: - Method - Path - Authentication requirement (JWT mandatory) - Request headers - Request body (if any) - Response structure - Error responses Endpoints MUST include: - GET /api/{user_id}/tasks - POST /api/{user_id}/tasks - - GET /api/{user_id}/tasks/{id} - PUT /api/{user_id}/tasks/{id} - DELETE /api/{user_id}/tasks/{id} - PATCH /api/{user_id}/tasks/{id}/complete Explicitly state: - user_id in URL MUST match authenticated user - Backend must reject mismatches with proper HTTP errors 6. specs/database/schema.md Define: - PostgreSQL schema using SQLModel concepts - users table (managed by Better Auth, referenced only) - tasks table with: - id - user_id (foreign key) - title - description - completed - created_at - updated_at - Indexing requirements - Referential integrity rules 7. specs/ui/pages.md Define required UI pages: - Signup - Login - Task list - Task create/edit - Logout behavior Define: - Which pages require authentication - High-level UX behavior (no styling code) 8. specs/ui/components.md Define reusable UI components: - Task list - Task item - Forms - Auth guard / protected layout STRICT SPEC RULES (NON-NEGOTIABLE): - Specs MUST be explicit enough that implementation decisions are obvious. - NO vague language like “should”, “maybe”, or “optional” for core logic. - If something is required, say MUST. - If something is forbidden, say MUST NOT. - Do NOT assume defaults. - Do NOT reference future phases unless explicitly stating extensibility. COMPLETION RULE: When ALL required spec files are written: - STOP immediately. - Do NOT generate plans, tasks, or code. - End with ONLY this confirmation message: "Phase 2 specifications complete. Ready for sp.plan." Wait for the user to provide the sp.plan prompt."

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### Architecture Overview

This document defines the architecture for the "Hackathon II – Phase 2: Todo Full-Stack Web Application," adhering to a monorepo structure and specifying the responsibilities of each component, the authentication flow, user isolation enforcement, and extensibility.

## Requirements *(mandatory)*

### Monorepo Architecture

The project MUST utilize a monorepo structure with the following top-level directories:
- `frontend/`: Contains the Next.js application.
- `backend/`: Contains the FastAPI service.
- `specs/`: Contains all feature specifications and documentation.

### Responsibility Boundaries

-   **Frontend (Next.js + Better Auth)**:
    -   Handles user interface rendering and interactions.
    -   Manages user authentication flow (login, signup, logout) using Better Auth.
    -   Communicates with the Backend API using JWTs for authenticated requests.
    -   Does NOT store sensitive user information directly.
-   **Backend (FastAPI + SQLModel)**:
    -   Exposes RESTful API endpoints for tasks and authentication.
    -   Implements business logic for task management.
    -   Interacts with the PostgreSQL database via SQLModel.
    -   Verifies JWTs for every authenticated request to establish user identity.
    -   Enforces user isolation for all data operations.
-   **Database (Neon PostgreSQL)**:
    -   Provides persistent storage for all application data (users, tasks).
    -   Ensures data integrity and reliability.
    -   Managed by SQLModel on the Backend.

### Authentication Flow using JWT

-   **Token Issuance**:
    -   Upon successful user login via the Frontend (Better Auth), a JWT MUST be issued by the Backend.
    -   The JWT MUST contain `user_id` and `email` claims.
    -   The JWT MUST have a defined expiry time.
-   **Token Transport**:
    -   The issued JWT MUST be securely stored on the Frontend (e.g., in HTTP-only cookies or local storage, depending on security best practices for Next.js).
    -   For every authenticated Backend API request, the Frontend MUST include the JWT in the `Authorization: Bearer <token>` header.
-   **Token Verification**:
    -   The Backend (FastAPI) MUST intercept all authenticated API requests.
    -   The Backend MUST verify the JWT signature using a shared secret.
    -   Requests with invalid, expired, or missing JWTs MUST be rejected with appropriate HTTP status codes (e.g., 401 Unauthorized).
-   **User Identity Extraction**:
    -   After successful JWT verification, the Backend MUST extract the `user_id` and `email` claims from the token.
    -   The Backend MUST NEVER trust `user_id` or `email` provided directly in the request body or URL. User identity MUST ONLY be derived from the verified JWT.

### User Isolation Enforcement End-to-End

-   The Backend MUST filter all database queries by the authenticated user's `user_id` (derived from the JWT).
-   User A MUST NEVER see or modify User B’s data under any condition. This applies to all CRUD operations on tasks and any future user-specific data.
-   Attempts by a user to access or modify data belonging to another user MUST result in a `403 Forbidden` or `404 Not Found` response.

### Extensibility for Future Phases

-   The modular design of the monorepo, with clear separation of Frontend, Backend, and database concerns, MUST allow for independent evolution.
-   The use of FastAPI and Next.js, combined with a SQL-based database, provides a flexible foundation for adding future features, including real-time communication (e.g., websockets for chatbot), event-driven systems, and additional MCP tools.
-   API contracts and database schema MUST be designed to accommodate future expansion without requiring major refactoring of existing functionalities.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The monorepo structure is correctly implemented, with distinct `frontend/`, `backend/`, and `specs/` directories at the project root.
- **SC-002**: All API endpoints correctly enforce JWT authentication, rejecting unauthorized access.
- **SC-003**: User identity is consistently and securely derived from JWTs on the backend, without reliance on client-provided `user_id`.
- **SC-004**: Data isolation between users is strictly maintained, verified by preventing User A from accessing User B's data through any API call.
- **SC-005**: The architecture facilitates the clear addition of new features without disrupting existing components, demonstrating its extensibility.

## Clarifications
### Session 2026-02-05
- Q: What are the specific performance targets (e.g., latency, throughput) for critical API endpoints? → A: Critical API endpoints should aim for p95 latency under 200ms and support at least 100 requests per second.
- Q: What are the requirements for observability (logging, metrics, tracing) in the backend and frontend components? → A: Backend MUST implement structured logging with correlation IDs, expose Prometheus metrics for key operations, and support distributed tracing (e.g., OpenTelemetry). Frontend SHOULD implement client-side error logging and basic performance metrics.
- Q: Are there any specific accessibility (e.g., WCAG compliance) or localization requirements for the user interface? → A: Accessibility (WCAG 2.1 AA) is a MUST. Localization is NOT required for Phase 2.
- Q: What are the expected data volumes (e.g., number of users, tasks) and anticipated scaling needs over the next 1-2 years? → A: Anticipate up to 10,000 users and 1 million tasks in 1-2 years. Scaling horizontally for the backend and vertically for the database is preferred.
- Q: Which storage mechanism is preferred for JWTs on the Frontend? → A: Use HTTP-only cookies for JWT storage to mitigate XSS attacks.