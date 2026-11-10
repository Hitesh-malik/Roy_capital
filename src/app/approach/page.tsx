import { CircleCheck } from "lucide-react";
import { approachPage as d, approachPrinciples } from "@/content/approach";
import { pageMetadata } from "@/lib/seo";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { ApproachJourney } from "@/components/sections/ApproachJourney";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { PageHero } from "@/components/sections/PageHero";
import { PhilosophyStatement } from "@/components/sections/PhilosophyStatement";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Section } from "@/components/ui/Section";
import { Em, Eyebrow, Text } from "@/components/ui/Typography";

export const metadata = pageMetadata({
  title: "Our Approach",
  description:
    "Understand. Explore. Apply. Grow. Roy Capital's learning philosophy focuses on clarity, context and continuous improvement.",
  path: "/approach",
});

export default function ApproachPage() {
  return (
    <>
      <ScrollProgress />
      <PageHero
        crumb="Our Approach"
        eyebrow={d.eyebrow}
        title={["Knowledge First.", <Em key="em">Decisions with Perspective.</Em>]}
        lead={d.lead}
        body={d.body}
        photoPosition="94% 50%"
      />

      <Section tone="navy" aria-labelledby="journey-title">
        <div id="journey-title" className="mb-16">
          <SectionIntro eyebrow={d.journey.eyebrow} index="01" title={[d.journey.title]} />
        </div>
        <ApproachJourney />
      </Section>

      <Section tone="ivory" aria-labelledby="principles-title">
        <div className="grid gap-14 lg:grid-cols-12">
          <div id="principles-title" className="lg:col-span-6">
            <SectionIntro eyebrow={d.principles.eyebrow} index="02" title={[d.principles.title]} body={d.principles.body} />
          </div>
          <Stagger as="ul" className="grid gap-4 self-end sm:grid-cols-2 lg:col-span-6">
            {approachPrinciples.map((p, i) => (
              <StaggerItem
                as="li"
                key={p}
                className="group relative overflow-hidden rounded-card border border-line bg-surface p-6 shadow-card transition-[transform,box-shadow,border-color] duration-(--rc-motion-medium) ease-premium hover:-translate-y-1 hover:border-gold/50 hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <CircleCheck aria-hidden className="size-6 text-gold-deep" strokeWidth={1.5} />
                  <span className="font-display text-h4 font-semibold text-line-strong italic tabular-nums transition-colors group-hover:text-gold-deep">
                    0{i + 1}
                  </span>
                </div>
                <p className="mt-5 font-heading text-h4 font-semibold text-fg">{p}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section tone="royal" aria-label={d.philosophy.eyebrow} className="overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 size-[44rem] rounded-full border border-gold/15" />
        <div aria-hidden className="gold-glow pointer-events-none absolute -right-20 bottom-0 size-[30rem] opacity-60" />
        <Reveal>
          <Eyebrow index="03">{d.philosophy.eyebrow}</Eyebrow>
        </Reveal>
        <PhilosophyStatement lines={d.philosophy.lines} className="mt-10 text-h1" />
        <div className="mt-14 grid lg:grid-cols-12">
          <Reveal className="border-l border-gold/50 pl-6 lg:col-span-6 lg:col-start-7">
            <Text size="lead" className="text-fg/85">
              {d.philosophy.body}
            </Text>
          </Reveal>
        </div>
      </Section>

      <ClosingCta
        eyebrow="Explore further"
        title={["Ready to learn", <Em key="em">or collaborate?</Em>]}
        body="Enquire about Roy Capital's learning areas, or start a conversation about a partnership aligned with clear, responsible financial education."
        primary={{ label: "Explore Partnerships", href: "/sponsorships" }}
        secondary={{ label: "View Programs", href: "/programs" }}
      />
    </>
  );
}
