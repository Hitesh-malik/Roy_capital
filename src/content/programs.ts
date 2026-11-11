export type ProgramMotif = "planes" | "orbits" | "columns";

export type Program = {
  slug: string;
  number: string;
  title: string;
  headline: string;
  /** One-line summary used on the homepage. */
  summary: string;
  body: string;
  topics: string[];
  homeCta: string;
  enquiryCta: string;
  motif: ProgramMotif;
};

/**
 * Educational focus areas. Informational only — formats, durations,
 * eligibility and delivery methods should be added once confirmed.
 */
export const programs: Program[] = [
  {
    slug: "financial-education",
    number: "01",
    title: "Financial Education",
    headline: "Understand Money. Build Knowledge.",
    summary: "Learn the fundamentals of money, finance, economic concepts and financial decision-making.",
    body: "Financial education starts with understanding the basics. Explore essential financial concepts, the role of money, economic principles and the factors that influence everyday financial decisions.",
    topics: [
      "Understanding money and personal finance",
      "Financial planning fundamentals",
      "Understanding income, expenses and savings",
      "Introduction to financial markets",
      "Economic concepts and financial awareness",
      "Making informed financial decisions",
    ],
    homeCta: "Explore Financial Education",
    enquiryCta: "Enquire About This Program",
    motif: "planes",
  },
  {
    slug: "investment-awareness",
    number: "02",
    title: "Investment Awareness",
    headline: "Understand Markets. Explore Opportunities.",
    summary: "Understand markets, investment principles, risk management, diversification and long-term perspectives.",
    body: "Investment awareness is about understanding how different markets function and what influences investment decisions. Learn about investment fundamentals, risk, diversification and the importance of long-term thinking.",
    topics: [
      "Introduction to investment principles",
      "Understanding financial markets",
      "Risk and reward fundamentals",
      "Portfolio diversification concepts",
      "Investment time horizons",
      "Market trends and economic influences",
    ],
    homeCta: "Explore Investment Learning",
    enquiryCta: "Enquire About This Program",
    motif: "orbits",
  },
  {
    slug: "entrepreneurship",
    number: "03",
    title: "Entrepreneurship",
    headline: "Think Bigger. Build with Purpose.",
    summary: "Explore business fundamentals, strategic thinking, leadership and the mindset behind building businesses.",
    body: "Entrepreneurship is about identifying opportunities, solving problems and turning ideas into meaningful ventures. Explore the fundamentals of business, strategic thinking and the decisions that help businesses develop and grow.",
    topics: [
      "Business fundamentals",
      "Validating ideas and market demand before investing",
      "Understanding business models",
      "Strategic thinking and planning",
      "Leadership and decision-making",
      "Business growth and development",
      "Understanding markets and customers",
    ],
    homeCta: "Explore Entrepreneurship",
    enquiryCta: "Enquire About Entrepreneurship",
    motif: "columns",
  },
];

export const programsPage = {
  eyebrow: "Our Programs",
  title: "Learn Today. Understand Tomorrow.",
  intro:
    "Explore learning areas designed to help you develop a clearer understanding of finance, investments and business.",
  benefit: {
    eyebrow: "Who Can Benefit?",
    title: "For anyone ready to understand the bigger picture.",
    body: "Our learning areas are designed for individuals who want to improve their understanding of finance, develop investment awareness, explore entrepreneurship, build stronger business knowledge and make more informed decisions.",
    note: "To learn more about formats and availability, get in touch.",
  },
};
