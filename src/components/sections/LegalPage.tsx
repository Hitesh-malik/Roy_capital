import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography";

export type LegalSection = { heading: string; body: string[] };

export function LegalPage({ eyebrow, title, updated, intro, sections }: { eyebrow: string; title: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <article className="relative pt-36 pb-section lg:pt-44">
      <div aria-hidden className="arch-grid absolute inset-x-0 top-0 -z-10 h-96" />
      <Container className="max-w-3xl">
        <Reveal immediate>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading as="h1" size="h1" className="mt-8">
            {title}
          </Heading>
          <Text size="small" tone="subtle" className="mt-4">
            Last updated {updated}
          </Text>
          <Text size="lead" className="mt-8">
            {intro}
          </Text>
        </Reveal>
        <div className="mt-14 space-y-12 border-t border-line pt-12">
          {sections.map((s) => (
            <section key={s.heading}>
              <Heading as="h2" size="h4">
                {s.heading}
              </Heading>
              <div className="mt-4 space-y-4">
                {s.body.map((p) => (
                  <Text key={p}>{p}</Text>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}
