"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { durations, ease, enterStyle } from "@/config/motion";
import { headerCta, primaryNav } from "@/content/navigation";
import { site } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/visuals/LogoMark";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navigatedPath, setNavigatedPath] = useState(pathname);

  // Close the menu when the route changes (adjusting state during render).
  if (navigatedPath !== pathname) {
    setNavigatedPath(pathname);
    setMenuOpen(false);
    setHidden(false);
  }

  // Scroll state (not a scrubbed animation): solid background after 24px,
  // hide while reading downwards, reveal on any upward scroll. (No scroll
  // events fire while the mobile menu is open: <html> is overflow:hidden.)
  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        setScrolled(y > 24);
        if (self.direction === 1 && y > 480) setHidden(true);
        else if (self.direction === -1) setHidden(false);
      },
    });
  });

  return (
    <>
      <motion.header
        className={cn(
          "animate-enter tone-dark fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-(--rc-motion-medium) ease-premium",
          scrolled || menuOpen
            ? "bg-navy/88 shadow-[0_18px_40px_-24px_rgb(0_0_0/0.7)] backdrop-blur-xl"
            : "bg-linear-to-b from-navy/75 via-navy/30 to-transparent",
        )}
        style={{ viewTransitionName: "site-header", ...enterStyle(0, -16) }}
        animate={{ y: hidden ? "-100%" : 0 }}
        transition={{ duration: durations.medium, ease: ease.premium }}
      >
        {/* Utility bar — collapses once the visitor starts scrolling. */}
        <div
          className={cn(
            "hidden overflow-hidden border-b border-gold/15 transition-[height,opacity] duration-(--rc-motion-medium) ease-premium lg:block",
            scrolled || menuOpen ? "h-0 opacity-0" : "h-9 opacity-100",
          )}
        >
          <Container className="flex h-9 items-center justify-between font-ui text-[0.6875rem] font-semibold tracking-[0.18em] text-muted uppercase">
            <span className="flex items-center gap-3">
              <span aria-hidden className="size-1 rotate-45 bg-gold" />
              {site.values}
            </span>
            <span className="flex items-center gap-6">
              <span>Educational content only · Not financial advice</span>
              <span aria-hidden className="h-3 w-px bg-line-strong" />
              <span className="tracking-[0.08em] normal-case select-all">{site.email}</span>
            </span>
          </Container>
        </div>

        <Container className="flex h-18 items-center justify-between gap-6 lg:h-22">
          <Link href="/" aria-label={`${site.name} — home`} className="shrink-0 rounded-full">
            <Wordmark eager size={52} emblemClassName="size-11 lg:size-13" />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {primaryNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group/nav relative block px-3.5 py-2.5 font-ui text-[0.875rem] font-semibold transition-colors duration-(--rc-motion-fast)",
                        active ? "text-gold-soft" : "text-fg/80 hover:text-fg",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className="absolute inset-x-3.5 bottom-0.5 h-px origin-center scale-x-0 bg-gold/60 transition-transform duration-(--rc-motion-medium) ease-premium group-hover/nav:scale-x-100"
                      />
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3.5 bottom-0.5 h-px bg-linear-to-r from-gold-deep via-gold-soft to-gold-deep"
                          transition={{ duration: durations.medium, ease: ease.premium }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink href={headerCta.href} size="sm" className="hidden sm:inline-flex" icon="arrow">
              {headerCta.label}
            </ButtonLink>
            <ButtonLink
              href={headerCta.href}
              size="sm"
              className="hidden px-4 min-[380px]:inline-flex sm:hidden"
              icon="none"
              aria-label={headerCta.label}
            >
              Partner
            </ButtonLink>
            <MenuButton open={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />
          </div>
        </Container>
        <div
          aria-hidden
          className={cn(
            "gold-rule transition-opacity duration-(--rc-motion-medium)",
            scrolled || menuOpen ? "opacity-70" : "opacity-0",
          )}
        />
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </>
  );
}

function MenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? "Close menu" : "Open menu"}
      id="mobile-menu-button"
      className="relative grid size-11 place-items-center rounded-button border border-gold/40 text-fg transition-colors hover:border-gold hover:bg-gold/10 xl:hidden"
    >
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      <span aria-hidden className="relative block h-3 w-5">
        <span
          className={cn(
            "absolute left-0 block h-px w-5 bg-current transition-transform duration-(--rc-motion-medium) ease-premium",
            open ? "top-1.5 rotate-45" : "top-0",
          )}
        />
        <span
          className={cn(
            "absolute left-0 block h-px w-5 bg-current transition-transform duration-(--rc-motion-medium) ease-premium",
            open ? "top-1.5 -rotate-45" : "top-3",
          )}
        />
      </span>
    </button>
  );
}

function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock scroll while open; React owns the attribute (see Next.js Activity guidance).
  useLayoutEffect(() => {
    document.documentElement.dataset.menuOpen = open ? "true" : "false";
    return () => {
      document.documentElement.dataset.menuOpen = "false";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const button = document.getElementById("mobile-menu-button");
    panel?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      // Trap focus within the menu panel plus its toggle button.
      const focusables = [button, ...panel.querySelectorAll<HTMLElement>("a, button")].filter(Boolean) as HTMLElement[];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      button?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          data-lenis-prevent
          className="tone-dark bg-navy-luxe fixed inset-0 z-40 overflow-y-auto overscroll-contain pt-24 xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: durations.medium, ease: ease.premium }}
        >
          <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-50" />
          <div aria-hidden className="gold-glow pointer-events-none absolute -right-40 -bottom-40 size-[32rem]" />
          <Container className="relative flex min-h-full flex-col pb-10">
            <motion.ul
              className="flex flex-col border-t border-line"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
            >
              {[{ label: "Home", href: "/" }, ...primaryNav].map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <motion.li
                    key={item.href}
                    className="border-b border-line"
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { duration: durations.medium, ease: ease.premium } },
                    }}
                  >
                    <Link
                      href={item.href}
                      onNavigate={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-baseline gap-5 py-4 font-heading text-h3 font-semibold transition-colors",
                        active ? "text-gold-soft" : "text-fg/85 hover:text-fg",
                      )}
                    >
                      <span className="w-6 font-ui text-small font-semibold tabular-nums text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
            <motion.div
              className="mt-10 flex flex-col gap-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: durations.medium, ease: ease.premium }}
            >
              <ButtonLink href={headerCta.href} size="lg" onNavigate={onClose} className="w-full sm:w-auto">
                {headerCta.label}
              </ButtonLink>
              <div className="flex flex-col gap-1 border-t border-line pt-6">
                <p className="font-ui text-label font-semibold uppercase text-accent-soft">{site.values}</p>
                <p className="text-small text-muted select-all">{site.email}</p>
              </div>
            </motion.div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
