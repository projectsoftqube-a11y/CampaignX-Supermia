import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * The home page share card.
 *
 * Built from the same `ogCard` frame as every other page, so the set
 * reads as one family rather than the home page having a bespoke
 * layout the rest of the site does not share.
 */
export default function Image() {
  return ogCard({
    eyebrow: "AI Marketing Agent",
    heading: "Turn one brief into a complete campaign",
    sub: "Copy and creative for seven channels, written in your brand voice and published only after you approve it.",
    facts: ["Seven channels", "One brief", "You approve"],
  });
}
