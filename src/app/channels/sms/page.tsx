import { ChannelPageTemplate } from "@/components/page/ChannelPageTemplate";
import { CHANNEL_PAGES } from "@/config/pages/channels";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";

const PAGE = CHANNEL_PAGES.sms;
const PATH = ROUTES.sms.href;

export const metadata = pageMetadata({
  title: PAGE.metaTitle,
  description: PAGE.description,
  path: PATH,
});

export default function Page() {
  return <ChannelPageTemplate page={PAGE} path={PATH} crumb="SMS" />;
}
