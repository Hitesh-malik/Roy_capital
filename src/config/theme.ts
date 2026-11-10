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
  /** Page / section background. */
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
    fonts: { heading: string; body: string; display: string; ui: string };
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

/**
 * Fixed brand palette sampled from the Roy Capital emblem
 * (public/brand/roy-capital-emblem.png). These never change per section.
 */
export const brand = {
  /** Emblem field — the deep navy the logo sits on. */
  navy: "#051225",
  navyDeep: "#020A18",
  /** Royal blue used for light-section CTAs and blue gradients. */
  royal: "#12357A",
  royalBright: "#2F63C4",
  /** Gold ramp from the emblem ring: bronze → brand gold → highlight. */
  goldBronze: "#8A6222",
  goldDeep: "#A57545",
  gold: "#E1B355",
  goldSoft: "#F0D294",
  goldHighlight: "#FEDFA6",
  ivory: "#F7F4EC",
  paper: "#FFFFFF",
} as const;

export type Brand = typeof brand;

/**
 * Section tones. Each tone re-declares the colour variables inside a scope
 * (`.tone-ivory`, `.tone-paper`, `.tone-royal`, `.tone-dark`), so every
 * component reads the right colours without knowing where it is placed.
 */
export type ToneName = "dark" | "ivory" | "paper" | "royal";
export type Tone = { colorScheme: "dark" | "light"; colors: Partial<ThemeColors>; shadows?: Partial<Theme["shadows"]> };

const sharedTypography: Theme["typography"] = {
  fonts: {
    heading: "var(--font-cormorant), ui-serif, Georgia, serif",
    body: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
    display: "var(--font-cormorant), ui-serif, Georgia, serif",
    ui: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
  },
  weights: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  scale: {
    display: ["clamp(3rem, 1.55rem + 5.2vw, 6.25rem)", "1.0", "-0.02em"],
    h1: ["clamp(2.75rem, 1.75rem + 4vw, 5.25rem)", "1.04", "-0.015em"],
    h2: ["clamp(2.25rem, 1.6rem + 2.7vw, 3.875rem)", "1.08", "-0.012em"],
    h3: ["clamp(1.625rem, 1.38rem + 1vw, 2.125rem)", "1.15", "-0.005em"],
    h4: ["clamp(1.3125rem, 1.22rem + 0.35vw, 1.5rem)", "1.3", "0em"],
    lead: ["clamp(1.0625rem, 1rem + 0.35vw, 1.3125rem)", "1.65", "-0.003em"],
    body: ["1rem", "1.72", "0em"],
    small: ["0.875rem", "1.6", "0em"],
    label: ["0.75rem", "1.4", "0.18em"],
  },
};

const sharedLayout: Theme["layout"] = {
  containerWidth: "1320px",
  gutter: "clamp(1.25rem, 0.6rem + 3vw, 3rem)",
  sectionSpacing: "clamp(5rem, 3.5rem + 6vw, 9rem)",
  sectionSpacingTight: "clamp(3.5rem, 2.5rem + 4vw, 6rem)",
};

const sharedMotion: Theme["motion"] = {
  intensity: 1,
  durations: { fast: 180, medium: 450, slow: 800, slower: 1200 },
  easing: { premium: [0.22, 1, 0.36, 1], inOut: [0.65, 0, 0.35, 1] },
  distance: { sm: 12, md: 28, lg: 56 },
  stagger: 0.08,
};

/** Default launch theme — taken from the emblem: navy field, gold ring. */
const navyGold: Theme = {
  name: "Roy Navy & Gold",
  colorScheme: "dark",
  colors: {
    bg: brand.navy,
    bgSecondary: "#081A35",
    surface: "#0D2347",
    architectural: "#132E5C",
    accent: brand.gold,
    accentSoft: brand.goldSoft,
    onAccent: "#071328",
    warm: "#E2C48E",
    text: "#F3F5FA",
    textMuted: "#B0BBCE",
    textSubtle: "#8593AC",
    border: "#1B3158",
    borderStrong: "#2D4876",
    contrast: "#FFFFFF",
    danger: "#FF8A8A",
  },
  three: {
    core: "#0B1F44",
    ring: brand.gold,
    lattice: "#C9A35A",
    orbit: brand.gold,
    node: brand.goldHighlight,
    keyLight: "#FFF4DD",
    rimLight: brand.royalBright,
  },
  typography: sharedTypography,
  layout: sharedLayout,
  radii: { card: "0.375rem", button: "0.25rem", input: "0.25rem", media: "0.5rem" },
  shadows: {
    card: "0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 24px 48px -24px rgb(0 0 0 / 0.6)",
    lift: "0 1px 0 0 rgb(255 255 255 / 0.06) inset, 0 32px 64px -24px rgb(0 0 0 / 0.75), 0 0 0 1px rgb(225 179 85 / 0.18)",
    glow: "0 0 0 1px rgb(225 179 85 / 0.45), 0 14px 40px -12px rgb(225 179 85 / 0.55)",
  },
  motion: sharedMotion,
};

const lightText: Partial<ThemeColors> = {
  accent: brand.royal,
  accentSoft: brand.goldBronze,
  onAccent: "#FFFFFF",
  warm: brand.goldBronze,
  text: "#0A1A33",
  textMuted: "#44536B",
  textSubtle: "#5E6B82",
  contrast: brand.navy,
  danger: "#B42318",
};

const lightShadows: Partial<Theme["shadows"]> = {
  card: "0 1px 2px rgb(10 26 51 / 0.05), 0 18px 40px -22px rgb(10 26 51 / 0.22)",
  lift: "0 2px 4px rgb(10 26 51 / 0.04), 0 34px 60px -28px rgb(10 26 51 / 0.38), 0 0 0 1px rgb(165 117 69 / 0.22)",
  glow: "0 0 0 1px rgb(18 53 122 / 0.4), 0 14px 36px -14px rgb(18 53 122 / 0.55)",
};

/** Section tones for the default theme (see `ToneName`). */
export const tones: Record<ToneName, Tone> = {
  dark: { colorScheme: "dark", colors: navyGold.colors, shadows: navyGold.shadows },
  ivory: {
    colorScheme: "light",
    colors: {
      ...lightText,
      bg: brand.ivory,
      bgSecondary: "#FFFFFF",
      surface: "#FFFFFF",
      architectural: "#EDE6D6",
      border: "#E2D9C6",
      borderStrong: "#C9B992",
    },
    shadows: lightShadows,
  },
  paper: {
    colorScheme: "light",
    colors: {
      ...lightText,
      bg: brand.paper,
      bgSecondary: "#F4F6FA",
      surface: "#FFFFFF",
      architectural: "#E8EDF5",
      border: "#E1E6EF",
      borderStrong: "#BFC9DA",
    },
    shadows: lightShadows,
  },
  royal: {
    colorScheme: "dark",
    colors: {
      ...navyGold.colors,
      bg: "#0B2552",
      bgSecondary: "#0E2C5F",
      surface: "#12336B",
      architectural: "#183D7C",
      textMuted: "#BCC7DB",
      textSubtle: "#97A6C2",
      border: "#24467F",
      borderStrong: "#39609E",
    },
    shadows: navyGold.shadows,
  },
};

export const themePresets = { navyGold } as const;
export type ThemeName = keyof typeof themePresets;

/** Switch the whole site's theme here. */
export const activeThemeName: ThemeName = "navyGold";
export const theme: Theme = themePresets[activeThemeName];
