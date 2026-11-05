"use client";

import { CheckCircle2 } from "lucide-react";
import { formCopy } from "@/content/contact";
import { SubmissionNotice } from "./SubmissionNotice";
import type { EnquiryState } from "./useEnquiry";

/**
 * Keeps the form mounted (so values survive "Edit enquiry") and swaps in the
 * appropriate status panel after submission.
 */
export function EnquiryShell({
  state,
  onReset,
  children,
}: {
  state: EnquiryState;
  onReset: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div hidden={state.status === "unavailable" || state.status === "sent"}>{children}</div>
      <div aria-live="polite">
        {state.status === "unavailable" && <SubmissionNotice summary={state.summary} onEdit={onReset} />}
        {state.status === "sent" && (
          <div className="flex items-start gap-4 rounded-card border border-accent/40 bg-accent/[0.06] p-6 md:p-8">
            <CheckCircle2 aria-hidden className="size-6 shrink-0 text-accent-soft" />
            <p className="text-fg">{formCopy.success}</p>
          </div>
        )}
        {state.status === "error" && (
          <p role="alert" className="mt-4 text-small text-danger">
            {state.message ?? formCopy.error}
          </p>
        )}
      </div>
    </div>
  );
}
