"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { parallax } from "@/config/motion";

/** Moves its children slightly against the scroll direction. */
export function Parallax({
  children,
  className,
  speed = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  /** Multiplier of the global parallax range; negative reverses direction. */
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [parallax.range * speed, -parallax.range * speed]);
  return (
    <motion.div ref={ref} className={className} style={reduced ? undefined : { y }}>
      {children}
    </motion.div>
  );
}
