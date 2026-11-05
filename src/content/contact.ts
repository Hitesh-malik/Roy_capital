export const generalSubjects = [
  "General Enquiry",
  "Financial Education",
  "Investment Awareness",
  "Entrepreneurship",
  "Partnership & Collaboration",
  "Philanthropy",
  "Other",
] as const;

export type GeneralSubject = (typeof generalSubjects)[number];

/** Maps `/contact?subject=<slug>` to a preselected subject. */
export const subjectSlugs: Record<string, GeneralSubject> = {
  "financial-education": "Financial Education",
  "investment-awareness": "Investment Awareness",
  entrepreneurship: "Entrepreneurship",
  philanthropy: "Philanthropy",
  partnership: "Partnership & Collaboration",
};

export const contactPage = {
  eyebrow: "Contact",
  title: "Let's Start a Conversation.",
  lead: "Have questions about Roy Capital, our learning programs or potential collaborations?",
  body: "We would be happy to hear from you. Whether you are interested in learning more, exploring opportunities or connecting with our team, get in touch.",
  pathways: {
    general: {
      label: "General Enquiry",
      description: "Educational questions, brand information and other requests.",
      submit: "Send Enquiry",
    },
    partnership: {
      label: "Sponsorship / Partnership",
      description: "Commercial collaborations and sponsorship conversations.",
      submit: "Send Partnership Enquiry",
    },
  },
  direct: { label: "Direct contact", note: "Prefer email? Write to us directly." },
  faqs: { eyebrow: "FAQs", title: "Frequently Asked Questions", lead: "Clear answers to common questions about Roy Capital." },
};

export const formCopy = {
  required: "Required",
  optional: "Optional",
  /** Shown instead of a success message while online submission is not connected. */
  unavailable: {
    title: "Online submissions aren't live yet.",
    body: "This form doesn't send messages yet. To reach Roy Capital, please email the address below and include the details of your enquiry.",
    copy: "Copy enquiry",
    copied: "Copied to clipboard",
    edit: "Edit enquiry",
  },
  success: "Thank you for reaching out. Our team will get back to you.",
  error: "Something went wrong. Please try again.",
};
