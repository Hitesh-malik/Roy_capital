import { homePage } from "@/content/home";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { SplitHeadline } from "@/components/animations/SplitHeadline";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Em, Eyebrow, Text } from "@/components/ui/Typography";
import { PartnershipGeometry } from "@/components/visuals/PartnershipGeometry";

const d = homePage.sponsorship;

/** Corporate partnership invitation — the homepage's key conversion section. */
export function SponsorshipInvite() {
  return (
    <Section aria-labelledby="partner-title" className="overflow-hidden">
      <div className="grid items-center gap-16 lg:grid-cols-12">
        <div className="relative order-2 lg:order-1 lg:col-span-6">
          <div aria-hidden className="radial-light absolute -inset-20" />
          <PartnershipGeometry className="relative mx-auto max-w-xl" />
        </div>

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
            <p className="mt-10 text-label font-medium uppercase text-subtle">Open to conversations around</p>
          </Reveal>
          <Stagger as="ul" className="mt-4 grid border-t border-line sm:grid-cols-2">
            {d.points.map((point, i) => (
              <StaggerItem
                as="li"
                key={point}
                className="flex items-center gap-4 border-b border-line py-4 text-fg sm:odd:border-r sm:odd:pr-6 sm:even:pl-6"
              >
                <span className="text-small tabular-nums text-accent-soft">0{i + 1}</span>
                {point}
              </StaggerItem>
            ))}
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
