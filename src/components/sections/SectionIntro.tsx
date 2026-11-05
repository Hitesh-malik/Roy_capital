import { Reveal } from "@/components/animations/Reveal";
import { SplitHeadline } from "@/components/animations/SplitHeadline";
import { Eyebrow, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils/cn";

type SectionIntroProps = {
  eyebrow?: string;
  index?: string;
  title: React.ReactNode[];
  body?: React.ReactNode;
  align?: "left" | "center";
  size?: "h1" | "h2";
  as?: "h2" | "h3";
  className?: string;
};

export function SectionIntro({ eyebrow, index, title, body, align = "left", size = "h2", as = "h2", className }: SectionIntroProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal>
          <Eyebrow index={index} className={cn(align === "center" && "justify-center")}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <SplitHeadline
        as={as}
        lines={title}
        className={cn("font-heading font-semibold text-fg", eyebrow && "mt-6", size === "h1" ? "text-h1" : "text-h2")}
      />
      {body && (
        <Reveal delay={0.15} className="mt-6">
          {typeof body === "string" ? <Text size="lead">{body}</Text> : body}
        </Reveal>
      )}
    </div>
  );
}
