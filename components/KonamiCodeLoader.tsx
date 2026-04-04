'use client';

import { useEffect, useState, lazy, Suspense } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

const KonamiCode = lazy(() => import('./KonamiCode'));

export default function KonamiCodeLoader() {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (triggered) return;
    let keys: string[] = [];
    const handleKeyDown = (e: KeyboardEvent) => {
      keys = [...keys, e.key].slice(-KONAMI_CODE.length);
      if (
        keys.length === KONAMI_CODE.length &&
        keys.every((k, i) => k === KONAMI_CODE[i])
      ) {
        setTriggered(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggered]);

  if (!triggered) return null;

  return (
    <Suspense>
      <KonamiCode initialPhase="shutdown" />
    </Suspense>
  );
}
