# Roy Capital

Website for Roy Capital: a premium blue-black, sponsorship-first site with an interactive 3D hero.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, Motion for React, React Three Fiber and Drei, React Hook Form, and Zod.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` in production. It is used for canonical URLs, the sitemap and Open Graph tags.

## Where things live

| Change… | Edit |
| --- | --- |
| Colours, radii, shadows, spacing, type scale, motion timing, 3D material colours | `src/config/theme.ts` |
| Fonts (heading / body / editorial display) | `src/config/fonts.ts` (loading) and `theme.typography.fonts` (roles) |
| Animation presets and intensity | `src/config/motion.ts` (reads `theme.motion`) |
| Brand name, email, socials, disclaimer, media kit | `src/config/site.ts` |
| Page copy | `src/content/*.ts` |
| Navigation | `src/content/navigation.ts` |

### Theme tokens

`theme.ts` is the single source of truth for design tokens:

1. `ThemeStyle` turns it into `--rc-*` CSS variables.
2. `src/styles/globals.css` maps those variables to Tailwind utilities, such as `bg-bg`, `bg-surface`, `text-fg`, `text-muted`, `border-line`, `text-accent`, `font-heading`, `text-h1` and `rounded-card`.

To restyle the site, edit a preset or switch `activeThemeName`. The `monochrome` and `lightCorporate` presets are configuration examples and are not tuned for launch.

Two rules keep the system intact:

- Never hardcode hex values in components.
- Setting `theme.motion.intensity = 0` keeps fades but removes all movement.

## Behaviour notes

- **Forms are frontend-only.** Validation runs in the browser with Zod. Nothing is sent or stored. While `enquiryConfig.mode` in `src/lib/integrations/enquiry.ts` is `"disabled"`, a valid submission shows an honest "not live yet" notice and offers a copyable summary to email. To connect a backend, implement the `connected` branch there. No form component needs to change.
- **3D hero.**
  - `components/three/IntelligenceCore.tsx` is lazy-loaded over a matching SVG fallback.
  - It is skipped for reduced motion or when WebGL is unavailable.
  - It pauses rendering when the hero is off-screen.
  - It lowers detail and pixel ratio on small or low-core devices.
- **Cache Components / Activity.** Visited routes stay mounted but hidden, so the community video pauses itself when its page is hidden, and the WebGL canvas is recreated when its page becomes visible again.
- **Media kit.** `site.mediaKit` is `null`, so no download is shown. Add an approved file to `public/` and set the field to enable it.
- **Gallery.** `impactPage.gallery` is empty, so it is hidden. Add approved photos to enable it.

## Before public launch: information to confirm

- [ ] Confirm that `hello@roycapital.com` is an active, monitored inbox. It is shown as plain text.
- [ ] Add verified social profiles (`site.socials`).
- [ ] Add program formats, durations, eligibility and delivery details once they are confirmed.
- [ ] Add approved community photos and any verified philanthropic activities.
- [ ] Add a sponsorship deck or media kit, and any verified audience or partnership metrics, if available.
- [ ] Connect a form backend, then update `/privacy` accordingly.
- [ ] Have the privacy notice and disclaimer reviewed by a qualified adviser.
- [ ] Set the production domain (`NEXT_PUBLIC_SITE_URL`).

See `docs/FUTURE-COURSES.md` for how course sales could be added later.
