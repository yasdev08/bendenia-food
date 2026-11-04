import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { site, whatsappOrderUrl } from "@/config/site";
import type { Photo } from "@/lib/photos";
import { Wordmark } from "./Wordmark";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { WhatsAppIcon } from "./icons/BrandIcons";

/** Staggered CSS entrance (see .enter in globals.css). */
const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function Hero({ photo }: { photo: Photo | null }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-burgundy-deep text-cream lg:min-h-[100svh]"
    >
      {/* Ambient glow (desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 hidden bg-[radial-gradient(60%_60%_at_80%_40%,rgb(234_122_44/0.28),transparent_70%),radial-gradient(50%_50%_at_10%_90%,rgb(168_50_43/0.35),transparent_70%)] lg:block"
      />

      <div className="mx-auto grid min-h-[88svh] max-w-6xl lg:min-h-[100svh] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-10">
        {/* Photo: full-bleed background on mobile, framed on desktop */}
        <div className="enter-zoom absolute inset-0 -z-10 lg:relative lg:inset-auto lg:z-0 lg:order-2 lg:aspect-[4/5] lg:w-full lg:overflow-hidden lg:rounded-[2.25rem] lg:shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] lg:ring-1 lg:ring-cream/10">
          {photo ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              preload
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          ) : (
            <PhotoPlaceholder
              file="hero.jpg"
              className="h-full w-full lg:rounded-[2.25rem]"
              contentClassName="justify-start pt-28 lg:justify-center lg:pt-3"
            />
          )}
          {/* Legibility gradient (mobile only) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgb(38_6_12/0.55)_0%,rgb(38_6_12/0.05)_26%,rgb(38_6_12/0.5)_50%,rgb(38_6_12/0.88)_72%,rgb(38_6_12/0.97)_100%)] lg:hidden"
          />
        </div>

        {/* Copy */}
        <div className="relative flex min-h-[88svh] flex-col px-6 pt-[max(1.75rem,env(safe-area-inset-top))] pb-16 lg:order-1 lg:min-h-0 lg:px-0 lg:py-0">
          <header className="enter flex justify-center lg:justify-start" style={d(0.15)}>
            <Wordmark as="p" size="md" />
          </header>

          <div className="mt-auto lg:mt-14">
            <p
              className="enter mb-4 inline-flex items-center gap-2 rounded-full bg-cream/10 px-3.5 py-1.5 text-[0.78rem] font-semibold tracking-wide text-cream/90 ring-1 ring-cream/15 backdrop-blur-md"
              style={d(0.3)}
            >
              <span className="size-1.5 rounded-full bg-orange-bright" aria-hidden="true" />
              Bienvenue chez Bendenia Food.
            </p>

            <h1
              id="hero-title"
              className="enter font-display text-[3.1rem] leading-[0.95] font-semibold tracking-[-0.02em] text-balance sm:text-6xl lg:text-[5.25rem]"
              style={{ ...d(0.42), fontVariationSettings: '"SOFT" 50, "opsz" 144' }}
            >
              <span className="sr-only">
                {site.name}, restaurant à {site.location.city} —{" "}
              </span>
              Le goût qui vous{" "}
              <em className="font-medium text-orange-bright italic">rassemble.</em>
            </h1>

            <p className="enter mt-5 max-w-md text-[1.02rem] leading-relaxed text-cream/80 lg:text-lg" style={d(0.54)}>
              Passez votre commande en un message, directement sur WhatsApp.
            </p>

            <div className="enter mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={d(0.66)}>
              <a
                id="hero-cta"
                href={whatsappOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-shine cta-halo group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-orange px-7 py-4 text-[1.05rem] font-bold whitespace-nowrap text-white max-[379px]:gap-2.5 max-[379px]:px-5 max-[379px]:text-base shadow-[0_14px_34px_-10px_rgb(234_122_44/0.75)] transition duration-300 hover:bg-orange-bright active:scale-[0.98]"
              >
                <WhatsAppIcon className="size-5" />
                Commander maintenant
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                <span className="sr-only"> (ouvre WhatsApp)</span>
              </a>
              <a
                href="#actions"
                className="inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold text-cream/80 transition hover:text-cream"
              >
                Contact &amp; réseaux
                <ChevronDown className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
