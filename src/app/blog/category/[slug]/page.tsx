import { notFound } from "next/navigation";
import Link from "next/link";
import { FeatureGrid } from "@/components/page/FeatureGrid";
import { PageSection } from "@/components/page/PageSection";
import { PageShell } from "@/components/page/PageShell";
import { PLANNED_TOPICS, postsInCategory } from "@/config/pages/blog";
import { BLOG_CATEGORIES, ROUTES, type BlogCategorySlug } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";

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

export default async function BlogCategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = findCategory(slug);
  if (!category) notFound();

  const posts = postsInCategory(category.slug as BlogCategorySlug);
  const planned = PLANNED_TOPICS.filter((t) => t.category === category.slug);
  const path = `/blog/category/${category.slug}`;

  return (
    <PageShell
      path={path}
      description={`${category.description} Guides and examples from the CampaignX blog.`}
      eyebrow="Blog"
      title={category.label}
      intro={category.description}
      breadcrumbs={[
        { name: "Blog", href: ROUTES.blog.href },
        { name: category.label, href: path },
      ]}
    >
      {posts.length > 0 ? (
        <PageSection heading={`Posts in ${category.label}`} eyebrow="Articles">
          <FeatureGrid
            items={posts.map((post) => ({
              kicker: new Date(post.published).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              title: post.title,
              body: post.excerpt,
              href: `/blog/${post.slug}`,
            }))}
          />
        </PageSection>
      ) : (
        <PageSection
          tone="warm"
          eyebrow="Coming soon"
          heading="Nothing published here yet"
          intro="These are the posts planned for this category."
        >
          {planned.length > 0 ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {planned.map((topic) => (
                <li
                  key={topic.title}
                  data-animate="reveal"
                  className="rounded-card border border-line bg-surface px-5 py-4 text-[0.9375rem]"
                >
                  {topic.title}
                </li>
              ))}
            </ul>
          ) : null}

          <p className="mt-8 text-[0.9375rem] text-muted-strong">
            In the meantime,{" "}
            <Link
              href={ROUTES.faq.href}
              className="text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
            >
              the FAQ
            </Link>{" "}
            covers how CampaignX works.
          </p>
        </PageSection>
      )}
    </PageShell>
  );
}
