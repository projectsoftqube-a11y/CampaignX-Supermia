import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { PageCta } from "@/components/page/PageCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { PostCardArt } from "@/components/studio/PostCardArt";
import { TopicArt, type TopicArtName } from "@/components/studio/TopicArt";
import {
  BLOG_POSTS,
  PLANNED_TOPICS,
  postsInCategory,
} from "@/config/pages/blog";
import { BLOG_CATEGORIES, ROUTES, type BlogCategorySlug } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";

interface Params {
  params: Promise<{ slug: string }>;
}

/* Only the three known categories are generated. `dynamicParams = false`
   makes any other slug a 404 rather than an on-demand page, so the blog
   cannot accumulate thin URLs from mistyped links. */
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({ slug: category.slug }));
}

function findCategory(slug: string) {
  return BLOG_CATEGORIES.find((category) => category.slug === slug);
}

function published(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const category = findCategory(slug);
  if (!category) return {};

  return pageMetadata({
    title: `${category.label} | CampaignX Blog`,
    description: `${category.description} Guides and examples from the CampaignX blog.`,
    path: `/blog/category/${category.slug}`,
  });
}

/**
 * One blog category.
 *
 * This was built out of the generic `PageShell` and `FeatureGrid`
 * primitives, which gave a bare heading, a stray product CTA and a
 * single card stranded in a three-column grid — a stub next to the
 * hub it is reached from.
 *
 * It now carries the category's own drawing, states what the subject
 * covers, and sizes the post grid to how many posts there actually
 * are, so one post reads as one post rather than as two missing ones.
 * The other two categories sit at the foot as a way onward.
 */
