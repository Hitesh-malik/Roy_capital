import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-button font-heading font-semibold uppercase tracking-[0.12em] transition-[background-color,color,border-color,box-shadow] duration-(--rc-motion-medium) ease-premium focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-soft hover:shadow-glow",
  secondary: "border border-line-strong text-fg hover:border-accent-soft/60 hover:bg-surface",
  ghost: "text-fg hover:text-accent-soft",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.6875rem]",
  md: "h-12 px-7 text-[0.75rem]",
  lg: "min-h-14 px-6 py-3 text-[0.75rem] tracking-[0.08em] sm:px-8 sm:text-[0.8125rem] sm:tracking-[0.12em]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: "arrow" | "external" | "none";
  magnetic?: boolean;
  className?: string;
  children: React.ReactNode;
};

function Inner({ icon = "arrow", children }: Pick<CommonProps, "icon" | "children">) {
  const Icon = icon === "external" ? ArrowUpRight : ArrowRight;
  return (
    <>
      <span className="relative inline-flex items-center gap-2.5">{children}</span>
      {icon !== "none" && (
        <Icon
          aria-hidden
          className="relative size-4 transition-transform duration-(--rc-motion-medium) ease-premium group-hover/btn:translate-x-1"
          strokeWidth={1.75}
        />
      )}
    </>
  );
}

export function buttonClasses({ variant = "primary", size = "md", className }: Pick<CommonProps, "variant" | "size" | "className">) {
  return cn(base, variants[variant], sizes[size], variant === "ghost" && "px-0", className);
}

type ButtonLinkProps = CommonProps & Omit<React.ComponentProps<typeof Link>, "className" | "children">;

type LinkProps = React.ComponentProps<typeof Link>;

/**
 * In-page hash links (`#enquiry`) render as plain anchors so a single owner
 * handles them: Lenis (via SmoothScroll) when active, otherwise the browser.
 * Everything else is a Next.js <Link>.
 */
function SmartLink({ href, children, ...props }: LinkProps) {
  if (typeof href === "string" && href.startsWith("#")) {
    const { prefetch: _p, replace: _r, scroll: _s, onNavigate: _n, transitionTypes: _t, ...anchor } = props;
    void [_p, _r, _s, _n, _t];
    return (
      <a href={href} {...(anchor as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

export function ButtonLink({ variant, size, icon, magnetic, className, children, ...props }: ButtonLinkProps) {
  const link = (
    <SmartLink className={buttonClasses({ variant, size, className })} {...props}>
      <Inner icon={icon}>{children}</Inner>
    </SmartLink>
  );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}

type ButtonProps = CommonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({ variant, size, icon = "none", magnetic, className, children, type = "button", ...props }: ButtonProps) {
  const button = (
    <button type={type} className={buttonClasses({ variant, size, className })} {...props}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
  return magnetic ? <Magnetic>{button}</Magnetic> : button;
}

/** Inline text link with an animated arrow and underline. */
export function ArrowLink({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "className"> & { className?: string }) {
  return (
    <SmartLink
      className={cn(
        "group/link inline-flex items-center gap-2 font-heading text-small font-semibold uppercase tracking-[0.12em] text-fg transition-colors duration-(--rc-motion-medium) hover:text-accent-soft",
        className,
      )}
      {...props}
    >
      <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-(--rc-motion-medium) after:ease-premium group-hover/link:after:scale-x-100">
        {children}
      </span>
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-(--rc-motion-medium) ease-premium group-hover/link:translate-x-1"
        strokeWidth={1.75}
      />
    </SmartLink>
  );
}
