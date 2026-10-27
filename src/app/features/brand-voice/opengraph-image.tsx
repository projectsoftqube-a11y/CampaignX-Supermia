import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "AI brand voice model";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "Brand Voice",
    heading: "Campaigns that sound like you, not like AI",
    sub: "A brand model built from material you have already written.",
    facts: ["Learned from your copy", "Every channel"],
  });
}
