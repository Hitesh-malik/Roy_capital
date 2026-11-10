import { Cormorant_Garamond, Inter, Manrope } from "next/font/google";

/**
 * Font loading. Each font exposes a CSS variable that `theme.typography.fonts`
 * assigns to a role:
 * - heading / display → Cormorant Garamond, a classical serif that echoes the
 *   "Roy Capital" lettering in the emblem.
 * - body → Inter, for long-form readability.
 * - ui → Manrope, for navigation, buttons, labels and numerals.
 */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const fontVariables = [cormorant.variable, manrope.variable, inter.variable].join(" ");
