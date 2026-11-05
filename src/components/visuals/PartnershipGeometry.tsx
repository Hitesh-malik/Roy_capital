"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useId, useRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Two architectural frames that converge as the visitor scrolls — a visual
 * metaphor for partnership. Their intersection lights up when they meet.
 */
export function PartnershipGeometry({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const glowId = `pg-glow-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const left = useTransform(scrollYProgress, [0, 1], [-46, 0]);
  const right = useTransform(scrollYProgress, [0, 1], [46, 0]);
  const glow = useTransform(scrollYProgress, [0.55, 1], [0, 1]);

  return (
    <div ref={ref} className={cn("relative aspect-square w-full", className)}>
      <div aria-hidden className="arch-grid absolute inset-0 opacity-50" />
      <svg viewBox="0 0 480 480" aria-hidden className="absolute inset-0 h-full w-full" fill="none">
        <defs>
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--rc-color-accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--rc-color-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="240" cy="240" r="210" className="stroke-line" strokeDasharray="1 8" />
        <line x1="20" y1="240" x2="460" y2="240" className="stroke-line" />
        <line x1="240" y1="20" x2="240" y2="460" className="stroke-line" />

        <motion.circle cx="240" cy="240" r="120" fill={`url(#${glowId})`} style={reduced ? { opacity: 1 } : { opacity: glow }} />

        <motion.g style={reduced ? undefined : { x: left }}>
          <rect x="105" y="150" width="180" height="180" transform="rotate(45 195 240)" className="fill-surface/50 stroke-line-strong" strokeWidth="1.2" />
          <rect x="125" y="170" width="140" height="140" transform="rotate(45 195 240)" className="stroke-line" />
          <circle cx="68" cy="240" r="4" className="fill-fg/80" />
        </motion.g>

        <motion.g style={reduced ? undefined : { x: right }}>
          <rect x="195" y="150" width="180" height="180" transform="rotate(45 285 240)" className="fill-arch/40 stroke-accent-soft/70" strokeWidth="1.2" />
          <rect x="215" y="170" width="140" height="140" transform="rotate(45 285 240)" className="stroke-accent/30" />
          <circle cx="412" cy="240" r="4" className="fill-accent" />
        </motion.g>

        <motion.path
          d="M240 177 L283 240 L240 303 L197 240 Z"
          className="fill-accent/25 stroke-accent-soft"
          strokeWidth="1.2"
          style={reduced ? { opacity: 1 } : { opacity: glow }}
        />
        <motion.circle cx="240" cy="240" r="5" className="fill-contrast" style={reduced ? { opacity: 1 } : { opacity: glow }} />
      </svg>
    </div>
  );
}
