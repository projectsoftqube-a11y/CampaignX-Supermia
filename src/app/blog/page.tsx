import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { PageCta } from "@/components/page/PageCta";
import { JsonLd } from "@/components/seo/JsonLd";
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

/**
 * The blog hub.
 *
 * No posts are written yet. The honest version of this page is not a
 * grid of grey placeholder cards for articles that do not exist — it
 * is the three subjects the blog will cover, drawn rather than
 * photographed, with the planned pieces listed under each so a reader
 * can see whether it is worth coming back.
 *
 * Each category gets its own animated drawing from `TopicArt`, built
 * on the same conventions as the channel card art.
 */
export default function BlogHubPage() {
  const hasPosts = BLOG_POSTS.length > 0;

  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        {/* ------------------------------------------------------------
            Hero.
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
            <div className="mx-auto max-w-[44rem] text-center">
              <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
                <span className="bg-brand size-1.5 rounded-full" />
                Blog
              </span>

              <h1 className="text-display mt-5 text-[clamp(2rem,4.2vw,3rem)] font-medium leading-[1.04] tracking-[-0.035em]">
                Notes on campaigns
                <span className="block text-muted">that actually ship</span>
              </h1>

              <p className="mx-auto mt-5 max-w-[38rem] text-[1.0625rem] leading-[1.7] text-muted-strong">
                {DESCRIPTION}
              </p>
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            The three subjects, each drawn.
            ------------------------------------------------------------ */}
        <section className="relative py-[clamp(2.5rem,4vw,3.5rem)]">
          <Container>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h2 className="text-display text-[clamp(1.625rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                What the blog covers
              </h2>
              <p className="text-[0.9375rem] text-muted">
                Three subjects, {PLANNED_TOPICS.length} pieces planned.
              </p>
            </div>

            <ul className="mt-8 grid gap-4 lg:grid-cols-3">
              {BLOG_CATEGORIES.map((category) => {
                const planned = PLANNED_TOPICS.filter(
                  (t) => t.category === category.slug,
                );
                return (
                  <li key={category.slug}>
                    <Link
                      href={`/blog/category/${category.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-frame border border-line bg-surface transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-accent-line hover:shadow-float"
                    >
                      {/* The drawing. */}
                      <div className="relative overflow-hidden bg-[linear-gradient(170deg,var(--surface-soft),var(--surface))] px-5 pb-4 pt-5">
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 opacity-[0.6] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(70%_70%_at_50%_45%,#000,transparent_78%)]"
                        />
                        <TopicArt
                          name={category.slug as TopicArtName}
                          className="relative transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="flex flex-1 flex-col border-t border-line p-5">
                        <h3 className="text-display flex items-center gap-1.5 text-[1.125rem] font-medium leading-snug tracking-[-0.015em]">
                          {category.label}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-4 shrink-0 text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                          />
                        </h3>

                        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-strong">
                          {category.description}
                        </p>

                        {/* What is coming, under the subject it
                            belongs to rather than in one flat list. */}
                        {planned.length > 0 ? (
                          <ul className="mt-4 flex-1 space-y-3.5 border-t border-line pt-4">
                            {planned.map((topic) => (
                              <li key={topic.title}>
                                <p className="text-[0.9375rem] font-medium leading-snug text-foreground">
                                  {topic.title}
                                </p>
                                <p className="mt-1 text-[0.875rem] leading-snug text-muted">
                                  {topic.summary}
                                </p>
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        <p className="mt-5 border-t border-line pt-3.5 font-mono text-[0.875rem] uppercase tracking-[0.08em] text-muted/70">
                          {planned.length} planned
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            Posts, or an honest empty state.
            ------------------------------------------------------------ */}
        {hasPosts ? (
          <section className="relative bg-surface-soft py-[clamp(2.5rem,4vw,3.5rem)]">
            <Container>
              <h2 className="text-display text-[clamp(1.625rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                Latest posts
              </h2>

              <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {BLOG_POSTS.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex h-full flex-col rounded-frame border border-line bg-surface p-5 transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:border-accent-line hover:shadow-float"
                    >
                      <span className="font-mono text-[0.875rem] uppercase tracking-[0.08em] text-muted">
                        {post.readingMinutes} min read
                      </span>
                      <h3 className="text-display mt-2 text-[1.0625rem] font-medium leading-snug">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-strong">
                        {post.excerpt}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : (
          /* No posts yet. Saying so plainly beats placeholder cards for
             articles that do not exist. */
          <section className="relative isolate overflow-x-clip bg-ink py-[clamp(2.75rem,4.5vw,4rem)] text-white">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_8%_0%,rgba(var(--brand-blue-rgb),0.26),transparent_62%)]" />
              <div className="absolute inset-0 [background:radial-gradient(55%_55%_at_94%_100%,rgba(var(--brand-magenta-rgb),0.2),transparent_64%)]" />
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(var(--brand-blue-rgb),0.5),rgba(var(--brand-magenta-rgb),0.35),transparent)]" />
            </div>

            <Container>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
                <div>
                  <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/50">
                    Not yet
                  </p>
                  <h2 className="text-display mt-3 text-[clamp(1.625rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white">
                    The first posts are being written
                  </h2>
                  <p className="mt-4 text-[1.0625rem] leading-[1.7] text-white/70">
                    Nothing is published yet, and putting up placeholder
                    articles to look busy would be the wrong start for a
                    blog about shipping real work. The subjects above are
                    what the first six pieces cover.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 lg:justify-end">
                  <Link
                    href={ROUTES.pricing.href}
                    className="bg-brand shadow-brand inline-flex h-11 items-center rounded-pill px-5 text-[0.9375rem] font-medium text-white transition-[box-shadow,transform,filter] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:brightness-[1.07] hover:shadow-brand-hover"
                  >
                    Start free in Beta
                  </Link>
                  <Link
                    href={ROUTES.faq.href}
                    className="inline-flex h-11 items-center rounded-pill border border-white/20 px-5 text-[0.9375rem] font-medium text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/5"
                  >
                    Read the FAQ instead
                  </Link>
                </div>
              </div>
            </Container>
          </section>
        )}

        <PageCta />
      </main>

      <Footer />
    </>
  );
}
