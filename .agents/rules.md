# Antigravity Workspace Rules: DAG Execution & Anti-Slop Directive

## 1. SUB-AGENT SPAWNING & DAG EXECUTION BOUNDARIES

- **STRICT DEPTH CEILING (`max_depth = 1`):** Only the primary Orchestrator agent holds permission to spawn sub-agents. Sub-agents (e.g., `StyleResearcher`, `CodeBuilder`) are STRICTLY FORBIDDEN from spawning child agents under any circumstances.
- **DAG EXECUTION FLOW:** All agent workflows MUST execute strictly as a Directed Acyclic Graph (DAG) with zero circular loops:
  - **Stage 1 (Parallel Research):** `StyleResearcher` and `LayoutArchitect` execute concurrently.
  - **Stage 2 (Convergence Gate):** The Orchestrator validates outputs and writes `shared_state/master_spec.json`. `CodeBuilder` then reads this file to construct UI components.
  - **Stage 3 (Visual Audit):** `VisualAuditor` uses the built-in Chrome browser (`localhost`) to take a screenshot artifact and verify the visual output.
- **NO UNBOUNDED RETRIES:** Sub-agents are limited to a MAX of 1 revision pass. If `CodeBuilder` output fails visual verification, `VisualAuditor` must write a targeted `patch_diff.json` rather than requesting a complete re-generation.

---

## 2. TOKEN CONSERVATION & STATE ISOLATION

- **PASS-BY-REFERENCE ONLY:** Sub-agents MUST NOT stream or echo raw conversational history back to the Orchestrator. Sub-agents write structured JSON artifacts directly to `shared_state/` and terminate immediately.
- **CONTEXT PRUNING:** When feeding `shared_state/master_spec.json` into `CodeBuilder`, strip out all markdown commentary, conversational prose, and meta-descriptions. Supply pure JSON schema, color tokens, and Tailwind utility strings only.
- **FILE MODIFICATION SCOPE:** `CodeBuilder` must apply targeted line edits rather than rewriting multi-hundred-line component files from scratch.

---

## 3. ANTI-SLOP DESIGN DIRECTIVES (EMERALD AESTHETIC)

You are building an experimental, high-end Emerald portfolio site. All UI generation must strictly follow these rules:

### BANNED DESIGN TROPES (STRICTLY FORBIDDEN)
- **NO** soft indigo, purple, or cyan radial gradients or glowing background orbs ("AI sheen").
- **NO** standard 3-column feature cards with `rounded-xl` or `rounded-2xl` borders.
- **NO** Lucide icons sitting inside soft-tinted rounded squares.
- **NO** default system font stacks (Inter, Roboto, system-ui).
- **NO** generic corporate SaaS layouts or predictable vertical card stacks.

### MANDATORY DESIGN TOKENS (EMERALD VECTORS)
- **Primary Color Palette:** Deep Imperial Emerald (`#082c1d`), Champagne Cream (`#f5f2eb`), Warm Brass (`#d4af37`), or Cyber Emerald (`#00ff87`) on Obsidian (`#06140e`).
- **Typography Scale:** Extreme scale contrast. Pair massive display headers (90px+) with tiny monospaced metadata labels (11-12px).
  - *Serif/Luxury:* Import `Instrument Serif` or `Sentient` via Fontshare.
  - *Display/Kinetic:* Import `Clash Display` or `Cabinet Grotesk` via Fontshare.
  - *Metadata/Code:* Import `Space Mono` or `JetBrains Mono`.
- **Layout & Rhythm:** Asymmetrical grid layouts, offset container gaps, full-bleed section rules (`border-b border-r border-emerald-900`), and zero-radius corners (`rounded-none`).
- **Texture:** Add a subtle noise/grain overlay (`pointer-events-none opacity-4 mix-blend-overlay`).

---

## 4. VISUAL AUDIT & INTEGRATED BROWSER PROTOCOL

- **INTEGRATED BROWSER CHECK:** After `CodeBuilder` modifies any layout or styling code, `VisualAuditor` MUST launch `http://localhost:3000` using Antigravity's integrated Chrome browser.
- **SCREENSHOT ARTIFACT VERIFICATION:** `VisualAuditor` must capture a screenshot artifact and perform a visual check against the following criteria:
  - Are there generic AI slop traits (e.g., soft purple cards, Inter font)? -> **REJECT**.
  - Is the typographic scale contrast sufficiently extreme? -> **VERIFY**.
  - Are structural borders aligned asynchronously? -> **VERIFY**.

---

## 5. REPOSITORY STRUCTURE & SSOT BOUNDARY CONSTRAINTS

- **ROOT ARTIFACT BAN:** Agents are STRICTLY FORBIDDEN from generating or creating root-level data files (`*.json`), root-level stylesheets (`*.css`), or root-level schema declarations (`zod.ts`). All raw content and schemas MUST reside within designated Single Source of Truth (SSOT) subdirectories under `src/`.
- **CONTENT SSOT BOUNDARY:** All structured application data (projects, experience, skills) MUST be maintained exclusively inside Astro Content Collections in `src/content/` (`projects/`, `experience/`, `skills/`). No duplicate or loose data directories (such as `src/data/` or root JSONs) are permitted.
- **STYLE SSOT BOUNDARY:** Design tokens MUST be defined exclusively in `src/styles/tokens.css` and imported into `src/styles/global.css`. Direct inline variable redeclarations, loose root stylesheets, or compiled reference CSS files (`compiled-portfolio-styles.css`) MUST NOT be generated or created.
- **SCHEMA & COLLECTION CONFIG SSOT:** All Zod schemas (`ProjectSchema`, `ExperienceSchema`, `SkillTreeSchema`, etc.) and Content Collections definitions MUST be declared and exported from `src/content.config.ts`. Relocating schemas to loose root files or creating duplicate Zod files is strictly prohibited.
- **NO DIRECT COMPILED ARTIFACT EDITING:** Agents MUST NOT directly edit compiled artifacts or build outputs in `dist/` or `.astro/`. All changes MUST target source files in `src/`.

