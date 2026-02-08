---
id: 1
title: Initial ratification of project constitution
stage: constitution
date: 2026-02-05
surface: agent
model: gemini-1.5-flash-latest
feature: none
branch: master
user: Syed Hamza Aleem
command: /sp.constitution
labels: ["constitution", "project-setup"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

```text
---
description: Create or update the project constitution from interactive or provided principle inputs, ensuring all dependent templates stay in sync.
handoffs: 
  - label: Build Specification
    agent: sp.specify
    prompt: Implement the feature specification based on the updated constitution. I want to build...
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

You are updating the project constitution at `.specify/memory/constitution.md`. This file is a TEMPLATE containing placeholder tokens in square brackets (e.g. `[PROJECT_NAME]`, `[PRINCIPLE_1_NAME]`). Your job is to (a) collect/derive concrete values, (b) fill the template precisely, and (c) propagate any amendments across dependent artifacts.

Follow this execution flow:

1. Load the existing constitution template at `.specify/memory/constitution.md`.
   - Identify every placeholder token of the form `[ALL_CAPS_IDENTIFIER]`.
   **IMPORTANT**: The user might require less or more principles than the ones used in the template. If a number is specified, respect that - follow the general template. You will update the doc accordingly.

2. Collect/derive values for placeholders:
   - If user input (conversation) supplies a value, use it.
   - Otherwise infer from existing repo context (README, docs, prior constitution versions if embedded).
   - For governance dates: `RATIFICATION_DATE` is the original adoption date (if unknown ask or mark TODO), `LAST_AMENDED_DATE` is today if changes are made, otherwise keep previous.
   - `CONSTITUTION_VERSION` must increment according to semantic versioning rules:
     - MAJOR: Backward incompatible governance/principle removals or redefinitions.
     - MINOR: New principle/section added or materially expanded guidance.
     - PATCH: Clarifications, wording, typo fixes, non-semantic refinements.
   - If version bump type ambiguous, propose reasoning before finalizing.

3. Draft the updated constitution content:
   - Replace every placeholder with concrete text (no bracketed tokens left except intentionally retained template slots that the project has chosen not to define yet—explicitly justify any left).
   - Preserve heading hierarchy and comments can be removed once replaced unless they still add clarifying guidance.
   - Ensure each Principle section: succinct name line, paragraph (or bullet list) capturing non‑negotiable rules, explicit rationale if not obvious.
   - Ensure Governance section lists amendment procedure, versioning policy, and compliance review expectations.

4. Consistency propagation checklist (convert prior checklist into active validations):
   - Read `.specify/templates/plan-template.md` and ensure any "Constitution Check" or rules align with updated principles.
   - Read `.specify/templates/spec-template.md` for scope/requirements alignment—update if constitution adds/removes mandatory sections or constraints.
   - Read `.specify/templates/tasks-template.md` and ensure task categorization reflects new or removed principle-driven task types (e.g., observability, versioning, testing discipline).
   - Read each command file in `.specify/templates/commands/*.md` (including this one) to verify no outdated references (agent-specific names like CLAUDE only) remain when generic guidance is required.
   - Read any runtime guidance docs (e.g., `README.md`, `docs/quickstart.md`, or agent-specific guidance files if present). Update references to principles changed.

5. Produce a Sync Impact Report (prepend as an HTML comment at top of the constitution file after update):
   - Version change: old → new
   - List of modified principles (old title → new title if renamed)
   - Added sections
   - Removed sections
   - Templates requiring updates (✅ updated / ⚠ pending) with file paths
   - Follow-up TODOs if any placeholders intentionally deferred.

6. Validation before final output:
   - No remaining unexplained bracket tokens.
   - Version line matches report.
   - Dates ISO format YYYY-MM-DD.
   - Principles are declarative, testable, and free of vague language ("should" → replace with MUST/SHOULD rationale where appropriate).

7. Write the completed constitution back to `.specify/memory/constitution.md` (overwrite).

8. Output a final summary to the user with:
   - New version and bump rationale.
   - Any files flagged for manual follow-up.
   - Suggested commit message (e.g., `docs: amend constitution to vX.Y.Z (principle additions + governance update)`).

Formatting & Style Requirements:

- Use Markdown headings exactly as in the template (do not demote/promote levels).
- Wrap long rationale lines to keep readability (<100 chars ideally) but do not hard enforce with awkward breaks.
- Keep a single blank line between sections.
- Avoid trailing whitespace.

If the user supplies partial updates (e.g., only one principle revision), still perform validation and version decision steps.

If critical info missing (e.g., ratification date truly unknown), insert `TODO(<FIELD_NAME>): explanation` and include in the Sync Impact Report under deferred items.

Do not create a new template; always operate on the existing `.specify/memory/constitution.md` file.

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.


/sp.constitution You are a strict, production-grade AI Product Architect and Senior Staff Engineer.

This project is Hackathon II – Phase 2: Todo Full-Stack Web Application.

Your responsibility is NOT to write random code, but to enforce a spec-driven, agentic development workflow using Spec-Kit Plus and Claude Code style discipline.

ABSOLUTE RULES (NON-NEGOTIABLE):

1. NO DUMMY IMPLEMENTATIONS
- Do NOT use mock data, fake APIs, hardcoded users, in-memory lists, placeholder auth, or bypass logic.
- Do NOT use comments like “TODO”, “mock”, “later”, or “example only” for any core requirement.
- Wherever real production logic is technically possible, it MUST be implemented fully.

2. REAL FULL-STACK ARCHITECTURE IS MANDATORY
- Frontend MUST be a real Next.js 16+ App Router application.
- Backend MUST be a real FastAPI service.
- Database MUST be Neon Serverless PostgreSQL using SQLModel.
- Data MUST persist across restarts (no memory storage).
- Authentication MUST use Better Auth with real JWT issuance and verification.

3. AUTHENTICATION & SECURITY ARE CRITICAL
- JWT tokens MUST be issued by Better Auth on the frontend.
- Every backend request MUST require a valid Authorization: Bearer <token>.
- FastAPI MUST verify JWT signature using a shared secret.
- User identity MUST be extracted from the token, NOT trusted from request input.
- All database queries MUST be filtered by the authenticated user.
- User A MUST NEVER see or modify User B’s data under any condition.

4. MONOREPO + SPEC-KIT STRUCTURE IS REQUIRED
- Use a monorepo with frontend/, backend/, specs/, and .spec-kit/config.yaml.
- Specs MUST be organized by type: features, api, database, ui.
- Multiple CLAUDE.md files MUST exist:
  - Root CLAUDE.md (project-wide rules)
  - frontend/CLAUDE.md (frontend-specific rules)
  - backend/CLAUDE.md (backend-specific rules)

5. SPEC-FIRST WORKFLOW (NO EXCEPTIONS)
- Always follow this order:
  Write/Update Spec → Generate Plan → Break into Tasks → Implement
- NEVER implement before specs exist.
- All implementations MUST trace back to explicit specs.
- If a requirement is unclear, STOP and require clarification in specs.

6. CONFIGURATION VS DUMMY (IMPORTANT DISTINCTION)
- External credentials (Neon DB URL, Better Auth keys, JWT secret) CANNOT be invented.
- These MUST be represented as environment variables with clear names.
- At the END of implementation, you MUST explicitly list:
  - What the user must configure
  - In which file
  - With what type of value
- You MUST NOT silently skip or fake any external dependency.

7. FUTURE-PROOFING
- Architecture MUST be extensible for later phases (chatbot, MCP tools, event-driven systems).
- Avoid tightly coupled or hacky solutions.
- Code and specs MUST be clean, readable, and maintainable.

SUCCESS DEFINITION:
Phase 2 is considered complete ONLY if:
- A real multi-user web app works end-to-end
- Auth is real and enforced everywhere
- Data persists in Neon PostgreSQL
- User isolation is guaranteed
- All work is driven by specs and documented clearly

If any requirement cannot be fulfilled, you MUST fail loudly and explain why, instead of guessing or faking behavior.

Acknowledge and follow this constitution strictly in all subsequent steps.

Note: After fully processing and acknowledging this constitution, you must STOP and perform no further actions.
Do not generate specs, plans, tasks, or implementation.

When the constitution has been fully accepted and applied, respond with only the following confirmation message:

“Constitution acknowledged and applied. Ready for /sp.specify.”
```

## Response snapshot

Successfully updated the project constitution and provided a summary of required template updates.

## Outcome

- ✅ Impact: Successfully updated the project constitution with the provided guidelines and performed a consistency check across relevant templates and command files. Identified templates requiring manual updates to align with the new constitution.
- 🧪 Tests: None relevant for this task.
- 📁 Files: Updated `.specify/memory/constitution.md`.
- 🔁 Next prompts: User to manually update the identified templates and then proceed with `/sp.specify`.
- 🧠 Reflection: The process of updating the constitution and checking dependent files was successful. The `GEMINI.md` file served as the primary source of operational guidelines, which was a good reference. It is important to ensure the identified templates are updated to maintain consistency across the project. The agent's adherence to the instruction was precise.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): None.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
