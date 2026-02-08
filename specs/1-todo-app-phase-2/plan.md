# Implementation Plan: Phase 2: Todo Full-Stack Web Application

**Branch**: `1-todo-app-phase-2` | **Date**: 2026-02-05 | **Spec**: [specs/1-todo-app-phase-2/overview.md](specs/1-todo-app-phase-2/overview.md)
**Input**: Feature specification from `/specs/1-todo-app-phase-2/*.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Primary requirement: Build a complete, multi-user, full-stack Todo web application (Phase II) as per the detailed specifications.
Technical approach: Monorepo with Next.js 16+ (Frontend), FastAPI (Backend), Neon Serverless PostgreSQL with SQLModel (Database), and Better Auth for JWT-based authentication.

## Technical Context

**Language/Version**: TypeScript (Next.js), Python 3.11+ (FastAPI, SQLModel)  
**Primary Dependencies**: Next.js 16+, React, FastAPI, SQLModel, Better Auth, Neon PostgreSQL client/ORM.  
**Storage**: Neon Serverless PostgreSQL  
**Testing**: Unit, Integration, End-to-End (frameworks TBD in tasks)  
**Target Platform**: Web (cross-browser compatible)  
**Project Type**: Web application (monorepo frontend + backend)  
**Performance Goals**: Critical API endpoints p95 latency < 200ms, > 100 requests/second.  
**Constraints**: No in-memory storage, JWT mandatory for all APIs, multi-user isolation enforced, WCAG 2.1 AA accessibility (MUST), no localization for Phase 2.  
**Scale/Scope**: Anticipate up to 10,000 users and 1 million tasks in 1-2 years. Horizontal scaling for backend, vertical for database.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

-   **NO DUMMY IMPLEMENTATIONS**: All implementations will use real production logic; no mock data or placeholder auth. (PASS)
-   **REAL FULL-STACK ARCHITECTURE IS MANDATORY**: Frontend (Next.js), Backend (FastAPI), Database (Neon Serverless PostgreSQL, SQLModel), Auth (Better Auth, JWT) are all real. (PASS)
-   **AUTHENTICATION & SECURITY ARE CRITICAL**: JWT issuance, verification, user identity extraction, and user isolation are explicitly planned. (PASS)
-   **MONOREPO + SPEC-KIT STRUCTURE IS REQUIRED**: Monorepo structure with `frontend/`, `backend/`, `specs/` will be established. (PASS)
-   **SPEC-FIRST WORKFLOW (NO EXCEPTIONS)**: This plan is derived directly from the Phase 2 specifications. (PASS)
-   **CONFIGURATION VS DUMMY (IMPORTANT DISTINCTION)**: External credentials will be environment variables, not hardcoded. (PASS)
-   **FUTURE-PROOFING**: Architecture is designed for extensibility (chatbots, event-driven systems). (PASS)

## Project Structure

### Documentation (this feature)

```text
specs/1-todo-app-phase-2/
├── plan.md              # This file (/sp.plan command output)
├── overview.md          # Overview specification
├── architecture.md      # Architecture specification
├── features/
│   ├── task-crud.md     # Task CRUD feature specification
│   └── authentication.md# Authentication feature specification
├── api/
│   └── rest-endpoints.md# REST API endpoints specification
├── database/
│   └── schema.md        # Database schema specification
└── ui/
    ├── pages.md         # UI pages specification
    └── components.md    # UI components specification
