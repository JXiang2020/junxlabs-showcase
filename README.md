# JunXLabs AI System Showcase

This repository is the source of truth for the static public showcase at **junxlabs.com**. It presents Jun Xiang's AI-powered production workflow system, its controls, and a course-production demo.

Deployment will be configured separately through Cloudflare. The original ChatGPT Site remains online temporarily as the migration fallback until the Cloudflare deployment is verified.

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
