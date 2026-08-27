/**
 * Hero backdrop.
 *
 * Layered rather than flat: a dot field for texture, converging guide lines
 * that point at the prompt bar, a soft brand aurora low in the frame, and a
 * spotlight that keeps the headline sitting on clean paper.
 *
 * The key light is deliberately *not* opaque. An earlier version painted it
 * at 0.97 white across the top two-thirds, which flattened every layer under
 * it — the grid and the colour were both present in the markup and invisible
 * on screen.
 *
 * Everything here is decorative and hidden from assistive tech.
 */
export function HeroGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />

      {/* Dot field. Finer than a grid and less literal, so it reads as
          texture rather than as a chart behind the headline. */}
      <div className="cx-dots mask-fade-edges absolute inset-x-0 top-0 h-[85vh] [mask-image:linear-gradient(to_bottom,#000_35%,transparent)]" />

      {/* Guide lines converging on the prompt bar, echoing the connectors
          that fan out of it below. */}
      <svg
        className="absolute inset-x-0 top-0 h-[70vh] w-full"
        viewBox="0 0 1200 700"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="cx-hero-guide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity="0" />
            <stop
              offset="100%"
              stopColor="var(--brand-violet)"
              stopOpacity="0.13"
            />
          </linearGradient>
        </defs>

        {[80, 300, 900, 1120].map((x) => (
          <path
            key={x}
            d={`M${x} 0 C${x} 320 600 400 600 700`}
            fill="none"
            stroke="url(#cx-hero-guide)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Brand aurora.

          Two volumes rather than three, at a much smaller blur radius. A
          radial-gradient is already soft, so an 80px blur on top of it was
          buying almost nothing visible while forcing the browser to
          rasterise several times the viewport area on every frame. The
          opacity is raised to compensate for the tighter falloff. */}
      <div className="absolute inset-x-0 bottom-[-18vh] h-[85vh]">
        <div className="cx-drift absolute bottom-[10vh] left-[2vw] h-[58vh] w-[62vw] rounded-[50%] bg-[radial-gradient(closest-side,rgba(0,123,255,0.26),rgba(0,123,255,0.13)_48%,transparent)]" />
        <div className="cx-drift absolute right-[0vw] bottom-[4vh] h-[52vh] w-[56vw] rounded-[50%] bg-[radial-gradient(closest-side,rgba(208,0,255,0.20),rgba(208,0,255,0.10)_48%,transparent)] [animation-delay:-7s]" />
      </div>

      {/* A single bright bloom directly behind the prompt bar, so the focal
          point of the hero is also the brightest point of the backdrop. */}
      <div className="absolute top-[38vh] left-1/2 h-[42vh] w-[70vw] max-w-[900px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.9),transparent)]" />

      {/* Spotlight on the headline. Falls off quickly rather than covering
          the frame, so the layers above stay visible at the edges. */}
      <div className="absolute top-[-30vh] left-1/2 h-[72vh] w-[110vw] max-w-[1500px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.82),transparent)]" />

      {/* Grounding wash so the devices don't float on raw colour. */}
      <div className="absolute inset-x-0 bottom-0 h-[24vh] bg-[linear-gradient(to_top,var(--background),transparent)]" />

      {/* No blend mode: mix-blend-multiply makes the compositor re-blend
          everything beneath this layer on every frame the aurora moves.
          Over an off-white page a plain low-opacity overlay is visually
          equivalent and composites once. */}
      <div className="bg-noise absolute inset-0 opacity-[0.03]" />
    </div>
  );
}
