'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export default function KonamiCode() {
  const [keys, setKeys] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prevKeys) => {
        const newKeys = [...prevKeys, e.key].slice(-KONAMI_CODE.length);
        const matches = newKeys.every((key, index) => key === KONAMI_CODE[index]);
        if (matches && newKeys.length === KONAMI_CODE.length) {
          setActivated(true);
          setTimeout(() => setActivated(false), 5000);
          return [];
        }
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -100 }}
          className="fixed bottom-8 right-8 z-50 glass-strong rounded-xl p-6 border-2 border-[#00FF66] box-glow-green max-w-sm"
        >
          <div className="flex items-start space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-6 h-6 text-[#00FF66]" />
            </motion.div>
            <div>
              <h4 className="font-display text-xl font-bold text-white mb-2">
                EASTER EGG UNLOCKED! 🎉
              </h4>
              <p className="font-body text-sm text-[#E8E8E8] mb-2">
                Congratulations, fellow developer! You found the secret.
              </p>
              <p className="font-terminal text-xs text-[#00FF66]">
                // Achievement: Code Archaeologist 🏆
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
