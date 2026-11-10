import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/config/site";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeadline } from "@/components/animations/SplitHeadline";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils/cn";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode[];
  /** Breadcrumb label for the current page. */
  crumb?: string;
  lead?: string;
  body?: string;
  actions?: React.ReactNode;
  /** Custom visual; defaults to a framed brand photograph. Pass `false` for none. */
  visual?: React.ReactNode | false;
  /** Focal point of the default brand photograph. */
  photoPosition?: string;
  className?: string;
};

/** Framed brand photograph used when a page has no bespoke visual. */
function HeroPhoto({ position = "15% 50%" }: { position?: string }) {
  return (
    <figure className="frame-gold relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-media shadow-lift lg:ml-auto">
      <Image
        src="/brand/office-dusk.jpg"
        alt="A quiet library and city skyline at dusk"
        fill
        sizes="(min-width: 1024px) 26rem, 80vw"
        className="object-cover"
        style={{ objectPosition: position }}
      />
      <span aria-hidden className="absolute inset-0 bg-linear-to-t from-navy via-navy/20 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-6">
        <span aria-hidden className="mb-3 block h-px w-10 bg-gold" />
        <span className="font-ui text-label font-semibold uppercase text-gold-soft">{site.values}</span>
      </figcaption>
    </figure>
  );
}

/** Editorial hero used by every inner page: navy, image-backed, gold-detailed. */
export function PageHero({ eyebrow, title, crumb, lead, body, actions, visual, photoPosition, className }: PageHeroProps) {
  const art = visual === false ? null : (visual ?? <HeroPhoto position={photoPosition} />);
  return (
    <section
      className={cn("tone-dark relative isolate overflow-hidden bg-navy pt-36 pb-section-tight text-fg lg:pt-48", className)}
    >
      <div aria-hidden className="absolute inset-0 -z-20">
        <Image src="/brand/office-dusk.jpg" alt="" fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover object-[70%_50%] opacity-45" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-navy via-navy/90 to-navy/50" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-navy/60 via-transparent to-navy" />
      <div aria-hidden className="dot-grid absolute inset-0 -z-10 opacity-35" />

      <Container className={cn("grid items-center gap-14", art && "lg:grid-cols-12")}>
        <div className={cn(art ? "lg:col-span-7" : "max-w-4xl")}>
          {crumb && (
            <Reveal immediate>
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center gap-2 font-ui text-[0.75rem] font-semibold tracking-[0.08em] text-fg/60 uppercase">
                  <li>
                    <Link href="/" className="transition-colors hover:text-gold-soft">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden>
                    <ChevronRight className="size-3.5 text-gold/70" />
                  </li>
                  <li aria-current="page" className="text-gold-soft">
                    {crumb}
                  </li>
                </ol>
              </nav>
            </Reveal>
          )}
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
                <Text size="lead" tone="default" className="text-fg/90">
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
        {art && (
          <Reveal immediate delay={0.45} className="lg:col-span-5">
            {art}
          </Reveal>
        )}
      </Container>
      <div aria-hidden className="gold-rule absolute inset-x-0 bottom-0 opacity-60" />
    </section>
  );
}
