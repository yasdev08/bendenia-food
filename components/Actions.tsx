import type { CSSProperties } from "react";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { site, tel2Href, telHref, whatsappOrderUrl } from "@/config/site";
import { SaveContactButton } from "./SaveContactButton";
import { WhatsAppIcon } from "./icons/BrandIcons";

/** Priority actions: 1. WhatsApp order · 2. Save contact · 3. Call. */
export function Actions() {
  return (
    <section id="actions" aria-label="Commander et contacter Bendenia Food" className="relative z-10 -mt-10 px-4 lg:-mt-16">
      {/* CSS entrance (not JS) — this card is partly above the fold. */}
      <div
        className="enter mx-auto max-w-md rounded-[1.75rem] bg-cream p-3 shadow-[0_30px_60px_-30px_rgb(58_10_21/0.55)] ring-1 ring-sand/70 sm:p-4"
        style={{ "--d": "0.8s" } as CSSProperties}
      >
        <div className="flex flex-col gap-2.5">
          <a
            href={whatsappOrderUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 rounded-2xl bg-orange px-4 py-4 text-white shadow-[0_12px_30px_-12px_rgb(234_122_44/0.9)] transition duration-300 hover:-translate-y-0.5 hover:bg-orange-bright active:translate-y-0"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15 ring-1 ring-white/25">
              <WhatsAppIcon className="size-[22px]" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-[1rem] leading-snug font-bold whitespace-nowrap max-[379px]:text-[0.92rem]">
                Commander sur WhatsApp
              </span>
              <span className="text-[0.8rem] text-white/85">{site.phone.display}</span>
            </span>
            <ArrowUpRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            <span className="sr-only"> (ouvre WhatsApp)</span>
          </a>

          <SaveContactButton />

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={telHref}
              aria-label={`Appeler le ${site.phone.display}`}
              className="group flex items-center justify-center gap-2 rounded-2xl border border-sand bg-white/50 px-3 py-3.5 font-semibold text-burgundy transition duration-300 hover:border-burgundy hover:bg-white"
            >
              <Phone className="size-[18px] transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
              Appeler
            </a>
            <a
              href={site.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-2xl border border-sand bg-white/50 px-3 py-3.5 font-semibold text-burgundy transition duration-300 hover:border-burgundy hover:bg-white"
            >
              <MapPin className="size-[18px] transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
              Itinéraire
              <span className="sr-only"> (Google Maps, nouvel onglet)</span>
            </a>
          </div>

          <p className="text-center text-[0.82rem] text-cocoa">
            Appels :{" "}
            <a href={telHref} className="font-semibold text-burgundy underline-offset-4 hover:underline">
              {site.phone.display}
            </a>{" "}
            ·{" "}
            <a href={tel2Href} className="font-semibold text-burgundy underline-offset-4 hover:underline">
              {site.phone2.display}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
