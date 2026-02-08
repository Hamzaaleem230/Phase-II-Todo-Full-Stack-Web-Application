# Tasks: Phase 2: Todo Full-Stack Web Application

**Input**: Design documents from `/specs/1-todo-app-phase-2/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Not generating explicit test tasks in this list, but testing is implied within implementation for quality.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

-   **[P]**: Can run in parallel (different files, no dependencies)
-   **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
-   Include exact file paths in descriptions

## Path Conventions

-   **Web app**: `backend/app/`, `frontend/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

### 1. Repository & Environment Setup

-   [x] T001 Initialize Git repository at project root (`.`).
-   [x] T002 Create `frontend/` directory and run `npx create-next-app@latest frontend` inside it (`frontend/`).
-   [x] T003 Create `backend/` directory and set up a basic FastAPI project (`backend/`).
-   [x] T004 Ensure `specs/1-todo-app-phase-2/` and its subdirectories exist (`specs/1-todo-app-phase-2/`).
-   [x] T005 [P] Validate presence and structure of `.gemini/` and `.specify/` directories (`.gemini/`, `.specify/`).
-   [x] T006 [P] Create `.env` file at project root for `DATABASE_URL`, `JWT_SECRET_KEY`, `NEXT_PUBLIC_BACKEND_URL` (`.env`).
-   [x] T007 [P] Configure `frontend/` to load environment variables securely (`frontend/`).
-   [x] T008 [P] Configure `backend/` to load environment variables securely (`backend/`).
-   [x] T009 Document required environment variables in a new `docs/ENVIRONMENT_SETUP.md` file (`docs/ENVIRONMENT_SETUP.md`).

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### 2. Database Tasks

-   [x] T010 Define `Task` SQLModel class in `backend/app/models/task.py` with `id`, `user_id`, `title`, `description`, `completed`, `created_at`, `updated_at` (`backend/app/models/task.py`).
-   [x] T011 Ensure `Task.user_id` is non-nullable `ForeignKey` referencing `users` table, and `ON DELETE CASCADE` is set (`backend/app/models/task.py`).
-   [x] T012 Set up Alembic for database migrations within `backend/` (`backend/`).
-   [x] T013 Generate initial Alembic migration script to create the `tasks` table with all specified constraints and index (`backend/alembic/versions/*.py`).
-   [x] T014 Configure SQLModel engine in `backend/app/db/` using `DATABASE_URL` (`backend/app/db/`).
-   [x] T015 Implement FastAPI dependency for database session management (`backend/app/dependencies/db.py`).

### 3. Backend (FastAPI) Tasks

-   [x] T016 Initialize main FastAPI application in `backend/app/main.py` (`backend/app/main.py`).
-   [x] T017 Integrate `CORSMiddleware` with frontend's origin (`backend/app/main.py`).
-   [x] T018 Implement structured logging configuration with correlation IDs (`backend/app/core/logging.py`).
-   [x] T019 Develop custom exception handlers for `HTTPException` (`backend/app/core/exceptions.py`).
-   [x] T020 Implement JWT verification dependency (`backend/app/dependencies/auth.py`).
-   [x] T021 Create FastAPI dependency to inject authenticated `user_id` from JWT (`backend/app/dependencies/auth.py`).
-   [x] T022 Organize API endpoints using `APIRouter` (`backend/app/api/v1/`).

### 4. Authentication Tasks

-   [x] T023 Integrate Better Auth library into Next.js `frontend/` project (`frontend/`).
-   [ ] T024 Configure Frontend for signup and signin forms, pointing to Backend auth endpoints (`frontend/`).
-   [x] T025 Ensure `JWT_SECRET_KEY` is consistently used by Frontend and Backend (`.env`).

### 5. API Contract Enforcement Tasks

-   [x] T026 Plan mapping of each API endpoint in `specs/api/rest-endpoints.md` to FastAPI route handlers.
-   [x] T027 Plan implementation of URL `user_id` validation against authenticated `user_id` from JWT.
-   [x] T028 Plan implementation of database query filters based on authenticated `user_id` to prevent cross-user access.

### 6. Frontend (Next.js) Tasks

