import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { PageCta } from "@/components/page/PageCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { TopicArt, type TopicArtName } from "@/components/studio/TopicArt";
import type { BlogBlock, BlogPost } from "@/config/pages/blog";
import { BLOG_CATEGORIES, ROUTES } from "@/config/routes";
import { blogPostingSchema, breadcrumbSchema, buildGraph } from "@/lib/schema";

/**
 * One blog post.
 *
 * The body is structured data rather than HTML, so a post cannot
 * carry arbitrary markup and every piece renders to the same scale.
 * That also means the reading measure, heading sizes and the spacing
 * between blocks are decided once here instead of per post.
 */

/** Stable anchor id from a heading, for the contents rail. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.kind) {
    case "h2":
      return (
        <h2
          id={slugify(block.text)}
          className="text-display mt-12 max-w-[42rem] scroll-mt-28 border-t border-line pt-7 text-[clamp(1.5rem,2.6vw,1.875rem)] font-medium leading-snug tracking-[-0.025em] first:mt-0 first:border-0 first:pt-0"
        >
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3 className="text-display mt-8 max-w-[42rem] text-[1.125rem] font-medium leading-snug">
          {block.text}
        </h3>
      );

    case "p":
      return (
        <p className="mt-4 max-w-[42rem] text-[1.0625rem] leading-[1.75] text-muted-strong [h2+&]:mt-5 [h2+&]:text-foreground">
          {block.text}
        </p>
      );

    case "list":
      /* Two columns once there is room. A bulleted list set to the
         reading measure wastes half the column and makes the article
         scroll further than it needs to. */
      return (
        <ul className="mt-5 grid gap-x-10 gap-y-3 md:grid-cols-2">
          {block.items.map((item) => (
            <li
              key={item}
              className="relative pl-5 text-[1rem] leading-[1.7] text-muted-strong before:absolute before:left-0 before:top-[0.6875rem] before:size-1.5 before:rounded-full before:bg-accent"
            >
              {item}
            </li>
          ))}
        </ul>
      );

    case "steps":
      /* A card grid rather than a stack of full-width rows: the steps
         are peers, and laying them side by side says so while using
         the column the article actually has. */
      return (
        <ol className="mt-6 grid gap-3 sm:grid-cols-2">
          {block.items.map((item, i) => (
            <li
              key={item.title}
              className="rounded-frame border border-line bg-surface p-5 transition-colors duration-200 hover:border-accent-line"
            >
              <span className="font-mono text-[0.875rem] tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-[1.0625rem] font-medium leading-snug text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-[1rem] leading-[1.7] text-muted-strong">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      );

    case "template":
      /* A dark ground, so a template reads as something to copy
         rather than as more prose in a box. */
      return (
        <div className="bg-ink mt-7 overflow-hidden rounded-frame">
          <p className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 font-mono text-[0.875rem] uppercase tracking-[0.1em] text-white/50">
            <span className="bg-brand size-1.5 rounded-full" />
            {block.label}
          </p>
          <pre className="cx-scroll-slim overflow-x-auto px-4 py-4 font-mono text-[0.875rem] leading-[1.9] text-white/90">
            {block.lines.join("\n")}
          </pre>
        </div>
      );

    case "note":
      return (
        <p className="mt-6 max-w-[48rem] rounded-r-frame border-l-2 border-accent bg-accent-soft/30 px-5 py-4 text-[1rem] leading-[1.7] text-foreground">
          {block.text}
        </p>
      );
  }
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  const path = `/blog/${post.slug}`;
  const category = BLOG_CATEGORIES.find((c) => c.slug === post.category);

  const schema = buildGraph(
    { path, name: post.title, description: post.description },
    [
      breadcrumbSchema([
        { name: "Blog", href: ROUTES.blog.href },
        ...(category
          ? [
              {
                name: category.label,
                href: `/blog/category/${category.slug}`,
              },
            ]
          : []),
        { name: post.title, href: path },
      ]),
      blogPostingSchema({
        path,
        headline: post.title,
        description: post.description,
        published: post.published,
      }),
    ],
  );

  const headings = post.body
    .filter((b) => b.kind === "h2")
    .map((b) => (b as { kind: "h2"; text: string }).text);

  const published = new Date(post.published).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        {/* ------------------------------------------------------------
            Masthead.
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
                <div className="flex flex-wrap items-center gap-2.5">
                  {category ? (
                    <Link
                      href={`/blog/category/${category.slug}`}
                      className="rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.875rem] text-muted-strong transition-colors duration-200 hover:border-accent-line hover:text-accent"
                    >
                      {category.label}
                    </Link>
                  ) : null}
                  <span className="font-mono text-[0.875rem] uppercase tracking-[0.1em] text-muted">
                    {post.readingMinutes} min read
                  </span>
                </div>

                <h1 className="text-display mt-5 text-[clamp(1.875rem,3.8vw,2.75rem)] font-medium leading-[1.06] tracking-[-0.03em]">
                  {post.title}
                </h1>

                {/* The answer, before the article. Someone who reads
                    only this line should still leave with it. */}
                <p className="mt-5 text-[1.125rem] leading-[1.65] text-foreground">
                  {post.standfirst}
                </p>

                <p className="mt-5 border-t border-line pt-4 font-mono text-[0.875rem] uppercase tracking-[0.08em] text-muted">
                  Published {published}
                </p>
              </div>

              {category ? (
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
              ) : null}
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            The article.
            ------------------------------------------------------------ */}
        <section className="relative py-[clamp(2.5rem,4vw,3.5rem)]">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
              {/* Contents, on the left against the page edge. A rail
                  floated on the right of a centred column reads as
                  left over rather than placed. */}
              {headings.length > 1 ? (
                <nav
                  aria-label="On this page"
                  className="lg:sticky lg:top-28 lg:self-start"
                >
                  <p className="text-eyebrow border-b border-line pb-3">
                    On this page
                  </p>
                  <ol className="mt-3 space-y-px">
                    {headings.map((h, i) => (
                      <li key={h}>
                        <a
                          href={`#${slugify(h)}`}
                          className="flex gap-2.5 border-l-2 border-transparent py-2 pl-3 text-[0.875rem] leading-snug text-muted transition-colors duration-200 hover:border-accent hover:text-foreground"
                        >
                          <span className="shrink-0 font-mono text-[0.875rem] tabular-nums text-muted/60">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0">{h}</span>
                        </a>
                      </li>
                    ))}
                  </ol>

                  <p className="mt-6 border-t border-line pt-4 font-mono text-[0.875rem] uppercase tracking-[0.08em] text-muted">
                    {post.readingMinutes} min read
                  </p>
                </nav>
              ) : null}

              <div className="min-w-0">
                <article>
                  {post.body.map((block, i) => (
                    <Block key={`${block.kind}-${i}`} block={block} />
                  ))}
                </article>

                {/* Onward links the brief asks the post to carry. */}
                <div className="mt-12 border-t border-line pt-7">
                  <p className="text-eyebrow">Keep reading</p>
                  <ul className="mt-4 flex flex-wrap gap-2.5">
                    {post.related.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="inline-flex rounded-pill border border-line bg-surface px-4 py-2 text-[0.9375rem] text-muted-strong transition-colors duration-200 hover:border-accent-line hover:text-accent"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <PageCta />
      </main>

      <Footer />
    </>
  );
}
