# Comprehensive Analysis Report: Root Artifact Cleanup & SSOT Enfoldment (Explorer 3)

**Author:** Explorer 3 (`teamwork_preview_explorer`)  
**Milestone:** Milestone 1 — Root Artifact Cleanup & SSOT Enfoldment  
**Date:** 2026-07-31  

---

## 1. Executive Summary

This report delivers a thorough inspection of the repository structure, codebase references, and `.agents/rules.md` governance file for Milestone 1.

Key findings:
1. **`.agents/rules.md` Verification (Requirement R5):** `.agents/rules.md` currently covers sub-agent spawning limits, token conservation, anti-slop design directives, and visual audit protocols. However, it **fails to satisfy Requirement R5** because it completely lacks explicit rules forbidding root-level data/style/zod files, enforcing Single Source of Truth (SSOT) boundaries in `src/content/` and `src/styles/`, and prohibiting direct editing of compiled artifacts.
2. **Codebase Scan (Imports & References):**
   - **Root JSONs / `src/data/`:** `src/pages/index.astro` contains 8 direct hardcoded imports from `src/data/` (which mirror root JSON payloads).
   - **Root `zod.ts`:** 3 Astro components (`ExperienceCard.astro`, `SkillsBlock.astro`, `SkillsLedgerCard.astro`) hardcode relative imports (`../../zod`) targeting the root `zod.ts` file.
   - **Root CSS Files:** Root `tokens.css` and `compiled-portfolio-styles.css` are unused duplicates of files inside `src/styles/`, but `src/pages/index.astro` imports `../styles/global.css`.
3. **Migration Impact:** 4 components/pages (`src/pages/index.astro`, `src/components/ExperienceCard.astro`, `src/components/SkillsBlock.astro`, `src/components/SkillsLedgerCard.astro`) plus `.agents/rules.md` require updates.

---

## 2. Requirement R5 Verification: `.agents/rules.md` Inspection

### Requirement R5 Specification
> Add `.agents/rules.md` to forbid agents from generating root-level files, editing compiled artifacts directly, or violating SSOT boundaries.

### Current Contents of `.agents/rules.md`
- **Section 1:** Sub-Agent Spawning & DAG Execution Boundaries (`max_depth = 1`, DAG flow, max 1 revision pass).
- **Section 2:** Token Conservation & State Isolation (pass-by-reference, context pruning, targeted line edits).
- **Section 3:** Anti-Slop Design Directives (Emerald aesthetic, banned design tropes, mandatory design tokens).
- **Section 4:** Visual Audit & Integrated Browser Protocol (integrated browser check, screenshot verification).

### Deficiencies Identified
| Rule Required by R5 | Present in `.agents/rules.md`? | Gap Analysis |
|---|---|---|
| Forbid root-level data/style/schema files | ❌ NO | No prohibition against placing `*.json`, `*.css`, or `zod.ts` at repository root. |
| Enforce SSOT boundaries | ❌ NO | No mandate that all raw content must reside in `src/content/` collections and all design styles in `src/styles/`. |
| Forbid editing compiled artifacts directly | ❌ NO | No explicit restriction against modifying `.astro/`, `dist/`, `node_modules/`, or loose compiled CSS files directly. |

### Conclusion for Requirement R5
`.agents/rules.md` **does not satisfy Requirement R5** in its current form. It requires an additional section (`Section 5: REPOSITORY STRUCTURE & SSOT BOUNDARY CONSTRAINTS`).

---

## 3. Codebase Reference Scan

### 3.1 Data Files (Root JSONs and `src/data/`)
Currently, data payloads exist in both the repo root and `src/data/`:
- **Root JSON files:** `bet-on-me.json`, `uni-league.json`, `rock-city-pms.json`, `rock-city-ops-associate.json`, `rock-city-swe-intern.json`, `sopranos-syndicate-tracker.json`, `skills.json`.
- **`src/data/` files:** `src/data/projects/*.json`, `src/data/experience/*.json`, `src/data/skills.json`.

**Codebase Imports:**
File: `src/pages/index.astro`
- Line 8: `import rockCityData from "../data/projects/rock-city-pms.json";`
- Line 9: `import uniLeagueData from "../data/projects/uni-league.json";`
- Line 10: `import betOnMeData from "../data/projects/bet-on-me.json";`
- Line 11: `import sopranosData from "../data/projects/sopranos-syndicate-tracker.json";`
- Line 13: `import sweInternData from "../data/experience/rock-city-swe-intern.json";`
- Line 14: `import opsLeadData from "../data/experience/rock-city-ops-lead.json";`
- Line 15: `import opsAssociateData from "../data/experience/rock-city-ops-associate.json";`
- Line 17: `import skillsData from "../data/skills.json";`
- Lines 31, 44, 57, 70: `url` field access on imported data objects
- Line 149: `<SkillsBlock skills={skillsData} />`
- Lines 174-176: `<ExperienceCard experience={sweInternData} />`, `<ExperienceCard experience={opsLeadData} />`, `<ExperienceCard experience={opsAssociateData} />`

