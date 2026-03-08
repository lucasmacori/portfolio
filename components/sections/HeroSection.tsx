'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const t = useTranslations();
  const [bootComplete, setBootComplete] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const fullCommand = '$ lucas --explore';

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullCommand.length) {
        setDisplayedText(fullCommand.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setBootComplete(true), 500);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const techBadges = ['Java', 'TypeScript', 'React', 'SpringBoot', 'Kubernetes', 'NextJS'];

  const symbols = ['{}', '[]', '()', '<>', '/>', '::'];
  const [particles] = useState(() =>
    Array.from({ length: 20 }, () => ({
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      endY: Math.random() * 1000,
      duration: 10 + Math.random() * 10,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    }))
  );

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden circuit-bg">
      {/* Floating Code Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        {!bootComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-lg p-8 max-w-2xl mx-auto scanlines"
          >
            <div className="font-terminal text-left">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#FF00AA]"></div>
                <div className="w-3 h-3 rounded-full bg-[#00FF66]"></div>
                <div className="w-3 h-3 rounded-full bg-[#00FFFF]"></div>
              </div>
              <div className="text-[#00FFFF]">
                {displayedText}
                <span className="terminal-cursor"></span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Hero Content */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {/* Profile Picture */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
                className="flex justify-center mb-8"
              >
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-[#00FFFF] box-glow-cyan">
                  <Image
                    src="/profile-edited.jpg"
                    alt="Lucas Macori"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              <motion.h1
                className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4 text-white"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                LUCAS <span className="text-gradient-cyan-magenta">MACORI</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="font-display text-2xl sm:text-3xl md:text-4xl mb-2 glow-cyan"
              >
                {t.hero.subtitle}<span className="terminal-cursor ml-1"></span>
              </motion.div>

              {/* Floating Tech Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap justify-center gap-4 mb-12 mt-8"
              >
                {techBadges.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="glass px-4 py-2 rounded-full font-terminal text-sm border border-[#00FFFF]/30 hover:border-[#FF00AA] hover:box-glow-magenta transition-all duration-300 cursor-pointer"
                  >
                    {tech}
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.getElementById('projects');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-terminal text-lg px-8 py-4 bg-transparent border-2 border-[#00FFFF] text-[#00FFFF] rounded-lg hover:bg-[#00FFFF] hover:text-[#0D0D0D] box-glow-cyan transition-all duration-300"
              >
                {t.hero.cta}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator */}
      {bootComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, y: { duration: 2, repeat: Infinity } }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-[#00FFFF] w-8 h-8" />
        </motion.div>
      )}
    </section>
  );
}
