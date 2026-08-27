import type { Metadata, Viewport } from "next";
import { display, highlight, sans } from "./fonts";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "AI marketing campaigns",
    "campaign automation",
    "AI campaign generator",
    "cross-channel marketing",
    "marketing workspace",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitter,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f8f6",
  colorScheme: "light",
};

/**
 * `js-motion` is rendered server-side rather than added by an inline script,
 * so the class is identical in the SSR HTML and at hydration. Without JS the
 * <noscript> block below cancels every pre-reveal resting state, which is the
 * only thing that class controls.
 */
const NO_JS_RESET = `
[data-animate="reveal"],
[data-animate="line"],
[data-hero-line],
[data-hero-supporting],
[data-hero-prompt],
[data-hero-device] {
  opacity: 1 !important;
  transform: none !important;
}
/* The typed brief never arrives without JS, so the placeholder stays and
   the caret has nothing to sit against. */
[data-hero-caret] {
  display: none !important;
}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${highlight.variable} js-motion`}
    >
      <head>
        <noscript
          dangerouslySetInnerHTML={{ __html: `<style>${NO_JS_RESET}</style>` }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-pill focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
