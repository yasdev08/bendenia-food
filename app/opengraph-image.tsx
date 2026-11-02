import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(70% 70% at 85% 15%, rgba(234,122,44,0.45), transparent 70%), radial-gradient(60% 60% at 10% 100%, rgba(168,50,43,0.6), transparent 70%), #3a0a15",
          color: "#f8f0e3",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 132, fontWeight: 900, letterSpacing: 4, lineHeight: 1 }}>BENDENIA</div>
        <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 18, color: "#ea7a2c" }}>
          <div style={{ width: 80, height: 3, background: "#ea7a2c" }} />
          <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: 22, fontFamily: "sans-serif" }}>FOOD</div>
          <div style={{ width: 80, height: 3, background: "#ea7a2c" }} />
        </div>
        <div style={{ marginTop: 56, fontSize: 52, fontStyle: "italic" }}>{site.tagline}</div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            padding: "16px 34px",
            borderRadius: 999,
            background: "#ea7a2c",
            color: "white",
            fontSize: 30,
            fontWeight: 700,
            fontFamily: "sans-serif",
          }}
        >
          Commandez sur WhatsApp · {site.phone.display}
        </div>
      </div>
    ),
    size,
  );
}
