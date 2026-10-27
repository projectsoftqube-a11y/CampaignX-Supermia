import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "AI creative generation";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "AI Creative",
    heading: "Visuals made for each channel, not resized",
    sub: "Creative composed per format and generated with the copy.",
    facts: ["Composed, not cropped", "On brand"],
  });
}
