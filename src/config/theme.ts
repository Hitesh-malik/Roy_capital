/**
 * ROY CAPITAL — DESIGN TOKENS (single source of truth)
 *
 * Every colour, font role, radius, spacing value, shadow, motion timing and
 * 3D material colour used on the site is defined here. `ThemeStyle` turns the
 * active theme into CSS custom properties (`--rc-*`), and `globals.css` maps
 * those to Tailwind utilities (`bg-bg`, `text-fg`, `rounded-card`, ...).
 *
 * To restyle the whole site, edit a preset below or switch `activeThemeName`.
 * Do not hardcode hex values in components.
 */

export type ThemeColors = {
  /** Page background — the deepest blue-black. */
  bg: string;
  /** Alternate section background. */
  bgSecondary: string;
  /** Cards, panels, inputs. */
  surface: string;
  /** Raised surfaces, hover states, architectural blocks. */
  architectural: string;
  /** CTAs, active states, controlled highlights. */
  accent: string;
  /** Softer accent for text highlights and fine lines. */
  accentSoft: string;
  /** Text placed on top of `accent`. */
  onAccent: string;
  /** Muted warm tone, used sparingly for philanthropy warmth. */
  warm: string;
  /** Primary text. */
  text: string;
  /** Secondary text. */
  textMuted: string;
  /** Tertiary text: labels, captions. */
  textSubtle: string;
  /** Hairlines and dividers. */
  border: string;
  /** Stronger borders: outlines, focused inputs. */
  borderStrong: string;
  /** Pure contrast. */
  contrast: string;
  /** Form error text and borders. */
  danger: string;
};

export type ThreeColors = {
  core: string;
  ring: string;
  lattice: string;
  orbit: string;
  node: string;
  keyLight: string;
  rimLight: string;
};

export type Theme = {
  name: string;
  colorScheme: "dark" | "light";
  colors: ThemeColors;
  three: ThreeColors;
  typography: {
    /** CSS font-family values. Font loading lives in `src/config/fonts.ts`. */
    fonts: { heading: string; body: string; display: string };
    weights: { regular: number; medium: number; semibold: number; bold: number };
    /** Responsive type scale: [size, line-height, letter-spacing]. */
    scale: Record<
      "display" | "h1" | "h2" | "h3" | "h4" | "lead" | "body" | "small" | "label",
      [string, string, string]
    >;
  };
  layout: {
    containerWidth: string;
    gutter: string;
    sectionSpacing: string;
    sectionSpacingTight: string;
  };
  radii: { card: string; button: string; input: string; media: string };
  shadows: { card: string; lift: string; glow: string };
  motion: {
    /** 0 disables movement (opacity only), 1 is the designed default. */
    intensity: number;
    durations: { fast: number; medium: number; slow: number; slower: number };
    easing: { premium: [number, number, number, number]; inOut: [number, number, number, number] };
    /** Base reveal travel distance in px, scaled by intensity. */
    distance: { sm: number; md: number; lg: number };
    stagger: number;
  };
};

const sharedTypography: Theme["typography"] = {
  fonts: {
    heading: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
    body: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
    display: "var(--font-instrument), ui-serif, Georgia, serif",
  },
  weights: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  scale: {
    display: ["clamp(2.75rem, 1.6rem + 5.2vw, 6.25rem)", "1.02", "-0.035em"],
    h1: ["clamp(2.5rem, 1.7rem + 3.6vw, 4.75rem)", "1.05", "-0.03em"],
    h2: ["clamp(2rem, 1.45rem + 2.4vw, 3.5rem)", "1.08", "-0.025em"],
    h3: ["clamp(1.375rem, 1.15rem + 0.9vw, 1.875rem)", "1.2", "-0.015em"],
    h4: ["clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem)", "1.35", "-0.01em"],
    lead: ["clamp(1.125rem, 1.04rem + 0.4vw, 1.375rem)", "1.6", "-0.005em"],
    body: ["1rem", "1.7", "0em"],
    small: ["0.875rem", "1.6", "0em"],
    label: ["0.75rem", "1.4", "0.16em"],
  },
};

