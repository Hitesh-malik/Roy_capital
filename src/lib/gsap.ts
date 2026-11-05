"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Single registration point for GSAP. Import gsap / ScrollTrigger / useGSAP
 * from here so plugins are registered exactly once.
 *
 * Always create ScrollTriggers inside `useGSAP` — it reverts them when a
 * component unmounts or when Next.js hides a route with <Activity>.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };
