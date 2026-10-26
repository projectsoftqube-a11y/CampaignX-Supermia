import type { BlogCategorySlug } from "@/config/routes";

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

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategorySlug;
  /** ISO date. */
  published: string;
  readingMinutes: number;
}

export const BLOG_POSTS: readonly BlogPost[] = [];

export function postsInCategory(slug: BlogCategorySlug): readonly BlogPost[] {
  return BLOG_POSTS.filter((post) => post.category === slug);
}

/** The planned editorial line-up, shown as "what is coming". */
export const PLANNED_TOPICS: readonly {
  title: string;
  category: BlogCategorySlug;
}[] = [
  { title: "How to write a marketing campaign brief", category: "campaign-strategy" },
  { title: "Multi-channel marketing campaign examples", category: "campaign-strategy" },
  { title: "Brand voice guidelines that actually get used", category: "campaign-strategy" },
  { title: "Building a social media campaign plan", category: "social-media" },
  { title: "SMS marketing examples worth copying", category: "email-sms" },
  { title: "AI marketing tools for small business", category: "campaign-strategy" },
];
