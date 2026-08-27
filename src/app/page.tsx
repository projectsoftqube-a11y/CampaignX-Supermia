import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/hero/Hero";
import { FAQ } from "@/components/sections/FAQ";
import { GalleryShowcase } from "@/components/sections/GalleryShowcase";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { SocialProof } from "@/components/sections/SocialProof";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Header />

      <main id="main">
        <Hero />
        <SocialProof />
        {/* The problem before the mechanism: without it, "one brief becomes
            a campaign" is a solution to nothing. */}
        <Problem />
        <HowItWorks />
        <GalleryShowcase />
        {/* Price only lands once the product is believed. */}
        <Pricing />
        {/* Proof after price: a visitor weighing cost is exactly who
            wants to hear from someone who already paid it. */}
        <Testimonials />
        {/* The FAQ mops up what price and security raise but don't settle,
            immediately before the closing ask. */}
        <FAQ />
      </main>

      <Footer />
    </>
  );
}
