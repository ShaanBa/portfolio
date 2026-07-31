# Analysis Report: Root Artifact Cleanup & SSOT Enfoldment (CSS & Zod Schemas)

**Explorer**: Explorer 2 (`teamwork_preview_explorer`)  
**Milestone**: Milestone 1 (Root Artifact Cleanup & SSOT Enfoldment)  
**Date**: 2026-07-31  

---

## 1. Executive Summary

This investigation evaluates the current status of root-level CSS artifacts (`tokens.css`, `compiled-portfolio-styles.css`), `src/styles/` files (`tokens.css`, `global.css`, `compiled-portfolio-styles.css`), and root `zod.ts` versus `src/content/config.ts`.

Key Findings:
1. **Design Tokens Disconnect**: Root `tokens.css` defines the actual CSS variables used across the UI (`--surface-panel`, `--border-outline`, `--shadow-panel`, `--primary-accent`, `--font-header`, `--font-mono`), whereas `src/styles/tokens.css` contains an unrelated color palette (`--deep-imperial-emerald`, `--warm-brass`, etc.). `src/styles/global.css` hardcodes the root tokens in an inline `:root` block rather than importing `src/styles/tokens.css`.
2. **Dead Compiled CSS Artifacts**: Root `compiled-portfolio-styles.css` and `src/styles/compiled-portfolio-styles.css` are 100% byte-for-byte identical (370 lines) and are completely unreferenced/un-imported anywhere. `src/styles/global.css` (406 lines) is a strict superset of compiled portfolio styles and is the actual global stylesheet imported by `src/pages/index.astro`.
3. **Zod Schema SSOT Violation**: Root `zod.ts` contains standalone Zod schemas (`ProjectSchema`, `ExperienceSchema`, `SkillTreeSchema`, etc.) directly imported by components (`ExperienceCard.astro`, `SkillsBlock.astro`, `SkillsLedgerCard.astro`). `src/content/config.ts` does not yet exist.

---

## 2. Detailed Inspection & Comparison Findings

### A. CSS Tokens Inspection (`tokens.css` Root vs `src/styles/tokens.css`)

- **Root `tokens.css` (22 lines)**:
  ```css
  :root {
    --blue: #1f8a5c;
    --blue-dark: #166b47;
    --ink: #eef2ec;
    --ink-soft: #93a196;
    --paper: #0d1310;
    --panel: #141d18;
    --border: #35473d;
    --shadow: #050908;
    --deep: #070b09;

    /* Aliases for compatibility */
    --bg-base: var(--paper);
    --surface-panel: var(--panel);
    --surface-chip: var(--paper);
    --primary-accent: var(--blue);
    --border-outline: var(--border);
    --shadow-panel: 4px 4px 0 var(--shadow);
    
    --font-header: 'Inter', sans-serif;
    --font-mono: 'IBM Plex Mono', monospace;
  }
  ```
- **`src/styles/tokens.css` (28 lines)**:
  Contains `--deep-imperial-emerald` (`#082c1d`), `--cyber-emerald` (`#00ff87`), `--warm-brass` (`#d4af37`), `--obsidian` (`#06140e`), `--font-serif`, `--font-display`, `--font-sans`, `--font-mono`.
- **Conflict Analysis**:
  - `ProjectLedgerCard.astro`, `ExperienceCard.astro`, `SkillsBlock.astro`, `Hero.astro`, and `index.astro` use variable names defined in root `tokens.css` (`var(--surface-panel)`, `var(--border-outline)`, `var(--shadow-panel)`, `var(--primary-accent)`, `var(--font-mono)`, `var(--font-header)`).
  - `src/styles/global.css` (lines 3–24) hardcodes the exact `:root` block from root `tokens.css`.
  - `src/styles/tokens.css` lacks these essential variable definitions, creating a complete break in style SSOT if root `tokens.css` is removed without updating `src/styles/tokens.css`.

### B. Compiled Styles Inspection (`compiled-portfolio-styles.css` vs `global.css`)

- **Root `compiled-portfolio-styles.css` vs `src/styles/compiled-portfolio-styles.css`**:
  - Identical 370-line stylesheets.
  - Zero imports across the codebase (`grep_search` found 0 import statements).
- **Comparison with `src/styles/global.css` (406 lines)**:
  - `src/styles/global.css` contains every rule present in `compiled-portfolio-styles.css` plus Google Font `@import`, `-webkit-font-smoothing: antialiased`, `.sep`, `.about-block`, `.about-subtitle`, `.projects-list`, `.contact-inner`, and responsive grid overrides.
  - `src/pages/index.astro` imports `import "../styles/global.css";`.

### C. Zod Schemas Inspection (`zod.ts` vs `src/content/config.ts`)

- **Root `zod.ts` (35 lines)**:
  - Exports: `ProjectSchema`, `Project` type, `ExperienceSchema`, `Experience` type, `SkillCategorySchema`, `SkillTreeSchema`, `SkillCategory` type, `SkillTree` type.
  - Referenced in:
    - `src/components/ExperienceCard.astro`: `import { ExperienceSchema, type Experience } from '../../zod';`
    - `src/components/SkillsBlock.astro`: `import { SkillTreeSchema, type SkillTree } from '../../zod';`
    - `src/components/SkillsLedgerCard.astro`: `import { SkillTreeSchema, type SkillTree } from '../../zod';`
