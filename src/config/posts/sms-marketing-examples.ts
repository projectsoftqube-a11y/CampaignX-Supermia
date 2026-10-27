import type { BlogPost } from "@/config/pages/blog";

/**
 * /blog/sms-marketing-examples
 *
 * Primary keyword "sms marketing examples". Category email-sms,
 * supports /channels/sms.
 *
 * Compliance is handled carefully here: consent and opt-out are the
 * sender's responsibility, and the post says so rather than implying
 * a tool takes it on. Every template carries an opt-out, because a
 * template that omits one teaches the wrong habit.
 */
export const post: BlogPost = {
  slug: "sms-marketing-examples",
  title: "SMS Marketing Examples for Small Businesses (With Templates)",
  metaTitle: "SMS Marketing Examples and Templates for Small Businesses",
  description:
    "SMS marketing examples for promotions, launches, reminders and win-backs, with short templates and timing tips that keep customers subscribed.",
  excerpt:
    "Eight templates across four message types, the character budget that governs all of them, and the timing that decides whether people stay subscribed.",
  category: "email-sms",
  art: "message",
  published: "2026-10-27",
  readingMinutes: 8,
  standfirst:
    "Good SMS marketing is one message, one action, and a way out. The constraint is not really 160 characters — it is that you are on someone's phone, uninvited, and they can leave in one word.",
  related: [
    { label: "All posts", href: "/blog" },
    { label: "SMS channel", href: "/channels/sms" },
    { label: "Email and SMS", href: "/blog/category/email-sms" },
  ],
  body: [
    {
      kind: "p",
      text: "The SMS marketing examples below are short on purpose. A text is the only marketing channel that arrives on a lock screen, which makes it the most effective and the easiest to ruin.",
    },
    {
      kind: "note",
      text: "Consent and opt-out handling are the sender's responsibility, and the rules differ by country. Every template here includes an opt-out, because one that does not teaches the wrong habit.",
    },

    { kind: "h2", text: "The budget you are writing against" },
    {
      kind: "p",
      text: "A single SMS segment is 160 characters in plain GSM encoding. Past that the message splits, and an emoji usually switches the whole thing to a different encoding that drops the limit to 70.",
    },
    {
      kind: "p",
      text: "Allow for the parts you cannot cut: your business name so people know who is texting, and the opt-out. That typically leaves 100 to 120 characters for the actual message. Write to that, not to 160.",
    },
    {
      kind: "template",
      label: "The budget",
      lines: [
        "160  one GSM segment",
        " -20  business name",
        " -22  'Reply STOP to opt out'",
        "————",
        "~118 characters for the message itself",
      ],
    },

    { kind: "h2", text: "Promotions" },
    {
      kind: "p",
      text: "The most common use and the one most often overdone. A promotional text works when it is specific and time-bound; it fails when it reads like every other discount message in the thread.",
    },
    {
      kind: "template",
      label: "Promotion templates",
      lines: [
        "Northfield: Spring rates are open to existing clients",
        "until the 14th. Book: nrthfld.co/spring",
        "Reply STOP to opt out.",
        "",
        "Harbour Coffee: spring blend is back for two weeks,",
        "and regulars get first pour. Reply STOP to opt out.",
      ],
    },
    {
      kind: "p",
      text: "Both name the sender, state the window, and give one action. Neither uses an exclamation mark, which is the fastest way to make a text read like spam.",
    },

    { kind: "h2", text: "Launches" },
    {
      kind: "p",
      text: "A launch text should assume no context. The recipient has not read your email and did not see the post.",
    },
    {
      kind: "template",
      label: "Launch templates",
      lines: [
        "Vantage: evening classes start Monday. Member rates",
        "apply. See times: vntg.fit/evenings",
        "Reply STOP to opt out.",
        "",
        "Northfield: we now handle probate in-house, so it no",
        "longer goes to a third firm. Details: nrthfld.co/probate",
        "Reply STOP to opt out.",
      ],
    },

    { kind: "h2", text: "Reminders" },
    {
      kind: "p",
      text: "The highest-value SMS and the one customers actively want. A reminder is the rare marketing text nobody resents, because it is doing them a favour.",
    },
    {
      kind: "template",
      label: "Reminder templates",
      lines: [
        "Harbour: your table for 2 is booked tomorrow at 7:30pm.",
        "Reply CANCEL if plans change.",
        "",
        "Vantage: your class is at 6pm today. Reply STOP to opt out",
        "of reminders.",
      ],
    },
    {
      kind: "p",
      text: "Note the reply option differs. A booking reminder offers CANCEL because that is the useful action; a recurring reminder offers STOP. Matching the reply to the message is a small thing that makes a channel feel considered.",
    },

    { kind: "h2", text: "Win-backs" },
    {
      kind: "p",
      text: "The hardest to write, because the recipient has already drifted and knows it. The failure mode is guilt — anything resembling \"we miss you\" reads as a tactic.",
    },
    {
      kind: "template",
      label: "Win-back templates",
      lines: [
        "Harbour: it has been a while. Your usual is still £3.40,",
        "and the spring blend is on. Reply STOP to opt out.",
        "",
        "Vantage: your membership paused in January. Rejoining",
        "keeps your old rate: vntg.fit/rejoin",
        "Reply STOP to opt out.",
      ],
    },

    { kind: "h2", text: "What makes a text read as spam" },
    {
      kind: "p",
      text: "The difference between a message people keep and one they opt out of is rarely the offer. It is a handful of surface signals, and they are easy to avoid once named.",
    },
    {
      kind: "list",
      items: [
        "Capitals. SPRING SALE reads as a broadcast, not a message.",
        "Multiple exclamation marks. One is already pushing it in a text.",
        "No sender name. An unrecognised number asking you to click is indistinguishable from fraud.",
        "A shortened link with no context. Say where it goes before the link, not after.",
        "Urgency the recipient cannot verify. \"Only 3 left!\" invites doubt about everything else in the message.",
        "A second text in the same week. The single fastest route to an opt-out.",
      ],
    },
    {
      kind: "p",
      text: "Read the drafts aloud. Anything you would not say to a regular customer across a counter is wrong for a channel that arrives on their phone.",
    },

    { kind: "h2", text: "Who should get the text" },
    {
      kind: "p",
      text: "SMS rewards a smaller list than any other channel. The cost of sending to someone who did not want it is not the send fee — it is the opt-out, which removes them from every future campaign.",
    },
    {
      kind: "steps",
      items: [
        {
          title: "People who opted in explicitly",
          body: "Not people who gave you a number for a booking. Consent to be contacted about an order is not consent to be marketed to.",
        },
        {
          title: "People who bought recently",
          body: "Recency matters more here than frequency. Someone who bought last month will read it; someone who bought two years ago will wonder how you got their number.",
        },
        {
          title: "People the message is actually for",
          body: "If the offer applies to one product line, send it to people who buy that line. Segmenting badly is why most SMS lists shrink.",
        },
      ],
    },

    { kind: "h2", text: "Timing is most of the result" },
    {
      kind: "p",
      text: "When a text arrives matters more than the wording, and it is the thing most campaigns get wrong.",
    },
    {
      kind: "list",
      items: [
        "Never before 9am or after 8pm local time. In some jurisdictions this is a rule, not a courtesy.",
        "One promotional text per campaign. Two is where unsubscribes start.",
        "Send the reminder text to the people who have not acted, not to everyone again.",
        "Avoid Monday morning and Friday evening — the message lands in the busiest and the least receptive moments of the week.",
      ],
    },

    { kind: "h2", text: "Making SMS agree with the rest of the campaign" },
    {
      kind: "p",
      text: "The most common structural mistake is treating SMS as a separate job. It gets written last, by someone else, often after the email has already gone out — and it ends up as a compressed version of the email rather than its own message.",
    },
    {
      kind: "p",
      text: "A recipient who also gets your email and follows you socially should recognise one campaign. That does not mean the same words; it means the same offer, the same dates and the same action.",
    },
    {
      kind: "list",
      items: [
        "Same action. If the email says book and the text says call, you have two campaigns.",
        "Same dates, stated the same way. \"Until the 14th\" in both beats \"two weeks\" in one and a date in the other.",
        "Same voice, shorter. A brand that writes warmly by email should not go clipped and formal by text.",
        "Different job. The email explains; the text reminds. Repeating the explanation in 160 characters helps nobody.",
      ],
    },
    {
      kind: "p",
      text: "Writing all of them from one brief at the same time is the simplest way to get this right, because the agreement is structural rather than something a person has to remember to check.",
    },

    { kind: "h2", text: "How often to send" },
    {
      kind: "p",
      text: "There is no universal answer, but there is a useful floor and ceiling. Fewer than one message a quarter and people forget they subscribed, so the next text reads as unsolicited. More than two a month and opt-outs climb regardless of how good the messages are.",
    },
    {
      kind: "p",
      text: "Between those, let the calendar follow events rather than a schedule. A text sent because something is genuinely happening outperforms one sent because it was the second Tuesday, and the list stays healthier for it.",
    },

    { kind: "h2", text: "What stays with you" },
    {
      kind: "p",
      text: "Whatever tool sends the message, the obligations do not transfer. Collecting and recording consent is yours. Honouring STOP replies is yours. Following each platform's terms and your local rules is yours.",
    },
    {
      kind: "p",
      text: "CampaignX writes and schedules the SMS alongside the rest of the campaign, so the text is produced from the same brief and in the same voice as the email and the posts, and it is held until a named approver releases it. It does not establish that someone agreed to receive it — that part is still the sender's to get right.",
    },
  ],
};
