import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Who CampaignX is for";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "Use Cases",
    heading: "Built for whoever is doing the marketing",
    sub: "Small businesses, agencies, marketing teams and founders.",
    facts: ["Four ways in"],
  });
}
