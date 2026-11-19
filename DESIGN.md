# DESIGN.md — Sumukha Upadhyaya Portfolio (`TX-2124` Modular Hardware Architecture)

## 1. Product & Context
- **Subject:** Personal engineering portfolio & interactive 3D hardware rig of **Sumukha Upadhyaya** (`overclocked-2124`), Systems & Backend Engineer, B.E. Information Science at RVCE (`9.69 CGPA`), concurrent BS in Data Science at IIT Madras (`9.15 GPA`), 2x Software Engineering Intern at Auxia, Full-Stack Intern at FindInbox, and Vice President of Coding Club RVCE.
- **Target Audience:** Principal/staff systems engineers, hiring managers, technical founders, and peers evaluating low-level Linux systems (`ptrace`, `x86_64` ABI), distributed backends (`Go`, `Kotlin`, `gRPC`, `BigQuery`), and high-craft web engineering.
- **Primary Art Director:** `frontend-design` (Anthropic) paired with `impeccable` (`craft-floor.md`), `better-ui`, `better-typography`, and `better-layout` finishing rules.
- **Visual Direction (3 Adjectives):** Tactile, Industrial, Swiss-Utilitarian (inspired by Teenage Engineering *Computer-1* / *Field* hardware and Braun/Rams industrial manuals).

## 2. Signature Visual Element
An interactive **3D WebGL Modular PC Hardware Rig** sitting on a warm anodized workbench where each physical 3D PC component can be orbited, exploded in 3D space, and clicked to inspect a real subsystem of Sumukha's engineering work:
1. **CPU Socket (`LGA-2124` + Cylindrical Cooler Block):** Work Experience (Auxia 2x, FindInbox) & Concurrent Degrees (RVCE 9.69, IITM 9.15).
2. **PCIe 5.0 x16 Compute Accelerator (Dual-Fan Aluminum GPU Card):** All 10 Engineered Projects (Overwatch Userspace EDR in C, VeloCell gRPC Chat, Heli-XR, Project BAGH, S-400 Radar Defense Simulator, RVCE Events, Git-DSA in C99, ChipCheck, Hackemon CTF, Portfolio Workbench).
3. **DDR5 DIMM Slots + M.2 NVMe Heatsink:** Engineering Notes & Technical Writeups (with a clean inline reader & structured specification views).
4. **VRM Power Stage & Knurled Rotary Encoder:** Technical Stack & Toolchain Matrix (tabular spec sheet, not pill soup).
5. **Rear I/O Shield Tower & Dual SMA Antennas:** Campus Leadership (Coding Club RVCE VP, Student Induction, Hackemon) & Personal Hardware/Karate Black Belt roots.

## 3. Color Palette & Surface Tokens
- **Workbench Canvas (`--background`):** `#EFEDE6` (Warm anodized aluminum / stone paper)
- **Primary Surface (`--card`):** `#FAF9F5` (Crisp off-white technical sheet)
- **Recessed Surface (`--secondary`):** `#E4E1D8` (Machined tray well)
- **Primary Ink (`--foreground`):** `#141517` (Deep bead-blasted charcoal, >14:1 contrast)
- **Secondary Ink (`--muted-foreground`):** `#52514C` (Warm technical graphite, `6.08:1`–`7.55:1` contrast — never low-contrast gray)
- **Structural Hairline (`--border`):** `#D5D1C5` (1px crisp architectural rule)
- **Signal Text (`--signal-text`):** `#B43900` (WCAG AA accessible burnt signal orange: `5.65:1` on `#FAF9F5`, `5.08:1` on `#EFEDE6`, `4.55:1` on `#E4E1D8`)
- **Signal Fill (`--signal-fill`):** `#FF4F00` (Teenage Engineering International Safety Orange — used strictly for active hardware indicators, 3D chassis accents, and active toggles paired with `#141517` ink at `5.54:1` contrast)

## 4. Typography (`better-typography`)
- **Primary Sans (`--font-sans`):** `Geist` — clean Swiss neo-grotesque for headings, prose, and UI controls.
  - Display / H1: `clamp(1.75rem, 2.5vw, 2.5rem)`, line-height `1.12`, tracking `-0.025em`, `text-wrap: balance`.
  - Section Headings (H2): `1.25rem`–`1.5rem`, weight `600`, tracking `-0.015em`.
  - Body Copy: `0.9375rem`–`1rem` (`15px`–`16px`), line-height `1.6`, measure capped at `65ch`, `text-wrap: pretty`.
- **Technical Monospace (`--font-mono`):** `Geist Mono` — used strictly for actual measurements, timelines, hardware socket identifiers, and code blocks (`font-variant-numeric: tabular-nums`), never as a costume for generic prose.

## 5. Layout, Elevation & Polish Rules (`impeccable` + `better-ui` + `better-layout`)
- **No Nested Cards:** Inside the Hardware Inspector sheet and subpages, use **clean architectural hairlines (`divide-y`) and structured specification tables** instead of boxing every item inside nested rounded cards.
- **No Eyebrow Kickers or `//` Slashes:** Headings speak for themselves without ALL-CAPS orange eyebrows, `//` prefixes, or fake `01 / 02 / 03` sequence numbers.
- **3D Callout Pins:** Project real 3D world coordinates (`vector.project(camera)`) onto crisp 2D hardware callout pins tethered to each 3D component so the user immediately sees what each part of the PC rig represents and can click either the 3D mesh or its callout pin.
- **Exact Interaction Values (`better-ui`):**
  - Button press scale: `active:scale-[0.96]` over `150ms ease-out` (with `:disabled` excluded).
  - Transition only explicit properties (`transition-[background-color,border-color,color,transform,opacity] duration-150 ease-out`), never `transition-all`.
  - Scrollable overlays/drawers use `overscroll-behavior: contain`.
  - Form inputs use `16px` (`text-base sm:text-sm`) on mobile to prevent iOS Safari zoom.
  - Respect `prefers-reduced-motion: reduce` (disable camera auto-orbit, slow fan spin, and replace movement with instant/opacity transitions).