- **`src/content/config.ts`**:
  - File does not exist yet.
  - Must be created using Astro 5+ `defineCollection` and `z` from `astro:content`.

---

## 3. Consolidation & Relocation Strategy

### Strategy Phase 1: CSS Token & Global Style Consolidation

1. **Unify `src/styles/tokens.css`**:
   Update `src/styles/tokens.css` to combine the canonical variables required by `AGENTS.md` / `PROJECT.md` and the existing UI components with alias variables for palette safety.

2. **Refactor `src/styles/global.css`**:
   Remove the inline `:root` block (lines 3–24) from `src/styles/global.css` and replace it with `@import "./tokens.css";` at the top of the file.

3. **Delete Root & Loose CSS Artifacts**:
   - Remove `/Users/shaanbawa/portfoliio/tokens.css`
   - Remove `/Users/shaanbawa/portfoliio/compiled-portfolio-styles.css`
   - Remove `/Users/shaanbawa/portfoliio/src/styles/compiled-portfolio-styles.css`

### Strategy Phase 2: Schema Migration to `src/content/config.ts`

1. **Create `src/content/config.ts`**:
   - Define Astro Content Collections for `projects`, `experience`, and `skills` using `defineCollection` and `z`.
   - Export `ProjectSchema`, `ExperienceSchema`, `SkillCategorySchema`, `SkillTreeSchema`, and their corresponding TypeScript types (`Project`, `Experience`, `SkillCategory`, `SkillTree`).

2. **Update Component Import Paths**:
   - `src/components/ExperienceCard.astro`: Update import from `../../zod` to `../content/config` (or relative path when relocated in M2).
   - `src/components/SkillsBlock.astro`: Update import from `../../zod` to `../content/config`.
   - `src/components/SkillsLedgerCard.astro`: Update import from `../../zod` to `../content/config`.

3. **Delete Root `zod.ts`**:
   - Remove `/Users/shaanbawa/portfoliio/zod.ts`

---

## 4. Proposed File Specs & Code Snippets

### A. Canonical `src/styles/tokens.css`
```css
:root {
  /* Core Tactical Palette */
  --blue: #1f8a5c;
  --blue-dark: #166b47;
  --ink: #eef2ec;
  --ink-soft: #93a196;
  --paper: #0d1310;
  --panel: #141d18;
  --border: #35473d;
  --shadow: #050908;
  --deep: #070b09;

  /* Editorial Palette Aliases */
  --deep-imperial-emerald: #082c1d;
  --champagne-cream: #f5f2eb;
  --warm-brass: #d4af37;
  --cyber-emerald: #00ff87;
  --obsidian: #06140e;
  --emerald-dark-surface: #0b3826;

  /* Standardized Design System Tokens (AGENTS.md / PROJECT.md) */
  --bg-base: var(--paper);
  --surface-panel: var(--panel);
  --surface-chip: var(--paper);
  --primary-accent: #00ff87;
  --border-outline: var(--border);
  --shadow-panel: 4px 4px 0px var(--shadow);
  
  /* Typography Tokens */
  --font-header: 'Inter', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
  --font-serif: 'Instrument Serif', 'Sentient', serif;
  --font-sans: 'Cabinet Grotesk', sans-serif;
}
```

### B. Refactored `src/styles/global.css` (Top Lines)
```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700;800&display=swap');
@import "./tokens.css";

* {
  box-sizing: border-box;
}
...
```

### C. Proposed `src/content/config.ts`
```typescript
import { defineCollection, z } from 'astro:content';

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string().optional(),
  summary: z.string(),
  bullets: z.array(z.string()).optional(),
  designChoices: z.array(z.string()).optional(),
  techStack: z.array(z.string()),
  url: z.string().optional(),
  githubUrl: z.string().optional(),
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
  type: 'data',
  schema: ProjectSchema,
});

const experienceCollection = defineCollection({
  type: 'data',
  schema: ExperienceSchema,
});

const skillsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    categories: SkillTreeSchema,
  }),
});

export const collections = {
  projects: projectsCollection,
  experience: experienceCollection,
  skills: skillsCollection,
};
```

---

## 5. Summary Table of Files to Relocate, Delete, and Update

| Action | Target Path | Rationale |
|---|---|---|
| **Update** | `src/styles/tokens.css` | Unify token SSOT to match `AGENTS.md` and UI requirements |
| **Update** | `src/styles/global.css` | Import `tokens.css` via `@import` instead of duplicating `:root` |
| **Create** | `src/content/config.ts` | Enfold Zod schemas and Astro content collections SSOT |
| **Update** | `src/components/ExperienceCard.astro` | Update Zod import path from `../../zod` to `../content/config` |
| **Update** | `src/components/SkillsBlock.astro` | Update Zod import path from `../../zod` to `../content/config` |
| **Update** | `src/components/SkillsLedgerCard.astro` | Update Zod import path from `../../zod` to `../content/config` |
| **Delete** | `tokens.css` (root) | Root file elimination (SSOT violation) |
| **Delete** | `compiled-portfolio-styles.css` (root) | Root file elimination (SSOT violation) |
| **Delete** | `src/styles/compiled-portfolio-styles.css` | Unused duplicate stylesheet |
| **Delete** | `zod.ts` (root) | Root file elimination (SSOT violation) |
