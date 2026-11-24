# JunX Labs website handoff

Updated: 2026-11-23 (America/Chicago)

## Current state

- Production website: https://junxlabs.com/
- Repository: https://github.com/JXiang2020/junxlabs-showcase
- Production branch: `main`.
- Contact layout implementation commit: `21656a802a1fd0f1efc32370a364afd11ea0be3b`.
- The contact update was deployed through the existing Cloudflare Workers Builds connection and verified on the public website.

## Header implementation

The top-left information appears in this order:

1. Existing JunX Labs logo image.
2. Applied AI Systems.
3. Jun Xiang, Ph.D. in Economics.
4. `contact@junxlabs.com`, linked to `mailto:contact@junxlabs.com`.

The author remains 15px. The email is 14px, inherits the muted author color, and is left-aligned with a 4px gap below the author line. Standard link underlining and keyboard focus behavior remain in place.

This is a static HTML project without a shared header component or template. Existing header markup is present in `index.html`, `trading.html`, and `investment-research.html`; all three use the header rules in `styles.css`. Keep these existing headers consistent when making future changes. Do not introduce a separate header for pillar content.

Home contains the AI Production & Risk Control pillar. The other pillars are in `trading.html` and `investment-research.html`. `production.html` redirects to `/#production`; `projects.html` redirects to `/`. Discussion and About are currently disabled navigation labels with no standalone pages.

## Validation completed

- Public website: email visible on Home and all three pillars.
- Desktop at 1024px: 4px author/email gap, matching muted colors, unchanged logo, navigation, and Page Views positions.
- Mobile at 390px on the public site: correct stacked layout and no horizontal overflow.
- Local preview also checked at 320px without horizontal overflow.
- Email destination inspected and confirmed as `mailto:contact@junxlabs.com`; no test email was sent.
- Desktop header height increased by approximately 20.8px for the added line; mobile height was approximately 1px shorter than the preceding inline-email layout.
- `node scripts/build-assets.mjs` passed and produced the 17 allowlisted public files in `dist/`.
- `git diff --check` passed. Built HTML/CSS matched source.
- Deployment diff contained only the three header HTML files and one shared CSS rule.

## Build and deployment

No package installation is needed for the static asset build. Run:

```sh
node scripts/build-assets.mjs
```

The existing Cloudflare connection deploys changes on `main` using `npx wrangler deploy`. Preserve `wrangler.jsonc`, the asset allowlist, the Worker and D1 bindings, and the existing Page Views tracking. Only `dist/` is uploaded as public assets. This handoff document is intentionally outside that allowlist.

Branding, pillar layouts and content, PDF/download assets, routing, analytics, domain, and deployment configuration were unchanged. No outstanding implementation issues were identified for this contact layout change.

