# Changelog

## [0.4.0] - 2026-11-14

### Added

- Account demo built with mise-en-scene: one click on "Se connecter avec Facile" opens every app with the same account. It replaces the hand-drawn account panel.

### Changed

- muse v0.22.0: titles and body use Magnetik from muse. Headings and emphasis use `font-bold`.
- mise-en-scene v0.2.1. The hero demo's rows, cards and buttons follow the window's surface steps, so they stay visible in dark mode.
- Shorter copy in every section. The hero line is one sentence.

### Removed

- The unused Goga font files in `static/fonts`.

## [0.3.1] - 2026-11-13

### Changed

- muse v0.21.0. The theme toggle shows its label as a muse tooltip on hover and keyboard focus.

## [0.3.0] - 2026-11-11

### Changed

- New catalog icons for Prisme, Feuilles, Docs, Toile and Place in the apps grid and graph.
- Favicons, touch icons, manifest and link preview now come from muse v0.19.0's brand generator. The link preview title and description are the English catalog values; the page copy stays French.
- The hero uses the studio slogan.

### Removed

- The old interconnectivity docs and diagrams, and the unused adapter-auto dependency.

## [0.2.0] - 2026-11-11

### Added

- Hero demo built with mise-en-scene: an Opus task starts a Sablier timer, Ardoise bills it and Plume gets the signature, with the Antenne feed alongside.
- Apps grid of all 25 apps with category filters, a circular graph around Antenne, a Registre account section and a light/dark theme toggle.

### Changed

- Rebuilt the landing on muse v0.18.1 (LandingHeader, Page, LandingFooter) with borderless fills, and the theme now follows the system setting.

### Removed

- The hand-written header, InterconnectivityGraph.svelte, WorkflowDiagram.svelte, `@iconify/svelte` and the light-theme pin.

## [0.1.1] - 2026-11-11

### Fixed

- Dependencies: vite 8.3.8, svelte 5.57.3 and @sveltejs/kit 2.70.4, with source-map-js and cookie pinned to patched versions. Clears the vite, devalue, postcss, nanoid and svelte advisories.

## [0.1.0] - 2026-11-06

### Added

- "Tarifs" section on the landing page (`#tarifs`), linked from the header (hidden below the `sm` breakpoint so the brand does not wrap). It shows the live
  plans from Ardoise's public catalog through muse's `PricingPlans`. The heading and copy
  ("Un compte. Toute la suite.", free space creation) stand on their own, so with an empty or
  unreachable catalog the section still reads as a complete block with its "Créer mon espace"
  link and no plan list.
- `@facile/muse` v0.11.0 as a dependency, with `provideLocale('fr')` in the root layout.

### Changed

- `app.css` imports muse's theme instead of its own copy of the tokens. Surface and muted
  text take muse's values (`fc-surface` 0.97 to 0.95, `fc-fg-muted` 0.556 to 0.5).
- `<html class="light">` keeps the site light on a dark OS, since muse's theme follows
  `prefers-color-scheme`.
