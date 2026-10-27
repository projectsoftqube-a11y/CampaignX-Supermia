import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { post } from "@/config/posts/multi-channel-campaign-examples";

export const alt = post.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Campaign Strategy",
    heading: "Multi-channel campaign examples that work",
    sub: "Three campaigns broken down channel by channel.",
    facts: [`${post.readingMinutes} min read`],
  });
}
