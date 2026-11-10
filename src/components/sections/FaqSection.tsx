import type { FAQ } from "@/content/faqs";
import { Accordion } from "@/components/ui/Accordion";
import { Section, type SectionTone } from "@/components/ui/Section";
import { SectionIntro } from "./SectionIntro";

export function FaqSection({
  id = "faqs",
  eyebrow = "FAQs",
  title = "Frequently Asked Questions",
  lead = "Clear answers to common questions about Roy Capital.",
  items,
  tone = "base",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  items: FAQ[];
  tone?: SectionTone;
}) {
  if (items.length === 0) return null;
  return (
    <Section id={id} tone={tone} aria-labelledby={`${id}-title`}>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div id={`${id}-title`}>
            <SectionIntro eyebrow={eyebrow} title={[title]} body={lead} />
          </div>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={items} />
        </div>
      </div>
    </Section>
  );
}
