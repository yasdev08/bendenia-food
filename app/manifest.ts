import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${site.name} — Oran`,
    short_name: site.name,
    description: site.description,
    lang: "fr",
    dir: "ltr",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f8f0e3",
    theme_color: "#3a0a15",
    categories: ["food", "lifestyle", "shopping"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    // Shortcuts must stay in scope, so they target on-page sections.
    shortcuts: [
      {
        name: "Commander sur WhatsApp",
        short_name: "Commander",
        url: "/?source=pwa#actions",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Nous trouver (Google Maps)",
        short_name: "Itinéraire",
        url: "/?source=pwa#location-title",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
    ],
  };
}
