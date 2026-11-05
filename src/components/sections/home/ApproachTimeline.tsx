"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { approachSteps } from "@/content/approach";
import { homePage } from "@/content/home";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "../SectionIntro";

const d = homePage.approach;

/** Understand → Explore → Apply → Grow with a scroll-drawn connecting line. */
export function ApproachTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

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
          <span aria-hidden className="absolute top-2 bottom-2 left-[1.4rem] w-px bg-line" />
          <motion.span
            aria-hidden
            className="absolute top-2 bottom-2 left-[1.4rem] w-px origin-top bg-gradient-to-b from-accent to-accent-soft"
            style={{ scaleY: reduced ? 1 : scaleY }}
          />
          {approachSteps.map((step, i) => (
            <motion.li
              key={step.title}
              className="relative grid grid-cols-[2.8rem_1fr] gap-6 pb-14 last:pb-0"
              initial={{ opacity: 0.35 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.7, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="relative z-10 grid size-11 place-items-center rounded-full border border-line-strong bg-bg-2 font-heading text-small font-semibold tabular-nums text-accent-soft">
                {step.number}
              </span>
              <div className="pt-1.5">
                <p className="text-label font-medium uppercase text-subtle">Stage {i + 1}</p>
                <h3 className="mt-2 font-heading text-h2 font-semibold text-fg">{step.title}</h3>
                <p className="mt-4 max-w-md text-muted">{step.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
