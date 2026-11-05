import { aboutPage as d } from "@/content/about";
import { pageMetadata } from "@/lib/seo";
import { ClipReveal, Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { Parallax } from "@/components/animations/Parallax";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { PageHero } from "@/components/sections/PageHero";
import { PhilosophyStatement } from "@/components/sections/PhilosophyStatement";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Section } from "@/components/ui/Section";
import { Em, Eyebrow, Text } from "@/components/ui/Typography";
import { CoreFallback } from "@/components/visuals/CoreFallback";

export const metadata = pageMetadata({
  title: "About Roy Capital",
  description:
    "Roy Capital brings together financial education, investment awareness and entrepreneurial thinking. Discover our vision, mission and core values.",
  path: "/about",
});

function Statement({ label, title, body, index }: { label: string; title: string; body: string; index: string }) {
  return (
    <Reveal as="article" className="relative overflow-hidden rounded-card border border-line bg-bg p-8 md:p-12">
      <div aria-hidden className="arch-grid absolute inset-0 opacity-40" />
      <div className="relative">
        <Eyebrow index={index}>{label}</Eyebrow>
        <h3 className="mt-8 font-heading text-h2 font-semibold text-fg">{title}</h3>
        <Text className="mt-6">{body}</Text>
      </div>
    </Reveal>
  );
}

export default function AboutPage() {
  return (
    <>
      <ScrollProgress />
      <PageHero
        eyebrow={d.eyebrow}
        title={["A Vision Built Around", <Em key="em">Knowledge, Growth and Purpose.</Em>]}
        visual={
          <Parallax speed={-0.4} className="mx-auto aspect-square max-w-md">
            <CoreFallback />
          </Parallax>
        }
      />

      <Section aria-label="Introduction">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="font-display text-h2 leading-tight italic text-fg">
              Financial knowledge can open doors to better opportunities.
            </p>
          </Reveal>
          <div className="space-y-6 lg:col-span-6 lg:col-start-7">
            {d.intro.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Text size={i === 0 ? "lead" : "body"} tone={i === 0 ? "default" : "muted"}>
                  {p}
                </Text>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="raised" aria-label="Vision and mission" className="border-y border-line">
        <div className="grid gap-6 lg:grid-cols-2">
          <Statement index="01" {...d.vision} />
          <Statement index="02" {...d.mission} />
        </div>
      </Section>

      <Section aria-labelledby="values-title">
        <div id="values-title">
          <SectionIntro eyebrow={d.valuesIntro.eyebrow} index="03" title={[d.valuesIntro.title]} />
        </div>
        <Stagger as="ul" className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {d.values.map((v) => (
            <StaggerItem as="li" key={v.title} className="group relative bg-bg p-8 transition-colors duration-(--rc-motion-medium) hover:bg-bg-2 md:p-10">
              <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-(--rc-motion-slow) ease-premium group-hover:scale-x-100" />
              <div className="flex items-baseline justify-between">
                <h3 className="font-heading text-h3 font-semibold text-fg">{v.title}</h3>
                <span className="text-small tabular-nums text-subtle transition-colors group-hover:text-accent-soft">{v.number}</span>
              </div>
              <p className="mt-4 text-muted">{v.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="raised" aria-labelledby="different-title" className="overflow-hidden border-y border-line">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow index="04">
                <span id="different-title">{d.different.eyebrow}</span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <Text size="lead" className="mt-8">
                {d.different.body}
              </Text>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ClipReveal>
              <PhilosophyStatement lines={d.different.statement} className="text-h1" />
            </ClipReveal>
          </div>
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