```

### Source Code (repository root)

```text
.
├── frontend/                     # Next.js 16+ App Router application
│   ├── app/                      # Next.js App Router pages and layouts
│   ├── components/               # Reusable UI components (Task List, Task Item, Forms, Auth Guard)
│   ├── lib/                      # API client, utility functions
│   └── public/                   # Static assets
├── backend/                      # FastAPI service
│   ├── app/                      # FastAPI application entry point
│   ├── api/v1/                   # REST API endpoints (tasks, auth)
│   ├── models/                   # SQLModel definitions (Task)
│   ├── crud/                     # CRUD operations logic
│   ├── services/                 # Business logic
│   ├── core/                     # Configuration, dependencies, security utils
│   └── db/                       # Database session, engine, migrations
├── specs/
│   └── 1-todo-app-phase-2/       # Feature specifications
├── .gemini/                      # CLI agent configuration and commands
└── .specify/                     # Spec-Kit Plus templates and scripts
```

**Structure Decision**: Monorepo with distinct `frontend/` and `backend/` directories at the root, and `specs/1-todo-app-phase-2/` for all feature-related documentation. This aligns with the "MONOREPO + SPEC-KIT STRUCTURE IS REQUIRED" constitution principle.

## 1. Repository & Environment Setup

1.  **Initialize Monorepo Structure**:
    *   Initialize Git repository at the project root if not already done.
    *   Create `frontend/` directory; run `npx create-next-app@latest frontend` within it (select TypeScript, App Router).
    *   Create `backend/` directory; set up a basic FastAPI project structure (e.g., using a virtual environment and installing `fastapi`, `uvicorn`, `SQLModel`).
    *   Ensure `specs/1-todo-app-phase-2/` and its subdirectories (`features/`, `api/`, `database/`, `ui/`) exist and contain the generated specification files.
2.  **Validate Spec-Kit Structure**:
    *   Confirm presence and correct structure of `.gemini/` and `.specify/` directories.
    *   Verify that all specification files in `specs/1-todo-app-phase-2/` conform to the Spec-Kit conventions.
3.  **Define Environment Variable Strategy**:
    *   Create a `.env` file at the project root.
    *   Document essential environment variables: `DATABASE_URL` (for Neon PostgreSQL), `JWT_SECRET_KEY` (for JWT signing/verification), `NEXT_PUBLIC_BACKEND_URL` (Frontend's access to Backend API).
    *   Ensure `frontend/` and `backend/` projects are configured to load these variables securely.
4.  **Establish Frontend and Backend Separation**:
    *   The `frontend/` Next.js application will only communicate with the `backend/` FastAPI service via defined HTTP REST APIs.
    *   The `backend/` FastAPI service will operate independently, handling all business logic, data persistence, and authentication logic.

## 2. Database Layer Plan

1.  **Design SQLModel Schema for Tasks**:
    *   Define the `Task` SQLModel class in `backend/app/models/task.py` with columns: `id` (UUID, PK), `user_id` (UUID, FK to `users` table), `title` (str), `description` (Optional[str]), `completed` (bool, default `False`), `created_at` (datetime), `updated_at` (datetime).
    *   Ensure `user_id` is a non-nullable `ForeignKey` referencing the `users` table.
2.  **Enforce User ↔ Task Relationship**:
    *   Implement the explicit one-to-many relationship between `User` (managed by Better Auth) and `Task` using SQLModel relationship fields.
    *   Configure `ON DELETE CASCADE` for the `user_id` foreign key in the `tasks` table, so tasks are automatically deleted when the associated user is removed.
3.  **Implement Migration Approach**:
    *   Set up Alembic within the `backend/` project for database schema management.
    *   Generate an initial Alembic migration script to create the `tasks` table, including all columns, the `user_id` foreign key constraint, and an index on `user_id`.
    *   Define a clear process for applying and reverting migrations.
4.  **Manage Neon PostgreSQL Connection**:
    *   Configure a SQLModel engine instance in `backend/app/db/` using the `DATABASE_URL` environment variable.
    *   Implement a FastAPI dependency (`backend/app/dependencies/db.py`) to provide a database session (`Session`) for each request, ensuring connections are managed through a connection pool (e.g., using `pool_size` and `max_overflow`).

## 3. Backend (FastAPI) Plan

1.  **FastAPI Application Bootstrap**:
    *   Initialize the main FastAPI application instance in `backend/app/main.py`.
    *   Integrate `CORSMiddleware` configured to allow requests from the frontend's origin (`NEXT_PUBLIC_FRONTEND_URL` environment variable).
    *   Include necessary `APIRouter` instances for authentication and task management endpoints.
    *   Implement structured logging configuration with correlation IDs to facilitate observability.
2.  **JWT Verification Middleware Design**:
    *   Develop a custom FastAPI dependency (`backend/app/dependencies/auth.py`) to handle JWT verification. This dependency will:
        *   Extract the JWT from the `Authorization: Bearer <token>` header.
        *   Verify the JWT signature using `JWT_SECRET_KEY`.
        *   Decode the token and extract `user_id` and `email`.
        *   Raise `HTTPException(401)` for invalid, expired, or missing tokens.
3.  **Dependency Injection for Authenticated User**:
    *   Create a FastAPI dependency that returns the authenticated `user_id` (UUID) extracted directly from the verified JWT.
    *   This dependency will be applied to all protected route handlers, ensuring `user_id` is never trusted from client input.
4.  **Route Layering and Ownership Enforcement**:
    *   Organize API endpoints using FastAPI's `APIRouter` (`backend/app/api/v1/`).
    *   For Task CRUD operations, ensure the `user_id` extracted from the JWT is used in all database queries to filter tasks.
    *   For endpoints like `/api/{user_id}/tasks/{id}`, explicitly compare the `{user_id}` path parameter with the authenticated `user_id`. If they do not match, return a `403 Forbidden` error.
    *   If a task is requested by `{id}` that belongs to another user, return `404 Not Found` to avoid information leakage.
5.  **Error-Handling Standards**:
    *   Implement custom exception handlers (`backend/app/core/exceptions.py`) to catch `HTTPException` and other common errors.
    *   Standardize error responses to a consistent JSON format (e.g., `{"detail": "Error message"}`).
    *   Ensure correct HTTP status codes are returned for all error conditions: `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `400 Bad Request`.

