'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * IntersectionObserver staggered fade-up. translateY 28px -> 0, 480ms,
 * 80ms stagger via `delay` (delay is a step index multiplied by 80ms).
 * Dependency-free; honors prefers-reduced-motion via the .reveal CSS.
 */
export function RevealOnScroll({
  children,
  delay = 0,
  direction = 'up'
}: {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}`}
      data-direction={direction}
      style={{ ['--reveal-delay' as string]: `${delay * 80}ms` }}
    >
      {children}
    </div>
  );
}
