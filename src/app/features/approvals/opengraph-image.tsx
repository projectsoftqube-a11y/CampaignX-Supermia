import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Content approval workflow";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "Approvals",
    heading: "Nothing ships without your sign-off",
    sub: "A named approver reviews the whole campaign before it publishes.",
    facts: ["Named approver", "Zero posts unapproved"],
  });
}
