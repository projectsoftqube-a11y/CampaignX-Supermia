"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";
import { cn } from "@/lib/utils";

/**
 * The build, as four stages you step through.
 *
 * This copy kept being set as an article — a column of paragraphs with
 * headings, then the same thing with a contents rail, then the same
 * thing with drop caps. Every version read as a blog post, because
 * every version was one.
 *
 * The content is not really an essay. It is four stages of a pipeline
 * — plan, write, voice, publish — each with a hard fact buried in the
 * prose and one of them carrying a per-platform breakdown. So this
 * shows one stage at a time against a stage track, with the facts
 * lifted out as figures and the prose cut to what the stage actually
 * needs. The reader picks a stage instead of scrolling a wall.
 *
 * Nothing is hidden from a crawler: every stage's copy is in the DOM,
 * and the inactive ones are `hidden` rather than removed.
 */

export interface Stage {
  /** Short label for the track. */
  tag: string;
  title: string;
  /** Two or three sentences. The stage, not an essay about it. */
  body: readonly string[];
  /** The hard numbers this stage is evidence for. */
  figures?: readonly { value: string; label: string }[];
  /** Per-platform breakdown, where the stage has one. */
  rows?: readonly { term: string; detail: string }[];
  /** What this stage explicitly does not do. */
  limit?: string;
}

const SOCIAL_STAGES: readonly Stage[] = [
  {
    tag: "Plan",
    title: "The brief does the planning",
    body: [
      "Most scheduling tools start from an empty grid: you bring the ideas, they hold the dates. Useful once you know what you are posting, and no help at all on the Monday you do not.",
      "CampaignX starts a step earlier. You describe the campaign in a sentence, and it decides what each platform should carry before it writes a word.",
    ],
    figures: [
      { value: "1", label: "Sentence in" },
      { value: "5", label: "Platform plans out" },
    ],
    limit:
      "A generator that writes one caption and resizes it produces five posts that all read like the first one.",
  },
  {
    tag: "Write",
    title: "Each feed gets its own post",
    body: [
      "A launch on LinkedIn argues a case. On Instagram it shows the thing. On X it has to land in one line. Same brief, same brand model, almost nothing else in common.",
      "Each post is generated with creative already sized for its format, so nothing is cropped to fit at the last minute.",
    ],
    rows: [
      {
        term: "Instagram",
        detail: "Feed and story copy with matching creative",
      },
      {
        term: "Facebook",
        detail: "Written for the feed, not pasted from LinkedIn",
      },
      {
        term: "LinkedIn",
        detail: "A considered register that still sounds like you",
      },
      {
        term: "X",
        detail: "Tight enough for the limit, with the point intact",
      },
      {
        term: "Google Business",
        detail: "Plain, local updates suited to a listing",
      },
    ],
  },
  {
    tag: "Voice",
    title: "Where the voice comes from",
    body: [
      "The posts avoid sounding generic because the model is not working from a generic idea of marketing copy. It builds a brand model from material you have already written: your site, your guidelines, a campaign that landed.",
      "Every correction you make at the approval step is part of what it learns.",
    ],
    figures: [
      { value: "~10 min", label: "First campaign" },
      { value: "~1 afternoon", label: "A model you trust" },
    ],
    limit:
      "Your model is scoped to your workspace. Your data is not used to train shared models or pooled with other customers' data.",
  },
  {
    tag: "Publish",
    title: "Nothing moves until you say so",
    body: [
      "Once a named approver signs off, CampaignX publishes or schedules to the accounts you have connected, and the whole campaign sits on one calendar rather than in five separate schedulers.",
      "You connect each account through that platform's own sign-in, and each platform's terms and rate limits still apply.",
    ],
    figures: [
      { value: "1", label: "Calendar" },
      { value: "0", label: "Posts before sign-off" },
    ],
    limit:
      "CampaignX does not buy or manage paid social advertising. It writes, publishes and reports on organic campaigns.",
  },
];

interface StageExplorerProps {
  eyebrow?: string;
  heading?: string;
  /** Defaults to the social-media stages. */
  stages?: readonly Stage[];
}

