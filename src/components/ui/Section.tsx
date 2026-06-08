import type { ReactNode } from 'react';
import { Container } from './Container';

type Background = 'paper' | 'sand' | 'forest' | 'ink';

const BG: Record<Background, string> = {
  paper:  'bg-paper text-ink',
  sand:   'bg-sand-tint text-ink',
  forest: 'bg-primary text-paper',
  ink:    'bg-ink text-paper'
};

const isDark = (bg: Background) => bg === 'forest' || bg === 'ink';

export function Section({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  background = 'paper',
  id,
  className = '',
  containerSize = 'lg',
  children
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  background?: Background;
  id?: string;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
}) {
  const dark = isDark(background);
  const alignCls = align === 'center' ? 'text-center mx-auto' : '';
  const hasHeader = eyebrow || title || subtitle;

  return (
    <section
      id={id}
      className={`relative py-16 lg:py-24 ${BG[background]} ${className}`}
    >
      <Container size={containerSize}>
        {hasHeader && (
          <div className={`max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${alignCls}`}>
            {eyebrow && (
              <p
                className={`font-body text-xs font-semibold uppercase tracking-[0.14em] ${
                  dark ? 'text-accent' : 'text-accent-deep'
                }`}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={`font-display font-semibold text-3xl lg:text-4xl leading-tight ${
                  eyebrow ? 'mt-3' : ''
                } ${dark ? 'text-paper' : 'text-ink'}`}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={`mt-4 text-base lg:text-lg leading-relaxed ${
                  dark ? 'text-paper/80' : 'text-muted'
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children && <div className={hasHeader ? 'mt-12' : ''}>{children}</div>}
      </Container>
    </section>
  );
}
