"use client";

import { ExternalLink, Map as MapIcon, MapPin } from "lucide-react";
import { useState } from "react";
import { locationLine, mapsEmbedUrl, site } from "@/config/site";
import { Reveal } from "./Reveal";

/**
 * "Nous trouver" — address + Google Maps.
 * The Google embed (~1 MB of third-party JS) loads only when the visitor asks
 * for it, so the link-in-bio page stays fast; the primary action opens the
 * place directly in the Google Maps app.
 */
export function Location() {
  const [showMap, setShowMap] = useState(false);
  const { lat, lng } = site.location;

  return (
    <section aria-labelledby="location-title" className="px-5 pt-16 sm:pt-20">
      <div className="mx-auto max-w-md">
        <Reveal className="text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-orange uppercase">Nous trouver</p>
          <h2 id="location-title" className="mt-2 font-display text-3xl font-semibold text-burgundy">
            Venez nous voir à Oran
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-7 overflow-hidden rounded-[1.75rem] bg-white/60 ring-1 ring-sand/80">
            <div className="relative aspect-[4/3] bg-cream-deep">
              {showMap ? (
                <iframe
                  title={`Carte Google Maps — ${site.name}, ${locationLine}`}
                  src={mapsEmbedUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setShowMap(true)}
                  className="group absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden text-burgundy"
                  aria-label="Afficher la carte Google Maps"
                >
                  {/* Decorative street-grid backdrop (pure CSS, no network) */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgb(92_20_36/0.08)_1.5px,transparent_1.5px),linear-gradient(90deg,rgb(92_20_36/0.08)_1.5px,transparent_1.5px),linear-gradient(32deg,transparent_46%,rgb(234_122_44/0.22)_46%,rgb(234_122_44/0.22)_54%,transparent_54%)] [background-size:34px_34px,34px_34px,100%_100%]"
                  />
                  <span className="relative grid size-14 place-items-center rounded-full bg-burgundy text-cream shadow-[0_12px_28px_-10px_rgb(58_10_21/0.8)] transition duration-300 group-hover:-translate-y-1">
                    <MapPin className="size-6" aria-hidden="true" />
                  </span>
                  <span className="relative inline-flex items-center gap-2 rounded-full bg-cream/90 px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-sand">
                    <MapIcon className="size-4" aria-hidden="true" />
                    Afficher la carte
                  </span>
                </button>
              )}
            </div>

            <div className="flex flex-col gap-3 p-4">
              <address className="flex items-start gap-3 not-italic">
                <MapPin className="mt-0.5 size-5 shrink-0 text-orange" aria-hidden="true" />
                <span>
                  <span className="block font-bold text-ink">{site.name}</span>
                  <span className="block text-sm text-cocoa">
                    {locationLine}, {site.location.country}
                  </span>
                </span>
              </address>
              <a
                href={site.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-burgundy px-5 py-3.5 font-semibold text-cream transition duration-300 hover:bg-burgundy-deep"
              >
                Ouvrir dans Google Maps
                <ExternalLink className="size-4" aria-hidden="true" />
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            </div>
          </div>
        </Reveal>
        <p className="sr-only">
          Coordonnées GPS : {lat}, {lng}
        </p>
      </div>
    </section>
  );
}
