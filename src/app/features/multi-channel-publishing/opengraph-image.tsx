import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Multi-channel publishing";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "Publishing",
    heading: "Seven channels from one brief",
    sub: "Channel-native drafts, one calendar, and webhooks for the rest.",
    facts: ["Seven channels", "One calendar"],
  });
}
