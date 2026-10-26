import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * robots.txt returned a 4xx to crawlers before this route existed
 * (SEO audit issue #9).
 *
 * The app on app.campaignx.supermia.ai is deliberately not blocked here:
 * a Disallow would stop crawlers reading it but not stop it being indexed
 * from inbound links. That host serves `X-Robots-Tag: noindex, nofollow`
 * instead (audit issue #4), which is a separate deployment task.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
