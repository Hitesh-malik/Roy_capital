import { theme, type Theme } from "@/config/theme";

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

/** Serialises the active theme into `--rc-*` custom properties. */
export function themeToCss(t: Theme): string {
  const vars: Record<string, string> = {};

  for (const [key, value] of Object.entries(t.colors)) vars[`--rc-color-${kebab(key)}`] = value;
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
  for (const [key, value] of Object.entries(t.shadows)) vars[`--rc-shadow-${key}`] = value;
  for (const [key, value] of Object.entries(t.motion.durations)) vars[`--rc-motion-${key}`] = `${value}ms`;
  for (const [key, value] of Object.entries(t.motion.easing))
    vars[`--rc-ease-${kebab(key)}`] = `cubic-bezier(${value.join(", ")})`;

  const body = Object.entries(vars)
    .map(([name, value]) => `${name}:${value};`)
    .join("");
  return `:root{color-scheme:${t.colorScheme};${body}}`;
}

export function ThemeStyle() {
  return <style id="rc-theme" dangerouslySetInnerHTML={{ __html: themeToCss(theme) }} />;
}
