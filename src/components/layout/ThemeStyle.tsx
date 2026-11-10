import { brand, theme, tones, type Theme, type Tone } from "@/config/theme";

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

const declare = (vars: Record<string, string>) =>
  Object.entries(vars)
    .map(([name, value]) => `${name}:${value};`)
    .join("");

function colorVars(colors: Tone["colors"], shadows: Tone["shadows"] = {}) {
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(colors)) if (value) vars[`--rc-color-${kebab(key)}`] = value;
  for (const [key, value] of Object.entries(shadows)) if (value) vars[`--rc-shadow-${key}`] = value;
  return vars;
}

/** Serialises the active theme (plus brand constants and section tones) into `--rc-*` custom properties. */
export function themeToCss(t: Theme): string {
  const vars: Record<string, string> = colorVars(t.colors, t.shadows);

  for (const [key, value] of Object.entries(brand)) vars[`--rc-brand-${kebab(key)}`] = value;
  for (const [key, value] of Object.entries(t.typography.fonts)) vars[`--rc-font-${key}`] = value;
  for (const [key, value] of Object.entries(t.typography.weights)) vars[`--rc-weight-${key}`] = String(value);
  for (const [key, [size, lh, ls]] of Object.entries(t.typography.scale)) {
    vars[`--rc-text-${key}`] = size;
    vars[`--rc-text-${key}-lh`] = lh;
    vars[`--rc-text-${key}-ls`] = ls;
  }

  vars["--rc-container"] = t.layout.containerWidth;
  vars["--rc-gutter"] = t.layout.gutter;
  vars["--rc-section"] = t.layout.sectionSpacing;
  vars["--rc-section-tight"] = t.layout.sectionSpacingTight;

  for (const [key, value] of Object.entries(t.radii)) vars[`--rc-radius-${key}`] = value;
  for (const [key, value] of Object.entries(t.motion.durations)) vars[`--rc-motion-${key}`] = `${value}ms`;
  for (const [key, value] of Object.entries(t.motion.easing))
    vars[`--rc-ease-${kebab(key)}`] = `cubic-bezier(${value.join(", ")})`;

  const scopes = Object.entries(tones)
    .map(([name, tone]) => `.tone-${name}{color-scheme:${tone.colorScheme};${declare(colorVars(tone.colors, tone.shadows))}}`)
    .join("");

  return `:root{color-scheme:${t.colorScheme};${declare(vars)}}${scopes}`;
}

export function ThemeStyle() {
  return <style id="rc-theme" dangerouslySetInnerHTML={{ __html: themeToCss(theme) }} />;
}
