import { ArrowUpRight } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { site } from "@/config/site";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./icons/BrandIcons";
import { Reveal } from "./Reveal";

type Social = {
  name: string;
  handle: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Brand tint shown on the icon tile. */
  tile: string;
};

export const socials: Social[] = [
  {
    name: "Instagram",
    handle: "Voir la publication",
    href: site.socials.instagram,
    Icon: InstagramIcon,
    tile: "bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fd5949_45%,#d6249f_60%,#285aeb_95%)]",
  },
  {
    name: "Facebook",
    handle: "Bendenia Food",
    href: site.socials.facebook,
    Icon: FacebookIcon,
    tile: "bg-[#1877f2]",
  },
  {
    name: "TikTok",
    handle: "@wassilabennil31",
    href: site.socials.tiktok,
    Icon: TikTokIcon,
    tile: "bg-ink shadow-[inset_-2px_0_0_#25f4ee,inset_2px_0_0_#fe2c55]",
  },
];

export function SocialLinks() {
  return (
    <section aria-labelledby="social-title" className="px-5 pt-16 pb-4 sm:pt-20">
      <div className="mx-auto max-w-md">
        <Reveal className="text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-orange uppercase">Suivez-nous</p>
          <h2 id="social-title" className="mt-2 font-display text-3xl font-semibold text-burgundy">
            Rejoignez la table
          </h2>
        </Reveal>

        <ul className="mt-7 flex flex-col gap-2.5">
          {socials.map(({ name, handle, href, Icon, tile }, i) => (
            <li key={name}>
              <Reveal delay={i * 0.08}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-sand/80 bg-white/60 p-3 pr-5 transition duration-300 hover:-translate-y-0.5 hover:border-burgundy/30 hover:bg-white hover:shadow-[0_14px_30px_-18px_rgb(58_10_21/0.45)]"
                >
                  <span className={`grid size-12 shrink-0 place-items-center rounded-xl text-white ${tile}`}>
                    <Icon className="size-[22px]" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="font-bold text-ink">{name}</span>
                    <span className="truncate text-sm text-cocoa">{handle}</span>
                  </span>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-cocoa/70 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange"
                    aria-hidden="true"
                  />
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
