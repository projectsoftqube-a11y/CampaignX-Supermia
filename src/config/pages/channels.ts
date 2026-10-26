import { ROUTES } from "@/config/routes";
import type { FaqItem } from "@/lib/schema";

/**
 * Content for the three channel pages.
 *
 * All three follow the same four-part outline from their keyword briefs
 * (what CampaignX writes, consistency with the campaign, approve and
 * publish, FAQs), so they share one template and differ only in this data.
 * Every fact here traces to the approved Fact Sheet.
 */

export interface ChannelPage {
  key: "social" | "email" | "sms";
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  highlights: readonly string[];
  /** H2 #1: what CampaignX writes for this channel. */
  writes: readonly { title: string; body: string; kicker?: string }[];
  /** H2 #2: consistency with the rest of the campaign. */
  consistency: { heading: string; intro: string };
  /** H2 #3: approve and publish. */
  publish: { heading: string; intro: string };
  /**
   * Long-form prose. The keyword briefs ask for 900-1,200 words per page
   * and card grids do not get close, so this is where most of the body
   * copy lives. Every secondary and long-tail keyword from the brief is
   * worked in here naturally rather than repeated.
   */
  prose: {
    heading: string;
    intro: string;
    blocks: readonly {
      heading: string;
      paragraphs: readonly string[];
      list?: readonly string[];
    }[];
    aside: { heading: string; body: string };
  };
  faqs: readonly FaqItem[];
}

