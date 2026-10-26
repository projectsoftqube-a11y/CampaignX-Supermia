import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageCta } from "@/components/page/PageCta";
import { PageFaq } from "@/components/page/PageFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import { ApprovalPanel } from "@/components/studio/ApprovalPanel";
import { ArtCardGrid } from "@/components/studio/ArtCardGrid";
import { InsetHero } from "@/components/studio/InsetHero";
import { Annotation, CompareTable, Segment } from "@/components/studio/Segment";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";

/* Title, meta and H1 are taken verbatim from the page's keyword brief,
   so the built page matches what was signed off in the content package. */
const TITLE = "Content Approval Workflow for Marketing Teams | CampaignX";
const DESCRIPTION =
  "In CampaignX nothing sends without a named approver. Edit any asset, regenerate one channel or rewrite the brief before you approve.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.approvals.href,
});

const schema = buildGraph(
  {
    path: ROUTES.approvals.href,
    name: "Content Approval Workflow: Nothing Ships Without Your Sign-Off",
    description: DESCRIPTION,
  },
  [
    breadcrumbSchema([
      { name: "Features", href: ROUTES.productIndex.href },
      { name: "Approvals", href: ROUTES.approvals.href },
    ]),
  ],
);

/* Segment 02: what a thread-based sign-off costs, against a named one. */
const APPROVAL_ROWS = [
  {
    label: "Who approved it",
    left: "Whoever replied last in the thread",
    right: "One named person, recorded against the campaign",
  },
  {
    label: "What was approved",
    left: "A caption pasted into a message",
    right: "The campaign as it will publish, creative included",
  },
  {
    label: "Fixing one line",
    left: "Another round trip, and a new thread",
    right: "Edit in place, or regenerate that channel alone",
  },
  {
    label: "Publishing",
    left: "Someone copies it across by hand",
    right: "Released on approval, to every connected channel",
  },
];

/* Segment 03: the three sizes of correction. */
const CORRECTION_CARDS = [
  {
    art: "instagram" as const,
    title: "Edit the asset",
    body: "Change a word, a line or a whole paragraph by hand. Nothing else in the campaign moves, and the other six channels keep the version you already read.",
    spec: "Smallest change · one asset",
  },
  {
    art: "sms" as const,
    title: "Regenerate one channel",
    body: "If the SMS misses but the emails are right, rebuild only the SMS. It is written again from the same brief and the same brand model, so it comes back in the same voice.",
    spec: "One channel · same brief",
  },
  {
    art: "webhook" as const,
    title: "Rewrite the brief",
    body: "When the direction itself is wrong, change the brief and run the campaign again. Every channel is rebuilt from the new version rather than patched from the old one.",
    spec: "Whole campaign · new brief",
  },
];

const FAQS = [
  {
    question: "What if the output is wrong?",
    answer:
      "Edit the asset, regenerate that one channel, or rewrite the brief and run the campaign again. Nothing has been published at that point, because nothing sends without a named approver.",
  },
  {
    question: "Can CampaignX post something we have not approved?",
    answer:
      "No. A named approver has to sign off before anything is published or scheduled, on every channel.",
  },
  {
    question: "How do approvals work for agencies with clients?",
    answer:
      "Each client brand has its own workspace and its own brand model, so the right person approves the right campaigns and one brand voice never reaches another.",
  },
  {
    question: "Is the approval step on every plan?",
    answer:
      "The full brand model with approvals is listed on the Team plan. Pricing sets out what each plan includes.",
  },
];

const TOTAL = 5;

/**
 * Approvals.
 *
 * Rebuilt on the same frame as Brand Voice: an inset hero, then five
 * numbered segments. The previous version used `PageShell` with a
 * `StoryBeat`, a `StatBand` and stock imagery, which read as a stack of
 * unrelated marketing bands rather than one argument.
 *
 * The argument here is narrow — one named person signs off, and a bad
 * line can be fixed three ways — so the page states it once in the
 * hero, plays it in segment 01, contrasts it in 02, and then spends the
 * rest of the page on the corrections and the agency case.
 */
