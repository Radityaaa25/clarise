import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Clarise — AI-Powered Learning Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #070B11 0%, #0C1F3D 50%, #1A7FCC 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(77, 184, 255, 0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "-60px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(26, 127, 204, 0.1)",
          }}
        />

        {/* Logo text */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "white",
            marginBottom: 16,
            letterSpacing: "-2px",
            display: "flex",
          }}
        >
          Clarise
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#4DB8FF",
            fontWeight: 700,
            marginBottom: 24,
            display: "flex",
          }}
        >
          AI-Powered Learning Platform
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 20,
            color: "rgba(232, 245, 255, 0.7)",
            maxWidth: 600,
            textAlign: "center",
            lineHeight: 1.5,
            display: "flex",
          }}
        >
          Tingkatkan skill kamu dengan kursus interaktif, AI Tutor, dan gamifikasi.
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 18,
            color: "rgba(255,255,255,0.4)",
            fontWeight: 500,
            display: "flex",
          }}
        >
          clarise.my.id
        </div>
      </div>
    ),
    { ...size },
  );
}
