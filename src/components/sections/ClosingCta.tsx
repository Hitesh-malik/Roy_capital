import Image from "next/image";
import { site } from "@/config/site";
import { homePage } from "@/content/home";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeadline } from "@/components/animations/SplitHeadline";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Text } from "@/components/ui/Typography";
import { CoreFallback } from "@/components/visuals/CoreFallback";
import { Emblem } from "@/components/visuals/LogoMark";

type Cta = { label: string; href: string };

type ClosingCtaProps = {
  eyebrow?: string;
  title?: React.ReactNode[];
  body?: string;
  primary?: Cta;
  secondary?: Cta;
};

const d = homePage.closing;

/** Closing partnership invitation shared across pages: a navy, gold-framed brand panel on ivory. */
export function ClosingCta({
  eyebrow = d.eyebrow,
  title = [d.title],
  body = d.body,
  primary = d.primary,
  secondary = d.secondary,
}: ClosingCtaProps) {
  return (
    <Section tone="ivory">
      <div className="tone-dark frame-gold relative isolate overflow-hidden rounded-[calc(var(--rc-radius-media)*1.5)] bg-navy px-6 py-16 text-fg shadow-lift sm:px-12 md:px-16 md:py-24">
        <Image
          src="/brand/office-dusk.jpg"
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1320px) 1320px, 100vw"
          className="-z-20 object-cover object-[80%_50%] opacity-60"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-navy via-navy/90 to-navy/40" />
        <div aria-hidden className="dot-grid absolute inset-0 -z-10 opacity-40" />

        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <SplitHeadline as="h2" lines={title} className="mt-6 font-heading text-h1 font-semibold text-fg" />
            <Reveal delay={0.15}>
              <Text size="lead" className="mt-6 text-fg/80">
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

          <Reveal delay={0.2} className="relative mx-auto hidden aspect-square w-full max-w-[26rem] lg:col-span-5 lg:block">
            <div aria-hidden className="gold-glow absolute -inset-[15%]" />
            <CoreFallback className="absolute inset-0" />
            <div className="absolute top-1/2 left-1/2 w-[60%] -translate-x-1/2 -translate-y-1/2">
              <Emblem size={260} responsive alt={`${site.name} emblem`} className="ring-emblem h-auto w-full" />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
