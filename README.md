# CHRONODENDRA

Chronodendra is an interactive wildfire-memory landing that translates dendrochronology into a digital timeline.

The visualization represents years as tree rings and lets users explore wildfire context through a responsive radial interface.

## Live Demo

- https://jolly-granita-2d7d80.netlify.app

## What Is Included

- Interactive ring-based chronology (2007-2025)
- Responsive landing layout (desktop, tablet, mobile)
- Bilingual UX content (English and Galician)
- Circular thumbnail navigation linked to rings
- Side panel with year, summary, source, and references

## Tech Stack

- HTML
- CSS
- JavaScript
- Canvas API
- Node.js tooling

## Project Structure

- src/web/index.html: landing markup and UI sections
- src/web/style.css: responsive visual system and layout
- src/web/script.js: ring rendering and interaction logic
- src/web/data.js: yearly event dataset
- assets/README.md: local media inventory notes (media files are intentionally not tracked)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run Local Development Server

```bash
npm run dev
```

Open:

- http://127.0.0.1:5173/index.html

### Alternative Preview Port

```bash
npm run serve
```

Open:

- http://127.0.0.1:8010/index.html

### Lint

```bash
npm run lint
```

## Assets Policy (Repository Lightweight)

This repository is configured to avoid committing heavy media files.

- assets/* is ignored by git
- assets/README.md remains tracked for documentation
- The web uses remote imagery from the dataset by default

If you need local assets for private production workflows, keep them outside version control or use Git LFS in a separate policy.

## Notes

- The current implementation prioritizes lightweight collaboration and reproducible setup.
- Existing heavy asset folders can remain locally on your machine without being pushed.

## License

Project license is currently set in package metadata as ISC.

If you want to migrate to MIT (or another license), add a dedicated LICENSE file and update package.json.
