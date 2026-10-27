import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "AI social media campaigns";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "Social Media",
    heading: "Five feeds. One brief. Five different posts.",
    sub: "Instagram, Facebook, LinkedIn, X and Google Business.",
    facts: ["Five surfaces", "Scheduled together"],
  });
}
