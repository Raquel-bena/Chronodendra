# Assets Inventory

This folder stores all static resources used by Chronodendra.

## Current Structure

- INCENDIOS_207_2025/
- photos/
- reports/
- video/

## Asset Analysis (April 2, 2026)

- Total files: 171
- Total size: 131.31 MB
- File types:
  - no extension: 73
  - .jpg: 40
  - .png: 40
  - .webp: 7
  - .jpeg: 6
  - .pdf: 3
  - .gif: 1
  - .mp4: 1

## Moved During Cleanup

- CHRONODENDRA_VIDEO.mp4 -> video/CHRONODENDRA_VIDEO.mp4
- incendios_forestales_espania_2007_tcm30-132540.pdf -> reports/incendios_forestales_espania_2007_tcm30-132540.pdf
- incendios_forestales_espania_2008_tcm30-132605.pdf -> reports/incendios_forestales_espania_2008_tcm30-132605.pdf
- informe_incendios_forestales_wwf_2018.pdf -> reports/informe_incendios_forestales_wwf_2018.pdf

## Notes

- The root README references ./assets/banner.png, but this file currently does not exist.
- Many files inside INCENDIOS_207_2025/ have no extension. If they are images, consider normalizing filenames and extensions.

## Recommended Naming Convention

Use lowercase with hyphens:

- images: year-topic-source.ext
- reports: yyyy-source-topic.pdf
- videos: chronodendra-overview-v1.mp4
