"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
} from "@/lib/animations/gsap";
import { revealOnScroll } from "@/lib/animations/reveal";
import { cn } from "@/lib/utils";

interface ShowcaseSplitProps {
  heading: string;
  eyebrow?: string;
  intro?: string;
  points?: readonly string[];
  /** Either a still from /public/images or one of the two product videos. */
  media:
    | { kind: "image"; src: string; alt: string }
    | { kind: "video"; src: string; label: string };
  /** `right` puts the media on the right (the default). */
  side?: "left" | "right";
  tone?: "default" | "warm";
}

/**
 * Copy on one side, a real asset on the other.
 *
 * The media panel drifts a little slower than the page as it scrolls,
 * which is what stops a two-column block reading as a static slab. The
 * parallax is small on purpose: large offsets inside a bounded frame look
 * like a bug rather than depth.
 *
 * Videos are muted, inline and loop, which is the only configuration that
 * autoplays reliably across browsers. They carry `aria-label` and a poster
 * so they are described when they have not loaded (SEO audit issue #14,
 * which flagged unlabelled product videos).
 */
export function ShowcaseSplit({
  heading,
  eyebrow,
  intro,
  points,
  media,
  side = "right",
  tone = "default",
}: ShowcaseSplitProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      revealOnScroll(root, { stagger: 0.08, start: "top 80%" });

      if (prefersReducedMotion()) return;
      const panel = root.querySelector<HTMLElement>("[data-showcase-media]");
      if (!panel) return;

      gsap.fromTo(
        panel,
        { y: 26 },
        {
          y: -26,
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

  return (
    <section
      className={cn(
        "relative isolate py-[clamp(3.25rem,5.5vw,5rem)]",
        tone === "warm" && "bg-surface-warm",
      )}
    >
      <Container>
        <div
          ref={rootRef}
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
        >
          {/* Copy */}
          <div className={cn(side === "left" && "lg:order-2")}>
            {eyebrow ? <Eyebrow data-animate="reveal">{eyebrow}</Eyebrow> : null}

            <h2
              data-animate="reveal"
              className="text-display mt-4 text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.03em]"
            >
              {heading}
            </h2>

            {intro ? (
              <p
                data-animate="reveal"
                className="mt-4 text-[1.0625rem] leading-relaxed text-muted-strong"
              >
                {intro}
              </p>
            ) : null}

            {points?.length ? (
              <ul className="mt-7 space-y-3">
                {points.map((point) => (
                  <li
                    key={point}
                    data-animate="reveal"
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                      <Check
                        aria-hidden="true"
                        className="size-3 text-accent"
                        strokeWidth={3}
                      />
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-muted-strong">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Media */}
          <div
            data-animate="reveal"
            className={cn(side === "left" && "lg:order-1")}
          >
            <div
              data-showcase-media
              className="glass-sheen relative overflow-hidden rounded-frame border border-line bg-surface-soft shadow-float will-change-transform"
            >
              {media.kind === "image" ? (
                <Image
                  src={media.src}
                  alt={media.alt}
                  width={1200}
                  height={900}
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="h-auto w-full object-cover"
                />
              ) : (
                /* The clips are 720x1280 — portrait 9:16 — and carry no
                   intrinsic size until metadata loads, which left a tall
                   grey box on first paint and would be badly cropped in a
                   landscape frame. Shown in a phone-shaped frame at its
                   own ratio, centred, with the panel providing the
                   surround. */
                <div className="flex justify-center bg-[linear-gradient(170deg,var(--surface-soft),var(--surface-warm))] px-6 py-8">
                  <div className="relative aspect-[9/16] w-[min(16rem,62%)] overflow-hidden rounded-[1.75rem] border-[6px] border-foreground/85 bg-foreground shadow-cinema">
                    <video
                      src={media.src}
                      aria-label={media.label}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
