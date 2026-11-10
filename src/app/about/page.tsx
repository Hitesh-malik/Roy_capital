import { Award, BookOpenText, Eye, Lightbulb, Quote, Scale, ShieldCheck, Target, Users, type LucideIcon } from "lucide-react";
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
import { Em, Eyebrow, IconBadge, Text } from "@/components/ui/Typography";
import { CoreFallback } from "@/components/visuals/CoreFallback";
import { Emblem } from "@/components/visuals/LogoMark";

export const metadata = pageMetadata({
  title: "About Roy Capital",
  description:
    "Roy Capital brings together financial education, investment awareness and entrepreneurial thinking. Discover our vision, mission and core values.",
  path: "/about",
});

const valueIcons = [ShieldCheck, BookOpenText, Lightbulb, Scale, Users, Award];

function Statement({
  label,
  title,
  body,
  index,
  icon: Icon,
}: {
  label: string;
  title: string;
  body: string;
  index: string;
  icon: LucideIcon;
}) {
  return (
    <Reveal
      as="article"
      className="group frame-gold relative h-full overflow-hidden rounded-media bg-linear-to-br from-surface via-bg-2 to-bg p-8 shadow-card transition-shadow duration-(--rc-motion-medium) hover:shadow-lift md:p-12"
    >
      <div aria-hidden className="dot-grid absolute inset-0 opacity-30" />
      <div aria-hidden className="gold-glow absolute -top-24 -right-24 size-72 opacity-60" />
      <div className="relative">
        <div className="flex items-center justify-between gap-6">
          <Eyebrow index={index}>{label}</Eyebrow>
          <IconBadge>
            <Icon strokeWidth={1.6} />
          </IconBadge>
        </div>
        <h3 className="mt-10 font-heading text-h2 font-semibold text-fg">{title}</h3>
        <span aria-hidden className="mt-6 block h-px w-16 bg-linear-to-r from-gold to-gold/0" />
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
        crumb="About"
        eyebrow={d.eyebrow}
        title={["A Vision Built Around", <Em key="em">Knowledge, Growth and Purpose.</Em>]}
        visual={
          <Parallax speed={-0.4} className="relative mx-auto aspect-square max-w-md">
            <div aria-hidden className="gold-glow absolute -inset-[10%]" />
            <CoreFallback className="absolute inset-0" />
            <div className="absolute top-1/2 left-1/2 w-[56%] -translate-x-1/2 -translate-y-1/2">
              <Emblem size={260} responsive alt="Roy Capital emblem" className="ring-emblem h-auto w-full" />
            </div>
          </Parallax>
        }
      />

      <Section tone="ivory" aria-label="Introduction">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Quote aria-hidden className="size-10 text-gold-deep" strokeWidth={1.25} />
            <p className="mt-6 font-display text-h2 leading-tight font-medium text-fg italic">
              Financial knowledge can open doors to better opportunities.
            </p>
            <span aria-hidden className="mt-8 block h-px w-20 bg-linear-to-r from-gold-deep to-gold/0" />
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

      <Section tone="navy" aria-label="Vision and mission" className="overflow-hidden">
        <div className="grid gap-6 lg:grid-cols-2">
          <Statement index="01" icon={Eye} {...d.vision} />
          <Statement index="02" icon={Target} {...d.mission} />
        </div>
      </Section>

      <Section tone="paper" aria-labelledby="values-title">
        <div id="values-title">
          <SectionIntro eyebrow={d.valuesIntro.eyebrow} index="03" title={[d.valuesIntro.title]} />
        </div>
        <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {d.values.map((v, i) => {
            const Icon = valueIcons[i] ?? ShieldCheck;
            return (
              <StaggerItem
                as="li"
                key={v.title}
                className="group relative overflow-hidden rounded-card border border-line bg-surface p-8 shadow-card transition-[transform,box-shadow,border-color] duration-(--rc-motion-medium) ease-premium hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-lift md:p-10"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-linear-to-r from-gold-deep via-gold to-gold-soft transition-transform duration-(--rc-motion-slow) ease-premium group-hover:scale-x-100"
                />
                <div className="flex items-start justify-between">
                  <IconBadge>
                    <Icon strokeWidth={1.6} />
                  </IconBadge>
                  <span className="font-display text-h3 font-semibold text-line-strong italic tabular-nums transition-colors group-hover:text-gold-deep">
                    {v.number}
                  </span>
                </div>
                <h3 className="mt-8 font-heading text-h3 font-semibold text-fg">{v.title}</h3>
                <p className="mt-3 text-muted">{v.body}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      <Section tone="royal" aria-labelledby="different-title" className="overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-[-12rem] size-[48rem] -translate-y-1/2 rounded-full border border-gold/15"
        />
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow index="04">
                <span id="different-title">{d.different.eyebrow}</span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <Text size="lead" className="mt-8 text-fg/85">
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
