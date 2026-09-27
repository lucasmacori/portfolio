'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from '@/contexts/LanguageContext';
import { useAnimationPreference } from '@/contexts/AnimationContext';

export default function HeroSection() {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  const { paused } = useAnimationPreference();
  const techBadges = ['Java', 'TypeScript', 'React', 'SpringBoot', 'Kubernetes', 'NextJS'];

  const symbols = ['{}', '[]', '()', '<>', '/>', '::'];
  const [particles, setParticles] = useState<{ x: number; y: number; endY: number; duration: number; symbol: string }[]>([]);

  useEffect(() => {
    if (prefersReducedMotion || paused) {
      setParticles([]);
      return;
    }
    setParticles(
      Array.from({ length: 20 }, () => ({
        x: Math.random() * 1000,
        y: Math.random() * 1000,
        endY: Math.random() * 1000,
        duration: 10 + Math.random() * 10,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
      }))
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, paused]);

  return (
    <section id="hero" aria-labelledby="hero-title" className="relative min-h-screen flex items-center justify-center overflow-hidden circuit-bg">
      {/* Floating Code Particles Background */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            initial={{ x: p.x, y: p.y, opacity: 0.1 }}
            animate={{ y: [null, p.endY], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: 'linear' }}
            className="absolute font-terminal text-[#00FFFF]"
          >
            {p.symbol}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Hero Content */}
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {/* Profile Picture */}
              <motion.div
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
                className="flex justify-center mb-8"
              >
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-[#00FFFF] box-glow-cyan">
                  <Image
                    src="/profile-edited.jpg"
                    alt="Lucas Macori"
                    fill
                    sizes="(min-width: 640px) 176px, 144px"
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              <motion.h1
                id="hero-title"
                className="font-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4 text-white"
                tabIndex={-1}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                LUCAS <span className="text-gradient-cyan-magenta">MACORI</span>
              </motion.h1>

              <p
                className="font-display text-2xl sm:text-3xl md:text-4xl mb-2 glow-cyan"
              >
                {t.hero.subtitle}
              </p>

              {/* Floating Tech Badges */}
              <motion.div
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap justify-center gap-4 mb-12 mt-8"
              >
                {techBadges.map((tech, index) => (
                  <motion.div
                    key={tech}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="glass px-4 py-2 rounded-full font-terminal text-sm border border-[#00FFFF]/30 hover:border-[#FF00AA] hover:box-glow-magenta transition-all duration-300"
                  >
                    {tech}
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <a
                href="#projects"
                className="font-terminal text-lg px-8 py-4 bg-transparent border-2 border-[#00FFFF] text-[#00FFFF] rounded-lg hover:bg-[#00FFFF] hover:text-[#0D0D0D] box-glow-cyan transition-all duration-300"
              >
                {t.hero.cta}
              </a>
            </motion.div>
          </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div aria-hidden="true" className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="text-[#00FFFF] w-8 h-8" />
      </div>
    </section>
  );
}
