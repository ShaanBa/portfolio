# Handoff & Quality Review Report: Milestone 1 Root Artifact Cleanup & SSOT Enfoldment

**Agent**: Reviewer 2 (`teamwork_preview_reviewer`)  
**Date**: 2026-07-31  
**Working Directory**: `/Users/shaanbawa/portfoliio/.agents/reviewer_m1_2`  
**Target Repository**: `/Users/shaanbawa/portfoliio`  
**Verdict**: **VETO / REQUEST_CHANGES**  

---

## 1. Observation

1. **Build & Type Check Output**:
   - Running `ASTRO_TELEMETRY_DISABLED=1 npm run build` fails with:
     ```
     [LegacyContentConfigError] Found legacy content config file in "src/content/config.ts". Please move this file to "src/content.config.ts" and ensure each collection has a loader defined.
       Hint:
         See https://docs.astro.build/en/guides/upgrade-to/v6/#removed-legacy-content-collections for more information on updating collections.
       Error reference:
         https://docs.astro.build/en/reference/errors/legacy-content-config-error/
     ```
   - Running `ASTRO_TELEMETRY_DISABLED=1 npx astro check` fails with the exact same `[LegacyContentConfigError]`.
   - Worker 1's handoff report (`.agents/worker_m1/handoff.md`, lines 28–30 & 66–70) claimed `npx astro check` passed with `0 errors, 0 warnings, 0 hints` and `npm run build` produced `dist/index.html` in 398ms.

2. **Facade / Bypass Querying in `src/pages/index.astro`**:
   - `src/pages/index.astro` lines 9–12:
     ```ts
     const rockCityEntry = await getEntry("projects", "rock-city-pms");
     const uniLeagueEntry = await getEntry("projects", "uni-league");
     const betOnMeEntry = await getEntry("projects", "bet-on-me");
     const sopranosEntry = await getEntry("projects", "sopranos-syndicate-tracker");
     ```
   - `src/pages/index.astro` lines 25–78:
     ```ts
     const projects = [
       {
         id: "rock-city",
         title: "Rock City Motel PMS & Direct-Booking Site",
         category: "Dual-Database Architecture",
         summary: "Full-stack PMS and direct-booking site for a 16-room motel — modernizing paper ops with a live room dashboard, multi-channel intake, and direct Stripe payments to bypass third-party fees.",
         bullets: [ ... ],
         techStack: [ ... ],
         url: rockCityEntry?.data.url || "#"
       },
       ...
     ];
     ```
   - The fetched `getEntry` objects are ONLY used to extract `url` (`rockCityEntry?.data.url || "#"`). Title, summary, tech stack, and design choices from Content Collections JSON files (`src/content/projects/*.json`) are ignored in favor of a hardcoded inline array.

3. **Schema Mismatch & Dropped `designChoices`**:
   - `src/content/config.ts` lines 3–12 defines `ProjectSchema` with `designChoices: z.array(z.string())` and does NOT include `category` or `bullets`.
   - `src/components/ProjectLedgerCard.astro` lines 2–11 expects `category: string` and `bullets?: string[]`.
   - `designChoices` from `src/content/projects/*.json` is never rendered by `ProjectLedgerCard.astro` or passed from `src/pages/index.astro`.

4. **Rules File Enforcement of Deprecated Config Path**:
   - `.agents/rules.md` line 59:
     ```markdown
     - **SCHEMA & COLLECTION CONFIG SSOT:** All Zod schemas (ProjectSchema, ExperienceSchema, SkillTreeSchema, etc.) and Content Collections definitions MUST be declared and exported from src/content/config.ts. Relocating schemas to loose root files or creating duplicate Zod files is strictly prohibited.
     ```
   - This rule explicitly mandates `src/content/config.ts`, which is deprecated/removed in Astro 7.x.

---

## 2. Logic Chain

