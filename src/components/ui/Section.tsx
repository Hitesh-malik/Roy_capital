import { cn } from "@/lib/utils/cn";
import { Container } from "./Container";

/**
 * Section tones (see `tones` in config/theme.ts):
 * - base / raised / navy — the deep-navy family (the emblem's field)
 * - royal — royal-blue statement band
 * - ivory / paper — light content sections
 */
export type SectionTone = "base" | "raised" | "navy" | "royal" | "ivory" | "paper";

export const toneClasses: Record<SectionTone, string> = {
  base: "tone-dark bg-bg text-fg",
  raised: "tone-dark bg-bg-2 text-fg",
  navy: "tone-dark bg-navy-luxe text-fg",
  royal: "tone-royal bg-royal-luxe text-fg",
  ivory: "tone-ivory bg-ivory-luxe text-fg",
  paper: "tone-paper bg-bg text-fg",
};

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  tone?: SectionTone;
  spacing?: "default" | "tight" | "none";
  contained?: boolean;
  containerClassName?: string;
};

export function Section({
  tone = "base",
  spacing = "default",
  contained = true,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative isolate",
        toneClasses[tone],
        spacing === "default" && "py-section",
        spacing === "tight" && "py-section-tight",
        className,
      )}
      {...props}
    >
      {contained ? <Container className={cn("relative", containerClassName)}>{children}</Container> : children}
    </section>
  );
}
