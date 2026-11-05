"use client";

import { MotionConfig } from "motion/react";
import { transitions } from "@/config/motion";

/** Global motion defaults. `reducedMotion="user"` strips transforms for reduced-motion users. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={transitions.quick}>
      {children}
    </MotionConfig>
  );
}
