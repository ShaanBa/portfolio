# Original User Request

## 2026-07-31T18:40:41Z

Refactor the portfolio repository into a deterministic Directed Acyclic Graph (DAG) architecture for AI multi-agent swarm execution, eliminating single-source-of-truth violations, component shadowing, and unvalidated graph schemas.

Working directory: `/Users/shaanbawa/portfoliio`
Integrity mode: `development`

## Requirements

### R1. Root Artifact Cleanup & SSOT Enfoldment
Remove all root-level data JSON files (`bet-on-me.json`, `uni-league.json`, `rock-city-pms.json`, `rock-city-ops-associate.json`, `rock-city-swe-intern.json`, `sopranos-syndicate-tracker.json`, `skills.json`), root CSS files (`tokens.css`, `compiled-portfolio-styles.css`), and root `zod.ts`. Consolidate all canonical data into `src/content/` (Astro Content Collections) and all styles into `src/styles/`.

### R2. Strict Component Hierarchy & Framework Separation
Reorganize `src/components/` into explicit, non-overlapping subdirectories:
- `src/components/astro/` for static layout components.
- `src/components/react/` for interactive client islands.
Eliminate shadow duplicates (e.g., duplicate `.astro` and `.tsx` versions of the same component).

### R3. Typed Zod Schemas & Astro Content Collections
Define explicit Zod schemas in `src/content/config.ts` for `project`, `experience`, and `skill` collections. Enforce runtime and build-time validation against all raw content nodes.

### R4. Machine-Readable Agent DAG Manifest (`.agents/graph.json`)
Utilize and validate the template created at `.agents/graph.json`. Explicitly specify Node IDs (`schema_validation`, `token_compiler`, `component_builder`, `site_bundler`), `inputs`, `outputs`, `depends_on` edge relationships, and executable validation actions. Ensure necessary script triggers (like `"check:schemas": "astro check"`) are declared in `package.json`.

### R5. Global Agent Constraints (`.agents/rules.md`)
Add `.agents/rules.md` to forbid agents from generating root-level files, editing compiled artifacts directly, or violating SSOT boundaries.

## Acceptance Criteria

### SSOT & Cleanup
- [ ] No `.json` or `.css` files remain at the repository root.
- [ ] Loose `zod.ts` at root is migrated to `src/content/config.ts`.
- [ ] All data payloads reside under `src/content/`.

### Structural & Component Integrity
- [ ] `src/components/` strictly split into `astro/` and `react/` subdirectories without duplicate component implementations.
- [ ] Styling tokens reside exclusively in `src/styles/tokens.css`.

### DAG & Validation
- [ ] `.agents/graph.json` defines valid DAG nodes (`schema_validation`, `token_compiler`, `component_builder`, `site_bundler`) with explicit input/output paths and dependency edges.
- [ ] Running validation check commands (`npm run check:schemas`, `npx astro check`, or `npx astro build`) succeeds cleanly without errors.
