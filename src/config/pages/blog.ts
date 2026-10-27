import type { PostArtName } from "@/components/studio/PostCardArt";
import type { BlogCategorySlug } from "@/config/routes";
import { post as campaignBrief } from "@/config/posts/marketing-campaign-brief";
import { post as brandVoice } from "@/config/posts/brand-voice-guidelines";
import { post as multiChannel } from "@/config/posts/multi-channel-campaign-examples";
import { post as socialPlan } from "@/config/posts/social-media-campaign-plan";
import { post as smsExamples } from "@/config/posts/sms-marketing-examples";
import { post as aiTools } from "@/config/posts/ai-marketing-tools-small-business";

/**
 * Blog posts.
 *
 * The six planned posts exist as keyword briefs in the content package but
 * have not been written yet, so none are listed here. The hub and category
 * pages read this list and show an honest empty state rather than
 * placeholder cards for articles that do not exist.
 *
 * To publish a post: add an entry here and create the route at
 * `/blog/<slug>`. The hub, the category page and the sitemap pick it up.
 */

/** One block of a post body. */
export type BlogBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "list"; items: readonly string[] }
  | { kind: "steps"; items: readonly { title: string; body: string }[] }
  /** A boxed template or example the reader can copy. */
  | { kind: "template"; label: string; lines: readonly string[] }
  /** A pulled-out caution or clarification. */
  | { kind: "note"; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  /** The <title> tag, from the keyword brief. */
  metaTitle: string;
  /** The meta description, from the keyword brief. */
  description: string;
  excerpt: string;
  category: BlogCategorySlug;
  /** Which card drawing this post carries in the hub grid. */
  art: PostArtName;
  /** ISO date. */
  published: string;
  readingMinutes: number;
  /** One-line answer up top, before the body. */
  standfirst: string;
  body: readonly BlogBlock[];
  /** Internal links the brief asks this post to carry. */
  related: readonly { label: string; href: string }[];
}

/* Newest first. The hub, the category pages and the sitemap all
   read this list. */
export const BLOG_POSTS: readonly BlogPost[] = [
  campaignBrief,
  brandVoice,
  multiChannel,
  socialPlan,
  smsExamples,
  aiTools,
];

export function postsInCategory(slug: BlogCategorySlug): readonly BlogPost[] {
  return BLOG_POSTS.filter((post) => post.category === slug);
}

/**
 * The planned editorial line-up, shown as "what is coming".
 *
 * Each topic carries a line on what the piece will actually cover.
 * Four of the six came from the keyword briefs in the content
 * package; social and the direct channels had one each, which left
 * two of the three category cards almost empty and implied the blog
 * only really covers strategy. The two added here are marked, and
 * both are subjects the product pages already argue in depth.
 */
export const PLANNED_TOPICS: readonly {
  title: string;
  category: BlogCategorySlug;
  /** One line on what the piece covers. */
  summary: string;
}[] = [
  /* Added to balance the line-up. */
  {
    title: "Writing for five feeds without repeating yourself",
    category: "social-media",
    summary:
      "How the same announcement should differ between Instagram and LinkedIn.",
  },
  /* Added to balance the line-up. */
  {
    title: "Subject lines and preview text as a pair",
    category: "email-sms",
    summary:
      "Why the preview is the second half of the subject, not a spare field.",
  },
];
