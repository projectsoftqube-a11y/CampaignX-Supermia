import type { BlogPost } from "@/config/pages/blog";

/**
 * /blog/marketing-campaign-brief
 *
 * Written to the keyword brief in the content package: primary keyword
 * "marketing campaign brief" in the H1, title, slug, first 100 words,
 * one H2 and the meta description. Target 1,200–1,800 words.
 *
 * The brief also says this must not overlap the supermia.ai posts on
 * "how to create ai marketing campaigns" or "ai marketing campaign
 * generator", so the piece stays on the document itself — what goes in
 * it and why — rather than on generating campaigns with AI. CampaignX
 * appears once, near the end, as the thing the document feeds.
 */
export const post: BlogPost = {
  slug: "marketing-campaign-brief",
  title: "How to Write a Marketing Campaign Brief (Free Template)",
  metaTitle: "How to Write a Marketing Campaign Brief (Free Template)",
  description:
    "What a marketing campaign brief needs: goal, audience, offer, message, channels and success measures, with a free template you can copy today.",
  excerpt:
    "Six things a brief has to answer before anyone writes a word, why most briefs fail on the second one, and a template you can copy.",
  category: "campaign-strategy",
  published: "2026-10-27",
  readingMinutes: 8,
  standfirst:
    "A marketing campaign brief is a short document that states what you are promoting, who it is for, what you want them to do, and how you will know it worked. If it runs past one page, it has stopped being a brief.",
  related: [
    { label: "All posts", href: "/blog" },
    { label: "Campaign strategy", href: "/blog/category/campaign-strategy" },
    { label: "What CampaignX does", href: "/" },
  ],
  body: [
    {
      kind: "p",
      text: "Most campaigns that go out late were not slow to produce. They were slow to start, because nobody could agree on what the campaign was actually for. A marketing campaign brief fixes that by forcing the argument to happen once, in writing, before anyone opens a design file.",
    },
    {
      kind: "p",
      text: "The useful version of this document is short. One page, six answers. Anything longer tends to be a strategy deck wearing a brief's name, and it will be read once and never opened again.",
    },

    { kind: "h2", text: "What a marketing campaign brief has to answer" },
    {
      kind: "p",
      text: "Every brief worth writing answers the same six questions. If you cannot answer one of them, that is the thing to resolve — not a gap to fill with a sentence that sounds confident.",
    },
    {
      kind: "steps",
      items: [
        {
          title: "What are we promoting?",
          body: "One specific thing. A spring offer, a new feature, a seasonal menu. If the answer is \"the business\", you are writing a campaign for nobody in particular.",
        },
        {
          title: "Who is it for?",
          body: "Existing customers behave differently from people who have never heard of you. Pick one. A campaign aimed at both tends to speak to neither.",
        },
        {
          title: "What do we want them to do?",
          body: "A single action. Book, buy, reply, visit. Two actions in one campaign means the reader picks neither, and you cannot tell which one failed.",
        },
        {
          title: "Why would they care?",
          body: "The reason from their side, not yours. \"We are launching\" is your news. \"Two weeks of your usual rates on the new range\" is theirs.",
        },
        {
          title: "Where does it run?",
          body: "The channels where that audience already is, not every channel you have a login for.",
        },
        {
          title: "How will we know it worked?",
          body: "One number, agreed up front. Decided afterwards, it is always the number that happens to look good.",
        },
      ],
    },

    { kind: "h2", text: "The question most briefs get wrong" },
    {
      kind: "p",
      text: "In practice it is the second one — who it is for — that breaks most campaigns. It is the easiest to answer vaguely and the most expensive to get wrong, because every other decision depends on it.",
    },
    {
      kind: "p",
      text: "\"Our customers\" is not an audience. It is a category containing people who bought once two years ago and people who buy every week, and a message that works for one reads as either presumptuous or cold to the other. Narrow it until the message writes itself: not \"our customers\" but \"people who bought in the last six months and have not been back since\".",
    },
    {
      kind: "note",
      text: "A good test: read the audience line and try to picture one specific person. If you cannot, the line is still a category.",
    },

    { kind: "h2", text: "The template" },
    {
      kind: "p",
      text: "Copy this, fill in the six lines, and stop. The constraint is the point — a brief that takes twenty minutes to write gets written, and one that takes an afternoon gets postponed until the campaign is late.",
    },
    {
      kind: "template",
      label: "Campaign brief",
      lines: [
        "Campaign: ..............................................",
        "Promoting: what, specifically",
        "For: one audience, narrow enough to picture",
        "Action: the single thing they should do",
        "Because: the reason from their side",
        "Channels: where that audience already is",
        "Success: one number, agreed before launch",
        "Runs: start date to end date",
      ],
    },
    {
      kind: "p",
      text: "Filled in, it should read like this:",
    },
    {
      kind: "template",
      label: "Worked example",
      lines: [
        "Campaign: Spring offer",
        "Promoting: 20% off the spring range",
        "For: customers who bought in the last six months",
        "Action: come back in store or order online",
        "Because: they get our best rate before anyone else",
        "Channels: Instagram, email, SMS",
        "Success: 120 orders using the code",
        "Runs: 1–14 April",
      ],
    },
    {
      kind: "p",
      text: "That is eight lines, and it is enough for a writer, a designer and whoever approves the work to agree on what they are making before any of them start.",
    },

    { kind: "h2", text: "How specific is too specific?" },
    {
      kind: "p",
      text: "There is a real tension in a brief between saying enough to be useful and saying so much that there is nothing left to decide. The line sits between intent and execution.",
    },
    {
      kind: "p",
      text: "\"Lead with the fact it is only two weeks\" is intent — it tells whoever writes the campaign what matters most, and leaves them room to say it well on each channel. \"Open the Instagram caption with the words two weeks only\" is execution, and writing that into the brief means you have done the writer's job badly instead of letting them do it properly.",
    },
    {
      kind: "p",
      text: "The same applies to channels. Naming Instagram, email and SMS is a decision about where the audience is. Specifying four slides, a 40-character subject line and a 148-character text is production detail, and it will be wrong by the time anyone builds it.",
    },
    {
      kind: "note",
      text: "If a line in your brief would stop being true after one round of edits, it is execution, and it does not belong in the document everyone agreed to.",
    },

    { kind: "h2", text: "What a brief is not" },
    {
      kind: "p",
      text: "Two documents get confused with a brief often enough to be worth separating.",
    },
    {
      kind: "list",
      items: [
        "A content calendar. That is a schedule — what goes out when. It comes after the brief and answers a different question entirely.",
        "A campaign report. Written afterwards, against the success measure the brief named. If the brief did not name one, the report becomes an exercise in finding a number that looks good.",
      ],
    },
    {
      kind: "p",
      text: "Keeping them separate matters because they have different lifespans. The brief is fixed once agreed; the calendar changes constantly as dates move. Merging them means every scheduling change reopens the argument about what the campaign is for.",
    },

    { kind: "h2", text: "What to leave out" },
    {
      kind: "p",
      text: "Briefs bloat because people add things that feel responsible. Most of them belong somewhere else.",
    },
    {
      kind: "list",
      items: [
        "Background about the company. Everyone reading it already works there.",
        "Competitor analysis. Useful, but it is research, not a brief.",
        "Tone-of-voice paragraphs. That belongs in your brand voice guidelines, where it can be reused.",
        "Channel specifications. Formats and character limits are a production detail, not a decision.",
        "Anything you are not prepared to be held to.",
      ],
    },

    { kind: "h2", text: "Who writes it, and who signs it" },
    {
      kind: "p",
      text: "The person closest to the offer should write the brief, because they are the one who knows why it exists. That is often not a marketer — in a small business it is usually the owner, and in a startup it is usually a founder.",
    },
    {
      kind: "p",
      text: "One named person should approve it. Not a group, and not a thread. Agreement that lives in a conversation disappears the moment the conversation scrolls, and a week later nobody can say what was decided or by whom. A name against the brief costs nothing and settles the question permanently, which matters most on the day a campaign goes out wrong and the first question is who signed it off.",
    },

    { kind: "h2", text: "After the brief" },
    {
      kind: "p",
      text: "A brief is only worth writing if it actually drives the work. In most teams it does not: it gets written, then retyped into a copy tool, then summarised again in a design request, and by the third retelling the campaign has drifted from the thing everyone agreed to.",
    },
    {
      kind: "p",
      text: "That is the gap CampaignX is built for. The brief is the input — one sentence of it — and the campaign comes back written for every channel, in your brand voice, for you to approve before anything publishes. Change the brief and the campaign rebuilds, rather than five people updating five documents.",
    },
    {
      kind: "p",
      text: "Whether or not you use a tool for the assembly, write the brief first. The six questions above are the whole job, and answering them honestly is what separates a campaign that ships from one that stays on the list.",
    },
  ],
};
