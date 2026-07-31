# Milestone 1: Root Artifact Cleanup & SSOT Enfoldment Analysis Report

**Explorer**: Explorer 1 (`explorer_m1_1`)  
**Date**: 2026-07-31  
**Working Directory**: `/Users/shaanbawa/portfoliio/.agents/explorer_m1_1`  
**Target Workspace**: `/Users/shaanbawa/portfoliio`  

---

## 1. Executive Summary

Milestone 1 (M1) focuses on eliminating Single Source of Truth (SSOT) violations across the portfolio repository by relocating loose data files (`.json`), root stylesheet artifacts (`.css`), and root Zod schemas (`zod.ts`) into canonical subdirectories under `src/content/` (Astro Content Collections) and `src/styles/`.

During investigation, we conducted a file-by-file structural audit of all root JSON files, files under `src/data/`, root CSS files, `zod.ts`, and downstream source code references.

---

## 2. Inventory & Comparison Analysis

### 2.1 Root Loose Artifacts & Duplicate Detection

| Root File Path | Size | `src/` Equivalent Path | `src/` Size | Content Match Status |
|---|---|---|---|---|
| `bet-on-me.json` | 1,237 B | `src/data/projects/bet-on-me.json` | 1,237 B | 100% Identical |
| `uni-league.json` | 1,131 B | `src/data/projects/uni-league.json` | 1,131 B | 100% Identical |
| `rock-city-pms.json` | 1,421 B | `src/data/projects/rock-city-pms.json` | 1,422 B | Identical JSON data (trailing newline difference) |
| `sopranos-syndicate-tracker.json` | 1,281 B | `src/data/projects/sopranos-syndicate-tracker.json` | 1,281 B | 100% Identical |
| `rock-city-ops-associate.json` | 493 B | `src/data/experience/rock-city-ops-associate.json` | 493 B | 100% Identical |
| `rock-city-swe-intern.json` | 649 B | `src/data/experience/rock-city-swe-intern.json` | 649 B | 100% Identical |
| *(None at root)* | N/A | `src/data/experience/rock-city-ops-lead.json` | 415 B | Unique file present ONLY in `src/data/` |
| `skills.json` | 714 B | `src/data/skills.json` | 547 B | Identical JSON data (root multi-line vs src compact) |
| `tokens.css` | 516 B | `src/styles/tokens.css` | 792 B | Root is legacy alias file; `src/styles/tokens.css` is active |
| `compiled-portfolio-styles.css` | 6,177 B | `src/styles/compiled-portfolio-styles.css` | 6,177 B | 100% Identical |
| `zod.ts` | 929 B | *(To be enfolded in M3)* `src/content/config.ts` | N/A | Root Zod schemas imported by `.astro` components |

### 2.2 Key Findings & Anomalies
1. **Missing Root File**: `rock-city-ops-lead.json` exists in `src/data/experience/` but was never placed at the root level.
2. **Whitespace Formatting Diff**: Root `skills.json` (714 B) formatted array elements on separate lines, while `src/data/skills.json` (547 B) formatted array elements inline. Data payload is identical.
3. **Data Schema SSOT**: All 4 project files (`bet-on-me`, `uni-league`, `rock-city-pms`, `sopranos-syndicate-tracker`) conform to `ProjectSchema` defined in `zod.ts`.
4. **Experience Schema SSOT**: All 3 experience files (`rock-city-ops-associate`, `rock-city-swe-intern`, `rock-city-ops-lead`) conform to `ExperienceSchema` defined in `zod.ts`.
5. **Skill Tree Schema SSOT**: Both skill files conform to `SkillTreeSchema` (array of `SkillCategorySchema` objects).

---

## 3. Schema & Collection Structure Analysis

### 3.1 `projects` Collection Schema & Target Format
Target Location: `src/content/projects/`
File Format: JSON (`<id>.json`)

**Validated Fields**:
- `id` (`z.string()`): Unique identifier matching filename slug.
- `title` (`z.string()`): Display title.
- `url` (`z.string().url()`): Live demo URL.
- `summary` (`z.string().max(200)`): Short description.
- `techStack` (`z.array(z.string())`): Array of technologies.
- `designChoices` (`z.array(z.string())`): Engineering rationale bullets.
- `githubUrl` (`z.string().url().optional()`): Optional repository link.
- `completionDate` (`z.string().optional()`): Optional date string.

### 3.2 `experience` Collection Schema & Target Format
Target Location: `src/content/experience/`
File Format: JSON (`<id>.json`)

**Validated Fields**:
- `id` (`z.string()`): Experience slug identifier.
- `company` (`z.string()`): Organization name.
- `role` (`z.string()`): Job title.
- `location` (`z.string()`): Geographic location.
- `period` (`z.string()`): Date range.
- `highlights` (`z.array(z.string())`): Bulleted achievement list.

### 3.3 `skills` Collection Schema & Target Format
Target Location: `src/content/skills/`
File Format: Option A (4 collection entries per category: `languages.json`, `frameworks.json`, `databases.json`, `infrastructure.json`) or Option B (Single canonical `skills.json`).

**Validated Category Fields**:
- `category` (`z.string()`): Skill category title.
- `skills` (`z.array(z.string())`): List of skills.

---

## 4. Comprehensive Migration Mapping Table

