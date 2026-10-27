import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "AI marketing for marketing teams";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "Marketing Teams",
    heading: "The assembly, handled. The judgement, yours.",
    sub: "Campaigns built in one pass so the team edits rather than drafts.",
    facts: ["One brief in", "Seven channels out"],
  });
}