export function StageExplorer({
  eyebrow = "How it is built",
  heading = "Four stages, from one sentence to five scheduled posts",
  stages: stagesProp,
}: StageExplorerProps = {}) {
  const STAGES = stagesProp ?? SOCIAL_STAGES;
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    registerStudio();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const head = root.querySelectorAll<HTMLElement>("[data-head]");
      const frame = root.querySelector<HTMLElement>("[data-frame]");

      if (prefersReducedMotion()) {
        gsap.set([...head, frame].filter(Boolean), { opacity: 1, y: 0 });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        })
        .fromTo(
          head,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: T.md,
            stagger: 0.07,
            ease: CX_EASE.out,
          },
        )
        .fromTo(
          frame,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: T.md, ease: CX_EASE.out },
          "-=0.3",
        );
    }, root);

    return () => ctx.revert();
  }, []);

  /* Re-run the panel transition whenever the stage changes, so moving
     between stages is a move rather than a swap. */
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = panelRef.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { opacity: 0, x: 10 },
      { opacity: 1, x: 0, duration: 0.4, ease: CX_EASE.out },
    );
    return () => {
      tween.kill();
    };
  }, [active]);

  const stage = STAGES[active];

  return (
    <section className="relative isolate overflow-x-clip bg-surface-soft py-[clamp(3rem,5.5vw,5rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="cx-dots absolute inset-0 opacity-45 [mask-image:radial-gradient(75%_55%_at_50%_0%,#000,transparent_80%)]" />
      </div>

      <Container>
        <div ref={rootRef}>
          <div className="max-w-[44rem]">
            <p
              data-head
              className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-accent opacity-0"
            >
              {eyebrow}
            </p>
            <h2
              data-head
              className="text-display mt-3 text-[clamp(1.75rem,3.4vw,2.6rem)] font-medium leading-[1.06] tracking-[-0.03em] opacity-0"
            >
              {heading}
            </h2>
          </div>

          {/* The track. Also the control: each stage is a step. */}
          <div
            data-frame
            className="mt-9 overflow-hidden rounded-frame border border-line bg-surface opacity-0 shadow-float"
          >
            <ol
              role="tablist"
              aria-label="Build stages"
              className="grid border-b border-line sm:grid-cols-4"
            >
              {STAGES.map((s, i) => {
                const on = i === active;
                const done = i < active;
                return (
                  <li key={s.tag} className="min-w-0">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setActive(i)}
                      className={cn(
                        "relative flex w-full items-center gap-2.5 px-4 py-3.5 text-left transition-colors duration-200",
                        "border-b border-line sm:border-b-0 sm:border-r sm:last:border-r-0",
                        on ? "bg-surface" : "bg-surface-soft hover:bg-surface",
                      )}
                    >
                      {/* Progress bar along the active step. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "bg-brand absolute inset-x-0 bottom-0 h-[2px] origin-left transition-transform duration-400 ease-[var(--ease-out-soft)]",
                          on ? "scale-x-100" : "scale-x-0",
                        )}
                      />

                      <span
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[0.6875rem] tabular-nums transition-colors duration-200",
                          on
                            ? "bg-accent text-white"
                            : done
                              ? "bg-accent-soft text-accent"
                              : "bg-surface-sunk text-muted",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={cn(
                          "min-w-0 truncate text-[0.875rem] font-medium transition-colors duration-200",
                          on ? "text-foreground" : "text-muted",
                        )}
                      >
                        {s.tag}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* The stage. All four are in the DOM for crawlers; only
                the active one is shown. */}
            {STAGES.map((s, i) => (
              <div
                key={s.tag}
                hidden={i !== active}
                ref={i === active ? panelRef : undefined}
                className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12"
              >
                <div>
                  <h3 className="text-display text-[clamp(1.25rem,2.2vw,1.625rem)] font-medium leading-[1.15] tracking-[-0.025em]">
                    {s.title}
                  </h3>

                  {s.body.map((p) => (
                    <p
                      key={p.slice(0, 32)}
                      className="mt-3.5 text-[1rem] leading-[1.7] text-muted-strong"
                    >
                      {p}
                    </p>
                  ))}

                  {s.limit ? (
                    <p className="mt-5 border-l-2 border-line-strong pl-4 text-[0.875rem] leading-relaxed text-muted">
                      {s.limit}
                    </p>
                  ) : null}
                </div>

                {/* The evidence column: figures, or the per-platform
                    breakdown where the stage has one. */}
                <div className="lg:border-l lg:border-line lg:pl-12">
                  {s.figures ? (
                    <dl className="grid grid-cols-2 gap-6">
                      {s.figures.map((f) => (
                        <div key={f.label}>
                          <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                            {f.label}
                          </dt>
                          <dd className="text-display mt-1.5 text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-none tracking-[-0.02em] text-foreground">
                            {f.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  {s.rows ? (
                    <ul className="space-y-2.5">
                      {s.rows.map((row) => (
                        <li
                          key={row.term}
                          className="flex items-baseline gap-3"
                        >
                          <span className="w-[5.5rem] shrink-0 text-[0.875rem] font-medium text-foreground">
                            {row.term}
                          </span>
                          <span className="min-w-0 text-[0.875rem] leading-snug text-muted-strong">
                            {row.detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          {/* Stage counter, under the frame. */}
          <p className="mt-3.5 text-center font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
            Stage {String(active + 1).padStart(2, "0")} of{" "}
            {String(STAGES.length).padStart(2, "0")} · {stage.tag}
          </p>
        </div>
      </Container>
    </section>
  );
}
