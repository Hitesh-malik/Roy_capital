import { cn } from "@/lib/utils/cn";
import { Container } from "./Container";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  tone?: "base" | "raised";
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
        "relative",
        tone === "raised" && "bg-bg-2",
        spacing === "default" && "py-section",
        spacing === "tight" && "py-section-tight",
        className,
      )}
      {...props}
    >
      {contained ? <Container className={containerClassName}>{children}</Container> : children}
    </section>
  );
}
