import type {
  CampaignStage,
  FaqItem,
  PricingPlan,
  Testimonial,
  HeroChannel,
  HowStep,
  Platform,
} from "@/types/content";

/* ---------------------------------------------------------------- hero -- */

export const hero = {
  /**
   * One entry per visual line. `highlight` names the word in that line to
   * set in the hand-drawn face; it must appear in the line verbatim.
   */
  headline: [
    { text: "Turn one brief into", highlight: "one" },
    { text: "a complete campaign.", highlight: "complete" },
  ],
  supporting:
    "Describe the campaign once. CampaignX writes the strategy, generates the creative, and ships it to every channel in the format that channel expects.",
  primaryCta: { label: "Start a Campaign", href: "#start" },
  secondaryCta: { label: "See how it works", href: "#how" },

  /** The brief that types itself into the prompt bar. */
  prompt: {
    placeholder: "Ask CampaignX to write a campaign for…",
    /**
     * Cycled through in order, each typed out then cleared. Plain language
     * on purpose: these should read like something a person would actually
     * type into the box, not like marketing copy about marketing.
     *
     * Each is written to fill two lines in the bar, so the height never
     * changes between briefs. Keep new ones to a similar length.
     */
    briefs: [
      "Write a campaign to bring back customers who stopped buying from us, and give them a reason to return.",
      "Create a Black Friday sale campaign for my whole store, with a clear offer people will remember.",
      "Make a campaign to get more people to book a demo, and explain what they will actually see on the call.",
      "Launch our new app to people who only use the website, and show them what they are missing.",
      "Build a campaign to fill the seats at next month's webinar, and tell people what they will learn.",
      "Write a summer sale campaign for our clothing collection, aimed at people shopping on their phones.",
      "Create a campaign to tell everyone about our new prices, and be honest about what is changing.",
      "Make a welcome campaign for people who just signed up, and help them get started in a few minutes.",
      "Write a campaign to remind people about the items they left in their cart, without sounding pushy.",
      "Build a back to school campaign for parents, and keep the tone calm and genuinely helpful.",
      "Create a campaign to get more reviews from happy customers, and make it easy for them to reply.",
      "Write a campaign to share our biggest news this year, and say plainly why it matters to customers.",
      "Make a campaign that gets people to invite their friends, and explain the reward in one sentence.",
      "Create a thank you campaign for our most loyal customers, and make them feel genuinely appreciated.",
      "Write a campaign to win back the people who left last month, and ask what we could have done better.",
    ],
    action: "Generate",
    hint: "Free to start · no credit card",
  },

  /**
   * The three devices below the routing strip. Drop a 9:16 clip into
   * public/videos, then add `src` + `poster` here to swap the animated
   * placeholder for real footage — no component changes needed.
   */
  channels: [
    {
      name: "Instagram",
      output: "Story frame + square post",
      icon: "sparkles",
      platform: "instagram",
      mock: "story",
      src: "/videos/campaignx-instagram.mp4",
    },
    {
      name: "SMS",
      output: "Broadcast + reply",
      icon: "message",
      platform: "sms",
      mock: "chat",
    },
    {
      name: "Email",
      output: "Subject line + 3 variants",
      icon: "mail",
      platform: "email",
      mock: "email",
      src: "/videos/campaignx-email.mp4",
    },
  ] as const satisfies readonly HeroChannel[],
} as const;

/* -------------------------------------------------------- social proof -- */

export const socialProof = {
  statement:
    "Write it once. CampaignX reformats and ships it to each platform in the format that platform expects.",
  platforms: [
    { id: "instagram", name: "Instagram" },
    { id: "facebook", name: "Facebook" },
    { id: "linkedin", name: "LinkedIn" },
    { id: "google", name: "Google Business" },
    { id: "x", name: "X" },
    { id: "email", name: "Email" },
    { id: "sms", name: "SMS" },
  ] as const satisfies readonly Platform[],
};

/* ------------------------------------------------------------- problem -- */

