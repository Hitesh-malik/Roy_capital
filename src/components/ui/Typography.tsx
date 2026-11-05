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

/** Editorial serif italic accent for words inside a heading. */
export function Em({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("font-display font-normal italic tracking-normal text-accent-soft", className)}
      {...props}
    />
  );
}

type EyebrowProps = React.HTMLAttributes<HTMLParagraphElement> & { index?: string };

export function Eyebrow({ index, className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn("flex items-center gap-3 font-body text-label font-medium uppercase text-accent-soft", className)}
      {...props}
    >
      {index && <span className="text-subtle tabular-nums">{index}</span>}
      <span aria-hidden className="h-px w-8 bg-accent/60" />
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
  return <span className={cn("text-label font-medium uppercase text-subtle", className)} {...props} />;
}
