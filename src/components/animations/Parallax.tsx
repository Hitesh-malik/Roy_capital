"use client";

import { useRef } from "react";
import { parallax, scrollMotion } from "@/config/motion";
import { gsap, useGSAP } from "@/lib/gsap";

/** Moves its children slightly against the scroll direction (GSAP-scrubbed). */
export function Parallax({
  children,
  className,
  speed = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  /** Multiplier of the global parallax range; negative reverses direction. */
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(scrollMotion.allowed, () => {
      gsap.fromTo(
        ref.current,
        { y: parallax.range * speed },
        {
          y: -parallax.range * speed,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
    return () => mm.revert();
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
