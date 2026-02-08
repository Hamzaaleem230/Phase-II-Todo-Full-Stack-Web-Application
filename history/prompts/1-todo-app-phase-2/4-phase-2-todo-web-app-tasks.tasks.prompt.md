---
id: 4
title: Phase 2 Todo Web App Tasks
stage: tasks
date: 2026-02-05
surface: agent
model: gemini-1.5-flash-latest
feature: 1-todo-app-phase-2
branch: 1-todo-app-phase-2
user: Syed Hamza Aleem
command: /sp.tasks
labels: ["tasks", "implementation"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/1-todo-app-phase-2/tasks.md
tests:
 - none
---

## Prompt

```text
---
description: Generate an actionable, dependency-ordered tasks.md for the feature based on available design artifacts.
handoffs: 
  - label: Analyze For Consistency
    agent: sp.analyze
    prompt: Run a project analysis for consistency
    send: true
  - label: Implement Project
    agent: sp.implement
    prompt: Start the implementation in phases
    send: true
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. **Setup**: Run `.specify/scripts/bash/check-prerequisites.sh --json` from repo root and parse FEATURE_DIR and AVAILABLE_DOCS list. All paths must be absolute. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'''m Groot' (or double-quote if possible: "I'm Groot").

2. **Load design documents**: Read from FEATURE_DIR:
   - **Required**: plan.md (tech stack, libraries, structure), spec.md (user stories with priorities)
   - **Optional**: data-model.md (entities), contracts/ (API endpoints), research.md (decisions), quickstart.md (test scenarios)
   - Note: Not all projects have all documents. Generate tasks based on what's available.

3. **Execute task generation workflow**:
   - Load plan.md and extract tech stack, libraries, project structure
   - Load spec.md and extract user stories with their priorities (P1, P2, P3, etc.)
   - If data-model.md exists: Extract entities and map to user stories
   - If contracts/ exists: Map endpoints to user stories
   - If research.md exists: Extract decisions for setup tasks
   - Generate tasks organized by user story (see Task Generation Rules below)
   - Generate dependency graph showing user story completion order
   - Create parallel execution examples per user story
   - Validate task completeness (each user story has all needed tasks, independently testable)

4. **Generate tasks.md**: Use `.specify/templates/tasks-template.md` as structure, fill with:
   - Correct feature name from plan.md
   - Phase 1: Setup tasks (project initialization)
   - Phase 2: Foundational tasks (blocking prerequisites for all user stories)
   - Phase 3+: One phase per user story (in priority order from spec.md)
   - Each phase includes: story goal, independent test criteria, tests (if requested), implementation tasks
   - Final Phase: Polish & cross-cutting concerns
   - All tasks must follow the strict checklist format (see Task Generation Rules below)
   - Clear file paths for each task
   - Dependencies section showing story completion order
   - Parallel execution examples per story
   - Implementation strategy section (MVP first, incremental delivery)

5. **Report**: Output path to generated tasks.md and summary:
   - Total task count
   - Task count per user story
   - Parallel opportunities identified
   - Independent test criteria for each story
   - Suggested MVP scope (typically just User Story 1)
   - Format validation: Confirm ALL tasks follow the checklist format (checkbox, ID, labels, file paths)

Context for task generation: You are operating under the accepted constitution, completed Phase 2 specifications, and the finalized Phase 2 plan. Your task in THIS STEP is to GENERATE ATOMIC, DETAILED TASKS for Hackathon II – Phase 2: Todo Full-Stack Web Application. DO NOT write code yet. DO NOT implement anything. ONLY produce a clear, ordered LIST of tasks that can be executed sequentially by developers or by Claude Code. TASK OBJECTIVES (MANDATORY): The tasks MUST: - Be derived strictly from the finalized plan and specs - Cover all layers: frontend (Next.js), backend (FastAPI), database (Neon PostgreSQL), authentication (Better Auth + JWT) - Ensure ZERO dummy logic; all tasks should be implementable with real logic - Include user isolation enforcement - Include JWT issuance, verification, and token transport handling - Include data persistence and restart-resilience checks - Be future-proof for Phase 3 / Phase 5 - Be detailed enough that no ambiguity remains when implementing TASK STRUCTURE (REQUIRED SECTIONS): 1. Repository & Environment Tasks - Initialize monorepo and confirm Spec-Kit structure - Validate environment variables placeholders - Separate frontend and backend setup tasks 2. Database Tasks - SQLModel schema creation for users and tasks - Enforce User ↔ Task relationship - Neon PostgreSQL connection & initialization - Migration / schema update steps 3. Backend (FastAPI) Tasks - App bootstrap sequence - JWT middleware creation - Dependency injection for authenticated user - API route creation for all endpoints (GET, POST, PUT, DELETE, PATCH) - Ownership enforcement at each route - Error-handling (401, 403, 404) 4. Authentication Tasks - Configure Better Auth in frontend - JWT issuance, expiry, and verification setup - Shared secret synchronization - Token transport via headers - Logout and invalid token handling 5. API Contract Tasks - Map each spec to API route - Ensure authenticated user_id matches URL user_id - Enforce cross-user access prevention 6. Frontend (Next.js) Tasks - App Router structure creation - Auth-protected routes - API client abstraction & integration - JWT attachment to every request - Loading and error state handling 7. End-to-End Data Flow Tasks - Signup → Login → Token issuance - Task CRUD lifecycle - Data persistence verification - User A vs User B isolation testing 8. Validation & Verification Tasks - Confirm no in-memory storage is used - Confirm auth enforcement on all routes - Restart-resilience / DB persistence checks - Final functional verification 9. Documentation Tasks - Update README with setup instructions - Document environment variables & configuration - List steps for reviewers to verify correctness STRICT TASK RULES: - Tasks MUST be atomic and implementable - Tasks MUST follow plan sequence - Do NOT merge unrelated steps - Do NOT introduce new requirements - Use precise, unambiguous language (“will”, “must”, “shall”) COMPLETION RULE: When tasks are fully generated: - STOP immediately. - End with ONLY this confirmation message: "Phase 2 tasks complete. Ready for sp.implement."

The tasks.md should be immediately executable - each task must be specific enough that an LLM can complete it without additional context.

## Task Generation Rules

**CRITICAL**: Tasks MUST be organized by user story to enable independent implementation and testing.

**Tests are OPTIONAL**: Only generate test tasks if explicitly requested in the feature specification or if user requests TDD approach.

### Checklist Format (REQUIRED)

Every task MUST strictly follow this format:

```text
- [ ] [TaskID] [P?] [Story] Description with file path
```

**Format Components**:

1. **Checkbox**: ALWAYS start with `- [ ]` (markdown checkbox)
2. **Task ID**: Sequential number (T001, T002, T003...) in execution order
3. **[P] marker**: Include ONLY if task is parallelizable (different files, no dependencies on incomplete tasks)
4. **[Story] label**: REQUIRED for user story phase tasks only
   - Format: [US1], [US2], [US3], etc. (maps to user stories from spec.md)
   - Setup phase: NO story label
   - Foundational phase: NO story label  
   - User Story phases: MUST have story label
   - Polish phase: NO story label
5. **Description**: Clear action with exact file path

**Examples**:

- ✅ CORRECT: `- [ ] T001 Create project structure per implementation plan`
- ✅ CORRECT: `- [ ] T005 [P] Implement authentication middleware in src/middleware/auth.py`
- ✅ CORRECT: `- [ ] T012 [P] [US1] Create User model in src/models/user.py`
- ✅ CORRECT: `- [ ] T014 [US1] Implement UserService in src/services/user_service.py`
- ❌ WRONG: `- [ ] Create User model` (missing ID and Story label)
- ❌ WRONG: `T001 [US1] Create model` (missing checkbox)
- ❌ WRONG: `- [ ] [US1] Create User model` (missing Task ID)
- ❌ WRONG: `- [ ] T001 [US1] Create model` (missing file path)

### Task Organization

1. **From User Stories (spec.md)** - PRIMARY ORGANIZATION:
   - Each user story (P1, P2, P3...) gets its own phase
   - Map all related components to their story:
     - Models needed for that story
     - Services needed for that story
     - Endpoints/UI needed for that story
     - If tests requested: Tests specific to that story
   - Mark story dependencies (most stories should be independent)

2. **From Contracts**:
   - Map each contract/endpoint → to the user story it serves
   - If tests requested: Each contract → contract test task [P] before implementation in that story's phase

3. **From Data Model**:
   - Map each entity to the user story(ies) that need it
   - If entity serves multiple stories: Put in earliest story or Setup phase
   - Relationships → service layer tasks in appropriate story phase

4. **From Setup/Infrastructure**:
   - Shared infrastructure → Setup phase (Phase 1)
   - Foundational/blocking tasks → Foundational phase (Phase 2)
   - Story-specific setup → within that story's phase

### Phase Structure

- **Phase 1**: Setup (project initialization)
- **Phase 2**: Foundational (blocking prerequisites - MUST complete before user stories)
- **Phase 3+**: User Stories in priority order (P1, P2, P3...)
  - Within each story: Tests (if requested) → Models → Services → Endpoints → Integration
  - Each phase should be a complete, independently testable increment
- **Final Phase**: Polish & Cross-Cutting Concerns
```

## Response snapshot

Successfully generated the detailed task list for Phase 2.

## Outcome

- ✅ Impact: Successfully created a comprehensive task list (`specs/1-todo-app-phase-2/tasks.md`) for 'Hackathon II – Phase 2: Todo Full-Stack Web Application', breaking down the implementation plan into atomic, dependency-ordered tasks covering repository setup, database, backend, authentication, API contract enforcement, frontend, end-to-end data flow, validation, and documentation.
- 🧪 Tests: None relevant for this task.
- 📁 Files: Created `specs/1-todo-app-phase-2/tasks.md`.
- 🔁 Next prompts: Proceed with `sp.implement` to begin the implementation phase.
- 🧠 Reflection: The task generation process successfully translated the detailed plan into atomic and actionable steps. The organization by user stories and clear dependencies will be crucial for efficient implementation. The agent's adherence to the strict task formatting rules ensures the tasks are immediately implementable.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): None.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
