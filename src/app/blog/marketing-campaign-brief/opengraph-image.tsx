import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { post } from "@/config/posts/marketing-campaign-brief";

export const alt = post.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Campaign Strategy",
    heading: "How to write a marketing campaign brief",
    sub: "Six questions, one page, and a template you can copy.",
    facts: ["Free template", `${post.readingMinutes} min read`],
  });
}
