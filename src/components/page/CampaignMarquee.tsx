"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/animations/gsap";

interface CampaignMarqueeProps {
  heading: string;
  eyebrow?: string;
  intro?: string;
  /** Image indexes from /public/images/gallery (1-26). */
  picks: readonly number[];
}

/**
 * Two rows of real campaign artwork that drift in opposite directions as
 * the page scrolls.
 *
 * The movement is scroll-linked rather than a looping animation: a marquee
 * that runs on a timer competes with the reader, while one tied to scroll
 * position only moves when they do. Rows travel in opposite directions so
 * the band reads as depth rather than as a conveyor belt.
 *
 * `xPercent` is used rather than `left`, so the browser composites the
 * transform on the GPU and never reflows the row.
 *
 * Under reduced motion the rows sit still and simply show the work.
 */
export function CampaignMarquee({
  heading,
  eyebrow,
  intro,
  picks,
}: CampaignMarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const half = Math.ceil(picks.length / 2);
  const rows = [picks.slice(0, half), picks.slice(half)];

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-marquee-row]").forEach((row) => {
        const direction = row.dataset.marqueeRow === "1" ? 1 : -1;
        gsap.fromTo(
          row,
          { xPercent: direction * -4 },
          {
            xPercent: direction * 4,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative isolate overflow-hidden py-[clamp(3.25rem,5.5vw,5rem)]">
      <Container>
        <div className="max-w-[46rem]">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2 className="text-display mt-4 text-[clamp(1.75rem,3.4vw,2.6rem)] font-medium leading-[1.12] tracking-[-0.03em]">
            {heading}
          </h2>
          {intro ? (
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-strong">
              {intro}
            </p>
          ) : null}
        </div>
      </Container>

      {/* Full-bleed: the rows are wider than the page rail on purpose, so
          the band runs off both edges instead of sitting in a box. */}
      <div ref={rootRef} className="mt-9 flex flex-col gap-4">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            data-marquee-row={rowIndex}
            className="flex w-[115%] -translate-x-[7.5%] gap-4 will-change-transform"
          >
            {row.map((n) => (
              <figure
                key={n}
                className="relative aspect-[4/5] min-w-0 flex-1 overflow-hidden rounded-card border border-line bg-surface-soft"
              >
                <Image
                  src={`/images/gallery/campaign-${String(n).padStart(2, "0")}.webp`}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 40vw, 18vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        ))}
      </div>

      {/* Edge fades, so the rows dissolve into the page rather than being
          cut off by the viewport. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[12vw] bg-[linear-gradient(to_right,var(--background),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[12vw] bg-[linear-gradient(to_left,var(--background),transparent)]"
      />
    </section>
  );
}
