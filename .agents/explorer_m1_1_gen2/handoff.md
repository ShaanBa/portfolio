# Handoff Report: Explorer 1 (Astro Content Layer Specification & Remediation)

## 1. Observation
- **Legacy Config Error**: In Astro `v7.1.6`, executing `npx astro check` or `npm run build` fails with:
  `[LegacyContentConfigError] Found legacy content config file in "src/content/config.ts". Please move this file to "src/content.config.ts" and ensure each collection has a loader defined.`
- **File System State**:
  - Legacy config file exists at `/Users/shaanbawa/portfoliio/src/content/config.ts` (lines 1-57) using deprecated `type: "data"` syntax without loaders.
  - Content payload collections exist at:
    - `/Users/shaanbawa/portfoliio/src/content/projects/` (`bet-on-me.json`, `rock-city-pms.json`, `sopranos-syndicate-tracker.json`, `uni-league.json`)
    - `/Users/shaanbawa/portfoliio/src/content/experience/` (`rock-city-ops-associate.json`, `rock-city-ops-lead.json`, `rock-city-swe-intern.json`)
    - `/Users/shaanbawa/portfoliio/src/content/skills/` (`skills.json`)
- **Component Imports**:
  - `/Users/shaanbawa/portfoliio/src/components/ExperienceCard.astro`: line 2 imports `import { ExperienceSchema, type Experience } from '../content/config';`
  - `/Users/shaanbawa/portfoliio/src/components/SkillsBlock.astro`: line 2 imports `import { SkillTreeSchema, type SkillTree } from '../content/config';`
  - `/Users/shaanbawa/portfoliio/src/components/SkillsLedgerCard.astro`: line 2 imports `import { SkillTreeSchema, type SkillTree } from '../content/config';`
- **Facade Data Integration**:
  - `/Users/shaanbawa/portfoliio/src/pages/index.astro`: lines 9-78 hardcode project titles, summaries, bullets, and tech stacks in a local array instead of binding directly to content collection entry data.

## 2. Logic Chain
1. **Observation 1 (Legacy Error)** -> Astro v5+/v7 requires `src/content.config.ts` at the `src/` root directory and strictly requires each collection to specify a `loader`.
2. **Observation 2 (File System & Loaders)** -> Using `glob({ pattern: '**/*.json', base: './src/content/<collection>' })` from `astro/loaders` provides proper Content Layer loading for JSON data files in `projects`, `experience`, and `skills`.
3. **Observation 3 (Component Imports)** -> Relocating `src/content/config.ts` to `src/content.config.ts` requires updating component import declarations from `'../content/config'` to `'../content.config'`.
4. **Observation 4 (Facade Data)** -> Binding `getCollection("projects")` and `getCollection("experience")` in `src/pages/index.astro` guarantees that component rendering relies on the single source of truth (SSOT) data in `src/content/`.

## 3. Caveats
- `src/content/skills/skills.json` is a single JSON file containing an array of skill category objects. Defining `schema: SkillTreeSchema` (which is `z.array(SkillCategorySchema)`) with `glob({ pattern: '**/*.json', base: './src/content/skills' })` accurately matches the array output loaded by Astro for `skills.json`.

## 4. Conclusion
- `src/content/config.ts` must be removed and replaced by `src/content.config.ts`.
- `src/content.config.ts` must export `ProjectSchema`, `ExperienceSchema`, `SkillCategorySchema`, `SkillTreeSchema`, inferred types, and `collections` using `glob()` loaders from `astro/loaders`.
- Component imports in `ExperienceCard.astro`, `SkillsBlock.astro`, and `SkillsLedgerCard.astro` must point to `'../content.config'`.
- `src/pages/index.astro` must be refactored to consume full `.data` properties from content collections.

## 5. Verification Method
1. Inspect proposed structure in `/Users/shaanbawa/portfoliio/.agents/explorer_m1_1_gen2/analysis.md`.
2. Upon implementation:
   - Run `npx astro check` to verify zero TypeScript errors.
   - Run `npm run build` to confirm build completes without `LegacyContentConfigError`.
