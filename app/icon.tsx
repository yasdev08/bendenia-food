import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Typographic monogram — a placeholder until an official logo exists. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#3a0a15",
          borderRadius: 14,
          color: "#f8f0e3",
          fontSize: 44,
          fontWeight: 900,
          fontFamily: "serif",
        }}
      >
        B<span style={{ color: "#ea7a2c" }}>.</span>
      </div>
    ),
    size,
  );
}
