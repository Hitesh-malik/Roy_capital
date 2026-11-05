import type { Transition, Variants } from "motion/react";
import { theme } from "./theme";

/**
 * Reusable motion presets. Durations, easing, travel distance and overall
 * intensity all come from `theme.motion`, so animation can be tuned globally.
 *
 * Reduced motion: the root `MotionConfig reducedMotion="user"` strips
 * transforms automatically; presets that animate non-transform properties
 * (clip-path) accept a `reduced` flag and fall back to opacity.
 */

const m = theme.motion;
const k = m.intensity;

export const ease = m.easing;
export const durations = {
  fast: m.durations.fast / 1000,
  medium: m.durations.medium / 1000,
  slow: m.durations.slow / 1000,
  slower: m.durations.slower / 1000,
};

const travel = (px: number) => px * k;

export const transitions = {
  reveal: { duration: durations.slow, ease: ease.premium } satisfies Transition,
  quick: { duration: durations.medium, ease: ease.premium } satisfies Transition,
  spring: { type: "spring", stiffness: 160, damping: 22, mass: 0.6 } satisfies Transition,
  magnetic: { type: "spring", stiffness: 220, damping: 18, mass: 0.4 } satisfies Transition,
};

/** Shared `whileInView` viewport settings. */
export const viewport = { once: true, amount: 0.2, margin: "0px 0px -8% 0px" } as const;

export const presets = {
  fadeReveal: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: transitions.reveal },
  } satisfies Variants,

  slideReveal: (distance = m.distance.md, delay = 0): Variants => ({
    hidden: { opacity: 0, y: travel(distance) },
    visible: { opacity: 1, y: 0, transition: { ...transitions.reveal, delay } },
  }),

  staggerReveal: (stagger = m.stagger, delayChildren = 0): Variants => ({
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  }),

  /** Masked line reveal used by `SplitHeadline`. */
  lineReveal: {
    hidden: { y: "105%" },
    visible: { y: "0%", transition: { duration: durations.slow, ease: ease.premium } },
  } satisfies Variants,

  imageReveal: (reduced: boolean, delay = 0): Variants =>
    reduced
      ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { ...transitions.reveal, delay } } }
      : {
          hidden: { clipPath: "inset(18% 12% 18% 12% round 1.25rem)", opacity: 0.4 },
          visible: {
            clipPath: "inset(0% 0% 0% 0% round 1.25rem)",
            opacity: 1,
            transition: { duration: durations.slower, ease: ease.premium, delay },
          },
        },

  sectionTransition: {
    initial: { opacity: 0, y: travel(m.distance.sm) },
    animate: { opacity: 1, y: 0, transition: { duration: durations.medium, ease: ease.premium } },
  },
};

export const hoverLift = { y: -travel(6), transition: transitions.quick };

/** Magnetic pull: fraction of pointer offset, capped in px. */
export const magnetic = { strength: 0.28 * k, max: 14 * k };

/** Parallax travel range in px for `Parallax`. */
export const parallax = { range: 80 * k };

/** 3D idle motion. */
export const float3D = {
  rotationSpeed: 0.07 * k,
  floatSpeed: 1.1 * k,
  floatIntensity: 0.35 * k,
  pointerTilt: 0.32 * k,
  damping: 0.55,
};
