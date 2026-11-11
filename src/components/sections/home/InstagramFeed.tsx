import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import { homePage } from "@/content/home";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { buttonClasses } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { InstagramIcon } from "@/components/visuals/InstagramIcon";
import { SectionIntro } from "../SectionIntro";

const d = homePage.social;

/** Section 08 — highlights from the official Instagram, as text cards linking to each post. */
export function InstagramFeed() {
  return (
    <Section tone="paper" aria-labelledby="instagram-title" className="overflow-hidden">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div id="instagram-title">
          <SectionIntro eyebrow={d.eyebrow} index="08" title={[d.title]} body={d.body} />
        </div>
        <Reveal className="shrink-0">
          <a
            href={site.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "secondary", size: "md" })}
          >
            <InstagramIcon className="size-4" />
            {d.cta.label}
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Reveal>
      </div>

      <Stagger as="ul" className="mt-16 grid gap-5 md:grid-cols-3">
        {d.posts.map((p) => (
          <StaggerItem as="li" key={p.href} className="min-w-0">
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface p-7 shadow-card transition-[border-color,box-shadow,translate] duration-(--rc-motion-medium) ease-premium hover:-translate-y-1 hover:border-gold/55 hover:shadow-lift md:p-8"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-linear-to-r from-gold-deep via-gold to-gold-soft transition-transform duration-(--rc-motion-slow) ease-premium group-hover:scale-x-100"
              />
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 font-ui text-label font-semibold uppercase text-accent-soft">
                  <InstagramIcon className="size-4 text-gold-deep" />
                  {p.topic}
                </span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-colors duration-(--rc-motion-medium) group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
                  <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
                </span>
              </div>

              <h3 className="mt-6 font-heading text-h4 leading-snug font-semibold text-fg">{p.title}</h3>

              <ul className="mt-5 space-y-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-small text-muted">
                    <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rotate-45 bg-gold" />
                    {pt}
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-l border-gold/50 pl-4 font-display text-fg/85 italic">{p.closing}</p>

              <p className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-6 text-[0.8125rem] text-subtle">
                {p.tags.map((t) => (
                  <span key={t}>#{t}</span>
                ))}
              </p>
              <span className="sr-only">View this post on Instagram (opens in a new tab)</span>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
