# JunXLabs AI System Showcase

This repository is the source of truth for the static public showcase at **junxlabs.com**. It presents Jun Xiang's AI-powered production workflow system, its controls, and a course-production demo.

The existing Cloudflare Workers Builds connection deploys `main` with `npx wrangler deploy`.

## Deployment assets

Wrangler runs `node scripts/build-assets.mjs` before deployment and uploads only `dist/`. The build recreates that directory from an explicit list of public files: `index.html`, `styles.css`, `script.js`, the favicon, the two diagram images, the PDF, and the demo video. Their contents and public URLs are preserved. Add any future public asset deliberately to this list.

The repository root must never be used as the static asset directory. Git metadata, environment files, CI/editor configuration, source maps, caches, temporary files, tests, Worker source, migrations, and documentation are outside the deployment artifact. `.gitignore` keeps generated directories out of Git; the build allowlist and `assets.directory` control upload scope.

The Worker entry point remains `src/worker.js`, deployed separately from public assets, with the existing `ASSETS` and `SITE_VISITS` bindings. No D1 migration is needed for this asset-scope change.

## Local preview

Serve this directory with any static web server, then open `index.html`. No build tools, package manager, or framework are required.

## Contents

- `index.html` — site content and structure
- `styles.css` — responsive styles
- `assets/images/` — the two PDF-derived system diagrams
- `assets/docs/` — the authoritative two-page PDF
- `assets/video/` — the DBM201 course-production demo

## Visit counter

The footer's visit counter is served by the same Cloudflare Worker at `POST /api/visits`. It uses the D1 database `junxlabs-showcase-visits`, attached to the Worker as `SITE_VISITS`. The request performs one atomic SQL increment and returns the resulting count; it stores no cookies, visitor identifiers, fingerprints, or third-party analytics data.

`migrations/0001_site_visits.sql` creates the single-row `site_visits` table and initializes it to the recovered historical total of `230`. Its `INSERT OR IGNORE` makes the initialization idempotent: it must be applied once to the D1 database and does not reset a later count. To make a manual correction, update only that row in the Cloudflare D1 console, for example: `UPDATE site_visits SET visits = 230 WHERE id = 1;`.
