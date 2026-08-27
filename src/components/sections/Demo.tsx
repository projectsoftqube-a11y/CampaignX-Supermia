"use client";

import { useEffect, useRef, useState } from "react";
import {
  Clock,
  Layers,
  PencilLine,
  Play,
  Sparkles,
  Volume2,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withHighlight } from "@/components/ui/Highlight";
import { demo } from "@/config/content";
import { gsap, registerGsap } from "@/lib/animations/gsap";
import { revealOnScroll } from "@/lib/animations/reveal";

/** Icon per point. Keeps the content config free of React imports. */
const POINT_ICONS = {
  brief: Sparkles,
  channels: Layers,
  results: PencilLine,
} as const;

/**
 * The demo.
 *
 * Sits after "How it works" describes the mechanism: the reader has just
 * been told what happens, and this shows the same claim rather than
 * asserting it a second time.
 *
 * Given its own tinted band. The page runs off-white throughout, and
 * separating "here is the argument" from "here is the thing working" is
 * what stops the video reading as one more illustration.
 *
 * The player is a facade, not an iframe.
 *
 * Embedding YouTube directly costs roughly a megabyte of player JavaScript
 * and a set of third-party cookies on every page view — including for the
 * majority who never press play. This renders YouTube's own still with our
 * play button over it, and swaps in the real iframe on the first click. The
 * visitor sees the same thing; the page does not pay for it up front.
 *
 * `youtube-nocookie.com` is used for the same reason: no tracking cookie
 * until playback actually starts.
 */
export function Demo() {
  const rootRef = useRef<HTMLDivElement>(null);
  /* Once true the real player is mounted. One-way: there is no reason to
     tear the iframe back down mid-watch. */
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      revealOnScroll(root, { stagger: 0.09, start: "top 82%" });
    }, root);

    return () => ctx.revert();
  }, []);

  /* This upload has a maxres still (checked), which is what the card needs
     at this size — hqdefault is 480x360 and visibly soft when stretched. */
  const poster = `https://i.ytimg.com/vi/${demo.videoId}/maxresdefault.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${demo.videoId}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${demo.videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <section
      id="demo"
      aria-labelledby="demo-heading"
      className="relative isolate overflow-hidden py-[60px] sm:py-[90px]"
    >
      {/* The band. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-surface-soft/70" />
        <div className="cx-dots absolute inset-0 opacity-50 [mask-image:radial-gradient(80%_70%_at_50%_50%,#000,transparent)]" />
        <div className="absolute -top-[20%] -left-[8%] size-[55%] rounded-full bg-[radial-gradient(closest-side,rgba(var(--brand-blue-rgb),0.12),transparent)]" />
        <div className="absolute -right-[8%] -bottom-[25%] size-[50%] rounded-full bg-[radial-gradient(closest-side,rgba(208,0,255,0.09),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,var(--border),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,var(--border),transparent)]" />
      </div>

      <Container>
        <div ref={rootRef}>
          {/* Held well inside the page rail. At full width the copy and the
              portrait card end up at opposite edges of a 1520px row with a
              void between them; the video is narrow by nature, so the pair
              only reads as one unit when the row is bounded. */}
          {/* The video column is given an explicit width rather than
              `auto`. The card inside it is `w-full`, so an auto-sized track
              has nothing to measure — content asking for 100% of a column
              that sizes to its content collapses to zero, and the card
              disappears. A fixed track breaks that circularity. */}
          <div className="mx-auto grid max-w-[62rem] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
            {/* ---------------- The pitch ---------------- */}
            <div className="flex flex-col gap-5">
              <Eyebrow data-animate="reveal">{demo.eyebrow}</Eyebrow>

              <h2
                id="demo-heading"
                data-animate="reveal"
                className="text-display max-w-[14ch] text-balance text-[clamp(2rem,4vw,3.25rem)] leading-[1.08]"
              >
                {withHighlight(demo.heading, demo.headingHighlight)}
              </h2>

              <p
                data-animate="reveal"
                className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted"
              >
                {demo.supporting}
              </p>

              {/* What the video shows. */}
              <ul data-animate="reveal" className="mt-2 flex flex-col gap-4">
                {demo.points.map((point) => {
                  const Icon = POINT_ICONS[point.kind];
                  return (
                    <li key={point.label} className="flex items-start gap-3.5">
                      <span
                        aria-hidden="true"
                        className="bg-brand-soft text-accent mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full"
                      >
                        <Icon className="size-4" strokeWidth={1.75} />
                      </span>

                      <span className="flex flex-col gap-0.5">
                        <span className="text-[0.9375rem] font-semibold">
                          {point.label}
                        </span>
                        <span className="text-[0.875rem] leading-snug text-muted">
                          {point.detail}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Length, sound, and a way out to YouTube for anyone who
                  would rather watch it there. */}
              <div
                data-animate="reveal"
                className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 text-[0.8125rem] text-muted"
              >
                <span className="inline-flex items-center gap-2">
                  <Clock
                    className="size-3.5 shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  {demo.duration}
                </span>

                <span className="inline-flex items-center gap-2">
                  <Volume2
                    className="size-3.5 shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  {demo.soundNote}
                </span>

                <a
                  href={watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-line-strong underline-offset-4 transition-colors duration-300 hover:text-foreground"
                >
                  {demo.watchLabel}
                </a>
              </div>
            </div>

            {/* ---------------- The player ---------------- */}
            {/* Portrait, because the video is.

                YouTube always serves a 16:9 still, so a vertical upload
                arrives pillarboxed with black bars either side. A 16:9 card
                would show those bars; a 9:16 card sized to the footage and
                a poster scaled to crop them removes the letterboxing
                entirely. Capped in width so it does not tower over the copy
                beside it. */}
            <div
              data-animate="reveal"
              /* Centred and capped while stacked; at lg the grid track is
                 already exactly this wide, so it simply fills it. */
              className="relative mx-auto aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-frame border border-line bg-black shadow-cinema sm:max-w-[340px]"
            >
              {playing ? (
                <iframe
                  src={embedUrl}
                  title={demo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={`Play: ${demo.title}`}
                  className="group absolute inset-0 h-full w-full cursor-pointer"
                >
                  {/* YouTube's own still. Not next/image: it is a remote
                      host we have not configured, and the facade is
                      replaced the moment anyone clicks. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={poster}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  {/* A wash so the button and caption hold against whatever
                      frame the video happens to open on. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,10,0.72),rgba(10,10,10,0.10)_55%)] transition-opacity duration-300 group-hover:opacity-90"
                  />

                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-brand shadow-brand flex size-16 items-center justify-center rounded-full ring-4 ring-white/20 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:scale-105 sm:size-[4.5rem]">
                      {/* Nudged right: a triangle centred on its bounding
                          box reads as sitting left of centre. */}
                      <Play
                        className="ml-0.5 size-6 fill-white text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </span>

                  {/* The video's real title and channel. */}
                  <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 text-left sm:p-6">
                    <span className="text-[0.9375rem] leading-snug font-semibold text-white sm:text-base">
                      {demo.videoTitle}
                    </span>
                    <span className="text-[0.75rem] text-white/65">
                      {demo.channel}
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
