import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formCopy } from "@/content/contact";

const control =
  "block w-full rounded-input border border-line-strong/70 bg-bg/60 px-4 text-body text-fg placeholder:text-subtle transition-[border-color,background-color,box-shadow] duration-(--rc-motion-fast) hover:border-line-strong focus:border-accent focus:bg-surface/50 focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--rc-color-accent)_22%,transparent)] focus:outline-none aria-[invalid=true]:border-danger/70";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
};

export function Field({ id, label, error, optional, hint, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-small font-medium text-fg">
        {label}
        {optional && <span className="text-label font-normal uppercase text-subtle">{formCopy.optional}</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-small text-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-small text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** aria props wiring a control to its error / hint text. */
export function describedBy(id: string, error?: string, hint?: string) {
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  } as const;
}

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(control, "h-13", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(control, "min-h-40 resize-y py-3.5", className)} {...props} />;
}

export function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(control, "h-13 appearance-none pr-11 [&>option]:bg-surface", className)} {...props}>
        {children}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" />
    </div>
  );
}

/** Hidden honeypot field — bots fill it, people never see it. */
export function Honeypot(props: React.ComponentProps<"input">) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
}
