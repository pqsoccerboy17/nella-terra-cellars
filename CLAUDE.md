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
  - `src/components/layout/` — Header, Sidebar, DocsLayout
  - `src/components/sections/` — Hero, Architecture, Pipeline, Dashboard, etc.
  - `src/components/ui/` — CodeBlock, KPICard, FlowDiagram, etc.
  - `src/components/shared/` — ScrollToTop, PageTransition, AnimatedSection
  - `src/hooks/` — useTheme (dark/light mode), useCountUp (animated counters)
  - `src/data/` — docs-nav, docs-content, platform-links
- `dist/` — build output (gitignored)
- `vite.config.js` — Vite config with base path `/nella-terra-cellars/`

## Claude Code GitHub Integration

Mention `@claude` in any issue or PR comment to trigger Claude Code via GitHub Actions.

- Workflow: `.github/workflows/claude.yml`
- Requires `ANTHROPIC_API_KEY` repo secret
- Triggers on: issue comments, PR review comments, new issues, and PR reviews
- Claude can read code, answer questions, implement changes, and create PRs
