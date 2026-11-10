import { cn } from "@/lib/utils/cn";

type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4";

const headingSize: Record<HeadingSize, string> = {
  display: "text-display font-semibold",
  h1: "text-h1 font-semibold",
  h2: "text-h2 font-semibold",
  h3: "text-h3 font-semibold",
  h4: "text-h4 font-semibold",
};

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  size?: HeadingSize;
};

export function Heading({ as: Tag = "h2", size = "h2", className, ...props }: HeadingProps) {
  return <Tag className={cn("font-heading text-fg", headingSize[size], className)} {...props} />;
}

/** Serif italic accent for words inside a heading — metallic gold on dark, bronze on light. */
export function Em({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("font-display font-medium italic tracking-normal text-gilt", className)} {...props} />;
}

type EyebrowProps = React.HTMLAttributes<HTMLParagraphElement> & { index?: string };

export function Eyebrow({ index, className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn("flex items-center gap-3 font-ui text-label font-semibold uppercase text-accent-soft", className)}
      {...props}
    >
      {index && <span className="text-subtle tabular-nums">{index}</span>}
      <span aria-hidden className="h-px w-10 bg-linear-to-r from-gold to-gold/0" />
      <span>{children}</span>
    </p>
  );
}

type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  size?: "lead" | "body" | "small";
  tone?: "default" | "muted" | "subtle";
};

export function Text({ size = "body", tone = "muted", className, ...props }: TextProps) {
  return (
    <p
      className={cn(
        size === "lead" && "text-lead",
        size === "body" && "text-body",
        size === "small" && "text-small",
        tone === "default" && "text-fg",
        tone === "muted" && "text-muted",
        tone === "subtle" && "text-subtle",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("font-ui text-label font-semibold uppercase text-subtle", className)} {...props} />;
}

/** Gold-framed icon tile used on cards. Pair with `group` on the card for hover states. */
export function IconBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid size-12 shrink-0 place-items-center rounded-card border border-accent-soft/35 bg-accent-soft/[0.07] text-accent-soft transition-[background-color,border-color,color] duration-(--rc-motion-medium) ease-premium group-hover:border-accent-soft/70 group-hover:bg-accent-soft/[0.14] [&_svg]:size-5",
        className,
      )}
    >
      {children}
    </span>
  );
}
