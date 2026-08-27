/**
 * The three connectors running from the prompt bar down into the devices.
 *
 * `preserveAspectRatio="none"` is deliberate: it maps the viewBox exactly
 * onto the container box, so x=168/500/832 land on the three device centres
 * at every viewport. (With `meet` the SVG letterboxes at wide sizes and the
 * lines drift off their targets.) The cost is that the curve stretches
 * horizontally, which is why the control points below are shallow — they
 * are drawn to look right *after* the stretch, not before it.
 *
 * Each connector is four layers: a faint rail so the route reads before the
 * draw finishes, the gradient stroke GSAP draws in, a travelling dash that
 * runs continuously afterwards, and a node where the line meets its device.
 */

/** x-positions of the three device columns, in viewBox units. */
const COLUMNS = [168, 500, 832] as const;

/**
 * Paths run the full height (y 0 to 168) and end just past the bottom edge,
 * so each line disappears *behind* the device it feeds rather than stopping
 * short of it. The outer two ease outward then drop in vertically.
 */
function connectorPath(x: number): string {
  /* The middle wire is drawn with a half-unit of horizontal travel rather
     than as a true vertical. Under `preserveAspectRatio="none"` a path with
     zero width has a degenerate bounding box, and the stroke can collapse
     to nothing — the line simply does not render. The offset is invisible
     but gives the path real width, so it always draws. */
  if (x === 500) return "M499.75 0 C499.75 60 500.25 108 500.25 168";
  return `M500 0 C500 74 ${x} 66 ${x} 168`;
}

export function HeroRouting() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 168"
      preserveAspectRatio="none"
      className="-mb-4 block h-24 w-full overflow-visible sm:h-28 lg:h-32"
    >
      <defs>
        <linearGradient id="cx-wire" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity="0.95" />
          <stop offset="50%" stopColor="var(--brand-violet)" stopOpacity="0.8" />
          <stop
            offset="100%"
            stopColor="var(--brand-magenta)"
            stopOpacity="0.45"
          />
        </linearGradient>

        <linearGradient id="cx-wire-rail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand-violet)" stopOpacity="0.18" />
          <stop
            offset="100%"
            stopColor="var(--brand-violet)"
            stopOpacity="0.06"
          />
        </linearGradient>

        <radialGradient id="cx-node-glow">
          <stop offset="0%" stopColor="var(--brand-violet)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--brand-violet)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {COLUMNS.map((x) => {
        const d = connectorPath(x);
        return (
          <g key={x}>
            <path
              d={d}
              fill="none"
              stroke="url(#cx-wire-rail)"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
            />

            <path
              data-hero-connector
              d={d}
              fill="none"
              stroke="url(#cx-wire)"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* Travelling packet. Runs the wire on a continuous loop. */}
            <path
              data-hero-pulse
              d={d}
              fill="none"
              stroke="var(--brand-violet)"
              strokeWidth="2.25"
              strokeLinecap="round"
              opacity="0"
              vectorEffect="non-scaling-stroke"
            />

            {/* Landing node, sitting on the device's top edge. */}
            <circle
              data-hero-port
              cx={x}
              cy="160"
              r="3"
              fill="var(--brand-violet)"
              opacity="0"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}

      {/* Junction, where all three leave the prompt bar. */}
      <ellipse cx="500" cy="2" rx="30" ry="24" fill="url(#cx-node-glow)" />
      <circle cx="500" cy="2" r="4" fill="var(--brand-blue)" />
    </svg>
  );
}
