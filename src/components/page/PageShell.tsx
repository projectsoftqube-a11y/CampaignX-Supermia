import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageCta } from "@/components/page/PageCta";
import { PageHero } from "@/components/page/PageHero";
import { PageOpening } from "@/components/studio/PageOpening";
import { buildGraph, breadcrumbSchema, type BreadcrumbStep } from "@/lib/schema";

interface PageShellProps {
  eyebrow: string;
  title: string;
  intro: string;
  /** Ancestors plus the current page. Home is added automatically. */
  breadcrumbs: readonly BreadcrumbStep[];
  highlights?: readonly string[];
  children: ReactNode;
  /** Page path, used for the canonical `@id` in the schema graph. */
  path: string;
  /** Meta description, reused as the WebPage description. */
  description: string;
  /** Extra JSON-LD nodes, e.g. FAQPage on /faq only. */
  schemaExtras?: readonly Record<string, unknown>[];
  cta?: { heading?: string; body?: string };
  /** Artwork beside the hero copy. Used only by the legacy hero. */
  heroMedia?: { src: string; alt: string };
  /**
   * The editorial masthead. Supply this and the page opens with
   * `CinematicHero` — a dark, full-bleed stage with a typed brief and
   * a landing deck of channel cards — instead of the plain hero.
   */
  masthead?: {
    index: string;
    brief: string;
    facts?: readonly { label: string; value: string }[];
    /** One word of the H1 set in the highlight face, as the homepage does. */
    highlight?: string;
  };
}

/**
 * The frame every inner page shares: header, hero, content, closing CTA,
 * footer, and one JSON-LD graph.
 *
 * Breadcrumbs are passed once and used twice — for the visible trail in the
 * hero and for the BreadcrumbList node in the graph — so the markup can
 * never describe a trail the page does not show.
 */
export function PageShell({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  highlights,
  children,
  path,
  description,
  schemaExtras = [],
  cta,
  heroMedia,
  masthead,
}: PageShellProps) {
  const schema = buildGraph(
    { path, name: title, description },
    [breadcrumbSchema(breadcrumbs), ...schemaExtras],
  );

  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        {masthead ? (
          <PageOpening
            kicker={eyebrow}
            title={title}
            highlight={masthead.highlight}
            intro={intro}
            brief={masthead.brief}
            facts={masthead.facts}
          />
        ) : (
          <PageHero
            eyebrow={eyebrow}
            title={title}
            intro={intro}
            breadcrumbs={breadcrumbs}
            highlights={highlights}
            media={heroMedia}
          />
        )}

        {children}

        <PageCta heading={cta?.heading} body={cta?.body} />
      </main>

      <Footer />
    </>
  );
}
