# Repository guide

## Toolchain and commands

- Use Node 22 and npm; the Docker build uses `node:22-alpine`, and `package-lock.json` is authoritative.
- Install reproducibly with `npm ci`; start locally with `npm run dev` on port 3000.
- Run `npm run typecheck` for focused type checking, then `npm run build` for final verification. Run `npm run test:a11y` for the Playwright accessibility suite.
- Run `npm run lint` for Biome's static analysis. Existing advisory-level findings are reported as warnings while new recommended-rule errors fail the command.
- `npm run build` may warn about an unrelated lockfile above this repository; this comes from Next.js workspace-root inference, not this project. The build output is a standalone server used by `Dockerfile`.

## Application wiring

- This is a single Next.js App Router application. `app/page.tsx` composes the one-page site; `components/sections/` owns its major sections.
- `app/page.tsx` is a server component and fetches the GitHub public-repository count with a one-hour revalidation. Most interactive components are client components using `motion/react`.
- `app/layout.tsx` wraps every route with `FirebaseGuard` and `Providers`. `Providers` owns reduced-motion behavior and the bilingual language context.
- Keep user-facing English and French copy together in `lib/translations.ts`; components consume it through `useTranslations()`.
- Global CSS enters through `styles/globals.css`, which composes the split files in `styles/`. Tailwind CSS v4 is configured through CSS/PostCSS rather than a `tailwind.config.*` file.

## Runtime configuration

- Copy `.env.local.example` to `.env.local` for full local behavior. Firebase and reCAPTCHA site configuration is read at runtime from `GET /api/config`; do not convert it to build-time `NEXT_PUBLIC_*` variables without changing that design.
- `RECAPTCHA_SECRET_KEY` and `N8N_PORTFOLIO_AUTH` are server-only. The contact flow is `ContactSection` -> reCAPTCHA v3 action `submit_form` -> `app/actions.ts` -> the n8n webhook; never expose either secret through `/api/config` or client code.
- Missing Firebase configuration intentionally disables analytics. Missing reCAPTCHA configuration disables contact-form submission; the rest of the page still works.
- Production images run `node server.js` from Next.js standalone output as a non-root user; preserve `output: 'standalone'` in `next.config.ts` unless deployment changes too.
