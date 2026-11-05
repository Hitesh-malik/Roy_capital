import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { fontVariables } from "@/config/fonts";
import { site } from "@/config/site";
import { theme } from "@/config/theme";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { ThemeStyle } from "@/components/layout/ThemeStyle";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
    siteName: site.name,
    type: "website",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: theme.colors.bg,
  colorScheme: theme.colorScheme,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  slogan: site.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables} data-scroll-behavior="smooth">
      <head>
        <ThemeStyle />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only rounded-button bg-accent px-5 py-3 text-small font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        <Providers>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </Providers>
        <div aria-hidden className="grain-overlay" />
      </body>
    </html>
  );
}
