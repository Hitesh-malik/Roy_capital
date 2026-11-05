import { z } from "zod";
import { generalSubjects } from "@/content/contact";
import { partnershipInterests } from "@/content/sponsorship";

const name = z.string().trim().min(2, "Please enter your full name.").max(120, "Please keep this under 120 characters.");
const email = z.string().trim().min(1, "Please enter your email address.").email("Please enter a valid email address.");
const phone = z
  .string()
  .trim()
  .max(30, "Please keep this under 30 characters.")
  .refine((v) => v === "" || /^[+()\d\s.-]{6,}$/.test(v), "Please enter a valid phone number.");
const message = z
  .string()
  .trim()
  .min(20, "Please share a little more detail (at least 20 characters).")
  .max(4000, "Please keep your message under 4,000 characters.");
/** Hidden honeypot — real visitors never fill it. */
const honeypot = z.string().max(0).optional();

export const generalEnquirySchema = z.object({
  name,
  email,
  phone,
  subject: z.enum(generalSubjects, { message: "Please choose a subject." }),
  message,
  company_website: honeypot,
});

export const partnershipEnquirySchema = z.object({
  name,
  company: z.string().trim().min(2, "Please enter your company or organisation.").max(160),
  email,
  phone,
  interest: z.enum(partnershipInterests, { message: "Please choose a partnership interest." }),
  website: z
    .string()
    .trim()
    .max(300)
    .refine(
      (v) => v === "" || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(v),
      "Please enter a valid website address.",
    ),
  message,
  company_website: honeypot,
});

export type GeneralEnquiry = z.infer<typeof generalEnquirySchema>;
export type PartnershipEnquiry = z.infer<typeof partnershipEnquirySchema>;
