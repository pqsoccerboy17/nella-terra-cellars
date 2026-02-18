# Nella Terra Cellars

Wine club and tasting room website for Nella Terra Cellars.

## Tech Stack

- React 19 + Vite 6
- Tailwind CSS 4
- Framer Motion (animations)
- React Router (SPA routing)
- GitHub Pages (hosting)

## Deployment

**Deployment is automatic.** Pushing to `main` triggers a GitHub Actions workflow that builds and deploys to GitHub Pages. No manual `npm run deploy` needed.

- Workflow: `.github/workflows/deploy.yml`
- Live site: https://pqsoccerboy17.github.io/nella-terra-cellars/
- The `postbuild` script copies `index.html` to `404.html` for SPA route handling

## Key Scripts

- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build locally

## Project Structure

- `src/` — React source code (components, pages, assets)
- `dist/` — build output (gitignored)
- `vite.config.js` — Vite config with base path `/nella-terra-cellars/`
