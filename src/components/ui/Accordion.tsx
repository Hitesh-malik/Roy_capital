"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useRef, useState } from "react";
import { durations, ease } from "@/config/motion";
import { cn } from "@/lib/utils/cn";

type Item = { id: string; question: string; answer: string };

/**
 * Accessible accordion: buttons with aria-expanded/controls, labelled regions,
 * and Up/Down/Home/End navigation between headers.
 */
export function Accordion({ items, className, numbered = true }: { items: Item[]; className?: string; numbered?: boolean }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = items.length - 1;
    const target =
      e.key === "ArrowDown" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowUp" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (target === null) return;
    e.preventDefault();
    buttons.current[target]?.focus();
  };

  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === item.id;
        const headerId = `${baseId}-h-${item.id}`;
        const panelId = `${baseId}-p-${item.id}`;
        return (
          <div key={item.id} className="border-b border-line">
            <h3 className="font-heading">
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                id={headerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="group flex w-full items-start gap-6 py-6 text-left md:py-7"
              >
                {numbered && (
                  <span className="mt-1 w-8 shrink-0 text-small tabular-nums text-subtle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                <span
                  className={cn(
                    "flex-1 text-h4 font-semibold transition-colors duration-(--rc-motion-medium)",
                    isOpen ? "text-fg" : "text-fg/85 group-hover:text-fg",
                  )}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-[transform,border-color,background-color] duration-(--rc-motion-medium) ease-premium",
                    isOpen ? "rotate-45 border-accent bg-accent/10 text-accent-soft" : "border-line-strong text-muted group-hover:border-accent-soft/60",
                  )}
                >
                  <Plus className="size-4" strokeWidth={1.75} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: durations.medium, ease: ease.premium }}
                  className="overflow-hidden"
                >
                  <p className={cn("max-w-2xl pb-7 text-muted", numbered && "pl-14")}>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
