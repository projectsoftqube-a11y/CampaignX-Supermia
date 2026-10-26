"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { prefersReducedMotion } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils";

export interface FeatureCard {
  title: string;
  body: string;
  href?: string;
  /** Small label above the title, e.g. a channel name or step number. */
  kicker?: string;
}

interface FeatureGridProps {
  items: readonly FeatureCard[];
  /** 2 reads better for long bodies; 3 for short ones. */
  columns?: 2 | 3;
}

/**
 * Cards with a cursor-tracking sheen.
 *
 * The highlight follows the pointer through two CSS custom properties
 * written straight to the node. Writing a property is cheap and composites
 * on the GPU; re-rendering React on every mousemove is not.
 *
 * The effect is pointer-only decoration: it never moves layout, is hidden
 * from assistive tech, and is skipped entirely under reduced motion. A
 * card that is a link remains a plain <Link> underneath, so keyboard and
 * touch users get the same destination without the flourish.
 */
export function FeatureGrid({ items, columns = 3 }: FeatureGridProps) {
  return (
    <ul
      className={cn(
        "grid gap-4",
        columns === 3
          ? "sm:grid-cols-2 lg:grid-cols-3"
          : "sm:grid-cols-2",
      )}
    >
      {items.map((item) => (
        <Card key={item.title} item={item} />
      ))}
    </ul>
  );
}

function Card({ item }: { item: FeatureCard }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  const inner = (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group/card relative h-full overflow-hidden rounded-panel border border-line bg-surface p-6",
        "transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)]",
        "hover:-translate-y-0.5 hover:border-line-strong hover:shadow-raise",
      )}
    >
      {/* Sheen. Sits under the content and is hidden until hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 [background:radial-gradient(14rem_14rem_at_var(--mx,50%)_var(--my,0%),rgba(var(--brand-blue-rgb),0.07),transparent_70%)]"
      />

      <div className="relative">
        {item.kicker ? (
          <p className="text-eyebrow text-muted">{item.kicker}</p>
        ) : null}

        <h3
          className={cn(
            "text-display text-[1.1875rem] font-medium leading-snug tracking-[-0.015em]",
            item.kicker && "mt-2",
          )}
        >
          {item.title}
          {item.href ? (
            <ArrowUpRight
              aria-hidden="true"
              className="ml-1 inline size-4 -translate-y-px text-muted transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-1"
            />
          ) : null}
        </h3>

        <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-strong">
          {item.body}
        </p>
      </div>
    </div>
  );

  return (
    <li data-animate="reveal" className="h-full">
      {item.href ? (
        <Link href={item.href} className="block h-full rounded-panel">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </li>
  );
}
