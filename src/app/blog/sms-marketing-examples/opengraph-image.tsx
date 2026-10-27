import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { post } from "@/config/posts/sms-marketing-examples";

export const alt = post.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Email and SMS",
    heading: "SMS marketing examples, with templates",
    sub: "Eight templates, the real character budget, and timing.",
    facts: [`${post.readingMinutes} min read`],
  });
}
