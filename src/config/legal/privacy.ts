import type { LegalDocument } from "@/types/legal";

/**
 * Privacy Policy — CampaignX by Botfinity Inc.
 *
 * Transcribed from the approved source document dated 1 September 2026.
 * The wording is the legal text and should not be edited for tone: change
 * it only from an updated source document, and move the `updated` date with
 * it.
 */
export const privacyPolicy: LegalDocument = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  summary:
    "How CampaignX collects, uses, stores, shares and protects your personal information.",
  effective: "1 September 2026",
  updated: "1 September 2026",

  sections: [
    {
      heading: "Introduction",
      blocks: [
        {
          kind: "text",
          value: [
            { text: "Welcome to CampaignX (" },
            { text: '"Platform," "Service," "we," "us,"', bold: true },
            { text: " or " },
            { text: '"our"', bold: true },
            { text: "), a product of " },
            { text: "Botfinity Inc.", bold: true },
            { text: ", a company incorporated in the United States." },
          ],
        },
        {
          kind: "text",
          value: [
            { text: "This Privacy Policy (" },
            { text: '"Policy"', bold: true },
            {
              text: ") describes how we collect, use, store, share, and protect your personal information when you access or use the CampaignX platform available at ",
            },
            {
              text: "campaignx.supermia.ai",
              href: "https://campaignx.supermia.ai",
            },
            {
              text: ", including any associated applications, APIs, and services (collectively, the ",
            },
            { text: '"Service"', bold: true },
            { text: ")." },
          ],
        },
        {
          kind: "text",
          value:
            "By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by this Policy. If you do not agree to this Policy, you must not access or use the Service.",
        },
        {
          kind: "text",
          value:
            "This Policy applies to all users of the Service, including but not limited to account holders, workspace members, and any individuals whose data is processed through campaigns created on the Platform.",
        },
      ],
    },

    {
      heading: "Definitions",
      blocks: [
        { kind: "text", value: "For the purposes of this Policy:" },
        {
          kind: "definitions",
          items: [
            {
              term: '"Personal Data"',
              definition:
                "means any information relating to an identified or identifiable natural person, as defined under applicable data protection laws including the GDPR, CCPA, and India's Digital Personal Data Protection Act.",
            },
            {
              term: '"Processing"',
              definition:
                "means any operation performed on Personal Data, including collection, recording, organization, storage, adaptation, retrieval, use, disclosure, or erasure.",
            },
            {
              term: '"Data Controller"',
              definition:
                "means the entity that determines the purposes and means of Processing Personal Data. With respect to your account data, Botfinity Inc. is the Data Controller.",
            },
            {
              term: '"Data Processor"',
              definition:
                "means the entity that Processes Personal Data on behalf of the Data Controller.",
            },
            {
              term: '"Third-Party Platform"',
              definition:
                "means any external service you connect to the Platform, including but not limited to Facebook, Instagram, LinkedIn, X (formerly Twitter), WhatsApp, SMS providers (Twilio), email services, and voice calling services.",
            },
            {
              term: '"Workspace"',
              definition:
                "means an organizational unit within the Platform under which campaigns, connected accounts, and publishing activities are scoped.",
            },
            {
              term: '"Campaign"',
              definition:
                "means any marketing communication created, managed, or deployed through the Service across one or more channels.",
            },
            {
              term: '"AI Features"',
              definition:
                "means any functionality within the Service that utilizes artificial intelligence or machine learning, including content generation, transcription, template creation, and optimization.",
            },
          ],
        },
      ],
    },

    {
      heading: "Information we collect",
      subsections: [
        {
          heading: "Information you provide directly",
          blocks: [
            {
              kind: "table",
              headers: ["Category", "Data collected", "Purpose"],
              rows: [
                [
                  "Account registration",
                  "Email address, username, password (hashed), login type (e.g. Google SSO)",
                  "Account creation, authentication, security",
                ],
                [
                  "Profile information",
                  "Display name, Google profile ID (if using Google SSO), organization/customer details",
                  "Account personalization, workspace management",
                ],
                [
                  "Workspace data",
                  "Workspace name, description, industry classification",
                  "Service functionality, campaign customization",
                ],
                [
                  "Campaign content",
                  "Text, images, videos, audio recordings, templates, CTAs, and any content you create or upload",
                  "Campaign creation, AI-powered content generation, publishing",
                ],
                [
                  "Media gallery",
                  "Images, videos, and other media files uploaded to your media library",
                  "Content management, campaign asset storage",
                ],
                [
                  "Communication preferences",
                  "Marketing opt-in status, notification preferences",
                  "Communication management",
                ],
              ],
            },
          ],
        },
        {
          heading: "Information collected through Third-Party Platform connections",
          blocks: [
            {
              kind: "text",
              value:
                "When you connect Third-Party Platforms to CampaignX, we collect and store:",
            },
            {
              kind: "table",
              headers: ["Platform category", "Data collected"],
              rows: [
                [
                  "Social media (Facebook, Instagram, LinkedIn, X)",
                  "OAuth access tokens, refresh tokens, token expiration data, page/profile identifiers, page names, avatar URLs, follower counts, post performance metrics, engagement analytics",
                ],
                [
                  "Communication channels (WhatsApp, SMS, Voice, RCS, Email)",
                  "Provider credentials (e.g. Twilio Account SID, API keys), sender phone numbers/email addresses, SMTP configuration details, message delivery status",
                ],
                [
                  "Analytics and insights",
                  "Post-level metrics (impressions, reach, engagement, clicks, reactions, comments, shares, saves), audience demographics, performance trends, delivery events",
                ],
              ],
            },
          ],
        },
        {
          heading: "Information collected automatically",
          blocks: [
            {
              kind: "table",
              headers: ["Category", "Data collected", "Purpose"],
              rows: [
                [
                  "Usage data",
                  "Pages visited, features used, timestamps, session duration, click patterns",
                  "Service improvement, analytics",
                ],
                [
                  "Device and technical data",
                  "IP address, browser type, operating system, device identifiers, screen resolution",
                  "Security, compatibility, troubleshooting",
                ],
                [
                  "Log data",
                  "Server logs, error reports, API request metadata",
                  "System monitoring, debugging, security",
                ],
                [
                  "Cookies and similar technologies",
                  "Session cookies, authentication tokens (JWT)",
                  "Authentication, session management",
                ],
              ],
            },
          ],
        },
        {
          heading: "Information generated by AI Features",
          blocks: [
            {
              kind: "text",
              value: "When you use AI-powered features, we may process:",
            },
            {
              kind: "list",
              items: [
                [
                  { text: "Input data: ", bold: true },
                  {
                    text: "text prompts, voice recordings (for transcription), uploaded images, campaign parameters (industry, tone, urgency, language preferences).",
                  },
                ],
                [
                  { text: "Output data: ", bold: true },
                  {
                    text: "AI-generated content including social media posts, email templates, SMS messages, WhatsApp messages, voice call scripts, RCS messages.",
                  },
                ],
                [
                  { text: "Token usage data: ", bold: true },
                  {
                    text: "AI model usage metrics for billing and optimization purposes.",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },

    {
      heading: "How we use your information",
      blocks: [
        {
          kind: "text",
          value:
            "We process your Personal Data for the following purposes, each supported by a valid legal basis.",
        },
      ],
      subsections: [
        {
          heading: "Service delivery (contractual necessity)",
          blocks: [
            {
              kind: "list",
              items: [
                "Creating and managing your account, workspaces, and campaigns",
                "Generating AI-powered marketing content across channels (email, SMS, WhatsApp, social media, voice, RCS)",
                "Publishing and scheduling content to connected Third-Party Platforms",
                "Processing OAuth authentication for Third-Party Platform integrations",
                "Providing analytics, insights, and performance reporting dashboards",
                "Managing your media gallery and uploaded assets",
                "Calendar-based campaign scheduling and management",
              ],
            },
          ],
        },
        {
          heading: "Service improvement (legitimate interest)",
          blocks: [
            {
              kind: "list",
              items: [
                "Analyzing usage patterns to improve Platform features and user experience",
                "Monitoring system performance, uptime, and reliability",
                "Identifying and resolving technical issues, bugs, and errors",
                "Developing and testing new features and capabilities",
              ],
            },
          ],
        },
        {
          heading:
            "Security and compliance (legitimate interest / legal obligation)",
          blocks: [
            {
              kind: "list",
              items: [
                "Detecting, investigating, and preventing fraud, abuse, or security threats",
                "Enforcing our Terms and Conditions",
                "Complying with applicable laws, regulations, and legal processes",
                "Maintaining audit logs for regulatory compliance",
              ],
            },
          ],
        },
        {
          heading: "Communication (consent / legitimate interest)",
          blocks: [
            {
              kind: "list",
              items: [
                "Sending transactional emails (account verification, password resets, security alerts)",
                "Providing service-related notifications and updates",
                "Sending marketing communications (only with your explicit consent)",
              ],
            },
          ],
        },
      ],
    },

    {
      heading: "Legal basis for processing (GDPR)",
      blocks: [
        {
          kind: "text",
          value:
            "If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, we rely on the following legal bases:",
        },
        {
          kind: "table",
          headers: ["Legal basis", "Processing activities"],
          rows: [
            [
              "Contract performance (Art. 6(1)(b))",
              "Account management, campaign creation, content publishing, analytics delivery",
            ],
            [
              "Legitimate interests (Art. 6(1)(f))",
              "Service improvement, security, fraud prevention, system monitoring",
            ],
            [
              "Consent (Art. 6(1)(a))",
              "Marketing communications, optional data sharing, AI content generation from voice inputs",
            ],
            [
              "Legal obligation (Art. 6(1)(c))",
              "Tax compliance, law enforcement requests, regulatory requirements",
            ],
          ],
        },
      ],
    },

    {
      heading: "Data sharing and disclosure",
      subsections: [
        {
          heading: "Third-Party Platforms",
          blocks: [
            {
              kind: "text",
              value:
                "When you connect Third-Party Platforms and initiate publishing or analytics actions, your content and credentials are transmitted to those platforms. This data sharing is governed by the respective platform's own privacy policy:",
            },
            {
              kind: "list",
              items: [
                [
                  { text: "Meta (Facebook and Instagram): ", bold: true },
                  {
                    text: "Meta Privacy Policy",
                    href: "https://www.facebook.com/privacy/policy/",
                  },
                ],
                [
                  { text: "LinkedIn: ", bold: true },
                  {
                    text: "LinkedIn Privacy Policy",
                    href: "https://www.linkedin.com/legal/privacy-policy",
                  },
                ],
                [
                  { text: "X (formerly Twitter): ", bold: true },
                  { text: "X Privacy Policy", href: "https://twitter.com/en/privacy" },
                ],
                [
                  { text: "Twilio (SMS, WhatsApp, Voice, RCS): ", bold: true },
                  {
                    text: "Twilio Privacy Policy",
                    href: "https://www.twilio.com/legal/privacy",
                  },
                ],
              ],
            },
          ],
        },
        {
          heading: "Service providers",
          blocks: [
            {
              kind: "text",
              value:
                "We engage trusted third-party service providers who process data on our behalf under strict contractual obligations:",
            },
            {
              kind: "table",
              headers: ["Provider category", "Purpose", "Data shared"],
              rows: [
                [
                  "Cloud infrastructure (AWS)",
                  "Data hosting, file storage (S3), compute services",
                  "All platform data (encrypted)",
                ],
                [
                  "AI/ML providers (OpenAI)",
                  "AI-powered content generation and optimization",
                  "Campaign prompts and parameters",
                ],
                [
                  "Speech processing (Deepgram, Cartesia)",
                  "Voice transcription and text-to-speech",
                  "Audio recordings, generated speech",
                ],
                [
                  "Email delivery (SMTP)",
                  "Transactional email delivery",
                  "Email addresses, email content",
                ],
                [
                  "Database services",
                  "Data persistence and querying",
                  "Structured application data",
                ],
              ],
            },
          ],
        },
        {
          heading: "Legal and compliance disclosure",
          blocks: [
            {
              kind: "text",
              value:
                "We may disclose your Personal Data if required by law, regulation, legal process, or enforceable governmental request, including:",
            },
            {
              kind: "list",
              items: [
                "Court orders and subpoenas",
                "Law enforcement requests",
                "Regulatory investigations",
                "Protection of our legal rights, property, or safety",
              ],
            },
          ],
        },
        {
          heading: "Business transfers",
          blocks: [
            {
              kind: "text",
              value:
                "In the event of a merger, acquisition, bankruptcy, reorganization, or sale of assets, your Personal Data may be transferred to the acquiring entity. You will be notified of any such transfer and any changes to this Policy.",
            },
          ],
        },
        {
          heading: "No sale of Personal Data",
          blocks: [
            {
              kind: "notice",
              value:
                "We do not sell your Personal Data to third parties. This applies to all jurisdictions, including under the California Consumer Privacy Act (CCPA).",
            },
          ],
        },
      ],
    },

    {
      heading: "Data storage and security",
      subsections: [
        {
          heading: "Data storage",
          blocks: [
            {
              kind: "list",
              items: [
                [
                  { text: "Location: ", bold: true },
                  {
                    text: "your data is stored on Amazon Web Services (AWS) infrastructure. Primary data storage locations are in the United States.",
                  },
                ],
                [
                  { text: "Retention: ", bold: true },
                  {
                    text: "we retain your Personal Data for as long as your account is active or as needed to provide the Service. Upon account deletion, we will delete or anonymize your data within 90 days, except where retention is required by law.",
                  },
                ],
                [
                  { text: "Backups: ", bold: true },
                  {
                    text: "encrypted backups are maintained for disaster recovery purposes and are subject to the same retention policies.",
                  },
                ],
              ],
            },
          ],
        },
        {
          heading: "Security measures",
          blocks: [
            {
              kind: "text",
              value:
                "We implement industry-standard technical and organizational security measures, including but not limited to:",
            },
            {
              kind: "list",
              items: [
                [
                  { text: "Encryption: ", bold: true },
                  { text: "TLS 1.2+ for data in transit; AES-256 for data at rest." },
                ],
                [
                  { text: "Authentication: ", bold: true },
                  {
                    text: "secure password hashing, JWT-based session management, OAuth 2.0 for third-party integrations.",
                  },
                ],
                [
                  { text: "Access control: ", bold: true },
                  {
                    text: "role-based access control (RBAC), workspace-level data isolation.",
                  },
                ],
                [
                  { text: "Infrastructure security: ", bold: true },
                  {
                    text: "AWS security best practices, network segmentation, DDoS protection.",
                  },
                ],
                [
                  { text: "Credential storage: ", bold: true },
                  {
                    text: "OAuth tokens and third-party credentials are stored encrypted; SMTP passwords and API keys are environment-variable managed.",
                  },
                ],
                [
                  { text: "Monitoring: ", bold: true },
                  {
                    text: "application logging, error tracking, and security event monitoring.",
                  },
                ],
                [
                  { text: "Two-factor authentication (2FA): ", bold: true },
                  { text: "supported for enhanced account security." },
                ],
              ],
            },
          ],
        },
        {
          heading: "Breach notification",
          blocks: [
            {
              kind: "text",
              value:
                "In the event of a Personal Data breach that poses a risk to your rights and freedoms, we will:",
            },
            {
              kind: "list",
              items: [
                "Notify the relevant supervisory authority within 72 hours of becoming aware of the breach (as required by GDPR)",
                "Notify affected individuals without undue delay if the breach poses a high risk",
                "Document the breach, its effects, and remedial actions taken",
              ],
            },
          ],
        },
      ],
    },

    {
      heading: "Your rights",
      subsections: [
        {
          heading: "Rights under GDPR (EEA, UK, Switzerland)",
          blocks: [
            {
              kind: "text",
              value:
                "If you are located in the EEA, UK, or Switzerland, you have the following rights:",
            },
            {
              kind: "table",
              headers: ["Right", "Description"],
              rows: [
                ["Access (Art. 15)", "Request a copy of the Personal Data we hold about you"],
                [
                  "Rectification (Art. 16)",
                  "Request correction of inaccurate or incomplete Personal Data",
                ],
                [
                  "Erasure (Art. 17)",
                  'Request deletion of your Personal Data ("Right to be Forgotten")',
                ],
                [
                  "Restriction (Art. 18)",
                  "Request restriction of Processing of your Personal Data",
                ],
                [
                  "Portability (Art. 20)",
                  "Receive your Personal Data in a structured, machine-readable format",
                ],
                [
                  "Objection (Art. 21)",
                  "Object to Processing based on legitimate interests or direct marketing",
                ],
                [
                  "Withdraw consent (Art. 7)",
                  "Withdraw consent at any time where Processing is based on consent",
                ],
                [
                  "Automated decision-making (Art. 22)",
                  "Not be subject to solely automated decisions with legal effects",
                ],
              ],
            },
          ],
        },
        {
          heading: "Rights under CCPA (California residents)",
          blocks: [
            {
              kind: "list",
              items: [
                [
                  { text: "Right to know: ", bold: true },
                  {
                    text: "you may request disclosure of the categories and specific pieces of Personal Data we have collected about you.",
                  },
                ],
                [
                  { text: "Right to delete: ", bold: true },
                  {
                    text: "you may request deletion of your Personal Data, subject to certain exceptions.",
                  },
                ],
                [
                  { text: "Right to opt out of sale: ", bold: true },
                  {
                    text: "we do not sell Personal Data. However, you may still submit an opt-out request.",
                  },
                ],
                [
                  { text: "Right to non-discrimination: ", bold: true },
                  {
                    text: "we will not discriminate against you for exercising your CCPA rights.",
                  },
                ],
              ],
            },
            {
              kind: "text",
              value: [
                { text: "Categories of personal information collected (CCPA):", bold: true },
              ],
            },
            {
              kind: "list",
              items: [
                "Identifiers (name, email, username, IP address)",
                "Commercial information (campaign data, subscription details)",
                "Internet or electronic network activity (usage data, log data)",
                "Geolocation data (IP-derived approximate location)",
                "Audio, electronic, visual information (voice recordings, media uploads)",
                "Inferences drawn from the above (AI-generated content, analytics)",
              ],
            },
          ],
        },
        {
          heading: "Rights under India's Digital Personal Data Protection Act, 2023",
          blocks: [
            {
              kind: "list",
              items: [
                [
                  { text: "Right to access: ", bold: true },
                  {
                    text: "obtain a summary of your Personal Data and Processing activities.",
                  },
                ],
                [
                  { text: "Right to correction and erasure: ", bold: true },
                  {
                    text: "request correction of inaccurate data or erasure of data no longer necessary.",
                  },
                ],
                [
                  { text: "Right to grievance redressal: ", bold: true },
                  {
                    text: "file a complaint with our Grievance Officer or the Data Protection Board of India.",
                  },
                ],
                [
                  { text: "Right to nominate: ", bold: true },
                  {
                    text: "nominate another individual to exercise your rights in case of death or incapacity.",
                  },
                ],
              ],
            },
          ],
        },
        {
          heading: "Exercising your rights",
          blocks: [
            {
              kind: "text",
              value: [
                { text: "To exercise any of the above rights, contact us at " },
                { text: "hello@supermia.ai", href: "mailto:hello@supermia.ai" },
                { text: ', with the subject line "Privacy Rights Request".' },
              ],
            },
            {
              kind: "text",
              value:
                "We will respond to your request within 30 days, or within the timeframe required by applicable law. We may request verification of your identity before processing your request.",
            },
          ],
        },
      ],
    },

    {
      heading: "International data transfers",
      blocks: [
        {
          kind: "text",
          value:
            "Your Personal Data may be transferred to and processed in countries other than your country of residence, including the United States. When we transfer data internationally, we ensure appropriate safeguards are in place:",
        },
        {
          kind: "list",
          items: [
            [
              { text: "Standard Contractual Clauses (SCCs): ", bold: true },
              { text: "for transfers from the EEA/UK to third countries." },
            ],
            [
              { text: "Data Processing Agreements (DPAs): ", bold: true },
              { text: "with all sub-processors." },
            ],
            [
              { text: "Adequacy decisions: ", bold: true },
              {
                text: "where applicable, reliance on adequacy decisions by the European Commission.",
              },
            ],
          ],
        },
      ],
    },

    {
      heading: "Cookies and tracking technologies",
      subsections: [
        {
          heading: "Types of cookies used",
          blocks: [
            {
              kind: "table",
              headers: ["Cookie type", "Purpose", "Duration"],
              rows: [
                [
                  "Strictly necessary",
                  "Authentication (JWT tokens), session management, CSRF protection",
                  "Session / short-term",
                ],
                [
                  "Functional",
                  "User preferences, workspace settings, language selection",
                  "Persistent",
                ],
                ["Analytics", "Usage analytics, feature adoption tracking", "Persistent"],
              ],
            },
          ],
        },
        {
          heading: "Managing cookies",
          blocks: [
            {
              kind: "text",
              value:
                "You can manage cookie preferences through your browser settings. Note that disabling strictly necessary cookies may prevent you from using the Service.",
            },
          ],
        },
      ],
    },

    {
      heading: "Third-party links and integrations",
      blocks: [
        {
          kind: "text",
          value:
            "The Service may contain links to third-party websites and integrates with Third-Party Platforms. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any Personal Data.",
        },
      ],
    },

    {
      heading: "Children's privacy",
      blocks: [
        {
          kind: "text",
          value: [
            {
              text: "The Service is not directed at individuals under the age of 16, or the applicable age of consent in your jurisdiction. We do not knowingly collect Personal Data from children. If you believe we have inadvertently collected data from a child, please contact us immediately at ",
            },
            { text: "hello@supermia.ai", href: "mailto:hello@supermia.ai" },
            { text: ", and we will promptly delete the data." },
          ],
        },
      ],
    },

    {
      heading: "Data Protection Officer and Grievance Officer",
      blocks: [
        {
          kind: "text",
          value: [
            {
              text: "For privacy-related inquiries, complaints, or to exercise your data rights, contact Botfinity Inc. at ",
            },
            { text: "hello@supermia.ai", href: "mailto:hello@supermia.ai" },
            { text: "." },
          ],
        },
        {
          kind: "text",
          value:
            "For users in India, the Grievance Officer can be contacted at the same email address. Complaints may also be directed to the Data Protection Board of India.",
        },
        {
          kind: "text",
          value:
            "For users in the EEA, if you are unsatisfied with our response, you have the right to lodge a complaint with your local Data Protection Authority.",
        },
      ],
    },

    {
      heading: "Changes to this Policy",
      blocks: [
        {
          kind: "text",
          value:
            "We may update this Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes:",
        },
        {
          kind: "list",
          items: [
            'We will update the "Last updated" date at the top of this Policy',
            "We will notify you by email or through a prominent notice on the Platform at least 30 days before the changes take effect",
            "Your continued use of the Service after the effective date of the updated Policy constitutes acceptance of the changes",
          ],
        },
      ],
    },

    {
      heading: "Contact us",
      blocks: [
        {
          kind: "text",
          value: [
            {
              text: "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, contact Botfinity Inc. at ",
            },
            { text: "hello@supermia.ai", href: "mailto:hello@supermia.ai" },
            { text: " or visit " },
            {
              text: "campaignx.supermia.ai",
              href: "https://campaignx.supermia.ai",
            },
            { text: "." },
          ],
        },
      ],
    },
  ],

  closing:
    "This Privacy Policy is governed by and construed in accordance with the laws of the United States, without regard to its conflict of law principles, while also respecting the applicable data protection laws of the jurisdictions in which our users are located. © 2026 Botfinity Inc. All rights reserved.",
};
