# Future course commerce: integration notes

Course sales are **not** part of the current site. The site has no course store, pricing, checkout, payments, accounts or learning management system (LMS), and none of these should be exposed until they are approved. This note records where those features would plug in, so they can be added without a redesign.

## Boundaries

- **Keep commerce code separate.** Put it under `src/features/courses/`: data access, types and components. Sponsorship code (`content/sponsorship.ts`, `components/forms/PartnershipForm.tsx`) stays independent of it.
- **Use a route group for logged-in areas.** For example, `src/app/(learn)/` for `/learn`, `/account` and `/courses/[slug]`, each with its own layout. That keeps auth providers out of the marketing pages.
- **Share the design system.** New UI uses `theme.ts`, `components/ui/*` and `config/motion.ts`. No new tokens are needed unless the brand evolves.

## Likely modules

| Module | Integration point |
| --- | --- |
| Course catalogue | Extend `src/content/programs.ts` (each program has a stable `slug`), or replace it with a headless CMS or database query. The Programs page can then link to `/courses/[slug]`. |
| Course detail pages | `src/app/courses/[slug]/page.tsx` with `generateStaticParams` and `use cache`. |
| Authentication | Auth provider in the `(learn)` route group. Use `proxy.ts` to protect `/learn` and `/account`. |
| Payments | Hosted checkout (e.g. Stripe Checkout) through a route handler. Handle fulfilment in a webhook route. |
| Enrolment | Database table keyed by user and course. Check it server-side before serving lessons. |
| Video learning | A signed-URL video host. Do not serve paid media from `public/`. |
| Student dashboard | `src/app/(learn)/learn/page.tsx`. Progress and certificates come later. |

## Prerequisites before building

- Confirm the regulatory position. Educational content must remain clearly separate from personalised investment advice.
- Update the privacy notice, add terms of sale, and add a refund policy.
- Update `enquiryConfig` and the privacy notice if form submissions go live at the same time.
