import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — restaurant à ${site.location.city}. ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = async (file: string) =>
  new Uint8Array(await readFile(path.join(process.cwd(), "assets", "fonts", file)));

/** Cached so the image is prerendered at build instead of rendered per request. */
async function loadAssets() {
  "use cache";
  const [black, italic, extrabold, medium] = await Promise.all([
    font("Fraunces-Black.woff"),
    font("Fraunces-SemiBoldItalic.woff"),
    font("Manrope-ExtraBold.woff"),
    font("Manrope-Medium.woff"),
  ]);
  let photo: string | null = null;
  try {
    const buf = await readFile(path.join(process.cwd(), "public", "photos", "hero.jpg"));
    photo = `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    photo = null;
  }
  return { black, italic, extrabold, medium, photo };
}

/** Share card: brand panel + the real hero photo (falls back to type-only if no hero.jpg). */
export default async function OpengraphImage() {
  const { black, italic, extrabold, medium, photo } = await loadAssets();

  const CREAM = "#f8f0e3";
  const ORANGE = "#ea7a2c";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#3a0a15", color: CREAM }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 64px",
            background: "radial-gradient(80% 80% at 0% 100%, rgba(168,50,43,0.55), transparent 70%)",
          }}
        >
          <div style={{ fontFamily: "Fraunces", fontWeight: 900, fontSize: 96, lineHeight: 1, letterSpacing: 2 }}>BENDENIA</div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 14, color: ORANGE }}>
            <div style={{ width: 60, height: 3, background: ORANGE }} />
            <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 28, letterSpacing: 16 }}>FOOD</div>
            <div style={{ width: 60, height: 3, background: ORANGE }} />
          </div>
          <div style={{ fontFamily: "Fraunces", fontStyle: "italic", fontWeight: 600, fontSize: 50, marginTop: 44, lineHeight: 1.1 }}>
            {site.tagline}
          </div>
          <div style={{ fontFamily: "Manrope", fontWeight: 500, fontSize: 28, marginTop: 18, color: "rgba(248,240,227,0.8)" }}>
            {`Restaurant · ${site.location.district}, ${site.location.city}`}
          </div>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              marginTop: 40,
              padding: "16px 30px",
              borderRadius: 999,
              background: ORANGE,
              color: "white",
              fontFamily: "Manrope",
              fontWeight: 800,
              fontSize: 25,
              whiteSpace: "nowrap",
            }}
          >
            {`Commandez sur WhatsApp · ${site.phone.display}`}
          </div>
        </div>
        {photo && (
          <div style={{ width: 470, height: "100%", display: "flex" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt="" width={470} height={630} style={{ width: 470, height: 630, objectFit: "cover" }} />
          </div>
        )}
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: black.buffer, weight: 900, style: "normal" },
        { name: "Fraunces", data: italic.buffer, weight: 600, style: "italic" },
        { name: "Manrope", data: extrabold.buffer, weight: 800, style: "normal" },
        { name: "Manrope", data: medium.buffer, weight: 500, style: "normal" },
      ],
    },
  );
}
