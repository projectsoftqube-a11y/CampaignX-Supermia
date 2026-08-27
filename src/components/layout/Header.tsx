"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileNav } from "@/components/navigation/MobileNav";
import { Logo } from "@/components/ui/Logo";
import { primaryCta, secondaryCta } from "@/config/navigation";
import { gsap, prefersReducedMotion } from "@/lib/animations/gsap";
import { onScrollThreshold } from "@/lib/animations/scroll";
import { HEADER_SCROLL_THRESHOLD } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Floating rail. Transparent at rest, glass after the first scroll step.
 * The state swap is a CSS transition; only the entrance uses GSAP.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => onScrollThreshold(HEADER_SCROLL_THRESHOLD, setScrolled), []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rail,
        { autoAlpha: 0, y: -18 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.05 },
      );
    }, rail);

    return () => ctx.revert();
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[var(--header-offset)]">
      <div className="mx-auto w-full max-w-[calc(var(--header-max)+2.5rem)] px-5 sm:px-8">
        <div
          ref={railRef}
          className={cn(
            "pointer-events-auto flex h-16 items-center justify-between gap-6 rounded-pill pl-4 pr-2 sm:pl-5 sm:pr-3",
            "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[var(--ease-out-soft)]",
            scrolled
              ? "border border-[var(--border-glass)] bg-white/72 shadow-soft backdrop-blur-[20px] backdrop-saturate-150"
              : "border border-transparent bg-transparent shadow-none",
          )}
        >
          <Link
            href="#hero"
            className="rounded-pill py-1 transition-opacity duration-300 hover:opacity-70"
            aria-label="CampaignX home"
          >
            <Logo />
          </Link>

          <DesktopNav />

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href={secondaryCta.href}
              className="hidden h-9 items-center rounded-pill px-3.5 text-[0.9375rem] text-muted-strong transition-colors hover:text-foreground sm:inline-flex"
            >
              {secondaryCta.label}
            </Link>

            <Link
              href={primaryCta.href}
              className="bg-brand shadow-brand group hidden h-11 items-center gap-2 rounded-pill pl-5 pr-4 text-[0.9375rem] font-medium text-white transition-[box-shadow,transform,filter] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:brightness-[1.07] hover:shadow-brand-hover sm:inline-flex"
            >
              {primaryCta.label}
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
