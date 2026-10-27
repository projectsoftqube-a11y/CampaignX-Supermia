import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { post } from "@/config/posts/brand-voice-guidelines";

export const alt = post.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrow: "Campaign Strategy",
    heading: "Brand voice guidelines people and AI can follow",
    sub: "Why examples beat adjectives, and what to write instead.",
    facts: [`${post.readingMinutes} min read`],
  });
}
