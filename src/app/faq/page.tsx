import Link from "next/link";
import { PageFaq } from "@/components/page/PageFaq";
import { PageSection } from "@/components/page/PageSection";
import { PageShell } from "@/components/page/PageShell";
import { ALL_FAQS, FAQ_GROUPS } from "@/config/pages/faq";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";
import { faqPageSchema } from "@/lib/schema";

const TITLE = "CampaignX FAQ: How It Works, Pricing and Your Data";
const DESCRIPTION =
  "CampaignX FAQ: which channels it publishes to, how it learns your brand voice, how approvals work, what Beta pricing includes and how your data is handled.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.faq.href,
});

/* The only FAQPage markup on the subdomain. Every answer it describes is
   rendered below in the HTML on first load, which is what the markup is
   allowed to claim. */
const faqSchema = faqPageSchema(ALL_FAQS);

export default function FaqPage() {
  return (
    <PageShell
      path={ROUTES.faq.href}
      description={DESCRIPTION}
      eyebrow="FAQ"
      title="CampaignX FAQ: Channels, Brand Voice, Approvals, Pricing and Data"
      intro="CampaignX is an AI marketing agent built by SuperMIA and operated by Botfinity Inc. This page answers how it works, what it never does and how your data is handled. Nothing ships without your approval."
      masthead={{
        index: "08",
        brief: "How does it work, and what happens to our data?",
        facts: [
          { label: "Channels", value: "Seven, plus webhooks" },
          { label: "Brand model", value: "About one afternoon" },
          { label: "Approval", value: "Always required" },
          { label: "Your data", value: "Not used to train" },
        ],
      }}
      breadcrumbs={[{ name: "FAQ", href: ROUTES.faq.href }]}
      schemaExtras={[faqSchema]}
    >
      {/* Jump list. The content doc asks for anchor links to the six
          groups, so a long page can be navigated rather than scrolled. */}
      <section className="border-y border-line bg-surface-soft py-6">
        <div className="mx-auto w-full max-w-[var(--container-max)] px-5 sm:px-8 lg:px-12">
          <nav aria-label="Jump to a section">
            <ul className="flex flex-wrap gap-2">
              {FAQ_GROUPS.map((group) => (
                <li key={group.id}>
                  <Link
                    href={`#${group.id}`}
                    className="inline-flex rounded-pill border border-line bg-surface px-3.5 py-1.5 text-[0.8125rem] text-muted-strong transition-colors duration-200 hover:border-line-strong hover:text-foreground"
                  >
                    {group.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {FAQ_GROUPS.map((group, index) => (
        <PageSection
          key={group.id}
          id={group.id}
          heading={group.title}
          intro={group.intro}
          eyebrow={`0${index + 1}`}
          tone={index % 2 === 1 ? "warm" : "default"}
        >
          <PageFaq items={group.items} />
        </PageSection>
      ))}
    </PageShell>
  );
}
