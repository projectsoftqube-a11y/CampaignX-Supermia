import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { PageCta } from "@/components/page/PageCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqPanel } from "@/components/studio/FaqPanel";
import { StageExplorer } from "@/components/studio/StageExplorer";
import { PostDeck } from "@/components/studio/PostDeck";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { CHANNEL_LINKS, CHANNEL_PAGES } from "@/config/pages/channels";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";
import type { PlatformName } from "@/types/content";

const PAGE = CHANNEL_PAGES.social;
const PATH = ROUTES.social.href;

export const metadata = pageMetadata({
  title: PAGE.metaTitle,
  description: PAGE.description,
  path: PATH,
});

const schema = buildGraph(
  { path: PATH, name: PAGE.title, description: PAGE.description },
  [
    breadcrumbSchema([
      { name: "Channels", href: ROUTES.channelsIndex.href },
      { name: "Social Media", href: PATH },
    ]),
  ],
);

/**
 * The five surfaces, as a reference strip.
 *
 * `page.writes` carries the same six entries the old template rendered
 * as a card grid. Here the five social surfaces become a dense spec
 * table — what each one is, and the constraint it imposes — and the
 * sixth (webhooks) is handled separately below, since it is not a
 * social platform and reading as one was the old grid's mistake.
 */
const SURFACES: readonly {
  platform: PlatformName;
  name: string;
  format: string;
  note: string;
}[] = [
  {
    platform: "instagram",
    name: "Instagram",
    format: "Feed and story",
    note: "Captions written to carry the idea, with creative built for the frame rather than a landscape image cropped to fit.",
  },
  {
    platform: "facebook",
    name: "Facebook",
    format: "Link post",
    note: "The same campaign, written for how people read on Facebook instead of pasted from the LinkedIn version.",
  },
  {
    platform: "linkedin",
    name: "LinkedIn",
    format: "Text post",
    note: "A professional register that is still recognisably yours, rather than the same caption with the contractions removed.",
  },
  {
    platform: "x",
    name: "X",
    format: "Thread",
    note: "Copy that survives the character limit as a complete thought, not a sentence truncated at the boundary.",
  },
  {
    platform: "google",
    name: "Google Business",
    format: "Offer post",
    note: "Updates suited to a listing, where the reader is deciding whether to visit rather than scrolling a feed.",
  },
];


