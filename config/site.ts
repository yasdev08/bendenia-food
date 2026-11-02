/**
 * Single source of truth for Bendenia Food business data.
 * Edit here — every button, the vCard, metadata and footer read from this file.
 */
export const site = {
  name: "Bendenia Food",
  tagline: "Le goût qui vous rassemble.",
  welcome: "Bienvenue chez Bendenia Food.",
  description:
    "Bendenia Food — le goût qui vous rassemble. Commandez directement sur WhatsApp, enregistrez notre contact et suivez-nous sur Instagram, Facebook et TikTok.",

  /** Public URL of the deployed site (used for Open Graph & sitemap). Override with NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bendenia-food.vercel.app",

  phone: {
    display: "0665 00 65 59",
    local: "0665006559",
    e164: "+213665006559",
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

  /** Path of the downloadable contact card (served by app/bendenia-food.vcf/route.ts). */
  vcardPath: "/bendenia-food.vcf",
} as const;

export function whatsappOrderUrl() {
  return `${site.whatsapp.url}?text=${encodeURIComponent(site.whatsapp.message)}`;
}

export const telHref = `tel:${site.phone.e164}`;
