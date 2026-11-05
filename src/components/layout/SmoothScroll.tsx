"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { smoothScroll } from "@/config/motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis wheel smoothing, ticked by GSAP so ScrollTrigger reads the same frame.
 * Only on fine-pointer devices without `prefers-reduced-motion`: touch and
 * reduced-motion users keep fully native scrolling. Keyboard, scrollbar and
 * find-in-page scrolling always remain native.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!smoothScroll.enabled || !finePointer || reduced) return;

    const lenis = new Lenis({
      lerp: smoothScroll.lerp,
      wheelMultiplier: smoothScroll.wheelMultiplier,
      anchors: false, // in-page hash links are handled below
      autoToggle: true, // pauses while <html> is overflow:hidden (mobile menu)
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Same-page hash links: smooth-scroll (honours CSS scroll-margin-top), keep
    // the URL in sync, then move focus to the target for keyboard / AT users.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link ? decodeURIComponent(link.hash.slice(1)) : "";
      const target = id ? document.getElementById(id) : null;
      if (!link || !target) return;
      e.preventDefault();
      history.pushState(history.state, "", link.hash);
      lenis.scrollTo(target, {
        onComplete: () => {
          if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        },
      });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // New route → page height and trigger positions changed.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
