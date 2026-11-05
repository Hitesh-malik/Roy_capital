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
        eyebrow={d.eyebrow}
        title={["Knowledge First.", <Em key="em">Decisions with Perspective.</Em>]}
        lead={d.lead}
        body={d.body}
      />

      <Section aria-labelledby="journey-title">
        <div id="journey-title" className="mb-16">
          <SectionIntro eyebrow={d.journey.eyebrow} index="01" title={[d.journey.title]} />
        </div>
        <ApproachJourney />
      </Section>

      <Section tone="raised" aria-labelledby="principles-title" className="border-y border-line">
        <div className="grid gap-14 lg:grid-cols-12">
          <div id="principles-title" className="lg:col-span-6">
            <SectionIntro eyebrow={d.principles.eyebrow} index="02" title={[d.principles.title]} body={d.principles.body} />
          </div>
          <Stagger as="ul" className="grid gap-4 self-end sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
            {approachPrinciples.map((p, i) => (
              <StaggerItem as="li" key={p} className="rounded-card border border-line bg-bg p-6">
                <span className="text-small tabular-nums text-accent-soft">0{i + 1}</span>
                <p className="mt-4 text-fg">{p}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section aria-label={d.philosophy.eyebrow}>
        <Reveal>
          <Eyebrow index="03">{d.philosophy.eyebrow}</Eyebrow>
        </Reveal>
        <PhilosophyStatement lines={d.philosophy.lines} className="mt-10 text-h1" />
        <div className="mt-14 grid lg:grid-cols-12">
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <Text size="lead">{d.philosophy.body}</Text>
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
