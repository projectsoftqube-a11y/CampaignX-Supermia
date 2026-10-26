import type { FaqItem } from "@/lib/schema";

/**
 * The /faq content, transcribed from the approved page copy.
 *
 * This is the only page on the subdomain that carries FAQPage markup.
 * Every answer here is also rendered in the HTML on first load, which is
 * what makes the markup legitimate: Google requires the marked-up answer
 * to be visible to the visitor.
 *
 * Links to pages that are not live yet must not appear. The content doc is
 * explicit about this: leave out the whole sentence holding the link until
 * the target ships. Every link below points at a route that now exists.
 */

export interface FaqGroup {
  id: string;
  title: string;
  /** Short line under the group heading. */
  intro: string;
  items: readonly FaqItem[];
}

export const FAQ_GROUPS: readonly FaqGroup[] = [
  {
    id: "about",
    title: "About CampaignX",
    intro: "What CampaignX is, who makes it and how to see it in action.",
    items: [
      {
        question: "What is CampaignX?",
        answer:
          "CampaignX is an AI marketing agent from SuperMIA. You write one brief, and it plans the campaign, writes and designs it in your brand voice, and formats it for Instagram, Facebook, LinkedIn, Google Business, X, email and SMS. Your team approves it before it publishes, and reporting shows what worked.",
      },
      {
        question: "Is CampaignX legit, and who makes it?",
        answer:
          "Yes. CampaignX is built by SuperMIA (supermia.ai) and operated by Botfinity Inc., the company named in its terms and privacy policy, at 2451 W Grapevine Mills Cir #547, Grapevine, Texas. You can reach the team at hello@supermia.ai.",
      },
      {
        question: "Who is CampaignX for?",
        answer:
          "CampaignX is for small businesses, marketing teams, agencies and founders who need complete campaigns across several channels without assembling them by hand in separate tools.",
      },
      {
        question: "Can I see how it works before I sign up?",
        answer:
          "Yes. Watch the demo video on the CampaignX homepage, which runs under two minutes. It needs no sign-up.",
      },
      {
        question: "How long does setup take?",
        answer:
          "Your first campaign takes about ten minutes. A brand model your team trusts usually takes about one afternoon.",
      },
    ],
  },
  {
    id: "brand-voice",
    title: "Briefs and brand voice",
    intro: "A brief is the only input CampaignX needs.",
    items: [
      {
        question: "What goes into a campaign brief?",
        answer:
          "One sentence is enough to start: what you are promoting, who it is for and what you want them to do. CampaignX turns that into a campaign plan covering strategy, creative and targeting, and you can rewrite the brief before you approve.",
      },
      {
        question: "Will it sound like us, or like AI?",
        answer:
          "It learns your brand voice from your own material, such as your website, brand guidelines or past campaigns, and writes every channel in it. You review and approve everything before it ships.",
      },
      {
        question: "Does CampaignX create images too?",
        answer:
          "Yes. Every campaign ships with visuals made for each channel and matched to your brand, so you can review the image and the copy together before you approve.",
      },
    ],
  },
  {
    id: "channels",
    title: "Channels and publishing",
    intro: "One campaign, written natively for each channel.",
    items: [
      {
        question: "Which channels does CampaignX publish to?",
        answer:
          "CampaignX publishes to Instagram, Facebook, LinkedIn, Google Business, X, email and SMS. Webhooks connect it to other tools you use, and you can keep your existing CRM and analytics.",
      },
      {
        question: "Can CampaignX schedule posts?",
        answer:
          "Yes. Once your named approver signs off, CampaignX publishes or schedules content to the platforms you connect. Each platform's own terms and rate limits still apply to what you post there.",
      },
      {
        question: "Can we keep using our existing tools?",
        answer:
          "Yes. You can keep your CRM and analytics tools, and webhooks connect CampaignX to other systems you rely on.",
      },
      {
        question: "How do I connect my social media accounts?",
        answer:
          "You connect each social account through the platform's own sign-in screen. CampaignX stores the access it needs to publish and to read post metrics, such as page details, follower counts and engagement.",
      },
    ],
  },
  {
    id: "approvals",
    title: "Approvals and control",
    intro:
      "Does CampaignX post automatically? Only after a named approver signs off.",
    items: [
      {
        question: "Does anything go live without approval?",
        answer:
          "No. Nothing sends without a named approver. Before you approve, you can edit any asset, regenerate a single channel or rewrite the brief.",
      },
      {
        question: "What if the AI gets something wrong?",
        answer:
          "Fix it before it ships. Edit the asset directly, regenerate just that channel, or rewrite the brief and generate again. You are responsible for reviewing AI-generated content before it is published, which is why approval is built in.",
      },
      {
        question: "Who owns the content CampaignX creates?",
        answer:
          "You keep the intellectual property in the content you provide. Botfinity Inc. does not claim ownership of AI-generated content, and the terms give you a worldwide license to use it.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing and plans",
    intro: "Plans and limits in brief.",
    items: [
      {
        question: "Is CampaignX free?",
        answer:
          "CampaignX is free during Beta on the Starter plan, which includes full Beta access, all channel outputs, the brand voice model and community support. Pricing after Beta has not been published yet.",
      },
      {
        question: "What does the Team plan add?",
        answer:
          "The Team plan, currently in Early Access, adds unlimited campaigns, the full brand model with approvals, the performance loop and reporting, and unlimited seats. Like Starter, it covers all channels.",
      },
      {
        question: "What does Enterprise include?",
        answer:
          "Enterprise includes everything in Team, plus SSO/SAML and SCIM, a choice of data residency, audit export and retention controls, and a named support contact. Pricing is custom.",
      },
    ],
  },
  {
    id: "data",
    title: "Data and security",
    intro: "The privacy policy and terms set out the full details.",
    items: [
      {
        question: "Do you train AI models on our data?",
        answer:
          "Your content, brand model and results are not used to train shared models or pooled with other customers' data. The terms allow anonymized patterns to be used to improve the service, and the privacy policy lists the providers that process your content.",
      },
      {
        question: "Which providers process our content?",
        answer:
          "The privacy policy names OpenAI for AI content generation, Deepgram and Cartesia for speech processing, and AWS for encrypted hosting and storage.",
      },
      {
        question: "Do you sell our data?",
        answer:
          "Botfinity Inc. does not sell your personal data to third parties, as stated in the privacy policy.",
      },
      {
        question: "What happens to our data if we delete our account?",
        answer:
          "Your data is deleted or anonymized within 90 days of account deletion, except where the law requires it to be kept.",
      },
    ],
  },
];

/** Flattened for the FAQPage graph node. */
export const ALL_FAQS: readonly FaqItem[] = FAQ_GROUPS.flatMap(
  (group) => group.items,
);
