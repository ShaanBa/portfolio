# Comprehensive Analysis & Remediation Plan: Content Config Migration & Build Verification

**Agent**: Explorer 3 (teamwork_preview_explorer)  
**Milestone**: M1 Iteration 2 (Remediation)  
**Working Directory**: `/Users/shaanbawa/portfoliio/.agents/explorer_m1_3_gen2`  
**Date**: 2026-07-31  

---

## 1. Executive Summary

This report provides the full forensic analysis and actionable remediation plan for Milestone 1 Iteration 2. In Iteration 1, `npx astro check` and `npm run build` failed due to `[LegacyContentConfigError]` caused by placing content schema configurations at `src/content/config.ts` instead of Astro 5+ / 7+ required location `src/content.config.ts`. Additionally, `src/pages/index.astro` retained hardcoded facade data literals for project cards while only binding `url`.

This document identifies all rules, documentation, graph specifications, component import paths, and page data bindings that must be updated, and specifies exact build verification commands and acceptance criteria for Iteration 2.

---

## 2. Rules & Specification Updates (`src/content/config.ts` -> `src/content.config.ts`)

### 2.1 `.agents/rules.md` Section 5 Audit
- **Line 59**:
  - *Current text*:
    `All Zod schemas (ProjectSchema, ExperienceSchema, SkillTreeSchema, etc.) and Content Collections definitions MUST be declared and exported from src/content/config.ts. Relocating schemas to loose root files or creating duplicate Zod files is strictly prohibited.`
  - *Remediation*: Update `src/content/config.ts` to `src/content.config.ts`.
  - *Required text*:
    `All Zod schemas (ProjectSchema, ExperienceSchema, SkillTreeSchema, etc.) and Content Collections definitions MUST be declared and exported from src/content.config.ts. Relocating schemas to loose root files or creating duplicate Zod files is strictly prohibited.`

### 2.2 `.agents/graph.json` Manifest Audit
- **Line 10**: `"description": "Validates raw JSON data nodes against Zod schemas in src/content/config.ts"` -> update to `src/content.config.ts`.
- **Line 14**: `"src/content/config.ts"` in `inputs` array for `schema_validation` -> update to `"src/content.config.ts"`.
- **Line 45**: `"src/content/config.ts"` in `inputs` array for `component_builder` -> update to `"src/content.config.ts"`.

### 2.3 `.agents/orchestrator/PROJECT.md` Audit
- **Line 10**: `- **Validation Pipeline**: Zod schema validation (src/content/config.ts)...` -> update to `src/content.config.ts`.
- **Line 18**: `Build src/content/config.ts for project, experience, skill collections...` -> update to `src/content.config.ts`.
- **Line 22**: `### Content Collections Configuration (src/content/config.ts)` -> update to `src/content.config.ts`.
- **Line 50**: `├── content/config.ts` in layout tree -> update to `├── content.config.ts`.

---

## 3. Component Import Path Mapping

Moving `src/content/config.ts` to `src/content.config.ts` shifts the file up one directory level (from `src/content/` to `src/`). All components importing Zod schemas or types from content configuration must update their relative import paths.

| Component File Path | Current Import Statement | Remediation / Target Import Statement | Imported Identifiers |
|---|---|---|---|
| `src/components/ExperienceCard.astro` (line 2) | `import { ExperienceSchema, type Experience } from '../content/config';` | `import { ExperienceSchema, type Experience } from '../content.config';` | `ExperienceSchema`, `Experience` |
| `src/components/SkillsBlock.astro` (line 2) | `import { SkillTreeSchema, type SkillTree } from '../content/config';` | `import { SkillTreeSchema, type SkillTree } from '../content.config';` | `SkillTreeSchema`, `SkillTree` |
| `src/components/SkillsLedgerCard.astro` (line 2) | `import { SkillTreeSchema, type SkillTree } from '../content/config';` | `import { SkillTreeSchema, type SkillTree } from '../content.config';` | `SkillTreeSchema`, `SkillTree` |
| `src/components/ProjectLedgerCard.astro` (line 2) | *(Has local `interface ProjectItem`)* | `import { ProjectSchema, type Project } from '../content.config';` | `ProjectSchema`, `Project` |

