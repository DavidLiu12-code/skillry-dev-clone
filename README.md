# Skillry clone

Visual and routing clone of [skillry.dev](https://skillry.dev/) for local preview and GitHub Pages.

## Local

```bash
cd skillry-clone
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173/).

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages

```bash
GITHUB_PAGES=1 npm run build
```

Output is `docs/` with `base=/skillry-dev-clone/`, `.nojekyll`, and `404.html` (SPA fallback). Serve the repo so Pages uses `/docs` and the site URL path `/skillry-dev-clone/`.

## Notes

This is a front-end replica. Skill previews and some images load from skillry.dev / media.skillry.dev. Auth, checkout, MCP install and ZIP download are UI-only (no better-auth / Stripe backend).


## Online preview

- Repo: https://github.com/DavidLiu12-code/skillry-dev-clone
- GitHub Pages: https://davidliu12-code.github.io/skillry-dev-clone/

> Free GitHub Pages needs a public repo. Created private first, then switched to public for the preview URL (same as previous clones).
