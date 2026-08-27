import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded share card, generated at build time. No stock imagery. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#f8f8f6",
          color: "#0A0A0A",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#0A0A0A",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Drawn, not typed — avoids a dynamic font fetch at build time. */}
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path
                d="M4 4 22 22M22 4 4 22"
                stroke="#ffffff"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>
            {siteConfig.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 900,
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            Turn one brief into a complete campaign.
          </div>
          <div style={{ fontSize: 28, color: "#6E6E6E", lineHeight: 1.4 }}>
            Strategy, creative, targeting, launch and optimization — in one
            intelligent workspace.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            color: "#164E4A",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#164E4A",
            }}
          />
          AI Campaign Platform
        </div>
      </div>
    ),
    size,
  );
}
