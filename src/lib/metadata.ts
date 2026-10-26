import type { Metadata } from "next";

interface PageMetaInput {
  /** The title tag from the page's keyword brief, used exactly as written. */
  title: string;
  description: string;
  /** Path with a leading slash; becomes the canonical. */
  path: string;
}

/**
 * Metadata for an inner page.
 *
 * The titles in the content package already end in "| CampaignX", so the
 * root layout's `%s | CampaignX` template would produce "… | CampaignX |
 * CampaignX". `absolute` opts out of the template and keeps the title the
 * length it was written and measured at.
 *
 * The canonical is a path. `metadataBase` in the root layout resolves it
 * against the site origin, which is what makes every page self-referencing
 * rather than pointing at the wrong domain (SEO audit issue #1).
 */
export function pageMetadata({
  title,
  description,
  path,
}: PageMetaInput): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
