"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";
import { revealOnScroll } from "@/lib/animations/reveal";
import { registerGsap } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils";

interface SegmentProps {
  /** Two-digit segment number, e.g. "01". */
  seg: string;
  /** Short all-caps label beside the number. */
  label: string;
  /** Position in the sequence, for the progress ticks. */
  step: number;
  total: number;
  /** Split on `|` to force a line break in the display heading. */
  heading: string;
  children: ReactNode;
  tone?: "ink" | "light" | "warm" | "tint";
  id?: string;
}

/**
 * A numbered segment of a page.
 *
 * Inner pages were reading as a stack of unrelated sections, each with
 * its own heading and no sense of sequence. This frames each one as a
 * numbered segment of a single document: a `SEG 01` tag on the left, a
 * rule, and progress ticks on the right showing where the reader is.
 *
 * The device does two things at once. It gives a long page an explicit
 * spine, and it lets each segment carry a different layout inside
 * without the page feeling like it has fallen apart — the frame is the
 * constant.
 *
 * `ink` is the deep brand ground, used for the segments that carry a
 * product mock; `light` and `warm` alternate for reading sections.
 */
export function Segment({
  seg,
  label,
  step,
  total,
  heading,
  children,
  tone = "light",
  id,
}: SegmentProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const ink = tone === "ink";

  useEffect(() => {
    registerStudio();
    /* `revealOnScroll` comes from the base animation module and expects
       the plugins that `registerGsap` installs. Without it, building a
       tween with a `scrollTrigger` config throws. */
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const bits = root.querySelectorAll<HTMLElement>("[data-seg]");
      const rule = root.querySelector<HTMLElement>("[data-seg-rule]");

      /* Children may bring their own `data-animate="reveal"` nodes — the
         FAQ rows do. The CSS in animations.css keeps those hidden until
         GSAP clears them, so a segment that never reveals its
         descendants renders them permanently invisible. This has to run
         on every path, including reduced motion. */
      const nested = root.querySelectorAll<HTMLElement>(
        '[data-animate="reveal"]',
      );
      if (nested.length > 0) {
        revealOnScroll(root, { stagger: 0.06, start: "top 82%" });
      }

      if (prefersReducedMotion()) {
        gsap.set(bits, { opacity: 1, y: 0 });
        gsap.set(rule, { scaleX: 1 });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        })
        .fromTo(
          rule,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: T.lg, ease: CX_EASE.out },
        )
        .fromTo(
          bits,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: T.md, stagger: 0.07, ease: CX_EASE.out },
          "-=0.75",
        );
    }, root);

    return () => ctx.revert();
  }, []);

  const lines = heading.split("|").map((l) => l.trim());

  return (
    <section
      id={id}
      className={cn(
        /* `overflow-x: clip` rather than `overflow: hidden`: hidden
           makes this element a scroll container, which silently
           disables `position: sticky` for everything inside it — the
           left rails in segments 01 and 05 are sticky. Clipping only
           the x axis keeps the glows inside the band without that
           side effect. */
        "relative isolate overflow-x-clip py-[clamp(2.5rem,4vw,3.75rem)]",
        ink && "bg-ink text-white",
        tone === "warm" && "bg-surface-warm",
        tone === "tint" && "bg-surface-soft",
      )}
    >
      {tone === "tint" ? (
        /* A light band with its own texture: the dot field plus two
           brand volumes, so a page of light sections still has
           variation rather than reading as one flat field. */
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="cx-dots absolute inset-0 opacity-60 [mask-image:radial-gradient(80%_70%_at_30%_30%,#000,transparent_78%)]" />
          <div className="absolute -left-[8%] -top-[20%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(var(--brand-blue-rgb),0.11),transparent)]" />
          <div className="absolute -right-[6%] bottom-[-26%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(var(--brand-magenta-rgb),0.09),transparent)]" />
        </div>
      ) : null}

      {ink ? (
        /* The same brand ramp as the hero, at lower intensity: this
           segment sits directly under it, so repeating the geometry at
           full strength would read as one long gradient rather than two
           sections. Seams at the top and bottom edge keep the band from
           butting flatly against the light sections either side. */
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 [background:radial-gradient(58%_60%_at_6%_4%,rgba(var(--brand-blue-rgb),0.26),transparent_60%)]" />
          <div className="absolute inset-0 [background:radial-gradient(52%_56%_at_96%_98%,rgba(var(--brand-magenta-rgb),0.2),transparent_62%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(var(--brand-blue-rgb),0.5),rgba(var(--brand-magenta-rgb),0.35),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1),transparent)]" />
        </div>
      ) : null}

      <Container>
        <div ref={rootRef} className="relative">
          {/* The segment bar: tag, rule, progress ticks. */}
          <div data-seg className="flex items-center gap-4 opacity-0">
            <span
              className={cn(
                "shrink-0 rounded-[0.25rem] px-2 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em]",
                ink ? "bg-accent text-white" : "bg-accent-soft text-accent",
              )}
            >
              Seg {seg}
            </span>
            <span
              className={cn(
                "shrink-0 text-[0.625rem] font-medium uppercase tracking-[0.18em]",
                ink ? "text-white/50" : "text-muted",
              )}
            >
              {label}
            </span>

            <span
              data-seg-rule
              aria-hidden="true"
              className={cn(
                "h-px flex-1 origin-left",
                ink ? "bg-white/15" : "bg-line",
              )}
            />

            {/* Progress ticks: where this segment sits in the page. */}
            <span
              aria-hidden="true"
              className="hidden shrink-0 items-center gap-[3px] sm:flex"
            >
              {Array.from({ length: total }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-[3px] w-2 rounded-full",
                    i < step
                      ? ink
                        ? "bg-accent"
                        : "bg-accent"
                      : ink
                        ? "bg-white/18"
                        : "bg-line-strong",
                  )}
                />
              ))}
            </span>
            <span
              className={cn(
                "hidden shrink-0 text-[0.625rem] tabular-nums sm:block",
                ink ? "text-white/45" : "text-muted",
              )}
            >
              {step}/{total}
            </span>
          </div>

          <h2
            data-seg
            className={cn(
              "text-display mt-5 text-[clamp(1.875rem,3.6vw,2.875rem)] font-medium leading-[1.05] tracking-[-0.035em] opacity-0",
              ink && "text-white",
            )}
          >
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <div data-seg className="mt-4 opacity-0">
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * A labelled annotation, as used beside the prose on the reference
 * pages. Draws the eye to one caveat or clarification without turning
 * it into a heading of its own.
 */
