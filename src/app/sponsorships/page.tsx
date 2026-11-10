import {
  BookOpenText,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  GraduationCap,
  HeartHandshake,
  Mail,
  Megaphone,
  Newspaper,
  Sprout,
} from "lucide-react";
import { site } from "@/config/site";
import { sponsorshipPage as d } from "@/content/sponsorship";
import { pageMetadata } from "@/lib/seo";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { SplitHeadline } from "@/components/animations/SplitHeadline";
import { PartnershipForm } from "@/components/forms/PartnershipForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { MediaKit } from "@/components/sections/MediaKit";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ButtonLink } from "@/components/ui/Button";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Section } from "@/components/ui/Section";
import { Em, Eyebrow, IconBadge, Text } from "@/components/ui/Typography";
import { PartnershipGeometry } from "@/components/visuals/PartnershipGeometry";

export const metadata = pageMetadata({
  title: "Sponsorships & Partnerships",
  description:
    "Explore sponsorships, brand collaborations and partnerships with Roy Capital — aligned with financial education, entrepreneurship and community contribution.",
  path: "/sponsorships",
});

const pillarIcons = [GraduationCap, ChartNoAxesCombined, BriefcaseBusiness, HeartHandshake];
const alignmentIcons = [BookOpenText, BriefcaseBusiness, Megaphone, Newspaper, Sprout];

