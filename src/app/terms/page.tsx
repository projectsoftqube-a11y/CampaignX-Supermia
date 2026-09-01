import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LegalPage } from "@/components/layout/LegalPage";
import { termsOfService } from "@/config/legal/terms";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `The agreement governing your access to and use of ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <LegalPage doc={termsOfService} />
      <Footer />
    </>
  );
}
