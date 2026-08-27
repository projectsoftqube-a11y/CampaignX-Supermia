import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LegalPage, type LegalSection } from "@/components/layout/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects your data.`,
  alternates: { canonical: "/privacy" },
};

/**
 * DRAFT — REVIEW BEFORE LAUNCH.
 *
 * This is written to match what the marketing pages already claim (your
 * data stays in your workspace, it is not used to train shared models) and
 * to cover the ordinary mechanics of a SaaS product. It is not legal
 * advice, and it has not been checked by a lawyer.
 *
 * Two things in particular need confirming against how the product actually
 * behaves before this goes live: the retention periods in section 06, and
 * the sub-processor list in section 05. Both are stated in general terms
 * here precisely because inventing specifics would be worse than vague.
 */
const SECTIONS: readonly LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      `${siteConfig.name} is a product of SuperMIA, operated by Botfinity Inc. When this policy says "we" or "us", it means that company. When it says "you", it means the person or organisation using the service.`,
      "This policy explains what we collect, why we collect it, and what you can ask us to do with it. If anything here is unclear, ask us before you sign up rather than after.",
    ],
  },
  {
    heading: "What we collect",
    body: [
      "We collect three kinds of information, and it is worth separating them because they are treated differently.",
    ],
    list: [
      "Account information you give us: your name, work email, company name, and billing details if you subscribe to a paid plan.",
      "Content you create in the product: the briefs you write, the brand material you connect, and the campaigns generated from them.",
      "Usage information collected automatically: pages visited, features used, browser and device type, and approximate location derived from your IP address.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "Account and usage information is used to run the service, keep it secure, bill you correctly, and understand which parts of the product are working. Content you create is used to produce the output you asked for, and to show it back to you.",
      "We send service messages you cannot opt out of, such as billing notices and security alerts, because they are part of providing the product. Marketing email is separate and you can unsubscribe from it at any time.",
    ],
  },
  {
    heading: "What we do not do with your content",
    body: [
      "Your content, your brand model and your campaign results stay in your workspace. They are not used to train models shared with other customers, and they are not pooled with another customer's data.",
      "We do not sell your personal information, and we do not share it with advertisers.",
    ],
  },
  {
    heading: "Who else processes your data",
    body: [
      "Running the service means using other companies for hosting, payment processing, email delivery, analytics, and the AI models that generate campaign output. They act on our instructions and are bound by contract to protect your data.",
      "A current list of these sub-processors is available on request. If you need to review it before signing up, ask us and we will send it.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "We keep your account and content for as long as your account is open. If you close your account, we delete or anonymise your content within a reasonable period, except where we are required to keep records for legal, tax or accounting reasons.",
      "You can ask for your data to be deleted sooner. Where we are able to do so, we will.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Depending on where you live, you may have the right to access the personal information we hold about you, correct it, delete it, object to how we use it, or receive a copy in a portable format. You can exercise any of these by emailing us.",
      "If you are in the EEA or UK, you also have the right to complain to your local data protection authority. We would rather you came to us first so we can put it right.",
    ],
  },
  {
    heading: "Security",
    body: [
      "We use encryption in transit, access controls, and audit logging to protect your data. No service can promise perfect security, and we will not pretend otherwise. If a breach affects your data, we will tell you and the relevant regulator as required by law.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "We use cookies to keep you signed in and to understand how the site is used. Essential cookies cannot be turned off without breaking the product. Analytics cookies can be declined without affecting anything else.",
      "Some pages embed video from YouTube. We load these only when you press play, so no YouTube cookie is set unless you choose to watch.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "If we make a material change to this policy, we will update the date at the top and tell account holders by email before it takes effect. Continuing to use the service after that date means the updated policy applies.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <LegalPage
        eyebrow="Legal"
        title="Privacy Policy"
        summary="What we collect, why we collect it, and what stays yours."
        updated="27 August 2026"
        sections={SECTIONS}
        footer={
          <>
            Questions about this policy, or want to exercise any of the rights
            above? Email{" "}
            <Link
              href="mailto:hello@supermia.ai"
              className="text-accent underline underline-offset-4"
            >
              hello@supermia.ai
            </Link>{" "}
            and we will come back to you.
          </>
        }
      />

      <Footer />
    </>
  );
}