export default function SponsorshipsPage() {
  return (
    <>
      <ScrollProgress />
      <PageHero
        crumb="Sponsorships"
        eyebrow={d.hero.eyebrow}
        title={["Partnerships Built", <Em key="em">on Shared Purpose.</Em>]}
        body={d.hero.body}
        actions={
          <>
            <ButtonLink href={d.hero.cta.href} size="lg" magnetic>
              {d.hero.cta.label}
            </ButtonLink>
            <ButtonLink href={d.hero.secondary.href} size="lg" variant="ghost">
              {d.hero.secondary.label}
            </ButtonLink>
          </>
        }
        visual={
          <div className="relative mx-auto max-w-md">
            <div aria-hidden className="gold-glow absolute -inset-[10%]" />
            <PartnershipGeometry className="relative" />
          </div>
        }
      />

      {/* About */}
      <Section tone="ivory" aria-labelledby="sp-about">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div id="sp-about">
              <SectionIntro eyebrow={d.about.eyebrow} index="01" title={[d.about.title]} />
            </div>
            <Reveal delay={0.1} className="mt-6 space-y-4">
              {d.about.body.map((p) => (
                <Text key={p}>{p}</Text>
              ))}
            </Reveal>
          </div>
          <Stagger as="ul" className="grid gap-4 self-start sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {d.about.pillars.map((p, i) => {
              const Icon = pillarIcons[i] ?? GraduationCap;
              return (
                <StaggerItem
                  as="li"
                  key={p.title}
                  className="group rounded-card border border-line bg-surface p-7 shadow-card transition-[transform,box-shadow,border-color] duration-(--rc-motion-medium) ease-premium hover:-translate-y-1 hover:border-gold/50 hover:shadow-lift"
                >
                  <IconBadge>
                    <Icon strokeWidth={1.6} />
                  </IconBadge>
                  <h3 className="mt-6 font-heading text-h4 font-semibold text-fg">{p.title}</h3>
                  <p className="mt-2 text-small text-muted">{p.body}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Section>

      {/* Areas of alignment */}
      <Section tone="navy" aria-labelledby="sp-alignment" className="overflow-hidden">
        <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-30" />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div id="sp-alignment">
            <SectionIntro eyebrow={d.alignment.eyebrow} index="02" title={[d.alignment.title]} />
          </div>
          <Reveal className="max-w-sm border-l border-gold/40 pl-5">
            <Text size="small" tone="subtle">
              {d.alignment.note}
            </Text>
          </Reveal>
        </div>
        <Stagger as="ul" className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {d.alignment.items.map((item, i) => {
            const Icon = alignmentIcons[i] ?? BookOpenText;
            return (
              <StaggerItem
                as="li"
                key={item.title}
                className="group relative overflow-hidden rounded-card border border-line bg-linear-to-b from-surface/80 to-bg-2/80 p-8 transition-[border-color,transform,box-shadow] duration-(--rc-motion-medium) ease-premium hover:-translate-y-1 hover:border-gold/55 hover:shadow-lift"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-linear-to-r from-gold-deep via-gold-soft to-gold transition-transform duration-(--rc-motion-slow) ease-premium group-hover:scale-x-100"
                />
                <div className="flex items-start justify-between">
                  <IconBadge>
                    <Icon strokeWidth={1.6} />
                  </IconBadge>
                  <span className="font-display text-h3 font-semibold text-line-strong italic tabular-nums transition-colors group-hover:text-gold-soft">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-8 font-heading text-h3 font-semibold text-fg">{item.title}</h3>
                <p className="mt-3 text-muted">{item.body}</p>
              </StaggerItem>
            );
          })}
          <StaggerItem
            as="li"
            className="flex flex-col justify-between rounded-card border border-dashed border-gold/40 bg-gold/[0.04] p-8"
          >
            <p className="font-display text-h3 font-medium text-fg italic">Have another idea in mind?</p>
            <ButtonLink href="#enquiry" variant="ghost" className="mt-6 self-start px-0">
              Tell us about it
            </ButtonLink>
          </StaggerItem>
        </Stagger>
      </Section>

      {/* Why */}
      <Section tone="paper" aria-labelledby="sp-why">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div id="sp-why" className="lg:sticky lg:top-32">
              <SectionIntro eyebrow={d.why.eyebrow} index="03" title={[d.why.title]} />
            </div>
          </div>
          <Stagger as="ol" className="space-y-3 lg:col-span-7 lg:col-start-6">
            {d.why.items.map((item, i) => (
              <StaggerItem
                as="li"
                key={item.title}
                className="group grid gap-2 rounded-card border border-line bg-bg-2 p-6 transition-[border-color,background-color,box-shadow] duration-(--rc-motion-medium) ease-premium hover:border-gold/50 hover:bg-surface hover:shadow-card sm:grid-cols-[3.5rem_1fr_1.4fr] sm:items-baseline sm:gap-6"
              >
                <span className="font-display text-h3 leading-none font-semibold text-gold-deep italic tabular-nums">0{i + 1}</span>
                <h3 className="font-heading text-h4 font-semibold text-fg">{item.title}</h3>
                <p className="text-muted">{item.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Process */}
      <Section id="process" tone="royal" aria-labelledby="sp-process" className="overflow-hidden">
        <div aria-hidden className="gold-glow pointer-events-none absolute top-0 left-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-60" />
        <div id="sp-process">
          <SectionIntro eyebrow={d.process.eyebrow} index="04" title={[d.process.title]} align="center" className="mx-auto" />
        </div>
        <div className="mt-16">
          <ProcessFlow steps={d.process.steps} />
        </div>
        <Reveal className="mt-14 text-center">
          <Text size="small" tone="subtle">
            {d.process.note}
          </Text>
        </Reveal>
      </Section>

      {/* Enquiry */}
      <Section id="enquiry" tone="ivory" aria-labelledby="sp-enquiry">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow index="05">{d.enquiry.eyebrow}</Eyebrow>
            </Reveal>
            <SplitHeadline
              id="sp-enquiry"
              lines={["Start a partnership", <Em key="em">conversation.</Em>]}
              className="mt-6 font-heading text-h2 font-semibold text-fg"
            />
            <Reveal delay={0.1}>
              <Text className="mt-6">{d.enquiry.body}</Text>
            </Reveal>
            <Reveal delay={0.15} className="tone-dark mt-10 rounded-card bg-navy-luxe p-6 text-fg shadow-card">
              <span className="grid size-10 place-items-center rounded-full border border-gold/40 text-gold-soft">
                <Mail aria-hidden className="size-4" strokeWidth={1.75} />
              </span>
              <p className="mt-4 text-small text-muted">Prefer email?</p>
              <p className="mt-1 font-ui text-[1.125rem] font-semibold break-all text-fg select-all">{site.email}</p>
            </Reveal>
          </div>
          <Reveal className="tone-paper relative overflow-hidden rounded-[calc(var(--rc-radius-card)*1.5)] border border-line bg-surface p-6 shadow-lift sm:p-10 lg:col-span-8">
            <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-linear-to-r from-gold-deep via-gold to-gold-soft" />
            <PartnershipForm />
          </Reveal>
        </div>
        <MediaKit />
      </Section>

      <FaqSection id="sponsorship-faqs" items={d.faqs} eyebrow="Partnership FAQ" title="Questions about collaborating" lead="" tone="navy" />
    </>
  );
}
