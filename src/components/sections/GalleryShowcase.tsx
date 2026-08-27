"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withHighlight } from "@/components/ui/Highlight";
import { galleryShowcase } from "@/config/content";
import { gsap, registerGsap } from "@/lib/animations/gsap";
import { revealOnScroll } from "@/lib/animations/reveal";
import { SECTION_IDS } from "@/lib/constants";

/**
 * Lazy-load DomeGallery — it pulls in @use-gesture/react and does heavy
 * DOM work, none of which is needed at SSR time. `ssr: false` keeps the
 * server bundle lean and avoids `window` references during the render pass.
 */
const DomeGallery = dynamic(
  () => import("@/components/ui/DomeGallery"),
  { ssr: false }
);

/**
 * Gallery Showcase — content on the left, interactive 3D DomeGallery on
 * the right.
 *
 * The section sits between "How It Works" and "Pricing", so visitors see
 * the actual creative CampaignX produces right after they understand the
 * mechanism. Copy lists the benefits of AI-generated per-channel assets;
 * the dome lets them drag and explore sample output.
 */
export function GalleryShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      revealOnScroll(root, { stagger: 0.1, start: "top 80%" });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={SECTION_IDS.gallery}
      aria-labelledby="gallery-heading"
      /* 60px on phones, 90px from sm up. */
      className="relative isolate py-[60px] sm:py-[90px]"
    >
      <Container>
        <div ref={rootRef}>
          {/* ── Stacked layout: heading → dome ────────────── */}
          <div className="flex flex-col items-center gap-10">
            {/* Heading block — centred */}
            <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-5 text-center">
              <Eyebrow data-animate="reveal">
                {galleryShowcase.eyebrow}
              </Eyebrow>

              <h2
                id="gallery-heading"
                data-animate="reveal"
                className="text-display max-w-[52rem] text-balance text-[clamp(2rem,4.4vw,3.75rem)]"
              >
                {withHighlight(
                  galleryShowcase.heading,
                  galleryShowcase.headingHighlight
                )}
              </h2>
            </div>

            {/* DomeGallery — full width, capped at 500px tall */}
            <div
              data-animate="reveal"
              /* Shorter on phones: 500px of dome on a 320px screen is most
                 of the viewport given over to one decorative element. */
              className="relative h-[320px] w-full overflow-hidden rounded-[var(--radius-lg)] sm:h-[420px] lg:h-[500px]"
            >
              <DomeGallery
                images={Array.from(galleryShowcase.images)}
                grayscale={false}
                overlayBlurColor="#f8f8f6"
                fit={0.85}
                fitBasis="width"
                minRadius={700}
                imageBorderRadius="16px"
                openedImageBorderRadius="20px"
                openedImageWidth="300px"
                openedImageHeight="400px"
                dragDampening={2}
                segments={35}
                autoRotate
                autoRotateSpeed={0.12}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