export default function ApprovalsPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        <InsetHero
          tag="Approvals"
          title="Content Approval Workflow: *Nothing Ships* Without Your Sign-Off"
          intro="CampaignX has a content approval workflow built in. A named approver reviews the whole campaign — copy and creative, every channel — and nothing publishes until they say so."
          demoLabel="Watch the 2-minute demo"
          brief="Announce the partnership on Thursday morning."
          facts={[
            { label: "Approver", value: "A named person" },
            { label: "Without sign-off", value: "Nothing sends" },
            { label: "Corrections", value: "Edit, regenerate, rewrite" },
          ]}
        />

        {/* 01 — the gate itself. The panel carries the right column and
            plays the review; the copy beside it stays short. */}
        <Segment
          seg="01"
          label="The gate"
          step={1}
          total={TOTAL}
          tone="tint"
          heading="One named person has to say yes"
        >
          <div className="grid min-w-0 items-start gap-x-8 gap-y-5 [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <div>
              <p className="text-[1.125rem] leading-[1.65] text-foreground">
                Approval in most teams lives in a thread. Four people are in
                it, three of them replied, and none of them pressed publish.
              </p>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                CampaignX attaches sign-off to a person instead. The campaign
                waits until that person has read every asset, and anything
                they send back is rewritten before it can pass.
              </p>

              <ul className="mt-7 space-y-2.5">
                {[
                  "A named approver, not a shared inbox",
                  "Every channel reviewed in one pass",
                  "Copy and creative together, as they will publish",
                  "Nothing schedules until the last asset clears",
                ].map((item) => (
                  <li
                    key={item}
                    className="relative pl-5 text-[0.9375rem] leading-relaxed text-muted-strong before:absolute before:left-0 before:top-[0.6875rem] before:size-1.5 before:rounded-full before:bg-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-7 border-t border-line pt-5 text-[0.875rem] leading-relaxed text-muted">
                Approvals are part of the full brand model.{" "}
                <Link
                  href={ROUTES.pricing.href}
                  className="text-accent underline underline-offset-2"
                >
                  Pricing
                </Link>{" "}
                sets out what each plan includes.
              </p>
            </div>

            <ApprovalPanel />
          </div>
        </Segment>

        {/* 02 — the contrast, as a table rather than prose. */}
        <Segment
          seg="02"
          label="Side by side"
          step={2}
          total={TOTAL}
          heading="A thread, or a named approver"
        >
          {/* Left-aligned under a left-aligned heading. Centring the
              intro made the segment read as two different layouts
              stacked on top of each other. */}
          <p className="max-w-[46rem] text-[1.0625rem] leading-[1.7] text-muted-strong">
            The difference is not how long sign-off takes. It is whether, a
            week later, anyone can say who approved what.
          </p>

          <div className="mt-9 grid min-w-0 items-start gap-x-8 gap-y-5 [&>*]:min-w-0 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-12">
            {/* `tone="light"` on both: these default to `ink`, which is
                white text for a dark band. This segment is light, so
                the default rendered the table nearly invisible. */}
            <CompareTable
              tone="light"
              question="When something goes out"
              left="Sign-off in a thread"
              right="Sign-off in CampaignX"
              rows={APPROVAL_ROWS}
            />

            <Annotation tone="light" tag="Why it matters">
              <p>
                The cost of a thread is not the delay. It is that the record
                of who agreed to what disappears the moment the thread scrolls
                — so when something goes out wrong, the conversation starts
                with who, not with what to fix.
              </p>
              <p className="mt-3.5">
                A named approver on the campaign itself means that question is
                already answered.
              </p>
            </Annotation>
          </div>
        </Segment>

        {/* 03 — the three corrections. */}
        <Segment
          seg="03"
          label="Corrections"
          step={3}
          total={TOTAL}
          tone="warm"
          heading="Three sizes of|correction"
        >
          <p className="max-w-[52rem] text-[1.0625rem] leading-[1.7] text-muted-strong">
            A single bad line should not mean starting the campaign again. So
            there are three ways to fix one, and they differ only in how much
            of the campaign they touch.
          </p>

          <div className="mt-9">
            <ArtCardGrid kicker="" heading="" cards={CORRECTION_CARDS} bare />
          </div>
        </Segment>

        {/* 04 — agencies. */}
        <Segment
          seg="04"
          label="Agencies"
          step={4}
          total={TOTAL}
          heading="Several clients, several approvers"
        >
          <div className="grid min-w-0 items-start gap-x-8 gap-y-5 [&>*]:min-w-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <p className="text-[1.125rem] leading-[1.65] text-foreground">
                Running campaigns for several brands means several approvers,
                and no room for one client&apos;s content reaching another.
              </p>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                Each client brand gets its own workspace: its own brand model,
                built from that client&apos;s material, and its own approver.
                A campaign cannot be approved by someone outside the workspace
                it belongs to.
              </p>
            </div>

            <ul className="space-y-3">
              {[
                {
                  title: "A workspace per client",
                  body: "Separate brand models, separate campaigns, separate approvals.",
                  href: ROUTES.agencies.href,
                },
                {
                  title: "The brand voice stays put",
                  body: "Each workspace's model is built from that client's own material, and is never pooled with another's.",
                  href: ROUTES.brandVoice.href,
                },
                {
                  title: "Show the work before it ships",
                  body: "The approval view is the campaign as it will publish, not a summary of it.",
                },
              ].map((item) => {
                const body = (
                  <>
                    <span className="block text-[0.9375rem] font-medium leading-snug text-foreground">
                      {item.title}
                    </span>
                    <span className="mt-1.5 block text-[0.875rem] leading-relaxed text-muted-strong">
                      {item.body}
                    </span>
                  </>
                );
                return (
                  <li key={item.title}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="block rounded-panel border border-line bg-surface p-4 transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:border-accent-line hover:shadow-soft"
                      >
                        {body}
                      </Link>
                    ) : (
                      <div className="rounded-panel border border-line bg-surface p-4">
                        {body}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Segment>

        {/* 05 — objections, in the same contained frame the other
            feature pages use. */}
        <Segment
          seg="05"
          label="Questions"
          step={5}
          total={TOTAL}
          tone="warm"
          heading="Approvals, answered plainly"
        >
          <div className="overflow-hidden rounded-frame border border-line bg-surface">
            <div className="grid lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
              <div className="flex flex-col justify-between gap-8 border-b border-line bg-surface-soft p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-9">
                <div>
                  <p className="text-[1.0625rem] leading-[1.7] text-muted-strong">
                    These four decide whether a team trusts the workflow
                    enough to let a campaign reach the publish step.
                  </p>

                  <ul className="mt-7 space-y-3">
                    {[
                      "Fixing output that came back wrong",
                      "Whether anything can publish unapproved",
                      "Approvals across several client brands",
                      "Which plans include the approval step",
                    ].map((topic, i) => (
                      <li
                        key={topic}
                        className="flex items-baseline gap-3 text-[0.875rem] leading-snug text-muted-strong"
                      >
                        <span className="text-display w-4 shrink-0 text-[0.75rem] tabular-nums text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-line pt-6">
                  <p className="text-[0.8125rem] leading-relaxed text-muted">
                    The{" "}
                    <Link
                      href={ROUTES.faq.href}
                      className="text-accent underline underline-offset-2"
                    >
                      FAQ page
                    </Link>{" "}
                    covers pricing, every channel and each processor.
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {[
                      { label: "Pricing", href: ROUTES.pricing.href },
                      { label: "Brand voice", href: ROUTES.brandVoice.href },
                      { label: "Channels", href: ROUTES.channelsIndex.href },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.8125rem] text-muted-strong transition-colors duration-200 hover:border-accent-line hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-8 lg:p-9">
                <PageFaq items={FAQS} />
              </div>
            </div>
          </div>
        </Segment>

        <PageCta />
      </main>

      <Footer />
    </>
  );
}
