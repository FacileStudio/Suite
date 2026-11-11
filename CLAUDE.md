# Suite

Landing page for the Facile Suite (suite.facile.studio): the self-hosted, interconnected apps of Facile, one Registre account, the Antenne event bus, and the suite pricing.

## Tech stack

- **Framework**: SvelteKit (Svelte 5, runes API), `@sveltejs/adapter-static`, fully prerendered
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with `@facile/muse` tokens and components
- **Demos**: `@facile/mise-en-scene` (Stage, Window, Cursor) for the hero animation
- **Icons**: muse `Icon`; Solar glyphs the site needs are generated into `src/lib/icons-data.json`
- **Package manager and runtime**: bun; Docker builds with `oven/bun:1` and nginx serves `build/`

## Commands

| Command | What it does |
|---------|-------------|
| `bun install` | Install dependencies |
| `bun run dev` | Start dev server |
| `bun run build` | Build static site to `build/` |
| `bun run preview` | Preview the production build |
| `bun run check` | Run svelte-check |
| `bun scripts/gen-icons.ts` | Regenerate `src/lib/icons-data.json` after adding an icon to `content.ts` |

## Project structure

```
src/
  app.css                 muse styles, @source on muse and mise-en-scene, reveal classes
  app.html                HTML shell, theme bootstrap, og image, Vision script
  hooks.client.ts         Journal telemetry
  lib/
    content.ts            All French copy and the APPS list (source of every app count)
    icons.ts              Registers icons-data.json with muse
    icons-data.json       Generated Solar glyphs (scripts/gen-icons.ts)
    motion.ts             scrollReveal action (IntersectionObserver, reduced motion aware)
    components/
      SiteShell.svelte    LandingHeader, Page width="xl", LandingFooter
      ThemeButton.svelte  Light/dark toggle, stored in localStorage `suite-theme`
      demos/HeroDemo.svelte   Opus task, Sablier timer, Ardoise invoice, Plume signature
      sections/           Hero, Apps (#apps), Graph (#connexions), Sso (#compte), Tarifs (#tarifs), About
  routes/
    +layout.svelte        app.css, provideLocale('fr'), icon registration
    +page.svelte          Section composition and page meta
scripts/gen-icons.ts      Writes icons-data.json from APPS and UI_ICONS
static/                   Favicons, og-image, fonts, robots.txt
```

## Conventions

- Svelte 5 runes only. Runes are enforced in `svelte.config.js`.
- muse tokens only, no hex in components. No borders, rings or dividers: group with fills (`bg-fc-component`, `bg-fc-surface`).
- The theme follows `prefers-color-scheme`; the header button forces light or dark through `applyTheme` and `localStorage`.
- Never hard-code an app count. Render `APPS.length` (`COUNT` in `content.ts`).
- Pricing is never hard-coded: `#tarifs` renders muse's `PricingPlans`, which reads Ardoise's public catalog in the browser.
- All copy is French and lives in `content.ts`. No em dashes.

## Notes

- Every app lives in `APPS`. Adding one: append it to `APPS`, run `bun scripts/gen-icons.ts`.
- No test framework, linter or CI. Dokploy deploys `main`.
