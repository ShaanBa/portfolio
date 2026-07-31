## 2026-07-31T18:46:47Z
You are Worker 2 (teamwork_preview_worker) assigned to implement Milestone 1 Iteration 2 (Remediation).
Your working directory is `/Users/shaanbawa/portfoliio/.agents/worker_m1_gen2`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Review the Remediation Handoff Reports:
- `/Users/shaanbawa/portfoliio/.agents/explorer_m1_1_gen2/handoff.md`
- `/Users/shaanbawa/portfoliio/.agents/explorer_m1_2_gen2/handoff.md`
- `/Users/shaanbawa/portfoliio/.agents/explorer_m1_3_gen2/handoff.md`
- `/Users/shaanbawa/portfoliio/.agents/auditor_m1/handoff.md`
- `/Users/shaanbawa/portfoliio/.agents/orchestrator/PROJECT.md`

Your Tasks for Milestone 1 Iteration 2 Remediation:
1. **Migrate Content Config to `src/content.config.ts`**:
   - Create `src/content.config.ts` using `defineCollection` and `glob()` loaders from `astro/loaders`.
   - Configure collections (`projects`, `experience`, `skills`) with explicit `glob` loaders (`base: './src/content/projects'`, etc.) and schema definitions.
   - Export collections and named schemas (`ProjectSchema`, `ExperienceSchema`, `SkillCategorySchema`, `SkillTreeSchema`) and inferred types.
   - Remove legacy `src/content/config.ts`.

2. **Refactor `src/pages/index.astro` (Eliminate Facade Data Integration)**:
   - Import `getCollection` from `astro:content`.
   - Query project collection using `const projects = await getCollection("projects");`.
   - Pass retrieved collection `.data` properties directly to `ProjectLedgerCard.astro` without any hardcoded project objects or inline string arrays.

3. **Update `ProjectLedgerCard.astro` & Other Components**:
   - Update `src/components/ProjectLedgerCard.astro` to import `ProjectSchema` / `type Project` from `../content.config`.
   - Render `project.title`, `project.summary`, `project.techStack`, `project.designChoices`, `project.url`, `project.githubUrl`.
   - Update schema import paths in `ExperienceCard.astro`, `SkillsBlock.astro`, `SkillsLedgerCard.astro` from `../content/config` to `../content.config`.

4. **Update Specification Files**:
   - Update `.agents/rules.md` (Section 5), `.agents/graph.json` (inputs), and `.agents/orchestrator/PROJECT.md` to reference `src/content.config.ts`.

5. **Build & Type Check Verification**:
   - Execute `ASTRO_TELEMETRY_DISABLED=1 npx astro check` — verify 0 errors.
   - Execute `ASTRO_TELEMETRY_DISABLED=1 npm run build` — verify exit code 0 and successful output in `dist/`.

6. Write your changes and execution report to `/Users/shaanbawa/portfoliio/.agents/worker_m1_gen2/changes.md` and `handoff.md`, and notify parent.
