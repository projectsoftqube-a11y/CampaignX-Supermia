import type { BlogPost } from "@/config/pages/blog";

/**
 * /blog/brand-voice-guidelines
 *
 * Primary keyword "brand voice guidelines". Supports
 * /features/brand-voice. The angle the brief asks for — guidelines
 * that both people *and* AI tools can follow — is what keeps this off
 * the generic "find your brand voice" territory everyone else covers.
 */
export const post: BlogPost = {
  slug: "brand-voice-guidelines",
  title: "Brand Voice Guidelines: How to Write Them So People and AI Follow Them",
  metaTitle: "Brand Voice Guidelines People and AI Can Follow",
  description:
    "How to write brand voice guidelines with examples, do and don't lists and sample lines that both your team and AI tools can follow consistently.",
  excerpt:
    "Most tone documents are three adjectives nobody can act on. Here is what to write instead, and why examples beat descriptions.",
  category: "campaign-strategy",
  published: "2026-10-27",
  readingMinutes: 8,
  standfirst:
    "Useful brand voice guidelines are mostly examples. Three adjectives tell a writer nothing they can act on; two columns of sentences you would and would not publish tell them everything.",
  related: [
    { label: "All posts", href: "/blog" },
    { label: "How brand voice works", href: "/features/brand-voice" },
    { label: "Campaign strategy", href: "/blog/category/campaign-strategy" },
  ],
  body: [
    {
      kind: "p",
      text: "Ask any team to describe their brand voice and you get the same three adjectives: friendly, professional, approachable. Every brand in every category picks from the same short list, which is the clearest evidence that the words are not doing any work.",
    },
    {
      kind: "p",
      text: "The problem is not that teams have no voice. It is that brand voice guidelines written as adjectives cannot be followed — not by a new writer, not by an agency, and not by an AI tool. \"Be friendly\" has no failure condition. Nobody has ever handed in a draft and been told it was insufficiently friendly in a way they could fix.",
    },

    { kind: "h2", text: "Why adjectives fail and examples work" },
    {
      kind: "p",
      text: "A description tells someone what to aim at. An example tells them what hitting it looks like. Only one of those can be checked against a draft.",
    },
    {
      kind: "p",
      text: "Consider \"warm but not casual\". Two writers will read that completely differently, and both will believe they followed it. Now consider the same instruction as a pair of lines:",
    },
    {
      kind: "template",
      label: "Warm but not casual",
      lines: [
        "Yes:  Your spring offer is ready. It runs for two weeks.",
        "No:   Hey! 🌸 Big spring news just for you!!",
        "No:   Please be advised that promotional rates are now active.",
      ],
    },
    {
      kind: "p",
      text: "Three sentences, and the boundary is now unambiguous in both directions. That is the whole technique: every rule in your guidelines should come with a line you would publish and a line you would not.",
    },

    { kind: "h2", text: "What to put in brand voice guidelines" },
    {
      kind: "p",
      text: "Six sections, each short, each with examples. If a section cannot carry an example, it is a description and it should be cut.",
    },
    {
      kind: "steps",
      items: [
        {
          title: "Words you use, and words you never use",
          body: "The most immediately useful section and the easiest to write. \"We say customers, not users. We say price, not investment. We never say solutions.\"",
        },
        {
          title: "Sentence length and rhythm",
          body: "Do you write short declaratives or longer qualified sentences? Show a paragraph of each, and say which one is yours.",
        },
        {
          title: "How direct to be",
          body: "Whether you open with the offer or the reason for it. Whether you hedge. A brand that says \"this will save you two hours\" is a different company from one that says \"this may help reduce time spent\".",
        },
        {
          title: "What you never claim",
          body: "The limits. Guarantees you do not make, comparisons you do not draw, numbers you will not state without a source. This section prevents more bad copy than all the others combined.",
        },
        {
          title: "How formality shifts by channel",
          body: "LinkedIn and SMS are not the same register, and pretending otherwise produces copy that is wrong in one of the two. Name the shift explicitly.",
        },
        {
          title: "Three before-and-after rewrites",
          body: "Take real copy that missed, and show the corrected version. Nothing teaches a voice faster than watching one applied.",
        },
      ],
    },

    { kind: "h2", text: "Writing guidelines an AI tool can follow" },
    {
      kind: "p",
      text: "This is where most documents fall down now, because they were written for human readers who can infer. A generative tool cannot infer; it pattern-matches on what you give it.",
    },
    {
      kind: "p",
      text: "Three things make guidelines machine-usable, and all three make them more useful to people too.",
    },
    {
      kind: "list",
      items: [
        "Examples over descriptions. A model given twenty sentences in your register will produce a twenty-first. A model given the word \"authentic\" will produce what everyone else means by authentic.",
        "Negative examples, explicitly marked. Knowing what not to write is as strong a signal as knowing what to write, and most guidelines omit it entirely.",
        "Real published copy, not invented samples. Copy you actually shipped carries your register. Copy written to demonstrate your register usually overshoots it.",
      ],
    },
    {
      kind: "note",
      text: "The strongest source material is the copy you have already edited and approved. It is the only writing that is provably in your voice, because you signed it off.",
    },

    { kind: "h2", text: "Deriving the rules you already follow" },
    {
      kind: "p",
      text: "Writing guidelines from scratch produces aspiration. Deriving them from copy you have already published produces description, and description is what a writer can actually act on.",
    },
    {
      kind: "p",
      text: "The exercise takes an afternoon. Collect ten pieces you were happy with — site pages, a launch email, posts that landed. Then read them looking for patterns rather than quality.",
    },
    {
      kind: "list",
      items: [
        "Count sentence lengths. Most brands cluster tightly, and the number surprises people.",
        "Mark every word that appears repeatedly and is not generic. That is your vocabulary.",
        "Note how often you hedge. \"Might\", \"could help\", \"generally\" — either it is your register or it is a habit worth naming.",
        "Find where you open with the offer and where you open with context. The ratio is a rule nobody wrote down.",
        "List what you never say. Easiest spotted by comparing against a competitor page.",
      ],
    },
    {
      kind: "p",
      text: "Half an hour of that produces more usable guidance than a workshop, because every line of it is evidenced by something you already published and approved.",
    },

    { kind: "h2", text: "Who the document is for" },
    {
      kind: "p",
      text: "Guidelines are read by three audiences, and most documents serve only the first.",
    },
    {
      kind: "steps",
      items: [
        {
          title: "People who already know the voice",
          body: "They need the edge cases, not the basics. Give them the limits section and the channel shifts.",
        },
        {
          title: "People who are new to it",
          body: "A freelancer or a new hire needs the examples first. Put the yes-and-no pairs at the front, not in an appendix.",
        },
        {
          title: "Tools",
          body: "A generative model needs volume and labelling: many examples, clearly marked as good or bad. Prose paragraphs about tone are close to useless to it.",
        },
      ],
    },
    {
      kind: "p",
      text: "One document can serve all three if it leads with examples and keeps the explanation short. It cannot if it leads with philosophy.",
    },

    { kind: "h2", text: "A template to start from" },
    {
      kind: "p",
      text: "One page per section is plenty. Here is the shape:",
    },
    {
      kind: "template",
      label: "Brand voice guidelines",
      lines: [
        "WORDS",
        "  We say: ..........  We never say: ..........",
        "",
        "SENTENCES",
        "  Typical length: ..........",
        "  Example paragraph: ..........",
        "",
        "DIRECTNESS",
        "  We open with: ..........",
        "  We avoid hedging like: ..........",
        "",
        "LIMITS",
        "  We never claim: ..........",
        "",
        "BY CHANNEL",
        "  LinkedIn: ..........  SMS: ..........",
        "",
        "REWRITES",
        "  Before: ..........  After: ..........",
      ],
    },

    { kind: "h2", text: "Common mistakes" },
    {
      kind: "p",
      text: "Four failures account for most unusable guideline documents, and all four are easy to check for before you circulate.",
    },
    {
      kind: "list",
      items: [
        "Describing an aspiration rather than the voice. If the document describes a company you would like to be, writers will produce copy that does not match anything else you publish.",
        "Confusing voice with messaging. What you say changes by campaign; how you say it should not. Keeping them in one document means the voice gets revised every time a campaign does.",
        "Too long. Twenty pages will not be read before a task, and a document that is not read before a task has no effect on the work.",
        "No negative examples. A document that only shows good copy leaves every ambiguity unresolved, which is where drift begins.",
      ],
    },
    {
      kind: "note",
      text: "A reasonable test: hand the document to someone who has never written for you, give them a brief, and see whether the draft comes back recognisable. If it does not, the gap is in the document rather than in the writer.",
    },

    { kind: "h2", text: "Keeping them alive" },
    {
      kind: "p",
      text: "Most guidelines are written once, circulated, and never opened again. The ones that survive have two properties: they are short enough to read before a task, and they get updated when someone makes a correction.",
    },
    {
      kind: "p",
      text: "That second one matters more than it sounds. Every time an editor changes a line, there was a rule being applied — usually one that is not written down. Capturing those corrections is how a document stops being a launch artefact and becomes the actual record of how you write.",
    },
    {
      kind: "p",
      text: "CampaignX works the same way from the other direction: it builds a brand model from material you have already published, then every correction you make at the approval step feeds back into it. You end up with guidelines that were derived from your writing rather than guessed at in a workshop — which is usually the difference between a document people follow and one they forget.",
    },
  ],
};
