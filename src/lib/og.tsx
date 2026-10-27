import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface OgCardInput {
  /** The line that carries the page. Keep it short — this is set large. */
  heading: string;
  /** One supporting sentence. */
  sub?: string;
  /** Small label above the heading, e.g. the section. */
  eyebrow?: string;
  /** Up to three short facts along the foot. */
  facts?: readonly string[];
}

/**
 * The share card every page's `opengraph-image` route renders.
 *
 * Every page used to fall back to one site-wide card, so a link to
 * `/channels/sms` and a link to `/pricing` shared the same picture and
 * the same headline. That is a wasted signal in every feed the link
 * appears in, and it makes two different pages look like one.
 *
 * This keeps the brand frame constant — ground, logo, accent rule —
 * and varies only the text, so the set reads as one family while each
 * card says what its own page is about.
 *
 * Deliberately no external fonts: `next/og` would have to fetch them
 * at build time for every route, and the system stack renders
 * predictably at these sizes.
 */
export function ogCard({ heading, sub, eyebrow, facts }: OgCardInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f8f8f6",
          color: "#0b0a1f",
          position: "relative",
        }}
      >
        {/* Brand wash, so the card is not a white rectangle. */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 760,
            height: 760,
            borderRadius: 999,
            background:
              "radial-gradient(closest-side, rgba(75,60,255,0.17), rgba(75,60,255,0))",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -140,
            width: 640,
            height: 640,
            borderRadius: 999,
            background:
              "radial-gradient(closest-side, rgba(208,0,255,0.13), rgba(208,0,255,0))",
          }}
        />

        {/* Wordmark. */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 16, zIndex: 1 }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              background:
                "linear-gradient(135deg, #2F6BFF 0%, #8A2BE2 55%, #D000FF 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 26 26" fill="none">
              <path
                d="M4 4 22 22M22 4 4 22"
                stroke="#ffffff"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.8 }}>
            {siteConfig.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 950,
            zIndex: 1,
          }}
        >
          {eyebrow ? (
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#5B45F0",
              }}
            >
              {eyebrow}
            </div>
          ) : null}

          <div
            style={{
              fontSize: heading.length > 54 ? 58 : 70,
              fontWeight: 700,
              letterSpacing: -2.4,
              lineHeight: 1.06,
            }}
          >
            {heading}
          </div>

          {sub ? (
            <div style={{ fontSize: 26, color: "#5a5a66", lineHeight: 1.4 }}>
              {sub}
            </div>
          ) : null}
        </div>

        {/* Facts along the foot, or the tagline when a page has none. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 20,
            color: "#5a5a66",
            zIndex: 1,
          }}
        >
          {(facts?.length ? facts : [siteConfig.tagline]).map((fact) => (
            <div
              key={fact}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "#5B45F0",
                }}
              />
              {fact}
            </div>
          ))}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
