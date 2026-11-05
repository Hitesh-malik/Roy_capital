"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { enterStyle, presets, viewport } from "@/config/motion";
import { cn } from "@/lib/utils/cn";

type Tag = "div" | "section" | "article" | "li" | "ul" | "ol" | "p" | "span" | "figure" | "header";

type RevealProps = React.HTMLAttributes<HTMLElement> & {
  as?: Tag;
  delay?: number;
  distance?: number;
  /** Above-the-fold: animate on first paint (CSS) instead of when scrolled into view. */
  immediate?: boolean;
};

/** Fade + rise into view. Reduced motion → opacity only (via MotionConfig). */
export function Reveal({ as = "div", delay = 0, distance, immediate, children, className, style, ...props }: RevealProps) {
  if (immediate) {
    // Above the fold: CSS keyframes start at first paint (no hydration wait → faster LCP).
    const Tag = as as React.ElementType;
    return (
      <Tag className={cn("animate-enter", className)} style={{ ...enterStyle(delay, distance), ...style }} {...props}>
        {children}
      </Tag>
    );
  }
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      data-reveal
      variants={presets.slideReveal(distance, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
      style={style as React.ComponentProps<typeof motion.div>["style"]}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </Comp>
  );
}

type StaggerProps = React.HTMLAttributes<HTMLElement> & {
  as?: Tag;
  stagger?: number;
  delay?: number;
  immediate?: boolean;
  amount?: number;
};

/** Container that staggers its `StaggerItem` children. */
export function Stagger({ as = "div", stagger, delay = 0, immediate, amount, children, ...props }: StaggerProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      variants={presets.staggerReveal(stagger, delay)}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: amount !== undefined ? { ...viewport, amount } : viewport })}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  as = "div",
  distance,
  variants,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: Tag; distance?: number; variants?: Variants }) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp data-reveal variants={variants ?? presets.slideReveal(distance)} {...(props as React.ComponentProps<typeof motion.div>)}>
      {children}
    </Comp>
  );
}

/** Clipped media reveal for visuals. */
export function ClipReveal({ className, children, delay = 0 }: { className?: string; children: React.ReactNode; delay?: number }) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.div
      data-reveal
      className={className}
      variants={presets.imageReveal(reduced, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
}
