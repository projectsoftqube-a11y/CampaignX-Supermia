import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LegalPage } from "@/components/layout/LegalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { privacyPolicy } from "@/config/legal/privacy";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";

const TITLE = "Privacy Policy | CampaignX";
const DESCRIPTION = `How ${siteConfig.name} collects, uses, stores and protects your personal information, which third-party processors are involved, and the choices you have.`;

/* Via `pageMetadata` like every other page: the hand-written object
   here set a canonical but no Open Graph or Twitter tags, so a shared
   link to the policy had no card. */
export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/privacy",
});

/* A privacy policy is a WebPage with a breadcrumb like any other
   indexable page. Without this the legal pages were the only two on
   the site emitting no structured data at all, so nothing tied them
   to the organization that publishes them. */
const schema = buildGraph(
  { path: "/privacy", name: TITLE, description: DESCRIPTION },
  [breadcrumbSchema([{ name: "Privacy Policy", href: "/privacy" }])],
);

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <LegalPage doc={privacyPolicy} />
      <Footer />
    </>
  );
}
