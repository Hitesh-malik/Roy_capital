import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How the Roy Capital website handles information.",
  path: "/privacy",
});

/**
 * Accurate for the current frontend-only build. Review with a qualified
 * adviser and update before enabling online form submissions or analytics.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Notice"
      updated="November 2026"
      intro="This notice explains how the Roy Capital website handles information. We aim to collect as little personal information as possible."
      sections={[
        {
          heading: "Enquiry forms",
          body: [
            "The enquiry forms on this website do not currently transmit or store the information you enter. Validation happens in your browser, and nothing is sent to Roy Capital or any third party when you press submit.",
            `If you choose to contact us, you can email ${site.email} directly. Any information you send by email will be used only to respond to your enquiry.`,
          ],
        },
        {
          heading: "Cookies and analytics",
          body: [
            "This website does not use advertising or analytics cookies. Fonts, images and video are served from this website rather than third-party services.",
          ],
        },
        {
          heading: "Changes to this notice",
          body: [
            "This notice will be updated before any online submission, analytics or other data-processing features are introduced.",
          ],
        },
      ]}
    />
  );
}
