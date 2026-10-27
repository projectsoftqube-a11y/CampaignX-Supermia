import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "AI marketing for founders";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "Founders",
    heading: "Marketing that ships while you build",
    sub: "A complete campaign from a sentence, approved before it goes out.",
    facts: ["One sentence", "You approve"],
  });
}
