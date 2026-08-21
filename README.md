# Sandro Abashishvili – Portfolio

Personal developer portfolio for presenting software, automation, data and operations-oriented projects.

## Live site

`https://sandro-abashishvili.de/`

The custom domain is the canonical public URL. GitHub Pages is used only as the hosting layer.

## Positioning

Engineering → Practical Operations → Software & Automation

## Focus

- Web applications and websites
- Dashboards and CRM systems
- Python automation and APIs
- Data-driven tools
- Selected live projects and source repositories

## Tech

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Pages

## Structure

- `index.html` — main portfolio page
- `datenschutz/` — privacy information
- `assets/styles.css` — primary visual system
- `assets/polish.css` — responsive and readability refinements
- `assets/navigation.js` — navigation behavior and anchor scrolling
- `assets/analytics-consent.js` — GA4 consent logic
- `assets/sandro-portrait-*.webp` — responsive portrait variants for mobile and desktop
- `assets/favicon.svg` — browser favicon
- `assets/portfolio-icon.png` — header brand mark
- `assets/portfolio-app-icon.png` — app / Apple touch icon
- `assets/portfolio-social-card.png` — social sharing image
- `assets/projects/` — project screenshots

## Performance

- Critical above-the-fold styles are embedded in `index.html`; the complete stylesheets load without blocking the first render.
- Portfolio and project images use WebP, explicit dimensions and lazy loading where appropriate.
- Google Analytics starts after the initial page load while preserving the configured consent mode.
- The release scan checks mobile Lighthouse performance, layout stability, accessibility and SEO.

## Theme

The site follows the visitor’s browser / operating-system preference through `prefers-color-scheme` and supports light and dark mode automatically.

## Production rules

- Keep `https://sandro-abashishvili.de/` as the canonical domain.
- Do not reintroduce `github.io` URLs into canonical, social or structured metadata.
- Preserve analytics consent and privacy behavior during redesigns.
- Remove obsolete assets, duplicate logic and temporary workarounds as part of normal maintenance.
