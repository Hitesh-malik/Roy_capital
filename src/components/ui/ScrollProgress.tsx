"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { scrollMotion } from "@/config/motion";

/** Thin reading-progress line for long editorial pages. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: scrollMotion.scrub / 2 } },
    );
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent/40 via-accent to-accent-soft"
    />
  );
}
