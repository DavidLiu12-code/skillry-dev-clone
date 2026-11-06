# Deliverable — skillry.dev clone

Project path: `/workspace/skillry-clone`

## How to run

```bash
cd /workspace/skillry-clone
npm install
npm run dev
```

GitHub Pages build:

```bash
GITHUB_PAGES=1 npm run build
```

Writes `docs/` with base `/skillry-dev-clone/`, `.nojekyll`, and SPA `404.html`.

## Pages implemented

- Home `/` and locale homes (`/zh`, `/zh-tw`, `/ja`, `/ko`, `/es`, `/pt-br`, `/de`, `/fr`) using official `en.json` / `zh.json` (other locales fall back to English copy).
- `/skills` directory with search, output/free/featured filters, sort, load-more.
- Filter URLs: `/skills/output/*`, `/skills/agent/*`, `/skills/task/*`, `/skills/role/*`, `/skills/use-case/*`.
- `/skills/:slug` for 620 sitemap skills (rich cards for homepage/directory samples; stubs for the rest with live preview URLs).
- `/pricing`, `/blog`, `/blog/introducing-skillry`, `/mcp`, `/learn` and listed learn subroutes.
- `/ai-videos` hub, `/ai-videos/:collection`, `/ai-videos/:collection/:slug` (~1080 video routes).
- `/affiliate`, `/dot-avatar-maker`, `/iphone-duo-mockup`, legal footer routes.
- Auth UI: `/auth/login` `/auth/register` `/auth/forgot-password`.
- Login walls: `/dashboard` `/settings` `/admin` `/device`.

Full inventory: `PAGES.md`. Stack evidence: `RECON.md`.

## Not restored (honest gaps)

- **Auth / billing / MCP server actions**: skillry.dev uses better-auth + Stripe + TanStack Start server functions. Clone shows forms and toasts only; no real accounts.
- **All 16k localized skill/video bodies**: every URL resolves, but most skill/video detail pages use a shared template. Full long-form copy was extracted for the homepage, FAQ, introducing-skillry post, and `bs-anthropic-report-illustration`.
- **City-scale media offline pack**: preview images hotlink to `https://skillry.dev/skills/.../media/preview-1.webp`; testimonials/studio art use `media.skillry.dev`. Logos, 29 hero marks, agent SVGs and Bricolage fonts are local.
- **Base UI navigation menus**: original uses `@base-ui/react` navigation menu + dialog. Search dialog uses Base UI Dialog; desktop mega-menus are visual equivalents (same type, hover, and links) rather than the full Popper navigation-menu primitive.
- **Paraglide runtime**: official JSON strings are used; the Paraglide compiler/runtime is not reproduced. ja/ko/es/pt-br/de/fr UI falls back to English.
- **Skill card hover carousel / preview video**: original can cycle multiple preview frames and play video on hover (`data-auto-carousel`). Clone shows the primary `preview-1.webp` still.
- **Personalized “For you” shelf, like/bookmark persistence, request-a-Skill API**: need signed-in APIs.
- **Interactive Dot Avatar Maker / iPhone mockup tools**: routes exist and point at the catalog Skill; the original in-page tools are not reverse-engineered.
- **Legal policy full text**: routes exist; body is a pointer to skillry.dev rather than a verbatim legal reproduction.
