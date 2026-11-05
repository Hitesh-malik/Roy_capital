"use client";

import { useState } from "react";
import { formatEnquiry, submitEnquiry, type EnquiryPayload } from "@/lib/integrations/enquiry";

export type EnquiryState =
  | { status: "idle" }
  | { status: "unavailable"; summary: string }
  | { status: "sent" }
  | { status: "error"; message?: string };

/** Shared submit flow for both enquiry forms. */
export function useEnquiry() {
  const [state, setState] = useState<EnquiryState>({ status: "idle" });

  const submit = async (payload: EnquiryPayload) => {
    // Honeypot filled → silently ignore.
    if (payload.data.company_website) return;
    try {
      const result = await submitEnquiry(payload);
      if (result.status === "unavailable") setState({ status: "unavailable", summary: formatEnquiry(payload) });
      else if (result.status === "sent") setState({ status: "sent" });
      else setState({ status: "error", message: result.message });
    } catch {
      setState({ status: "error" });
    }
  };

  return { state, submit, reset: () => setState({ status: "idle" }) };
}
