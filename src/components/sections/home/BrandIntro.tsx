import { BookOpenText, Compass, HeartHandshake } from "lucide-react";
import { homePage } from "@/content/home";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { SplitHeadline } from "@/components/animations/SplitHeadline";
import { ArrowLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Em, Eyebrow, IconBadge, Text } from "@/components/ui/Typography";

const d = homePage.intro;
const pillarIcons = [BookOpenText, Compass, HeartHandshake];

/** "Knowledge. Perspective. Purpose." — editorial brand introduction on ivory. */
export function BrandIntro() {
  const [k, p, pu] = d.title.split(" ");
  return (
    <Section tone="ivory" aria-labelledby="intro-title" className="overflow-hidden">
      {/* Oversized serif watermark */}
      <p
        aria-hidden
        className="pointer-events-none absolute -top-6 right-[-2%] -z-10 font-display text-[clamp(9rem,22vw,22rem)] leading-none font-semibold text-gold-deep/5 italic select-none"
      >
        RC
      </p>

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
            <p className="font-display text-h3 leading-snug font-medium text-fg italic">{d.lead}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <span aria-hidden className="mt-6 block h-px w-16 bg-linear-to-r from-gold-deep to-gold/0" />
          </Reveal>
          <Reveal delay={0.1}>
            <Text className="mt-6">{d.body}</Text>
          </Reveal>
          <Reveal delay={0.2} className="mt-8">
            <ArrowLink href={d.cta.href}>{d.cta.label}</ArrowLink>
          </Reveal>
        </div>
      </div>

      <Stagger as="ul" className="mt-20 grid gap-5 md:grid-cols-3">
        {d.pillars.map((pillar, i) => {
          const Icon = pillarIcons[i] ?? Compass;
          return (
            <StaggerItem
              as="li"
              key={pillar.title}
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
                <span className="font-display text-h2 leading-none font-semibold text-line-strong italic tabular-nums transition-colors duration-(--rc-motion-medium) group-hover:text-gold-deep">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-10 font-heading text-h3 font-semibold text-fg">{pillar.title}</h3>
              <p className="mt-3 text-muted">{pillar.body}</p>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
