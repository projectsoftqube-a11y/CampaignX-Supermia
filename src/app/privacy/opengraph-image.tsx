import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "CampaignX privacy policy";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Per-page share card. The frame is shared; only the text differs. */
export default function Image() {
  return ogCard({
    eyebrow: "Legal",
    heading: "Privacy policy",
    sub: "What we collect, who processes it, and the choices you have.",
    facts: ["Your data stays yours"],
  });
}
