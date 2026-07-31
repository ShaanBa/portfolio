# Execution Plan: Portfolio Repository DAG Refactoring

## Objectives & Scope
Refactor the portfolio repository at `/Users/shaanbawa/portfoliio` into a deterministic Directed Acyclic Graph (DAG) architecture for AI multi-agent swarm execution. Eliminate single-source-of-truth (SSOT) violations, component shadowing, and unvalidated graph schemas.

---

## Decomposed Milestones

### Milestone 1: Root Artifact Cleanup & SSOT Enfoldment (R1 & R5)
- **Objective**: Consolidate root data JSON files and root CSS files into canonical directories (`src/content/` and `src/styles/`), remove root loose files, migrate `zod.ts`, and enforce `.agents/rules.md`.
- **Target Files to Relocate / Consolidate**:
  - Root JSON files: `bet-on-me.json`, `uni-league.json`, `rock-city-pms.json`, `rock-city-ops-associate.json`, `rock-city-swe-intern.json`, `sopranos-syndicate-tracker.json`, `skills.json` -> `src/content/` (collections: `projects`, `experience`, `skills`).
  - Loose data in `src/data/` -> `src/content/`. Remove `src/data/`.
  - Root CSS files: `tokens.css`, `compiled-portfolio-styles.css` -> `src/styles/`.
  - Delete root JSON files, root CSS files, root `zod.ts`.
- **Enforcement**: Verify `.agents/rules.md` explicitly forbids agents from generating root-level data/style files.

### Milestone 2: Strict Component Hierarchy & Framework Separation (R2 & AGENTS.md)
- **Objective**: Reorganize `src/components/` into `src/components/astro/` (static layout components) and `src/components/react/` (interactive client islands).
- **Target Actions**:
  - Eliminate duplicate shadow implementations (`Grid.astro` vs `Grid.tsx`, `Hero.astro` vs `Hero.tsx`). Select appropriate canonical implementation for each component.
  - Structure components into `src/components/astro/` and `src/components/react/`.
  - Ensure `ProjectLedgerCard.astro` lives under `src/components/astro/` and complies strictly with `AGENTS.md` (Emerald design tokens, anti-slop constraints, layout structure: top label strip, title & links row, summary field, design rationale ledger, tech stack field).
  - Update all component imports across `src/pages/index.astro` and any parent components.

### Milestone 3: Typed Zod Schemas & Astro Content Collections (R3)
- **Objective**: Define explicit Zod schemas in `src/content/config.ts` for `projects`, `experience`, and `skills` collections.
- **Target Actions**:
  - Migrate Zod definitions from root `zod.ts` into `src/content/config.ts`.
  - Define Zod schemas matching all raw JSON structures in `src/content/projects/`, `src/content/experience/`, and `src/content/skills/`.
  - Enforce runtime and build-time validation.

### Milestone 4: Machine-Readable Agent DAG Manifest & Package Validation Scripts (R4)
- **Objective**: Utilize and validate `.agents/graph.json` defining valid DAG workflow nodes (`schema_validation`, `token_compiler`, `component_builder`, `site_bundler`).
- **Target Actions**:
  - Verify `.agents/graph.json` contains valid node definitions, `inputs`, `outputs`, `depends_on`, and `action` scripts.
  - Update `package.json` with necessary validation triggers (e.g. `"check:schemas": "astro check"`, `"build:tokens": ...` if required by token compiler).
  - Verify `npm run check:schemas`, `npx astro check`, and `npx astro build` execute cleanly without errors.

---

## Verification & Quality Gating
For each milestone:
1. Dispatch 3 Explorers (`teamwork_preview_explorer`) to analyze the scope and produce execution strategy.
2. Dispatch Worker (`teamwork_preview_worker`) with Explorer findings to perform code changes.
3. Dispatch 2 Reviewers (`teamwork_preview_reviewer`) to independently review implementation.
4. Dispatch 2 Challengers (`teamwork_preview_challenger`) to stress-test and verify build/validation outputs.
5. Dispatch Forensic Auditor (`teamwork_preview_auditor`) to perform integrity checks.
6. Evaluate gate criteria (Clean build/tests, clean audit, no reviewer vetoes).
