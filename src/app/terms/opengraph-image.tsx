import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "CampaignX terms and conditions";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "Legal",
    heading: "Terms and conditions",
    sub: "The agreement governing your access to and use of CampaignX.",
    facts: ["What you approve"],
  });
}
