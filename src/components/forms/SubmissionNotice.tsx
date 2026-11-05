"use client";

import { motion } from "motion/react";
import { Check, Copy, Info, PenLine } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { formCopy } from "@/content/contact";
import { site } from "@/config/site";
import { presets } from "@/config/motion";
import { Button } from "@/components/ui/Button";

/**
 * Honest status shown while online submission is not connected: nothing was
 * sent, so we hand the visitor a formatted copy to email themselves.
 */
export function SubmissionNotice({ summary, onEdit }: { summary: string; onEdit: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`To: ${site.email}\n\n${summary}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.div
      initial={presets.sectionTransition.initial}
      animate={presets.sectionTransition.animate}
      className="rounded-card border border-accent/40 bg-accent/[0.06] p-6 md:p-8"
    >
      <div className="flex items-start gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-accent/50 text-accent-soft">
          <Info className="size-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 ref={headingRef} tabIndex={-1} className="font-heading text-h4 font-semibold text-fg outline-none">
            {formCopy.unavailable.title}
          </h3>
          <p className="mt-2 text-muted">{formCopy.unavailable.body}</p>
          <p className="mt-4 text-small text-subtle">Email</p>
          <p className="font-heading text-h4 font-semibold break-all text-fg select-all">{site.email}</p>
        </div>
      </div>

      <pre className="mt-6 max-h-72 overflow-auto rounded-input border border-line bg-bg/70 p-4 font-body text-small whitespace-pre-wrap text-muted">
        {summary}
      </pre>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={copy} size="md">
          {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
          {copied ? formCopy.unavailable.copied : formCopy.unavailable.copy}
        </Button>
        <Button onClick={onEdit} size="md" variant="secondary">
          <PenLine aria-hidden className="size-4" />
          {formCopy.unavailable.edit}
        </Button>
      </div>
      <p aria-live="polite" className="sr-only">
        {copied ? formCopy.unavailable.copied : ""}
      </p>
    </motion.div>
  );
}
