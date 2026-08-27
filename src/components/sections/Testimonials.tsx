"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withHighlight } from "@/components/ui/Highlight";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { testimonials } from "@/config/content";
import {
  gsap,
  registerGsap,
  prefersReducedMotion,
} from "@/lib/animations/gsap";
import { revealOnScroll } from "@/lib/animations/reveal";

const ITEMS = testimonials.items;

/**
 * How many cards get the staggered entrance. Roughly what fits on a wide
 * screen — the rest are already in place by the time the rail reaches them.
 */
const VISIBLE_ON_ENTER = 4;

/**
 * Testimonials.
 *
 * A horizontal rail driven by scroll rather than a static grid: the cards
 * travel sideways as the page moves down, so the section reads as a
 * continuous run of voices rather than a wall of quote boxes.
 *
 * Under reduced motion the tween is skipped and the rail sits still,
 * showing the first cards. The quotes are duplicated in no other form, so
 * the visible set has to carry the point on its own — which is why the
 * strongest quote is first rather than saved for the end.
 */
export function Testimonials() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();

    const root = rootRef.current;
    if (!root) return;

    let detach: (() => void) | undefined;

    const ctx = gsap.context(() => {
      /* Runs on every path: the CSS in animations.css keeps
         [data-animate="reveal"] hidden until GSAP clears it. */
      revealOnScroll(root, { stagger: 0.08, start: "top 80%" });

      if (prefersReducedMotion()) return;

      const track = root.querySelector<HTMLElement>("[data-quote-track]");
      if (!track) return;

      /* The cards are rendered twice. One set's width is therefore half the
         track, and wrapping the position by that width puts the rail back
         where it started with an identical card under the cursor — so the
         loop has no seam and no end. */
      const setWidth = () => track.scrollWidth / 2;

      /* Scroll and drag both write to the same x, so they share one setter
         and one wrap. `dragged` is the offset the pointer has added; the
         scroll tween writes `scrolled`. */
      let scrolled = 0;
      let dragged = 0;
      const setX = gsap.quickSetter(track, "x", "px");

      /* gsap.utils.wrap keeps the value inside one set's width, so x never
         grows unbounded however far the rail is dragged or scrolled. */
      const render = () => {
        const width = setWidth();
        setX(width ? gsap.utils.wrap(-width, 0, scrolled + dragged) : 0);
      };

      gsap.to(
        {},
        {
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              /* Two full sets of travel across the section, so the rail
                 keeps moving at a readable pace rather than creeping. */
              scrolled = -setWidth() * self.progress * 2;
              render();
            },
          },
        },
      );

      /* The entrance lifts only the visible cards, not the duplicate set:
         staggering all fourteen would ripple through copies nobody has
         reached yet, and the duplicates need to be at full opacity by the
         time the rail wraps onto them. */
      gsap.fromTo(
        gsap.utils
          .toArray<HTMLElement>("[data-quote]", root)
          .slice(0, VISIBLE_ON_ENTER),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
        },
      );

      /* ---------------------------------------------------------------
         Drag.

         Native pointer events rather than the Draggable plugin: both drag
         and the scroll tween have to own the same x, and one setter with
         one clamp is far easier to reason about than two plugins writing
         to the same property.
         --------------------------------------------------------------- */
      let startX = 0;
      let lastX = 0;
      let startDragged = 0;
      let dragging = false;
      /* Distinguishes a drag from a click, so a stray 2px movement while
         tapping a card does not swallow the tap. */
      let moved = 0;

      const onPointerDown = (event: PointerEvent) => {
        if (event.button !== 0) return;
        dragging = true;
        moved = 0;
        startX = event.clientX;
        lastX = event.clientX;
        startDragged = dragged;
        track.setPointerCapture(event.pointerId);
        track.style.cursor = "grabbing";
      };

      const onPointerMove = (event: PointerEvent) => {
        if (!dragging) return;
        const delta = event.clientX - startX;
        moved = Math.max(moved, Math.abs(delta));
        lastX = event.clientX;
        dragged = startDragged + delta;
        render();
      };

      const onPointerUp = (event: PointerEvent) => {
        if (!dragging) return;
        dragging = false;
        track.releasePointerCapture(event.pointerId);
        track.style.cursor = "";

        /* The rail wraps, so there is no bound to spring back to. What is
           left is momentum: the flick carries on and eases to a stop. */
        const velocity = event.clientX - lastX;
        if (Math.abs(velocity) < 2) return;

        const state = { v: dragged };
        gsap.to(state, {
          v: dragged + velocity * 8,
          duration: 0.9,
          ease: "power3.out",
          onUpdate: () => {
            dragged = state.v;
            render();
          },
        });
      };

      /* Suppress the click that follows a real drag. */
      const onClick = (event: MouseEvent) => {
        if (moved > 6) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

      track.style.cursor = "grab";
      track.style.touchAction = "pan-y";
      track.addEventListener("pointerdown", onPointerDown);
      track.addEventListener("pointermove", onPointerMove);
      track.addEventListener("pointerup", onPointerUp);
      track.addEventListener("pointercancel", onPointerUp);
      track.addEventListener("click", onClick, true);

      /* Handed back to the effect: gsap.context().revert() only undoes
         GSAP's own tweens, not DOM listeners, so these would otherwise
         leak across re-mounts. */
      detach = () => {
        track.removeEventListener("pointerdown", onPointerDown);
        track.removeEventListener("pointermove", onPointerMove);
        track.removeEventListener("pointerup", onPointerUp);
        track.removeEventListener("pointercancel", onPointerUp);
        track.removeEventListener("click", onClick, true);
      };
    }, root);

    return () => {
      detach?.();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      ref={rootRef}
      className="relative isolate overflow-hidden py-[90px]"
    >
      <SectionGlow position="right" />

      <Container>
        <div>
          {/* Heading */}
          <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-5 text-center">
            <Eyebrow data-animate="reveal">{testimonials.eyebrow}</Eyebrow>

            <h2
              id="testimonials-heading"
              data-animate="reveal"
              className="text-display max-w-[52rem] text-balance text-[clamp(2rem,4.4vw,3.75rem)]"
            >
              {withHighlight(
                testimonials.heading,
                testimonials.headingHighlight,
              )}
            </h2>
          </div>
        </div>
      </Container>

      {/* The rail sits outside Container so it can run to the viewport
          edges — a quote rail that stops at the page gutter reads as a
          list, not a run. */}
      {/* No overflow on this box. `overflow-x-auto` implicitly sets
          overflow-y to auto, which clipped the cards' drop shadow, and it
          made the div a scroll container that fought the GSAP transform.
          The section's own overflow-hidden does the clipping instead. */}
      <div className="mask-fade-edges mt-16 sm:mt-20">
        <ul
          data-quote-track
          className="flex w-max gap-5 px-5 py-4 will-change-transform sm:px-8 lg:px-12"
        >
          {/* Rendered twice so the rail can wrap. The duplicate set is
              hidden from assistive tech, which would otherwise read every
              quote a second time. */}
          {[...ITEMS, ...ITEMS].map((item, index) => (
            <li
              key={index}
              data-quote
              aria-hidden={index >= ITEMS.length}
              className="flex"
            >
              <figure className="flex w-[19rem] shrink-0 flex-col justify-between gap-8 rounded-frame border border-line bg-surface p-7 shadow-soft sm:w-[23rem] sm:p-8">
                {/* Quote mark, drawn rather than typed so it is decorative
                    and never read aloud. */}
                <span
                  aria-hidden="true"
                  className="text-display text-brand text-[2.5rem] leading-none"
                >
                  &ldquo;
                </span>

                <blockquote className="text-[1.0625rem] leading-relaxed text-foreground">
                  {item.quote}
                </blockquote>

                <figcaption className="flex items-center gap-3 border-t border-line pt-5">
                  {/* Avatar placeholder: initials, not a stock photo. */}
                  <span
                    aria-hidden="true"
                    className="bg-brand-soft text-accent flex size-10 shrink-0 items-center justify-center rounded-full text-[0.8125rem] font-semibold"
                  >
                    {item.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </span>

                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-[0.9375rem] font-medium">
                      {item.name}
                    </span>
                    <span className="truncate text-[0.8125rem] text-muted">
                      {item.role}, {item.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
