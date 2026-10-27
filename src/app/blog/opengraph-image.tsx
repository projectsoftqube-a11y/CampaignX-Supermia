import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "The CampaignX blog";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "Blog",
    heading: "Notes on campaigns that actually ship",
    sub: "How multi-channel campaigns get written, approved and published.",
    facts: ["Written by the team"],
  });
}
