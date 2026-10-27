"use client";

import Link from "next/link";
import { useEffect, useRef, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ChannelArt, type ChannelArtName } from "@/components/studio/ChannelArt";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";
import { cn } from "@/lib/utils";

export interface ArtCard {
  art: ChannelArtName;
  title: string;
  /** Two or three sentences. One line of copy makes the card look empty. */
  body: string;
  /** Short spec line under the body, e.g. "Square and 4:5 · caption + alt". */
  spec?: string;
  href?: string;
}

interface ArtCardGridProps {
  kicker: string;
  heading: string;
  intro?: string;
  cards: readonly ArtCard[];
  tone?: "default" | "warm";
  id?: string;
  /**
   * Renders only the grid, with no section chrome. Used when the cards
   * sit inside a `Segment`, which already supplies the heading and the
   * surrounding padding.
   */
  bare?: boolean;
}

/**
 * Cards that show the thing they describe.
 *
 * The previous version of this section was a title and one line of text
 * in a bordered box, six times over — which left the grid looking empty
 * and told a reader almost nothing. Each card now carries its own
 * drawing of the output on that surface, two or three sentences, and a
 * spec line.
 *
 * The art sits in a tinted well above the copy so the card reads as
 * image-then-text rather than a text box with decoration. On hover the
 * art lifts very slightly: enough to feel alive, not enough to reflow.
 *
 * The reveal is a stagger that follows reading order, and the cursor
 * sheen is written straight to CSS custom properties rather than through
 * React state, so pointer movement never triggers a render.
 */
export function ArtCardGrid({
  kicker,
  heading,
  intro,
  cards,
  tone = "default",
  id,
  bare = false,
}: ArtCardGridProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerStudio();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const head = root.querySelectorAll<HTMLElement>("[data-head]");
      const items = root.querySelectorAll<HTMLElement>("[data-card]");

      if (prefersReducedMotion()) {
        gsap.set([...head, ...items], { opacity: 1, y: 0 });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        })
        .fromTo(
          head,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: T.md, stagger: 0.07, ease: CX_EASE.out },
        )
        .fromTo(
          items,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: T.md,
            stagger: 0.06,
            ease: CX_EASE.out,
          },
          "-=0.4",
        );
    }, root);

    return () => ctx.revert();
  }, []);

  const grid = (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, i) => (
        <Card key={card.title} card={card} index={i} />
      ))}
    </ul>
  );

  if (bare) {
    return (
      <div ref={rootRef}>
        {grid}
      </div>
    );
  }

  return (
    <section
      id={id}
      className={cn(
        "relative isolate py-[clamp(3.25rem,5.5vw,5rem)]",
        tone === "warm" && "bg-surface-warm",
      )}
    >
      <Container>
        <div ref={rootRef}>
          <div className="max-w-[46rem]">
            <span data-head className="text-eyebrow block text-muted opacity-0">
              {kicker}
            </span>
            <h2
              data-head
              className="text-display mt-4 text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.03em] opacity-0"
            >
              {heading}
            </h2>
            {intro ? (
              <p
                data-head
                className="mt-4 text-[1.0625rem] leading-relaxed text-muted-strong opacity-0"
              >
                {intro}
              </p>
            ) : null}
          </div>

          <div className="mt-10">{grid}</div>
        </div>
      </Container>
    </section>
  );
}

function Card({ card, index }: { card: ArtCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  const inner = (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden rounded-panel",
        "border border-line bg-surface",
        "transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)]",
        "hover:-translate-y-1 hover:border-accent-line hover:shadow-float",
      )}
    >
      {/* A brand rule along the top edge, drawn on hover. It gives the
          card a direction, which a uniform border does not. */}
      <span
        aria-hidden="true"
        className="bg-brand absolute inset-x-0 top-0 z-20 h-[2px] origin-left scale-x-0 transition-transform duration-400 ease-[var(--ease-out-soft)] group-hover/card:scale-x-100"
      />

      {/* Cursor sheen. Written to CSS variables rather than state, so
          pointer movement never triggers a render. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 [background:radial-gradient(18rem_18rem_at_var(--mx,50%)_var(--my,0%),rgba(var(--brand-blue-rgb),0.08),transparent_70%)]"
      />

      {/* The artwork well. */}
      <div className="relative overflow-hidden bg-[linear-gradient(170deg,var(--surface-soft),var(--surface))] px-5 pb-4 pt-5 transition-colors duration-500 group-hover/card:bg-[linear-gradient(170deg,var(--surface),var(--surface-soft))]">
        {/* A faint grid behind the drawing, so the well reads as a
            surface rather than as empty space. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.6] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(70%_70%_at_50%_45%,#000,transparent_78%)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 [background:radial-gradient(60%_60%_at_50%_100%,rgba(var(--brand-blue-rgb),0.12),transparent_70%)]"
        />

        {/* The index, top-left: the set reads as a numbered series. */}
        <span
          aria-hidden="true"
          className="text-display absolute left-4 top-3 z-10 text-[0.6875rem] font-medium tabular-nums text-muted/70"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <ChannelArt
          name={card.art}
          className="relative transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover/card:-translate-y-1 group-hover/card:scale-[1.03]"
        />
      </div>

      {/* The copy. */}
      <div className="relative flex flex-1 flex-col border-t border-line p-5">
        <h3 className="text-display flex items-center gap-1.5 text-[1.0625rem] font-medium leading-snug tracking-[-0.015em]">
          {card.title}
          {card.href ? (
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 shrink-0 text-muted transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:text-accent"
            />
          ) : null}
        </h3>

        <p className="mt-2 flex-1 text-[0.9375rem] leading-[1.6] text-muted-strong">
          {card.body}
        </p>

        {/* The spec, as a footer strip rather than another paragraph:
            it is metadata, and should not read as body copy. */}
        {card.spec ? (
          <p className="mt-4 flex items-start gap-2 border-t border-line pt-3 text-[0.875rem] leading-snug text-muted">
            <span
              aria-hidden="true"
              className="bg-brand mt-[0.3125rem] size-1 shrink-0 rounded-full"
            />
            {card.spec}
          </p>
        ) : null}
      </div>
    </div>
  );

  return (
    <li data-card className="h-full opacity-0">
      {card.href ? (
        <Link href={card.href} className="block h-full rounded-panel">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </li>
  );
}
