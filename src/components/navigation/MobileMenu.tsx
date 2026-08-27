"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { navigation, primaryCta, secondaryCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { useLenisRef } from "@/hooks/useLenis";
import { gsap, prefersReducedMotion } from "@/lib/animations/gsap";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/**
 * The mobile menu.
 *
 * Rendered through a portal into `document.body`. The menu is declared
 * inside <Header>, which is `fixed z-50` and therefore its own stacking
 * context — inside it, `z-[60]` outranks only the header's own children,
 * so page sections kept painting over the panel however opaque it was.
 *
 * Responsibilities are split so nothing can disagree about visibility:
 *
 * - CSS, keyed off `data-state`, owns whether the panel is there: opacity,
 *   a small slide, and `visibility` on a delay so the fade finishes before
 *   the panel leaves the accessibility tree.
 * - GSAP owns only the rows inside it, and touches nothing on the panel.
 *
 * Nothing writes `display`. An earlier version set `display: block` from a
 * tween, which overrode the panel's `flex` and collapsed it to content
 * height — the menu became a small box with the page showing below it.
 *
 * The panel is a solid surface rather than a translucent scrim: a menu is
 * somewhere you are, not a filter over the page you left.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const lenisRef = useLenisRef();
  const panelRef = useRef<HTMLDivElement>(null);
  /* Portals need a DOM node, which does not exist during the server render.
     `useSyncExternalStore` with an always-empty subscription is the
     lint-clean way to say "false on the server, true on the client" without
     calling setState from an effect. */
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  /* The open and close choreography.

     GSAP animates opacity and transform only. It must never touch
     `display` or `visibility` here: an earlier version set `display:block`
     from a tween, which overrode the panel's own `flex` and collapsed it to
     content height. Whether the panel is laid out at all is decided by the
     `data-state` CSS below, which nothing else writes to. */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const ctx = gsap.context(() => {
      const rows = panel.querySelectorAll<HTMLElement>("[data-menu-row]");

      if (prefersReducedMotion()) {
        gsap.set([panel, rows], { clearProps: "all" });
        return;
      }

      if (open) {
        /* GSAP animates the rows only. The panel's own fade is the CSS
           transition on `data-state`; two systems writing `opacity` to the
           same element is what made earlier versions flicker. */
        gsap.fromTo(
          rows,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.045,
            ease: "power3.out",
            delay: 0.1,
          },
        );
      } else {
        /* Reset instantly rather than tweening out: the panel is already
           being faded by CSS on `data-state`, and a second competing
           animation is what made the old version flicker. */
        gsap.set(rows, { clearProps: "opacity,transform" });
      }
    }, panel);

    return () => ctx.revert();
  }, [open]);

  /* Escape to close, focus the close button, and stop the page scrolling
     underneath. Lenis has to be told separately: it drives scroll itself,
     so `overflow: hidden` on the body does not stop it. */
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

  if (!mounted) return null;

  /* Rendered into `document.body`, not where it sits in the tree.

     The menu lives inside <Header>, which is `fixed z-50` and therefore its
     own stacking context. Inside that context `z-[60]` only outranks other
     children of the header — it cannot rise above a page section, so the
     content behind kept painting over the panel however opaque it was. A
     portal takes the panel out of the header entirely, where its z-index is
     measured against the page and it covers the full viewport. */
  return createPortal(
    <div
      ref={panelRef}
      id="mobile-menu"
      data-state={open ? "open" : "closed"}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      /* `invisible` + `opacity-0` when closed rather than `hidden`: a
         display switch cannot be transitioned, and `visibility` can — with
         a delay, so the fade finishes before the panel leaves the
         accessibility tree. `lg:hidden` is unconditional, so this can never
         appear on a desktop viewport. */
      className={[
        "fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-background lg:hidden",
        "transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out-soft)]",
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-2 opacity-0 delay-[0ms,0ms,300ms]",
      ].join(" ")}
    >
      {/* Header row: the menu covers the page header, so it carries its
          own logo. Sticky, so the way out stays reachable after scrolling
          a long menu on a short phone. */}
      <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between gap-4 bg-background px-5 pt-[calc(var(--header-offset)+0.75rem)] pb-4 sm:px-8">
        <Link href="/" onClick={onClose} aria-label={siteConfig.name}>
          <Logo />
        </Link>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-pill border border-line bg-surface text-foreground transition-colors duration-200 hover:bg-surface-soft"
        >
          <X className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <nav
        aria-label="Mobile"
        className="flex flex-1 flex-col px-5 pb-8 sm:px-8"
      >
        <ul className="flex flex-col">
          {navigation.map((item) => (
            <li key={item.href} data-menu-row>
              {/* Label and description stacked: at 320px a large label and
                  its description cannot share a row without both wrapping
                  into each other. */}
              <Link
                href={item.href}
                onClick={onClose}
                className="group flex items-center justify-between gap-4 border-b border-line py-4"
              >
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-display text-[1.375rem] leading-tight tracking-[-0.02em]">
                    {item.label}
                  </span>
                  {item.description ? (
                    <span className="text-[0.8125rem] leading-snug text-muted">
                      {item.description}
                    </span>
                  ) : null}
                </span>

                <ArrowRight
                  className="size-4 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* The two ways in, pinned to the bottom of the panel when the menu
            is shorter than the screen and flowing after it when not. */}
        <div data-menu-row className="mt-auto flex flex-col gap-3 pt-8">
          <Link
            href={primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="bg-brand shadow-brand flex h-13 items-center justify-center gap-2 rounded-pill text-[0.9375rem] font-medium text-white"
          >
            {primaryCta.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>

          <Link
            href={secondaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex h-13 items-center justify-center rounded-pill border border-line bg-surface text-[0.9375rem] font-medium text-muted-strong"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </nav>
    </div>,
    document.body,
  );
}
