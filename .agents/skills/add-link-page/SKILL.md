---
name: add-link-page
description: Add a page to this portfolio's /links repository. Use whenever the user asks to add, publish, or create a new link page or a collection of links in this repository, including requests for a new /links/<slug> page.
---

# Add a Link Page

Use the JSON-backed link-page system in `app/links/` to add pages to the private links repository. The `/links` index and `/links/[slug]` detail route read from `pages.json`; adding a JSON entry is normally all the implementation needed.

## Workflow

1. Read `app/links/pages.json` and inspect the current `/links` routes before editing.
2. Gather the page's title and links from the user. If required details are missing, ask for them rather than inventing destinations or labels.
3. Create a lowercase, URL-safe slug from the requested title. Check that it is unique in `pages.json`.
4. Add one entry to `app/links/pages.json` using this shape:

   ```json
   {
     "slug": "short-url-safe-name",
     "title": {
       "en": "English page title",
       "fr": "Titre de la page en français"
     },
     "links": [
       {
         "label": {
           "en": "English link label",
           "fr": "Libellé français"
         },
         "href": "https://example.com"
       }
     ]
   }
   ```

5. Keep all visible page titles and link labels bilingual (`en` and `fr`), matching the existing `useLanguage()` behavior. Preserve the requested wording and destinations exactly.
6. The repository index should pick up the new entry automatically. Do not add the page to the portfolio homepage navigation or sitemap; `/links` is intentionally separate.
7. Keep the route private from search crawlers: preserve the `/links` disallow rule in `app/robots.ts` and `noindex` metadata on both the repository and detail pages. If routing or metadata must change, follow the existing App Router patterns.
8. Detail-page links open in a new tab. Preserve the existing secure `rel="noopener noreferrer"`, accessible translated announcement, keyboard focus styling, skip link, and shared language header. Do not add page-specific markup unless the requested content requires it.
9. Validate the JSON and run `npx tsc --noEmit` and `npm run build`. Report the resulting URL and checks.

## Constraints

- Keep page data in `app/links/pages.json`; do not hardcode page titles, destinations, or labels in React components or `lib/translations.ts`.
- Preserve the page order as the order in the JSON array.
- Do not change existing entries or design unless explicitly requested.
- Do not expose the repository by linking it from the main portfolio without an explicit request.
