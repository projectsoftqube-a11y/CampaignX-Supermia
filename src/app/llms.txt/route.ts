import { siteConfig } from "@/config/site";

/**
 * llms.txt, served from the app because the static file returned a 4xx
 * (SEO audit issue #9).
 *
 * Every fact here comes from the approved Fact Sheet. Claims the fact sheet
 * bans ("nine channels", "100% private", "free forever") must never appear.
 */
export const dynamic = "force-static";

const BODY = `# CampaignX by SuperMIA

> CampaignX is an AI marketing agent from SuperMIA, operated by Botfinity Inc. in Grapevine, Texas. You write one brief, and it plans the campaign, writes and designs it in your brand voice, and formats it for Instagram, Facebook, LinkedIn, Google Business, X, email and SMS. Nothing is published without a named approver, and reporting shows what worked. CampaignX is free during Beta.

## Product

- [CampaignX home](${siteConfig.url}/): AI marketing agent that turns one brief into an on-brand, multi-channel campaign.
- [Pricing](${siteConfig.url}/pricing): Starter (free during Beta), Team (Early Access), Enterprise (custom).
- [FAQ](${siteConfig.url}/faq): channels, brand voice, approvals, pricing and data handling.
- [Start or sign in](${siteConfig.appUrl}): the CampaignX web app.
- [Demo video (under 2 minutes)](https://www.youtube.com/watch?v=3FYQj_urQiw)

## Features

- [Brand Voice](${siteConfig.url}/features/brand-voice): a brand model learned from your own material.
- [AI Creative](${siteConfig.url}/features/ai-creative): visuals built for each channel.
- [Multi-Channel Publishing](${siteConfig.url}/features/multi-channel-publishing): seven channels from one brief.
- [Approvals](${siteConfig.url}/features/approvals): a named approver before anything sends.
- [Campaign Analytics](${siteConfig.url}/features/campaign-analytics): reach and engagement, fed back into the next campaign.

## Channels

- [Social Media](${siteConfig.url}/channels/social-media)
- [Email](${siteConfig.url}/channels/email)
- [SMS](${siteConfig.url}/channels/sms)

## Who it is for

- [Small Business](${siteConfig.url}/use-cases/small-business)
- [Agencies](${siteConfig.url}/use-cases/agencies)
- [Marketing Teams](${siteConfig.url}/use-cases/marketing-teams)
- [Founders](${siteConfig.url}/use-cases/founders)

## Resources

- [Blog](${siteConfig.url}/blog): campaign strategy, social media, email and SMS guides.
- [About](${siteConfig.url}/about)

## Key facts

- Channels: Instagram, Facebook, LinkedIn, Google Business, X, email, SMS; webhooks for other tools.
- Brand voice learned from the customer's own material; first campaign in about ten minutes; a trusted brand model in about one afternoon.
- Nothing sends without a named approver; any asset can be edited or regenerated.
- Customer data is not used to train shared models or pooled with other customers' data; the terms allow anonymized patterns to be used to improve the service.
- Enterprise: SSO/SAML and SCIM, data residency choice, audit export and retention controls.
- CampaignX does not buy or manage paid ads.
- Contact: hello@supermia.ai

## Company

- [SuperMIA](https://supermia.ai/): conversational AI platform and AI agents.
- [CampaignX on SuperMIA](https://supermia.ai/ai-marketing-campaign/)

## Legal

- [Privacy Policy](${siteConfig.url}/privacy)
- [Terms and Conditions](${siteConfig.url}/terms)
`;

export function GET(): Response {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
