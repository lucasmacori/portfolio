'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useTranslations } from '@/contexts/LanguageContext';

export default function BackToTop() {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    requestAnimationFrame(() => document.querySelector<HTMLElement>('#hero h1')?.focus({ preventScroll: true }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          aria-label={t.accessibility.backToTop}
          className="fixed bottom-8 left-8 z-40 w-12 h-12 rounded-full glass-strong border-2 border-[#00FFFF] box-glow-cyan flex items-center justify-center hover:bg-[#00FFFF] hover:text-[#0D0D0D] transition-all duration-300 group"
        >
          <ArrowUp aria-hidden="true" className="w-5 h-5 text-[#00FFFF] group-hover:text-[#0D0D0D]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
