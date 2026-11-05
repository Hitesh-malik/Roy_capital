import { useId } from "react";
import { cn } from "@/lib/utils/cn";

const C = 300;
const hex = (r: number, offset = -90) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = ((offset + i * 60) * Math.PI) / 180;
    return [C + r * Math.cos(a), C + r * Math.sin(a)] as const;
  });

const outer = hex(96);
const facetFills = ["fill-arch", "fill-surface", "fill-bg-2", "fill-arch", "fill-surface", "fill-bg-2"];

/**
 * Static SVG rendering of the Intelligence Core. Used before WebGL loads,
 * when WebGL is unavailable, and for reduced-motion visitors.
 */
export function CoreFallback({ className, animated = true }: { className?: string; animated?: boolean }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const glow = `cf-glow-${uid}`;
  const ring = `cf-ring-${uid}`;
  return (
    <svg viewBox="0 0 600 600" aria-hidden className={cn("h-full w-full", className)} fill="none">
      <defs>
        <radialGradient id={glow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--rc-color-accent)" stopOpacity="0.22" />
          <stop offset="60%" stopColor="var(--rc-color-accent)" stopOpacity="0.04" />
          <stop offset="100%" stopColor="var(--rc-color-accent)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={ring} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--rc-color-text)" stopOpacity="0.85" />
          <stop offset="50%" stopColor="var(--rc-color-accent-soft)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--rc-color-text)" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      <circle cx={C} cy={C} r="290" fill={`url(#${glow})`} />

      <g className={cn(animated && "animate-spin-slower")} style={{ transformOrigin: `${C}px ${C}px` }}>
        <ellipse cx={C} cy={C} rx="275" ry="96" transform={`rotate(-18 ${C} ${C})`} className="stroke-accent/30" strokeDasharray="2 7" />
        <ellipse cx={C} cy={C} rx="250" ry="250" className="stroke-line" strokeDasharray="1 9" />
      </g>

      <g className={cn(animated && "animate-spin-slow")} style={{ transformOrigin: `${C}px ${C}px` }}>
        <ellipse cx={C} cy={C} rx="228" ry="70" transform={`rotate(-24 ${C} ${C})`} stroke={`url(#${ring})`} strokeWidth="2.2" />
        <ellipse cx={C} cy={C} rx="190" ry="118" transform={`rotate(38 ${C} ${C})`} stroke={`url(#${ring})`} strokeWidth="1.6" />
        <ellipse cx={C} cy={C} rx="158" ry="150" transform={`rotate(8 ${C} ${C})`} stroke={`url(#${ring})`} strokeWidth="1.2" />
        <circle cx={C + 208} cy={C - 92} r="4" className="fill-fg" />
        <circle cx={C - 150} cy={C + 116} r="3" className="fill-accent-soft" />
        <circle cx={C + 40} cy={C + 152} r="2.5" className="fill-fg/80" />
      </g>

      {/* Lattice shell */}
      <polygon points={hex(138, -60).map((p) => p.join(",")).join(" ")} className="stroke-accent-soft/25" />
      <polygon points={hex(138).map((p) => p.join(",")).join(" ")} className="stroke-accent-soft/15" />

      {/* Faceted core */}
      {outer.map((p, i) => {
        const n = outer[(i + 1) % 6];
        return (
          <polygon
            key={i}
            points={`${C},${C} ${p[0]},${p[1]} ${n[0]},${n[1]}`}
            className={cn(facetFills[i], "stroke-accent-soft/40")}
            strokeWidth="0.8"
          />
        );
      })}
      <polygon
        points={[outer[0], outer[2], outer[4]].map((p) => p.join(",")).join(" ")}
        className="stroke-fg/25"
        strokeWidth="0.8"
      />
      <circle cx={C} cy={C} r="3" className="fill-accent-soft" />
    </svg>
  );
}
