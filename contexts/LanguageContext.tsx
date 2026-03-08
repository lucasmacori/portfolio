'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { translations, type Language, type Translations } from '@/lib/translations';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-lang') as Language | null;
    if (saved === 'en' || saved === 'fr') {
      setLangState(saved);
    } else {
      setLangState(navigator.language.startsWith('fr') ? 'fr' : 'en');
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('portfolio-lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
export const useTranslations = () => useContext(LanguageContext).t;