export const problem = {
  eyebrow: "The cost of fragmentation",
  heading: "Three weeks. Four tools. One campaign.",
  headingHighlight: "Four tools",
  supporting: [
    "This is what shipping a single campaign actually looks like.",
  ],

  beforeLabel: "Without CampaignX",
  afterLabel: "With CampaignX",

  /**
   * One entry per stage, carrying both sides. Keeping them in a single
   * object rather than two parallel arrays is what guarantees the before
   * and after rows stay aligned as copy changes.
   */
  stages: [
    {
      role: "Strategy",
      tool: "The doc",
      days: "4 days",
      loss: "Written once, then nobody reopens it",
      time: "2 min",
      instead: "The brief is the strategy",
    },
    {
      role: "Creative",
      tool: "The design file",
      days: "7 days",
      loss: "Off-brand by the third variant",
      time: "6 min",
      instead: "Every variant from one brand model",
    },
    {
      role: "Distribution",
      tool: "The ad manager",
      days: "6 days",
      loss: "Each channel rebuilt by hand",
      time: "4 min",
      instead: "All channels generate together",
    },
    {
      role: "Reporting",
      tool: "The spreadsheet",
      days: "4 days",
      loss: "Lands after the budget is spent",
      time: "Live",
      instead: "Results feed the next campaign",
    },
  ] as const satisfies readonly CampaignStage[],

  /** The two totals, compared. */
  totals: {
    before: { value: "21", unit: "days", note: "four tools, three handoffs" },
    after: { value: "1", unit: "afternoon", note: "one brief, one workspace" },
  },
} as const;

/* -------------------------------------------------------- how it works -- */

export const howItWorks = {
  eyebrow: "How it works",
  heading: "From a sentence to a shipped campaign.",
  headingHighlight: "shipped",
  supporting:
    "Four steps, and you only write the first one. Everything after it happens in the same workspace, on the same brief.",
  steps: [
    {
      step: "01",
      title: "You write the brief",
      description:
        "One sentence, in your own words. No template, no form, no brief document to circulate.",
      image: "/images/how-01-brief.png",
      points: ["Plain language", "No templates", "No approval chain"],
      stat: { value: "1", label: "sentence" },
      takeaway: "If you can say it to a colleague, you can brief CampaignX.",
    },
    {
      step: "02",
      title: "It learns your brand",
      description:
        "Point it at your site, your guidelines, or a campaign you liked. It builds a private model of how you sound.",
      image: "/images/how-02-brand.png",
      points: ["Private to you", "Voice and tone", "Never trained on"],
      stat: { value: "100%", label: "private" },
      takeaway: "Your model never leaves your workspace.",
    },
    {
      step: "03",
      title: "Every channel, natively",
      description:
        "An email is not a story frame with different margins. Each channel gets copy written for how people read it there.",
      image: "/images/how-03-channels.png",
      points: ["Per-channel copy", "Native formats", "On-brand by default"],
      stat: { value: "9", label: "channels" },
      takeaway: "One brief. Nine formats. All of them on brand.",
    },
    {
      step: "04",
      title: "It learns what worked",
      description:
        "Results go straight back into the model. The next campaign starts from what performed, not a blank page.",
      image: "/images/how-04-learn.png",
      points: ["Live performance", "Reallocates spend", "Rewrites the losers"],
      stat: { value: "24/7", label: "optimising" },
      takeaway: "Every campaign makes the next one better.",
    },
  ] as readonly HowStep[],
};

/* ----------------------------------------------------------- final cta -- */

export const finalCta = {
  heading: "Write the sentence. We ship the campaign.",
  headingHighlight: "sentence",
  supporting:
    "Strategy, creative and every channel — from one line of plain English.",
  primaryCta: { label: "Start a Campaign", href: "#start" },
  secondaryCta: { label: "See how it works", href: "#how" },
  /** The working prompt bar in the closing panel. */
  prompt: {
    action: "Generate",
    hint: "Free to start · no credit card required",
  },
} as const;

export const footerBlurb = "The AI campaign agent for teams who care about craft.";

/* -------------------------------------------------------------- pricing -- */

export const pricing = {
  eyebrow: "Pricing",
  heading: "Start free. Pay when it ships work.",
  headingHighlight: "Start free",
  supporting: ["No card to begin. No per-seat surprise when the team grows."],

  /**
   * PLACEHOLDER PRICING — replace before launch.
   *
   * These figures are plausible SaaS tiers, not decided commercial terms.
   * Nothing else needs changing when the real numbers land: the section
   * reads plan shape, price and features straight from here.
   */
  plans: [
    {
      name: "Starter",
      summary: "For one marketer testing the water.",
      monthly: 0,
      priceNote: "Free forever",
      cta: "Start a Campaign",
      featured: false,
      features: [
        "3 campaigns a month",
        "2 channels",
        "Brand model from one source",
        "Community support",
      ],
    },
    {
      name: "Team",
      summary: "For a marketing team shipping every week.",
      monthly: 79,
      priceNote: "per workspace, billed monthly",
      cta: "Start a Campaign",
      featured: true,
      features: [
        "Unlimited campaigns",
        "All nine channels",
        "Full brand model with approvals",
        "Performance loop and reporting",
        "Unlimited seats",
      ],
    },
    {
      name: "Enterprise",
      summary: "For teams with procurement and a security review.",
      monthly: null,
      priceNote: "Custom",
      cta: "Talk to us",
      featured: false,
      features: [
        "Everything in Team",
        "SSO / SAML and SCIM",
        "Data residency choice",
        "Audit export and retention controls",
        "Named support contact",
      ],
    },
  ] as const satisfies readonly PricingPlan[],
};

