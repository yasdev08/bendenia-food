import { MapPin, Phone } from "lucide-react";
import { locationLine, site, tel2Href, telHref } from "@/config/site";
import { InstallApp } from "./InstallApp";
import { SaveContactButton } from "./SaveContactButton";
import { socials } from "./SocialLinks";
import { Wordmark } from "./Wordmark";

async function getYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getYear();
  return (
    <footer id="site-footer" className="grain relative mt-20 overflow-hidden bg-burgundy-deep text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-orange/20 blur-3xl"
      />
      <div className="relative mx-auto flex max-w-md flex-col items-center px-6 pt-16 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-center">
        <Wordmark as="p" size="lg" />

        <p className="mt-7 font-display text-2xl italic text-cream/90">
          Merci pour votre visite <span aria-label="avec amour">❤️</span>
        </p>

        <ul className="mt-8 flex items-center gap-3" aria-label="Réseaux sociaux">
          {socials.map(({ name, href, Icon }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} (nouvel onglet)`}
                className="grid size-12 place-items-center rounded-full bg-cream/8 text-cream ring-1 ring-cream/15 transition duration-300 hover:-translate-y-0.5 hover:bg-orange hover:ring-orange"
              >
                <Icon className="size-5" />
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Maps (nouvel onglet)"
              className="grid size-12 place-items-center rounded-full bg-cream/8 text-cream ring-1 ring-cream/15 transition duration-300 hover:-translate-y-0.5 hover:bg-orange hover:ring-orange"
            >
              <MapPin className="size-5" aria-hidden="true" />
            </a>
          </li>
        </ul>

        <address className="mt-6 text-sm text-cream/70 not-italic">
          {locationLine}, {site.location.country}
        </address>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          <SaveContactButton variant="compact" />
          <a
            href={telHref}
            className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2.5 text-sm font-semibold text-cream transition hover:border-orange hover:text-orange"
          >
            <Phone className="size-4" aria-hidden="true" />
            {site.phone.display}
          </a>
          <a
            href={tel2Href}
            className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2.5 text-sm font-semibold text-cream transition hover:border-orange hover:text-orange"
          >
            <Phone className="size-4" aria-hidden="true" />
            {site.phone2.display}
          </a>
        </div>

        <InstallApp />


        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-cream/20 to-transparent" />
        <p className="mt-6 text-xs text-cream/55">
          © {year} {site.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
