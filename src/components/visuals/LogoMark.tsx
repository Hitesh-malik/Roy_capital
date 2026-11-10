import Image from "next/image";
import { site } from "@/config/site";
import { cn } from "@/lib/utils/cn";

/**
 * The official Roy Capital emblem (extracted losslessly from the client-supplied
 * logo artwork in public/media/logo_image.jpeg — see public/brand/). Always
 * rendered square and uncropped so its proportions and colours are preserved.
 */
export const EMBLEM_SRC = "/brand/roy-capital-emblem.png";
export const EMBLEM_SIZE = 412;

type EmblemProps = {
  /** Rendered size in px (also the `sizes` hint). Pass `responsive` to size it with classes instead. */
  size: number;
  responsive?: boolean;
  className?: string;
  /** Decorative by default (when a parent link already names the brand). */
  alt?: string;
  /** Above-the-fold usage: load immediately instead of lazily. */
  loading?: "eager" | "lazy";
};

export function Emblem({ size, responsive, className, alt = "", loading }: EmblemProps) {
  return (
    <Image
      src={EMBLEM_SRC}
      alt={alt}
      width={EMBLEM_SIZE}
      height={EMBLEM_SIZE}
      sizes={`${size}px`}
      loading={loading}
      className={cn("aspect-square shrink-0 rounded-full", className)}
      style={responsive ? undefined : { width: size, height: size }}
    />
  );
}

/** Emblem only — kept for existing call sites. */
export function LogoMark({ className, size = 40 }: { className?: string; size?: number }) {
  return <Emblem size={size} className={className} />;
}

/** Emblem + serif wordmark lock-up for the header and footer. */
export function Wordmark({
  className,
  size = 46,
  emblemClassName,
  eager,
}: {
  className?: string;
  size?: number;
  /** Size classes for a responsive emblem (e.g. "size-11 lg:size-13"). */
  emblemClassName?: string;
  eager?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3 sm:gap-3.5", className)}>
      <Emblem size={size} responsive={!!emblemClassName} loading={eager ? "eager" : undefined} className={cn("ring-emblem", emblemClassName)} />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[1.3rem] font-semibold tracking-[0.01em] whitespace-nowrap text-fg sm:text-[1.5rem]">
          {site.name}
        </span>
        <span aria-hidden className="mt-1.5 h-px w-full bg-linear-to-r from-gold via-gold/60 to-transparent" />
      </span>
    </span>
  );
}
