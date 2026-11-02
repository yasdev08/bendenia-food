import "server-only";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

/**
 * Food photography is read from /public/photos at build time.
 *
 *   public/photos/hero.jpg      → hero image (your strongest shot)
 *   public/photos/01-*.jpg …    → gallery, in file-name order
 *
 * Real width/height are read from each file so images are never stretched;
 * the gallery uses their natural proportions (no forced crop).
 * When a slot has no photo, a clearly-labelled placeholder is rendered instead.
 */
export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const DIR = path.join(process.cwd(), "public", "photos");
const EXT = /\.(jpe?g|png|webp|avif)$/i;

function read(file: string, alt: string): Photo | null {
  try {
    const buf = fs.readFileSync(path.join(DIR, file));
    const { width, height } = imageSize(buf);
    if (!width || !height) return null;
    // Content hash in the URL: replacing a photo under the same name always busts
    // the image-optimizer and CDN caches.
    const v = createHash("sha1").update(buf).digest("hex").slice(0, 8);
    return { src: `/photos/${encodeURIComponent(file)}?v=${v}`, width, height, alt };
  } catch {
    return null;
  }
}

/** Optional public/photos/alt.json: { "01.jpg": "description…" } for accessible alt text. */
function readAlts(): Record<string, string> {
  try {
    return JSON.parse(fs.readFileSync(path.join(DIR, "alt.json"), "utf8"));
  } catch {
    return {};
  }
}

export function getPhotos(): { hero: Photo | null; gallery: Photo[] } {
  const alts = readAlts();
  let files: string[] = [];
  try {
    files = fs.readdirSync(DIR).filter((f) => EXT.test(f));
  } catch {
    return { hero: null, gallery: [] };
  }
  files.sort((a, b) => a.localeCompare(b, "fr", { numeric: true }));

  const heroFile = files.find((f) => /^hero\./i.test(f));
  const rest = files.filter((f) => f !== heroFile);

  const gallery = rest
    .map((f, i) => read(f, alts[f] ?? `Bendenia Food — photo ${i + 1}`))
    .filter((p): p is Photo => p !== null);

  const hero = heroFile
    ? read(heroFile, alts[heroFile] ?? "Bendenia Food — notre cuisine")
    : (gallery[0] ?? null);

  return { hero, gallery };
}
