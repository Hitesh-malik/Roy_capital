import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homePage } from "@/content/home";
import { programs } from "@/content/programs";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { ArrowLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { GeometricPanel } from "@/components/visuals/GeometricPanel";
import { SectionIntro } from "../SectionIntro";

const d = homePage.learning;

/**
 * Three architectural panels. On desktop the hovered / focused panel widens
 * and reveals its motif; on mobile they stack as cards.
 */
export function LearningAreas() {
  return (
    <Section tone="raised" aria-labelledby="learning-title" className="border-y border-line">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div id="learning-title">
          <SectionIntro eyebrow={d.eyebrow} index="02" title={[d.title]} body={d.body} />
        </div>
        <Reveal className="shrink-0">
          <ArrowLink href={d.cta.href}>{d.cta.label}</ArrowLink>
        </Reveal>
      </div>

      <Stagger as="ul" className="mt-16 flex flex-col gap-4 lg:h-[34rem] lg:flex-row">
        {programs.map((p) => (
          <StaggerItem
            as="li"
            key={p.slug}
            className="group/panel relative min-w-0 lg:flex-1 lg:transition-[flex-grow] lg:duration-(--rc-motion-slow) lg:ease-premium lg:hover:grow-[1.7] lg:focus-within:grow-[1.7]"
          >
            <Link
              href={`/programs#${p.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-bg p-7 transition-[border-color,background-color,box-shadow] duration-(--rc-motion-medium) ease-premium hover:border-line-strong hover:bg-surface/40 hover:shadow-lift md:p-9"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-soft transition-transform duration-(--rc-motion-slow) ease-premium group-hover:scale-x-100"
              />
              <div className="flex items-start justify-between">
                <span className="font-heading text-h3 font-semibold tabular-nums text-subtle transition-colors group-hover:text-accent-soft">
                  {p.number}
                </span>
                <span className="grid size-11 place-items-center rounded-full border border-line-strong text-muted transition-[transform,color,border-color,background-color] duration-(--rc-motion-medium) ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                  <ArrowUpRight className="size-4" strokeWidth={1.75} />
                </span>
              </div>

              <GeometricPanel
                motif={p.motif}
                className="pointer-events-none my-6 aspect-[4/3] border-0 bg-none opacity-70 transition-opacity duration-(--rc-motion-slow) group-hover:opacity-100 lg:my-auto lg:aspect-auto lg:h-56"
              />

              <div className="mt-auto">
                <h3 className="font-heading text-h3 font-semibold text-fg">{p.title}</h3>
                <p className="mt-3 max-w-md text-muted">{p.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-heading text-small font-semibold uppercase tracking-[0.12em] text-accent-soft">
                  {p.homeCta}
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
