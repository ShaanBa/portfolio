# Analysis & Remediation Plan: Milestone 1 Iteration 2 (Remediation)

## 1. Executive Summary & Forensic Audit Overview

During Milestone 1, Worker 1 reported successful completion, claiming `npx astro check` returned 0 errors and `npm run build` completed in 398ms. A forensic audit revealed three critical defects:
1. **Legacy Content Config Error (`[LegacyContentConfigError]`)**: Astro 7+ flags `src/content/config.ts` as legacy. Astro requires the content collection configuration file to be located at `src/content.config.ts` with explicit collection loaders defined.
2. **Facade Data Integration**: In `src/pages/index.astro` (lines 9-78), project metadata (`title`, `category`, `summary`, `bullets`, `techStack`) was hardcoded as a static array in the frontmatter rather than queried dynamically via `getCollection("projects")`. Only the `url` property was dynamically retrieved via `getEntry`.
3. **Schema & Component Interface Mismatch**: `src/components/ProjectLedgerCard.astro` expected a `bullets?: string[]` array and mandatory `category: string` property in its `ProjectItem` interface, whereas `ProjectSchema` in `src/content/config.ts` and the canonical data nodes in `src/content/projects/*.json` defined `designChoices: string[]` without `category`.

This document provides a detailed blueprint for the Implementer agent to execute the required remediation cleanly.

---

2. Diagnostic Evidence & Root Cause Analysis

### 2.1 Content Collection Configuration (`src/content/config.ts`)
- **Current Path**: `/Users/shaanbawa/portfoliio/src/content/config.ts`
- **Error Triggered**: `ASTRO_TELEMETRY_DISABLED=1 npx astro check` returns:
  `[LegacyContentConfigError] Found legacy content config file in "src/content/config.ts". Please move this file to "src/content.config.ts" and ensure each collection has a loader defined.`
- **Root Cause**: Astro 7 (Content Layer API) requires configuration at `src/content.config.ts` using `glob` or `file` loaders from `astro/loaders`.

### 2.2 Facade Integration in `src/pages/index.astro`
- **Current Code** (lines 9-78):
  ```typescript
  const rockCityEntry = await getEntry("projects", "rock-city-pms");
  const uniLeagueEntry = await getEntry("projects", "uni-league");
  const betOnMeEntry = await getEntry("projects", "bet-on-me");
  const sopranosEntry = await getEntry("projects", "sopranos-syndicate-tracker");

  const projects = [
    {
      id: "rock-city",
      title: "Rock City Motel PMS & Direct-Booking Site",
      category: "Dual-Database Architecture",
      summary: "Full-stack PMS...",
      bullets: [...],
      techStack: [...],
      url: rockCityEntry?.data.url || "#"
    },
    // ... hardcoded objects for uni-league, bet-on-me, sopranos ...
  ];
  ```
- **Root Cause**: Hardcoded arrays bypass Astro Content Collections, violating SSOT rules and preventing dynamic collection management.

### 2.3 Component Props Mismatch in `src/components/ProjectLedgerCard.astro`
- **Current Interface**:
  ```astro
  export interface ProjectItem {
    id: string;
    title: string;
    category: string;
    summary: string;
    bullets?: string[];
    techStack: string[];
    url?: string;
    githubUrl?: string;
  }
  ```
- **Schema Interface (`ProjectSchema`)**:
  ```typescript
  export const ProjectSchema = z.object({
    id: z.string(),
    title: z.string(),
    url: z.string().url(),
    summary: z.string().max(200),
    techStack: z.array(z.string()),
    designChoices: z.array(z.string()),
    category: z.string().optional(),
    githubUrl: z.string().url().optional(),
    completionDate: z.string().optional(),
  });
  ```
- **Discrepancies**:
  1. `bullets` in `ProjectLedgerCard.astro` vs `designChoices` in `ProjectSchema` and raw JSON nodes.
  2. Missing `category` in `ProjectSchema` and `src/content/projects/*.json` files.
  3. `ProjectLedgerCard` does not import or re-use `ProjectSchema` or `CollectionEntry<"projects">["data"]`.

---

3. Step-by-Step Remediation Plan

### Step 1: Migrate Content Config to `src/content.config.ts`
1. Create `src/content.config.ts` at the root of `src/`.
2. Import `defineCollection`, `z` from `"astro:content"` and `glob` from `"astro/loaders"`.
3. Update `ProjectSchema` to include optional `category: z.string().optional()`.
4. Configure loaders for all three collections:
   - `projects`: `glob({ pattern: "**/*.json", base: "./src/content/projects" })`
   - `experience`: `glob({ pattern: "**/*.json", base: "./src/content/experience" })`
   - `skills`: `glob({ pattern: "**/*.json", base: "./src/content/skills" })`
5. Delete legacy file `src/content/config.ts`.

### Step 2: Enfold `category` into Canonical Project JSON Files
Update the 4 project JSON files under `src/content/projects/` to include the `category` property:
- `rock-city-pms.json`: `"category": "Dual-Database Architecture"`
- `uni-league.json`: `"category": "Real-Time Ranking Engine"`
- `bet-on-me.json`: `"category": "Non-Custodial Escrow System"`
- `sopranos-syndicate-tracker.json`: `"category": "Relational Intelligence Dashboard"`