export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        {/* ------------------------------------------------------------
            Hero. Deliberately not the feature pages' inset card: this
            page leads with the artefact, so the brief sits at the top
            and the five posts it produced are the first thing read.
            ------------------------------------------------------------ */}
        {/* The header is fixed, so the hero has to clear it explicitly
            — the same `--header-offset` calc the other heroes use.
            Without it the first content sat underneath the nav. */}
        <section className="relative isolate overflow-x-clip bg-surface-soft pb-[clamp(2.5rem,4vw,3.5rem)] pt-[calc(var(--header-offset)+3.75rem)] sm:pt-[calc(var(--header-offset)+5rem)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="cx-dots absolute inset-0 opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent_75%)]" />
            <div className="absolute -top-[18%] left-1/2 h-[26rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(var(--brand-blue-rgb),0.12),transparent)]" />
          </div>

          <Container>
            {/* Copy left, artefact right. A centred column with the
                deck underneath left wide empty margins either side of
                both; side by side, each fills its half and the deck is
                visible without scrolling. */}
            <div className="grid min-w-0 items-center gap-10 [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
              <div>
                <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
                  <span className="bg-brand size-1.5 rounded-full" />
                  {PAGE.eyebrow}
                </span>

                <h1 className="text-display mt-5 text-[clamp(2rem,4.2vw,3.25rem)] font-medium leading-[1.04] tracking-[-0.035em]">
                  Five feeds. One brief.
                  <span className="block text-muted">
                    Five different posts.
                  </span>
                </h1>

                <p className="mt-5 max-w-[34rem] text-[1.0625rem] leading-[1.7] text-muted-strong">
                  {PAGE.intro}
                </p>

                {/* The highlights from the page data, as a spec strip.
                    These were previously dropped by this layout. */}
                <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6">
                  {PAGE.highlights.map((item, i) => (
                    <div key={item}>
                      <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </dt>
                      <dd className="mt-1 text-[0.875rem] font-medium leading-snug text-foreground">
                        {item}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  <Link
                    href={ROUTES.pricing.href}
                    className="bg-brand shadow-brand inline-flex h-11 items-center rounded-pill px-5 text-[0.9375rem] font-medium text-white transition-[box-shadow,transform,filter] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:brightness-[1.07] hover:shadow-brand-hover"
                  >
                    Get started
                  </Link>
                  <Link
                    href={ROUTES.multiChannel.href}
                    className="inline-flex h-11 items-center rounded-pill border border-line bg-surface px-5 text-[0.9375rem] text-muted-strong transition-colors duration-200 hover:border-accent-line hover:text-accent"
                  >
                    All seven channels
                  </Link>
                </div>
              </div>

              <PostDeck />
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            The surfaces, as a spec table rather than a card grid. A
            table is the right instrument here: the reader is comparing
            five things on the same two questions.
            ------------------------------------------------------------ */}
        <section className="relative py-[clamp(2.75rem,4.5vw,4rem)]">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-14">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <h2 className="text-display text-[clamp(1.625rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                  What each surface gets
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                  Publishing to five platforms is easy. Doing it without the
                  campaign reading as one message pasted five times is the
                  part most tools leave to you.
                </p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                  {PAGE.consistency.intro}
                </p>
              </div>

              <ul className="divide-y divide-line overflow-hidden rounded-frame border border-line bg-surface">
                {SURFACES.map((s) => (
                  <li
                    key={s.platform}
                    className="group flex gap-4 p-5 transition-colors duration-300 hover:bg-surface-soft sm:p-6"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[0.5rem] border border-line bg-surface-soft transition-colors duration-300 group-hover:border-accent-line group-hover:bg-accent-soft">
                      <BrandGlyph name={s.platform} className="size-[1.125rem]" />
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                        <h3 className="text-[1rem] font-medium leading-snug text-foreground">
                          {s.name}
                        </h3>
                        <span className="rounded-[0.25rem] bg-surface-soft px-1.5 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                          {s.format}
                        </span>
                      </div>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-strong">
                        {s.note}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            The gate. A single wide band rather than a segment, so the
            page changes rhythm here instead of repeating the layout
            above it.
            ------------------------------------------------------------ */}
        <section className="relative isolate overflow-x-clip bg-ink py-[clamp(3rem,5vw,4.5rem)] text-white">
          {/* The one dark band on the page. The gate is the turn in the
              argument — everything above is what gets made, everything
              below is detail — so it earns a change of ground rather
              than another light section in the run. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_10%_0%,rgba(var(--brand-blue-rgb),0.26),transparent_62%)]" />
            <div className="absolute inset-0 [background:radial-gradient(55%_55%_at_92%_100%,rgba(var(--brand-magenta-rgb),0.2),transparent_64%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(var(--brand-blue-rgb),0.5),rgba(var(--brand-magenta-rgb),0.35),transparent)]" />
          </div>

          <Container>
            <div className="max-w-[44rem]">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/50">
                Before anything posts
              </p>
              <h2 className="text-display mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
                {PAGE.publish.heading}
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-white/70">
                {PAGE.publish.intro}
              </p>
            </div>

            {/* The gate as a sequence, left to right: five drafts land,
                one person reads them, and only then does anything
                publish. Three stacked cards did not say that. */}
            <ol className="mt-10 grid gap-px overflow-hidden rounded-frame bg-white/10 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Five drafts land together",
                  body: "Instagram, Facebook, LinkedIn, X and Google Business arrive as one campaign, so you review the idea rather than five unrelated posts.",
                },
                {
                  step: "02",
                  title: "One named person reads them",
                  body: "Not a shared inbox. Approval is attached to a person and recorded against the campaign, so a week later it is still clear who agreed to what.",
                },
                {
                  step: "03",
                  title: "Nothing posts until they say so",
                  body: "No account is touched before sign-off. On approval the campaign publishes and schedules from one calendar.",
                },
              ].map((row) => (
                <li key={row.step} className="bg-ink-lift p-5 sm:p-6">
                  <span className="font-mono text-[0.6875rem] tabular-nums text-accent">
                    {row.step}
                  </span>
                  <h3 className="mt-2.5 text-[1rem] font-medium leading-snug text-white">
                    {row.title}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-white/60">
                    {row.body}
                  </p>
                </li>
              ))}
            </ol>

            {/* The corrections, as an inline row rather than cards. */}
            <div className="mt-8 flex flex-col gap-5 border-t border-white/12 pt-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                <span className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/50">
                  If something is wrong
                </span>
                {[
                  "Edit the caption",
                  "Regenerate one platform",
                  "Rewrite the brief",
                ].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 text-[0.875rem] text-white/80"
                  >
                    <span className="bg-brand size-1 shrink-0 rounded-full" />
                    {item}
                  </span>
                ))}
              </div>

              <Link
                href={ROUTES.approvals.href}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-pill border border-white/20 px-4 py-2 text-[0.875rem] font-medium text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/5"
              >
                How approvals work
              </Link>
            </div>
          </Container>
        </section>

        {/* The build, as four stages rather than an essay. */}
        <StageExplorer />

        <FaqPanel
          heading="Social campaigns, answered plainly"
          intro="The four that decide whether a team lets a campaign reach the publish step."
          items={PAGE.faqs}
          links={CHANNEL_LINKS}
          note="Email and SMS have their own channel pages, and webhooks carry the campaign to anything else in your stack."
        />

        <PageCta />
      </main>

      <Footer />
    </>
  );
}
