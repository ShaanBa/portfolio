# Project Specification: Portfolio Repository Refactoring

## Architecture
Deterministic Directed Acyclic Graph (DAG) architecture for Astro static portfolio.
- **Content SSOT**: Astro Content Collections in `src/content/` (`projects/`, `experience/`, `skills/`).
- **Style SSOT**: CSS Token variables in `src/styles/tokens.css` bound to `src/styles/global.css`.
- **Component Layout**:
  - `src/components/astro/`: Static layout components (`.astro`).
  - `src/components/react/`: Interactive client islands (`.tsx`).
- **Validation Pipeline**: Zod schema validation (`src/content.config.ts`), Astro type/schema check (`astro check`), and static site build (`astro build`).
- **Agent Workflow Manifest**: `.agents/graph.json` and `.agents/rules.md`.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Root Artifact Cleanup & SSOT Enfoldment | Relocate root JSONs & CSS into `src/content/` and `src/styles/`, delete root loose files, enforce `.agents/rules.md` | none | IN_PROGRESS |
| 2 | M2: Component Hierarchy & Framework Separation | Reorganize `src/components/` into `astro/` & `react/`, resolve duplicates, align `ProjectLedgerCard` | M1 | PLANNED |
| 3 | M3: Typed Zod Schemas & Content Collections | Build `src/content.config.ts` for project, experience, skill collections, validate raw data nodes | M1, M2 | PLANNED |
| 4 | M4: Machine-Readable Agent DAG Manifest & Scripts | Validate `.agents/graph.json`, add package scripts (`check:schemas`, `build:tokens`), run validation suite | M3 | PLANNED |

## Interface Contracts
### Content Collections Configuration (`src/content.config.ts`)
- `projects`: Schema validating project payloads (`id`, `title`, `summary`, `techStack`, `designChoices`, `link`, etc.)
- `experience`: Schema validating experience payloads (`company`, `role`, `period`, `highlights`, etc.)
- `skills`: Schema validating skill payloads (`category`, `items`, etc.)

### Design Tokens (`src/styles/tokens.css`)
- `--surface-panel`: `#06140e` / panel background
- `--border-outline`: `#082c1d` / border color
- `--shadow-panel`: hard offset `4px 4px 0px #050908`
- `--font-mono`: IBM Plex Mono / Space Mono
- `--font-header`: Inter / display font
- `--primary-accent`: `#00ff87` / Emerald

## Code Layout
```
/Users/shaanbawa/portfoliio/
├── .agents/
│   ├── graph.json
│   ├── rules.md
│   └── orchestrator/
│       ├── BRIEFING.md
│       ├── plan.md
│       ├── progress.md
│       └── PROJECT.md
├── package.json
├── astro.config.mjs
└── src/
    ├── content.config.ts
    ├── content/
    │   ├── projects/
    │   ├── experience/
    │   └── skills/
    ├── styles/
    │   ├── tokens.css
    │   └── global.css
    ├── components/
    │   ├── astro/
    │   └── react/
    └── pages/
        └── index.astro
```
