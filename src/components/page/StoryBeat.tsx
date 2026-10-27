"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
} from "@/lib/animations/gsap";
import { revealOnScroll } from "@/lib/animations/reveal";
import { cn } from "@/lib/utils";

interface StoryBeatProps {
  /** Where this sits in the arc. Sets the tone and the ornament. */
  beat: "tension" | "turn" | "resolution";
  eyebrow?: string;
  heading: string;
  /** The narration. Two or three sentences, written as prose. */
  body: string;
  /** A line that lands on its own, pulled out of the prose. */
  pullquote?: string;
  media?: { src: string; alt: string };
  /** Overlaid on the artwork, e.g. "Monday, 9:04am". */
  caption?: string;
}

/**
 * One beat in a page's story.
 *
 * Pages built only from feature cards read as a specification. These read
 * as a sequence: something is wrong (tension), something changes (turn),
 * here is what it is like afterwards (resolution). The three tones are
 * visually distinct so a reader can feel the arc without being told it.
 *
 * `tension` is the dark beat — the problem stated plainly on a dark
 * ground. `turn` is the hinge, carrying the brand light. `resolution` is
 * open and bright.
 *
 * The artwork drifts slightly against the scroll, which keeps a
 * full-width beat from reading as a static slab.
 */
export function StoryBeat({
  beat,
  eyebrow,
  heading,
  body,
  pullquote,
  media,
  caption,
}: StoryBeatProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      revealOnScroll(root, { stagger: 0.09, start: "top 78%" });

      if (prefersReducedMotion()) return;
      const art = root.querySelector<HTMLElement>("[data-story-art]");
      if (!art) return;

      gsap.fromTo(
        art,
        { y: 22 },
        {
          y: -22,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const dark = beat === "tension";

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden py-[clamp(3.25rem,5.5vw,5rem)]",
        dark && "bg-foreground text-white",
        beat === "turn" && "bg-surface-warm",
      )}
    >
      {/* The turn carries the brand light: it is the moment the page
          changes direction, and the only beat that glows. */}
      {beat === "turn" ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(55%_60%_at_75%_40%,rgba(var(--brand-blue-rgb),0.12),transparent_70%)]"
        />
      ) : null}

      {dark ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_70%_at_15%_10%,rgba(var(--brand-blue-rgb),0.22),transparent_60%)]"
        />
      ) : null}

      <Container>
        <div
          ref={rootRef}
          className={cn(
            "relative grid items-center gap-10",
            media && "lg:grid-cols-2 lg:gap-16",
          )}
        >
          <div className={cn(beat === "resolution" && media && "lg:order-2")}>
            {eyebrow ? (
              <Eyebrow data-animate="reveal" tone={dark ? "invert" : "default"}>
                {eyebrow}
              </Eyebrow>
            ) : null}

            <h2
              data-animate="reveal"
              className={cn(
                "text-display mt-4 text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.03em]",
                dark && "text-white",
              )}
            >
              {heading}
            </h2>

            <p
              data-animate="reveal"
              className={cn(
                "mt-4 max-w-[38rem] text-[1.0625rem] leading-relaxed",
                dark ? "text-white/70" : "text-muted-strong",
              )}
            >
              {body}
            </p>

            {pullquote ? (
              <p
                data-animate="reveal"
                className={cn(
                  "text-display mt-7 border-l-2 pl-5 text-[clamp(1.125rem,1.9vw,1.4rem)] leading-snug",
                  dark
                    ? "border-white/25 text-white/90"
                    : "border-accent text-foreground",
                )}
              >
                {pullquote}
              </p>
            ) : null}
          </div>

          {media ? (
            <div
              data-animate="reveal"
              className={cn(beat === "resolution" && "lg:order-1")}
            >
              <figure
                data-story-art
                className={cn(
                  "relative overflow-hidden rounded-frame border shadow-float will-change-transform",
                  dark ? "border-white/10" : "border-line bg-surface-soft",
                )}
              >
                <Image
                  src={media.src}
                  alt={media.alt}
                  width={1100}
                  height={850}
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="h-auto w-full object-cover"
                />

                {caption ? (
                  <figcaption className="glass-quiet absolute bottom-3 left-3 rounded-pill px-3 py-1.5 text-[0.875rem] text-foreground">
                    {caption}
                  </figcaption>
                ) : null}
              </figure>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
