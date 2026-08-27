"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { navigation, primaryCta, secondaryCta } from "@/config/navigation";
import { useLenisRef } from "@/hooks/useLenis";
import { gsap, prefersReducedMotion } from "@/lib/animations/gsap";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lenisRef = useLenisRef();

  /* Animate in/out. */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const ctx = gsap.context(() => {
      const items = panel.querySelectorAll<HTMLElement>("[data-menu-item]");

      if (prefersReducedMotion()) {
        gsap.set(panel, { autoAlpha: open ? 1 : 0 });
        gsap.set(items, { autoAlpha: open ? 1 : 0, y: 0 });
        return;
      }

      if (open) {
        gsap
          .timeline()
          .set(panel, { display: "block" })
          .fromTo(
            panel,
            { autoAlpha: 0, yPercent: -3 },
            { autoAlpha: 1, yPercent: 0, duration: 0.45, ease: "power3.out" },
          )
          .fromTo(
            items,
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.06,
              ease: "power3.out",
            },
            0.08,
          );
      } else {
        gsap.to(panel, {
          autoAlpha: 0,
          yPercent: -3,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => gsap.set(panel, { display: "none" }),
        });
      }
    }, panel);

    return () => ctx.revert();
  }, [open]);

  /* Escape to close, focus management, scroll lock. */
  useEffect(() => {
    const lenis = lenisRef.current;

    if (!open) {
      lenis?.start();
      return;
    }

    lenis?.stop();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open, onClose, lenisRef]);

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      hidden={!open}
      className="fixed inset-0 z-[60] hidden lg:!hidden"
    >
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-[28px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="relative flex h-full flex-col px-5 pt-[calc(var(--header-offset)+0.75rem)] pb-10 sm:px-8"
      >
        <div className="flex h-16 items-center justify-end">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="glass-strong flex size-11 cursor-pointer items-center justify-center rounded-pill"
          >
            <span aria-hidden="true" className="relative block size-4">
              <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-foreground" />
              <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-foreground" />
            </span>
          </button>
        </div>

        <nav aria-label="Mobile" className="mt-6 flex-1">
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.href} data-menu-item className="border-b border-line/70">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-baseline justify-between gap-4 py-5"
                >
                  <span className="text-display text-[2rem] tracking-[-0.03em]">
                    {item.label}
                  </span>
                  {item.description ? (
                    <span className="text-sm text-muted">{item.description}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div data-menu-item className="mt-8 flex flex-col gap-3">
          <Link
            href={primaryCta.href}
            onClick={onClose}
            className="bg-brand shadow-brand flex h-14 items-center justify-center gap-2 rounded-pill text-base font-medium text-white"
          >
            {primaryCta.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href={secondaryCta.href}
            onClick={onClose}
            className="flex h-14 items-center justify-center rounded-pill border border-line text-base text-muted-strong"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
