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
    <Section aria-label={d.eyebrow} className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 size-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/60" />
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/40" />
      <div className="relative">
        <Reveal>
          <Eyebrow index="05">{d.eyebrow}</Eyebrow>
        </Reveal>
        <PhilosophyStatement lines={d.lines} className="mt-10" />
        <div className="mt-14 grid lg:grid-cols-12">
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <Text size="lead">{d.body}</Text>
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
    <Section tone="raised" aria-labelledby="giving-title" className="overflow-hidden border-y border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 size-[44rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--rc-color-warm)_14%,transparent),transparent)]"
      />
      <div className="relative grid gap-14 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-6">
          <blockquote className="relative border-l border-warm/50 pl-8">
            <p className="font-display text-h2 leading-tight italic text-fg">“{d.quote}”</p>
          </blockquote>
        </Reveal>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <Eyebrow index="06" className="text-warm [&>span:nth-child(2)]:bg-warm/60">
              {d.eyebrow}
            </Eyebrow>
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
    <Section aria-labelledby="community-title">
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
