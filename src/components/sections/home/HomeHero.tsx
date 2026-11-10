"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { scrollMotion } from "@/config/motion";
import { site } from "@/config/site";
import { homePage } from "@/content/home";
import { programs } from "@/content/programs";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeadline } from "@/components/animations/SplitHeadline";
import { HeroScene } from "@/components/three/HeroScene";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Em, Eyebrow, Text } from "@/components/ui/Typography";
import { Emblem } from "@/components/visuals/LogoMark";
import { ProgramIcon } from "@/components/visuals/ProgramIcon";

const h = homePage.hero;

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  /** 0 → 1 as the hero scrolls out; read every frame by the 3D scene. */
  const progress = useRef(0);

  useGSAP(
    () => {
      const trigger = { trigger: ref.current, start: "top top", end: "bottom top" };
      // Progress is always tracked (the 3D scene is off for reduced motion anyway).
      ScrollTrigger.create({ ...trigger, onUpdate: (self) => (progress.current = self.progress) });

      const mm = gsap.matchMedia();
      mm.add(scrollMotion.allowed, () => {
        gsap
          .timeline({ defaults: { ease: "none" }, scrollTrigger: { ...trigger, scrub: true } })
          .to("[data-hero-copy]", { y: scrollMotion.heroExit.y, duration: 1 }, 0)
          .to("[data-hero-copy]", { opacity: 0, duration: scrollMotion.heroExit.fadeEnd }, 0)
          .to("[data-hero-bg]", { scale: 1.12, duration: 1 }, 0)
          .to("[data-hero-meta]", { opacity: 0, duration: 0.25 }, 0);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="hero-title" className="tone-dark relative isolate overflow-hidden bg-navy text-fg">
      {/* Brand photography: the executive library and dusk skyline from the Roy Capital artwork. */}
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        <div data-hero-bg className="absolute inset-0 origin-center">
          <Image
            src="/brand/office-dusk.jpg"
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-[100%_50%] opacity-80"
          />
        </div>
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-navy via-navy/80 to-navy/5" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-navy/60 via-transparent to-bg" />
      <div aria-hidden className="dot-grid absolute inset-0 -z-10 opacity-40" />

      <Container className="relative grid min-h-svh items-center gap-14 pt-32 pb-32 lg:grid-cols-12 lg:gap-8 lg:pt-40">
        <div data-hero-copy className="relative z-10 lg:col-span-7">
          <Reveal immediate delay={0.05}>
            <Eyebrow className="flex-wrap">{h.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeadline
            id="hero-title"
            as="h1"
            trigger="mount"
            delay={0.15}
            stagger={0.12}
            lines={[h.lines[0], <Em key="em">{h.lines[1]}</Em>]}
            className="mt-6 font-heading text-[clamp(2.75rem,1.4rem+3.9vw,5.25rem)] leading-[1.02] font-semibold tracking-[-0.015em] text-fg"
          />
          <Reveal immediate delay={0.45} className="mt-6 max-w-xl">
            <Text size="lead" className="text-fg/80">
              {h.body}
            </Text>
          </Reveal>
          <Reveal immediate delay={0.6} className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href={h.primary.href} size="lg" magnetic>
              {h.primary.label}
            </ButtonLink>
            <ButtonLink href={h.secondary.href} size="lg" variant="secondary">
              {h.secondary.label}
            </ButtonLink>
          </Reveal>

          {/* The three learning areas, linked. */}
          <Reveal immediate delay={0.8} className="mt-14 max-w-2xl">
            <ul className="grid gap-px overflow-hidden rounded-card border border-gold/20 bg-gold/15 sm:grid-cols-3">
              {programs.map((p) => (
                <li key={p.slug} className="bg-navy/80 backdrop-blur-md">
                  <Link
                    href={`/programs#${p.slug}`}
                    className="group flex items-center gap-3 px-4 py-4 transition-colors duration-(--rc-motion-medium) hover:bg-gold/10"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/40 text-gold-soft transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
                      <ProgramIcon slug={p.slug} className="size-4" />
                    </span>
                    <span className="font-ui text-[0.8125rem] leading-tight font-semibold text-fg/90 group-hover:text-fg">
                      {p.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Emblem inside the gold armillary (WebGL rings with a static SVG fallback). */}
        <div className="relative mx-auto aspect-square w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none">
          <div aria-hidden className="gold-glow absolute -inset-[12%]" />
          <HeroScene progress={progress} className="absolute inset-0" delay={0.75} />
          <span
            aria-hidden
            className="animate-spin-slow absolute top-1/2 left-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold/30"
          />
          <div className="absolute top-1/2 left-1/2 w-[54%] -translate-x-1/2 -translate-y-1/2">
            <Reveal immediate delay={0.35}>
              <div className="animate-float">
              <Emblem
                size={420}
                responsive
                loading="eager"
                alt={`${site.name} emblem`}
                className="h-auto w-full shadow-[0_0_0_1px_var(--rc-brand-gold),0_0_80px_-10px_color-mix(in_oklab,var(--rc-brand-gold)_55%,transparent),0_40px_80px_-30px_rgb(0_0_0/0.8)]"
              />
              </div>
            </Reveal>
          </div>
          <Reveal immediate delay={1.1} className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
            {h.labels.map((label, i) => (
              <span
                key={label}
                className="absolute flex items-center gap-2 font-ui text-label font-semibold uppercase text-fg/70"
                style={[{ top: "6%", right: "6%" }, { top: "50%", right: "-9%" }, { bottom: "6%", right: "14%" }][i]}
              >
                <span className="text-gold tabular-nums">0{i + 1}</span>
                <span aria-hidden className="h-px w-6 bg-gold/50" />
                {label}
              </span>
            ))}
          </Reveal>
        </div>
      </Container>

      <Container data-hero-meta className="pointer-events-none absolute inset-x-0 bottom-8 flex items-end justify-between">
        <Reveal immediate delay={1.2} className="flex items-center gap-4 font-ui text-label font-semibold uppercase text-fg/60">
          <span aria-hidden className="relative block h-12 w-px overflow-hidden bg-gold/20">
            <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-gold" />
          </span>
          Scroll to explore
        </Reveal>
        <Reveal immediate delay={1.2} className="hidden font-ui text-label font-semibold uppercase text-fg/60 sm:block">
          {site.values}
        </Reveal>
      </Container>
      <div aria-hidden className="gold-rule absolute inset-x-0 bottom-0 opacity-50" />
    </section>
  );
}
