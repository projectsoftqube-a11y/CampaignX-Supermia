import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Marketing channels CampaignX publishes to";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "Channels",
    heading: "Seven channels. One brief behind them.",
    sub: "Each channel written for how people actually read there.",
    facts: ["Social", "Email and SMS", "Webhooks"],
  });
}
