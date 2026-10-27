import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { PageCta } from "@/components/page/PageCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { PostCardArt } from "@/components/studio/PostCardArt";
import { TopicArt, type TopicArtName } from "@/components/studio/TopicArt";
import { BLOG_POSTS, PLANNED_TOPICS } from "@/config/pages/blog";
import { BLOG_CATEGORIES, ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";

const TITLE = "CampaignX Blog: Campaign Strategy, Social, Email and SMS";
const DESCRIPTION =
  "Guides on writing campaign briefs, planning multi-channel campaigns, brand voice and running social, email and SMS from one plan.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.blog.href,
});

const schema = buildGraph(
  {
    path: ROUTES.blog.href,
    name: "CampaignX Blog",
    description: DESCRIPTION,
  },
  [breadcrumbSchema([{ name: "Blog", href: ROUTES.blog.href }])],
);

/** Category label for a post, for the card meta line. */
const CATEGORY_LABEL = new Map(
  BLOG_CATEGORIES.map((c) => [c.slug, c.label] as const),
);

function published(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * The blog hub.
 *
 * Posts lead. An earlier version of this page was built when nothing
 * was published, so it opened with "what the blog covers" and put the
 * articles last in small identical cards — which reads as a brochure
 * for a blog rather than the blog itself.
 *
 * Now the newest piece takes a full-width feature with its category
 * drawing, the rest run in a grid of equal cards, the three subjects
 * are a filter strip rather than a section, and what is still coming
 * sits at the foot where a returning reader will look for it.
 */
export default function BlogHubPage() {
  const [lead, ...rest] = BLOG_POSTS;
  const leadCategory = lead
    ? BLOG_CATEGORIES.find((c) => c.slug === lead.category)
    : undefined;

  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        {/* ------------------------------------------------------------
            Hero, with the subjects as a filter strip rather than a
            section of their own.
            ------------------------------------------------------------ */}
        <section className="relative isolate overflow-x-clip bg-surface-soft pb-[clamp(2rem,3.5vw,3rem)] pt-[calc(var(--header-offset)+3.75rem)] sm:pt-[calc(var(--header-offset)+5rem)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="cx-dots absolute inset-0 opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent_75%)]" />
            <div className="absolute -top-[18%] left-1/2 h-[26rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(var(--brand-blue-rgb),0.12),transparent)]" />
          </div>

          <Container>
            <div className="grid min-w-0 items-end gap-8 [&>*]:min-w-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
              <div>
                <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
                  <span className="bg-brand size-1.5 rounded-full" />
                  Blog
                </span>

                <h1 className="text-display mt-5 text-[clamp(2rem,4.2vw,3rem)] font-medium leading-[1.04] tracking-[-0.035em]">
                  Notes on campaigns
                  <span className="block text-muted">that actually ship</span>
                </h1>

                <p className="mt-5 max-w-[34rem] text-[1.0625rem] leading-[1.7] text-muted-strong">
                  {DESCRIPTION}
                </p>
              </div>

              {/* The three subjects, as a way in rather than a
                  section the reader has to scroll past. */}
              <nav aria-label="Categories">
                <p className="text-eyebrow border-b border-line pb-3">
                  Browse by subject
                </p>
                <ul className="mt-1">
                  {BLOG_CATEGORIES.map((category) => {
                    const count = BLOG_POSTS.filter(
                      (p) => p.category === category.slug,
                    ).length;
                    return (
                      <li key={category.slug}>
                        <Link
                          href={`/blog/category/${category.slug}`}
                          className="group flex items-baseline justify-between gap-4 border-b border-line py-3 transition-colors duration-200 hover:border-accent-line"
                        >
                          <span className="min-w-0">
                            <span className="flex items-center gap-1.5 text-[0.9375rem] font-medium text-foreground">
                              {category.label}
                              <ArrowUpRight
                                aria-hidden="true"
                                className="size-[0.875rem] shrink-0 text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                              />
                            </span>
                            <span className="mt-0.5 block text-[0.875rem] leading-snug text-muted">
                              {category.description}
                            </span>
                          </span>
                          <span className="shrink-0 font-mono text-[0.875rem] tabular-nums text-muted/70">
                            {String(count).padStart(2, "0")}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            The newest post, given the room it deserves.
            ------------------------------------------------------------ */}
        {lead ? (
          <section className="relative py-[clamp(2.5rem,4vw,3.5rem)]">
            <Container>
              <Link
                href={`/blog/${lead.slug}`}
                className="group grid min-w-0 overflow-hidden rounded-frame border border-line bg-surface transition-[border-color,box-shadow] duration-300 ease-[var(--ease-out-soft)] [&>*]:min-w-0 hover:border-accent-line hover:shadow-float lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]"
              >
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="text-eyebrow text-accent">Latest</span>
                    <span className="font-mono text-[0.875rem] uppercase tracking-[0.08em] text-muted">
                      {CATEGORY_LABEL.get(lead.category)} ·{" "}
                      {lead.readingMinutes} min read
                    </span>
                  </div>

                  <h2 className="text-display mt-4 text-[clamp(1.5rem,2.8vw,2.125rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                    {lead.title}
                  </h2>

                  <p className="mt-4 max-w-[36rem] text-[1.0625rem] leading-[1.7] text-muted-strong">
                    {lead.standfirst}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-accent">
                    Read the piece
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>

                {leadCategory ? (
                  <div className="relative order-first overflow-hidden border-b border-line bg-[linear-gradient(170deg,var(--surface-soft),var(--surface))] px-6 py-7 lg:order-none lg:border-b-0 lg:border-l">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-[0.6] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(70%_70%_at_50%_45%,#000,transparent_78%)]"
                    />
                    <TopicArt
                      name={leadCategory.slug as TopicArtName}
                      className="relative transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : null}
              </Link>
            </Container>
          </section>
        ) : null}

        {/* ------------------------------------------------------------
            Everything else.
            ------------------------------------------------------------ */}
        {rest.length > 0 ? (
          <section className="relative bg-surface-soft py-[clamp(2.5rem,4vw,3.5rem)]">
            <Container>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h2 className="text-display text-[clamp(1.625rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                  More from the blog
                </h2>
                <p className="text-[0.9375rem] text-muted">
                  {BLOG_POSTS.length} pieces published
                </p>
              </div>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-frame border border-line bg-surface transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-accent-line hover:shadow-float"
                    >
                      {/* The drawing. One per post rather than one per
                          category, so six cards are six pictures. */}
                      <PostCardArt
                        name={post.art}
                        className="overflow-hidden border-b border-line bg-[linear-gradient(170deg,var(--surface-soft),var(--surface))] px-5 py-4 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
                      />

                      <div className="flex flex-1 flex-col p-5">
                        <span className="font-mono text-[0.875rem] uppercase tracking-[0.08em] text-muted">
                          {CATEGORY_LABEL.get(post.category)}
                        </span>

                        <h3 className="text-display mt-2.5 flex items-start gap-1.5 text-[1.0625rem] font-medium leading-snug tracking-[-0.015em]">
                          <span className="min-w-0">{post.title}</span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="mt-1 size-4 shrink-0 text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                          />
                        </h3>

                        <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-muted-strong">
                          {post.excerpt}
                        </p>

                        <p className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-3.5 font-mono text-[0.875rem] uppercase tracking-[0.08em] text-muted/70">
                          <span>{published(post.published)}</span>
                          <span>{post.readingMinutes} min</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

        {/* ------------------------------------------------------------
            What is still coming. A short row at the foot, where a
            returning reader looks — not a section competing with the
            posts that exist.
            ------------------------------------------------------------ */}
        {PLANNED_TOPICS.length > 0 ? (
          <section className="relative py-[clamp(2.5rem,4vw,3.5rem)]">
            <Container>
              <div className="rounded-frame border border-dashed border-line-strong p-6 sm:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5">
                  <h2 className="text-display text-[1.25rem] font-medium leading-snug tracking-[-0.02em]">
                    Being written next
                  </h2>
                  <p className="font-mono text-[0.875rem] uppercase tracking-[0.08em] text-muted/70">
                    {PLANNED_TOPICS.length} planned
                  </p>
                </div>

                <ul className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                  {PLANNED_TOPICS.map((topic) => (
                    <li
                      key={topic.title}
                      className="border-t border-line pt-3.5"
                    >
                      <p className="text-[0.9375rem] font-medium leading-snug text-foreground">
                        {topic.title}
                      </p>
                      <p className="mt-1 text-[0.875rem] leading-snug text-muted">
                        {topic.summary}
                      </p>
                      <p className="mt-2 font-mono text-[0.875rem] uppercase tracking-[0.08em] text-muted/60">
                        {CATEGORY_LABEL.get(topic.category)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Container>
          </section>
        ) : null}

        <PageCta />
      </main>

      <Footer />
    </>
  );
}
