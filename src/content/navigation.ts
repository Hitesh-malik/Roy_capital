export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Our Approach", href: "/approach" },
  { label: "Sponsorships", href: "/sponsorships" },
  { label: "Philanthropy", href: "/philanthropy" },
  { label: "Impact", href: "/impact" },
  { label: "Contact", href: "/contact" },
];

export const headerCta: NavLink = { label: "Partner With Us", href: "/sponsorships" };

export const footerNav = {
  explore: {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Our Programs", href: "/programs" },
      { label: "Our Approach", href: "/approach" },
      { label: "Philanthropy", href: "/philanthropy" },
      { label: "Our Impact", href: "/impact" },
    ],
  },
  partner: {
    title: "Partnerships",
    links: [
      { label: "Sponsorships", href: "/sponsorships" },
      { label: "How collaboration works", href: "/sponsorships#process" },
      { label: "Partnership enquiry", href: "/sponsorships#enquiry" },
      { label: "Contact", href: "/contact" },
      { label: "FAQs", href: "/contact#faqs" },
    ],
  },
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};
