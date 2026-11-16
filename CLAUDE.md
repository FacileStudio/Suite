# Suite

Landing page for the Facile Suite (suite.facile.studio): the hosted, interconnected apps of Facile, one Registre account, the suite pricing, and the self-hosting page.

## Tech stack

- **Framework**: SvelteKit (Svelte 5, runes API), `@sveltejs/adapter-static`, fully prerendered
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with `@facile/muse` tokens and components
- **Demos**: `@facile/mise-en-scene` (Stage, Tile, Cursor, Roll) for the three connection tiles only. The hero has no demo: it shows the wall of real apps
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
    content.ts            The APPS list (source of every app count), URLs, `slug`; no copy
    i18n/                 fr.ts, en.ts, es.ts, de.ts catalogs; index.ts (locale routing helpers, useI18n)
    ink.ts                Agenda's inkOn: event text colour on a calendar colour
    icons.ts              Registers icons-data.json with muse
    icons-data.json       Generated Solar glyphs (scripts/gen-icons.ts)
    motion.ts             scrollReveal action (IntersectionObserver, reduced motion aware)
    components/
      SiteShell.svelte    LandingHeader, Page width="xl", LandingFooter
      ThemeButton.svelte  Light/dark toggle, stored in localStorage `suite-theme`
      sections/           Hero, AppWall (one icon tile per app linking to #app-<slug> cards, a spotlight that moves every 2.4 s with the app's line under it; its STEP must stay coprime with COUNT and the column counts should divide COUNT), Apps (#apps, first 8 cards until expanded), Cards, Graph (#connexions), Sso (#compte), Tarifs (#tarifs), About, SelfTable
  routes/
    +layout.svelte        app.css, locale from the route, muse provideLocale, hreflang links, SiteShell
    [[lang=lang]]/+page.svelte                  Home sections and page meta
    [[lang=lang]]/auto-hebergement/+page.svelte Self-hosting page
  params/lang.ts          en, es, de prefixes (French has none)
  hooks.server.ts         Writes <html lang> at prerender
scripts/gen-icons.ts      Writes icons-data.json from APPS and UI_ICONS
static/                   Favicons, og-image, robots.txt (fonts come from muse)
```

## Conventions

- Svelte 5 runes only. Runes are enforced in `svelte.config.js`.
- muse tokens only, no hex in components. No borders, rings or dividers: group with fills (`bg-fc-component`, `bg-fc-surface`).
- The theme follows `prefers-color-scheme`; the header button forces light or dark through `applyTheme` and `localStorage`.
- Never hard-code an app count. Render `APPS.length` (`COUNT` in `content.ts`).
- Pricing is never hard-coded: `#tarifs` renders muse's `PricingPlans`, which reads Ardoise's public catalog in the browser.
- All copy lives in `src/lib/i18n/{fr,en,es,de}.ts`, in all four locales. The canonical wording comes from the landing-review `copy.json`; keep the grid lines equal to it. No em dashes.
- nginx (`nginx.conf`) serves `/en` from `en.html` with `try_files`.

## Notes

- Every app lives in `APPS`. Adding one: append it to `APPS`, run `bun scripts/gen-icons.ts`.
- No test framework, linter or CI. Dokploy deploys `main`.
