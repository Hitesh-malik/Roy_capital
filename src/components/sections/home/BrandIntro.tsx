import { homePage } from "@/content/home";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { SplitHeadline } from "@/components/animations/SplitHeadline";
import { ArrowLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Em, Eyebrow, Text } from "@/components/ui/Typography";

const d = homePage.intro;

/** "Knowledge. Perspective. Purpose." — editorial brand introduction. */
export function BrandIntro() {
  const [k, p, pu] = d.title.split(" ");
  return (
    <Section aria-labelledby="intro-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow index="01">{d.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeadline
            id="intro-title"
            lines={[k, <span key="p" className="lg:pl-[12%]">{p}</span>, <Em key="pu" className="lg:pl-[24%]">{pu}</Em>]}
            className="mt-8 font-heading text-display font-semibold text-fg"
            stagger={0.12}
          />
        </div>
        <div className="flex flex-col justify-end lg:col-span-5 lg:pb-4">
          <Reveal>
            <Text size="lead" tone="default" className="font-heading font-medium">
              {d.lead}
            </Text>
          </Reveal>
          <Reveal delay={0.1}>
            <Text className="mt-5">{d.body}</Text>
          </Reveal>
          <Reveal delay={0.2} className="mt-8">
            <ArrowLink href={d.cta.href}>{d.cta.label}</ArrowLink>
          </Reveal>
        </div>
      </div>

      <Stagger as="ul" className="mt-20 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
        {d.pillars.map((pillar, i) => (
          <StaggerItem as="li" key={pillar.title} className="group relative bg-bg p-8 transition-colors duration-(--rc-motion-medium) hover:bg-bg-2 md:p-10">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-(--rc-motion-slow) ease-premium group-hover:scale-x-100"
            />
            <span className="text-small tabular-nums text-subtle">0{i + 1}</span>
            <h3 className="mt-10 font-heading text-h3 font-semibold text-fg">{pillar.title}</h3>
            <p className="mt-3 text-muted">{pillar.body}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
