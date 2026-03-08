'use client';

import { motion } from 'motion/react';
import { Coffee, Music } from 'lucide-react';

export default function Footer({ version }: { version: string }) {
  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-[#00FFFF]/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left: Built With */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <p className="font-body text-sm text-[#E8E8E8] flex items-center justify-center md:justify-start space-x-2">
              <span>Built with React and</span>
              <Coffee className="w-4 h-4 text-[#FF6B00]" />
            </p>
          </motion.div>

          {/* Center: Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <p className="font-terminal text-xs text-[#888888]">
              It looks like you have reached the end of this website
            </p>
          </motion.div>

          {/* Right: Version */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-right"
          >
            <p className="font-terminal text-xs text-[#00FFFF]">v{version}</p>
          </motion.div>
        </div>

        {/* Decorative Line */}
        <div className="mt-8 relative h-px bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent opacity-30"></div>
      </div>
    </footer>
  );
}
