import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LegalPage, type LegalSection } from "@/components/layout/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply when you use ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
};

/**
 * DRAFT — REVIEW BEFORE LAUNCH.
 *
 * Ordinary SaaS terms, written to match what the marketing pages promise.
 * This is not legal advice and has not been checked by a lawyer.
 *
 * Section 09 states a governing law of Texas because the registered address
 * in site config is in Grapevine, TX. Confirm that is where the entity is
 * actually incorporated before publishing, and confirm the refund terms in
 * section 05 against how billing really works.
 */
const SECTIONS: readonly LegalSection[] = [
  {
    heading: "Agreement to these terms",
    body: [
      `These terms are an agreement between you and Botfinity Inc., which operates ${siteConfig.name} as part of SuperMIA. By creating an account or using the service, you agree to them.`,
      "If you are agreeing on behalf of a company, you confirm you have the authority to bind that company, and \"you\" means the company.",
    ],
  },
  {
    heading: "Your account",
    body: [
      "You need an account to use the service. You are responsible for keeping your credentials secure and for what happens under your account. Tell us promptly if you think someone else has access to it.",
      "You must be old enough to enter a contract where you live, and you must not use the service if we have previously suspended you.",
    ],
  },
  {
    heading: "What you may and may not do",
    body: [
      "You may use the service to plan, generate and publish marketing campaigns for yourself or for clients you are authorised to act for.",
      "You may not do any of the following:",
    ],
    list: [
      "Use the service to produce content that is unlawful, deceptive, or designed to harass, defraud or impersonate anyone.",
      "Send messages to people who have not consented to hear from you, where consent is required by law.",
      "Upload material you do not have the rights to use, including brand assets belonging to someone else.",
      "Attempt to reverse engineer the service, resell access to it, or use it to build a competing product.",
      "Interfere with the service's operation, or try to access accounts or data that are not yours.",
    ],
  },
  {
    heading: "Your content and who owns what",
    body: [
      "You keep ownership of the material you put into the service and of the campaign output generated from it. You grant us the licence we need to host, process and display that material in order to run the service for you.",
      "We keep ownership of the service itself: the software, the interface, and our own brand. Nothing in these terms transfers that to you.",
      "You are responsible for reviewing output before it is published. The service generates drafts, and generated content can be wrong, biased, or unintentionally similar to existing work.",
    ],
  },
  {
    heading: "Plans, billing and cancellation",
    body: [
      "Paid plans are billed in advance on the cycle shown at checkout, and renew automatically until cancelled. You can cancel at any time from your account; the cancellation takes effect at the end of the period you have already paid for.",
      "Fees are exclusive of tax unless stated otherwise. If a payment fails, we may suspend access until it is resolved. We may change prices with reasonable notice, and any change applies from your next renewal.",
    ],
  },
  {
    heading: "Third-party services",
    body: [
      "Connecting the service to a third-party platform, such as a social network or email provider, means also agreeing to that platform's own terms. We are not responsible for those services, and a change on their side may affect what our service can do.",
    ],
  },
  {
    heading: "Availability and changes",
    body: [
      "We work to keep the service available and improve it over time, which means features may be added, changed or removed. Where a change materially reduces what a paid plan provides, we will give notice.",
      "We do not promise uninterrupted service. Maintenance, outages at our providers, and events outside our control can all interrupt it.",
    ],
  },
  {
    heading: "Suspension and termination",
    body: [
      "You can stop using the service and close your account at any time. We may suspend or terminate an account that breaches these terms, that is being used unlawfully, or where required by law.",
      "On termination your right to use the service ends. Sections that by their nature should survive, such as ownership, disclaimers and limitation of liability, continue to apply.",
    ],
  },
  {
    heading: "Disclaimers and liability",
    body: [
      "The service is provided as is. To the fullest extent permitted by law, we exclude implied warranties, including that the service will be uninterrupted, error free, or fit for a particular purpose.",
      "To the fullest extent permitted by law, we are not liable for indirect or consequential loss, lost profits, or lost data, and our total liability for any claim is limited to the fees you paid us in the twelve months before the claim arose.",
      "Nothing here limits liability that cannot be limited by law.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of the State of Texas, United States, without regard to its conflict of law rules. The courts of that state have exclusive jurisdiction over any dispute, except that either party may seek injunctive relief where necessary.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these terms. If a change is material, we will update the date at the top and notify account holders before it takes effect. Continuing to use the service after that date means the updated terms apply.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />

      <LegalPage
        eyebrow="Legal"
        title="Terms of Service"
        summary="The rules that apply when you use CampaignX, in plain language."
        updated="27 August 2026"
        sections={SECTIONS}
        footer={
          <>
            Questions about these terms? Email{" "}
            <Link
              href="mailto:hello@supermia.ai"
              className="text-accent underline underline-offset-4"
            >
              hello@supermia.ai
            </Link>{" "}
            before you sign up rather than after.
          </>
        }
      />

      <Footer />
    </>
  );
}
