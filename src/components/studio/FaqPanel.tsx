"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageFaq } from "@/components/page/PageFaq";
import { registerGsap } from "@/lib/animations/gsap";
import { revealOnScroll } from "@/lib/animations/reveal";
import { registerStudio } from "@/lib/animations/studio";
import type { FaqItem } from "@/lib/schema";

interface FaqPanelProps {
  heading: string;
  /** Short lead-in beside the questions. */
  intro: string;
  items: readonly FaqItem[];
  links: readonly { title: string; body: string; href: string }[];
  /** One line under the links. */
  note?: string;
}

/**
 * Questions, with the onward links as a footer rather than a column.
 *
 * Two things were wrong with the hand-built version of this section.
 *
 * The questions did not render at all: `PageFaq` marks each row
 * `data-animate="reveal"`, which the stylesheet holds at `opacity: 0`
 * until something calls `revealOnScroll`. `Segment` does that for the
 * feature pages; a section assembled by hand in a server component
 * does not, so the column was blank and the heading sat above nothing.
 * That is why this is a client component — it owns the trigger.
 *
 * And the layout put three small link cards in a column of their own
 * beside the questions, which left the right half empty below them and
 * gave the links more prominence than the answers. The questions now
 * take the full measure, and the links run along the foot as a row.
 */
export function FaqPanel({
  heading,
  intro,
  items,
  links,
  note,
}: FaqPanelProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* `revealOnScroll` builds a ScrollTrigger, which `registerGsap`
       installs; `registerStudio` supplies the eases used elsewhere on
       this page. Both are idempotent. */
    registerStudio();
    registerGsap();
    const root = rootRef.current;
    if (!root) return;
    revealOnScroll(root, { stagger: 0.05, start: "top 84%" });
  }, []);

  return (
    <section className="relative isolate py-[clamp(3rem,5vw,4.5rem)]">
      <Container>
        <div ref={rootRef}>
          {/* Heading in a left rail, questions beside it. Run full
              width, a question line reached ~1400px and stranded its
              marker at the far right of an otherwise empty row. */}
          <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="text-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.03em]">
                {heading}
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                {intro}
              </p>
              <p className="mt-5 font-mono text-[0.875rem] uppercase tracking-[0.1em] text-muted">
                {items.length} questions
              </p>
            </div>

            <PageFaq items={items} />
          </div>

          {/* Onward links as a foot row. */}
          <div className="mt-10 border-t border-line pt-8">
            {/* The site's own eyebrow utility rather than another
                one-off size, so section labels match everywhere. */}
            <p className="text-eyebrow">
              Keep reading
            </p>

            <ul className="mt-4 grid gap-2.5 sm:grid-cols-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex h-full flex-col rounded-panel border border-line bg-surface p-4 transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:border-accent-line hover:shadow-soft"
                  >
                    <span className="flex items-start justify-between gap-2">
                      <span className="text-[0.9375rem] font-medium leading-snug text-foreground">
                        {link.title}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 shrink-0 text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </span>
                    <span className="mt-1.5 text-[0.875rem] leading-relaxed text-muted-strong">
                      {link.body}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {note ? (
              <p className="mt-5 max-w-[44rem] text-[0.875rem] leading-relaxed text-muted">
                {note}
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
