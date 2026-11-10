import Image from "next/image";
import { Quote } from "lucide-react";
import { communityVideo, impactPage as d } from "@/content/impact";
import { pageMetadata } from "@/lib/seo";
import { ClipReveal, Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { SplitHeadline } from "@/components/animations/SplitHeadline";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { CommunityVideo } from "@/components/sections/CommunityVideo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Section } from "@/components/ui/Section";
import { Em, Eyebrow, Text } from "@/components/ui/Typography";

export const metadata = pageMetadata({
  title: "Our Impact",
  description:
    "Beyond business, into the community. See Roy Capital's community film and the areas of focus behind its philanthropic commitment.",
  path: "/impact",
});

export default function ImpactPage() {
  return (
    <>
      <ScrollProgress />
      <PageHero
        crumb="Impact"
        eyebrow={d.hero.eyebrow}
        title={["Beyond Business.", <Em key="em">Into the Community.</Em>]}
        lead={d.hero.lead}
        body={d.hero.body}
        photoPosition="88% 50%"
      />

      <Section tone="navy" aria-labelledby="film-title" className="overflow-hidden">
        <div aria-hidden className="gold-glow pointer-events-none absolute top-1/2 right-[-8%] -z-10 size-[42rem] -translate-y-1/2 opacity-70" />
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow index="01">{communityVideo.eyebrow}</Eyebrow>
            </Reveal>
            <SplitHeadline
              id="film-title"
              lines={["Giving Back.", <Em key="em">Making a Difference.</Em>]}
              className="mt-6 font-heading text-h1 font-semibold text-fg"
            />
            <Reveal delay={0.1}>
              <Text size="lead" className="mt-6 max-w-lg">
                {d.moments.body}
              </Text>
            </Reveal>
            <Reveal delay={0.15} className="mt-10 flex gap-5 rounded-card border border-gold/25 bg-surface/40 p-6">
              <Quote aria-hidden className="size-8 shrink-0 text-gold" strokeWidth={1.25} />
              <p className="font-display text-h3 font-medium text-fg italic">{d.moments.title}</p>
            </Reveal>
          </div>
          <ClipReveal className="lg:col-span-5 lg:col-start-8">
            <CommunityVideo />
          </ClipReveal>
        </div>
      </Section>

      <Section tone="ivory" aria-labelledby="together-title">
        <div className="grid gap-14 lg:grid-cols-12">
          <div id="together-title" className="lg:col-span-5">
            <SectionIntro eyebrow={d.together.eyebrow} index="02" title={[d.together.title]} body={d.together.body} />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="font-ui text-label font-semibold uppercase text-subtle">{d.together.focusLabel}</p>
            </Reveal>
            <Stagger as="ul" className="mt-5 space-y-3">
              {d.together.focus.map((item, i) => (
                <StaggerItem
                  as="li"
                  key={item}
                  className="group flex items-center gap-6 rounded-card border border-line bg-surface px-6 py-5 shadow-card transition-[transform,border-color,box-shadow] duration-(--rc-motion-medium) ease-premium hover:translate-x-1 hover:border-gold/50 hover:shadow-lift"
                >
                  <span className="font-display text-h3 leading-none font-semibold text-gold-deep italic tabular-nums">0{i + 1}</span>
                  <span aria-hidden className="h-8 w-px bg-line-strong" />
                  <span className="font-heading text-h3 font-semibold text-fg">{item}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      <Section tone="paper" aria-labelledby="moments-title">
        <div id="moments-title">
          <SectionIntro eyebrow={d.moments.eyebrow} index="03" title={[d.moments.title]} />
        </div>
        {d.gallery.length > 0 ? (
          <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {d.gallery.map((g) => (
              <StaggerItem as="li" key={g.src}>
                <figure className="group overflow-hidden rounded-media border border-line bg-surface shadow-card transition-shadow duration-(--rc-motion-medium) hover:shadow-lift">
                  <div className="overflow-hidden">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      width={800}
                      height={1000}
                      className="aspect-[4/5] object-cover transition-transform duration-(--rc-motion-slower) ease-premium group-hover:scale-105"
                    />
                  </div>
                  {g.caption && <figcaption className="p-4 text-small text-muted">{g.caption}</figcaption>}
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <Reveal className="mt-10 flex max-w-2xl items-start gap-4 rounded-card border border-dashed border-gold-deep/40 bg-bg-2 p-6">
            <span aria-hidden className="mt-2 size-2 shrink-0 rotate-45 bg-gold-deep" />
            <Text>{d.moments.upcoming}</Text>
          </Reveal>
        )}
      </Section>

      <ClosingCta
        eyebrow="Purpose-driven partnerships"
        title={["Support initiatives", <Em key="em">that matter.</Em>]}
        body="Organisations interested in community and educational initiatives are welcome to explore a collaboration with Roy Capital."
        primary={{ label: "Explore Partnerships", href: "/sponsorships" }}
        secondary={{ label: "Contact Roy Capital", href: "/contact" }}
      />
    </>
  );
}
