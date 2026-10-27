import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "CampaignX frequently asked questions";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "FAQ",
    heading: "Questions, answered plainly",
    sub: "Channels, pricing, approvals, your data and who processes it.",
    facts: ["Plain answers"],
  });
}
