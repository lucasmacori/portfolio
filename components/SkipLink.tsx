'use client';

import { useTranslations } from '@/contexts/LanguageContext';

export default function SkipLink() {
  const t = useTranslations();
  return <a className="skip-link" href="#main-content">{t.accessibility.skipToContent}</a>;
}