## 4. Authentication Integration Plan

1.  **Better Auth Configuration Strategy on Frontend**:
    *   Integrate the Better Auth client library into the Next.js `frontend/` project.
    *   Configure Better Auth for signup and signin forms, pointing to the appropriate backend authentication endpoints.
2.  **JWT Issuance and Expiry Handling**:
    *   Upon successful login/signup, the frontend will receive the JWT from the backend.
    *   The frontend MUST store this JWT securely in HTTP-only cookies to mitigate XSS attacks.
    *   Implement client-side logic to detect expired JWTs and trigger re-authentication or token refresh (if refresh tokens are added in future).
3.  **Shared Secret Usage Between Frontend and Backend**:
    *   Ensure the `JWT_SECRET_KEY` environment variable is consistently used by both frontend (for any necessary client-side JWT processing, e.g., decoding for display purposes) and backend (for signing and verification).
4.  **Token Transport Method (HTTP-only Cookies)**:
    *   Configure the frontend's API client (e.g., using `axios` or `fetch` with credential options) to automatically send the HTTP-only cookie containing the JWT with every authenticated request to the backend.
5.  **Logout and Invalid Token Behavior**:
    *   Frontend logout action will clear the HTTP-only cookie containing the JWT.
    *   Frontend API client will implement an interceptor to catch `401 Unauthorized` responses from the backend, trigger JWT removal, and redirect the user to the login page.

## 5. API Contract Enforcement Plan

1.  **Mapping Specs → Routes**:
    *   Each defined API endpoint (`GET /api/{user_id}/tasks`, `POST /api/{user_id}/tasks`, etc.) from `specs/1-todo-app-phase-2/api/rest-endpoints.md` will have a corresponding route decorator and handler function in FastAPI.
    *   Strict adherence to specified HTTP methods, paths, request/response body structures, and error responses will be maintained.
2.  **Ensuring URL user_id Matches Authenticated User**:
    *   For every API route containing `{user_id}` in the path, the backend will implement a comparison between this path parameter and the `user_id` obtained from the verified JWT.
    *   Any discrepancy MUST result in a `403 Forbidden` response, preventing URL tampering for unauthorized access.
3.  **Preventing Cross-User Access at Every Endpoint**:
    *   All database interactions for tasks (CRUD operations) will include the authenticated `user_id` as a mandatory filter, ensuring that users can only interact with their own data.
    *   If a request attempts to access a valid task ID that belongs to a different user, the API MUST respond with `404 Not Found` to prevent enumeration of other users' tasks.

## 6. Frontend (Next.js) Plan

1.  **App Router Structure**:
    *   Set up the Next.js project to use the App Router for defining pages and layouts.
    *   Create specific route segments for `/signup`, `/login`, `/tasks`, `/tasks/create`, and `/tasks/[id]/edit`.
2.  **Auth-Protected Routes Strategy**:
    *   Implement a `middleware.ts` or route-specific `AuthGuard` component (e.g., in a layout) to protect authenticated routes (`/tasks`, `/tasks/create`, `/tasks/[id]/edit`).
    *   This guard will check for the presence and validity of the authentication token (JWT in HTTP-only cookie) and redirect unauthenticated users to `/login` or `/signup`.
3.  **API Client Abstraction Plan**:
    *   Develop an API client module (`frontend/lib/api.ts`) responsible for making all HTTP requests to the FastAPI backend.
    *   This client will be configured to automatically include credentials (`withCredentials: true` for cookies) and handle `401 Unauthorized` responses by clearing authentication state and redirecting to the login page.
4.  **JWT Attachment to Every Request**:
    *   The browser will automatically send HTTP-only cookies containing the JWT with requests to the backend, so explicit manual attachment in the API client is not required for `fetch` or `axios` if `withCredentials` is used.
5.  **Error and Loading State Handling**:
    *   Implement React Query or SWR for data fetching, providing built-in loading and error states for UI components.
    *   Design generic UI components for displaying error messages and loading indicators across the application.

## 7. End-to-End Data Flow Plan

1.  **Signup → Login → Token Issuance**:
    *   User fills Signup form -> Frontend sends `POST /api/signup` -> Backend creates user, issues JWT -> Frontend stores JWT in HTTP-only cookie -> Frontend redirects to `/tasks`.
    *   User fills Login form -> Frontend sends `POST /api/signin` -> Backend authenticates, issues JWT -> Frontend stores JWT in HTTP-only cookie -> Frontend redirects to `/tasks`.
