import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { RegisterSW } from "@/components/RegisterSW";
import { site } from "@/config/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const { location: loc } = site;
const seoTitle = `${site.name} — Restaurant à ${loc.city} | Commandez sur WhatsApp`;
const shareTitle = `${site.name} · ${loc.city} — ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seoTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Bendenia Food",
    `restaurant ${loc.city}`,
    `restaurant ${loc.district}`,
    `${loc.district} ${loc.city}`,
    "commander sur WhatsApp",
    `cuisine ${loc.city}`,
    "Algérie",
  ],
  alternates: { canonical: "/" },
  category: "food",
  openGraph: {
    type: "website",
    locale: "fr_DZ",
    url: "/",
    siteName: site.name,
    title: shareTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: true },
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: "black-translucent",
  },
  // Local-SEO geo tags (used by some engines/directories; harmless elsewhere).
  other: {
    "geo.region": loc.regionCode,
    "geo.placename": loc.city,
    "geo.position": `${loc.lat};${loc.lng}`,
    ICBM: `${loc.lat}, ${loc.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#3a0a15",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${manrope.variable} antialiased`}>
      <body className="min-h-dvh">
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
