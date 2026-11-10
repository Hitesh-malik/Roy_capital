import { Quote } from "lucide-react";
import { homePage } from "@/content/home";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeadline } from "@/components/animations/SplitHeadline";
import { ArrowLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Text } from "@/components/ui/Typography";
import { CommunityVideo } from "../CommunityVideo";
import { PhilosophyStatement } from "../PhilosophyStatement";
import { SectionIntro } from "../SectionIntro";

/** Section 07 — Clarity Over Complexity. Perspective Over Hype. */
export function HomePhilosophy() {
  const d = homePage.philosophy;
  return (
    <Section tone="royal" aria-label={d.eyebrow} className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 size-[64rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15" />
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold/20" />
      <div aria-hidden className="gold-glow pointer-events-none absolute top-1/2 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="relative">
        <Reveal>
          <Eyebrow index="05">{d.eyebrow}</Eyebrow>
        </Reveal>
        <PhilosophyStatement lines={d.lines} className="mt-10" />
        <div className="mt-14 grid lg:grid-cols-12">
          <Reveal className="border-l border-gold/50 pl-6 lg:col-span-5 lg:col-start-8">
            <Text size="lead" className="text-fg/85">
              {d.body}
            </Text>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/** Section 08 — Purpose & Philanthropy (intentions, not completed initiatives). */
export function HomePhilanthropy() {
  const d = homePage.philanthropy;
  return (
    <Section tone="ivory" aria-labelledby="giving-title" className="overflow-hidden">
      <div className="relative grid gap-14 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-6">
          <figure className="relative overflow-hidden rounded-media border border-line bg-surface p-8 shadow-card sm:p-12">
            <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-gold-soft via-gold to-gold-deep" />
            <Quote aria-hidden className="size-10 text-gold" strokeWidth={1.25} />
            <blockquote className="mt-6">
              <p className="font-display text-h2 leading-tight font-medium text-fg italic">{d.quote}</p>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3 font-ui text-label font-semibold uppercase text-accent-soft">
              <span aria-hidden className="h-px w-8 bg-gold-deep" />
              Roy Capital
            </figcaption>
          </figure>
        </Reveal>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <Eyebrow index="06">{d.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeadline id="giving-title" lines={[d.title]} className="mt-6 font-heading text-h2 font-semibold text-fg" />
          <Reveal delay={0.1}>
            <Text className="mt-6">{d.body}</Text>
          </Reveal>
          <Reveal delay={0.2} className="mt-8">
            <ArrowLink href={d.cta.href}>{d.cta.label}</ArrowLink>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/** Section 09 — Community film. */
export function HomeCommunity() {
  const d = homePage.community;
  return (
    <Section tone="navy" aria-labelledby="community-title" className="overflow-hidden">
      <div aria-hidden className="gold-glow pointer-events-none absolute top-1/2 right-[-10%] -z-10 size-[44rem] -translate-y-1/2 opacity-70" />
      <div className="grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div id="community-title">
            <SectionIntro eyebrow={d.eyebrow} index="07" title={[d.title]} body={d.body} />
          </div>
          <Reveal delay={0.2} className="mt-10">
            <ArrowLink href={d.cta.href}>{d.cta.label}</ArrowLink>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-5 lg:col-start-8">
          <CommunityVideo />
        </Reveal>
      </div>
    </Section>
  );
}
