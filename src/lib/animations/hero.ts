"use client";

import { DURATION, EASE, gsap, prefersReducedMotion } from "./gsap";

export interface HeroRefs {
  readonly root: HTMLElement;
  readonly lines: readonly HTMLElement[];
  readonly supporting: HTMLElement | null;
  readonly prompt: HTMLElement | null;
  readonly devices: readonly HTMLElement[];
}

/**
 * Page-load choreography for the hero.
 *
 * Order: headline lines -> supporting -> prompt bar -> devices.
 * The brief typing and the connector draw are a second act, kicked off by
 * `playBriefSequence` once this timeline has settled — keeping the two
 * readable in isolation.
 */
export function playHeroIntro(
  refs: HeroRefs,
  /** Fired once the copy is on screen for good. */
  onRevealed?: () => void,
): gsap.core.Timeline {
  const { lines, supporting, prompt, devices } = refs;
  const tl = gsap.timeline({
    defaults: { ease: EASE.out },
    onComplete: onRevealed,
  });

  const everything = [...lines, supporting, prompt, ...devices].filter(
    (el): el is HTMLElement => el !== null,
  );

  if (prefersReducedMotion()) {
    tl.set(everything, { opacity: 1, y: 0, scale: 1, clearProps: "transform" });
    return tl;
  }

  if (lines.length) {
    tl.fromTo(
      lines,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        /* Deliberately quicker than the rest of the cascade. `expo.out`
           spends its final third covering the last few percent, so a 1.4s
           headline keeps visibly creeping long after it has effectively
           arrived, which reads as the page still loading. */
        duration: 0.72,
        stagger: 0.07,
        ease: EASE.expo,
        /* Drop the inline transform once each line has arrived. Without
           this the line keeps a `translate` GSAP owns, and any later React
           re-render that discards it leaves the line offset inside its
           overflow-hidden box — which reads as the headline vanishing. */
        clearProps: "transform",
      },
      0.05,
    );
  }

  if (supporting) {
    tl.fromTo(
      supporting,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5 },
      0.34,
    );
  }

  /* The prompt bar is the focal point — it lands with a little more weight
     than the copy around it, scaling up from just under full size. */
  if (prompt) {
    tl.fromTo(
      prompt,
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: DURATION.slow },
      0.46,
    );
  }

  if (devices.length) {
    tl.fromTo(
      devices,
      { opacity: 0, y: 44, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: DURATION.slow,
        stagger: 0.09,
        ease: EASE.expo,
      },
      0.62,
    );
  }

  return tl;
}

/**
 * Typing speed, in characters per second. Slow enough to actually read
 * along with, which is the whole point of showing it being typed.
 */
const TYPE_SPEED = 19;
/** Backspacing is always quicker than typing, or the loop drags. */
const ERASE_SPEED = 75;
/** How long a finished brief sits on screen, fully typed, before clearing. */
const HOLD = 2.8;

/** Drives `el.textContent` from one string length to another. */
function typeTween(
  el: HTMLElement,
  text: string,
  from: number,
  to: number,
  speed: number,
): gsap.core.Tween {
  const state = { chars: from };
  return gsap.to(state, {
    chars: to,
    duration: Math.abs(to - from) / speed,
    ease: "none",
    onUpdate: () => {
      el.textContent = text.slice(0, Math.round(state.chars));
    },
  });
}

/**
 * The looping typewriter in the prompt bar.
 *
 * Types a brief, holds it, backspaces it, then moves to the next one and
 * repeats forever. Returned as its own timeline so the caller can start it
 * independently of the one-shot connector draw.
 *
 * Under reduced motion it writes the first brief once and stops — a loop
 * that never settles is exactly what that preference asks us not to do.
 */
export function playBriefTypewriter(
  typed: HTMLElement | null,
  caret: HTMLElement | null,
  briefs: readonly string[],
): gsap.core.Timeline {
  const tl = gsap.timeline({ repeat: -1 });
  if (!typed || !briefs.length) return tl;

  if (prefersReducedMotion()) {
    typed.textContent = briefs[0];
    if (caret) gsap.set(caret, { opacity: 0 });
    return gsap.timeline();
  }

  /* The caret blinks continuously on its own timeline, so it keeps ticking
     through both the typing and the pauses. */
  if (caret) {
    gsap.set(caret, { opacity: 1 });
    gsap.to(caret, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });
  }

  briefs.forEach((brief) => {
    tl.add(typeTween(typed, brief, 0, brief.length, TYPE_SPEED));
    tl.to({}, { duration: HOLD });
    tl.add(typeTween(typed, brief, brief.length, 0, ERASE_SPEED));
  });

  return tl;
}

