"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, registerGsap } from "@/lib/animations/gsap";
import { revealOnScroll } from "@/lib/animations/reveal";
import { cn } from "@/lib/utils";

interface PageSectionProps {
  /** Becomes the section's H2. Every inner page is built from these. */
  heading: string;
  eyebrow?: string;
  intro?: string;
  children?: ReactNode;
  /** `warm` paints the cream band used between white sections. */
  tone?: "default" | "warm" | "ink";
  id?: string;
  className?: string;
}

/**
 * A titled band with a staggered reveal.
 *
 * The heading, intro and every child carrying `data-animate="reveal"` come
 * in together as one group, so a section reads as a single beat rather than
 * a queue of independent animations.
 */
export function PageSection({
  heading,
  eyebrow,
  intro,
  children,
  tone = "default",
  id,
  className,
}: PageSectionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      revealOnScroll(root, { stagger: 0.085, start: "top 80%" });
    }, root);
    return () => ctx.revert();
  }, []);

  const ink = tone === "ink";

  return (
    <section
      id={id}
      className={cn(
        "relative isolate py-[clamp(3.25rem,5.5vw,5rem)]",
        tone === "warm" && "bg-surface-warm",
        ink && "bg-foreground text-white",
        className,
      )}
    >
      <Container>
        <div ref={rootRef}>
          <div className="max-w-[46rem]">
            {eyebrow ? (
              <Eyebrow data-animate="reveal" tone={ink ? "invert" : "default"}>
                {eyebrow}
              </Eyebrow>
            ) : null}

            <h2
              data-animate="reveal"
              className={cn(
                "text-display mt-4 text-[clamp(1.75rem,3.4vw,2.6rem)] font-medium leading-[1.12] tracking-[-0.03em]",
                ink && "text-white",
              )}
            >
              {heading}
            </h2>

            {intro ? (
              <p
                data-animate="reveal"
                className={cn(
                  "mt-4 text-[1.0625rem] leading-relaxed",
                  ink ? "text-white/70" : "text-muted-strong",
                )}
              >
                {intro}
              </p>
            ) : null}
          </div>

          {children ? <div className="mt-9">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
