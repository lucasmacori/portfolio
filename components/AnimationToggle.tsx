'use client';

import { useTranslations } from '@/contexts/LanguageContext';
import { useAnimationPreference } from '@/contexts/AnimationContext';

export default function AnimationToggle() {
  const t = useTranslations();
  const { paused, toggle } = useAnimationPreference();

  return (
    <button type="button" onClick={toggle} aria-pressed={paused} className="min-h-11 font-terminal text-sm text-[#E8E8E8] underline underline-offset-4 hover:text-[#00FFFF]">
      {paused ? t.accessibility.resumeAnimations : t.accessibility.pauseAnimations}
    </button>
  );
}
