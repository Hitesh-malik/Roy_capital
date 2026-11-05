import { Suspense } from "react";
import { site } from "@/config/site";
import { contactPage as d } from "@/content/contact";
import { faqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/animations/Reveal";
import { ContactPathways, ContactPathwaysFromParams } from "@/components/forms/ContactPathways";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Em, Text } from "@/components/ui/Typography";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Start a conversation with Roy Capital — general enquiries about our learning areas, or sponsorship and partnership enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={["Let's Start", <Em key="em">a Conversation.</Em>]} lead={d.lead} body={d.body} />

      <Section aria-label="Enquiry forms">
        <div className="grid gap-14 lg:grid-cols-12">
          <aside className="space-y-10 lg:col-span-4">
            <Reveal>
              <p className="text-label font-medium uppercase text-subtle">{d.direct.label}</p>
              <Text className="mt-3">{d.direct.note}</Text>
              <p className="mt-2 font-heading text-h4 font-semibold break-all text-fg select-all">{site.email}</p>
            </Reveal>
            <Reveal delay={0.1} className="rounded-card border border-line bg-bg-2 p-6">
              <p className="font-heading text-h4 font-semibold text-fg">Exploring a sponsorship?</p>
              <Text size="small" className="mt-2">
                Learn how Roy Capital approaches partnerships and areas of alignment before you get in touch.
              </Text>
              <ButtonLink href="/sponsorships" variant="ghost" size="sm" className="mt-4 px-0">
                Sponsorships & Partnerships
              </ButtonLink>
            </Reveal>
            <Reveal delay={0.15}>
              <Text size="small" tone="subtle">
                {site.disclaimer}
              </Text>
            </Reveal>
          </aside>

          <Reveal className="rounded-[calc(var(--rc-radius-card)*1.5)] border border-line bg-bg-2 p-6 sm:p-10 lg:col-span-8">
            <Suspense fallback={<ContactPathways />}>
              <ContactPathwaysFromParams />
            </Suspense>
          </Reveal>
        </div>
      </Section>

      <FaqSection items={faqs} eyebrow={d.faqs.eyebrow} title={d.faqs.title} lead={d.faqs.lead} tone="raised" />
    </>
  );
}
