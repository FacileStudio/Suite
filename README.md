# Suite

The landing page of the Facile Suite, live at https://suite.facile.studio.

A prerendered SvelteKit site built on `@facile/muse` and `@facile/mise-en-scene`, served by nginx.

## Develop

```sh
bun install
bun run dev
bun run check
bun run build
```

Copy and the list of apps live in `src/lib/content.ts`. After adding an app or an icon, run `bun scripts/gen-icons.ts`.

## Deploy

`docker compose up --build` builds the static site and serves it on port 80. Production deploys from `main` on Dokploy.
