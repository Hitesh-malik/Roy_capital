import { Inter, Instrument_Serif, Manrope } from "next/font/google";

/**
 * Font loading. Each font exposes a CSS variable that `theme.typography.fonts`
 * assigns to a role (heading / body / display). To change a font, swap the
 * import here and keep the variable name — or point the role at a new one.
 */
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

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const fontVariables = [manrope.variable, inter.variable, instrumentSerif.variable].join(" ");
