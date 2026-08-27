import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  /**
   * One entry per visual line. Line breaks are authored, not computed.
   * A line may be a node rather than a string, so part of it can be set
   * in the highlight face via <Highlight>.
   */
  lines: readonly ReactNode[];
  className?: string;
  lineClassName?: string;
  /** Applied to the final line — used for the accent-toned closing clause. */
  accentLastLine?: boolean;
}

/**
 * Renders text as masked lines so GSAP can slide each line up from its own
 * clipping box. Server-rendered: the markup is complete without JS.
 */
export function AnimatedText({
  lines,
  className,
  lineClassName,
  accentLastLine = false,
}: AnimatedTextProps) {
  return (
    <span className={cn("block", className)}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-[0.08em]">
          <span
            data-hero-line
            className={cn(
              "block",
              accentLastLine && index === lines.length - 1 && "text-accent",
              lineClassName,
            )}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
