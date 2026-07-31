### TASK OBJECTIVE
Build a single, isolated HTML/Astro component (`ProjectLedgerCard`) that renders a project payload conforming strictly to `ProjectSchema`.

### 🎨 DESIGN TOKENS (MUST USE)
All styling MUST rely exclusively on the CSS variables defined in `tokens.css`. Do NOT write custom hex codes or arbitrary utility classes.

- Background: `var(--surface-panel)`
- Border: `2px solid var(--border-outline)`
- Box Shadow: `var(--shadow-panel)` (Hard offset: 4px 4px 0px #050908)
- Typography: 
  - Section Labels / Metadata: `var(--font-mono)` (IBM Plex Mono, uppercase, letter-spaced)
  - Body / Headings: `var(--font-header)` (Inter)
- Accents: `var(--primary-accent)` (Emerald)

---

### 🚫 ANTI-AI SLOP RULES (STRICT CONSTRAINTS)
1. NO generic gradients, glassmorphism, or blurred backdrops (`backdrop-blur`).
2. NO soft, generic drop shadows (`shadow-lg`, `shadow-xl`). Use ONLY the hard 4px 4px offset shadow.
3. NO rounded pill corners (`rounded-2xl`, `rounded-3xl`). Keep borders sharp and boxy (`rounded-none` or subtle `rounded-sm`).
4. NO arbitrary spacing hacks (e.g., `p-[13px]`, `m-[7px]`). Use standard grid/flex spacing tokens.
5. NO unnecessary wrapper `<div>`s or bloated DOM trees. Keep the markup semantic (`<article>`, `<header>`, `<section>`, `<footer>`).

---

### 📐 LAYOUT STRUCTURE
1. Top Field Label Strip: small mono header strip with the section index and category, no brackets or slashes — e.g. "03  Project Ledger". Numbers and labels separated by spacing/CSS, not punctuation.
2. Title & Links Row: Project title with direct external link button using `var(--primary-accent)`.
3. Summary Field: Concise project summary block bounded by a subtle top border.
4. Design Rationale Ledger: A bulleted/numbered list displaying items from `designChoices` to showcase engineering decisions.
5. Tech Stack Field: A flex wrap list of pill tags for `techStack` formatted with mono typography.

---

### ⚙️ EXPECTED OUTPUT
Return ONLY the self-contained component file. Do not alter global styles or edit unrelated files.