import { GraduationCap, HandHeart, Sprout, Users } from "lucide-react";
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
import { Em, Eyebrow, IconBadge, Text } from "@/components/ui/Typography";
import { Emblem } from "@/components/visuals/LogoMark";

export const metadata = pageMetadata({
  title: "Philanthropy",
  description:
    "Growth is more meaningful when it gives back. Roy Capital intends to dedicate a part of its profits towards initiatives that support people and communities.",
  path: "/philanthropy",
});

const pillarIcons = [GraduationCap, Users, Sprout, HandHeart];

/** Concentric gold rings radiating from the emblem — a human, outward-reaching motif. */
function Ripple() {
  return (
    <div className="relative mx-auto aspect-square max-w-md">
      <div aria-hidden className="gold-glow absolute inset-0 rounded-full" />
      {[100, 80, 62].map((s, i) => (
        <span
          key={s}
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            width: `${s}%`,
            height: `${s}%`,
            borderColor: `color-mix(in oklab, var(--rc-brand-gold) ${16 + i * 14}%, transparent)`,
            borderStyle: i === 1 ? "dashed" : "solid",
          }}
        />
      ))}
      <div className="absolute top-1/2 left-1/2 w-[44%] -translate-x-1/2 -translate-y-1/2">
        <Emblem size={220} responsive alt="Roy Capital emblem" className="ring-emblem h-auto w-full" />
      </div>
    </div>
  );
}

export default function PhilanthropyPage() {
  return (
    <>
      <ScrollProgress />
      <PageHero
        crumb="Philanthropy"
        eyebrow={d.hero.eyebrow}
        title={["Growth Is More Meaningful", <Em key="em">When It Gives Back.</Em>]}
        lead={d.hero.lead}
        body={d.hero.body}
        visual={
          <Parallax speed={-0.3}>
            <Ripple />
          </Parallax>
        }
      />

      <Section tone="ivory" aria-labelledby="purpose-title" className="overflow-hidden">
        <div className="relative grid gap-14 lg:grid-cols-12">
          <div id="purpose-title" className="lg:col-span-5">
            <SectionIntro eyebrow={d.purpose.eyebrow} index="01" title={[d.purpose.title]} body={d.purpose.body} />
          </div>
          <Stagger as="ul" className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {d.purpose.pillars.map((p, i) => {
              const Icon = pillarIcons[i] ?? HandHeart;
              return (
                <StaggerItem
                  as="li"
                  key={p.title}
                  className="group relative overflow-hidden rounded-card border border-line bg-surface p-8 shadow-card transition-[border-color,transform,box-shadow] duration-(--rc-motion-medium) ease-premium hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-lift"
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
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-8 font-heading text-h3 font-semibold text-fg">{p.title}</h3>
                  <p className="mt-3 text-muted">{p.body}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Section>

      <Section tone="royal" aria-labelledby="commitment-title" className="overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -bottom-60 -left-40 size-[44rem] rounded-full border border-gold/15" />
        <div aria-hidden className="gold-glow pointer-events-none absolute -top-32 right-0 size-[32rem] opacity-60" />
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index="02">{d.commitment.eyebrow}</Eyebrow>
            </Reveal>
            <SplitHeadline
              id="commitment-title"
              as="p"
              lines={[<span key="q" className="font-display font-medium italic">“{d.commitment.quote}”</span>]}
              className="mt-8 font-heading text-h1 text-fg"
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal className="border-l border-gold/50 pl-6">
              <Text className="text-fg/85">{d.commitment.body}</Text>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 pl-6">
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
