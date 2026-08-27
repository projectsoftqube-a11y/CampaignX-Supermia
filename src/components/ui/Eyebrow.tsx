import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: string;
  className?: string;
  /** Opts the eyebrow into an enclosing <Reveal> stagger. */
  "data-animate"?: "reveal";
  /**
   * `invert` for dark surfaces. The default rules and label are tuned for
   * the off-white page and disappear against `bg-foreground`.
   */
  tone?: "default" | "invert";
}

/**
 * A section eyebrow.
 *
 * Deliberately not the dot-in-a-pill every SaaS page uses. The label sits
 * between two short rules that fade out from it, with a small gradient
 * marker on the left — so it reads as a chapter heading on the page rather
 * than a badge stuck on top of one.
 *
 * The rules are decorative and hidden from assistive tech; the label is
 * plain text, so it still reads correctly as the section's kicker.
 */
export function Eyebrow({
  children,
  className,
  "data-animate": dataAnimate,
  tone = "default",
}: EyebrowProps) {
  const invert = tone === "invert";
  return (
    <span
      data-animate={dataAnimate}
      className={cn("inline-flex items-center gap-3 sm:gap-4", className)}
    >
      {/* Left rule, fading in toward the label. */}
      <span
        aria-hidden="true"
        className={cn(
          "hidden h-px w-8 sm:block",
          invert
            ? "bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.35))]"
            : "bg-[linear-gradient(to_right,transparent,var(--border-strong))]",
        )}
      />

      {/* The marker: two stacked bars in the brand ramp, the shorter one
          offset — a small piece of the logo's own geometry. */}
      <span aria-hidden="true" className="flex items-center gap-[3px]">
        <span className="bg-brand block h-2.5 w-[3px] rounded-full" />
        <span className="bg-brand block h-1.5 w-[3px] rounded-full opacity-50" />
      </span>

      <span
        className={cn(
          "text-eyebrow whitespace-nowrap",
          invert && "text-white/45",
        )}
      >
        {children}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "hidden h-px w-8 sm:block",
          invert
            ? "bg-[linear-gradient(to_left,transparent,rgba(255,255,255,0.35))]"
            : "bg-[linear-gradient(to_left,transparent,var(--border-strong))]",
        )}
      />
    </span>
  );
}
