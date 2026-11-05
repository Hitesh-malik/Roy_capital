"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { enterStyle } from "@/config/motion";
import { useMediaQuery, useWebGLSupport } from "@/lib/hooks/useMediaQuery";
import { cn } from "@/lib/utils/cn";
import { CoreFallback } from "@/components/visuals/CoreFallback";

const IntelligenceCore = dynamic(() => import("./IntelligenceCore"), { ssr: false });

/** Resolve once the main thread is idle (or after `timeout` ms at the latest). */
function onIdle(cb: () => void, timeout = 1800) {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(cb, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(cb, 600);
  return () => clearTimeout(id);
}

/** Resolve on the visitor's first interaction (touch, scroll, key, pointer). */
function onFirstInteraction(cb: () => void) {
  const events = ["pointerdown", "touchstart", "keydown", "wheel", "scroll"] as const;
  const fire = () => {
    events.forEach((e) => window.removeEventListener(e, fire));
    cb();
  };
  events.forEach((e) => window.addEventListener(e, fire, { once: true, passive: true }));
  return () => events.forEach((e) => window.removeEventListener(e, fire));
}

/** Touch-first, low-core, low-memory or data-saver devices. */
function isConstrained() {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    (nav.hardwareConcurrency ?? 8) <= 4 ||
    (nav.deviceMemory ?? 8) <= 4 ||
    nav.connection?.saveData === true
  );
}

/**
 * Loads the WebGL Intelligence Core over a matching static SVG.
 * - The three.js bundle is requested once the browser is idle after
 *   hydration (desktop), or on first interaction on constrained devices —
 *   so it never competes with LCP or first input.
 * - Reduced motion or no WebGL → static fallback only.
 * - Rendering pauses when the hero is off-screen.
 * - Lower geometry / DPR on small or low-core devices.
 */
export function HeroScene({
  progress,
  className,
  delay = 0.55,
}: {
  progress: React.RefObject<number>;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  const webgl = useWebGLSupport();
  const small = useMediaQuery("(max-width: 767px)");
  const [idle, setIdle] = useState(false);
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
    const load = () => setIdle(true);
    return isConstrained() ? onFirstInteraction(() => onIdle(load)) : onIdle(load);
  }, []);

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
  const use3D = idle && webgl === true && reduced === false;

  return (
    <div ref={ref} className={cn("animate-enter relative", className)} style={enterStyle(delay, 0)}>
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-(--rc-motion-slower) ease-premium",
          use3D && ready ? "opacity-0" : "opacity-100",
        )}
      >
        <CoreFallback />
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
    </div>
  );
}
