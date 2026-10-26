import Link from "next/link";
import { FeatureGrid } from "@/components/page/FeatureGrid";
import { PageSection } from "@/components/page/PageSection";
import { PageShell } from "@/components/page/PageShell";
import { BLOG_POSTS, PLANNED_TOPICS } from "@/config/pages/blog";
import { BLOG_CATEGORIES, ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";

const TITLE = "CampaignX Blog: Campaign Strategy, Social, Email and SMS";
const DESCRIPTION =
  "Guides on writing campaign briefs, planning multi-channel campaigns, brand voice and running social, email and SMS from one plan.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.blog.href,
});

export default function BlogHubPage() {
  const hasPosts = BLOG_POSTS.length > 0;

  return (
    <PageShell
      path={ROUTES.blog.href}
      description={DESCRIPTION}
      eyebrow="Blog"
      title="CampaignX Blog"
      intro="Practical guides on planning and running campaigns: briefs, brand voice, multi-channel planning, and what actually works on social, email and SMS."
      masthead={{
        index: "09",
        brief: "Write a campaign brief that actually produces a campaign.",
        facts: [
          { label: "Topics", value: "Strategy, social, direct" },
          { label: "Categories", value: "Three" },
          { label: "Written for", value: "People running campaigns" },
          { label: "Posts", value: "In progress" },
        ],
      }}
      breadcrumbs={[{ name: "Blog", href: ROUTES.blog.href }]}
    >
      <PageSection
        eyebrow="Categories"
        heading="Browse by topic"
        intro="Three categories, matching how campaigns are actually planned."
      >
        <FeatureGrid
          items={BLOG_CATEGORIES.map((category) => ({
            title: category.label,
            body: category.description,
            href: `/blog/category/${category.slug}`,
          }))}
        />
      </PageSection>

      {hasPosts ? (
        <PageSection eyebrow="Latest" heading="Latest posts">
          <FeatureGrid
            items={BLOG_POSTS.map((post) => ({
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
        /* No posts are written yet. Saying so plainly is better than
           placeholder cards that link nowhere. */
        <PageSection
          tone="warm"
          eyebrow="Coming soon"
          heading="The first posts are being written"
          intro="Here is what is planned. In the meantime, the FAQ answers most questions about how CampaignX works."
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {PLANNED_TOPICS.map((topic) => (
              <li
                key={topic.title}
                data-animate="reveal"
                className="rounded-card border border-line bg-surface px-5 py-4"
              >
                <p className="text-eyebrow text-muted">
                  {BLOG_CATEGORIES.find((c) => c.slug === topic.category)?.label}
                </p>
                <p className="mt-1.5 text-[0.9375rem] text-foreground">
                  {topic.title}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[0.9375rem] text-muted-strong">
            Looking for something specific?{" "}
            <Link
              href={ROUTES.faq.href}
              className="text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
            >
              Read the FAQ
            </Link>
            .
          </p>
        </PageSection>
      )}
    </PageShell>
  );
}
