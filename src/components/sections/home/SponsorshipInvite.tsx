import { Handshake, Megaphone, Newspaper, Sprout } from "lucide-react";
import { site } from "@/config/site";
import { homePage } from "@/content/home";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { SplitHeadline } from "@/components/animations/SplitHeadline";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Em, Eyebrow, Text } from "@/components/ui/Typography";
import { PartnershipGeometry } from "@/components/visuals/PartnershipGeometry";

const d = homePage.sponsorship;
const pointIcons = [Handshake, Megaphone, Newspaper, Sprout];

/** Corporate partnership invitation — the homepage's key conversion section. */
export function SponsorshipInvite() {
  return (
    <Section tone="paper" aria-labelledby="partner-title" className="overflow-hidden">
      <div className="grid items-center gap-16 lg:grid-cols-12">
        {/* Navy artwork panel */}
        <Reveal className="order-2 lg:order-1 lg:col-span-6">
          <div className="tone-dark frame-gold relative isolate overflow-hidden rounded-media bg-navy-luxe p-6 shadow-lift sm:p-10">
            <div aria-hidden className="dot-grid absolute inset-0 -z-10 opacity-50" />
            <div aria-hidden className="gold-glow absolute top-1/2 left-1/2 -z-10 size-[80%] -translate-x-1/2 -translate-y-1/2" />
            <div className="flex items-center justify-between font-ui text-label font-semibold uppercase">
              <span className="text-gold-soft">{site.name}</span>
              <span className="text-fg/60">Partnerships</span>
            </div>
            <PartnershipGeometry className="relative mx-auto my-4 max-w-md" />
            <div className="flex items-center justify-between gap-4 border-t border-gold/20 pt-5">
              <p className="font-display text-h4 font-medium text-fg italic">Built on shared purpose.</p>
              <span aria-hidden className="h-px w-16 bg-linear-to-r from-gold to-gold/0" />
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2 lg:col-span-6">
          <Reveal>
            <Eyebrow index="03">{d.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeadline
            id="partner-title"
            lines={["Let's Build", <Em key="em">Meaningful Partnerships.</Em>]}
            className="mt-8 font-heading text-h1 font-semibold text-fg"
          />
          <Reveal delay={0.1}>
            <Text size="lead" className="mt-6">
              {d.body}
            </Text>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-10 font-ui text-label font-semibold uppercase text-subtle">Open to conversations around</p>
          </Reveal>
          <Stagger as="ul" className="mt-4 grid gap-3 sm:grid-cols-2">
            {d.points.map((point, i) => {
              const Icon = pointIcons[i] ?? Handshake;
              return (
                <StaggerItem
                  as="li"
                  key={point}
                  className="group flex items-center gap-4 rounded-card border border-line bg-bg-2 px-4 py-4 font-ui text-[0.9375rem] font-semibold text-fg transition-[border-color,background-color,box-shadow] duration-(--rc-motion-medium) ease-premium hover:border-gold/50 hover:bg-surface hover:shadow-card"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-royal text-gold-soft transition-colors group-hover:bg-navy">
                    <Icon aria-hidden className="size-4" strokeWidth={1.75} />
                  </span>
                  {point}
                </StaggerItem>
              );
            })}
          </Stagger>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={d.primary.href} size="lg" magnetic>
              {d.primary.label}
            </ButtonLink>
            <ButtonLink href={d.secondary.href} size="lg" variant="ghost">
              {d.secondary.label}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
