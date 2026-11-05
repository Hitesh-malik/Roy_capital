"use client";

import { useRef, useState } from "react";
import { approachSteps } from "@/content/approach";
import { scrollMotion } from "@/config/motion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils/cn";
import { ApproachGlyph } from "@/components/visuals/ApproachGlyph";

/**
 * Four-stage learning journey. Desktop: a sticky geometric glyph evolves
 * (point → line → plane → volume) as each stage crosses the centre of the
 * viewport, with a progress rail scrubbed to scroll. Mobile and reduced
 * motion: a plain stacked list, fully readable without animation.
 */
export function ApproachJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ desktop: scrollMotion.desktop, motion: scrollMotion.allowed }, (ctx) => {
        const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean };
        if (!desktop) return;
        const steps = gsap.utils.toArray<HTMLElement>("[data-stage]");
        const bars = gsap.utils.toArray<HTMLElement>("[data-stage-bar]");
        steps.forEach((step, i) => {
          // Stage switching is content, so it runs for everyone on desktop…
          ScrollTrigger.create({
            trigger: step,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => self.isActive && setActive(i),
          });
          // …while scrubbed movement only runs when motion is allowed.
          if (!motion) return;
          gsap.fromTo(
            bars[i],
            { scaleX: 0 },
            { scaleX: 1, ease: "none", scrollTrigger: { trigger: step, start: "top 55%", end: "bottom 55%", scrub: true } },
          );
          gsap.fromTo(
            step,
            { opacity: 0.3 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: { trigger: step, start: "top 85%", end: "top 55%", scrub: scrollMotion.scrub },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="grid gap-12 lg:grid-cols-12">
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <div className="relative overflow-hidden rounded-media border border-line bg-bg-2">
            <ApproachGlyph stage={active} />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6" aria-live="polite">
              <span className="text-label font-medium uppercase text-subtle">Stage {active + 1} / 4</span>
              <span className="font-heading text-h4 font-semibold text-fg">{approachSteps[active].title}</span>
            </div>
          </div>
          <div className="mt-5 flex gap-2" aria-hidden>
            {approachSteps.map((s, i) => (
              <span key={s.title} className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-line">
                <span
                  data-stage-bar
                  className={cn("absolute inset-0 origin-left bg-accent", i > active && "scale-x-0")}
                />
              </span>
            ))}
          </div>
        </div>
      </div>

      <ol className="lg:col-span-6 lg:col-start-7">
        {approachSteps.map((step, i) => (
          <li
            key={step.title}
            data-stage
            className="flex flex-col justify-center border-b border-line py-12 first:pt-0 last:border-b-0 lg:min-h-[70vh] lg:py-0"
          >
            <div className="lg:hidden">
              <ApproachGlyph stage={i} className="mb-8 max-w-56 rounded-card border border-line" />
            </div>
            <span
              className={cn(
                "font-heading text-display font-semibold tabular-nums transition-colors duration-(--rc-motion-slow)",
                active === i ? "text-accent-soft" : "text-line-strong",
              )}
            >
              {step.number}
            </span>
            <h3 className="mt-4 font-heading text-h1 font-semibold text-fg">{step.title}</h3>
            <p className="mt-5 max-w-lg text-lead text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
