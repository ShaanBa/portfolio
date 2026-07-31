# Analysis: Astro v7 Content Collection Architecture & Remediation Plan

## 1. Executive Summary & Root Cause Analysis

### Root Cause of `LegacyContentConfigError`
In Astro v5.0+ and `astro@^7.1.6`, the legacy Content Collections system (`type: "data"` inside `src/content/config.ts`) was deprecated and removed in favor of the new **Content Layer API**.
When Astro encounters a configuration file located at `src/content/config.ts`, it halts execution and throws the following error:
```
[LegacyContentConfigError] Found legacy content config file in "src/content/config.ts". Please move this file to "src/content.config.ts" and ensure each collection has a loader defined.
```

### Content Layer Requirements in Astro v7 (`astro@^7.1.6`)
1. **File Location**: The content configuration file MUST be located at `src/content.config.ts` (at the root of `src/`). `src/content/config.ts` MUST be removed.
2. **Module Imports**:
   - `defineCollection` and `z` are imported from `"astro:content"`.
   - `glob` loader is imported from `"astro/loaders"`.
3. **Loader Configuration**:
   - Every collection must define a `loader` property using `glob({ pattern: '**/*.json', base: './src/content/<collection>' })`.
   - Legacy `type: "data"` or `type: "content"` properties are invalid and must be removed.
4. **Named Schema Exports**:
   - All Zod schemas (`ProjectSchema`, `ExperienceSchema`, `SkillCategorySchema`, `SkillTreeSchema`) and inferred TypeScript types must be exported so components can import and validate payloads directly.

---

## 2. Exact Proposed Code Structure for `src/content.config.ts`

```typescript
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// -----------------------------------------------------------------------------
// 1. Named Zod Schemas & Inferred Types
// -----------------------------------------------------------------------------

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string().url(),
  summary: z.string(),
  techStack: z.array(z.string()),
  designChoices: z.array(z.string()),
  githubUrl: z.string().url().optional(),
  completionDate: z.string().optional(),
  category: z.string().optional(),
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

export type SkillCategory = z.infer<typeof SkillCategorySchema>;

export const SkillTreeSchema = z.array(SkillCategorySchema);

export type SkillTree = z.infer<typeof SkillTreeSchema>;

// -----------------------------------------------------------------------------
// 2. Collection Definitions using Content Layer glob() Loaders
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// 3. Collections Export
// -----------------------------------------------------------------------------

export const collections = {
  projects: projectsCollection,
  experience: experienceCollection,
  skills: skillsCollection,
};
```

---

## 3. Component Import & Data Binding Remediation Plan

### A. File Migration & Cleanup
1. Delete legacy `src/content/config.ts`.
2. Create canonical `src/content.config.ts` using the proposed code structure above.

### B. Updating Component Import Paths
Components currently importing schemas or types from `'../content/config'` must be updated to import from `'../content.config'`:
- **`src/components/ExperienceCard.astro`**:
  - *Current*: `import { ExperienceSchema, type Experience } from '../content/config';`
  - *Proposed*: `import { ExperienceSchema, type Experience } from '../content.config';`
- **`src/components/SkillsBlock.astro`**:
  - *Current*: `import { SkillTreeSchema, type SkillTree } from '../content/config';`
  - *Proposed*: `import { SkillTreeSchema, type SkillTree } from '../content.config';`
- **`src/components/SkillsLedgerCard.astro`**:
  - *Current*: `import { SkillTreeSchema, type SkillTree } from '../content/config';`
  - *Proposed*: `import { SkillTreeSchema, type SkillTree } from '../content.config';`

### C. Eliminating Facade Data in `src/pages/index.astro` (Addressing Observation 3)
In `src/pages/index.astro`, instead of creating hardcoded string arrays for title, summary, techStack, and bullets while only fetching `url` from `getEntry`:
- Fetch projects using `const projectEntries = await getCollection("projects");`.
- Extract full data payloads (`entry.data`) which include `title`, `url`, `summary`, `techStack`, and `designChoices`.
- Pass `designChoices` as the bullets/rationale array to `ProjectLedgerCard`.
- Map experience entries from `getCollection("experience")` directly to `ExperienceCard` components.

---

## 4. Verification Plan

1. **Schema Check**:
   Run `npx astro check` to verify TypeScript compilation and schema alignment across all collections and components.
2. **Production Build**:
   Run `npm run build` to verify Astro Content Layer correctly ingests all JSON files (`projects`, `experience`, `skills`) and generates static HTML without throwing `LegacyContentConfigError`.
