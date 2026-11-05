import type { ProgramMotif } from "@/content/programs";
import { cn } from "@/lib/utils/cn";

const t = "transition-transform duration-(--rc-motion-slow) ease-premium";

/** Stacked foundations — Financial Education. */
function Planes() {
  const ys = [250, 205, 160, 115];
  return (
    <>
      {ys.map((y, i) => (
        <g key={y} style={{ ["--lift" as string]: `${-i * 9}px` }}>
          <polygon
            points={`200,${y - 52} 322,${y} 200,${y + 52} 78,${y}`}
            className={cn(
              "group-hover:[transform:translateY(var(--lift))]",
              t,
              i === ys.length - 1 ? "fill-accent/15 stroke-accent-soft" : "fill-surface/70 stroke-line-strong",
            )}
            strokeWidth="1"
          />
        </g>
      ))}
      <line x1="200" y1="63" x2="200" y2="302" className="stroke-accent-soft/30" strokeDasharray="2 6" />
      <circle cx="200" cy="63" r="3.5" className="fill-accent-soft" />
    </>
  );
}

/** Orbits around a core — Investment Awareness (markets, diversification). */
function Orbits() {
  return (
    <>
      <g className={cn("origin-center group-hover:rotate-[14deg]", t)} style={{ transformBox: "fill-box" }}>
        <ellipse cx="200" cy="200" rx="150" ry="58" transform="rotate(-20 200 200)" className="stroke-line-strong" />
        <ellipse cx="200" cy="200" rx="120" ry="92" transform="rotate(30 200 200)" className="stroke-line-strong" />
        <ellipse cx="200" cy="200" rx="88" ry="88" className="stroke-accent-soft/50" strokeDasharray="2 6" />
        <circle cx="337" cy="150" r="5" className="fill-accent" />
        <circle cx="96" cy="262" r="4" className="fill-fg/80" />
        <circle cx="250" cy="300" r="3.5" className="fill-accent-soft" />
      </g>
      <circle cx="200" cy="200" r="34" className="fill-arch stroke-accent-soft/60" />
      <circle cx="200" cy="200" r="12" className="fill-accent/70" />
    </>
  );
}

/** Ascending columns — Entrepreneurship (building, growth). */
function Columns() {
  const bars = [70, 110, 150, 195, 245];
  return (
    <>
      <line x1="60" y1="320" x2="340" y2="320" className="stroke-line-strong" />
      {bars.map((h, i) => {
        const x = 70 + i * 56;
        return (
          <g key={h} className={cn("origin-bottom group-hover:scale-y-[1.08]", t)} style={{ transformBox: "fill-box", transitionDelay: `${i * 40}ms` }}>
            <rect
              x={x}
              y={320 - h}
              width="36"
              height={h}
              className={i === bars.length - 1 ? "fill-accent/20 stroke-accent-soft" : "fill-surface/80 stroke-line-strong"}
            />
            <line x1={x} y1={320 - h} x2={x + 36} y2={320 - h} className={i === bars.length - 1 ? "stroke-accent-soft" : "stroke-fg/30"} strokeWidth="1.5" />
          </g>
        );
      })}
      <polyline points="88,236 144,196 200,160 256,116 312,62" className="stroke-accent-soft/70" strokeDasharray="3 5" />
      <circle cx="312" cy="62" r="4" className="fill-accent-soft" />
    </>
  );
}

const motifs: Record<ProgramMotif, () => React.ReactElement> = { planes: Planes, orbits: Orbits, columns: Columns };

/** Architectural motif panel standing in for photography. */
export function GeometricPanel({ motif, className, label }: { motif: ProgramMotif; className?: string; label?: string }) {
  const Motif = motifs[motif];
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-media border border-line bg-linear-to-b from-surface/60 to-bg-2",
        className,
      )}
    >
      <div aria-hidden className="arch-grid absolute inset-0 opacity-60" />
      <div aria-hidden className="radial-light absolute inset-0" />
      <svg viewBox="0 0 400 400" aria-hidden className="relative h-full w-full" fill="none">
        <Motif />
      </svg>
      {label && (
        <span className="absolute bottom-5 left-5 text-label font-medium uppercase text-subtle">{label}</span>
      )}
    </div>
  );
}
