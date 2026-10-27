import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { post } from "@/config/posts/ai-marketing-tools-small-business";

export const alt = post.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Campaign Strategy",
    heading: "AI marketing tools for small business, compared",
    sub: "Five categories, and where each one stops being the answer.",
    facts: [`${post.readingMinutes} min read`],
  });
}
