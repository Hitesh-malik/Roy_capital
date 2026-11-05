import Link from "next/link";
import { site } from "@/config/site";
import { footerNav } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/visuals/LogoMark";

function FooterLinks({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-label font-medium uppercase text-subtle">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-small text-muted transition-colors duration-(--rc-motion-fast) hover:text-fg">
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
    <footer className="relative overflow-hidden border-t border-line bg-bg">
      <div aria-hidden className="arch-grid pointer-events-none absolute inset-0 opacity-30" />
      <Container className="relative pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" aria-label={`${site.name} — home`} className="inline-block rounded-sm">
              <Wordmark />
            </Link>
            <p className="mt-6 font-display text-h3 italic text-fg">{site.values}</p>
            <p className="mt-4 max-w-sm text-small text-muted">{site.summary}</p>
            <ButtonLink href="/sponsorships" variant="secondary" size="sm" className="mt-8">
              Partner With Us
            </ButtonLink>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <FooterLinks title={footerNav.explore.title} links={footerNav.explore.links} />
            <FooterLinks title={footerNav.partner.title} links={footerNav.partner.links} />
            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-label font-medium uppercase text-subtle">Get in Touch</h2>
              <p className="mt-5 text-small text-muted">Email</p>
              <p className="mt-1 text-small break-all text-fg select-all">{site.email}</p>
              {site.socials.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {site.socials.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-small text-muted hover:text-fg">
                        {s.label}
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
          className="mt-20 select-none font-heading text-[clamp(3rem,13.5vw,12.5rem)] leading-[0.8] font-bold tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_var(--rc-color-border-strong)]"
        >
          ROY CAPITAL
        </p>

        <div className="mt-10 flex flex-col gap-6 border-t border-line pt-8 lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-2xl text-small text-subtle">{site.disclaimer}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-small text-subtle">
            <span>
              © {site.copyrightYear} {site.name}. All Rights Reserved.
            </span>
            {footerNav.legal.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-fg">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
