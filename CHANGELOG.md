# Changelog

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