export const CHANNEL_PAGES: Record<ChannelPage["key"], ChannelPage> = {
  social: {
    key: "social",
    title:
      "AI Social Media Campaigns for Instagram, Facebook, LinkedIn, X and Google Business",
    metaTitle: "AI Social Media Campaigns, Written and Scheduled | CampaignX",
    description:
      "Plan, write, design and schedule a social media campaign for Instagram, Facebook, LinkedIn, X and Google Business from one brief, in your brand voice.",
    eyebrow: "Social Media",
    intro:
      "An AI social media campaign built from one brief: copy and visuals for Instagram, Facebook, LinkedIn, X and Google Business, each written for its own feed and scheduled from one calendar.",
    highlights: ["Five social surfaces", "Copy and visuals together", "Scheduled in one place"],
    writes: [
      {
        kicker: "Instagram",
        title: "Feed and story copy with the visual",
        body: "Captions written to carry the idea, with creative built for the format rather than a landscape image cropped to fit.",
      },
      {
        kicker: "Facebook",
        title: "Posts that are not a reprint",
        body: "The same campaign, written for how people read on Facebook instead of pasted from the LinkedIn version.",
      },
      {
        kicker: "LinkedIn",
        title: "A professional register, still yours",
        body: "More considered than the Instagram caption, without sliding into corporate filler.",
      },
      {
        kicker: "X",
        title: "Copy that survives the limit",
        body: "Tight enough for the format and still recognisably your brand.",
      },
      {
        kicker: "Google Business",
        title: "Updates suited to a listing",
        body: "Plain, local and specific, which is what that surface rewards.",
      },
      {
        kicker: "Everything else",
        title: "Webhooks to other tools",
        body: "Send the campaign to the rest of your stack as it publishes.",
      },
    ],
    consistency: {
      heading: "Consistent with the rest of the campaign",
      intro:
        "The social posts are written at the same time as the email and the SMS, from the same brief and the same brand model. The idea holds across channels; only the format changes.",
    },
    publish: {
      heading: "Approve and publish",
      intro:
        "Nothing posts to any social account without a named approver. Review every channel together, edit a caption, regenerate one platform, then publish and schedule from one calendar.",
    },
    prose: {
      heading: "How an AI social media campaign is actually built",
      intro:
        "Social is where most campaigns start and where most of the rewriting happens. This is what CampaignX does between your brief and five scheduled posts.",
      blocks: [
        {
          heading: "The brief does the planning, not a content calendar",
          paragraphs: [
            "Most social media scheduling tools start from an empty grid: you bring the ideas, they hold the dates. That is useful once you know what you are posting, and no help at all on the Monday you do not. CampaignX starts a step earlier. You describe the campaign in a sentence, and it plans what each platform should carry before it writes a word.",
            "That plan matters because the platforms are not interchangeable. A product launch on LinkedIn argues a case; on Instagram it shows the thing; on X it has to land in one line. An AI social media post generator that writes one caption and resizes it for the others produces five posts that all read like the first one. Working from a plan means each post has its own job in the campaign.",
          ],
        },
        {
          heading: "Instagram and LinkedIn posts written for their own feeds",
          paragraphs: [
            "Instagram and LinkedIn posts come out of the same brief and the same brand model, but almost nothing else about them matches. The Instagram caption carries the idea in a sentence or two and leans on the visual beside it. The LinkedIn post has room to make an argument and is written in a more considered register, without drifting into the corporate filler that register usually attracts.",
            "Facebook sits between the two, X is written to survive the character limit with the point intact, and Google Business posts are plain, local and specific, which is what that surface rewards. Each one is generated with creative sized for its format, so you are never resizing a landscape image to fit a vertical frame at the last minute.",
          ],
          list: [
            "Instagram: feed and story copy with matching creative",
            "Facebook: written for the feed rather than pasted from LinkedIn",
            "LinkedIn: a professional register that still sounds like your brand",
            "X: tight enough for the format, still recognisably you",
            "Google Business posts: plain, local updates suited to a listing",
          ],
        },
        {
          heading: "Where your brand voice comes from",
          paragraphs: [
            "The reason the posts do not sound generic is that the model is not working from a generic idea of marketing copy. It builds a brand model from material you have already written: your site, your guidelines, a campaign that landed well. That model is yours, scoped to your workspace, and your data is not used to train shared models or pooled with other customers\u2019 data.",
            "In practice the first campaign takes about ten minutes. A brand model your team actually trusts usually takes about one afternoon of feeding it material and correcting what comes back, and every correction you make at the approval step is part of what it learns.",
          ],
        },
        {
          heading: "Scheduling, publishing and what stays in your hands",
          paragraphs: [
            "Once a named approver signs off, CampaignX publishes or schedules to the social accounts you have connected, and the whole campaign sits on one calendar rather than in five separate schedulers. You connect each account through that platform\u2019s own sign-in, and each platform\u2019s terms and rate limits still apply to what you post there.",
            "Nothing is automatic before that approval. You can edit any caption, regenerate a single platform, or rewrite the brief and build the campaign again. CampaignX does not buy or manage paid social advertising; it writes, publishes and reports on organic campaigns across its channels.",
          ],
        },
      ],
      aside: {
        heading: "At a glance",
        body: "Five social surfaces from one brief: Instagram, Facebook, LinkedIn, X and Google Business. Copy and creative generated together, scheduled from one calendar, and published only after a named approver signs off.",
      },
    },
    faqs: [
      {
        question: "Which social platforms does CampaignX publish to?",
        answer:
          "Instagram, Facebook, LinkedIn, X and Google Business. Email and SMS are covered by their own channels, and webhooks reach anything else in your stack.",
      },
      {
        question: "Will the same post go out on every platform?",
        answer:
          "No. Each platform gets copy and creative built for its own format. The campaign stays consistent; the posts are not duplicates.",
      },
      {
        question: "Can CampaignX post without us seeing it first?",
        answer:
          "No. Nothing sends without a named approver, on any channel.",
      },
      {
        question: "Does CampaignX run paid social ads?",
        answer:
          "No. CampaignX writes, publishes and reports on organic campaigns across its channels. It does not buy or manage paid advertising.",
      },
    ],
  },

  email: {
    key: "email",
    title: "AI Email Marketing Campaigns Written in Your Brand Voice",
    metaTitle: "AI Email Marketing Campaigns | CampaignX",
    description:
      "Turn your campaign brief into on-brand marketing emails with visuals, written alongside your social and SMS messages and approved before they send.",
    eyebrow: "Email",
    intro:
      "An AI email marketing campaign written from the same brief as your social posts and SMS, in your brand voice, with artwork, and held until someone approves it.",
    highlights: ["Subject line to artwork", "Written with the campaign", "Approved before sending"],
    writes: [
      {
        kicker: "Opening",
        title: "Subject line and preview text",
        body: "Written as a pair, because the preview is the second half of the subject line and most tools treat it as an afterthought.",
      },
      {
        kicker: "Body",
        title: "The email itself",
        body: "The campaign's argument made at email length, in your voice, with one clear thing to do at the end.",
      },
      {
        kicker: "Creative",
        title: "Artwork sized for the inbox",
        body: "Visuals generated with the copy and matched to your brand, not stock imagery dropped in afterwards.",
      },
    ],
    consistency: {
      heading: "Consistent with the rest of the campaign",
      intro:
        "The email is written at the same time as the social posts and the SMS, from one brief and one brand model, so a subscriber who also follows you does not get three different stories.",
    },
    publish: {
      heading: "Approve and publish",
      intro:
        "Nothing sends without a named approver. Read the email next to the rest of the campaign, edit it, regenerate it, or change the brief and build the whole thing again.",
    },
    prose: {
      heading: "How CampaignX writes an email marketing campaign",
      intro:
        "Email is the channel with the most room to sound like you and the one that most often gets written last. Here is what the brief turns into.",
      blocks: [
        {
          heading: "Subject line and preview text are written as a pair",
          paragraphs: [
            "The preview text is the second half of the subject line, and most tools treat it as an afterthought \u2014 a field someone fills in at the end, or leaves empty so the inbox shows the first line of the body. CampaignX writes the two together, because together they are the whole of what a subscriber sees before deciding.",
            "The body then makes the campaign\u2019s argument at email length. Not the social caption with more words around it: a piece written for someone who has opened something deliberately and will read a few paragraphs if they are worth reading, ending in one clear thing to do.",
          ],
        },
        {
          heading: "AI email copy that is not generic email copy",
          paragraphs: [
            "An email campaign ai that writes from the brief alone produces something competent and anonymous. CampaignX writes from the brief and a brand model built from your own material, so the register, sentence length and vocabulary are drawn from copy you have already approved in the past.",
            "That is also why the email agrees with the rest of the campaign. It is produced at the same time as the social posts and the SMS, from one brief, so a subscriber who also follows you does not receive three different versions of the same announcement in a week.",
          ],
        },
        {
          heading: "Artwork sized for the inbox, generated with the words",
          paragraphs: [
            "Every campaign ships with visuals matched to your brand, and the email\u2019s artwork is generated alongside its copy rather than sourced afterwards. That is the difference between an image that illustrates the line it sits next to and a stock photograph chosen because it was the right shape.",
            "If a visual misses, regenerate that one asset and leave the rest of the campaign alone. The same is true of the copy: edit it in place, regenerate just the email, or rewrite the brief and rebuild everything from it.",
          ],
        },
        {
          heading: "Approval, sending and your existing stack",
          paragraphs: [
            "Nothing sends without a named approver. You read the email beside the rest of the campaign, as it will actually arrive, and it goes out on your word rather than on a schedule nobody reviewed.",
            "CampaignX is not trying to replace the systems your customer data lives in. Keep your CRM and your analytics; webhooks push campaign events to the rest of your stack as the campaign publishes.",
          ],
          list: [
            "Subject line and preview text written together",
            "Body copy in your brand voice, with one clear call to action",
            "Artwork generated with the copy and matched to your brand",
            "A named approver before anything sends",
          ],
        },
      ],
      aside: {
        heading: "At a glance",
        body: "One brief produces the subject line, preview text, body and artwork, written alongside your social posts and SMS so the campaign reads as one idea. Nothing sends without a named approver.",
      },
    },
    faqs: [
      {
        question: "Do we need our own email service?",
        answer:
          "CampaignX publishes to connected platforms. [CONFIRM with SuperMIA] whether customers bring their own SMTP provider for email sending.",
      },
      {
        question: "Can we edit the email before it goes out?",
        answer:
          "Yes. Edit any part of it, regenerate just the email, or rewrite the brief. Nothing sends until a named approver signs off.",
      },
      {
        question: "Will the email match our social posts?",
        answer:
          "Yes. They are produced together from one brief and one brand model, so the campaign reads as one idea across channels.",
      },
      {
        question: "Does the email include images?",
        answer:
          "Yes. Every campaign ships with visuals matched to your brand, including artwork for the email.",
      },
    ],
  },

  sms: {
    key: "sms",
    title: "AI SMS Marketing That Matches the Rest of Your Campaign",
    metaTitle: "AI SMS Marketing Campaigns | CampaignX",
    description:
      "Write SMS marketing messages that match your social posts and emails, from the same brief, and send them only after your team approves.",
    eyebrow: "SMS",
    intro:
      "AI SMS marketing written from the same brief as the rest of the campaign. Short, on-brand messages that still sound like you, held until a named approver releases them.",
    highlights: ["Built for the format", "One brief, one voice", "Nothing sends unapproved"],
    writes: [
      {
        kicker: "The message",
        title: "Short, and still yours",
        body: "SMS is the hardest format to sound human in. The brand model is what keeps a 160-character message from reading like a system alert.",
      },
      {
        kicker: "The ask",
        title: "One clear action",
        body: "A text with two requests in it gets neither. Each message carries the campaign's single next step.",
      },
      {
        kicker: "The timing",
        title: "Scheduled with the campaign",
        body: "Sent as part of the campaign calendar rather than as a separate job someone has to remember.",
      },
    ],
    consistency: {
      heading: "Consistent with the rest of the campaign",
      intro:
        "The SMS is written alongside the email and the social posts, from one brief. Someone who gets the text and opens the email should recognise the same campaign, not two unrelated messages.",
    },
    publish: {
      heading: "Approve and publish",
      intro:
        "Nothing sends without a named approver. SMS reaches people on their phone, which is exactly why the approval step is not optional.",
    },
    prose: {
      heading: "What good SMS marketing actually requires",
      intro:
        "SMS is the shortest format in the campaign and the least forgiving. A text that misses the brand by a little misses it completely.",
      blocks: [
        {
          heading: "160 characters is a brand voice problem, not a length problem",
          paragraphs: [
            "Trimming a paragraph to fit a text message is easy. Making those characters sound like a company rather than a system notification is not. Too formal and it reads like a bank alert; too casual and it could be from anyone. This is the format where a generic model is most obvious, because there is nowhere for a weak line to hide.",
            "CampaignX writes SMS from the same brand model as the rest of the campaign \u2014 built from material you have already written \u2014 so the register is yours before anyone edits it. Text message marketing ai that starts from a generic idea of promotional language produces exactly the tone most people have learned to ignore.",
          ],
        },
        {
          heading: "One message, one action",
          paragraphs: [
            "A text with two requests in it gets neither. Each message carries the campaign\u2019s single next step, stated plainly, with the link that step needs and nothing competing with it.",
            "Because the SMS is produced from the same brief as the email and the social posts, that action is the same action. Someone who gets the text and later opens the email should recognise one campaign rather than two unrelated messages that happen to share a sender.",
          ],
        },
        {
          heading: "An SMS marketing campaign scheduled with everything else",
          paragraphs: [
            "The text is not a separate job someone has to remember on the day. It sits on the same campaign calendar as the posts and the email, scheduled as part of the sequence, so the message that is supposed to arrive on day three arrives on day three.",
            "Timing matters more here than anywhere else in the campaign, because SMS reaches people on their phone whether or not they were thinking about you. That is also exactly why the approval step is not optional.",
          ],
        },
        {
          heading: "Approval, consent and who is responsible",
          paragraphs: [
            "Nothing sends without a named approver. You read the message as it will arrive, beside the rest of the campaign, and it goes out on your word.",
            "You remain responsible for reviewing and approving everything before it is published, and for following each connected platform\u2019s terms \u2014 that is set out in the CampaignX terms. Messaging compliance, including consent and opt-out handling, is yours to meet; CampaignX does not send anything you have not approved.",
          ],
          list: [
            "Written from the same brief and brand model as every other channel",
            "One clear action per message",
            "Scheduled on the campaign calendar, not separately",
            "Held until a named approver releases it",
          ],
        },
      ],
      aside: {
        heading: "At a glance",
        body: "SMS written from the same brief as your email and social posts, in your brand voice, carrying one action, scheduled with the campaign and sent only after a named approver signs off.",
      },
    },
    faqs: [
      {
        question: "Do we need our own SMS provider?",
        answer:
          "The privacy policy lists Twilio credentials among the third-party connection data CampaignX stores, which suggests customers connect their own account. [CONFIRM with SuperMIA] before publishing this answer.",
      },
      {
        question: "Can a text go out before we have seen it?",
        answer:
          "No. Nothing sends without a named approver, SMS included.",
      },
      {
        question: "Will the SMS match our other channels?",
        answer:
          "Yes. It is written from the same brief and brand model as the email and the social posts.",
      },
      {
        question: "Who is responsible for messaging compliance?",
        answer:
          "You are responsible for reviewing and approving everything before it is published, and for following each connected platform's terms. That is set out in the CampaignX terms.",
      },
    ],
  },
};

/** Cross-links shown at the foot of every channel page. */
export const CHANNEL_LINKS = [
  {
    title: "Brand voice",
    body: "The model that keeps every channel sounding like you.",
    href: ROUTES.brandVoice.href,
  },
  {
    title: "Approvals",
    body: "A named approver before anything is published.",
    href: ROUTES.approvals.href,
  },
  {
    title: "Multi-channel publishing",
    body: "All seven channels and one calendar.",
    href: ROUTES.multiChannel.href,
  },
] as const;
