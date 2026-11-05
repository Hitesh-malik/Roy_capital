import type { FAQ } from "./faqs";
import { faqs } from "./faqs";

/**
 * Sponsorship & partnership content. Everything here describes areas open for
 * discussion — not packages, pricing, reach or guaranteed deliverables.
 * Add verified metrics or a media kit (see `site.mediaKit`) once available.
 */

export const partnershipInterests = [
  "Brand Sponsorship",
  "Educational Collaboration",
  "Content Partnership",
  "Community Initiative",
  "General Business Collaboration",
  "Other",
] as const;

export type PartnershipInterest = (typeof partnershipInterests)[number];

export const sponsorshipPage = {
  hero: {
    eyebrow: "Sponsorships & Partnerships",
    title: "Partnerships Built on Shared Purpose.",
    body: "Roy Capital is open to exploring sponsorships, brand collaborations and partnerships that align with its focus on financial knowledge, education, entrepreneurship and community contribution.",
    cta: { label: "Start a Partnership Conversation", href: "#enquiry" },
    secondary: { label: "How collaboration works", href: "#process" },
  },
  about: {
    eyebrow: "About Roy Capital",
    title: "A financial knowledge brand with a wider purpose.",
    body: [
      "Roy Capital brings together financial education, investment awareness and entrepreneurial thinking to help individuals understand the bigger picture behind money, markets and businesses.",
      "As it grows, Roy Capital intends to dedicate a part of its profits towards philanthropic initiatives that support people, create opportunities and strengthen communities.",
    ],
    pillars: [
      { title: "Financial Education", body: "Understand financial concepts through clear, practical and accessible learning." },
      { title: "Investment Awareness", body: "Explore how markets work, how risk matters and why informed decisions count." },
      { title: "Entrepreneurial Thinking", body: "Discover the ideas, strategies and decisions behind successful businesses." },
      { title: "Purposeful Impact", body: "Believe in growth that creates opportunities and contributes to communities." },
    ],
  },
  alignment: {
    eyebrow: "Areas of Alignment",
    title: "Where we are open to collaborating.",
    note: "These are areas for discussion. Every collaboration is shaped together and subject to mutual agreement.",
    items: [
      {
        title: "Financial Education",
        body: "Initiatives that help people understand money, financial concepts and informed decision-making.",
      },
      {
        title: "Entrepreneurship & Business Awareness",
        body: "Collaborations exploring business fundamentals, strategic thinking and the mindset behind building ventures.",
      },
      {
        title: "Knowledge-Driven Campaigns",
        body: "Campaigns grounded in clear, responsible and educational communication rather than hype.",
      },
      {
        title: "Educational Content Collaboration",
        body: "Jointly developed learning content on finance, investments or entrepreneurship.",
      },
      {
        title: "Purpose-Driven Initiatives",
        body: "Community and philanthropic initiatives that create opportunity and positive change.",
      },
    ],
  },
  why: {
    eyebrow: "Why Explore a Partnership?",
    title: "Principles we bring to every conversation.",
    items: [
      { title: "Educational focus", body: "Our work centres on helping people understand finance, investments and business." },
      { title: "Clarity of communication", body: "We favour simple explanations and responsible messaging over complexity and hype." },
      { title: "Shared learning objectives", body: "We look for partners who value informed thinking and accessible knowledge." },
      { title: "Long-term thinking", body: "We prefer considered, lasting relationships to one-off activity." },
      { title: "Responsible brand alignment", body: "We collaborate where values, audience and intent genuinely fit." },
    ],
  },
  process: {
    eyebrow: "Collaboration Process",
    title: "How a conversation begins.",
    note: "This outlines how enquiries typically progress. It is not a contractual commitment.",
    steps: [
      { number: "01", title: "Connect", body: "Share a short introduction through the partnership enquiry form." },
      {
        number: "02",
        title: "Understand Objectives",
        body: "We take time to understand your goals, your audience and the values behind your brand.",
      },
      {
        number: "03",
        title: "Explore Opportunities",
        body: "Together, we explore ideas that fit Roy Capital's educational focus and purpose.",
      },
      {
        number: "04",
        title: "Plan Together",
        body: "Where there is a clear fit, we shape the details of the collaboration jointly.",
      },
    ],
  },
  enquiry: {
    eyebrow: "Partnership Enquiry",
    title: "Start a partnership conversation.",
    body: "Tell us a little about your organisation and what you have in mind. Fields marked optional can be left blank.",
  },
  /** Confirmed answers only. */
  faqs: faqs.filter((f) => f.id === "collaborate") as FAQ[],
};