-   [x] T029 Set up Next.js project to use App Router (`frontend/app/`).
-   [x] T030 Plan `AuthGuard` component for protecting authenticated routes (`frontend/components/AuthGuard.tsx`).
-   [x] T031 Plan API client module (`frontend/lib/api.ts`) for Backend communication.
-   [x] T032 Plan automatic JWT (from HTTP-only cookie) attachment to outgoing requests in API client.
-   [x] T033 Plan error and loading state handling in UI components.

## Phase 3: User Story 1 - User Signup (Priority: P1) 🎯 MVP

**Goal**: Allow new users to create an account.

**Independent Test**: A new user can successfully register an account with unique credentials.

### Implementation for User Story 1

-   [x] T034 [US1] Create Signup UI page (`frontend/app/signup/page.tsx`).
-   [x] T035 [US1] Implement signup form submission logic, connecting to Backend `/api/signup` (`frontend/app/signup/page.tsx`, `frontend/lib/api.ts`).
-   [x] T036 [US1] Implement Backend `/api/signup` endpoint using Better Auth (`backend/app/api/v1/auth.py`).
-   [x] T037 [US1] Handle successful signup (JWT issuance) and error cases (email taken, invalid credentials) (`frontend/app/signup/page.tsx`, `backend/app/api/v1/auth.py`).
-   [x] T038 [US1] Store issued JWT securely in HTTP-only cookies (`frontend/lib/auth.ts`).
-   [x] T039 [US1] Redirect to login or task list page on successful signup (`frontend/app/signup/page.tsx`).

## Phase 4: User Story 2 - User Login (Priority: P1)

**Goal**: Allow existing users to log in to their account.

**Independent Test**: An existing user can successfully log in with their credentials.

### Implementation for User Story 2

-   [x] T040 [US2] Create Login UI page (`frontend/app/login/page.tsx`).
-   [x] T041 [US2] Implement login form submission logic, connecting to Backend `/api/signin` (`frontend/app/login/page.tsx`, `frontend/lib/api.ts`).
-   [x] T042 [US2] Implement Backend `/api/signin` endpoint using Better Auth (`backend/app/api/v1/auth.py`).
-   [x] T043 [US2] Handle successful login (JWT issuance) and error cases (incorrect credentials) (`frontend/app/login/page.tsx`, `backend/app/api/v1/auth.py`).
-   [x] T044 [US2] Store issued JWT securely in HTTP-only cookies (`frontend/lib/auth.ts`).
-   [x] T045 [US2] Redirect to task list page on successful login (`frontend/app/login/page.tsx`).

## Phase 5: User Story 3 - View Tasks (Priority: P1)

**Goal**: Allow authenticated users to view a list of their tasks.

**Independent Test**: An authenticated user can successfully retrieve and display a list of their tasks.

### Implementation for User Story 3

-   [x] T046 [US3] Create Task List UI page (`frontend/app/tasks/page.tsx`).
-   [x] T047 [US3] Implement client-side logic to fetch tasks from `GET /api/{user_id}/tasks` (`frontend/app/tasks/page.tsx`, `frontend/lib/api.ts`).
-   [x] T048 [US3] Implement Backend `GET /api/{user_id}/tasks` endpoint to retrieve tasks for authenticated user (`backend/app/api/v1/tasks.py`).
-   [x] T049 [US3] Ensure Backend task retrieval filters by authenticated `user_id` (`backend/app/crud/tasks.py`).
-   [x] T050 [US3] Display tasks using `TaskList` component (`frontend/app/tasks/page.tsx`, `frontend/components/TaskList.tsx`).
-   [x] T051 [US3] Handle cases with no tasks (`frontend/app/tasks/page.tsx`).
-   [x] T052 [US3] Implement `AuthGuard` for `/tasks` route (`frontend/middleware.ts` or `frontend/app/layout.tsx`).

## Phase 6: User Story 4 - Toggle Completion (Priority: P1)

**Goal**: Allow authenticated users to mark tasks as completed or incomplete.

**Independent Test**: A user can successfully change the completion status of their own task.

### Implementation for User Story 4

