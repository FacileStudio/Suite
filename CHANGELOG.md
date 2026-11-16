# Changelog

## [Unreleased]

### Added

- The AGPL-3.0-only licence file, the `license` field and a README section.
- Diapo (slides as one text file) and Clap (video editor) in the app grid and the hero wall, in all four languages.

### Changed

- The hero wall lays its 28 tiles out in 14 columns on wide screens and 7 from 390px, so every row is full. The spotlight steps by 9, which reaches every tile of 28.

## [0.8.1] - 2026-11-16

### Security

- The site no longer loads a script from another origin. The Vision tracker is a pinned copy served from `/vision-tracker.js`. It still sends its page-view beacons to Vision as images.

## [0.8.0] - 2026-11-15

### Added

- The hero wall has a spotlight: one tile lights up at a time and a line under the wall says what that app does. It moves every 2.4 seconds, follows hover and keyboard focus, and stays still under reduced motion.

### Changed

- The app grid shows its first 8 apps (9 on the three-column layout) and a "Voir les 26 apps" button. A category filter or a click on a wall tile opens the full grid.

## [0.7.0] - 2026-11-15

### Added

- The hero shows a wall of the 26 apps as icon tiles. A tile jumps to that app's card in the grid, highlights it, and resets the category filter.

### Changed

- The account section shows its two points as cards instead of a faux Registre window.

### Removed

- The hero demo (sign in, launcher, Nuage, Agenda). It showed a launcher and an app rail that the apps do not have.
- The account demo, and the demo copy in fr, en, es and de.

## [0.6.3] - 2026-11-14

### Changed

- The hero chip says "Code ouvert" instead of "Open source" (en "Open code", de "Offener Code", es unchanged "Código abierto"), matching the about block. Scribe's repository is private.

## [0.6.2] - 2026-11-14

### Changed

- The self-hosting page says the code of our apps is open, instead of "Les apps Facile sont open source" and "restent open source pour tout le monde", in fr, en, es and de. Scribe's repository is private.
- muse v0.25.1. New og-image.png and site.webmanifest description from the muse brand catalog: "26 apps for your work, one Facile account".

## [0.6.1] - 2026-11-14

### Changed

- The Vision line in the app grid now says "sans cookies" instead of "sans bandeau cookies", in fr, en, es and de. Vision's tracker keeps a visitor id in localStorage, so the no-banner claim waits until it is verified.
- The about block says the code of our apps is open, instead of "Tout est open source".
- The web manifest no longer says the apps run on your own server.

## [0.6.0] - 2026-11-14

### Added

- French, English, Spanish and German for the whole page, at `/`, `/en`, `/es` and `/de`. The footer language switch changes the page.
- `/auto-hebergement` (and `/en/auto-hebergement`, `/es/…`, `/de/…`): the hosted offer first, a hosted versus self-hosted table, what self-hosting takes, and links to the code.
- "Vos apps travaillent ensemble": three animated cards for a contract signed in Plume, Opus deadlines in Agenda and Sablier, and Bulle working across the apps (Pro plan).
- Gare in the app grid.

### Changed

- The hero leads with a free account: "Créer un compte gratuit" first, sign-in second. The subtitle and chips say Facile hosts the apps.
- The hero demo draws Agenda the way Agenda does: calendar colours, "09:00" times, striped hours and today's circle. Screens fade out before the next one fades in, the window title follows, the side rail slides in from the left, and the loop restarts with a soft fade.
- Every app line in the grid matches the suite copy. Nuage moves to Productivité.
- "Tout est relié" names only connections that exist: a contract signed in Plume, Opus tasks in Agenda and Sablier, and 17 apps with an MCP server.
- Pricing marks Pro as recommended and says the free plan needs no card.

### Removed

- "Auto-hébergé", "sur votre serveur" and the "chrono devient une facture" claim.

## [0.5.0] - 2026-11-14

### Added

- Hero demo: sign in once with Facile, pick Nuage in the app launcher, then hop to Agenda without signing in again.

### Changed

- The account demo shows the team side: add a member once in Registre and every app opens to them.
- The hero and account demos leave room for the window shadow, so no edge is cut.

### Removed

- The Opus, Sablier, Ardoise and Plume event demo in the hero.

## [0.4.2] - 2026-11-14

### Changed

- muse v0.23.0: the footer is left-aligned on phones.
- mise-en-scene v0.2.2. The kit needs no Vite config, so `@facile/mise-en-scene` leaves `optimizeDeps.exclude`.

## [0.4.1] - 2026-11-14

### Fixed

- The hero demo lines up with the hero text instead of sitting centered off to the right.
- The hero demo no longer leaves half the window empty: real task rows replace the grey bars, the invoice and signature show as a status on the task, and the window fits its content.
- On phones the hero demo keeps a fixed height and the event feed shows the last two events.

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
