"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { homePage } from "@/content/home";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeadline } from "@/components/animations/SplitHeadline";
import { HeroScene } from "@/components/three/HeroScene";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Em, Eyebrow, Text } from "@/components/ui/Typography";

const h = homePage.hero;

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden className="arch-grid absolute inset-0 -z-10" />
      <div aria-hidden className="radial-light absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-b from-transparent to-bg" />

      <Container className="relative grid min-h-svh items-center gap-6 pt-32 pb-28 lg:grid-cols-12 lg:pt-28">
        <motion.div style={reduced ? undefined : { y, opacity }} className="relative z-10 lg:col-span-8">
          <Reveal immediate delay={0.15}>
            <Eyebrow className="flex-wrap">{h.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeadline
            id="hero-title"
            as="h1"
            trigger="mount"
            delay={0.3}
            stagger={0.14}
            lines={[h.lines[0], <Em key="em">{h.lines[1]}</Em>]}
            className="mt-8 font-heading text-display font-semibold text-fg"
          />
          <Reveal immediate delay={0.75} className="mt-7 max-w-xl">
            <Text size="lead">{h.body}</Text>
          </Reveal>
          <Reveal immediate delay={0.9} className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href={h.primary.href} size="lg" magnetic>
              {h.primary.label}
            </ButtonLink>
            <ButtonLink href={h.secondary.href} size="lg" variant="secondary">
              {h.secondary.label}
            </ButtonLink>
          </Reveal>
        </motion.div>

        <div className="relative mx-auto aspect-square w-full max-w-md lg:absolute lg:top-1/2 lg:right-[-6%] lg:mx-0 lg:w-[56%] lg:max-w-none lg:-translate-y-1/2">
          <HeroScene progress={scrollYProgress} className="h-full w-full" delay={0.6} />
          <Reveal immediate delay={1.3} className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
            {h.labels.map((label, i) => (
              <span
                key={label}
                className="absolute flex items-center gap-2 text-label font-medium uppercase text-subtle"
                style={[{ top: "10%", right: "14%" }, { top: "50%", right: "0%" }, { bottom: "10%", right: "26%" }][i]}
              >
                <span className="text-accent-soft tabular-nums">0{i + 1}</span>
                <span aria-hidden className="h-px w-6 bg-line-strong" />
                {label}
              </span>
            ))}
          </Reveal>
        </div>
      </Container>

      <Container className="pointer-events-none absolute inset-x-0 bottom-8 flex items-end justify-between">
        <Reveal immediate delay={1.4} className="flex items-center gap-4 text-label font-medium uppercase text-subtle">
          <span aria-hidden className="relative block h-12 w-px overflow-hidden bg-line">
            <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-accent-soft" />
          </span>
          Scroll to explore
        </Reveal>
        <Reveal immediate delay={1.4} className="hidden text-label font-medium uppercase text-subtle sm:block">
          Knowledge · Perspective · Purpose
        </Reveal>
      </Container>
    </section>
  );
}
