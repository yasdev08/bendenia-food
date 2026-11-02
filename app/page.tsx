import { Actions } from "@/components/Actions";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { SocialLinks } from "@/components/SocialLinks";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { site } from "@/config/site";
import { getPhotos } from "@/lib/photos";

export default function Home() {
  const { hero, gallery } = getPhotos();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    url: site.url,
    telephone: site.phone.e164,
    slogan: site.tagline,
    sameAs: Object.values(site.socials),
    ...(hero ? { image: new URL(hero.src, site.url).toString() } : {}),
  };

  return (
    <>
      <main>
        <Hero photo={hero} />
        <Actions />
        <SocialLinks />

        <section aria-labelledby="gallery-title" className="px-4 pt-16 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mb-8 text-center sm:mb-12">
              <p className="text-xs font-bold tracking-[0.3em] text-orange uppercase">Notre cuisine</p>
              <h2 id="gallery-title" className="mt-2 font-display text-3xl font-semibold text-burgundy text-balance sm:text-5xl">
                Un aperçu de ce qui vous attend
              </h2>
            </Reveal>
            <Gallery photos={gallery} />
          </div>
        </section>
      </main>

      <Footer />
      <StickyWhatsApp />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
