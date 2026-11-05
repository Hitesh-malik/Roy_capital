import { Download } from "lucide-react";
import { site } from "@/config/site";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Sponsorship deck / media kit download. Dormant until `site.mediaKit` is
 * set to a real, approved file — no placeholder button is ever shown.
 */
export function MediaKit() {
  const kit = site.mediaKit;
  if (!kit) return null;
  return (
    <Reveal className="mt-16 flex flex-col gap-6 rounded-card border border-line bg-surface/40 p-8 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-label font-medium uppercase text-subtle">Media kit</p>
        <p className="mt-2 font-heading text-h4 font-semibold text-fg">{kit.label}</p>
        {kit.size && <p className="mt-1 text-small text-subtle">{kit.size}</p>}
      </div>
      <a
        href={kit.href}
        download
        className="inline-flex h-12 items-center gap-2.5 rounded-button border border-line-strong px-6 font-heading text-[0.75rem] font-semibold tracking-[0.12em] text-fg uppercase transition-colors hover:border-accent-soft/60 hover:bg-surface"
      >
        <Download aria-hidden className="size-4" />
        Download
      </a>
    </Reveal>
  );
}