2.  **Authenticated API Request Lifecycle**:
    *   Frontend page (e.g., `/tasks`) attempts to fetch data -> Frontend API client makes `GET /api/{user_id}/tasks` request with JWT (via cookie) -> Backend verifies JWT and `user_id` matches, fetches tasks for that user -> Backend returns tasks -> Frontend renders tasks.
3.  **Task CRUD Lifecycle**:
    *   **Create**: User submits new task form -> Frontend sends `POST /api/{user_id}/tasks` -> Backend creates task, associates with user -> Frontend updates UI.
    *   **View**: User navigates to `/tasks` -> Frontend fetches tasks -> Backend returns user's tasks -> Frontend displays.
    *   **Update**: User edits task on `/tasks/[id]/edit` -> Frontend sends `PUT /api/{user_id}/tasks/{id}` -> Backend updates task -> Frontend updates UI.
    *   **Delete**: User clicks delete -> Frontend sends `DELETE /api/{user_id}/tasks/{id}` -> Backend deletes task -> Frontend removes task from UI.
    *   **Toggle Completion**: User clicks checkbox -> Frontend sends `PATCH /api/{user_id}/tasks/{id}/complete` -> Backend updates task status -> Frontend updates UI.
4.  **Data Persistence Verification**:
    *   Immediately after any modifying operation (Create, Update, Delete, Toggle), a subsequent read operation will verify the state change.
    *   Application restarts (both Frontend and Backend) will confirm all data persists correctly in Neon PostgreSQL.

## 8. Validation & Verification Plan

1.  **Verify No In-Memory Storage**:
    *   Conduct code review of `backend/` to ensure all state is explicitly handled by SQLModel/database interactions.
    *   Perform controlled restarts of the Backend service to confirm all user and task data is retrieved from Neon PostgreSQL and not lost.
2.  **Test User Isolation (User A vs User B)**:
    *   Develop automated end-to-end tests or manual test cases using two distinct user accounts.
    *   As User A: Create tasks.
    *   As User B: Attempt `GET /api/A_user_id/tasks`, `PUT /api/A_user_id/tasks/A_task_id`, `DELETE /api/A_user_id/tasks/A_task_id`. Expect `403 Forbidden` for `user_id` mismatch in URL, or `404 Not Found` if the task ID belongs to another user.
    *   As User B: Verify only User B's tasks are displayed on their task list page.
3.  **Confirm Auth Enforcement on All Routes**:
    *   Develop automated integration tests to call all protected API endpoints (`/api/{user_id}/tasks`, etc.) without providing a JWT (expect `401 Unauthorized`).
    *   Test with an invalid/expired JWT (expect `401 Unauthorized`).
    *   Verify public endpoints (`/api/signup`, `/api/signin`) remain accessible without authentication.
4.  **Restart-Resilience Checks (DB Persistence)**:
    *   Execute a full test suite involving creation, modification, and deletion of tasks.
    *   Initiate a graceful shutdown and restart of the Backend (FastAPI) and then the Frontend (Next.js).
    *   Upon restart, verify that all task data (titles, descriptions, completion status, ownership) is exactly as it was before the shutdown, demonstrating persistence in Neon PostgreSQL.

## 9. Documentation & Handoff Plan

1.  **Update Root README.md**:
    *   Provide a clear overview of the monorepo structure and how to navigate `frontend/` and `backend/`.
    *   Include "Getting Started" instructions for cloning, setting up environment variables, installing dependencies, and running both frontend and backend development servers.
2.  **Create Environment Setup Document**:
    *   Develop `docs/ENVIRONMENT_SETUP.md` with detailed, step-by-step instructions for installing Python, Node.js, virtual environment setup, and configuring `DATABASE_URL` for Neon PostgreSQL.
3.  **List User-Required Configuration Steps**:
    *   In `docs/ENVIRONMENT_SETUP.md`, explicitly list all environment variables (`DATABASE_URL`, `JWT_SECRET_KEY`, `NEXT_PUBLIC_BACKEND_URL`) with their purpose, required format, and where they should be set (e.g., root `.env` file).
    *   Provide example values (e.g., `DATABASE_URL=postgresql://user:password@host/db`).
4.  **Reviewer Verification Guide**:
    *   Create a `docs/VERIFICATION_GUIDE.md` document.
    *   Outline clear steps for reviewers to verify successful implementation, covering:
        *   Running application locally.
        *   Testing user signup/login/logout flow.
        *   Verifying task CRUD operations.
        *   Explicit steps to test user isolation (User A vs. User B).
        *   Steps to confirm JWT authentication enforcement.
        *   Instructions to check data persistence across restarts.
    *   Cross-reference relevant sections of the `specs/` and `plan.md` documents.
