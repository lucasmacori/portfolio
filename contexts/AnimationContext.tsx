'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio-animations-paused';
const pausedByControl = new Set<Animation>();

const AnimationContext = createContext({
  paused: false,
  toggle: () => {},
});

function pauseRunningAnimations() {
  document.getAnimations().forEach((animation) => {
    if (animation.playState !== 'running') return;
    animation.pause();
    pausedByControl.add(animation);
  });
}

function resumeControlledAnimations() {
  pausedByControl.forEach((animation) => animation.play());
  pausedByControl.clear();
}

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const initialValue = localStorage.getItem(STORAGE_KEY) === 'true';
    setPaused(initialValue);
    document.documentElement.classList.toggle('animations-paused', initialValue);
    if (initialValue) pauseRunningAnimations();
  }, []);

  const toggle = () => {
    const nextValue = !paused;
    setPaused(nextValue);
    localStorage.setItem(STORAGE_KEY, String(nextValue));
    document.documentElement.classList.toggle('animations-paused', nextValue);

    if (nextValue) {
      pauseRunningAnimations();
      return;
    }
    resumeControlledAnimations();
  };

  return <AnimationContext.Provider value={{ paused, toggle }}>{children}</AnimationContext.Provider>;
}

export const useAnimationPreference = () => useContext(AnimationContext);
