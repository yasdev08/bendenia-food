# Bendenia Food — Link-in-Bio

Mobile-first landing page that turns social-media visitors into WhatsApp orders.
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Add your food photos (important)

No photos are bundled yet — the page shows labelled placeholders (e.g. `photos/hero.jpg`).
Drop your images into **`public/photos/`** and rebuild:

| File                     | Used for                                   |
| ------------------------ | ------------------------------------------ |
| `hero.jpg` (png/webp ok) | Large top photo — use your strongest shot  |
| `01.jpg`, `02.jpg`, …    | Gallery, in file-name order                |

Real dimensions are read at build time, so photos are never stretched and the gallery keeps their natural proportions. Clicking a gallery photo opens a lightbox (swipe / arrow keys / Esc).

## Edit business info

Everything (phone, WhatsApp link + pre-filled message, social links, site URL) lives in **`config/site.ts`**.

Set the public URL for Open Graph / sitemap when deploying:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## What's inside

- **Hero** — typographic wordmark (not a logo), "Le goût qui vous rassemble.", animated "Commander maintenant" → WhatsApp. Entrance animations are pure CSS so the first screen paints instantly, even before JS loads.
- **Actions** — Commander sur WhatsApp · Enregistrer le contact · Appeler.
- **Save contact** — `GET /bendenia-food.vcf` (route handler, `lib/vcard.ts`): vCard 3.0, CRLF, name/org "Bendenia Food", `+213665006559`, WhatsApp + socials as labelled URLs. It's a real URL (not a JS blob), so it works inside Instagram/TikTok/Facebook in-app browsers; iOS opens the native "Add contact" sheet, Android downloads and opens Contacts.
- **Social** — Instagram, Facebook, TikTok cards with brand icons.
- **Gallery** — masonry grid, hover zoom, scroll reveals, lightbox.
- **Sticky WhatsApp bar** (mobile) — appears after the hero CTA scrolls away, hides at the footer.
- **Location** — "Itinéraire" button, "Nous trouver" section (Google Maps embed loads only on tap), Maps link in footer and vCard. Coordinates/address in `config/site.ts` → `location`.
- **SEO** — local title/description ("Restaurant à Oran"), Open Graph card built from the hero photo + brand fonts (`/opengraph-image`), geo meta tags, `robots.txt`, image `sitemap.xml`, Restaurant + WebSite JSON-LD (address, geo, map, both phones, photos, WhatsApp order action).
- **PWA** — `app/manifest.ts`, icons in `public/icons` (+ maskable), `public/sw.js` (network-first pages, offline fallback, cached photos; bump `VERSION` to reset caches), install button on Android / hint on iOS (footer).
- **Accessibility** — semantic landmarks, `lang="fr"`, focus rings, lightbox focus trap/restore, `prefers-reduced-motion` respected.