export function Annotation({
  tag,
  children,
  tone = "light",
}: {
  tag: string;
  children: ReactNode;
  tone?: "ink" | "light";
}) {
  const ink = tone === "ink";
  return (
    <aside
      className={cn(
        "rounded-panel p-5",
        ink
          ? "border border-white/10 bg-white/[0.06]"
          : "border border-line bg-surface",
      )}
    >
      <span
        className={cn(
          "inline-block rounded-[0.25rem] px-2 py-0.5 text-[0.5625rem] font-semibold uppercase tracking-[0.14em]",
          ink ? "bg-accent text-white" : "bg-accent-soft text-accent",
        )}
      >
        {tag}
      </span>
      <div
        className={cn(
          "mt-3 text-[0.875rem] leading-[1.65]",
          ink ? "text-white/70" : "text-muted-strong",
        )}
      >
        {children}
      </div>
    </aside>
  );
}

/**
 * A two-column comparison table.
 *
 * The reference pages use this instead of side-by-side cards, and it is
 * the better instrument: rows line the two options up on the same
 * question, which is exactly the comparison a reader is trying to make.
 */
export function CompareTable({
  question,
  left,
  right,
  rows,
  tone = "light",
}: {
  /** Column heading above the row labels. */
  question: string;
  left: string;
  right: string;
  rows: readonly { label: string; left: string; right: string }[];
  /**
   * Defaults to `light`, matching `Annotation`.
   *
   * It used to default to `ink` — white text, for a dark band. Every
   * call site is on a light segment and has to pass `tone="light"`,
   * and forgetting it renders the table white-on-white rather than
   * failing loudly. The safe case is the better default.
   */
  tone?: "ink" | "light";
}) {
  const ink = tone === "ink";

  return (
    <div>
      <p
        className={cn(
          "text-[0.625rem] font-medium uppercase tracking-[0.16em]",
          ink ? "text-white/40" : "text-muted",
        )}
      >
        {question}
      </p>

      <table className="mt-4 w-full border-collapse text-left">
        <thead>
          <tr
            className={cn(
              "border-b",
              ink ? "border-white/12" : "border-line",
            )}
          >
            <th className="w-[26%] pb-3" />
            <th
              className={cn(
                "pb-3 pr-4 text-[0.6875rem] font-medium uppercase tracking-[0.12em]",
                ink ? "text-white/45" : "text-muted",
              )}
            >
              {left}
            </th>
            <th
              className={cn(
                "pb-3 text-[0.6875rem] font-medium uppercase tracking-[0.12em]",
                ink ? "text-accent" : "text-accent",
              )}
            >
              {right}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className={cn(
                "border-b align-top last:border-0",
                ink ? "border-white/08" : "border-line",
              )}
            >
              <th
                scope="row"
                className={cn(
                  "py-4 pr-4 text-[0.8125rem] font-medium",
                  ink ? "text-white" : "text-foreground",
                )}
              >
                {row.label}
              </th>
              <td
                className={cn(
                  "py-4 pr-4 text-[0.8125rem] leading-snug",
                  ink ? "text-white/45" : "text-muted",
                )}
              >
                <span className="mr-1.5 opacity-60">·</span>
                {row.left}
              </td>
              <td
                className={cn(
                  "py-4 text-[0.8125rem] leading-snug",
                  ink ? "text-white/85" : "text-foreground",
                )}
              >
                {row.right}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
