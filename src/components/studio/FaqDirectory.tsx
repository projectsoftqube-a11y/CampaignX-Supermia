"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { PageFaq } from "@/components/page/PageFaq";
import { registerGsap } from "@/lib/animations/gsap";
import { revealOnScroll } from "@/lib/animations/reveal";
import { registerStudio } from "@/lib/animations/studio";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/schema";

interface Group {
  id: string;
  title: string;
  intro: string;
  items: readonly FaqItem[];
}

interface FaqDirectoryProps {
  groups: readonly Group[];
}

/**
 * The FAQ as a directory rather than a scroll.
 *
 * Twenty-two questions in six groups, previously stacked as six
 * full-width sections with alternating background tones. That shape
 * makes someone scroll past five groups to reach the one they came
 * for, and the alternating bands made the page read as six unrelated
 * pages rather than one reference.
 *
 * Here the groups live in a sticky rail that tracks the reader and
 * shows how many questions each holds, with the answers in a single
 * column beside it. A reference page is used by people who already
 * know what they want to know; the rail gets them there in one click.
 *
 * This is a client component because `PageFaq` marks its rows
 * `data-animate="reveal"`, which the stylesheet holds at opacity 0
 * until something calls `revealOnScroll`.
 */
export function FaqDirectory({ groups }: FaqDirectoryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(groups[0]?.id ?? "");

  useEffect(() => {
    registerStudio();
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    revealOnScroll(root, { stagger: 0.04, start: "top 86%" });

    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-group]"),
    );

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = (entry.target as HTMLElement).dataset.group;
          if (id) setCurrent(id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section className="relative py-[clamp(2.5rem,4vw,3.5rem)]">
      <Container>
        <div
          ref={rootRef}
          className="grid gap-10 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16"
        >
          {/* The rail. */}
          <nav
            aria-label="Question groups"
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="flex items-baseline justify-between gap-3 border-b border-line pb-3">
              <p className="text-eyebrow">Sections</p>
              <p className="font-mono text-[0.875rem] tabular-nums text-muted">
                {total} questions
              </p>
            </div>

            <ol className="mt-3 space-y-px">
              {groups.map((group, i) => {
                const on = group.id === current;
                return (
                  <li key={group.id}>
                    <a
                      href={`#${group.id}`}
                      aria-current={on ? "true" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-[0.4rem] px-3 py-2.5 transition-colors duration-200",
                        on
                          ? "bg-accent-soft text-accent"
                          : "text-muted hover:bg-surface-soft hover:text-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "shrink-0 font-mono text-[0.875rem] tabular-nums",
                          on ? "text-accent" : "text-muted/60",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 text-[0.9375rem] leading-snug">
                        {group.title}
                      </span>
                      <span className="shrink-0 font-mono text-[0.875rem] tabular-nums text-muted/60">
                        {group.items.length}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* The answers. */}
          <div>
            {groups.map((group, i) => (
              <section
                key={group.id}
                id={group.id}
                data-group={group.id}
                className={cn(
                  "scroll-mt-28",
                  i > 0 && "mt-10 border-t border-line pt-10",
                )}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.875rem] tabular-nums text-accent"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-display text-[clamp(1.375rem,2.4vw,1.75rem)] font-medium leading-snug tracking-[-0.02em]">
                    {group.title}
                  </h2>
                </div>

                <p className="mt-2.5 max-w-[44rem] text-[1rem] leading-[1.7] text-muted-strong">
                  {group.intro}
                </p>

                <div className="mt-5">
                  <PageFaq items={group.items} />
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
