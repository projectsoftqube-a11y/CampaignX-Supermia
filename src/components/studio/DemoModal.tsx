"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { Play, X } from "lucide-react";
import { demo } from "@/config/content";
import { useLenisRef } from "@/hooks/useLenis";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";
import { cn } from "@/lib/utils";

interface DemoModalProps {
  /** Button label. */
  label?: string;
  className?: string;
  /** `light` is the white pill used on dark grounds. */
  variant?: "light" | "ghost";
}

/**
 * "Watch the demo" as a modal on the current page.
 *
 * Previously this linked to `/#demo`, which took the visitor off the
 * page they were reading and, from an inner page, back to the homepage
 * entirely. A short video is a detour, not a destination, so it opens
 * over the page and closes back to the same scroll position.
 *
 * The iframe is only created once the modal opens, and torn down on
 * close, so no YouTube request is made on pages where nobody presses
 * play. `youtube-nocookie.com` is used for the same reason the inline
 * player on the homepage uses it.
 *
 * Dialog behaviour, all of it required for this to be usable:
 *   - Rendered through a portal, because the trigger often sits inside
 *     a transformed or `overflow-hidden` parent that would clip it.
 *   - Focus moves to the close button on open and returns to the
 *     trigger on close.
 *   - Tab is trapped inside the panel while it is open.
 *   - Escape closes, as does a click on the backdrop.
 *   - Page scroll is locked, including Lenis, which ignores
 *     `overflow: hidden` on its own.
 */
export function DemoModal({
  label = "Watch the 2-minute demo",
  className,
  variant = "light",
}: DemoModalProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lenisRef = useLenisRef();

  /* Portals need a DOM node, which does not exist on the server. */
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const close = useCallback(() => setOpen(false), []);

  /* Lock scrolling, trap focus, and wire Escape. */
  useEffect(() => {
    if (!open) return;

    const lenis = lenisRef.current;
    /* Captured now: by the time cleanup runs the ref may point at a
       different node, and focus would land somewhere unexpected. */
    const trigger = triggerRef.current;
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'button, [href], iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      /* Focus returns to the trigger, so a keyboard user is not dropped
         at the top of the document. */
      trigger?.focus();
    };
  }, [open, close, lenisRef]);

  /* The open animation. */
  useEffect(() => {
    if (!open) return;
    registerStudio();
    const panel = panelRef.current;
    if (!panel || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel,
        { opacity: 0, y: 24, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: T.md, ease: CX_EASE.out },
      );
    }, panel);

    return () => ctx.revert();
  }, [open]);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${demo.videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={cn(
          "group inline-flex h-12 items-center gap-2.5 rounded-pill pl-2 pr-5 text-[0.9375rem] font-medium",
          "transition-transform duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px",
          variant === "light"
            ? "bg-white text-foreground"
            : "border border-line-strong bg-surface text-foreground hover:bg-surface-soft",
          className,
        )}
      >
        <span className="bg-brand flex size-8 items-center justify-center rounded-full text-white">
          <Play aria-hidden="true" className="size-3 fill-current" />
        </span>
        {label}
      </button>

      {mounted && open
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
              role="dialog"
              aria-modal="true"
              aria-label={demo.title}
            >
              {/* Backdrop. A button so a pointer click closes, but hidden
                  from assistive tech: Escape is the documented path. */}
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={close}
                className="absolute inset-0 cursor-default bg-ink-deep/80 backdrop-blur-[6px]"
              />

              <div
                ref={panelRef}
                className="relative w-full max-w-[64rem] overflow-hidden rounded-frame border border-[var(--ink-line-strong)] bg-ink-deep shadow-cinema"
              >
                <div className="flex items-center gap-3 border-b border-[var(--ink-line)] px-5 py-3.5">
                  <span className="min-w-0">
                    <span className="block truncate text-[0.875rem] font-medium text-white">
                      {demo.videoTitle}
                    </span>
                    <span className="block text-[0.875rem] text-white/45">
                      {demo.channel} · {demo.duration}
                    </span>
                  </span>

                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    className="ml-auto flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--ink-line)] text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                  >
                    <X aria-hidden="true" className="size-4" />
                    <span className="sr-only">Close the demo</span>
                  </button>
                </div>

                {/* 16:9, so the panel never jumps as the player loads. */}
                <div className="relative aspect-video w-full bg-black">
                  <iframe
                    src={embedUrl}
                    title={demo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 size-full"
                  />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
