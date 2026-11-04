/**
 * Single source of truth for Bendenia Food business data.
 * Edit here — every button, the vCard, metadata and footer read from this file.
 */
export const site = {
  name: "Bendenia Food",
  tagline: "Le goût qui vous rassemble.",
  welcome: "Bienvenue chez Bendenia Food.",
  description:
    "Bendenia Food, restaurant à Oran (Cité Les Palmiers) — le goût qui vous rassemble. Commandez directement sur WhatsApp, trouvez-nous sur Google Maps et suivez-nous sur Instagram, Facebook et TikTok.",

  /** Public URL of the deployed site (used for Open Graph & sitemap). Override with NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bendenia-food.vercel.app",

  phone: {
    display: "0665 00 65 59",
    local: "0665006559",
    e164: "+213665006559",
  },

  /** Second line (calls only — WhatsApp orders stay on the main number). */
  phone2: {
    display: "0554 79 49 75",
    local: "0554794975",
    e164: "+213554794975",
  },

  whatsapp: {
    url: "https://wa.me/213665006559",
    /** Pre-filled order message (URL-encoded automatically). */
    message: "Bonjour Bendenia Food ! Je souhaite passer une commande.",
  },

  socials: {
    instagram: "https://www.instagram.com/p/DT_GatFiFAy/",
    facebook: "https://www.facebook.com/profile.php?id=61553413950925",
    tiktok: "https://www.tiktok.com/@wassilabennil31",
  },

  /**
   * Location. Coordinates come from the Google Maps place "Bendenia Food".
   * Street/neighbourhood resolved from those coordinates via OpenStreetMap — [À CONFIRMER].
   */
  location: {
    mapsUrl: "https://maps.app.goo.gl/n4gVopgQgfe8Hxy27",
    lat: 35.6748944,
    lng: -0.647717,
    street: "Rue Ibn Sinna",
    district: "Cité Les Palmiers",
    city: "Oran",
    postalCode: "31000",
    region: "Oran",
    regionCode: "DZ-31",
    country: "Algérie",
    countryCode: "DZ",
  },

  /** Path of the downloadable contact card (served by app/bendenia-food.vcf/route.ts). */
  vcardPath: "/bendenia-food.vcf",
} as const;

export function whatsappOrderUrl() {
  return `${site.whatsapp.url}?text=${encodeURIComponent(site.whatsapp.message)}`;
}

export const telHref = `tel:${site.phone.e164}`;
export const tel2Href = `tel:${site.phone2.e164}`;

/** Short human-readable location line, e.g. "Cité Les Palmiers, Oran". */
export const locationLine = `${site.location.district}, ${site.location.city}`;

/**
 * Keyless Google Maps embed centred on the pin (loaded only on demand).
 * Uses the final /maps/embed URL directly: the legacy maps.google.com?output=embed
 * URL 301-redirects with X-Frame-Options: SAMEORIGIN, which blocks framing.
 */
export const mapsEmbedUrl = `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${site.location.lat},${site.location.lng}!6i17!3m1!1sfr!5m1!1sfr`;
