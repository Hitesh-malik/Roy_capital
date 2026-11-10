import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography";

export type LegalSection = { heading: string; body: string[] };

/** Legal / policy page: navy title band, then a calm white reading surface. */
export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <article>
      <header className="tone-dark relative isolate overflow-hidden bg-navy-luxe pt-36 pb-20 text-fg lg:pt-48">
        <div aria-hidden className="dot-grid absolute inset-0 -z-10 opacity-40" />
        <Container className="max-w-3xl">
          <Reveal immediate>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Heading as="h1" size="h1" className="mt-8">
              {title}
            </Heading>
            <Text size="small" tone="subtle" className="mt-4 font-ui font-semibold tracking-[0.08em] uppercase">
              Last updated {updated}
            </Text>
          </Reveal>
        </Container>
        <div aria-hidden className="gold-rule absolute inset-x-0 bottom-0 opacity-60" />
      </header>

      <div className="tone-paper bg-bg pb-section text-fg">
        <Container className="max-w-3xl">
          <Reveal immediate delay={0.2} className="-mt-10 rounded-card border border-line bg-surface p-7 shadow-lift sm:p-9">
            <span aria-hidden className="mb-5 block h-[3px] w-14 bg-linear-to-r from-gold-deep to-gold-soft" />
            <Text size="lead" tone="default">
              {intro}
            </Text>
          </Reveal>
          <div className="mt-14 space-y-12">
            {sections.map((s, i) => (
              <section key={s.heading} className="grid gap-4 sm:grid-cols-[3rem_1fr]">
                <span className="font-display text-h3 leading-none font-semibold text-gold-deep italic tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <Heading as="h2" size="h3">
                    {s.heading}
                  </Heading>
                  <div className="mt-4 space-y-4">
                    {s.body.map((p) => (
                      <Text key={p}>{p}</Text>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </Container>
      </div>
    </article>
  );
}
