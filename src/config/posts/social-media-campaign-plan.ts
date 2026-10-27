import type { BlogPost } from "@/config/pages/blog";

/**
 * /blog/social-media-campaign-plan
 *
 * Primary keyword "social media campaign plan". Category
 * social-media, supports /channels/social-media. The brief asks for a
 * 30-day template, so the calendar is the centre of the piece rather
 * than an appendix to it.
 */
export const post: BlogPost = {
  slug: "social-media-campaign-plan",
  title: "How to Plan a Social Media Campaign: A 30-Day Template",
  metaTitle: "Social Media Campaign Plan: A 30-Day Template",
  description:
    "Plan a social media campaign step by step: goal, audience, channel mix, content calendar and approvals, with a 30-day template you can adapt.",
  excerpt:
    "A social media campaign plan in five decisions, plus a 30-day calendar you can copy and a note on why most plans collapse in week three.",
  category: "social-media",
  art: "calendar",
  published: "2026-10-27",
  readingMinutes: 9,
  standfirst:
    "A social media campaign plan is five decisions and a calendar. The decisions take an hour; the calendar is where most plans quietly fall apart around day twelve.",
  related: [
    { label: "All posts", href: "/blog" },
    { label: "Social media channels", href: "/channels/social-media" },
    { label: "Social media posts", href: "/blog/category/social-media" },
  ],
  body: [
    {
      kind: "p",
      text: "Most advice on how to plan a social media campaign starts with an empty content calendar, which is the wrong end. A calendar holds dates. It cannot tell you what to post, and filling one in without having made the decisions underneath is how teams end up posting something on day fourteen because the grid had a gap.",
    },
    {
      kind: "p",
      text: "Make five decisions first. Then the calendar fills itself.",
    },

    { kind: "h2", text: "The five decisions" },
    {
      kind: "steps",
      items: [
        {
          title: "What is the campaign for?",
          body: "One outcome. Bookings, sign-ups, footfall, applications. \"Awareness\" is not an outcome — it is what you say when the outcome was never agreed.",
        },
        {
          title: "Who is it aimed at?",
          body: "Existing followers and people who have never heard of you need different campaigns. Pick one; the other can have its own.",
        },
        {
          title: "Which surfaces?",
          body: "Where that audience already is, which is rarely all of them. Three channels done properly beats six done at the same time on a Monday morning.",
        },
        {
          title: "What is the single action?",
          body: "One thing to do, the same across every post. Two competing actions halves both.",
        },
        {
          title: "Who approves, and when?",
          body: "Decide this before the first post is written. A plan that routes approval through whoever is free that day will stall in week two.",
        },
      ],
    },

    { kind: "h2", text: "The 30-day template" },
    {
      kind: "p",
      text: "Thirty days splits cleanly into four phases. The shape matters more than the exact dates — shift them to fit your launch, but keep the proportions, because it is the proportions rather than the length that keep a campaign running to the end.",
    },
    {
      kind: "template",
      label: "30-day social media campaign plan",
      lines: [
        "DAYS 1-5     SET UP",
        "  Brief agreed and signed off",
        "  Channels chosen, approver named",
        "  All creative produced before anything posts",
        "",
        "DAYS 6-12    OPEN",
        "  Day 6   Launch post, every channel",
        "  Day 8   The detail version (LinkedIn, email)",
        "  Day 11  Proof: a result, a quote, a demo",
        "",
        "DAYS 13-24   SUSTAIN",
        "  Two posts a week, alternating angle",
        "  One reply-driven post to generate comments",
        "  Mid-point check: which channel is working?",
        "",
        "DAYS 25-30   CLOSE",
        "  Day 25  Deadline reminder",
        "  Day 29  Last call, shortest copy of the campaign",
        "  Day 30  Report against the number from decision one",
      ],
    },
    {
      kind: "note",
      text: "Produce every asset in the set-up phase, before day six. Campaigns do not fail because the idea was wrong; they fail because nobody had time to make the day-eleven post on day eleven.",
    },

    { kind: "h2", text: "What to post on the days between" },
    {
      kind: "p",
      text: "The sustain phase is where plans run out of ideas, because the launch content is spent and the deadline is too far off to push. Four angles cover almost every campaign.",
    },
    {
      kind: "steps",
      items: [
        {
          title: "Proof",
          body: "Something that shows the thing is real: a photo of it in use, a result, a short quote. The highest-performing post in most campaigns and the one most often skipped.",
        },
        {
          title: "Objection",
          body: "Name the reason someone has not acted and answer it. \"Not sure it fits your space? Here are the measurements.\"",
        },
        {
          title: "Detail",
          body: "One specific aspect, covered properly. Narrow beats broad here — the people still reading in week three want depth.",
        },
        {
          title: "Behind it",
          body: "How it was made, who made it, why this version. Carries the brand as much as the campaign.",
        },
      ],
    },
    {
      kind: "p",
      text: "Four angles across three channels is twelve possible posts, which is more than a 30-day campaign needs. The constraint is rarely ideas — it is producing them while the campaign is already running.",
    },

    { kind: "h2", text: "What to measure, and when" },
    {
      kind: "p",
      text: "Check twice: once at the mid-point, where the result can still change what you do, and once at the end.",
    },
    {
      kind: "list",
      items: [
        "At day twelve, compare channels against each other rather than against a target. The question is where to put the remaining effort.",
        "Ignore reach on its own. A post seen by many and acted on by nobody told you the targeting worked and the message did not.",
        "Track the single action from decision four. That is the campaign's number.",
        "Note which posts were edited most before going out — that is a brand voice signal, and it is free.",
        "At day thirty, write two sentences on what you would change. Most teams skip this and start the next plan from nothing.",
      ],
    },

    { kind: "h2", text: "Why plans collapse in week three" },
    {
      kind: "p",
      text: "There is a pattern to how a social media campaign plan dies, and it is almost always the same. The first week is fully produced because it was made during set-up. Week two runs on momentum. Week three needs new assets, and the person who was going to make them is doing something else.",
    },
    {
      kind: "p",
      text: "Two things prevent it. The first is producing everything up front, which is a scheduling decision rather than a creative one. The second is planning fewer posts than you think you can manage — a campaign that posts twice a week for four weeks beats one that posts daily for nine days and then stops.",
    },

    { kind: "h2", text: "Adapting the channel mix" },
    {
      kind: "p",
      text: "The template above assumes a general audience. Adjust the weighting rather than the structure:",
    },
    {
      kind: "list",
      items: [
        "Local business: Google Business and Instagram carry most of it. LinkedIn is usually wasted effort.",
        "B2B: LinkedIn leads, X supports, Instagram is optional and often skipped.",
        "Retail and hospitality: Instagram first, with email doing the conversion work social cannot.",
        "Services: LinkedIn and email, with social as proof rather than as the pitch.",
      ],
    },

    { kind: "h2", text: "Adapting the window" },
    {
      kind: "p",
      text: "Thirty days suits a seasonal offer or a launch with a deadline. Other campaigns want a different shape, and forcing them into this one is why some plans feel padded.",
    },
    {
      kind: "list",
      items: [
        "A one-week push: compress to set-up, open, close. Drop the sustain phase rather than cramming it in.",
        "An always-on channel: this template does not apply. That is a content calendar, which is a different document with a different rhythm.",
        "A long lead-up, like an event: extend the sustain phase and keep the open and close as they are. The ends matter more than the middle.",
        "A recurring monthly campaign: run the same four phases and change only the angle, so the production work compounds instead of restarting.",
      ],
    },
    {
      kind: "p",
      text: "What does not change is the proportion. Set-up should be the busiest phase, and closing should be the shortest copy you write. A campaign that gets quieter as the deadline approaches has the shape backwards.",
    },

    { kind: "h2", text: "What to do before day one" },
    {
      kind: "p",
      text: "The set-up phase is five days in the template, and it is the only phase where being thorough pays back across the whole campaign.",
    },
    {
      kind: "list",
      items: [
        "Write the brief and get it signed off. Everything downstream assumes it is settled.",
        "Produce every asset, including the closing post nobody wants to think about yet.",
        "Check the dates against anything else going out, internally and externally.",
        "Agree the number you will report against, and where it comes from.",
        "Name the approver, and confirm they are actually available that fortnight.",
      ],
    },

    { kind: "h2", text: "Approvals inside the plan" },
    {
      kind: "p",
      text: "The step most plans leave out. Posts get written, sit in a doc, and go out when someone remembers — or go out unreviewed, which is worse.",
    },
    {
      kind: "p",
      text: "Put a named person against the campaign, not a stage. One person reviews the whole set during set-up, rather than approving each post the morning it goes out. That single change removes almost all of the week-three failure mode, because nothing is waiting on a decision at the moment it needs to publish.",
    },
    {
      kind: "p",
      text: "This is the part CampaignX is built around. The brief produces every post for every channel at once, so the whole campaign exists before day six, and a named approver signs off the set before anything is scheduled. The calendar then runs without anyone having to remember it.",
    },
  ],
};
