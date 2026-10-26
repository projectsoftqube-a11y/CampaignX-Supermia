import { UseCasePageTemplate } from "@/components/page/UseCasePageTemplate";
import { USE_CASE_PAGES } from "@/config/pages/use-cases";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";

const PAGE = USE_CASE_PAGES.marketingTeams;
const PATH = ROUTES.marketingTeams.href;

export const metadata = pageMetadata({
  title: PAGE.metaTitle,
  description: PAGE.description,
  path: PATH,
});

export default function Page() {
  return <UseCasePageTemplate page={PAGE} path={PATH} />;
}
