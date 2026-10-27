import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "CampaignX pricing";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "Pricing",
    heading: "Free during Beta. Lock in early access.",
    sub: "Every plan publishes to the same seven channels.",
    facts: ["Free in Beta", "No card to start"],
  });
}
