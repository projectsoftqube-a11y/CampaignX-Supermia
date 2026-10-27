"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { primaryCta } from "@/config/navigation";
import { DURATION, EASE, gsap, prefersReducedMotion, registerGsap } from "@/lib/animations/gsap";
import type { BreadcrumbStep } from "@/lib/schema";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  /** Rendered as the page's only <h1>, as plain text with no nested spans. */
  title: string;
  intro: string;
  breadcrumbs: readonly BreadcrumbStep[];
  /** Short proof chips under the intro. Three reads best. */
  highlights?: readonly string[];
  cta?: { label: string; href: string };
  /**
   * Optional artwork beside the copy. Without it the hero stays a single
   * column, which suits text-led pages such as /faq and /about.
   */
  media?: { src: string; alt: string };
}

/**
 * The entrance every inner page shares.
 *
 * The heading animates in word by word rather than as one block, which is
 * what makes a page feel authored rather than loaded. Words are wrapped in
 * spans here in the markup — not by splitting text at runtime — so the
 * server HTML already contains them and nothing reflows on hydration.
 *
 * The h1 keeps its full text as a single accessible string: the wrapper
 * spans are presentational, and the visible words together read exactly as
 * the title does. Screen readers announce one heading, not a word list.
 *
 * Under reduced motion every element is placed at its final state and no
 * timeline is built.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  highlights,
  cta,
  media,
}: PageHeroProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const words = root.querySelectorAll<HTMLElement>("[data-hero-word]");
      const rest = root.querySelectorAll<HTMLElement>("[data-hero-item]");
      const glow = root.querySelector<HTMLElement>("[data-hero-aurora]");

      if (prefersReducedMotion()) {
        gsap.set([...words, ...rest], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE.out } });

      tl.fromTo(
        words,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: DURATION.slow,
          stagger: 0.045,
          ease: EASE.expo,
        },
      ).fromTo(
        rest,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: DURATION.base, stagger: 0.08 },
        "-=0.65",
      );

      if (glow) {
        tl.fromTo(
          glow,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: DURATION.cinematic },
          0,
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  const action = cta ?? { label: primaryCta.label, href: primaryCta.href };
  const external = action.href.startsWith("http");

  return (
    <section className="relative isolate overflow-hidden pt-[calc(var(--header-offset)+4.75rem)] pb-10 sm:pb-14">
      {/* Aurora wash. Purely decorative, and the most expensive thing here
          to paint — hence one blurred gradient rather than stacked layers. */}
      <div
        aria-hidden="true"
        data-hero-aurora
        className="pointer-events-none absolute left-1/2 top-[-18rem] -z-10 h-[38rem] w-[min(78rem,120vw)] -translate-x-1/2 opacity-0 blur-[90px] [background:radial-gradient(45%_50%_at_30%_50%,rgba(var(--brand-blue-rgb),0.18),transparent_70%),radial-gradient(40%_50%_at_70%_45%,rgba(139,92,246,0.16),transparent_70%)]"
      />

      {/* A faint engineering grid, faded out before it reaches the copy.
          It gives the empty space above the fold some structure without
          competing with the heading. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] opacity-[0.5] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent_75%)]"
      />

      <Container>
        <div
          ref={rootRef}
          className={cn(
            media &&
              "grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]",
          )}
        >
          <div className={cn(!media && "max-w-[54rem]")}>
          <div data-hero-item className="opacity-0">
            <Breadcrumbs steps={breadcrumbs} />
          </div>

          <div data-hero-item className="mt-6 opacity-0">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>

          {/* Each word gets a clipping wrapper so the slide reads as type
              rising off a baseline rather than drifting up from nowhere. */}
          <h1 className="text-display mt-5 text-[clamp(2.25rem,5.4vw,4rem)] font-medium leading-[1.04] tracking-[-0.035em]">
            {title.split(" ").map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="inline-block overflow-hidden pb-[0.08em] align-bottom"
              >
                <span data-hero-word className="inline-block will-change-transform">
                  {word}
                </span>
                {index < title.split(" ").length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <p
            data-hero-item
            className="mt-5 max-w-[42rem] text-[1.0625rem] leading-relaxed text-muted-strong opacity-0 sm:text-[1.125rem]"
          >
            {intro}
          </p>

          {highlights?.length ? (
            <ul
              data-hero-item
              className="mt-6 flex flex-wrap gap-2 opacity-0"
            >
              {highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-pill border border-line bg-surface-soft px-3.5 py-1.5 text-[0.875rem] text-muted-strong"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          <div data-hero-item className="mt-8 flex flex-wrap items-center gap-3 opacity-0">
            <Link
              href={action.href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={cn(
                "bg-brand shadow-brand group inline-flex h-12 items-center gap-2 rounded-pill pl-6 pr-5 text-[0.9375rem] font-medium text-white",
                "transition-[box-shadow,transform,filter] duration-200 ease-[var(--ease-out-soft)]",
                "hover:-translate-y-px hover:brightness-[1.07] hover:shadow-brand-hover",
              )}
            >
              {action.label}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>

            <span className="text-[0.875rem] text-muted">
              Free during Beta. Nothing ships without your approval.
            </span>
          </div>
        </div>

          {media ? (
            <div data-hero-item className="opacity-0">
              {/* Tilted very slightly, and straightening on hover: enough
                  to read as an object on the page rather than a flat
                  screenshot dropped into a column. */}
              <div className="glass-sheen group relative overflow-hidden rounded-frame border border-line bg-surface-soft shadow-cinema transition-transform duration-700 ease-[var(--ease-out-soft)] [transform:perspective(1200px)_rotateY(-6deg)_rotateX(2deg)] hover:[transform:perspective(1200px)_rotateY(0deg)_rotateX(0deg)]">
                <Image
                  src={media.src}
                  alt={media.alt}
                  width={1100}
                  height={850}
                  priority
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
