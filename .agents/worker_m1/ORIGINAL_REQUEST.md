## 2026-07-31T13:42:08-05:00

You are Worker 1 (teamwork_preview_worker) assigned to implement Milestone 1: Root Artifact Cleanup & SSOT Enfoldment.
Your working directory is `/Users/shaanbawa/portfoliio/.agents/worker_m1`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Review the Explorer Handoff Reports:
- `/Users/shaanbawa/portfoliio/.agents/explorer_m1_1/handoff.md`
- `/Users/shaanbawa/portfoliio/.agents/explorer_m1_2/handoff.md`
- `/Users/shaanbawa/portfoliio/.agents/explorer_m1_3/handoff.md`
- `/Users/shaanbawa/portfoliio/.agents/orchestrator/PROJECT.md`

Your Tasks for Milestone 1:
1. **Data Migration to `src/content/`**:
   - Create directories: `src/content/projects/`, `src/content/experience/`, `src/content/skills/`.
   - Move/copy JSON data files into `src/content/`:
     - `src/content/projects/bet-on-me.json`
     - `src/content/projects/uni-league.json`
     - `src/content/projects/rock-city-pms.json`
     - `src/content/projects/sopranos-syndicate-tracker.json`
     - `src/content/experience/rock-city-ops-associate.json`
     - `src/content/experience/rock-city-swe-intern.json`
     - `src/content/experience/rock-city-ops-lead.json` (from `src/data/experience/rock-city-ops-lead.json`)
     - `src/content/skills/skills.json`
   - Delete all root JSON files (`bet-on-me.json`, `uni-league.json`, `rock-city-pms.json`, `rock-city-ops-associate.json`, `rock-city-swe-intern.json`, `sopranos-syndicate-tracker.json`, `skills.json`) and delete `src/data/` directory.

2. **Style Consolidation into `src/styles/`**:
   - Update `src/styles/tokens.css` so that it includes all design tokens from root `tokens.css` (`--surface-panel`, `--border-outline`, `--shadow-panel`, `--font-mono`, `--font-header`, `--primary-accent`, etc.).
   - Update `src/styles/global.css` to add `@import "./tokens.css";` at top and clean up redundant inline root variables.
   - Delete root `tokens.css`, root `compiled-portfolio-styles.css`, and `src/styles/compiled-portfolio-styles.css`.

3. **Zod Schemas & Content Collections Config (`src/content/config.ts`)**:
   - Create `src/content/config.ts` migrating schemas from root `zod.ts` (`ProjectSchema`, `ExperienceSchema`, `SkillCategorySchema`, `SkillTreeSchema`) and defining Astro Content Collections (`projects`, `experience`, `skills`). Export collections and named Zod schemas/types.
   - Delete root `zod.ts`.

4. **Update Source Code References**:
   - In `src/pages/index.astro`: update imports/queries to reference `src/content/` (using Astro Content Collections `getCollection` or updated json paths).
   - In `src/components/ExperienceCard.astro`, `src/components/SkillsBlock.astro`, `src/components/SkillsLedgerCard.astro`: update schema import paths from `../../zod` to `../content/config` (or relative path).

5. **Rules Update (`.agents/rules.md`)**:
   - Append Section 5 (`REPOSITORY STRUCTURE & SSOT BOUNDARY CONSTRAINTS`) to `/Users/shaanbawa/portfoliio/.agents/rules.md` explicitly forbidding agents from generating root-level JSON/CSS/Zod files, editing compiled artifacts directly, or violating SSOT boundaries.

6. **Verification**:
   - Run `npx astro check` and `npx astro build` (or `npm run build`). Verify build succeeds without errors.
   - Verify zero root JSON/CSS files remain.

7. Write your execution report and results to `/Users/shaanbawa/portfoliio/.agents/worker_m1/changes.md` and `handoff.md`, and notify parent.
