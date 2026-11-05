import { Reveal } from "@/components/animations/Reveal";
import { SplitHeadline } from "@/components/animations/SplitHeadline";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils/cn";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode[];
  lead?: string;
  body?: string;
  actions?: React.ReactNode;
  visual?: React.ReactNode;
  className?: string;
};

/** Editorial hero used by every inner page. */
export function PageHero({ eyebrow, title, lead, body, actions, visual, className }: PageHeroProps) {
  return (
    <section className={cn("grain relative isolate overflow-hidden pt-36 pb-section-tight lg:pt-44", className)}>
      <div aria-hidden className="arch-grid absolute inset-0 -z-10" />
      <div aria-hidden className="radial-light absolute inset-0 -z-10" />
      <Container className={cn("grid items-end gap-14", visual && "lg:grid-cols-12")}>
        <div className={cn(visual ? "lg:col-span-7" : "max-w-4xl")}>
          <Reveal immediate delay={0.1}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeadline
            as="h1"
            trigger="mount"
            delay={0.2}
            lines={title}
            className="mt-8 font-heading text-h1 font-semibold text-fg"
          />
          {(lead || body) && (
            <Reveal immediate delay={0.55} className="mt-8 max-w-2xl space-y-4">
              {lead && (
                <Text size="lead" tone="default">
                  {lead}
                </Text>
              )}
              {body && <Text>{body}</Text>}
            </Reveal>
          )}
          {actions && (
            <Reveal immediate delay={0.7} className="mt-10 flex flex-wrap items-center gap-4">
              {actions}
            </Reveal>
          )}
        </div>
        {visual && (
          <Reveal immediate delay={0.45} className="lg:col-span-5">
            {visual}
          </Reveal>
        )}
      </Container>
      <div aria-hidden className="hairline absolute inset-x-0 bottom-0" />
    </section>
  );
}
