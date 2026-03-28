'use client';

import { motion, useScroll } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00FFFF] via-[#FF00AA] to-[#00FF66] origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
