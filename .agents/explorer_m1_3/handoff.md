# Handoff Report: Root Artifact Cleanup & SSOT Enfoldment (Explorer 3)

**Author:** Explorer 3 (`teamwork_preview_explorer`)  
**Target:** Parent / Implementer  
**Milestone:** Milestone 1 — Root Artifact Cleanup & SSOT Enfoldment  
**Date:** 2026-07-31  

---

## 1. Observation

### 1.1 `.agents/rules.md` State
Direct inspection of `/Users/shaanbawa/portfoliio/.agents/rules.md` (lines 1–51) revealed four existing sections:
1. `## 1. SUB-AGENT SPAWNING & DAG EXECUTION BOUNDARIES`
2. `## 2. TOKEN CONSERVATION & STATE ISOLATION`
3. `## 3. ANTI-SLOP DESIGN DIRECTIVES (EMERALD AESTHETIC)`
4. `## 4. VISUAL AUDIT & INTEGRATED BROWSER PROTOCOL`

No rules exist regarding root file creation (`*.json`, `*.css`, `zod.ts`), SSOT boundary enforcement (`src/content/`, `src/styles/`), or compiled artifact protection.

### 1.2 Loose Root Artifacts & `src/data/` Present
Root directory search (`find_by_name`) identified loose root files:
- JSON files: `bet-on-me.json`, `uni-league.json`, `rock-city-pms.json`, `rock-city-ops-associate.json`, `rock-city-swe-intern.json`, `sopranos-syndicate-tracker.json`, `skills.json`
- CSS files: `tokens.css`, `compiled-portfolio-styles.css`
- Zod schema: `zod.ts`
- Data directory: `src/data/` (containing `projects/`, `experience/`, `skills.json`)

### 1.3 Hardcoded Codebase References & Line Numbers
Grep and file view operations identified exact imports and references:
1. `src/pages/index.astro`:
   - Line 8: `import rockCityData from "../data/projects/rock-city-pms.json";`
   - Line 9: `import uniLeagueData from "../data/projects/uni-league.json";`
   - Line 10: `import betOnMeData from "../data/projects/bet-on-me.json";`
   - Line 11: `import sopranosData from "../data/projects/sopranos-syndicate-tracker.json";`
   - Line 13: `import sweInternData from "../data/experience/rock-city-swe-intern.json";`
   - Line 14: `import opsLeadData from "../data/experience/rock-city-ops-lead.json";`
   - Line 15: `import opsAssociateData from "../data/experience/rock-city-ops-associate.json";`
   - Line 17: `import skillsData from "../data/skills.json";`
2. `src/components/ExperienceCard.astro`:
   - Line 2: `import { ExperienceSchema, type Experience } from '../../zod';`
3. `src/components/SkillsBlock.astro`:
   - Line 2: `import { SkillTreeSchema, type SkillTree } from '../../zod';`
4. `src/components/SkillsLedgerCard.astro`:
   - Line 2: `import { SkillTreeSchema, type SkillTree } from '../../zod';`

---

## 2. Logic Chain

1. **Step 1:** Requirement R5 requires `.agents/rules.md` to explicitly forbid agents from generating root-level files, editing compiled artifacts directly, or violating SSOT boundaries.
2. **Step 2:** Direct inspection of `.agents/rules.md` confirmed zero references to repository layout rules, root artifact restrictions, or SSOT boundaries.
3. **Step 3:** Therefore, `.agents/rules.md` MUST be updated with a new Section 5 defining these constraints before Milestone 1 can be considered compliant.
4. **Step 4:** Codebase scan revealed that data files currently live in both root and `src/data/`, and `src/pages/index.astro` imports directly from `src/data/`.
5. **Step 5:** Components (`ExperienceCard.astro`, `SkillsBlock.astro`, `SkillsLedgerCard.astro`) directly import schema types from the root `zod.ts` file (`../../zod`).
6. **Step 6:** When root JSONs and `src/data/` are relocated to `src/content/` (Content Collections), and `zod.ts` is relocated to `src/content/config.ts`, these 4 files (`src/pages/index.astro`, `src/components/ExperienceCard.astro`, `src/components/SkillsBlock.astro`, `src/components/SkillsLedgerCard.astro`) will break unless their import paths and data querying logic are updated simultaneously.

---

## 7. Caveats

- **Content Collections Setup:** `src/content/config.ts` does not exist yet; it will be created as part of the data consolidation phase.
- **Component Hierarchy Changes:** Component restructuring (`src/components/astro/` vs `src/components/react/`) is planned for Milestone 2, so component relative import paths to `src/content/config.ts` may undergo a secondary path update in M2.
- **Scope Limit:** Explorer 3 is operating in read-only mode; no files in `src/`, root, or `.agents/rules.md` were modified during this investigation.

---

## 4. Conclusion

1. **`.agents/rules.md` Needs Update:** Must append Section 5 (`REPOSITORY STRUCTURE & SSOT BOUNDARY CONSTRAINTS`) to satisfy Requirement R5.
2. **4 Files Require Code Updates:**
   - `src/pages/index.astro` (lines 8–17, 19–72) -> migrate to Astro Content Collections queries (`astro:content`).
   - `src/components/ExperienceCard.astro` (line 2) -> migrate `../../zod` import to `src/content/config.ts`.
   - `src/components/SkillsBlock.astro` (line 2) -> migrate `../../zod` import to `src/content/config.ts`.
   - `src/components/SkillsLedgerCard.astro` (line 2) -> migrate `../../zod` import to `src/content/config.ts`.
3. **Loose Root Artifacts Ready for Deletion:** 7 root JSON files, 2 root CSS files, root `zod.ts`, and `src/data/` directory can be safely removed once content and style consolidations are completed.

---

## 5. Verification Method

1. **Rule File Inspection:** Check that `/Users/shaanbawa/portfoliio/.agents/rules.md` contains Section 5.
2. **Codebase Grep Verification:**
   - Run `grep -rn "zod" src/` — expect 0 hits referencing root `zod.ts`.
   - Run `grep -rn "data/" src/` — expect 0 hits referencing `src/data/` or root JSONs.
3. **TypeScript & Schema Checking:**
   - Run `npx astro check` to confirm no broken imports or missing type declarations.
4. **Site Build Verification:**
   - Run `npx astro build` to confirm clean static build generation.
