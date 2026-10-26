import type { FaqItem } from "@/lib/schema";

/**
 * Content for the four use-case pages.
 *
 * Their briefs share one outline (the problem, how CampaignX helps, a
 * campaign in practice, FAQs), so they share a template and differ only
 * here. The pain-point language comes from the Fact Sheet's working
 * phrases, which are explicitly *not* customer quotes and must never be
 * presented as such.
 */

export interface UseCasePage {
  key: "smallBusiness" | "agencies" | "marketingTeams" | "founders";
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  crumb: string;
  intro: string;
  highlights: readonly string[];
  /**
   * The story arc. `tension` states the problem as a scene rather than a
   * bullet list, `turn` is the moment it changes, `resolution` is what the
   * week looks like afterwards. Each carries a pull-quote drawn from the
   * Fact Sheet's working pain-point language — never presented as a
   * customer quote, because none of it is.
   */
  story: {
    tension: { heading: string; body: string; pullquote: string };
    turn: { heading: string; body: string; pullquote?: string };
    resolution: { heading: string; body: string; pullquote?: string };
  };
  /** H2 #1 */
  problem: {
    intro: string;
    points: readonly { title: string; body: string }[];
  };
  /** H2 #2 */
  helps: {
    intro: string;
    points: readonly { title: string; body: string; kicker?: string }[];
  };
  /** H2 #3: a worked example, written as a sequence. */
  practice: {
    intro: string;
    steps: readonly { marker: string; title: string; body: string }[];
  };
  faqs: readonly FaqItem[];
}

const APPROVAL_FAQ: FaqItem = {
  question: "Can CampaignX publish something without approval?",
  answer:
    "No. Nothing sends without a named approver, on any channel. You can edit any asset or regenerate a single channel before you approve.",
};

const DATA_FAQ: FaqItem = {
  question: "Do you train your models on our data?",
  answer:
    "Your data is not used to train shared models or pooled with other customers' data. The terms do allow anonymized patterns to be used to improve the service.",
};

