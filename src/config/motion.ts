import type { Transition, Variants } from "motion/react";
import { theme } from "./theme";

/**
 * Reusable motion presets. Durations, easing, travel distance and overall
 * intensity all come from `theme.motion`, so animation can be tuned globally.
 *
 * Ownership — one system per property, never both:
 * - Motion for React: mount / in-view reveals, presence (menus, accordions),
 *   layout animations, hover and spring micro-interactions.
 * - GSAP ScrollTrigger (`scrollMotion` below): anything scrubbed to scroll
 *   position — parallax, line-draws, pinned / sequenced storytelling.
 * - Lenis (`smoothScroll` below): wheel smoothing on fine-pointer devices,
 *   driven by the GSAP ticker so ScrollTrigger stays in sync.
 *
 * Reduced motion: the root `MotionConfig reducedMotion="user"` strips
 * transforms automatically; presets that animate non-transform properties
 * (clip-path) accept a `reduced` flag and fall back to opacity. Scroll
 * sequences only register under `scrollMotion.allowed`, and Lenis is off.
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
      ? {
          // clipPath is reset explicitly: the reduced flag can resolve after the first render.
          hidden: { opacity: 0, clipPath: "inset(0% 0% 0% 0% round 1.25rem)" },
          visible: { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 1.25rem)", transition: { ...transitions.reveal, delay } },
        }
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

/** GSAP ScrollTrigger presets for scroll-scrubbed sequences. */
export const scrollMotion = {
  /** Media query that must match for scrubbed movement to register. */
  allowed: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px)",
  /** Seconds the scrubbed value takes to catch up with the scrollbar. */
  scrub: 0.6,
  /** Equivalent of `ease.premium` for GSAP tweens. */
  ease: "power3.out",
  heroExit: { y: -90 * k, fadeEnd: 0.75 },
  /**
   * Lowest opacity for "not yet reached" text in scroll sequences. Chosen so
   * dimmed text still meets WCAG AA (body 4.5:1, large display text 3:1).
   */
  dim: { text: 0.7, display: 0.5 },
};

/**
 * CSS-driven entrance for above-the-fold content (see `animate-enter` in
 * globals.css). Starts at first paint instead of after hydration, which keeps
 * LCP fast. Below-the-fold reveals use Motion's `whileInView`.
 */
export const enterStyle = (delay = 0, distance: number = m.distance.md) =>
  ({ "--rc-delay": `${delay}s`, "--rc-enter-distance": `${travel(distance)}px` }) as React.CSSProperties;

/** Lenis smooth scrolling. Touch devices and reduced-motion users always keep native scroll. */
export const smoothScroll = {
  enabled: true,
  lerp: 0.11,
  wheelMultiplier: 1,
  // Anchor jumps clear the fixed header via CSS `scroll-margin-top` (globals.css), which Lenis honours.
};
