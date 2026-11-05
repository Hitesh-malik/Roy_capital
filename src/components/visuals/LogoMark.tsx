import { cn } from "@/lib/utils/cn";

/** Monogram: a core within an orbit — echoes the Intelligence Core. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-7", className)} fill="none">
      <circle cx="16" cy="16" r="14.5" className="stroke-line-strong" strokeWidth="1" />
      <ellipse cx="16" cy="16" rx="14.5" ry="5.5" transform="rotate(-28 16 16)" className="stroke-accent-soft" strokeWidth="1.1" />
      <path d="M16 9.5 21.6 12.75v6.5L16 22.5l-5.6-3.25v-6.5Z" className="fill-accent stroke-accent-soft" strokeWidth="0.6" />
      <path d="M16 9.5v13M10.4 12.75 21.6 19.25M21.6 12.75 10.4 19.25" className="stroke-on-accent/50" strokeWidth="0.6" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark />
      <span className="font-heading text-[0.9375rem] font-bold tracking-[0.28em] text-fg">ROY CAPITAL</span>
    </span>
  );
}
