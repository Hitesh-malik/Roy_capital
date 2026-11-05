"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, type MotionValue } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { durations, ease } from "@/config/motion";
import { useMediaQuery, useWebGLSupport } from "@/lib/hooks/useMediaQuery";
import { cn } from "@/lib/utils/cn";
import { CoreFallback } from "@/components/visuals/CoreFallback";

const IntelligenceCore = dynamic(() => import("./IntelligenceCore"), { ssr: false });

/**
 * Loads the WebGL Intelligence Core lazily over a matching static SVG.
 * - Reduced motion or no WebGL → static fallback only.
 * - Rendering pauses when the hero is off-screen.
 * - Lower geometry/DPR on small or low-core devices.
 */
export function HeroScene({ progress, className, delay = 0.55 }: { progress: MotionValue<number>; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  const webgl = useWebGLSupport();
  const small = useMediaQuery("(max-width: 767px)");
  const [inView, setInView] = useState(true);
  const [ready, setReady] = useState(false);
  // A fresh <canvas> each time the route is re-shown by Activity (its GL context is released on hide).
  const [canvasKey, setCanvasKey] = useState(0);

  useLayoutEffect(
    () => () => {
      setReady(false);
      setCanvasKey((k) => k + 1);
    },
    [],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const lowCores = typeof navigator !== "undefined" && (navigator.hardwareConcurrency ?? 8) <= 4;
  const use3D = webgl === true && reduced === false;

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: durations.slower, ease: ease.premium, delay }}
    >
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-(--rc-motion-slower) ease-premium",
          use3D && ready ? "opacity-0" : "opacity-100",
        )}
      >
        <CoreFallback animated={!reduced} />
      </div>

      {use3D && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-(--rc-motion-slower) ease-premium",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          <IntelligenceCore
            key={canvasKey}
            progress={progress}
            pointer={pointer}
            active={inView}
            quality={small || lowCores ? "low" : "high"}
            onReady={() => setReady(true)}
          />
        </div>
      )}
    </motion.div>
  );
}
