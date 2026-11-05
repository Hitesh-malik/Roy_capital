import { homePage } from "@/content/home";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeadline } from "@/components/animations/SplitHeadline";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Text } from "@/components/ui/Typography";
import { CoreFallback } from "@/components/visuals/CoreFallback";

type Cta = { label: string; href: string };

type ClosingCtaProps = {
  eyebrow?: string;
  title?: React.ReactNode[];
  body?: string;
  primary?: Cta;
  secondary?: Cta;
};

const d = homePage.closing;

/** Closing partnership invitation shared across pages. */
export function ClosingCta({
  eyebrow = d.eyebrow,
  title = [d.title],
  body = d.body,
  primary = d.primary,
  secondary = d.secondary,
}: ClosingCtaProps) {
  return (
    <Section>
      <div className="relative isolate overflow-hidden rounded-[calc(var(--rc-radius-media)*1.6)] border border-line bg-linear-to-br from-surface via-bg-2 to-bg px-6 py-20 sm:px-12 md:px-16 md:py-28">
        <div aria-hidden className="arch-grid absolute inset-0 -z-10 opacity-60" />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 -right-40 -z-10 size-[42rem] -translate-y-1/2 opacity-50 md:-right-24"
        >
          <CoreFallback />
        </div>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeadline as="h2" lines={title} className="mt-6 font-heading text-h1 font-semibold text-fg" />
          <Reveal delay={0.15}>
            <Text size="lead" className="mt-6">
              {body}
            </Text>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={primary.href} size="lg" magnetic>
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} size="lg" variant="secondary">
                {secondary.label}
              </ButtonLink>
            )}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
