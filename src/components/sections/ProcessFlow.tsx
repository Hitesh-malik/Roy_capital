"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Stagger, StaggerItem } from "@/components/animations/Reveal";

type Step = { number: string; title: string; body: string };

/** Four-step horizontal flow (vertical on mobile) with a scroll-drawn connector. */
export function ProcessFlow({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const style = reduced ? undefined : { scaleX: progress };
  const styleY = reduced ? undefined : { scaleY: progress };

  return (
    <div ref={ref} className="relative">
      {/* desktop connector */}
      <span aria-hidden className="absolute top-[1.375rem] right-[12.5%] left-[12.5%] hidden h-px bg-line lg:block" />
      <motion.span
        aria-hidden
        style={style}
        className="absolute top-[1.375rem] right-[12.5%] left-[12.5%] hidden h-px origin-left bg-linear-to-r from-accent to-accent-soft lg:block"
      />
      {/* mobile connector */}
      <span aria-hidden className="absolute top-2 bottom-2 left-[1.375rem] w-px bg-line lg:hidden" />
      <motion.span
        aria-hidden
        style={styleY}
        className="absolute top-2 bottom-2 left-[1.375rem] w-px origin-top bg-linear-to-b from-accent to-accent-soft lg:hidden"
      />

      <Stagger as="ol" className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
        {steps.map((s) => (
          <StaggerItem as="li" key={s.number} className="grid grid-cols-[2.75rem_1fr] gap-5 lg:grid-cols-1 lg:text-center">
            <span className="relative z-10 grid size-11 place-items-center rounded-full border border-accent/60 bg-bg font-heading text-small font-semibold tabular-nums text-accent-soft shadow-glow lg:mx-auto">
              {s.number}
            </span>
            <div className="lg:mt-4">
              <h3 className="font-heading text-h4 font-semibold text-fg">{s.title}</h3>
              <p className="mt-2 text-muted lg:mx-auto lg:max-w-[16rem]">{s.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
