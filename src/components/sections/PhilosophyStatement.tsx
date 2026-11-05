"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils/cn";

function Line({ children, italic }: { children: React.ReactNode; italic?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "start 45%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.18, 1]);
  return (
    <motion.span
      ref={ref}
      style={reduced ? undefined : { opacity }}
      className={cn("block", italic ? "font-display font-normal italic tracking-normal text-accent-soft" : "text-fg")}
    >
      {children}
    </motion.span>
  );
}

/** Large editorial statement whose lines light up as they scroll into focus. */
export function PhilosophyStatement({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <p className={cn("font-heading text-display font-semibold", className)}>
      {lines.map((line, i) => (
        <Line key={line} italic={i % 2 === 1}>
          {line}
        </Line>
      ))}
    </p>
  );
}