export default async function BlogCategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = findCategory(slug);
  if (!category) notFound();

  const posts = postsInCategory(category.slug as BlogCategorySlug);
  const planned = PLANNED_TOPICS.filter((t) => t.category === category.slug);
  const others = BLOG_CATEGORIES.filter((c) => c.slug !== category.slug);
  const path = `/blog/category/${category.slug}`;
  const description = `${category.description} Guides and examples from the CampaignX blog.`;

  const schema = buildGraph(
    { path, name: `${category.label} | CampaignX Blog`, description },
    [
      breadcrumbSchema([
        { name: "Blog", href: ROUTES.blog.href },
        { name: category.label, href: path },
      ]),
    ],
  );

  /* One post in a three-column grid reads as two missing ones. */
  const gridCols =
    posts.length === 1
      ? "sm:grid-cols-1"
      : posts.length === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        {/* ------------------------------------------------------------
            Masthead, carrying the category's own drawing.
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
            <div className="grid min-w-0 items-center gap-10 [&>*]:min-w-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
              <div>
                <Link
                  href={ROUTES.blog.href}
                  className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted transition-colors duration-200 hover:border-accent-line hover:text-accent"
                >
                  <span className="bg-brand size-1.5 rounded-full" />
                  All posts
                </Link>

                <h1 className="text-display mt-5 text-[clamp(1.875rem,4vw,2.875rem)] font-medium leading-[1.05] tracking-[-0.035em]">
                  {category.label}
                </h1>

                <p className="mt-5 max-w-[34rem] text-[1.0625rem] leading-[1.7] text-muted-strong">
                  {category.description}
                </p>

                <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 font-mono text-[0.875rem] uppercase tracking-[0.08em] text-muted">
                  <span>
                    {posts.length} published
                  </span>
                  {planned.length > 0 ? (
                    <span>{planned.length} planned</span>
                  ) : null}
                </p>
              </div>

              <div className="relative overflow-hidden rounded-frame border border-line bg-[linear-gradient(170deg,var(--surface-soft),var(--surface))] px-5 pb-4 pt-5">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.6] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(70%_70%_at_50%_45%,#000,transparent_78%)]"
                />
                <TopicArt
                  name={category.slug as TopicArtName}
                  className="relative"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            What the subject is, answered directly.

            A category page that is three cards and a one-line
            description is thin for a reader and gives an answer engine
            nothing to quote. The answer is stated in one paragraph that
            stands on its own, followed by what the subject actually
            covers.
            ------------------------------------------------------------ */}
        <section className="relative pt-[clamp(2.5rem,4vw,3.5rem)]">
          <Container>
            <div className="grid min-w-0 gap-8 [&>*]:min-w-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
              <div>
                <h2 className="text-display text-[clamp(1.375rem,2.4vw,1.75rem)] font-medium leading-[1.15] tracking-[-0.025em]">
                  What {category.label.toLowerCase()} means here
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-foreground">
                  {category.answer}
                </p>
              </div>

              <div>
                <p className="text-eyebrow border-b border-line pb-3">
                  What this covers
                </p>
                <ul className="mt-1">
                  {category.covers.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 border-b border-line py-3 text-[0.9375rem] leading-relaxed text-muted-strong"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.5rem] size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            The posts.
            ------------------------------------------------------------ */}
        {posts.length > 0 ? (
          <section className="relative py-[clamp(2.5rem,4vw,3.5rem)]">
            <Container>
              <h2 className="text-display text-[clamp(1.625rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                {posts.length === 1
                  ? "The piece in this subject"
                  : `Posts in ${category.label}`}
              </h2>

              <ul className={`mt-8 grid gap-4 ${gridCols}`}>
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-frame border border-line bg-surface transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-accent-line hover:shadow-float"
                    >
                      <PostCardArt
                        name={post.art}
                        className="overflow-hidden border-b border-line bg-[linear-gradient(170deg,var(--surface-soft),var(--surface))] px-5 py-4 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
                      />

                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-display flex items-start gap-1.5 text-[1.0625rem] font-medium leading-snug tracking-[-0.015em]">
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
            What is coming in this subject.
            ------------------------------------------------------------ */}
        {planned.length > 0 ? (
          <section className="relative pb-[clamp(2.5rem,4vw,3.5rem)]">
            <Container>
              <div className="rounded-frame border border-dashed border-line-strong p-6 sm:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5">
                  <h2 className="text-display text-[1.25rem] font-medium leading-snug tracking-[-0.02em]">
                    Being written next
                  </h2>
                  <p className="font-mono text-[0.875rem] uppercase tracking-[0.08em] text-muted/70">
                    {planned.length} planned
                  </p>
                </div>

                <ul className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                  {planned.map((topic) => (
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
                    </li>
                  ))}
                </ul>
              </div>
            </Container>
          </section>
        ) : null}

        {/* ------------------------------------------------------------
            The other subjects, as a way onward rather than a dead end.
            ------------------------------------------------------------ */}
        <section className="relative bg-surface-soft py-[clamp(2.5rem,4vw,3.5rem)]">
          <Container>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h2 className="text-display text-[clamp(1.5rem,2.6vw,1.875rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                The other subjects
              </h2>
              <Link
                href={ROUTES.blog.href}
                className="inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-accent transition-colors duration-200 hover:text-accent-hover"
              >
                All {BLOG_POSTS.length} posts
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </div>

            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {others.map((other) => {
                const count = postsInCategory(
                  other.slug as BlogCategorySlug,
                ).length;
                return (
                  <li key={other.slug}>
                    <Link
                      href={`/blog/category/${other.slug}`}
                      className="group flex h-full items-start gap-5 overflow-hidden rounded-frame border border-line bg-surface p-5 transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-accent-line hover:shadow-float"
                    >
                      <div className="min-w-0 flex-1">
                        <h3 className="text-display flex items-center gap-1.5 text-[1.0625rem] font-medium leading-snug tracking-[-0.015em]">
                          {other.label}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-4 shrink-0 text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                          />
                        </h3>
                        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-strong">
                          {other.description}
                        </p>
                        <p className="mt-3 font-mono text-[0.875rem] uppercase tracking-[0.08em] text-muted/70">
                          {count} published
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>

        <PageCta />
      </main>

      <Footer />
    </>
  );
}
