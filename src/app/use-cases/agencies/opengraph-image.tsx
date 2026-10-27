import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "AI marketing for agencies";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "Agencies",
    heading: "A workspace per client, and a voice that stays put",
    sub: "Separate brand models, separate approvals, no bleed between them.",
    facts: ["Per-client workspaces", "Named approvers"],
  });
}
