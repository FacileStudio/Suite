# Suite

Marketing and landing page for the Facile Suite — a collection of twelve self-hosted, interconnected tools for creative studios.

## Tech Stack

- **Framework**: SvelteKit (Svelte 5, runes API)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`) with `@facile/muse` tokens and components
- **Icons**: Iconify (`@iconify/svelte`, Solar icon set)
- **Fonts**: Goga (custom, served from `static/fonts/`)
- **Adapter**: `@sveltejs/adapter-static` — fully prerendered static site
- **Package manager**: bun
- **Runtime**: bun (Dockerfile uses `oven/bun:1`)
- **Deployment**: Docker (nginx serves the static build)

## Commands

| Command | What it does |
|---------|-------------|
| `bun install` | Install dependencies |
| `bun run dev` | Start dev server |
| `bun run build` | Build static site to `build/` |
| `bun run preview` | Preview the production build |
| `bun run check` | Run svelte-check (type checking) |
| `bun run check:watch` | Type checking in watch mode |

## Project Structure

```
src/
  app.css           CSS entry — Tailwind import, Goga font-faces, design tokens
  app.html          HTML shell
  app.d.ts          App-level type declarations
  lib/
    index.ts        Shared library exports (currently empty)
  routes/
    +layout.svelte  Root layout (imports app.css)
    +layout.ts      Enables full prerendering
    +page.svelte    The entire landing page (single-page site)
static/
  fonts/            Goga typeface (10 weights, .otf)
  favicon.svg
  robots.txt
build/              Static output (gitignored)
Dockerfile          Multi-stage: bun build -> nginx serve
docker-compose.yml  Single service, port 80
inter.d2            D2 diagram for inter-tool connectivity
INTERCONNECTIVITY.md  Architecture doc on how Suite tools connect
```

## Conventions

- Svelte 5 runes only (`$state`, `$props`, `$derived`, `$effect`). Runes are enforced in `svelte.config.js` for all non-node_modules files.
- Design tokens come from `@facile/muse/styles`, imported in `app.css` with an `@source` on muse. Do not redefine `fc-*` tokens locally. `<html class="light">` pins the light theme.
- Pricing is never hard-coded: the `#tarifs` section renders muse's `PricingPlans`, which reads Ardoise's public catalog in the browser.
- The "Goga" font is used for headings; body uses Helvetica/system sans-serif.
- All content is in French.
- The site is a single page — all sections live in `+page.svelte`.
- Animations use a custom `reveal` Svelte action with IntersectionObserver, respecting `prefers-reduced-motion`.

## Notes

- `.npmrc` sets `engine-strict=true`.
- The page describes fifteen Facile tools: Perception, Sablier, Opus, Vision, Glouton, Antenne, Ardoise, Plume, Portail, Nuage, Echo, Capsule, Courrier, Agenda, Scribe.
- `INTERCONNECTIVITY.md` documents the current (mostly disconnected) state of inter-tool communication and plans for unification.
- No test framework is configured.
- No linter is configured.
