"use client";

import { useId, useRef } from "react";
import { scrollMotion } from "@/config/motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils/cn";

/**
 * Two architectural frames that converge as the visitor scrolls — a visual
 * metaphor for partnership. Their shared intersection lights up as they meet.
 * The static (no-JS / reduced-motion) state is the converged composition.
 */
export function PartnershipGeometry({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const glowId = `pg-glow-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(scrollMotion.allowed, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: ref.current, start: "top 85%", end: "center 55%", scrub: scrollMotion.scrub },
        });
        tl.from("[data-frame='left']", { x: -46 }, 0)
          .from("[data-frame='right']", { x: 46 }, 0)
          .from("[data-meet]", { opacity: 0, duration: 0.45 }, 0.55);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

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

        <circle data-meet cx="240" cy="240" r="120" fill={`url(#${glowId})`} />

        <g data-frame="left">
          <rect x="105" y="150" width="180" height="180" transform="rotate(45 195 240)" className="fill-surface/50 stroke-line-strong" strokeWidth="1.2" />
          <rect x="125" y="170" width="140" height="140" transform="rotate(45 195 240)" className="stroke-line" />
          <circle cx="68" cy="240" r="4" className="fill-fg/80" />
        </g>

        <g data-frame="right">
          <rect x="195" y="150" width="180" height="180" transform="rotate(45 285 240)" className="fill-arch/40 stroke-accent-soft/70" strokeWidth="1.2" />
          <rect x="215" y="170" width="140" height="140" transform="rotate(45 285 240)" className="stroke-accent/30" />
          <circle cx="412" cy="240" r="4" className="fill-accent" />
        </g>

        <path data-meet d="M240 177 L283 240 L240 303 L197 240 Z" className="fill-accent/25 stroke-accent-soft" strokeWidth="1.2" />
        <circle data-meet cx="240" cy="240" r="5" className="fill-contrast" />
      </svg>
    </div>
  );
}
