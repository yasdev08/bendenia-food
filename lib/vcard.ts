import { site } from "@/config/site";

/** Escape text values per RFC 2426 / 6350 (backslash, comma, semicolon, newline). */
function esc(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\r?\n/g, "\\n");
}

/**
 * Build a vCard 3.0 for Bendenia Food.
 * - vCard 3.0 is the most widely imported version (iOS Contacts, Google Contacts, Samsung, Huawei).
 * - CRLF line endings as required by the spec.
 * - WhatsApp is exposed as a labelled URL (iOS shows the "WhatsApp" label via X-ABLabel;
 *   Android keeps it as a website entry) and the number itself is the main mobile number,
 *   which WhatsApp picks up automatically once the contact is saved.
 */
export function buildVCard() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:;${esc(site.name)};;;`,
    `FN:${esc(site.name)}`,
    `ORG:${esc(site.name)}`,
    `TEL;TYPE=CELL,VOICE,PREF:${site.phone.e164}`,
    `TEL;TYPE=WORK,VOICE:${site.phone2.e164}`,
    `item1.URL;TYPE=pref:${site.whatsapp.url}`,
    "item1.X-ABLabel:WhatsApp",
    `item2.URL:${site.socials.instagram}`,
    "item2.X-ABLabel:Instagram",
    `item3.URL:${site.socials.facebook}`,
    "item3.X-ABLabel:Facebook",
    `item4.URL:${site.socials.tiktok}`,
    "item4.X-ABLabel:TikTok",
    `item5.URL:${site.location.mapsUrl}`,
    "item5.X-ABLabel:Google Maps",
    // ADR: PO box; extended; street; locality; region; postal code; country
    `ADR;TYPE=WORK;CHARSET=UTF-8:;;${esc(`${site.location.street}, ${site.location.district}`)};${esc(site.location.city)};${esc(site.location.region)};${site.location.postalCode};${esc(site.location.country)}`,
    `GEO:${site.location.lat};${site.location.lng}`,
    `URL:${site.url}`,
    "X-ABShowAs:COMPANY",
    `NOTE;CHARSET=UTF-8:${esc(`${site.tagline} Commandes sur WhatsApp : ${site.phone.e164}`)}`,
    "END:VCARD",
  ];
  return lines.join("\r\n") + "\r\n";
}
