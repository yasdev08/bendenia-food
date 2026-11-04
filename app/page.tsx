import { Actions } from "@/components/Actions";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { Reveal } from "@/components/Reveal";
import { SocialLinks } from "@/components/SocialLinks";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { site, whatsappOrderUrl } from "@/config/site";
import { getPhotos } from "@/lib/photos";

export default async function Home() {
  const { hero, gallery } = await getPhotos();

  const loc = site.location;
  const abs = (src: string) => new URL(src, site.url).toString();
  const images = [hero, ...gallery].filter((p) => p !== null).map((p) => abs(p.src));
  const restaurantId = `${site.url}/#restaurant`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Restaurant",
        "@id": restaurantId,
        name: site.name,
        description: site.description,
        url: site.url,
        telephone: site.phone.e164,
        contactPoint: [
          { "@type": "ContactPoint", telephone: site.phone.e164, contactType: "reservations", areaServed: "DZ", availableLanguage: ["fr", "ar"] },
          { "@type": "ContactPoint", telephone: site.phone2.e164, contactType: "customer service", areaServed: "DZ", availableLanguage: ["fr", "ar"] },
        ],
        slogan: site.tagline,
        ...(images.length ? { image: images } : {}),
        address: {
          "@type": "PostalAddress",
          streetAddress: `${loc.street}, ${loc.district}`,
          addressLocality: loc.city,
          addressRegion: loc.region,
          postalCode: loc.postalCode,
          addressCountry: loc.countryCode,
        },
        geo: { "@type": "GeoCoordinates", latitude: loc.lat, longitude: loc.lng },
        hasMap: loc.mapsUrl,
        areaServed: { "@type": "City", name: loc.city },
        sameAs: [...Object.values(site.socials), loc.mapsUrl],
        potentialAction: {
          "@type": "OrderAction",
          target: { "@type": "EntryPoint", urlTemplate: whatsappOrderUrl(), actionPlatform: ["http://schema.org/MobileWebPlatform", "http://schema.org/DesktopWebPlatform"] },
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: site.url,
        inLanguage: "fr",
        publisher: { "@id": restaurantId },
      },
    ],
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

        <Location />
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
