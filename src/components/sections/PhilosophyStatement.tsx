"use client";

import { useRef } from "react";
import { scrollMotion } from "@/config/motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils/cn";

/**
 * Large editorial statement whose lines brighten as they scroll into the
 * reading zone — pacing the reader through one idea at a time.
 */
export function PhilosophyStatement({ lines, className }: { lines: string[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(scrollMotion.allowed, () => {
        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((line) => {
          gsap.fromTo(
            line,
            { opacity: scrollMotion.dim.display },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: { trigger: line, start: "top 92%", end: "top 48%", scrub: scrollMotion.scrub },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={cn("font-heading text-display font-semibold", className)}>
      {lines.map((line, i) => (
        <span
          key={line}
          data-line
          className={cn("block", i % 2 === 1 ? "font-display font-medium italic tracking-normal text-gilt" : "text-fg")}
        >
          {line}
        </span>
      ))}
    </p>
  );
}
