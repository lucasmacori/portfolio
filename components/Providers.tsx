'use client';

import { MotionConfig } from 'motion/react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AnimationProvider, useAnimationPreference } from '@/contexts/AnimationContext';

function MotionPreferences({ children }: { children: React.ReactNode }) {
  const { paused } = useAnimationPreference();
  return (
    <MotionConfig reducedMotion="user" isStatic={paused}>
      <LanguageProvider>{children}</LanguageProvider>
    </MotionConfig>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnimationProvider>
      <MotionPreferences>{children}</MotionPreferences>
    </AnimationProvider>
  );
}
