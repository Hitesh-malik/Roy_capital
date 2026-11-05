"use client";

import { useSearchParams } from "next/navigation";
import { useId, useRef, useState } from "react";
import { Briefcase, MessageSquare } from "lucide-react";
import { contactPage, subjectSlugs, type GeneralSubject } from "@/content/contact";
import { cn } from "@/lib/utils/cn";
import { GeneralEnquiryForm } from "./GeneralEnquiryForm";
import { PartnershipForm } from "./PartnershipForm";

type Pathway = "general" | "partnership";

const tabs: { key: Pathway; icon: typeof Briefcase }[] = [
  { key: "general", icon: MessageSquare },
  { key: "partnership", icon: Briefcase },
];

/** Two enquiry pathways presented as accessible tabs. */
export function ContactPathways({ initial = "general", subject }: { initial?: Pathway; subject?: GeneralSubject }) {
  const [active, setActive] = useState<Pathway>(initial);
  const baseId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActive(tabs[next].key);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Enquiry type" className="grid gap-3 sm:grid-cols-2">
        {tabs.map(({ key, icon: Icon }, i) => {
          const selected = active === key;
          const p = contactPage.pathways[key];
          return (
            <button
              key={key}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`${baseId}-tab-${key}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(key)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "group flex items-start gap-4 rounded-card border p-5 text-left transition-[border-color,background-color] duration-(--rc-motion-medium) ease-premium",
                selected ? "border-accent/60 bg-accent/[0.07]" : "border-line hover:border-line-strong hover:bg-surface/30",
              )}
            >
              <span
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-full border transition-colors",
                  selected ? "border-accent bg-accent text-on-accent" : "border-line-strong text-muted",
                )}
              >
                <Icon aria-hidden className="size-4" strokeWidth={1.75} />
              </span>
              <span>
                <span className="block font-heading text-h4 font-semibold text-fg">{p.label}</span>
                <span className="mt-1 block text-small text-muted">{p.description}</span>
              </span>
            </button>
          );
        })}
      </div>

      {tabs.map(({ key }) => (
        <div
          key={key}
          id={`${baseId}-panel-${key}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${key}`}
          hidden={active !== key}
          className="mt-10"
        >
          {key === "general" ? <GeneralEnquiryForm defaultSubject={subject} /> : <PartnershipForm />}
        </div>
      ))}
    </div>
  );
}

/** Reads `?type=partnership` and `?subject=<slug>` to preselect the pathway. */
export function ContactPathwaysFromParams() {
  const params = useSearchParams();
  const slug = params.get("subject") ?? "";
  const subject = subjectSlugs[slug];
  const initial: Pathway = params.get("type") === "partnership" ? "partnership" : "general";
  return <ContactPathways key={`${initial}-${slug}`} initial={initial} subject={subject} />;
}
