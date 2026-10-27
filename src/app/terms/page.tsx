import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LegalPage } from "@/components/layout/LegalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { termsOfService } from "@/config/legal/terms";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";

const TITLE = "Terms and Conditions | CampaignX";
const DESCRIPTION = `The agreement governing your access to and use of ${siteConfig.name}, including what you must approve before anything publishes to your accounts.`;

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/terms",
});

const schema = buildGraph(
  { path: "/terms", name: TITLE, description: DESCRIPTION },
  [breadcrumbSchema([{ name: "Terms and Conditions", href: "/terms" }])],
);

export default function TermsPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <LegalPage doc={termsOfService} />
      <Footer />
    </>
  );
}
