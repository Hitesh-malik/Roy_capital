"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef } from "react";
import { magnetic, transitions } from "@/config/motion";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { cn } from "@/lib/utils/cn";

/**
 * Subtle pointer attraction for selected desktop CTAs.
 * Disabled for touch / coarse pointers and reduced-motion users.
 */
export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const enabled = finePointer && !reduced && magnetic.max > 0;
  const x = useSpring(useMotionValue(0), transitions.magnetic);
  const y = useSpring(useMotionValue(0), transitions.magnetic);

  const onMove = (e: React.PointerEvent) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const clamp = (v: number) => Math.max(-magnetic.max, Math.min(magnetic.max, v));
    x.set(clamp((e.clientX - (r.left + r.width / 2)) * magnetic.strength));
    y.set(clamp((e.clientY - (r.top + r.height / 2)) * magnetic.strength));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={cn("inline-flex", className)}
      style={enabled ? { x, y } : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