export const USE_CASE_PAGES: Record<UseCasePage["key"], UseCasePage> = {
  smallBusiness: {
    key: "smallBusiness",
    title:
      "AI Marketing for Small Businesses: A Full Campaign Without a Full Team",
    metaTitle: "AI Marketing Tool for Small Businesses | CampaignX",
    description:
      "Run campaigns like a bigger team: write one brief and CampaignX plans, writes, designs and schedules it across social, email and SMS for your approval.",
    eyebrow: "Small Business",
    crumb: "Small Business",
    intro:
      "An AI marketing tool for small business owners who are also the marketing department. Write one brief and get a campaign for social, email and SMS to review and ship.",
    highlights: ["No designer needed", "About ten minutes to a first campaign", "You approve everything"],
    story: {
      tension: {
        heading: "The campaign that never quite got written",
        body: "It is on the list. It has been on the list since the start of the month. Every week something more urgent arrives, and the promotion that was supposed to run in spring is still a note on your phone in June.",
        pullquote: "The campaign took three weeks to launch. Mostly it was waiting.",
      },
      turn: {
        heading: "Then the input becomes one sentence",
        body: "Not a brief document, not a content calendar, not a design request. A sentence about what you are promoting, who it is for and what you want them to do. CampaignX takes it from there and comes back with the campaign.",
        pullquote: "Write one sentence. Get a whole campaign back.",
      },
      resolution: {
        heading: "What the morning looks like instead",
        body: "You write the sentence before the shop opens. Ten minutes later there are posts, an email and an SMS, each with artwork, all sounding like you. You change the two things only you would have caught, approve it, and it schedules itself across the fortnight.",
      },
    },
    problem: {
      intro:
        "Most small businesses do not have a marketing problem. They have a time problem.",
      points: [
        {
          title: "The campaign never gets written",
          body: "It stays on the list behind everything that is actually on fire this week.",
        },
        {
          title: "One idea, rewritten for every channel",
          body: "The same message retyped for Instagram, then email, then the Google Business listing.",
        },
        {
          title: "No time to make the visuals",
          body: "So the post goes out as plain text, or it does not go out at all.",
        },
      ],
    },
    helps: {
      intro:
        "CampaignX does the assembly. You still decide what the campaign says and whether it ships.",
      points: [
        {
          kicker: "Write once",
          title: "One brief is the whole input",
          body: "A sentence about what you are promoting is enough to start.",
        },
        {
          kicker: "Everything comes back",
          title: "Copy and visuals for seven channels",
          body: "Including the artwork, so a campaign does not wait on finding a designer.",
        },
        {
          kicker: "Your call",
          title: "Nothing publishes until you say so",
          body: "Read it, change what is wrong, then let it go out.",
        },
      ],
    },
    practice: {
      intro: "A seasonal promotion, start to finish.",
      steps: [
        {
          marker: "Monday morning",
          title: "Write the brief",
          body: "One sentence: a spring offer, running for two weeks, aimed at existing customers.",
        },
        {
          marker: "Ten minutes later",
          title: "Read the campaign",
          body: "Posts for Instagram, Facebook and Google Business, an email and an SMS, each with artwork, all in your brand voice.",
        },
        {
          marker: "Before lunch",
          title: "Fix the two things that are wrong",
          body: "Edit the SMS, regenerate the Instagram visual, leave the rest as it is.",
        },
        {
          marker: "Approved",
          title: "It schedules itself",
          body: "The campaign publishes across the fortnight, and reporting shows which channels did the work.",
        },
      ],
    },
    faqs: [
      {
        question: "Do I need marketing experience to use this?",
        answer:
          "No. You write a sentence about what you are promoting. CampaignX turns that into the campaign, and you approve it before anything publishes.",
      },
      {
        question: "How long before the first campaign is ready?",
        answer:
          "About ten minutes for a first campaign. A brand model you really trust usually takes about one afternoon of giving it material and correcting what comes back.",
      },
      APPROVAL_FAQ,
      {
        question: "What does it cost?",
        answer:
          "The Starter plan is free during Beta. Pricing sets out what each plan includes.",
      },
    ],
  },

  agencies: {
    key: "agencies",
    title: "AI Marketing Tool for Agencies: On-Brand Campaigns for Every Client",
    metaTitle: "AI Marketing Tool for Agencies | CampaignX",
    description:
      "Produce on-brand campaigns for every client from one brief each, written in each brand's voice, with a named approver before anything ships.",
    eyebrow: "Agencies",
    crumb: "Agencies",
    intro:
      "An AI marketing tool for agencies running campaigns across several clients. A separate brand model per client, a named approver per campaign, and one brief to start each one.",
    highlights: ["A brand model per client", "Named approver per campaign", "Seven channels each"],
    story: {
      tension: {
        heading: "Five clients, five voices, one week",
        body: "Each client needs a campaign. Each sounds different. A generic draft is worse than no draft, because someone still has to rewrite it, and that someone is billable.",
        pullquote: "Same message rewritten for every channel. Then again for every client.",
      },
      turn: {
        heading: "Then every client gets their own model",
        body: "A separate workspace per client, each with a brand model built from that client's own site and past campaigns. The first draft already sounds like them, so the work shifts from writing to judgement.",
        pullquote: "One brief each. The assembly is handled for all of them.",
      },
      resolution: {
        heading: "Five campaigns, and the approvals on record",
        body: "Each campaign goes out under a named approver, so nobody is searching an email thread for who signed off. The voices stay separate because the models are separate, and your data is never pooled with anyone else's.",
      },
    },
    problem: {
      intro:
        "Agency work does not scale by hiring one more person per client. It scales or it does not.",
      points: [
        {
          title: "Every client sounds different",
          body: "And a generic AI draft sounds like none of them, which means rewriting it anyway.",
        },
        {
          title: "Approvals go missing",
          body: "Sign-off lives in an email thread, and nobody is sure who actually approved the post that went out.",
        },
        {
          title: "The same campaign, five times over",
          body: "Five clients, the same assembly work, none of it reusable because the voices differ.",
        },
      ],
    },
    helps: {
      intro:
        "One workspace per client, each with its own brand model built from that client's own material.",
      points: [
        {
          kicker: "Separated",
          title: "A workspace per client",
          body: "Separate brand models, campaigns and approvals, so one client's voice never reaches another.",
        },
        {
          kicker: "Accountable",
          title: "A named approver on every campaign",
          body: "Sign-off is attached to a person, not a thread. Nothing publishes without it.",
        },
        {
          kicker: "Repeatable",
          title: "The same ten minutes per client",
          body: "One brief each, and the assembly is handled for all of them.",
        },
      ],
    },
    practice: {
      intro: "A product launch for one client, with three more running the same week.",
      steps: [
        {
          marker: "Per client",
          title: "Their brand model, not a house style",
          body: "Built from that client's own site and past campaigns, so the output sounds like them from the first draft.",
        },
        {
          marker: "One brief",
          title: "Write the launch in a sentence",
          body: "CampaignX plans and writes it across social, email and SMS in their voice.",
        },
        {
          marker: "Internal review",
          title: "Your team edits before the client sees it",
          body: "Fix anything that misses, regenerate a single channel, keep the rest.",
        },
        {
          marker: "Client sign-off",
          title: "A named approver releases it",
          body: "The approval is recorded against a person, and only then does it publish.",
        },
      ],
    },
    faqs: [
      {
        question: "Can we run several client brands in one account?",
        answer:
          "Yes. Each client has its own workspace and its own brand model, built from that client's material.",
      },
      {
        question: "Will one client's brand voice leak into another's campaigns?",
        answer:
          "No. Brand models are per workspace, and your data is not pooled with other customers' data.",
      },
      APPROVAL_FAQ,
      {
        question: "How many seats do we get?",
        answer:
          "The Team plan lists unlimited seats. Pricing sets out what each plan includes.",
      },
    ],
  },

  marketingTeams: {
    key: "marketingTeams",
    title: "AI for Marketing Teams: Brief to Launch Without the Handoffs",
    metaTitle: "AI for Marketing Teams | CampaignX",
    description:
      "Cut the handoffs between strategy, copy, design and scheduling. CampaignX turns one brief into an approved, multi-channel campaign your whole team can see.",
    eyebrow: "Marketing Teams",
    crumb: "Marketing Teams",
    intro:
      "AI for marketing teams that lose more time to handoffs than to the work. One brief becomes a full campaign in one workspace, with approval built into the flow.",
    highlights: ["One workspace", "No tool-to-tool handoffs", "Approval in the flow"],
    story: {
      tension: {
        heading: "The handoffs cost more than the work",
        body: "The brief is in one tool, the copy in another, the creative in a third, the schedule in a fourth. Nobody can see the whole campaign at once, and reviewing it means opening five tabs and trusting they match.",
        pullquote: "Four tools that do not talk to each other.",
      },
      turn: {
        heading: "Then the brief drives everything",
        body: "One sentence agreed in the room becomes the campaign across every channel, in the brand voice the team already agreed on. Change the brief and it rebuilds, instead of five people updating five documents.",
        pullquote: "Brief to launch, without the handoffs.",
      },
      resolution: {
        heading: "A weekly cadence that is actually weekly",
        body: "Everyone reviews the same thing, edits land in place, and a named approver releases it. Reporting comes back against the campaign rather than one dashboard per platform, so the next brief starts from what happened.",
      },
    },
    problem: {
      intro:
        "The campaign is rarely the hard part. Moving it between four tools and three people is.",
      points: [
        {
          title: "Four tools that do not talk to each other",
          body: "The brief is in one, the copy in another, the creative in a third, the schedule in a fourth.",
        },
        {
          title: "The campaign took three weeks to launch",
          body: "Most of it spent waiting rather than working.",
        },
        {
          title: "Nobody can see the whole thing",
          body: "Reviewing a campaign means opening five tabs and trusting that they match.",
        },
      ],
    },
    helps: {
      intro:
        "Strategy, copy, creative, approval and scheduling in one place, driven by the same brief.",
      points: [
        {
          kicker: "One place",
          title: "The whole campaign in one view",
          body: "Every channel's copy and creative together, as it will actually publish.",
        },
        {
          kicker: "No rekeying",
          title: "The brief drives everything",
          body: "Change the brief and the campaign rebuilds, instead of five people updating five documents.",
        },
        {
          kicker: "Built in",
          title: "Approval is a step, not an email",
          body: "A named approver signs off inside the campaign, and that is what releases it.",
        },
      ],
    },
    practice: {
      intro: "A weekly campaign cadence, without the weekly scramble.",
      steps: [
        {
          marker: "Planning",
          title: "The brief is the meeting output",
          body: "One sentence agreed in the room, rather than a deck that then has to be turned into copy.",
        },
        {
          marker: "Production",
          title: "The campaign is built from it",
          body: "Copy and creative for every channel, in the team's agreed brand voice.",
        },
        {
          marker: "Review",
          title: "Everyone reads the same thing",
          body: "One view of the campaign, with edits made in place rather than tracked in comments elsewhere.",
        },
        {
          marker: "Launch",
          title: "Approved, scheduled, reported",
          body: "It publishes on the calendar, and the reporting comes back against the campaign rather than per platform.",
        },
      ],
    },
    faqs: [
      {
        question: "Do we have to replace our existing tools?",
        answer:
          "No. Keep your CRM and your analytics. Webhooks send campaign data to the rest of your stack.",
      },
      {
        question: "How does this fit a team that already has writers?",
        answer:
          "The draft arrives written in your brand voice, and your writers edit rather than start from a blank page. Nothing publishes without a named approver.",
      },
      APPROVAL_FAQ,
      DATA_FAQ,
    ],
  },

  founders: {
    key: "founders",
    title: "AI Marketing for Founders and Startups",
    metaTitle: "AI Marketing for Founders and Startups | CampaignX",
    description:
      "No marketing team yet? Write one brief and CampaignX builds the campaign across social, email and SMS in your voice, for you to approve and ship.",
    eyebrow: "Founders",
    crumb: "Founders",
    intro:
      "AI marketing for startups without a marketing hire yet. You write the brief, because you know the product best. CampaignX does the assembly.",
    highlights: ["No marketing hire needed", "Ten minutes, not a morning", "Your voice, your approval"],
    story: {
      tension: {
        heading: "Marketing is the thing that slips",
        body: "It competes with the product, the customers and the hiring, and it loses every time. When it does happen, the quickest option produces drafts that do not sound like the company, so they get rewritten or quietly dropped.",
        pullquote: "Copy that sounds like AI. So it never ships.",
      },
      turn: {
        heading: "Then the model learns from what you already wrote",
        body: "Your site, your posts, the launch note you spent an evening on. The drafts start in your register rather than in a generic one, which is the difference between editing and rewriting.",
        pullquote: "You keep the part only you can do: deciding what to say.",
      },
      resolution: {
        heading: "Announced, and you know what landed",
        body: "A feature announcement goes out across the channels your customers actually use, with the technical claim corrected by the one person who would catch it. Afterwards the reporting tells you which channel did the work, and the next announcement starts there.",
      },
    },
    problem: {
      intro:
        "Founders are rarely short of things to say. They are short of the hours it takes to say them in six places.",
      points: [
        {
          title: "Marketing is the task that slips",
          body: "It competes with the product, the customers and the hiring, and it usually loses.",
        },
        {
          title: "Copy that sounds like AI",
          body: "The quickest option produces drafts that do not sound like the company, so they get rewritten or dropped.",
        },
        {
          title: "No idea what worked",
          body: "Posts go out, something happens, and none of it informs the next one.",
        },
      ],
    },
    helps: {
      intro:
        "You keep the part only you can do: deciding what to say. The rest is assembly.",
      points: [
        {
          kicker: "Your words first",
          title: "A brand model from your own writing",
          body: "Built from the site and posts you have already written, so the drafts start in your register.",
        },
        {
          kicker: "Fast",
          title: "About ten minutes to a first campaign",
          body: "Short enough to fit between two other things, which is the only way it will happen.",
        },
        {
          kicker: "Safe",
          title: "Nothing goes out unapproved",
          body: "You are the named approver. Nothing publishes until you release it.",
        },
      ],
    },
    practice: {
      intro: "Announcing a feature, on a day that already has too much in it.",
      steps: [
        {
          marker: "The brief",
          title: "One sentence about the feature",
          body: "What it does and who should care. That is the input.",
        },
        {
          marker: "The campaign",
          title: "Posts, an email and an SMS",
          body: "Written in your voice with visuals, across the channels where your customers already are.",
        },
        {
          marker: "Your edit",
          title: "Change the bits only you would catch",
          body: "Usually the technical claim. Edit it in place and leave the rest.",
        },
        {
          marker: "Shipped",
          title: "It publishes and reports back",
          body: "You find out which channel actually reached people, and the next announcement starts from that.",
        },
      ],
    },
    faqs: [
      {
        question: "I have never run a campaign. Is this usable?",
        answer:
          "Yes. The input is a sentence about what you are announcing. CampaignX plans the campaign from it, and you approve what comes back.",
      },
      {
        question: "Will it sound like our company or like AI?",
        answer:
          "It learns from material you have already written, and you approve every asset. If a line is wrong, edit it or regenerate that channel.",
      },
      {
        question: "What does it cost to start?",
        answer:
          "The Starter plan is free during Beta. Pricing sets out what each plan includes.",
      },
      DATA_FAQ,
    ],
  },
};
