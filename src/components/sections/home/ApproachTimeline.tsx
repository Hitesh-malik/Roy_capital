"use client";

import { useRef } from "react";
import { approachSteps } from "@/content/approach";
import { homePage } from "@/content/home";
import { useStepSequence } from "@/lib/hooks/useStepSequence";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "../SectionIntro";

const d = homePage.approach;

/** Understand → Explore → Apply → Grow: the line draws with scroll and each stage lights as it is reached. */
export function ApproachTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  useStepSequence(listRef, { axis: "y", start: "top 62%", end: "bottom 62%" });

  return (
    <Section tone="raised" aria-labelledby="approach-title" className="border-y border-line">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <div id="approach-title">
              <SectionIntro eyebrow={d.eyebrow} index="04" title={[d.title]} body={d.body} />
            </div>
            <Reveal delay={0.2} className="mt-10">
              <ArrowLink href={d.cta.href}>{d.cta.label}</ArrowLink>
            </Reveal>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-6 lg:col-start-7">
          <span aria-hidden className="absolute top-5 bottom-5 left-[1.375rem] w-px bg-line" />
          <span
            aria-hidden
            data-seq-line="y"
            className="absolute top-5 bottom-5 left-[1.375rem] w-px origin-top bg-linear-to-b from-accent to-accent-soft"
          />
          {approachSteps.map((step, i) => (
            <li key={step.title} data-seq-step className="group/step relative grid grid-cols-[2.75rem_1fr] gap-6 pb-14 last:pb-0">
              <span
                data-seq-marker
                className="relative z-10 grid size-11 place-items-center rounded-full border border-accent bg-accent font-heading text-small font-semibold tabular-nums text-on-accent shadow-glow transition-[background-color,border-color,color,box-shadow] duration-(--rc-motion-medium) ease-premium group-data-[active=false]/step:border-line-strong group-data-[active=false]/step:bg-bg-2 group-data-[active=false]/step:text-subtle group-data-[active=false]/step:shadow-none"
              >
                {step.number}
              </span>
              <div className="pt-1.5 transition-opacity duration-(--rc-motion-slow) ease-premium group-data-[active=false]/step:opacity-70">
                <p className="text-label font-medium uppercase text-muted">Stage {i + 1}</p>
                <h3 className="mt-2 font-heading text-h2 font-semibold text-fg">{step.title}</h3>
                <p className="mt-4 max-w-md text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