| Source File (Root or `src/data/`) | Target Path under `src/content/` | Collection Name | Migration Status / Action |
|---|---|---|---|
| `bet-on-me.json` & `src/data/projects/bet-on-me.json` | `src/content/projects/bet-on-me.json` | `projects` | Enfold to `src/content/projects/bet-on-me.json`, delete source files |
| `rock-city-pms.json` & `src/data/projects/rock-city-pms.json` | `src/content/projects/rock-city-pms.json` | `projects` | Enfold to `src/content/projects/rock-city-pms.json`, delete source files |
| `sopranos-syndicate-tracker.json` & `src/data/projects/sopranos-syndicate-tracker.json` | `src/content/projects/sopranos-syndicate-tracker.json` | `projects` | Enfold to `src/content/projects/sopranos-syndicate-tracker.json`, delete source files |
| `uni-league.json` & `src/data/projects/uni-league.json` | `src/content/projects/uni-league.json` | `projects` | Enfold to `src/content/projects/uni-league.json`, delete source files |
| `rock-city-ops-associate.json` & `src/data/experience/rock-city-ops-associate.json` | `src/content/experience/rock-city-ops-associate.json` | `experience` | Enfold to `src/content/experience/rock-city-ops-associate.json`, delete source files |
| `src/data/experience/rock-city-ops-lead.json` | `src/content/experience/rock-city-ops-lead.json` | `experience` | Enfold to `src/content/experience/rock-city-ops-lead.json`, delete source file |
| `rock-city-swe-intern.json` & `src/data/experience/rock-city-swe-intern.json` | `src/content/experience/rock-city-swe-intern.json` | `experience` | Enfold to `src/content/experience/rock-city-swe-intern.json`, delete source files |
| `skills.json` & `src/data/skills.json` | `src/content/skills/skills.json` (or category files) | `skills` | Enfold to `src/content/skills/skills.json`, delete source files |
| Root `tokens.css` | `src/styles/tokens.css` | N/A (Styles) | Verify `src/styles/tokens.css`, delete root `tokens.css` |
| Root `compiled-portfolio-styles.css` | `src/styles/compiled-portfolio-styles.css` | N/A (Styles) | Verify `src/styles/compiled-portfolio-styles.css`, delete root CSS |
| Root `zod.ts` | `src/content/config.ts` | N/A (Schemas) | Enfold schema logic into `src/content/config.ts` (M3 task), delete root `zod.ts` |

---

## 5. Repository Deletion List (Cleanup Manifest)

Upon completion of data enfoldment into `src/content/`, the following 10 root files and 1 directory tree MUST be deleted:

### Root Files to Delete (10):
1. `/Users/shaanbawa/portfoliio/bet-on-me.json`
2. `/Users/shaanbawa/portfoliio/uni-league.json`
3. `/Users/shaanbawa/portfoliio/rock-city-pms.json`
4. `/Users/shaanbawa/portfoliio/rock-city-ops-associate.json`
5. `/Users/shaanbawa/portfoliio/rock-city-swe-intern.json`
6. `/Users/shaanbawa/portfoliio/sopranos-syndicate-tracker.json`
7. `/Users/shaanbawa/portfoliio/skills.json`
8. `/Users/shaanbawa/portfoliio/tokens.css`
9. `/Users/shaanbawa/portfoliio/compiled-portfolio-styles.css`
10. `/Users/shaanbawa/portfoliio/zod.ts`

### Directory Tree to Delete (1):
1. `/Users/shaanbawa/portfoliio/src/data/` (including `experience/`, `projects/`, `skills.json`)

---

## 6. Downstream Code Impact Analysis

### 6.1 Imports in `src/pages/index.astro`
Currently imports raw JSON from `../data/projects/` and `../data/experience/` and `../data/skills.json` (lines 8-17).
**Required Update**: Replace raw JSON file imports with Astro `getCollection('projects')`, `getCollection('experience')`, and `getCollection('skills')`.

### 6.2 Imports in Components
- `src/components/ExperienceCard.astro`: line 2 imports `../../zod`.
- `src/components/SkillsBlock.astro`: line 2 imports `../../zod`.
- `src/components/SkillsLedgerCard.astro`: line 2 imports `../../zod`.

**Required Update**: Update schema imports to reference `src/content/config.ts` or inferred collection types once `zod.ts` is enfolded into `src/content/config.ts`.

---

## 7. Migration Verification Plan

1. **Existence Verification**:
   - `test -d src/content/projects` (Must exist and contain 4 JSON files)
   - `test -d src/content/experience` (Must exist and contain 3 JSON files)
   - `test -d src/content/skills` (Must exist and contain skill JSON data)

2. **Absence Verification**:
   - `test ! -f bet-on-me.json`
   - `test ! -f uni-league.json`
   - `test ! -f rock-city-pms.json`
   - `test ! -f rock-city-ops-associate.json`
   - `test ! -f rock-city-swe-intern.json`
   - `test ! -f sopranos-syndicate-tracker.json`
   - `test ! -f skills.json`
   - `test ! -f tokens.css`
   - `test ! -f compiled-portfolio-styles.css`
   - `test ! -f zod.ts`
   - `test ! -d src/data`

3. **Data Integrity Check**:
   - Compare JSON checksums between source files and target files in `src/content/` before removing sources.

4. **Build & Type Check**:
   - Run `npx astro check` to verify Astro content collections compile without error.