### 3.2 Loose Root Schema (`zod.ts`)
Root file `zod.ts` exports `ProjectSchema`, `Project`, `ExperienceSchema`, `Experience`, `SkillCategorySchema`, `SkillTreeSchema`, `SkillCategory`, `SkillTree`.

**Codebase Imports:**
- `src/components/ExperienceCard.astro`
  - Line 2: `import { ExperienceSchema, type Experience } from '../../zod';`
  - Line 9: `const validated = ExperienceSchema.parse(experience);`
- `src/components/SkillsBlock.astro`
  - Line 2: `import { SkillTreeSchema, type SkillTree } from '../../zod';`
  - Line 9: `const validated = SkillTreeSchema.parse(skills);`
- `src/components/SkillsLedgerCard.astro`
  - Line 2: `import { SkillTreeSchema, type SkillTree } from '../../zod';`
  - Line 9: `const validated = SkillTreeSchema.parse(skills);`

### 3.3 Root CSS Files (`tokens.css`, `compiled-portfolio-styles.css`)
- Root `tokens.css`: Duplicate of legacy styling variables. Unused by components (components reference CSS variables directly or import `global.css`).
- Root `compiled-portfolio-styles.css`: Duplicate of `src/styles/compiled-portfolio-styles.css`. Unused by `src/pages/index.astro`.
- `src/pages/index.astro` imports `import "../styles/global.css";` on Line 2.

---

## 4. Master File & Line Number Update Ledger

| File Path | Line Number(s) | Current Content | Action Required |
|---|---|---|---|
| `src/pages/index.astro` | Lines 8–17 | Imports from `../data/projects/*.json`, `../data/experience/*.json`, `../data/skills.json` | Replace imports with Astro Content Collections queries (`getCollection('projects')`, `getCollection('experience')`, `getCollection('skills')` or `getEntry`). |
| `src/pages/index.astro` | Lines 19–72, 149, 174–176 | Hardcoded data arrays and inline object mappings | Update to consume data fetched from Astro Content Collections. |
| `src/components/ExperienceCard.astro` | Line 2 | `import { ExperienceSchema, type Experience } from '../../zod';` | Update import to target `src/content/config.ts` or Astro collection entry types. |
| `src/components/SkillsBlock.astro` | Line 2 | `import { SkillTreeSchema, type SkillTree } from '../../zod';` | Update import to target `src/content/config.ts` or Astro collection entry types. |
| `src/components/SkillsLedgerCard.astro` | Line 2 | `import { SkillTreeSchema, type SkillTree } from '../../zod';` | Update import to target `src/content/config.ts` or Astro collection entry types. |
| `.agents/rules.md` | Post-Line 51 | End of document | Append Section 5 (`REPOSITORY STRUCTURE & SSOT BOUNDARY CONSTRAINTS`) to satisfy Requirement R5. |

---

## 5. Proposed Section 5 Addition for `.agents/rules.md`

```markdown
---

## 5. REPOSITORY STRUCTURE & SSOT BOUNDARY CONSTRAINTS

- **NO ROOT-LEVEL DATA OR STYLE ARTIFACTS:** Sub-agents are STRICTLY FORBIDDEN from creating, writing, or placing loose data files (`*.json`), loose CSS stylesheets (`*.css`), or Zod schema declarations (`zod.ts`) in the repository root directory.
- **SINGLE SOURCE OF TRUTH (SSOT) BOUNDARIES:**
  - **Content Collections SSOT:** All raw project, experience, and skill data payloads MUST reside exclusively under `src/content/` (`src/content/projects/`, `src/content/experience/`, `src/content/skills/`). All Zod content schemas MUST be declared in `src/content/config.ts`.
  - **Design Tokens & Styles SSOT:** All design variables and CSS tokens MUST reside exclusively under `src/styles/` (`src/styles/tokens.css` bound to `src/styles/global.css`).
- **NO DIRECT EDITING OF COMPILED ARTIFACTS:** Sub-agents MUST NOT directly edit generated or compiled artifacts, including `.astro/`, `dist/`, `node_modules/`, or loose root compiled stylesheets.
```

---

## 6. Verification Method

1. **Verify `.agents/rules.md` Compliance:** Check that Section 5 is present in `.agents/rules.md` and covers root file prohibition, SSOT boundaries, and compiled artifact rules.
2. **Verify Codebase Cleanliness:** Run `grep -rn "zod" src/` and `grep -rn "data" src/` to ensure no references to root `zod.ts` or `src/data/` remain post-migration.
3. **Verify Build & Check Execution:** Execute `npm run check:schemas` (`npx astro check`) and `npm run build` (`npx astro build`) to verify zero TypeScript or schema errors.
