# JunXLabs AI System Showcase

This repository is the source of truth for the static public showcase at **junxlabs.com**. It presents Jun Xiang's AI-powered production workflow system, its controls, and a course-production demo.

The existing Cloudflare Workers Builds connection deploys `main` with `npx wrangler deploy`.

## Deployment assets

Wrangler runs `node scripts/build-assets.mjs` before deployment and uploads only `dist/`. The build recreates that directory from an explicit list of public files: `index.html`, `styles.css`, `script.js`, the favicon, the two diagram images, the PDF, and the demo video. Their contents and public URLs are preserved. Add any future public asset deliberately to this list.

The repository root must never be used as the static asset directory. Git metadata, environment files, CI/editor configuration, source maps, caches, temporary files, tests, Worker source, migrations, and documentation are outside the deployment artifact. `.gitignore` keeps generated directories out of Git; the build allowlist and `assets.directory` control upload scope.

The Worker entry point remains `src/worker.js`, deployed separately from public assets, with the existing `ASSETS` and `SITE_VISITS` bindings. No D1 migration is needed for this asset-scope change.

Public version URLs are disabled with `preview_urls: false` because historical versions contain the previously uploaded repository files. Do not re-enable them or roll back to those versions; rebuild from the restricted public asset list instead.

## Local preview

Serve this directory with any static web server, then open `index.html`. No build tools, package manager, or framework are required.

## Contents

- `index.html` — site content and structure
- `styles.css` — responsive styles
- `assets/images/` — the two PDF-derived system diagrams
- `assets/docs/` — the authoritative two-page PDF
- `assets/video/` — the DBM201 course-production demo

## Visit counter

The header's visit counter is served by the same Cloudflare Worker at `/api/visits`. It uses the D1 database `junxlabs-showcase-visits`, attached to the Worker as `SITE_VISITS`. Normal visits use `POST` for one atomic SQL increment; `GET` reads the current count without incrementing it. The D1 database stores no cookies, visitor identifiers, fingerprints, or third-party analytics data.

The Worker secret `EXCLUDED_VISITOR_IPS` contains comma- or whitespace-separated public IP addresses whose `POST` requests should only read the count. Keep the addresses in Cloudflare's encrypted Worker secret, never in this repository or D1. Cloudflare supplies the `CF-Connecting-IP` request header used for comparison. This excludes everyone sharing an address; update the secret when the owner's public IPv4 or IPv6 address changes. Requests without a matching address continue to increment normally.

To exclude the site owner's future visits on a browser, open `https://junxlabs.com/?exclude_my_visits=1` once in that browser. The setting is stored in that browser's local storage, shared across site pages; it does not identify visits from another browser or device. Open `https://junxlabs.com/?exclude_my_visits=0` to resume counting. The setting URL is removed from the address bar after it is applied. Past anonymous visits cannot be distinguished or subtracted.

`migrations/0001_site_visits.sql` creates the single-row `site_visits` table and initializes it to the recovered historical total of `230`. Its `INSERT OR IGNORE` makes the initialization idempotent: it must be applied once to the D1 database and does not reset a later count. To make a manual correction, update only that row in the Cloudflare D1 console, for example: `UPDATE site_visits SET visits = 230 WHERE id = 1;`.
