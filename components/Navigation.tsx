'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['hero', 'projects', 'articles', 'resume', 'network', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: 'projects', label: '/projects' },
    { id: 'articles', label: '/articles' },
    { id: 'resume', label: '/resume' },
    { id: 'network', label: '/network' },
  ];

  const LangToggle = () => (
    <div className="flex items-center space-x-1 font-terminal text-sm">
      <button
        onClick={() => setLang('en')}
        aria-label="Switch to English"
        className={`px-1 transition-colors duration-200 ${lang === 'en' ? 'text-[#00FFFF] glow-cyan' : 'text-[#888888] hover:text-[#E8E8E8]'}`}
      >
        EN
      </button>
      <span className="text-[#444444]">|</span>
      <button
        onClick={() => setLang('fr')}
        aria-label="Passer en français"
        className={`px-1 transition-colors duration-200 ${lang === 'fr' ? 'text-[#00FFFF] glow-cyan' : 'text-[#888888] hover:text-[#E8E8E8]'}`}
      >
        FR
      </button>
    </div>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-strong' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              aria-label="Go to top"
              className="font-terminal text-xl glow-cyan hover:glow-magenta transition-all duration-300"
            >
              ~/lucas
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                  className={`font-terminal relative transition-colors duration-300 ${
                    activeSection === item.id
                      ? 'text-[#00FFFF] glow-cyan'
                      : 'text-[#E8E8E8] hover:text-[#00FFFF]'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00FFFF] glow-cyan"
                    />
                  )}
                </button>
              ))}
              <LangToggle />
            </div>

            {/* Mobile: lang toggle + hamburger */}
            <div className="md:hidden flex items-center space-x-4">
              <LangToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                className="text-[#00FFFF] hover:text-[#FF00AA] transition-colors"
              >
                {isMobileMenuOpen
                  ? <X aria-hidden="true" size={24} />
                  : <Menu aria-hidden="true" size={24} />
                }
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-[#0D0D0D] md:hidden flex items-center justify-center"
        >
          <div className="flex flex-col items-center space-y-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className="font-terminal text-3xl text-[#00FFFF] hover:text-[#FF00AA] glow-cyan transition-all duration-300"
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}
