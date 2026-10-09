'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage, useTranslations } from '@/contexts/LanguageContext';

type PageEntry = {
  slug: string;
  title: { en: string; fr: string };
};

export default function LinksIndexContent({ pages }: { pages: PageEntry[] }) {
  const { lang } = useLanguage();
  const t = useTranslations();

  return (
    <main id="main-content" tabIndex={-1} className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-5 pb-16 pt-28 sm:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-28 h-72 w-72 rounded-full border border-[#00FFFF]/10 sm:right-[-7rem]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-40 h-48 w-48 rounded-full border border-[#FF00AA]/15" />

      <header className="relative mb-10 sm:mb-14">
        <p className="mb-5 font-terminal text-xs uppercase tracking-[0.24em] text-[#00FFFF] sm:text-sm">
          <span aria-hidden="true" className="mr-2 text-[#FF00AA]">//</span>{t.links.eyebrow}
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {t.links.indexTitle}
        </h1>
      </header>

      <ul className="relative space-y-3" aria-label={t.links.indexTitle}>
        {pages.map((page, index) => {
          const title = page.title[lang];

          return (
            <li key={page.slug}>
              <Link
                href={`/links/${page.slug}`}
                aria-label={t.links.openPage(title)}
                className="group flex min-h-20 items-center justify-between gap-5 rounded-xl border border-white/10 bg-white/[0.035] px-5 py-4 transition-colors hover:border-[#00FFFF]/60 hover:bg-[#00FFFF]/[0.06] sm:min-h-24 sm:px-7"
              >
                <span className="flex min-w-0 items-center gap-5">
                  <span aria-hidden="true" className="font-terminal text-xs text-[#FF00AA]">{String(index + 1).padStart(2, '0')}</span>
                  <span className="font-display text-lg font-semibold text-[#E8E8E8] group-hover:text-[#00FFFF] sm:text-xl">{title}</span>
                </span>
                <ArrowUpRight aria-hidden="true" className="shrink-0 text-[#888888] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#00FFFF]" size={20} />
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
