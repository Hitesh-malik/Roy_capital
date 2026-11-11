/**
 * Brand and business details. Update here — components read from this file.
 * Only publish details that have been verified.
 */

export type SocialLink = { label: string; href: string };
export type MediaKit = { label: string; href: string; size?: string };

export const site = {
  name: "Roy Capital",
  wordmark: "ROY CAPITAL",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://roycapitalgrp.netlify.app",
  title: "Roy Capital — Financial Education & Investment Awareness",
  description:
    "Roy Capital is a financial knowledge brand focused on financial education, investment awareness and entrepreneurship — open to sponsorships and partnerships built on shared purpose.",
  tagline: "Building Financial Intelligence. Creating a Better Tomorrow.",
  values: "Knowledge. Perspective. Purpose.",
  summary:
    "Building financial intelligence through education, investment awareness and entrepreneurial thinking.",

  /** Shown as plain text only (no mail links, no mail sending). */
  email: "hello@roycapital.com",

  /** Official Instagram profile (verified). */
  instagram: {
    handle: "@roycapitalgrp",
    href: "https://www.instagram.com/roycapitalgrp/",
    /** Profile bio, kept in sync with Instagram. */
    bio: ["Money. Business. Wealth.", "Simplifying Finance & Entrepreneurship", "Learn Smart. Grow Smarter."],
  },

  /** Add verified profiles only. Empty = section hidden. */
  socials: [{ label: "Instagram", href: "https://www.instagram.com/roycapitalgrp/" }] as SocialLink[],

  /**
   * Sponsorship deck / media kit. Keep `null` until an approved file exists;
   * the download block stays hidden while this is null.
   * Example: { label: "Download partnership deck", href: "/media/roy-capital-deck.pdf", size: "PDF · 2 MB" }
   */
  mediaKit: null as MediaKit | null,

  disclaimer:
    "Educational content only. Not financial advice. All investments involve risk. Please conduct independent research before making financial decisions.",

  copyrightYear: 2026,
} as const;
