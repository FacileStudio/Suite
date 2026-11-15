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

## License

Suite is licensed under the GNU Affero General Public License v3.0 only (`AGPL-3.0-only`); see [LICENSE](LICENSE). A commercial license is available from Facile Studio for use that cannot meet the AGPL's terms.
