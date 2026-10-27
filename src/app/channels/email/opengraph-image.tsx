import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "AI email marketing campaigns";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "Email",
    heading: "Subject line to artwork, written in one pass",
    sub: "Written alongside your social posts and SMS, from one brief.",
    facts: ["Subject + preview", "Artwork included"],
  });
}