---

## 4. Astro 5+ / 7+ Content Collections Configuration (`src/content.config.ts`)

In Astro 5+, `defineCollection` requires explicit `loader` functions (e.g. `glob` from `astro/loaders`).

### Proposed `src/content.config.ts` Structure:
```typescript
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string().url(),
  summary: z.string(),
  techStack: z.array(z.string()),
  designChoices: z.array(z.string()),
  githubUrl: z.string().url().optional(),
  completionDate: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  location: z.string(),
  period: z.string(),
  highlights: z.array(z.string()),
});

export type Experience = z.infer<typeof ExperienceSchema>;

export const SkillCategorySchema = z.object({
  category: z.string(),
  skills: z.array(z.string()),
});

export const SkillTreeSchema = z.array(SkillCategorySchema);

export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type SkillTree = z.infer<typeof SkillTreeSchema>;

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: ProjectSchema,
});

const experienceCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/experience" }),
  schema: ExperienceSchema,
});

const skillsCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/skills" }),
  schema: SkillTreeSchema,
});

export const collections = {
  projects: projectsCollection,
  experience: experienceCollection,
  skills: skillsCollection,
};
```

---

## 5. Page Data Integration Remediation (`src/pages/index.astro`)

### 5.1 Issue Identified
In `src/pages/index.astro` (lines 9-78), project title, category, summary, bullets/designChoices, and techStack are hardcoded as static strings inside an inline `projects` array, and only `url` uses `getEntry`.

### 5.2 Remediation
Bind the `projects` array dynamically from `getCollection("projects")` (or `getEntry` for each project JSON):
```astro
---
import { getCollection, getEntry } from "astro:content";

const projectEntries = await getCollection("projects");
const projects = projectEntries.map(entry => ({
  id: entry.data.id,
  title: entry.data.title,
  category: "Dual-Database Architecture", // or derived from category / tags
  summary: entry.data.summary,
  bullets: entry.data.designChoices,
  techStack: entry.data.techStack,
  url: entry.data.url,
  githubUrl: entry.data.githubUrl
}));
---
```

---

## 6. Build & Type Check Verification Protocol

### 6.1 Required Verification Commands
1. **Type & Schema Validation**:
   `ASTRO_TELEMETRY_DISABLED=1 npx astro check`
2. **Production Build Verification**:
   `ASTRO_TELEMETRY_DISABLED=1 npm run build`

*Note: `ASTRO_TELEMETRY_DISABLED=1` is required to prevent sandboxed permission failures when Astro CLI attempts to write to `~/.config/astro`.*

### 6.2 Acceptance Criteria for Iteration 2
- [ ] `src/content/config.ts` is relocated to `src/content.config.ts`.
- [ ] `src/content.config.ts` imports `glob` from `astro/loaders` and sets explicit loaders for all collections (`projects`, `experience`, `skills`).
- [ ] All references to `src/content/config.ts` in `.agents/rules.md` (Section 5), `.agents/graph.json`, and `.agents/orchestrator/PROJECT.md` are updated to `src/content.config.ts`.
- [ ] Component imports in `ExperienceCard.astro`, `SkillsBlock.astro`, `SkillsLedgerCard.astro`, and `ProjectLedgerCard.astro` reference `../content.config`.
- [ ] `src/pages/index.astro` binds all `projects` card data directly from `getCollection("projects")`.
- [ ] `ASTRO_TELEMETRY_DISABLED=1 npx astro check` returns **0 errors and 0 warnings**.
- [ ] `ASTRO_TELEMETRY_DISABLED=1 npm run build` returns exit code **0** and generates build assets under `dist/`.
