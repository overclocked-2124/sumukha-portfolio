<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Design & Architecture Principles

## 1. shadcn / shadcn-ui MCP Usage
- **Exclusive Component Foundation**: Always use shadcn and shadcn-ui tools via the available MCP servers (`shadcn` and `shadcn-ui`) when adding, listing, or configuring UI components.
- **Pre-flight Check**: Before introducing custom UI widgets, check `shadcn-ui/list_components` or `shadcn/search_items_in_registries` to install matching components via `install_component`.
- **Maintain Registry Integrity**: Keep `components.json` aligned with the project's styling and directory aliases.

## 2. Google Material 3 Standards (`@material/web`)
- **Follow M3 System Specifications**: Adopt the Material 3 design philosophy by Google (https://m3.material.io and https://github.com/material-components/material-web).
- **Design Tokens**: Adhere to M3 token hierarchy:
  - Surface elevation tiers (`surface`, `surface-container-lowest`, `surface-container-low`, `surface-container`, `surface-container-high`, `surface-container-highest`).
  - Tonal palettes and state layers (hover, focus, pressed, dragged).
  - Shape corners (`corner-none`, `corner-xs`, `corner-s`, `corner-m`, `corner-l`, `corner-xl`, `corner-full`).
- **Selective & Harmonious Usage**: Integrate Material 3 web components (`<md-elevation>`, `<md-ripple>`, `<md-chip-set>`, `<md-filter-chip>`, text fields, toggles) where they enhance ergonomics and tactile feedback.

## 3. Cohesive Component Harmonization
- **Seamless Visual Blend**: shadcn components and Material 3 elements must never clash or look like disparate libraries glued together.
- **Unified Design Tokens**: Map CSS custom properties (`--md-sys-color-*` and `--background`, `--primary`, `--card`, etc.) to the same central cosmic palette in `src/app/globals.css`.
- **Consistent Radius and Stroke**: Standardize border radius (`rounded-xl` / `corner-l` / `corner-full` for pills) and border opacity across both component families.

## 4. Strict Zero-Emoji Rule
- **No Emojis Anywhere**: Never use emojis in UI copy, buttons, badges, headers, metadata, or documentation.
- **Vector Glyphs Only**: Use sleek, minimal, high-precision vector iconography (via `lucide-react` or Material Symbols).
- **Classy & Editorial Tone**: Maintain a refined, understated, sophisticated space-themed digital garden atmosphere.

## 5. Professional Frontend Craftsmanship
- **Spatial Rhythm**: Adhere strictly to an 8-point spatial system (spacing units in multiples of 4px/8px: `gap-2`, `gap-4`, `p-6`, `py-8`, `max-w-5xl`).
- **Typography Scale**: High-contrast, clean sans-serif typography with strict hierarchy (Display, Headline, Title, Body, Label) and generous line-heights for readability.
- **Atmospheric Depth**: Multi-tier cosmic dark background (`#080A14`, `#0D1127`), gentle celestial ambient glows, and tasteful glassmorphism (`backdrop-blur-xl bg-slate-950/60`).
- **Tactile Transitions**: Smooth micro-interactions, subtle scale or glow on hover, and seamless page transitions.
