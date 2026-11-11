import Link from "next/link";
import { Mail } from "lucide-react";
import { site } from "@/config/site";
import { footerNav } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { InstagramIcon } from "@/components/visuals/InstagramIcon";
import { Emblem } from "@/components/visuals/LogoMark";

function FooterLinks({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="flex items-center gap-3 font-ui text-label font-bold uppercase text-gold-soft">
        <span aria-hidden className="size-1 rotate-45 bg-gold" />
        {title}
      </h2>
      <ul className="mt-6 space-y-3.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group/fl inline-flex items-center gap-2 text-small text-muted transition-colors duration-(--rc-motion-fast) hover:text-fg"
            >
              <span
                aria-hidden
                className="h-px w-0 bg-gold transition-[width] duration-(--rc-motion-medium) ease-premium group-hover/fl:w-3"
              />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="tone-dark relative isolate overflow-hidden bg-navy-deep text-fg">
      <div aria-hidden className="gold-rule absolute inset-x-0 top-0" />
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-30" />
      <div aria-hidden className="gold-glow pointer-events-none absolute -top-64 left-1/2 -z-10 size-[44rem] -translate-x-1/2 opacity-40" />

      <Container className="relative pt-20 pb-10 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" aria-label={`${site.name} — home`} className="inline-flex flex-col items-start gap-5 rounded-sm sm:flex-row sm:items-center">
              <Emblem size={96} className="ring-emblem" />
              <span className="flex flex-col">
                <span className="font-heading text-[2rem] leading-none font-semibold text-fg">{site.name}</span>
                <span className="mt-2 font-ui text-label font-semibold uppercase text-gold-soft">{site.values}</span>
              </span>
            </Link>
            <p className="mt-8 max-w-md font-display text-h4 leading-snug font-medium text-fg/90 italic">{site.tagline}</p>
            <p className="mt-4 max-w-sm text-small text-muted">{site.summary}</p>
            <ButtonLink href="/sponsorships" size="md" className="mt-8">
              Partner With Us
            </ButtonLink>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <FooterLinks title={footerNav.explore.title} links={footerNav.explore.links} />
            <FooterLinks title={footerNav.partner.title} links={footerNav.partner.links} />
            <div className="col-span-2 sm:col-span-1">
              <h2 className="flex items-center gap-3 font-ui text-label font-bold uppercase text-gold-soft">
                <span aria-hidden className="size-1 rotate-45 bg-gold" />
                Get in Touch
              </h2>
              <div className="mt-6 rounded-card border border-gold/20 bg-surface/40 p-5">
                <span className="grid size-10 place-items-center rounded-full border border-gold/40 text-gold-soft">
                  <Mail aria-hidden className="size-4" strokeWidth={1.75} />
                </span>
                <p className="mt-4 font-ui text-label font-semibold uppercase text-subtle">Email</p>
                <p className="mt-1 text-small font-medium break-all text-fg select-all">{site.email}</p>
              </div>
              {site.socials.length > 0 && (
                <ul className="mt-5 space-y-3">
                  {site.socials.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/so flex items-center gap-3 rounded-card border border-gold/20 bg-surface/40 p-4 transition-colors duration-(--rc-motion-fast) hover:border-gold/50"
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/40 text-gold-soft transition-colors group-hover/so:bg-gold group-hover/so:text-navy">
                          <InstagramIcon className="size-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-ui text-label font-semibold uppercase text-subtle">{s.label}</span>
                          <span className="mt-0.5 block text-small font-medium text-fg">{site.instagram.handle}</span>
                        </span>
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-20 bg-linear-to-b from-gold/30 via-gold/10 to-gold/0 bg-clip-text pb-[0.12em] font-heading text-[clamp(3.25rem,14vw,13rem)] leading-[0.9] font-semibold tracking-[-0.01em] whitespace-nowrap text-transparent select-none"
        >
          Roy Capital
        </p>

        <div className="mt-10 flex flex-col gap-6 border-t border-gold/15 pt-8 lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-2xl text-small text-subtle">{site.disclaimer}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-small text-subtle">
            <span>
              © {site.copyrightYear} {site.name}. All Rights Reserved.
            </span>
            {footerNav.legal.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-gold-soft">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
