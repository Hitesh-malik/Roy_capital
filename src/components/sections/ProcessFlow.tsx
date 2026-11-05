"use client";

import { useRef } from "react";
import { useStepSequence } from "@/lib/hooks/useStepSequence";
import { Reveal } from "@/components/animations/Reveal";

type Step = { number: string; title: string; body: string };

/**
 * Four-step flow — horizontal on desktop, vertical on mobile. The connector
 * draws with scroll and each step activates as the line reaches it.
 */
export function ProcessFlow({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useStepSequence(ref, { axis: "responsive", start: "top 75%", end: "bottom 50%" });

  return (
    <div ref={ref} className="relative">
      {/* desktop connector: badge centre to badge centre */}
      <span aria-hidden className="absolute top-[1.375rem] right-[12.5%] left-[12.5%] hidden h-px bg-line lg:block" />
      <span
        aria-hidden
        data-seq-line="x"
        className="absolute top-[1.375rem] right-[12.5%] left-[12.5%] hidden h-px origin-left bg-linear-to-r from-accent to-accent-soft lg:block"
      />
      {/* mobile connector */}
      <span aria-hidden className="absolute top-5 bottom-5 left-[1.375rem] w-px bg-line lg:hidden" />
      <span
        aria-hidden
        data-seq-line="y"
        className="absolute top-5 bottom-5 left-[1.375rem] w-px origin-top bg-linear-to-b from-accent to-accent-soft lg:hidden"
      />

      <Reveal as="ol" className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
        {steps.map((s) => (
          <li key={s.number} data-seq-step className="group/step grid grid-cols-[2.75rem_1fr] gap-5 lg:grid-cols-1 lg:text-center">
            <span
              data-seq-marker
              className="relative z-10 grid size-11 place-items-center rounded-full border border-accent bg-accent font-heading text-small font-semibold tabular-nums text-on-accent shadow-glow transition-[background-color,border-color,color,box-shadow,transform] duration-(--rc-motion-medium) ease-premium group-data-[active=false]/step:scale-90 group-data-[active=false]/step:border-line-strong group-data-[active=false]/step:bg-bg group-data-[active=false]/step:text-subtle group-data-[active=false]/step:shadow-none lg:mx-auto"
            >
              {s.number}
            </span>
            <div className="transition-opacity duration-(--rc-motion-slow) ease-premium group-data-[active=false]/step:opacity-45 lg:mt-4">
              <h3 className="font-heading text-h4 font-semibold text-fg">{s.title}</h3>
              <p className="mt-2 text-muted lg:mx-auto lg:max-w-[16rem]">{s.body}</p>
            </div>
          </li>
        ))}
      </Reveal>
    </div>
  );
}
