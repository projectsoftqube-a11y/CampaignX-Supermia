import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { PageCta } from "@/components/page/PageCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { USE_CASE_PAGES } from "@/config/pages/use-cases";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";

const TITLE = "Who CampaignX Is For | CampaignX";
const DESCRIPTION =
  "CampaignX is built for small businesses, agencies, marketing teams and founders who need complete campaigns without assembling them by hand.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.useCasesIndex.href,
});

const schema = buildGraph(
  {
    path: ROUTES.useCasesIndex.href,
    name: "Built for the People Who Actually Ship the Campaign",
    description: DESCRIPTION,
  },
  [breadcrumbSchema([{ name: "Use Cases", href: ROUTES.useCasesIndex.href }])],
);

/**
 * The four audiences, each led by its own complaint.
 *
 * A hub's job is to get someone to the right page in one read, and
 * people recognise a problem faster than they recognise a label. So
 * each entry leads with that page's own tension — the line it opens
 * with — rather than with the audience name, and states the thing
 * that page argues about. The four arguments are genuinely different,
 * which is what makes the choice easy.
 */
const AUDIENCES = [
  {
    page: USE_CASE_PAGES.smallBusiness,
    href: ROUTES.smallBusiness.href,
    /** The one word this page is really about. */
    about: "Time",
    sounds: "You are the marketing department, between everything else.",
  },
  {
    page: USE_CASE_PAGES.agencies,
    href: ROUTES.agencies.href,
    about: "Separation",
    sounds: "Several client brands, and none of them may bleed together.",
  },
  {
    page: USE_CASE_PAGES.marketingTeams,
    href: ROUTES.marketingTeams.href,
    about: "Handoffs",
    sounds: "The work is fine. Moving it between four tools is not.",
  },
  {
    page: USE_CASE_PAGES.founders,
    href: ROUTES.founders.href,
    about: "Register",
    sounds: "No marketing hire yet, and generic drafts never ship.",
  },
] as const;

/** True whoever you are. */
const SHARED = [
  {
    term: "One brief is the input",
    detail:
      "A sentence about what you are promoting, who it is for and what you want them to do. Not a brief document, not a content calendar.",
  },
  {
    term: "Your voice, not a house style",
    detail:
      "The brand model is built from material you have already written, so the first draft starts in your register rather than a generic one.",
  },
  {
    term: "A named approver, always",
    detail:
      "Nothing publishes or schedules on any channel until a person signs off. That holds on every plan and for every audience on this page.",
  },
  {
    term: "Seven channels, one calendar",
    detail:
      "Social, email and SMS written together from the same brief, scheduled in one place, with webhooks for anything else in your stack.",
  },
];

export default function UseCasesIndexPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        {/* ------------------------------------------------------------
            Hero.
            ------------------------------------------------------------ */}
        <section className="relative isolate overflow-x-clip bg-surface-soft pb-[clamp(2.5rem,4vw,3.5rem)] pt-[calc(var(--header-offset)+3.75rem)] sm:pt-[calc(var(--header-offset)+5rem)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="cx-dots absolute inset-0 opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent_75%)]" />
            <div className="absolute -top-[18%] left-1/2 h-[26rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(var(--brand-blue-rgb),0.12),transparent)]" />
          </div>

          <Container>
            <div className="mx-auto max-w-[46rem] text-center">
              <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
                <span className="bg-brand size-1.5 rounded-full" />
                Use Cases
              </span>

              <h1 className="text-display mt-5 text-[clamp(2rem,4.4vw,3.25rem)] font-medium leading-[1.04] tracking-[-0.035em]">
                Same product.
                <span className="block text-muted">
                  Four different problems.
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-[40rem] text-[1.0625rem] leading-[1.7] text-muted-strong">
                Whether that is a founder between two other jobs, an
                agency running five brands, or a team losing days to
                handoffs — the input is the same sentence, and the output
                is a campaign you approve.
              </p>
            </div>

            {/* The four, led by their own complaint. */}
            <ul className="mt-10 grid gap-3 lg:grid-cols-2">
              {AUDIENCES.map(({ page, href, about, sounds }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex h-full flex-col rounded-frame border border-line bg-surface p-5 transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:border-accent-line hover:shadow-float sm:p-6"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="rounded-[0.25rem] bg-accent-soft px-2 py-0.5 font-mono text-[0.875rem] uppercase tracking-[0.06em] text-accent">
                        {page.eyebrow}
                      </span>
                      <span className="font-mono text-[0.875rem] uppercase tracking-[0.1em] text-muted">
                        {about}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="ml-auto size-4 shrink-0 text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </div>

                    {/* The page's own opening line: people recognise a
                        problem faster than an audience label. */}
                    <h2 className="text-display mt-4 text-[clamp(1.25rem,2.2vw,1.5rem)] font-medium leading-[1.15] tracking-[-0.02em]">
                      {page.story.tension.heading}
                    </h2>

                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-strong">
                      {sounds}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4">
                      {page.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-center gap-2 text-[0.875rem] text-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="bg-brand size-1 shrink-0 rounded-full"
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            What holds whoever you are.
            ------------------------------------------------------------ */}
        <section className="relative isolate overflow-x-clip bg-ink py-[clamp(3rem,5vw,4.5rem)] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_8%_0%,rgba(var(--brand-blue-rgb),0.26),transparent_62%)]" />
            <div className="absolute inset-0 [background:radial-gradient(55%_55%_at_94%_100%,rgba(var(--brand-magenta-rgb),0.2),transparent_64%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(var(--brand-blue-rgb),0.5),rgba(var(--brand-magenta-rgb),0.35),transparent)]" />
          </div>

          <Container>
            <div className="max-w-[44rem]">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/50">
                What they share
              </p>
              <h2 className="text-display mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
                The assembly is the part that gets automated
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-white/70">
                Nobody here is short of ideas. They are short of the
                hours between an idea and seven channels of finished,
                on-brand, approved work.
              </p>
            </div>

            <ol className="mt-9 grid gap-px overflow-hidden rounded-frame bg-white/10 sm:grid-cols-2">
              {SHARED.map((row, i) => (
                <li key={row.term} className="bg-ink-lift p-5 sm:p-6">
                  <span className="font-mono text-[0.875rem] tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2.5 text-[1rem] font-medium leading-snug text-white">
                    {row.term}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-white/60">
                    {row.detail}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            What differs, as a table. The index's second job is to say
            why the four pages are not the same page.
            ------------------------------------------------------------ */}
        <section className="relative py-[clamp(2.75rem,4.5vw,4rem)]">
          <Container>
            <div className="grid gap-9 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <p className="text-eyebrow">What differs</p>
                <h2 className="text-display mt-3 text-[clamp(1.625rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                  Four pages, four arguments
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                  The product does not change between them. What changes
                  is which part of it matters most, which is why each
                  page makes a different case rather than repeating the
                  same one four times.
                </p>
              </div>

              <dl className="divide-y divide-line overflow-hidden rounded-frame border border-line bg-surface">
                {AUDIENCES.map(({ page, href, about }) => (
                  <div
                    key={href}
                    className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5 p-5 sm:p-6"
                  >
                    <dt className="w-[9rem] shrink-0 text-[0.9375rem] font-medium text-foreground">
                      {page.eyebrow}
                    </dt>
                    <dd className="min-w-0 flex-1 text-[0.9375rem] leading-relaxed text-muted-strong">
                      <span className="text-accent">{about}.</span>{" "}
                      {page.problem.intro}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </section>

        <PageCta />
      </main>

      <Footer />
    </>
  );
}
