import { philanthropyPage as d } from "@/content/philanthropy";
import { pageMetadata } from "@/lib/seo";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { Parallax } from "@/components/animations/Parallax";
import { SplitHeadline } from "@/components/animations/SplitHeadline";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { PageHero } from "@/components/sections/PageHero";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ArrowLink } from "@/components/ui/Button";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Section } from "@/components/ui/Section";
import { Em, Eyebrow, Text } from "@/components/ui/Typography";

export const metadata = pageMetadata({
  title: "Philanthropy",
  description:
    "Growth is more meaningful when it gives back. Roy Capital intends to dedicate a part of its profits towards initiatives that support people and communities.",
  path: "/philanthropy",
});

const warmGlow =
  "bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--rc-color-warm)_16%,transparent),transparent)]";

/** Concentric, softly warm rings — a human, outward-reaching motif. */
function Ripple() {
  return (
    <div className="relative mx-auto aspect-square max-w-md">
      <div aria-hidden className={`absolute inset-0 rounded-full ${warmGlow}`} />
      {[100, 78, 56, 34].map((s, i) => (
        <span
          key={s}
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            width: `${s}%`,
            height: `${s}%`,
            borderColor: `color-mix(in oklab, var(--rc-color-warm) ${18 + i * 14}%, transparent)`,
          }}
        />
      ))}
      <span aria-hidden className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-warm" />
    </div>
  );
}

export default function PhilanthropyPage() {
  return (
    <>
      <ScrollProgress />
      <PageHero
        eyebrow={d.hero.eyebrow}
        title={["Growth Is More Meaningful", <Em key="em" className="text-warm">When It Gives Back.</Em>]}
        lead={d.hero.lead}
        body={d.hero.body}
        visual={
          <Parallax speed={-0.3}>
            <Ripple />
          </Parallax>
        }
      />

      <Section aria-labelledby="purpose-title" className="overflow-hidden">
        <div aria-hidden className={`pointer-events-none absolute -top-40 -right-40 size-[40rem] rounded-full ${warmGlow}`} />
        <div className="relative grid gap-14 lg:grid-cols-12">
          <div id="purpose-title" className="lg:col-span-5">
            <SectionIntro eyebrow={d.purpose.eyebrow} index="01" title={[d.purpose.title]} body={d.purpose.body} />
          </div>
          <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {d.purpose.pillars.map((p, i) => (
              <StaggerItem
                as="li"
                key={p.title}
                className="group rounded-card border border-line bg-bg-2 p-8 transition-[border-color,transform] duration-(--rc-motion-medium) ease-premium hover:-translate-y-1 hover:border-warm/40"
              >
                <span className="text-small tabular-nums text-warm">0{i + 1}</span>
                <h3 className="mt-8 font-heading text-h4 font-semibold text-fg">{p.title}</h3>
                <p className="mt-3 text-muted">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section tone="raised" aria-labelledby="commitment-title" className="border-y border-line">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index="02">{d.commitment.eyebrow}</Eyebrow>
            </Reveal>
            <SplitHeadline
              id="commitment-title"
              as="p"
              lines={[<span key="q" className="font-display font-normal italic">“{d.commitment.quote}”</span>]}
              className="mt-8 font-heading text-h1 text-fg"
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal>
              <Text>{d.commitment.body}</Text>
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <ArrowLink href={d.cta.href}>{d.cta.label}</ArrowLink>
            </Reveal>
          </div>
        </div>
      </Section>

      <ClosingCta
        eyebrow="Purpose-driven partnerships"
        title={["Create positive change", <Em key="em">together.</Em>]}
        body="Organisations interested in community and purpose-driven initiatives are welcome to start a conversation with Roy Capital."
        primary={{ label: "Discuss a Partnership", href: "/sponsorships#enquiry" }}
        secondary={{ label: "Contact Roy Capital", href: "/contact" }}
      />
    </>
  );
}
