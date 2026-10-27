import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { postsInCategory } from "@/config/pages/blog";
import { BLOG_CATEGORIES, type BlogCategorySlug } from "@/config/routes";

export const alt = "CampaignX blog category";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/* The three categories are known at build time, so each card is
   generated once rather than rendered per request. */
export function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({ slug: category.slug }));
}

/**
 * Share card for a blog category.
 *
 * The category pages were the only indexable routes left without an
 * image of their own, so a shared link fell back to the site-wide
 * card and three different subjects looked identical in a feed.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = BLOG_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return ogCard({
      eyebrow: "Blog",
      heading: "Notes on campaigns that actually ship",
      sub: "How multi-channel campaigns get written, approved and published.",
    });
  }

  const count = postsInCategory(category.slug as BlogCategorySlug).length;

  return ogCard({
    eyebrow: "Blog",
    heading: category.label,
    sub: category.description,
    facts: [`${count} ${count === 1 ? "piece" : "pieces"} published`],
  });
}
