import { Suspense } from "react";
import { Handshake, Mail, ShieldAlert } from "lucide-react";
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
import { InstagramIcon } from "@/components/visuals/InstagramIcon";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Start a conversation with Roy Capital — general enquiries about our learning areas, or sponsorship and partnership enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow={d.eyebrow}
        title={["Let's Start", <Em key="em">a Conversation.</Em>]}
        lead={d.lead}
        body={d.body}
        photoPosition="4% 50%"
      />

      <Section tone="ivory" aria-label="Enquiry forms">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <aside className="space-y-5 lg:col-span-4">
            <Reveal className="tone-dark relative overflow-hidden rounded-card bg-navy-luxe p-7 text-fg shadow-lift">
              <div aria-hidden className="dot-grid absolute inset-0 opacity-30" />
              <div className="relative">
                <span className="grid size-11 place-items-center rounded-full border border-gold/40 text-gold-soft">
                  <Mail aria-hidden className="size-5" strokeWidth={1.6} />
                </span>
                <p className="mt-5 font-ui text-label font-semibold uppercase text-gold-soft">{d.direct.label}</p>
                <Text className="mt-2">{d.direct.note}</Text>
                <p className="mt-3 font-ui text-[1.125rem] font-semibold break-all text-fg select-all">{site.email}</p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <a
                href={site.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-card border border-line bg-surface p-5 shadow-card transition-colors duration-(--rc-motion-medium) hover:border-gold/55"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-royal text-gold-soft transition-colors group-hover:bg-gold group-hover:text-navy">
                  <InstagramIcon className="size-5" strokeWidth={1.6} />
                </span>
                <span className="min-w-0">
                  <span className="block font-ui text-label font-semibold uppercase text-subtle">Follow on Instagram</span>
                  <span className="mt-0.5 block font-ui font-semibold text-fg">{site.instagram.handle}</span>
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Reveal>
            <Reveal delay={0.1} className="rounded-card border border-line bg-surface p-7 shadow-card">
              <span className="grid size-11 place-items-center rounded-full bg-royal text-gold-soft">
                <Handshake aria-hidden className="size-5" strokeWidth={1.6} />
              </span>
              <p className="mt-5 font-heading text-h4 font-semibold text-fg">Exploring a sponsorship?</p>
              <Text size="small" className="mt-2">
                Learn how Roy Capital approaches partnerships and areas of alignment before you get in touch.
              </Text>
              <ButtonLink href="/sponsorships" variant="ghost" size="sm" className="mt-4 px-0">
                Sponsorships & Partnerships
              </ButtonLink>
            </Reveal>
            <Reveal delay={0.15} className="flex gap-3 px-1">
              <ShieldAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-deep" strokeWidth={1.75} />
              <Text size="small" tone="subtle">
                {site.disclaimer}
              </Text>
            </Reveal>
          </aside>

          <Reveal className="tone-paper relative overflow-hidden rounded-[calc(var(--rc-radius-card)*1.5)] border border-line bg-surface p-6 shadow-lift sm:p-10 lg:col-span-8">
            <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-linear-to-r from-gold-deep via-gold to-gold-soft" />
            <Suspense fallback={<ContactPathways />}>
              <ContactPathwaysFromParams />
            </Suspense>
          </Reveal>
        </div>
      </Section>

      <FaqSection items={faqs} eyebrow={d.faqs.eyebrow} title={d.faqs.title} lead={d.faqs.lead} tone="navy" />
    </>
  );
}
