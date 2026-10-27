import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Campaign analytics and reporting";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "Analytics",
    heading: "One report across every channel",
    sub: "Reach and engagement per campaign, feeding the next brief.",
    facts: ["One report", "No ad spend"],
  });
}
