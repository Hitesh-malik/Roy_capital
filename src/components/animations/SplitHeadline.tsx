"use client";

import { motion } from "motion/react";
import { presets, viewport } from "@/config/motion";
import { cn } from "@/lib/utils/cn";

type SplitHeadlineProps = {
  id?: string;
  as?: "h1" | "h2" | "h3" | "p";
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  /** "mount" for above-the-fold headlines, "inView" for the rest. */
  trigger?: "mount" | "inView";
  delay?: number;
  stagger?: number;
};

/**
 * Masked line-by-line headline reveal. Lines are animated as whole units
 * (never per letter) so text stays crisp and readable.
 */
export function SplitHeadline({
  id,
  as = "h2",
  lines,
  className,
  lineClassName,
  trigger = "inView",
  delay = 0,
  stagger = 0.1,
}: SplitHeadlineProps) {
  const Comp = motion[as] as typeof motion.h2;
  return (
    <Comp
      id={id}
      className={className}
      initial="hidden"
      {...(trigger === "mount" ? { animate: "visible" } : { whileInView: "visible", viewport })}
      variants={presets.staggerReveal(stagger, delay)}
    >
      {lines.map((line, i) => (
        <span key={i} className={cn("-mb-[0.12em] block overflow-hidden pb-[0.12em]", lineClassName)}>
          <motion.span data-reveal className="block will-change-transform" variants={presets.lineReveal}>
            {line}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}
