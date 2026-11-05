"use client";

import { motion } from "motion/react";
import { useEffect } from "react";
import { presets } from "@/config/motion";

let initialLoad = true;

/** Quick fade + rise between routes; moves focus to <main> after navigation. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (initialLoad) {
      initialLoad = false;
      return;
    }
    document.getElementById("main")?.focus({ preventScroll: true });
  }, []);

  return (
    <motion.div initial={presets.sectionTransition.initial} animate={presets.sectionTransition.animate}>
      {children}
    </motion.div>
  );
}
