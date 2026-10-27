"use client";

import { useEffect, useRef } from "react";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";
import type { PlatformName } from "@/types/content";
import { cn } from "@/lib/utils";

interface ScheduleBoardProps {
  className?: string;
}

/**
 * One campaign laid out across one calendar.
 *
 * The claim on this page is that a campaign is scheduled from a single
 * place rather than in six separate tools. A list of channel names
 * cannot say that; a grid where every channel occupies the same two
 * weeks can.
 *
 * Construction:
 *   - A fortnight along the top, with today marked.
 *   - One row per channel, each with its posts placed on real days.
 *   - Blocks scale in from their left edge, row by row, so the board
 *     fills the way a schedule does.
 *   - A playhead then sweeps the fortnight continuously, and each block
 *     it passes flips from scheduled to published.
 */

const DAYS = ["M", "T", "W", "T", "F", "S", "S", "M", "T", "W", "T", "F", "S", "S"];

/** `day` is a 0-based index into the fortnight; `span` is in days. */
const ROWS: readonly {
  channel: PlatformName;
  label: string;
  posts: readonly { day: number; span: number }[];
}[] = [
  {
    channel: "instagram",
    label: "Instagram",
    posts: [
      { day: 0, span: 2 },
      { day: 5, span: 2 },
      { day: 10, span: 2 },
    ],
  },
  {
    channel: "facebook",
    label: "Facebook",
    posts: [
      { day: 1, span: 2 },
      { day: 8, span: 2 },
    ],
  },
  {
    channel: "linkedin",
    label: "LinkedIn",
    posts: [
      { day: 2, span: 3 },
      { day: 9, span: 2 },
    ],
  },
  {
    channel: "email",
    label: "Email",
    posts: [
      { day: 0, span: 2 },
      { day: 7, span: 2 },
    ],
  },
  {
    channel: "sms",
    label: "SMS",
    posts: [{ day: 12, span: 2 }],
  },
];

export function ScheduleBoard({ className }: ScheduleBoardProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerStudio();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const head = root.querySelectorAll<HTMLElement>("[data-day]");
      const rows = root.querySelectorAll<HTMLElement>("[data-row]");
      const blocks = root.querySelectorAll<HTMLElement>("[data-block]");
      const playhead = root.querySelector<HTMLElement>("[data-playhead]");

      if (prefersReducedMotion()) return;

      gsap.set(head, { opacity: 0, y: -6 });
      gsap.set(rows, { opacity: 0, x: -10 });
      gsap.set(blocks, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(playhead, { opacity: 0 });

      gsap
        .timeline({
          defaults: { ease: CX_EASE.out },
          scrollTrigger: { trigger: root, start: "top 84%", once: true },
        })
        .to(head, { opacity: 1, y: 0, duration: T.sm, stagger: 0.02 })
        .to(rows, { opacity: 1, x: 0, duration: T.sm, stagger: 0.07 }, "-=0.2")
        /* The board fills row by row, the way a schedule is built. */
        .to(
          blocks,
          { scaleX: 1, duration: T.md, stagger: 0.045, ease: CX_EASE.inOut },
          "-=0.3",
        )
        .to(playhead, { opacity: 1, duration: T.xs });

      /* The playhead sweeps the fortnight, and each block it passes
         flips to published. This is the whole point of one calendar:
         the campaign runs itself once approved. */
      const sweep = { t: 0 };
      gsap.to(sweep, {
        t: 1,
        duration: 7,
        repeat: -1,
        repeatDelay: 1.2,
        delay: 2.2,
        ease: "none",
        onUpdate: () => {
          if (playhead) playhead.style.left = `${sweep.t * 100}%`;
          blocks.forEach((block) => {
            const start = Number(block.dataset.start ?? 0);
            const done = sweep.t >= start;
            block.dataset.sent = done ? "true" : "false";
          });
        },
        onRepeat: () => {
          blocks.forEach((b) => {
            b.dataset.sent = "false";
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn(
        "relative select-none overflow-hidden rounded-panel border border-line bg-surface p-3 shadow-float sm:p-4",
        className,
      )}
    >
      {/* Header: the fortnight. */}
      <div className="flex items-center gap-2">
        <span className="w-[4.5rem] shrink-0 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted sm:w-[5.5rem]">
          Fortnight
        </span>
        <div className="grid flex-1 grid-cols-[repeat(14,minmax(0,1fr))] gap-[2px]">
          {DAYS.map((d, i) => (
            <span
              key={i}
              data-day
              className={cn(
                "text-center text-[0.6875rem] tabular-nums",
                i % 7 >= 5 ? "text-muted/50" : "text-muted",
              )}
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* The rows. */}
      <div className="relative mt-2 space-y-1.5">
        {ROWS.map((row) => (
          <div key={row.channel} data-row className="flex items-center gap-2">
            <span className="flex w-[4.5rem] shrink-0 items-center gap-1.5 sm:w-[5.5rem]">
              <BrandGlyph name={row.channel} className="size-3 shrink-0" />
              <span className="truncate text-[0.875rem] text-muted-strong">
                {row.label}
              </span>
            </span>

            <div className="relative grid flex-1 grid-cols-[repeat(14,minmax(0,1fr))] gap-[2px]">
              {/* The empty track. */}
              {DAYS.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-4 rounded-[2px]",
                    i % 7 >= 5 ? "bg-surface-sunk/60" : "bg-surface-soft",
                  )}
                />
              ))}

              {/* The scheduled posts, laid over it. */}
              {row.posts.map((post) => (
                <span
                  key={post.day}
                  data-block
                  data-start={(post.day / DAYS.length).toFixed(3)}
                  data-sent="false"
                  style={{
                    gridColumn: `${post.day + 1} / span ${post.span}`,
                    gridRow: 1,
                  }}
                  className={cn(
                    "h-4 rounded-[3px] transition-colors duration-300",
                    "data-[sent=false]:bg-[rgba(var(--brand-blue-rgb),0.28)]",
                    "data-[sent=true]:bg-brand",
                  )}
                />
              ))}
            </div>
          </div>
        ))}

        {/* The playhead, sweeping the fortnight. */}
        <span
          data-playhead
          className="pointer-events-none absolute inset-y-0 left-0 ml-[4.5rem] w-px bg-accent opacity-0 sm:ml-[5.5rem]"
          style={{ left: "0%" }}
        >
          <span className="bg-accent absolute -top-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full" />
        </span>
      </div>

      <p className="mt-3 border-t border-line pt-2.5 text-[0.875rem] text-muted">
        One campaign, one calendar — scheduled once your approver signs off
      </p>
    </div>
  );
}
