import { BriefcaseBusiness, ChartNoAxesCombined, GraduationCap, type LucideIcon } from "lucide-react";

/** One icon per learning area, keyed by program slug (see content/programs.ts). */
export const programIcons: Record<string, LucideIcon> = {
  "financial-education": GraduationCap,
  "investment-awareness": ChartNoAxesCombined,
  entrepreneurship: BriefcaseBusiness,
};

export function ProgramIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = programIcons[slug] ?? GraduationCap;
  return <Icon aria-hidden className={className} strokeWidth={1.6} />;
}