/* ------------------------------------------------------------------ faq -- */

export const faq = {
  eyebrow: "Questions",
  heading: "The things people ask first.",
  headingHighlight: "ask first",

  items: [
    {
      question: "Will it sound like us, or like AI?",
      answer:
        "It learns your voice from your own material — your site, your guidelines, your past campaigns — and writes from that model rather than a generic one. You approve everything before it ships, and edits feed back into the model.",
    },
    {
      question: "Do you train on our data?",
      answer:
        "No. Your content, brand model and results stay in your workspace. They are never used to train shared models and never pooled with another customer's data.",
    },
    {
      question: "What if the output is wrong?",
      answer:
        "Nothing sends without a named approver signing off. You can edit any asset directly, regenerate a single channel, or rewrite the brief and start again — the other channels stay as they are.",
    },
    {
      question: "Which channels does it actually publish to?",
      answer:
        "Instagram, Facebook, LinkedIn, Google Business, X, Email and SMS, with webhooks for anything else in your stack. Each one gets copy and creative built for that channel's format, not one asset resized.",
    },
    {
      question: "How long does setup take?",
      answer:
        "Connecting a site and generating a first campaign takes about ten minutes. Building a brand model you trust for everything usually takes one afternoon of feeding it real material and correcting what it gets wrong.",
    },
    {
      question: "Can we keep using our existing tools?",
      answer:
        "Yes. CampaignX replaces the assembly work between them, not necessarily the tools themselves. Most teams keep their CRM and analytics and let CampaignX handle brief-to-launch.",
    },
  ] as const satisfies readonly FaqItem[],
};

/* --------------------------------------------------------- testimonials -- */

export const testimonials = {
  eyebrow: "What teams say",
  heading: "Marketers who stopped assembling campaigns.",
  headingHighlight: "stopped assembling",

  /**
   * PLACEHOLDER TESTIMONIALS — INVENTED PEOPLE AND COMPANIES.
   *
   * These read as real quotes so the section can be designed and reviewed,
   * but every name, role and company below is fictional. Publishing them
   * would be a claim about businesses that do not exist, and it is trivially
   * checkable. Replace all of them with quotes you have permission to use
   * before this page goes live.
   */
  items: [
    {
      quote:
        "We used to block out three weeks for a launch. Last one took an afternoon, and the email outperformed the version our agency wrote.",
      name: "Sofia Marchetti",
      role: "Head of Growth",
      company: "Northwave",
    },
    {
      quote:
        "I was ready to hate the copy. It sounds like us — because it learned from us, not from the internet.",
      name: "Daniel Okoye",
      role: "Brand Lead",
      company: "Rally Goods",
    },
    {
      quote:
        "The per-channel thing is the whole point. We stopped shipping one asset squeezed into five shapes.",
      name: "Priya Raman",
      role: "Marketing Manager",
      company: "Fieldnote",
    },
    {
      quote:
        "Cost per acquisition down 34% in the first quarter, and I am not rebuilding a reporting deck every Monday.",
      name: "Tom Bergström",
      role: "Performance Director",
      company: "Cadence Retail",
    },
    {
      quote:
        "Approvals used to be the bottleneck. Now the whole team works in one place and nothing ships without a sign-off.",
      name: "Amara Diallo",
      role: "Campaign Operations",
      company: "Studio Meridian",
    },
    {
      quote:
        "It caught that our tone shifts between B2B and consumer. I did not tell it that — it worked it out from our old campaigns.",
      name: "Lucas Ferreira",
      role: "Content Strategist",
      company: "Halden & Co",
    },
    {
      quote:
        "Two people now do what took six. That is not a headcount story, it is a nobody-does-copy-paste-anymore story.",
      name: "Emma Lindqvist",
      role: "VP Marketing",
      company: "Orbit Labs",
    },
  ] as const satisfies readonly Testimonial[],
};