-   [ ] T053 [US4] Implement toggle completion functionality in `TaskItem` component (`frontend/components/TaskItem.tsx`).
-   [ ] T054 [US4] Implement client-side logic to send `PATCH /api/{user_id}/tasks/{id}/complete` request (`frontend/components/TaskItem.tsx`, `frontend/lib/api.ts`).
-   [ ] T055 [US4] Implement Backend `PATCH /api/{user_id}/tasks/{id}/complete` endpoint to update task completion status (`backend/app/api/v1/tasks.py`).
-   [ ] T056 [US4] Ensure Backend update verifies task ownership (`backend/app/crud/tasks.py`).

## Phase 7: User Story 5 - Create Task (Priority: P1)

**Goal**: Allow authenticated users to create new tasks.

**Independent Test**: An authenticated user can successfully create a new task.

### Implementation for User Story 5

-   [ ] T057 [US5] Create Task Create/Edit UI page (`frontend/app/tasks/create/page.tsx`).
-   [ ] T058 [US5] Implement task creation form using generic `Forms` component (`frontend/app/tasks/create/page.tsx`, `frontend/components/Forms.tsx`).
-   [ ] T059 [US5] Implement client-side logic to send `POST /api/{user_id}/tasks` request (`frontend/app/tasks/create/page.tsx`, `frontend/lib/api.ts`).
-   [ ] T060 [US5] Implement Backend `POST /api/{user_id}/tasks` endpoint to create a task for authenticated user (`backend/app/api/v1/tasks.py`).
-   [ ] T061 [US5] Implement validation rules for task title and description on Backend (`backend/app/schemas/task.py`).

## Phase 8: User Story 6 - Update Task (Priority: P2)

**Goal**: Allow authenticated users to update existing tasks.

**Independent Test**: An authenticated user can successfully update their own task's details.

### Implementation for User Story 6

-   [ ] T062 [US6] Implement task editing functionality in Task Create/Edit UI page (`frontend/app/tasks/[id]/edit/page.tsx`).
-   [ ] T063 [US6] Implement client-side logic to fetch task details for editing (`GET /api/{user_id}/tasks/{id}`) (`frontend/app/tasks/[id]/edit/page.tsx`, `frontend/lib/api.ts`).
-   [ ] T064 [US6] Implement client-side logic to send `PUT /api/{user_id}/tasks/{id}` request for update (`frontend/app/tasks/[id]/edit/page.tsx`, `frontend/lib/api.ts`).
-   [ ] T065 [US6] Implement Backend `GET /api/{user_id}/tasks/{id}` endpoint to retrieve single task for editing (`backend/app/api/v1/tasks.py`).
-   [ ] T066 [US6] Implement Backend `PUT /api/{user_id}/tasks/{id}` endpoint to update task for authenticated user (`backend/app/api/v1/tasks.py`).
-   [ ] T067 [US6] Ensure Backend update endpoint verifies task ownership (`backend/app/crud/tasks.py`).

## Phase 9: User Story 7 - Delete Task (Priority: P2)

**Goal**: Allow authenticated users to delete existing tasks.

**Independent Test**: An authenticated user can successfully delete their own task.

### Implementation for User Story 7

-   [ ] T068 [US7] Implement delete task functionality in `TaskItem` component or Task List page (`frontend/components/TaskItem.tsx`, `frontend/app/tasks/page.tsx`).
-   [ ] T069 [US7] Implement client-side logic to send `DELETE /api/{user_id}/tasks/{id}` request (`frontend/components/TaskItem.tsx`, `frontend/lib/api.ts`).
-   [ ] T070 [US7] Implement Backend `DELETE /api/{user_id}/tasks/{id}` endpoint to delete task for authenticated user (`backend/app/api/v1/tasks.py`).
-   [ ] T071 [US7] Ensure Backend delete endpoint verifies task ownership (`backend/app/crud/tasks.py`).

## Phase 10: Cross-Cutting Concerns & Finalization

### End-to-End Data Flow Tasks

-   [ ] T072 Verify Signup → Login → Token issuance flow works end-to-end.
-   [ ] T073 Verify Authenticated API request lifecycle (JWT transport, verification).
-   [ ] T074 Verify Task CRUD lifecycle end-to-end (create, view, update, delete, toggle completion).
-   [ ] T075 Verify data persistence across Frontend/Backend restarts.

