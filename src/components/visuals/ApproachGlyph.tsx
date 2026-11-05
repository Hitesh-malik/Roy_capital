"use client";

import { AnimatePresence, motion } from "motion/react";
import { durations, ease } from "@/config/motion";
import { cn } from "@/lib/utils/cn";

/**
 * Point → line → plane → volume: a geometric progression from simple
 * concepts to connected understanding (Understand → Explore → Apply → Grow).
 */
const glyphs = [
  // Understand — a single point of focus
  <g key="point">
    <circle cx="200" cy="200" r="70" className="stroke-line" strokeDasharray="2 6" />
    <circle cx="200" cy="200" r="34" className="stroke-accent-soft/40" />
    <circle cx="200" cy="200" r="9" className="fill-accent" />
  </g>,
  // Explore — lines branching outward
  <g key="line">
    {[[90, 120], [320, 110], [300, 300], [110, 290], [200, 70]].map(([x, y], i) => (
      <g key={i}>
        <line x1="200" y1="200" x2={x} y2={y} className="stroke-accent-soft/50" />
        <circle cx={x} cy={y} r="5" className={i % 2 ? "fill-fg/80" : "fill-accent-soft"} />
      </g>
    ))}
    <circle cx="200" cy="200" r="9" className="fill-accent" />
  </g>,
  // Apply — a connected plane
  <g key="plane">
    <polygon points="200,90 330,165 200,240 70,165" className="fill-accent/10 stroke-accent-soft/70" />
    {[1, 2, 3].map((k) => (
      <g key={k} className="stroke-line-strong">
        <line x1={70 + 32.5 * k} y1={165 + 18.75 * k} x2={200 + 32.5 * k} y2={90 + 18.75 * k} />
        <line x1={70 + 32.5 * k} y1={165 - 18.75 * k} x2={200 + 32.5 * k} y2={240 - 18.75 * k} />
      </g>
    ))}
    <circle cx="200" cy="165" r="7" className="fill-accent" />
    <line x1="200" y1="240" x2="200" y2="320" className="stroke-line" strokeDasharray="2 6" />
  </g>,
  // Grow — a volume
  <g key="volume">
    <polygon points="200,70 320,140 200,210 80,140" className="fill-accent/20 stroke-accent-soft" />
    <polygon points="80,140 200,210 200,340 80,270" className="fill-surface/80 stroke-line-strong" />
    <polygon points="320,140 200,210 200,340 320,270" className="fill-arch/80 stroke-line-strong" />
    <line x1="200" y1="210" x2="200" y2="340" className="stroke-accent-soft/60" />
    <circle cx="200" cy="70" r="6" className="fill-contrast" />
  </g>,
];

export function ApproachGlyph({ stage, className }: { stage: number; className?: string }) {
  return (
    <div className={cn("relative aspect-square w-full", className)}>
      <div aria-hidden className="arch-grid absolute inset-0 opacity-50" />
      <div aria-hidden className="radial-light absolute inset-0" />
      <svg viewBox="0 0 400 400" aria-hidden className="absolute inset-0 h-full w-full" fill="none">
        <AnimatePresence mode="wait">
          <motion.g
            key={stage}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: durations.medium, ease: ease.premium }}
            style={{ transformOrigin: "200px 200px" }}
          >
            {glyphs[Math.max(0, Math.min(glyphs.length - 1, stage))]}
          </motion.g>
        </AnimatePresence>
      </svg>
    </div>
  );
}
