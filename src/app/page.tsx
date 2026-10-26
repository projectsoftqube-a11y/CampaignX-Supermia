import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/hero/Hero";
import { Brochure } from "@/components/sections/Brochure";
import { Demo } from "@/components/sections/Demo";
import { FAQ } from "@/components/sections/FAQ";
import { GalleryShowcase } from "@/components/sections/GalleryShowcase";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { SocialProof } from "@/components/sections/SocialProof";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildGraph } from "@/lib/schema";

// Render per request so pricing always reflects the billing API.
export const dynamic = "force-dynamic";

/** Organization, WebSite, SoftwareApplication, VideoObject and WebPage. */
const schema = buildGraph({
  path: "/",
  name: "CampaignX: AI Marketing Agent for Multi-Channel Campaigns",
  description:
    "CampaignX is an AI marketing agent that turns one brief into an on-brand campaign for social, email and SMS, with your approval before anything goes live.",
  withVideo: true,
});

export default function Home() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        <Hero />
        <SocialProof />
        {/* The problem before the mechanism: without it, "one brief becomes
            a campaign" is a solution to nothing. */}
        <Problem />
        <HowItWorks />
        {/* Shown straight after the mechanism is described: the reader has
            just been told what happens, so this is the same claim
            demonstrated rather than asserted again. */}
        <Demo />
        <GalleryShowcase />
        {/* Before price, and aimed at a different reader — the one who has
            to take this to people who were not on the call. */}
        <Brochure />
        {/* Price only lands once the product is believed. */}
        <Pricing />
        {/* Testimonials are intentionally not rendered. The seven named
            quotes have no source or consent on file and the product is in
            Beta, so publishing them risks the FTC rules on endorsements
            (SEO audit issue #2). The component stays in the repo: restore
            it here once each quote is verified and consented. Never mark
            these up as Review or AggregateRating. */}
        {/* The FAQ mops up what price and security raise but don't settle,
            immediately before the closing ask. */}
        <FAQ />
      </main>

      <Footer />
    </>
  );
}
