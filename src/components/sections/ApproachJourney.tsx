"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { approachSteps } from "@/content/approach";
import { cn } from "@/lib/utils/cn";
import { ApproachGlyph } from "@/components/visuals/ApproachGlyph";

/**
 * Four-stage learning journey. Desktop: a sticky geometric glyph evolves as
 * each stage reaches the centre of the viewport. Mobile: a plain stacked list
 * (the content is fully readable without any animation).
 */
export function ApproachJourney() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <div className="relative overflow-hidden rounded-media border border-line bg-bg-2">
            <ApproachGlyph stage={active} />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6">
              <span className="text-label font-medium uppercase text-subtle">Stage {active + 1} / 4</span>
              <span className="font-heading text-h4 font-semibold text-fg">{approachSteps[active].title}</span>
            </div>
          </div>
          <div className="mt-5 flex gap-2" aria-hidden>
            {approachSteps.map((s, i) => (
              <span
                key={s.title}
                className={cn(
                  "h-0.5 flex-1 rounded-full transition-colors duration-(--rc-motion-medium)",
                  i <= active ? "bg-accent" : "bg-line",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <ol className="lg:col-span-6 lg:col-start-7">
        {approachSteps.map((step, i) => (
          <motion.li
            key={step.title}
            onViewportEnter={() => setActive(i)}
            viewport={{ amount: 0.6, margin: "-25% 0px -25% 0px" }}
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
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