const sharedLayout: Theme["layout"] = {
  containerWidth: "1280px",
  gutter: "clamp(1.25rem, 0.6rem + 3vw, 3rem)",
  sectionSpacing: "clamp(5rem, 3.5rem + 6vw, 9.5rem)",
  sectionSpacingTight: "clamp(3.5rem, 2.5rem + 4vw, 6rem)",
};

const sharedMotion: Theme["motion"] = {
  intensity: 1,
  durations: { fast: 180, medium: 450, slow: 800, slower: 1200 },
  easing: { premium: [0.22, 1, 0.36, 1], inOut: [0.65, 0, 0.35, 1] },
  distance: { sm: 12, md: 28, lg: 56 },
  stagger: 0.08,
};

/** Default launch theme. */
const midnight: Theme = {
  name: "Midnight Blue",
  colorScheme: "dark",
  colors: {
    bg: "#050A13",
    bgSecondary: "#0A1628",
    surface: "#102038",
    architectural: "#142C4D",
    accent: "#4C8DFF",
    accentSoft: "#8DB8FF",
    onAccent: "#040B16",
    warm: "#D2B98B",
    text: "#E8F0FA",
    textMuted: "#A2B1C6",
    textSubtle: "#7385A0",
    border: "#263951",
    borderStrong: "#3A5373",
    contrast: "#FFFFFF",
    danger: "#FF8A8A",
  },
  three: {
    core: "#1B2C47",
    ring: "#A9BAD3",
    lattice: "#8DB8FF",
    orbit: "#4C8DFF",
    node: "#DCE8FA",
    keyLight: "#E8F0FA",
    rimLight: "#4C8DFF",
  },
  typography: sharedTypography,
  layout: sharedLayout,
  radii: { card: "1rem", button: "999px", input: "0.625rem", media: "1.25rem" },
  shadows: {
    card: "0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 24px 48px -24px rgb(0 0 0 / 0.6)",
    lift: "0 1px 0 0 rgb(255 255 255 / 0.06) inset, 0 32px 64px -24px rgb(0 0 0 / 0.75)",
    glow: "0 0 0 1px rgb(76 141 255 / 0.35), 0 12px 40px -12px rgb(76 141 255 / 0.55)",
  },
  motion: sharedMotion,
};

/** Configuration example — not visually tuned for launch. */
const monochrome: Theme = {
  ...midnight,
  name: "Monochrome Black",
  colors: {
    ...midnight.colors,
    bg: "#070707",
    bgSecondary: "#0F0F10",
    surface: "#18181A",
    architectural: "#222225",
    accent: "#F2F2F2",
    accentSoft: "#BDBDBD",
    onAccent: "#070707",
    border: "#2A2A2D",
    borderStrong: "#45454A",
    textMuted: "#A6A6AB",
    textSubtle: "#7C7C82",
  },
  three: { ...midnight.three, core: "#1C1C1F", ring: "#C8C8CC", lattice: "#BDBDBD", orbit: "#8A8A90", rimLight: "#FFFFFF" },
};

/** Configuration example — not visually tuned for launch. */
const lightCorporate: Theme = {
  ...midnight,
  name: "Light Corporate",
  colorScheme: "light",
  colors: {
    bg: "#F6F8FB",
    bgSecondary: "#EDF1F7",
    surface: "#FFFFFF",
    architectural: "#E2E9F3",
    accent: "#1F5FD6",
    accentSoft: "#2F6FE6",
    onAccent: "#FFFFFF",
    warm: "#9A7A45",
    text: "#0A1628",
    textMuted: "#41526B",
    textSubtle: "#5F708A",
    border: "#D5DDE8",
    borderStrong: "#B6C3D4",
    contrast: "#000000",
    danger: "#C0262D",
  },
};

export const themePresets = { midnight, monochrome, lightCorporate } as const;
export type ThemeName = keyof typeof themePresets;

/** Switch the whole site's theme here. */
export const activeThemeName: ThemeName = "midnight";
export const theme: Theme = themePresets[activeThemeName];