export interface BriefRefs {
  /** The three connector paths, drawn via stroke-dashoffset. */
  readonly connectors: readonly SVGPathElement[];
  /** Travelling dashes that run each path once it has drawn. */
  readonly pulses: readonly SVGPathElement[];
  /** Rings where each connector meets its device. */
  readonly ports: readonly SVGCircleElement[];
  /** Device screens, which brighten as their connector lands. */
  readonly screens: readonly HTMLElement[];
}

/**
 * The one-shot half of act two: the three connectors draw downward out of
 * the prompt bar and each device screen wakes as its line lands.
 *
 * Separate from the typewriter because this happens once, on load, while the
 * typing loops forever.
 */
export function playBriefSequence(refs: BriefRefs): gsap.core.Timeline {
  const { connectors, pulses, ports, screens } = refs;
  const tl = gsap.timeline({ defaults: { ease: EASE.out } });

  if (prefersReducedMotion()) {
    if (connectors.length) tl.set(connectors, { strokeDashoffset: 0 });
    if (ports.length) tl.set(ports, { opacity: 1 });
    if (screens.length) tl.set(screens, { opacity: 1 });
    /* The travelling pulse is a loop, so it never starts here. */
    return tl;
  }

  /* The centre line leads, the outer two follow: the fan reads as the brief
     being routed outward rather than three lines dropping at once. */
  if (connectors.length) {
    tl.to(connectors, {
      strokeDashoffset: 0,
      duration: 0.78,
      stagger: { each: 0.12, from: "center" },
      ease: "power2.inOut",
    });
  }

  /* The ring pops as its line lands. */
  if (ports.length) {
    tl.fromTo(
      ports,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.34,
        stagger: { each: 0.12, from: "center" },
        ease: "back.out(2.4)",
        transformOrigin: "center",
      },
      0.5,
    );
  }

  if (screens.length) {
    tl.to(
      screens,
      { opacity: 1, duration: 0.6, stagger: { each: 0.12, from: "center" } },
      0.42,
    );
  }

  /* Once the wires are drawn, a packet runs each one continuously. The
     three are offset rather than synchronised, so the row always has one
     packet in flight somewhere and never reads as stopped. */
  if (pulses.length) {
    pulses.forEach((pulse, index) => {
      const length = pulse.getTotalLength();
      /* A dash the length of the path plus its own tail: the gap is what
         separates one packet from the next as the offset winds down. */
      const dash = 34;
      gsap.set(pulse, {
        strokeDasharray: `${dash} ${length}`,
        strokeDashoffset: length + dash,
        opacity: 0,
      });

      const CYCLE = 2.2;

      gsap
        .timeline({
          repeat: -1,
          delay: 1.2 + index * (CYCLE / pulses.length),
        })
        .set(pulse, { opacity: 0.9 })
        .fromTo(
          pulse,
          { strokeDashoffset: length + dash },
          { strokeDashoffset: 0, duration: CYCLE, ease: "none" },
        )
        /* Fade out over the last stretch so the packet arrives rather than
           vanishing at full strength. */
        .to(pulse, { opacity: 0, duration: 0.28 }, CYCLE - 0.28);

      /* The landing node answers each arrival with a small flare. */
      const port = ports[index];
      if (port) {
        gsap
          .timeline({
            repeat: -1,
            delay: 1.2 + index * (CYCLE / pulses.length) + CYCLE - 0.3,
          })
          .to(port, { scale: 1.9, duration: 0.22, transformOrigin: "center" })
          .to(port, { scale: 1, duration: 0.5, ease: "power2.out" });
      }
    });
  }

  return tl;
}

/** Prepares the connectors so they can be drawn. Call before the sequence. */
export function primeConnectors(paths: readonly SVGPathElement[]): void {
  paths.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: prefersReducedMotion() ? 0 : length,
    });
  });
}

/**
 * Scroll-linked hero exit.
 *
 * Only the copy fades. The device row is deliberately left alone: it holds
 * playing video and the connector lines are anchored to the phone columns,
 * so translating or scaling the stage would both wobble the footage and
 * pull the wires off their landing points. It stays put.
 */
export function createHeroScroll(
  root: HTMLElement,
  copy: HTMLElement | null,
): void {
  if (prefersReducedMotion() || !copy) return;

  gsap.to(copy, {
    opacity: 0.15,
    y: -28,
    ease: "none",
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "60% top",
      scrub: 0.6,
    },
  });
}
