import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "CampaignX product overview";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "Product",
    heading: "Everything between a brief and a published campaign",
    sub: "Brand voice, AI creative, publishing, approvals and reporting.",
    facts: ["Seven channels", "One brief", "You approve"],
  });
}
