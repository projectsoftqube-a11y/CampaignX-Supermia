import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/config/pages/blog";
import { BLOG_CATEGORIES, absoluteUrl, routeList } from "@/config/routes";
import { siteConfig } from "@/config/site";

/**
 * Only pages marked `live` in the route registry are listed, so the sitemap
 * can never advertise a 404 (SEO audit issue #9).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = routeList
    .filter((route) => route.live)
    .map((route) => ({
      url: absoluteUrl(route.href, siteConfig.url),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));

  const categories = BLOG_CATEGORIES.map((category) => ({
    url: absoluteUrl(`/blog/category/${category.slug}`, siteConfig.url),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  /* Posts are not in the route registry — they live in the blog
     config — so they are added here. Each carries its own publish
     date rather than today's, which is what `lastModified` is for. */
  const posts = BLOG_POSTS.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`, siteConfig.url),
    lastModified: new Date(post.published),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...categories, ...posts];
}
