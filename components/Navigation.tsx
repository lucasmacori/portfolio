'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage, useTranslations } from '@/contexts/LanguageContext';

const navItems = [
  { id: 'projects', key: 'projects' },
  { id: 'articles', key: 'articles' },
  { id: 'resume', key: 'resume' },
  { id: 'network', key: 'network' },
  { id: 'contact', key: 'contact' },
] as const;

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const t = useTranslations();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const desktopResizeRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
        );
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -65% 0px' },
    );
    navItems.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isMobileMenuOpen && !dialog.open) dialog.showModal();
    if (!isMobileMenuOpen && dialog.open) dialog.close();
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const closeForDesktop = (event: MediaQueryListEvent) => {
      if (!event.matches || !dialogRef.current?.open) return;
      desktopResizeRef.current = true;
      setIsMobileMenuOpen(false);
      requestAnimationFrame(() => document.querySelector<HTMLElement>('header nav a[href="#projects"]')?.focus());
    };
    desktop.addEventListener('change', closeForDesktop);
    return () => desktop.removeEventListener('change', closeForDesktop);
  }, []);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  const languageButtons = (
    <div className="flex items-center gap-2" role="group" aria-label={t.accessibility.language}>
      <button type="button" onClick={() => setLang('en')} aria-label={t.accessibility.english} aria-pressed={lang === 'en'} className="language-button">
        EN
      </button>
      <button type="button" onClick={() => setLang('fr')} aria-label={t.accessibility.french} aria-pressed={lang === 'fr'} className="language-button">
        FR
      </button>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0D0D0D]/95 backdrop-blur">
      <nav aria-label={t.accessibility.navigation} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-16 gap-4">
          <a href="#hero" aria-label={t.navigation.home} className="font-terminal text-xl text-[#00FFFF] focus-visible:outline-offset-4">
            ~/lucas
          </a>
          <div className="hidden md:flex items-center gap-5">
            {navItems.map(({ id, key }) => (
              <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} className="nav-link">
                {t.navigation[key]}
              </a>
            ))}
            {languageButtons}
          </div>
          <div className="md:hidden flex items-center gap-3">
            {languageButtons}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label={t.accessibility.openMenu}
              aria-haspopup="dialog"
              className="min-w-11 min-h-11 inline-flex items-center justify-center text-[#00FFFF]"
            >
              <Menu aria-hidden="true" size={24} />
            </button>
          </div>
        </div>
      </nav>

      <dialog
        ref={dialogRef}
        aria-label={t.accessibility.navigation}
        onClose={() => {
          setIsMobileMenuOpen(false);
          if (desktopResizeRef.current) {
            desktopResizeRef.current = false;
            return;
          }
          requestAnimationFrame(() => menuButtonRef.current?.focus());
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeMenu();
        }}
        className="mobile-navigation-dialog fixed inset-0 m-0 h-dvh w-screen max-h-none max-w-none border-0 bg-[#0D0D0D] p-6 text-white backdrop:bg-black/80 md:hidden"
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          <button type="button" onClick={closeMenu} aria-label={t.accessibility.closeMenu} className="absolute right-5 top-5 min-w-11 min-h-11 inline-flex items-center justify-center text-[#00FFFF]">
            <X aria-hidden="true" size={24} />
          </button>
          {navItems.map(({ id, key }) => (
            <a key={id} href={`#${id}`} onClick={closeMenu} className="font-terminal text-2xl text-[#00FFFF]">
              {t.navigation[key]}
            </a>
          ))}
        </div>
      </dialog>
    </header>
  );
}