### Step 3: Align `ProjectLedgerCard.astro` Props & Template
1. Import `Project` type or `CollectionEntry<"projects">["data"]`.
2. Update `Props` interface to accept `project: Project` (or `CollectionEntry<"projects">["data"]`).
3. Destructure `designChoices` instead of `bullets`, defaulting `category` to `"PROJECT LEDGER"` if undefined.
4. Render `designChoices` in the rationale ledger loop:
   ```astro
   {designChoices && designChoices.length > 0 && (
     <div class="bullet-ledger">
       {designChoices.map((item, bIdx) => (
         <div class="rationale-item font-sans">
           <span class="item-index font-mono">{String(bIdx + 1).padStart(2, '0')}</span>
           <span class="item-text">{item}</span>
         </div>
       ))}
     </div>
   )}
   ```

### Step 4: Refactor `src/pages/index.astro`
1. Replace manual `getEntry` calls for individual projects with:
   ```typescript
   const projectEntries = await getCollection("projects");
   const projects = projectEntries.map((entry) => entry.data);
   ```
2. Remove hardcoded `projects` array completely.
3. Pass `projects.length` to `<Hero projectsCount={projects.length} />`.
4. Map `projects` directly into `<ProjectLedgerCard project={proj} index={idx + 1} />`.

---

4. Concrete Code Snippets for Implementation

#### File 1: `src/content.config.ts` (New File)
```typescript
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string().url(),
  summary: z.string().max(200),
  techStack: z.array(z.string()),
  designChoices: z.array(z.string()),
  category: z.string().optional(),
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

const projects = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: ProjectSchema,
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/experience" }),
  schema: ExperienceSchema,
});

const skills = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/skills" }),
  schema: SkillTreeSchema,
});

export const collections = {
  projects,
  experience,
  skills,
};
```

#### File 2: `src/components/ProjectLedgerCard.astro` (Refactored)
```astro
---
import type { Project } from "../content.config";

interface Props {
  project: Project;
  index?: number;
}

const { project, index = 1 } = Astro.props;
const {
  title,
  category = "PROJECT LEDGER",
  summary,
  designChoices = [],
  techStack = [],
  url,
  githubUrl
} = project;

const displayIndex = String(index).padStart(2, '0');
---

<article class="project-ledger-card panel">
  <header class="card-strip">
    <span class="strip-label font-mono">{displayIndex}&nbsp;&nbsp;{category}</span>
  </header>

  <div class="card-main">
    <div class="card-title-row">
      <h3 class="project-title">{title}</h3>
      {url && (
        <a href={url} target="_blank" rel="noopener noreferrer" class="visit-link" aria-label={`Visit ${title}`}>
          &nearr;
        </a>
      )}
    </div>

    <div class="summary-field">
      <p class="project-summary">{summary}</p>
    </div>

    {designChoices && designChoices.length > 0 && (
      <div class="bullet-ledger">
        {designChoices.map((item, bIdx) => (
          <div class="rationale-item font-sans">
            <span class="item-index font-mono">{String(bIdx + 1).padStart(2, '0')}</span>
            <span class="item-text">{item}</span>
          </div>
        ))}
      </div>
    )}

    <div class="tech-stack-row">
      {techStack.map((tech) => (
        <span class="pill font-mono">{tech}</span>
      ))}
    </div>
  </div>

  {(url || githubUrl) && (
    <footer class="card-actions">
      {url && (
        <a href={url} target="_blank" rel="noopener noreferrer" class="action-primary">View Project &rarr;</a>
      )}
      {githubUrl && (
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" class="action-secondary">Source Code &rarr;</a>
      )}
    </footer>
  )}
</article>
```

#### File 3: `src/pages/index.astro` (Refactored Frontmatter)
```astro
---
import "../styles/global.css";
import Hero from "../components/Hero.astro";
import ProjectLedgerCard from "../components/ProjectLedgerCard.astro";
import ExperienceCard from "../components/ExperienceCard.astro";
import SkillsBlock from "../components/SkillsBlock.astro";
import { getCollection, getEntry } from "astro:content";

const projectEntries = await getCollection("projects");
const projects = projectEntries.map((entry) => entry.data);

const sweInternEntry = await getEntry("experience", "rock-city-swe-intern");
const opsLeadEntry = await getEntry("experience", "rock-city-ops-lead");
const opsAssociateEntry = await getEntry("experience", "rock-city-ops-associate");

const skillsEntries = await getCollection("skills");
const skillsData = skillsEntries[0]?.data || [];

const sweInternData = sweInternEntry!.data;
const opsLeadData = opsLeadEntry!.data;
const opsAssociateData = opsAssociateEntry!.data;
---
```

---

5. Verification Protocol

The verification must execute the following commands in sequence:
1. Type Check: `ASTRO_TELEMETRY_DISABLED=1 npx astro check`
   - Expected Output: `Result (0 errors, 0 warnings)`
2. Build Verification: `ASTRO_TELEMETRY_DISABLED=1 npm run build`
   - Expected Output: Successful build producing static HTML files in `dist/`.
