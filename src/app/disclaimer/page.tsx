import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMetadata({
  title: "Disclaimer",
  description: "Educational content only. Not financial advice.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Educational Disclaimer"
      updated="November 2026"
      intro={site.disclaimer}
      sections={[
        {
          heading: "Education, not advice",
          body: [
            "Roy Capital's website focuses on financial education and investment awareness. Educational information should not be considered personalised financial or investment advice.",
            "Nothing on this website is a recommendation to buy, sell or hold any investment, or an offer of any financial product or service.",
          ],
        },
        {
          heading: "Risk",
          body: [
            "All investments involve risk, including the possible loss of capital. Past performance is not a reliable indicator of future results.",
            "Please conduct independent research and consider seeking advice from an appropriately qualified professional before making financial decisions.",
          ],
        },
        {
          heading: "Partnerships",
          body: [
            "Areas of collaboration described on this website are open for discussion only. They do not represent guaranteed offerings, packages, outcomes or commercial terms.",
          ],
        },
      ]}
    />
  );
}
