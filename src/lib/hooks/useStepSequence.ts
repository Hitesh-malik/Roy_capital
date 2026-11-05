"use client";

import { scrollMotion } from "@/config/motion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Axis = "x" | "y";

/**
 * Scroll-scrubbed step sequence: a connector line draws with scroll and each
 * step lights up the moment the line reaches its marker.
 *
 * Markup contract inside `scope`:
 * - `[data-seq-line="x" | "y"]`  the connector to scale (origin at its start)
 * - `[data-seq-step]`             each step; receives `data-active="true|false"`
 * - `[data-seq-marker]`           optional point inside a step the line must reach
 *
 * Static / reduced-motion state = everything active and the line fully drawn,
 * so style the *inactive* look via `data-[active=false]`.
 */
export function useStepSequence(
  scope: React.RefObject<HTMLElement | null>,
  { start, end, axis }: { start: string; end: string; axis: Axis | "responsive" },
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: scrollMotion.allowed, desktop: scrollMotion.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        const root = scope.current;
        if (!motion || !root) return;

        const dir: Axis = axis === "responsive" ? (desktop ? "x" : "y") : axis;
        const line = root.querySelector<HTMLElement>(`[data-seq-line="${dir}"]`);
        const steps = gsap.utils.toArray<HTMLElement>("[data-seq-step]", root);
        if (!line || steps.length === 0) return;

        let thresholds: number[] = [];
        // Offsets (not bounding rects) so the line's own scale transform doesn't skew measurement.
        // The line must be absolutely positioned inside `scope` (its offsetParent).
        const measure = () => {
          const r = root.getBoundingClientRect();
          const from = dir === "x" ? line.offsetLeft : line.offsetTop;
          const length = (dir === "x" ? line.offsetWidth : line.offsetHeight) || 1;
          thresholds = steps.map((step) => {
            const m = (step.querySelector("[data-seq-marker]") ?? step).getBoundingClientRect();
            const center = dir === "x" ? m.left - r.left + m.width / 2 : m.top - r.top + m.height / 2;
            return gsap.utils.clamp(0, 1, (center - from) / length);
          });
        };
        const paint = (progress: number) =>
          steps.forEach((s, i) => (s.dataset.active = String(progress >= (thresholds[i] ?? 0) - 0.015)));

        const scale = dir === "x" ? "scaleX" : "scaleY";
        const tween = gsap.fromTo(
          line,
          { [scale]: 0 },
          {
            [scale]: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start,
              end,
              scrub: true,
              onRefresh: (self) => {
                measure();
                paint(self.progress);
              },
              onUpdate: (self) => paint(self.progress),
            },
          },
        );
        measure();
        paint((tween.scrollTrigger as ScrollTrigger).progress);

        return () => steps.forEach((s) => delete s.dataset.active);
      });
      return () => mm.revert();
    },
    { scope },
  );
}
