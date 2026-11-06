# Changelog

## [Unreleased]

### Added

- "Tarifs" section on the landing page (`#tarifs`), linked from the header. It shows the live
  plans from Ardoise's public catalog through muse's `PricingPlans`. With an empty or
  unreachable catalog the section keeps its heading, copy and "Créer mon espace" link.
- `@facile/muse` v0.11.0 as a dependency, with `provideLocale('fr')` in the root layout.

### Changed

- `app.css` imports muse's theme instead of its own copy of the tokens. Surface and muted
  text take muse's values (`fc-surface` 0.97 to 0.95, `fc-fg-muted` 0.556 to 0.5).
- `<html class="light">` keeps the site light on a dark OS, since muse's theme follows
  `prefers-color-scheme`.