### Validation & Verification Tasks

-   [ ] T076 Review backend code for any in-memory state or storage.
-   [ ] T077 Develop automated tests or manual test cases to verify user isolation (User A cannot access User B's tasks).
-   [ ] T078 Develop automated tests to confirm auth enforcement on all protected routes (expect 401 for unauthenticated, 403 for unauthorized user_id mismatch).
-   [ ] T079 Perform full system restart and verify data integrity and persistence.

### Documentation Tasks

-   [ ] T080 Update root `README.md` with monorepo overview, setup, and running instructions (`README.md`).
-   [ ] T081 Create `docs/ENVIRONMENT_SETUP.md` with detailed environment setup steps (`docs/ENVIRONMENT_SETUP.md`).
-   [ ] T082 Document all required environment variables and their usage (`docs/ENVIRONMENT_SETUP.md`).
-   [ ] T083 Create `docs/VERIFICATION_GUIDE.md` for reviewers to verify implementation (`docs/VERIFICATION_GUIDING.md`).

## Dependencies & Execution Order

### Phase Dependencies

-   **Setup (Phase 1)**: No dependencies - can start immediately.
-   **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
-   **User Story Phases (Phase 3-9)**: All depend on Foundational phase completion. User stories can proceed in priority order (P1 first, then P2).
-   **Finalization (Phase 10)**: Depends on all desired user stories being complete.

### User Story Dependencies (within their respective phases)

-   **User Signup (P1)**: No explicit dependency beyond foundational.
-   **User Login (P1)**: Depends on Signup.
-   **View Tasks (P1)**: Depends on Signup, Login.
-   **Toggle Completion (P1)**: Depends on View Tasks.
-   **Create Task (P1)**: Depends on Signup, Login, View Tasks.
-   **Update Task (P2)**: Depends on View Tasks, Create Task.
-   **Delete Task (P2)**: Depends on View Tasks, Create Task.

### Within Each User Story

-   Tests (if included) MUST be written and FAIL before implementation (not generating explicit test tasks now, but implied by TDD)
-   Backend models before services.
-   Backend services before API endpoints.
-   Frontend UI components before pages using them.
-   Frontend API client before pages/components making requests.

### Parallel Opportunities

-   Tasks within "Repository & Environment Setup" (T005, T006, T007, T008, T009) can run in parallel.
-   Tasks within "Database Tasks" (T010, T011, T012, T013, T014, T015) can run in parallel if carefully coordinated.
-   Tasks within "Backend (FastAPI) Tasks" (T016, T017, T018, T019, T020, T021, T022) can be parallelized.
-   Tasks within "Authentication Tasks" (T023, T024, T025) can be parallelized.
-   Tasks within "API Contract Enforcement Tasks" (T026, T027, T028) can be parallelized.
-   Tasks within "Frontend (Next.js) Tasks" (T029, T030, T031, T032, T033) can be parallelized.
-   Once Foundational (Phase 2) is done, some aspects of different User Stories could be worked on in parallel by different team members (e.g., one person on frontend UI for a story, another on backend API for a different story, provided there are no direct dependencies).

## Implementation Strategy

### MVP First (User Signup, Login, View Tasks, Toggle Completion)

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational
3.  Complete User Story Phases for: User Signup, User Login, View Tasks, Toggle Completion.
4.  **STOP and VALIDATE**: Test these core functionalities end-to-end.
5.  Deploy/demo if ready.

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready
2.  Add User Signup + Login → Test independently → Deploy/Demo (Basic Auth MVP!)
3.  Add View Tasks + Toggle Completion → Test independently → Deploy/Demo (Core Task MVP!)
4.  Add Create Task → Test independently → Deploy/Demo
5.  Add Update Task → Test independently → Deploy/Demo
6.  Add Delete Task → Test independently → Deploy/Demo
7.  Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1.  Team completes Setup + Foundational together.
2.  Once Foundational is done:
    *   Developer A: Frontend UI for Signup, Login, Task List.
    *   Developer B: Backend API for Auth, Task CRUD.
    *   Developer C: Database Schema and Migrations.
3.  Stories complete and integrate independently with regular syncs.
