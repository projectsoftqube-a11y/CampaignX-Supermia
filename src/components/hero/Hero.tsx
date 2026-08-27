"use client";

import { useEffect, useRef, useState } from "react";
import { HeroContent } from "./HeroContent";
import { HeroGlow } from "./HeroGlow";
import { HeroPrompt } from "./HeroPrompt";
import { HeroRouting } from "./HeroRouting";
import { PhoneMock } from "./PhoneMock";
import { gsap, registerGsap } from "@/lib/animations/gsap";
import {
  createHeroScroll,
  playBriefSequence,
  playBriefTypewriter,
  playHeroIntro,
  primeConnectors,
  type BriefRefs,
  type HeroRefs,
} from "@/lib/animations/hero";
import { hero } from "@/config/content";
import { SECTION_IDS } from "@/lib/constants";

/**
 * Hero layout + GSAP orchestration. All animation logic lives in
 * lib/animations/hero.ts; this component only supplies the elements.
 *
 * `data-hero-state` is React-owned rather than a class GSAP writes to the DOM.
 * The pre-reveal CSS is keyed on the "idle" value, so once the intro reports
 * back the copy can never be hidden again — even if React re-creates these
 * nodes and discards GSAP's inline styles.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "revealed">("idle");
  /* Drives the ambient aurora. Starts active so the hero is never a frame
     late on first paint; the observer below only ever turns it off. */
  const [ambient, setAmbient] = useState<"active" | "idle">("active");
  /* Populated by the GSAP effect below, read by the observer. A ref rather
     than state: the observer only ever reads it, and re-rendering the hero
     to store a list of timelines would discard the styles GSAP owns. */
  const loopsRef = useRef<gsap.core.Timeline[]>([]);

  /* The aurora, the connector pulses and the device videos are all purely
     decorative, and all of them kept the compositor busy for the entire
     length of the page — the hero is the only section that animates
     continuously, which is why it was the only one dropping frames.
     Everything here stops the moment the section leaves the viewport. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setAmbient(visible ? "active" : "idle");
        /* GSAP keeps ticking a paused timeline's parent but does no work on
           the timeline itself, so this takes the packet, flare and
           typewriter loops to zero cost while the hero is off screen. */
        for (const loop of loopsRef.current) {
          if (visible) loop.resume();
          else loop.pause();
        }

        /* Video decoding is the other continuous cost here. Two clips
           decoding behind the rest of the page buys nothing once the hero
           is scrolled past. `play()` rejects if it is interrupted, which
           is not an error worth surfacing. */
        for (const video of root.querySelectorAll("video")) {
          if (visible) void video.play().catch(() => {});
          else video.pause();
        }
      },
      /* A small margin so the aurora is already running by the time any of
         it is actually on screen, rather than starting as it appears. */
      { rootMargin: "150px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    registerGsap();

    const root = rootRef.current;
    if (!root) return;

    /* Failsafe. The headline is the most important text on the page, so it
       must not depend on GSAP reporting back: a blocked script, a stalled
       ticker or a thrown tween would otherwise leave it hidden for good.
       Comfortably longer than the intro (~1.9s) so it only ever fires when
       something has genuinely gone wrong. Firing while the intro is still
       running would re-render mid-tween and strip the styles GSAP owns. */
    const failsafe = window.setTimeout(() => setState("revealed"), 3200);

    const ctx = gsap.context(() => {
      const query = <T extends Element>(selector: string): T[] =>
        Array.from(root.querySelectorAll<T>(selector));

      const devices = query<HTMLElement>("[data-hero-device]");
      const connectors = query<SVGPathElement>("[data-hero-connector]");

      const refs: HeroRefs = {
        root,
        lines: query<HTMLElement>("[data-hero-line]"),
        supporting: root.querySelector("[data-hero-supporting]"),
        prompt: root.querySelector("[data-hero-prompt]"),
        devices,
      };

      const brief: BriefRefs = {
        connectors,
        pulses: query<SVGPathElement>("[data-hero-pulse]"),
        ports: query<SVGCircleElement>("[data-hero-port]"),
        screens: query<HTMLElement>("[data-hero-screen]"),
      };

      /* The placeholder only exists to give no-JS visitors something in the
         bar. Once we know JS is running, the typed brief takes over. */
      const placeholder = root.querySelector<HTMLElement>(
        "[data-hero-placeholder]",
      );
      if (placeholder) gsap.set(placeholder, { display: "none" });

      primeConnectors(connectors);
      gsap.set(brief.screens, { opacity: 0.35 });

      /* Act one reports back the moment the copy has landed. It must stay
         a standalone timeline: nesting anything longer-running inside it
         would delay `onComplete`, and the failsafe below would then flip
         the state mid-tween — discarding GSAP's inline styles while the
         headline is still travelling, which hides it for good. */
      playHeroIntro(refs, () => setState("revealed"));

      /* Act two, on its own timeline, overlapping the tail of act one: the
         overlap is what makes the whole thing feel like one gesture. */
      const sequence = playBriefSequence(brief);
      sequence.timeline.delay(0.75);

      /* The typewriter loops for as long as the hero is on screen. */
      const typewriter = playBriefTypewriter(
        root.querySelector("[data-hero-typed]"),
        root.querySelector("[data-hero-caret]"),
        hero.prompt.briefs,
      );
      typewriter.delay(0.6);

      /* Every endless loop in the hero, in one list. Handed to the observer
         below so they all stop together once the section is out of view. */
      loopsRef.current = [...sequence.loops, typewriter];

      createHeroScroll(root, copyRef.current);
    }, root);

    return () => {
      window.clearTimeout(failsafe);
      /* Dropped before the revert, so the observer can never resume a
         timeline that GSAP has already killed. */
      loopsRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id={SECTION_IDS.hero}
      data-hero-state={state}
      data-hero-ambient={ambient}
      /* Full viewport only from sm up. On phones the content is a headline,
         a prompt bar and one row of marks — much shorter than the screen —
         so forcing 100svh and centring it left a large empty band under the
         marquee. Below sm the section simply sizes to what is in it. */
      className="relative flex flex-col justify-center overflow-x-clip pt-28 pb-12 sm:min-h-[100svh] sm:pt-32 sm:pb-20 lg:pt-36"
    >
      <HeroGlow />

      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 sm:px-8 lg:px-12">
        <div ref={copyRef} className="flex flex-col items-center">
          <HeroContent />

          {/* The prompt bar. Narrower than the page rail so it reads as an
              object sitting on top of the page, not a full-width band. It is
              the only junction — the connectors leave straight from it. */}
          <div className="mt-9 w-full max-w-[760px] sm:mt-10">
            <HeroPrompt />
          </div>
        </div>

        {/* Connectors -> devices. One unit, so the scroll parallax lifts the
            whole assembly together. */}
        <div className="mx-auto w-full max-w-[1020px]">
          {/* The connectors fan out to three columns, so they only make
              sense while the devices are in three columns. Below sm the
              row stacks and the wires are hidden rather than left pointing
              at nothing. */}
          <div className="hidden sm:block">
            <HeroRouting />
          </div>

          {/* Devices from sm up only.

              Three 9:16 mockups stacked on a phone is a phone screen drawn
              inside a phone screen, and it pushed everything below the hero
              a long way down. Nothing replaces them here: the SocialProof
              section immediately below already makes the "every channel"
              point with its own rail of platform marks, and repeating it in
              the hero said the same thing twice in one screen. */}
          <ul className="hidden w-full sm:grid sm:grid-cols-3 sm:gap-6 lg:gap-8">
            {hero.channels.map((channel) => (
              <li key={channel.name} className="flex">
                <PhoneMock channel={channel} className="w-full" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
