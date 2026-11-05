import type { GeneralEnquiry, PartnershipEnquiry } from "@/lib/validation/enquiry";

/**
 * Enquiry submission boundary.
 *
 * The site is currently frontend-only: nothing is sent or stored. While
 * `mode` is "disabled", a valid submission returns `unavailable` and the form
 * shows an honest notice (never a fake success).
 *
 * To connect a backend later, implement the "connected" branch here
 * (e.g. POST to a route handler, server action or third-party form service)
 * and flip `mode`. No form component needs to change.
 */
export const enquiryConfig = {
  mode: "disabled" as "disabled" | "connected",
};

export type EnquiryPayload =
  | { kind: "general"; data: GeneralEnquiry }
  | { kind: "partnership"; data: PartnershipEnquiry };

export type EnquiryResult = { status: "sent" } | { status: "unavailable" } | { status: "error"; message?: string };

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  if (enquiryConfig.mode === "disabled") return { status: "unavailable" };

  // Placeholder for a future integration — intentionally not implemented.
  void payload;
  return { status: "error", message: "No submission integration is configured." };
}

/** Plain-text summary the visitor can copy into an email. */
export function formatEnquiry(payload: EnquiryPayload): string {
  const rows: [string, string | undefined][] =
    payload.kind === "partnership"
      ? [
          ["Enquiry type", "Partnership"],
          ["Full name", payload.data.name],
          ["Company / organisation", payload.data.company],
          ["Work email", payload.data.email],
          ["Phone", payload.data.phone],
          ["Partnership interest", payload.data.interest],
          ["Website", payload.data.website],
        ]
      : [
          ["Enquiry type", "General"],
          ["Full name", payload.data.name],
          ["Email", payload.data.email],
          ["Phone", payload.data.phone],
          ["Subject", payload.data.subject],
        ];

  const header = rows
    .filter(([, v]) => v && v.trim() !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return `${header}\n\nMessage:\n${payload.data.message}`;
}
