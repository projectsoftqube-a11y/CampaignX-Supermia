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
import { cn } from "@/lib/utils";

export interface ProseBlock {
  /** Rendered as an H3. */
  heading: string;
  /** One or more paragraphs. Each string is its own <p>. */
  paragraphs: readonly string[];
  /** Optional bullets after the paragraphs. */
  list?: readonly string[];
}

interface ProseSectionProps {
  heading: string;
  eyebrow?: string;
  intro?: string;
  blocks: readonly ProseBlock[];
  tone?: "default" | "warm";
  id?: string;
  /** Pull-out panel, pinned in the left rail beside the prose. */
  aside?: { heading: string; body: ReactNode };
}

/**
 * Long-form prose, set as a numbered article.
 *
 * The previous version was one narrow column with a box floating at the
 * top right, which left a tall empty gap beside the second half of the
 * text and gave the reader no sense of progress. This is restructured as
 * a two-rail article:
 *
 *   - A left rail carries the section number, a sticky contents list and
 *     the pull-out panel. It stays in view while the prose scrolls, so
 *     the space beside the text is always doing something.
 *   - Each block is numbered and separated by a rule, so a long read has
 *     visible structure instead of being a wall.
 *   - The measure is capped near 68 characters, which is what keeps a
 *     long passage readable.
 *
 * The rail collapses above the prose on narrow screens, where a sticky
 * sidebar would just steal height.
 */
export function ProseSection({
  heading,
  eyebrow,
  intro,
  blocks,
  tone = "default",
  id,
  aside,
}: ProseSectionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerStudio();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const head = root.querySelectorAll<HTMLElement>("[data-head]");
      const items = root.querySelectorAll<HTMLElement>("[data-block]");

      if (prefersReducedMotion()) {
        gsap.set([...head, ...items], { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        head,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: T.md,
          stagger: 0.07,
          ease: CX_EASE.out,
          scrollTrigger: { trigger: root, start: "top 82%", once: true },
        },
      );

      /* Each block reveals as it arrives rather than all at once, so a
         long section unfolds as the reader moves down it. */
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: T.md,
            ease: CX_EASE.out,
            scrollTrigger: { trigger: item, start: "top 86%", once: true },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      className={cn(
        "relative isolate py-[clamp(3.5rem,6vw,5.5rem)]",
        tone === "warm" && "bg-surface-warm",
      )}
    >
      <Container>
        <div ref={rootRef}>
          <div className="max-w-[44rem]">
            {eyebrow ? (
              <p
                data-head
                className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-accent opacity-0"
              >
                {eyebrow}
              </p>
            ) : null}
            <h2
              data-head
              className="text-display mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.03em] opacity-0"
            >
              {heading}
            </h2>
            {intro ? (
              <p
                data-head
                className="mt-3.5 text-[1.0625rem] leading-relaxed text-muted-strong opacity-0"
              >
                {intro}
              </p>
            ) : null}
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
            {/* The rail. Sticky on desktop so the space beside the prose
                is never idle. */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ol className="hidden border-l border-line lg:block">
                {blocks.map((block, i) => (
                  <li key={block.heading}>
                    <a
                      href={`#${slug(block.heading)}`}
                      className="group block border-l-2 border-transparent py-2 pl-4 text-[0.875rem] leading-snug text-muted transition-colors duration-200 hover:border-accent hover:text-foreground"
                    >
                      <span className="mr-2 tabular-nums text-muted/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {block.heading}
                    </a>
                  </li>
                ))}
              </ol>

              {aside ? (
                <div className="rounded-panel border border-line bg-surface p-5 lg:mt-7">
                  <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
                    {aside.heading}
                  </p>
                  <div className="mt-2.5 text-[0.875rem] leading-relaxed text-muted-strong">
                    {aside.body}
                  </div>
                </div>
              ) : null}
            </div>

            {/* The prose. */}
            <div className="max-w-[42rem]">
              {blocks.map((block, i) => (
                <article
                  key={block.heading}
                  id={slug(block.heading)}
                  data-block
                  className={cn(
                    "scroll-mt-28 opacity-0",
                    i > 0 && "mt-10 border-t border-line pt-10",
                  )}
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      aria-hidden="true"
                      className="text-display text-[0.6875rem] font-medium tabular-nums text-accent"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-display text-[1.25rem] font-medium leading-snug tracking-[-0.02em]">
                      {block.heading}
                    </h3>
                  </div>

                  {block.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="mt-4 text-[1.0625rem] leading-[1.75] text-muted-strong"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {block.list?.length ? (
                    <ul className="mt-5 space-y-2.5 rounded-panel border border-line bg-surface p-5">
                      {block.list.map((item) => (
                        <li
                          key={item}
                          className="relative pl-5 text-[0.9375rem] leading-relaxed text-muted-strong before:absolute before:left-0 before:top-[0.6875rem] before:size-1.5 before:rounded-full before:bg-accent"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Stable anchor id from a heading, for the contents rail. */
function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}
