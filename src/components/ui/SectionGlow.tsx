import { cn } from "@/lib/utils";

interface SectionGlowProps {
  /**
   * Where the light sits. Alternating these down the page keeps the glows
   * from stacking into one continuous wash — the effect only reads if each
   * section's light lands somewhere different from its neighbour's.
   */
  position?: "left" | "right" | "center";
  className?: string;
}

/** Where the light's centre sits, as a background-position. */
const POSITIONS = {
  left: "18% 30%",
  right: "82% 35%",
  center: "50% 25%",
} as const;

/**
 * A single soft brand light behind a section.
 *
 * Deliberately one volume, not a mesh: several sections in a row each
 * carrying their own gradient becomes a tinted page rather than a set of
 * accents. Kept at low opacity and heavily blurred so it reads as light on
 * paper rather than as a coloured shape.
 *
 * Painted as a background gradient on a full-bleed layer rather than as a
 * blurred circle inside an overflow-hidden box. A bounded circle ends where
 * the element ends, which draws a visible edge across the section and makes
 * one section read as two.
 *
 * Decorative and hidden from assistive tech. Sits at -z-10, so any section
 * using it needs `isolate` to keep the glow from escaping behind the
 * section above.
 */
export function SectionGlow({
  position = "left",
  className,
}: SectionGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      style={{
        backgroundImage: `radial-gradient(60% 55% at ${POSITIONS[position]}, rgba(var(--brand-blue-rgb), 0.07), rgba(138, 43, 226, 0.04) 55%, transparent 78%)`,
      }}
    />
  );
}
