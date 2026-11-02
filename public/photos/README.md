# Bendenia Food — photos

Drop your real food photographs in this folder, then rebuild (`npm run build`).

- `hero.jpg` (or .png / .webp) → the large photo at the top of the page. Use your strongest, most appetising shot (portrait or square works best on phones).
- Any other image (e.g. `01.jpg`, `02.jpg`, …) → the gallery, in file-name order.

Photos keep their natural proportions in the gallery (no stretching, no forced crop).
Recommended: JPG/WebP, 1600–2400 px on the long side, under ~1 MB each. Next.js resizes and serves optimised versions automatically.

`alt.json` holds a short description of each photo (for screen readers and Google) — add a line when you add a photo.
Every image in this folder is shown, so keep only the photos you want on the page here.

If `hero.*` is missing, the first gallery photo is used as the hero.
Empty slots show a labelled placeholder (e.g. "photos/hero.jpg") until a photo is added.
