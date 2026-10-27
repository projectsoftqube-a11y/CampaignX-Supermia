import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { post } from "@/config/posts/social-media-campaign-plan";

export const alt = post.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Social Media",
    heading: "A 30-day social media campaign plan",
    sub: "Five decisions, then a calendar that fills itself.",
    facts: [`${post.readingMinutes} min read`],
  });
}
