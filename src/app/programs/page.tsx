import { Check } from "lucide-react";
import { programs, programsPage as d } from "@/content/programs";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils/cn";
import { ClipReveal, Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { SplitHeadline } from "@/components/animations/SplitHeadline";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Section } from "@/components/ui/Section";
import { Em, Eyebrow, IconBadge, Text } from "@/components/ui/Typography";
import { GeometricPanel } from "@/components/visuals/GeometricPanel";
import { ProgramIcon } from "@/components/visuals/ProgramIcon";

export const metadata = pageMetadata({
  title: "Our Programs",
  description:
    "Explore Roy Capital's learning areas: Financial Education, Investment Awareness and Entrepreneurship — designed to build a clearer understanding of finance and business.",
  path: "/programs",
});

export default function ProgramsPage() {
  return (
    <>
      <ScrollProgress />
      <PageHero
        crumb="Programs"
        eyebrow={d.eyebrow}
        title={["Learn Today.", <Em key="em">Understand Tomorrow.</Em>]}
        lead={d.intro}
        photoPosition="10% 50%"
        actions={
          <nav aria-label="Programs" className="flex flex-wrap gap-3">
            {programs.map((p) => (
              <ButtonLink key={p.slug} href={`#${p.slug}`} variant="secondary" size="sm" icon="none">
                <ProgramIcon slug={p.slug} className="size-4 text-gold-soft" />
                {p.title}
              </ButtonLink>
            ))}
          </nav>
        }
      />

      {programs.map((p, i) => {
        const flip = i % 2 === 1;
        return (
          <Section
            key={p.slug}
            id={p.slug}
            tone={flip ? "navy" : "ivory"}
            aria-labelledby={`${p.slug}-title`}
            className="overflow-hidden"
          >
            <p
              aria-hidden
              className={cn(
                "pointer-events-none absolute top-6 -z-10 font-display text-[clamp(10rem,24vw,22rem)] leading-none font-semibold italic select-none",
                flip ? "left-[-1%] text-gold/[0.06]" : "right-[-1%] text-gold-deep/[0.08]",
              )}
            >
              {p.number}
            </p>
            <div className="grid items-center gap-14 lg:grid-cols-12">
              <ClipReveal className={cn("group lg:col-span-5", flip && "lg:order-2 lg:col-start-8")}>
                <div className="tone-dark frame-gold relative overflow-hidden rounded-media shadow-lift">
                  <GeometricPanel motif={p.motif} label={`Program ${p.number}`} className="aspect-square rounded-media border-0 bg-navy" />
                  <span className="absolute top-5 right-5 grid size-11 place-items-center rounded-full border border-gold/40 bg-navy/70 text-gold-soft backdrop-blur">
                    <ProgramIcon slug={p.slug} className="size-5" />
                  </span>
                </div>
              </ClipReveal>

              <div className={cn("lg:col-span-6", flip ? "lg:order-1" : "lg:col-start-7")}>
                <Reveal className="flex items-center gap-4">
                  <IconBadge>
                    <ProgramIcon slug={p.slug} />
                  </IconBadge>
                  <Eyebrow index={p.number}>{p.title}</Eyebrow>
                </Reveal>
                <SplitHeadline id={`${p.slug}-title`} lines={[p.headline]} className="mt-6 font-heading text-h2 font-semibold text-fg" />
                <Reveal delay={0.1}>
                  <Text size="lead" className="mt-6">
                    {p.body}
                  </Text>
                </Reveal>
                <Stagger as="ul" className="mt-10 grid gap-3 sm:grid-cols-2">
                  {p.topics.map((t) => (
                    <StaggerItem
                      as="li"
                      key={t}
                      className="flex items-start gap-3 rounded-card border border-line bg-surface/60 px-4 py-3.5 text-fg shadow-card"
                    >
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold-metal text-navy">
                        <Check aria-hidden className="size-3" strokeWidth={3} />
                      </span>
                      <span className="text-small font-medium">{t}</span>
                    </StaggerItem>
                  ))}
                </Stagger>
                <Reveal delay={0.1} className="mt-10">
                  <ButtonLink href={`/contact?subject=${p.slug}`} size="lg">
                    {p.enquiryCta}
                  </ButtonLink>
                </Reveal>
              </div>
            </div>
          </Section>
        );
      })}

      <Section tone="royal" aria-labelledby="benefit-title" className="overflow-hidden">
        <div aria-hidden className="gold-glow pointer-events-none absolute -top-40 right-0 size-[36rem] opacity-60" />
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{d.benefit.eyebrow}</Eyebrow>
            </Reveal>
            <SplitHeadline id="benefit-title" lines={[d.benefit.title]} className="mt-6 font-heading text-h2 font-semibold text-fg" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <Text size="lead" className="text-fg/85">
                {d.benefit.body}
              </Text>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-6">
              <ButtonLink href="/contact" variant="secondary">
                Start a Conversation
              </ButtonLink>
              <Text size="small" tone="subtle">
                {d.benefit.note}
              </Text>
            </Reveal>
          </div>
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