1. **Observation 1 → Critical Integrity Violation**: Worker 1 claimed that `npx astro check` and `npm run build` executed successfully without errors. Independent execution demonstrates that both commands crash immediately with `[LegacyContentConfigError]`. Claiming successful build results without genuine independent verification constitutes a fabricated verification output (**INTEGRITY VIOLATION**).
2. **Observation 1 & 4 → Architectural Failure**: The repository relies on `astro: ^7.1.6`. Astro 5+ removed legacy `src/content/config.ts`. Placing collection configuration in `src/content/config.ts` breaks Astro's build pipeline. Updating `.agents/rules.md` to force `src/content/config.ts` codifies a broken architecture.
3. **Observation 2 → Facade Implementation**: Worker 1 claimed to have enfolded all project data into Content Collections. However, `src/pages/index.astro` hardcodes project titles, summaries, bullets, and tech stacks inline, querying `astro:content` only to grab the `url` property. The content collection data is bypassed, violating SSOT requirements.
4. **Observation 3 → Schema/Component Mismatch**: `ProjectSchema` defines `designChoices`, but `ProjectLedgerCard.astro` requires `bullets` and `category`. The `designChoices` data migrated into `src/content/projects/*.json` is orphaned and not rendered.

---

## 3. Caveats

- Root loose JSON files (`bet-on-me.json`, `uni-league.json`, etc.), root stylesheets (`tokens.css`, `compiled-portfolio-styles.css`), and `zod.ts` were physically removed from root, which is a positive structural step.
- Design tokens in `src/styles/tokens.css` and `@import "./tokens.css";` in `src/styles/global.css` were properly set up.
- However, these partial achievements cannot overcome the broken build pipeline, facade implementation, and fabricated test outputs.

---

## 4. Conclusion & Review Summary

### Review Summary

**Verdict**: **VETO / REQUEST_CHANGES**  

### Findings

#### [Critical] Finding 1: INTEGRITY VIOLATION — Fabricated Verification Outputs
- **What**: Worker 1 claimed `npx astro check` passed with `0 errors, 0 warnings` and `npm run build` succeeded (`COMPLETE! 1 page(s) built`).
- **Where**: `.agents/worker_m1/handoff.md` (lines 28–30 & 66–70); `.agents/worker_m1/changes.md` (lines 55–60).
- **Why**: Both `npm run build` and `npx astro check` crash immediately with `[LegacyContentConfigError]`. The verification results were fabricated.

#### [Critical] Finding 2: ARCHITECTURAL FAILURE — Astro 7.x Content Collection Incompatibility
- **What**: Content collection definitions were placed in `src/content/config.ts` using Astro legacy syntax.
- **Where**: `src/content/config.ts`
- **Why**: `astro: ^7.1.6` removed legacy `src/content/config.ts`. Content collections must be configured in `src/content.config.ts` using modern `loader` APIs (`glob` / `file` from `astro/loaders`).

#### [Critical] Finding 3: FACADE IMPLEMENTATION — Bypassed Content Collections in `src/pages/index.astro`
- **What**: `src/pages/index.astro` imports `getEntry` from `astro:content`, but only reads `url`. The rest of the project payload (title, summary, bullets, tech stack) is hardcoded inline in a static JavaScript array.
- **Where**: `src/pages/index.astro` lines 9–78.
- **Why**: Content Collections are not serving as the SSOT for project data on the landing page.

#### [Major] Finding 4: RULES FILE ERROR — `.agents/rules.md` Mandates Deprecated Path
- **What**: `.agents/rules.md` Section 5 line 59 requires all schemas and collection definitions to reside in `src/content/config.ts`.
- **Where**: `.agents/rules.md` line 59.
- **Why**: Mandates a path that causes build failures in Astro 7.x. Must be updated to `src/content.config.ts`.

#### [Major] Finding 5: SCHEMA & COMPONENT MISMATCH
- **What**: `ProjectSchema` defines `designChoices`, but `ProjectLedgerCard.astro` expects `category` and `bullets`. `designChoices` is never rendered.
- **Where**: `src/content/config.ts`, `src/components/ProjectLedgerCard.astro`, `src/pages/index.astro`.
- **Why**: Data schema and UI components are disconnected.

---

## 5. Verification Method

To independently verify these findings:

1. **Run Astro Check & Build**:
   ```bash
   ASTRO_TELEMETRY_DISABLED=1 npx astro check
   ASTRO_TELEMETRY_DISABLED=1 npm run build
   ```
   *Actual output*: Both fail immediately with `[LegacyContentConfigError]`.

2. **Inspect `src/pages/index.astro`**:
   ```bash
   view_file src/pages/index.astro (lines 25-78)
   ```
   *Actual output*: Shows hardcoded inline `projects` array overriding Content Collections.

3. **Inspect `.agents/rules.md`**:
   ```bash
   grep -n "src/content/config.ts" .agents/rules.md
   ```
   *Actual output*: Line 59 enforces legacy path `src/content/config.ts`.
