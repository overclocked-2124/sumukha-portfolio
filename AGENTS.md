<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Design & Architecture Principles

## 1. Material You / Material Design 3 (M3) Expressive Standard
- **Material 3 Expressive Tonal Architecture**: Strictly adhere to Google's Material 3 / Material You design system specifications (https://m3.material.io).
- **Expressive Pastel Color System**: Use soft, expressive pastel tonal palettes:
  - Primary: Deep iris / soft lavender (`#5954A8`), container `#E3DFFF`, on-container `#140E62`
  - Secondary: Soft slate mauve (`#5F5C71`), container `#E4E0F8`, on-container `#1C192B`
  - Tertiary: Pastel terracotta / warm rose (`#7A5368`), container `#FFD8EA`, on-container `#301123`
  - Tonal Surface Tiers: Soft warm paper tints (`surface`, `surface-container-lowest`, `surface-container-low`, `surface-container`, `surface-container-high`, `surface-container-highest`)
  - Outlines: Subtle, low-contrast tonal borders (`#C8C5D0` / `rgba(121, 116, 126, 0.16)`)
- **M3 Shapes & Corners**: Generous Material 3 corner curves: `rounded-3xl` (24px) for content cards, `rounded-full` for chips, search inputs, and top pill navigation, and `rounded-2xl` (16px) for modals and secondary blocks.
- **Elevation via Tonal Color**: Rely on subtle tonal color shifts between surface container tiers rather than heavy dark drop-shadows.

## 2. Zero AI Slop & Authentic Personal Voice
- **No Space Metaphors or Sci-Fi Tropes**: Absolutely no artificial space station, cosmic void, celestial telemetry, planetary orbit, or robotic mission-control jargon.
- **Grounded & Human Engineering Narrative**: Present real, concrete accomplishments for Sumukha Upadhyaya: academic excellence at RVCE (9.69 CGPA) and IIT Madras (9.15 GPA), internships at Auxia and FindInbox, technical leadership, and real production code.
- **Clear & Practical Terminology**: Use natural, industry-standard engineering terms ("Systems & Security", "Distributed Infrastructure", "Frontend & UI", "Research Notes").

## 3. Strict Zero-Emoji & Icon-Free Restraint Rule
- **No Emojis or Decorative Icons**: Never use emojis or icon clutter in UI copy, buttons, badges, headers, cards, or navigation items.
- **Pure Typographic & Geometric Discipline**: Rely purely on typography (weight, size, case, letter-spacing) and minimal geometric indicators (dots, slashes, hairline borders).
- **Clean Editorial Atmosphere**: Maintain an ultra-clean, serene, human-crafted editorial reading experience.

## 4. shadcn / shadcn-ui MCP Component Foundation
- **Component Primitives**: Use shadcn components via MCP tools (`shadcn` and `shadcn-ui`) styled harmoniously with Material 3 tokens.
- **Unified Design Tokens**: Map CSS custom properties (`--md-sys-color-*` and `--background`, `--primary`, `--card`, etc.) to the central pastel M3 palette in `src/app/globals.css`.

## 5. Professional Frontend Craftsmanship
- **8-Point Spatial Cadence**: Spacing in multiples of 4px/8px (`gap-2`, `gap-4`, `p-6`, `py-8`, `max-w-5xl`).
- **Google M3 Typescale**: Display, Headline, Title, Body, and Label hierarchy with generous line heights and high legibility.
- **Airy, Light & Tactile Aesthetics**: Soft warm-tinted backgrounds, gentle hover highlights, and tactile ripple/elevation state layers.
