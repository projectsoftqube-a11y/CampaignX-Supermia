import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "AI marketing for small businesses";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "Small Business",
    heading: "A full campaign without a full team",
    sub: "Write one sentence before the shop opens; approve it by lunch.",
    facts: ["No designer needed", "About ten minutes"],
  });
}
