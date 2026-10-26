/**
 * JSON-LD for the whole site (SEO audit issue #10: no structured data found).
 *
 * The shapes follow the approved `schema.jsonld` files in the content
 * package. Entities are emitted into one `@graph` per page and cross-
 * referenced by `@id`, so the Organization and WebSite are described once
 * and pointed at from every page.
 *
 * Two rules that are easy to break later:
 *   - FAQPage markup belongs on /faq and nowhere else. Other pages may show
 *     a visible FAQ section, but must not mark it up.
 *   - Testimonials are never marked up as Review or AggregateRating while
 *     they are unverified (audit issue #2).
 */

import { siteConfig } from "@/config/site";

const ORG_ID = "https://supermia.ai/#organization";
const WEBSITE_ID = `${siteConfig.url}/#website`;
const SOFTWARE_ID = `${siteConfig.url}/#software`;
const VIDEO_ID = `${siteConfig.url}/#demo-video`;

/** The YouTube demo, from the Fact Sheet. */
export const DEMO_VIDEO = {
  id: "3FYQj_urQiw",
  name: "This AI Tool Creates and Schedules Your Social Media Campaign | SuperMIA",
  uploadDate: "2026-08-04",
} as const;

type Json = Record<string, unknown>;

export const organizationSchema: Json = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "SuperMIA",
  legalName: "Botfinity Inc.",
  url: "https://supermia.ai/",
  email: "hello@supermia.ai",
  logo: {
    "@type": "ImageObject",
    url: "https://supermia.ai/images/logo.svg",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "2451 W Grapevine Mills Cir #547",
    addressLocality: "Grapevine",
    addressRegion: "TX",
    postalCode: "76051",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.linkedin.com/showcase/mia-my-intelligent-assistant",
    "https://www.youtube.com/@MIAMyIntelligentAssistant",
    "https://twitter.com/supermia_ai",
  ],
};

export const websiteSchema: Json = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${siteConfig.url}/`,
  name: "CampaignX by SuperMIA",
  alternateName: ["CampaignX"],
  inLanguage: "en-US",
  publisher: { "@id": ORG_ID },
};

export const softwareSchema: Json = {
  "@type": "SoftwareApplication",
  "@id": SOFTWARE_ID,
  name: "CampaignX",
  url: `${siteConfig.url}/`,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "AI marketing agent",
  operatingSystem: "Web browser",
  description:
    "AI marketing agent that turns one brief into an on-brand campaign for Instagram, Facebook, LinkedIn, Google Business, X, email and SMS, with approval before anything is published and reporting on what worked.",
  featureList: [
    "One brief to a full campaign plan",
    "Brand voice model learned from your own material",
    "Content formatted for Instagram, Facebook, LinkedIn, Google Business, X, email and SMS",
    "Visuals matched to your brand",
    "Named approver before anything sends",
    "Publishing, scheduling and reporting",
    "Webhooks to other tools",
  ],
  image: `${siteConfig.url}/opengraph-image`,
  installUrl: siteConfig.appUrl,
  publisher: { "@id": ORG_ID },
  provider: { "@id": ORG_ID },
};

export const videoSchema: Json = {
  "@type": "VideoObject",
  "@id": VIDEO_ID,
  name: DEMO_VIDEO.name,
  description:
    "One campaign brief becomes platform-specific posts for LinkedIn, Facebook, Instagram and X, reviewed in one place and scheduled from there.",
  thumbnailUrl: `https://i.ytimg.com/vi/${DEMO_VIDEO.id}/maxresdefault.jpg`,
  uploadDate: DEMO_VIDEO.uploadDate,
  embedUrl: `https://www.youtube.com/embed/${DEMO_VIDEO.id}`,
  contentUrl: `https://www.youtube.com/watch?v=${DEMO_VIDEO.id}`,
  publisher: { "@id": ORG_ID },
};

export interface BreadcrumbStep {
  name: string;
  href: string;
}

/**
 * Breadcrumbs always start at Home. The current page is included as the last
 * item, which is what Google expects even though it is not a link.
 */
export function breadcrumbSchema(steps: readonly BreadcrumbStep[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", href: "/" }, ...steps].map(
      (step, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: step.name,
        item: `${siteConfig.url}${step.href === "/" ? "/" : step.href}`,
      }),
    ),
  };
}

export interface WebPageSchemaInput {
  path: string;
  name: string;
  description: string;
  /** ISO date, e.g. "2026-10-22". */
  dateModified?: string;
  /** Adds `video` pointing at the demo, and includes the VideoObject. */
  withVideo?: boolean;
}

export function webPageSchema({
  path,
  name,
  description,
  dateModified = "2026-10-26",
}: WebPageSchemaInput): Json {
  const url = path === "/" ? `${siteConfig.url}/` : `${siteConfig.url}${path}`;
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": SOFTWARE_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    dateModified,
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQPage markup. Only ever used on /faq. */
export function faqPageSchema(items: readonly FaqItem[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/**
 * Builds the page graph. Organization and WebSite are always present so any
 * page can be crawled standalone and still resolve its `@id` references.
 */
export function buildGraph(
  page: WebPageSchemaInput,
  extras: readonly Json[] = [],
): Json {
  const nodes: Json[] = [organizationSchema, websiteSchema, softwareSchema];

  if (page.withVideo) {
    nodes.push(videoSchema);
  }

  const webPage = webPageSchema(page);
  if (page.withVideo) {
    webPage.video = { "@id": VIDEO_ID };
    webPage.mainEntity = { "@id": SOFTWARE_ID };
  }
  nodes.push(webPage, ...extras);

  return { "@context": "https://schema.org", "@graph": nodes };
}
