import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "AI SMS marketing campaigns";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "SMS",
    heading: "160 characters. Still unmistakably you.",
    sub: "Short, on-brand messages held until a named approver releases them.",
    facts: ["One segment", "One action"],
  });
}
