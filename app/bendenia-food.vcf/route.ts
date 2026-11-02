import { buildVCard } from "@/lib/vcard";

/**
 * GET /bendenia-food.vcf
 * A real URL (not a blob) so it also works inside the Instagram / TikTok / Facebook
 * in-app browsers, where JS blob downloads are often blocked.
 * iOS Safari opens text/vcard directly in the "Add contact" sheet; Android downloads
 * the file and opens it with Contacts.
 */
export function GET() {
  return new Response(buildVCard(), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Bendenia-Food.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
