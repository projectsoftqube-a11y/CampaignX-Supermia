import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "About CampaignX";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "About",
    heading: "Why CampaignX exists",
    sub: "The campaign work that should not need a full team to assemble.",
    facts: ["By SuperMIA"],
  });
}
