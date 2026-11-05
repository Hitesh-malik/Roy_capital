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
import { Em, Eyebrow, Text } from "@/components/ui/Typography";
import { GeometricPanel } from "@/components/visuals/GeometricPanel";

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
        eyebrow={d.eyebrow}
        title={["Learn Today.", <Em key="em">Understand Tomorrow.</Em>]}
        lead={d.intro}
        actions={
          <nav aria-label="Programs" className="flex flex-wrap gap-3">
            {programs.map((p) => (
              <ButtonLink key={p.slug} href={`#${p.slug}`} variant="secondary" size="sm" icon="none">
                {p.number} · {p.title}
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
            tone={flip ? "raised" : "base"}
            aria-labelledby={`${p.slug}-title`}
            className={cn(flip && "border-y border-line")}
          >
            <div className="grid items-center gap-14 lg:grid-cols-12">
              <ClipReveal className={cn("group lg:col-span-5", flip && "lg:order-2 lg:col-start-8")}>
                <GeometricPanel motif={p.motif} label={`Program ${p.number}`} className="aspect-square" />
              </ClipReveal>

              <div className={cn("lg:col-span-6", flip ? "lg:order-1" : "lg:col-start-7")}>
                <Reveal>
                  <Eyebrow index={p.number}>{p.title}</Eyebrow>
                </Reveal>
                <SplitHeadline id={`${p.slug}-title`} lines={[p.headline]} className="mt-6 font-heading text-h2 font-semibold text-fg" />
                <Reveal delay={0.1}>
                  <Text size="lead" className="mt-6">
                    {p.body}
                  </Text>
                </Reveal>
                <Stagger as="ul" className="mt-10 grid gap-x-8 border-t border-line sm:grid-cols-2">
                  {p.topics.map((t) => (
                    <StaggerItem as="li" key={t} className="flex items-start gap-3 border-b border-line py-4 text-fg">
                      <Check aria-hidden className="mt-1 size-4 shrink-0 text-accent-soft" strokeWidth={2} />
                      <span className="text-small">{t}</span>
                    </StaggerItem>
                  ))}
                </Stagger>
                <Reveal delay={0.1} className="mt-10">
                  <ButtonLink href={`/contact?subject=${p.slug}`}>{p.enquiryCta}</ButtonLink>
                </Reveal>
              </div>
            </div>
          </Section>
        );
      })}

      <Section aria-labelledby="benefit-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{d.benefit.eyebrow}</Eyebrow>
            </Reveal>
            <SplitHeadline id="benefit-title" lines={[d.benefit.title]} className="mt-6 font-heading text-h2 font-semibold text-fg" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <Text size="lead">{d.benefit.body}</Text>
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
