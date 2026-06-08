import type { ElementType, ReactNode } from 'react';

const SIZES = {
  sm: 'max-w-3xl',   // 48rem
  md: 'max-w-5xl',   // 64rem
  lg: 'max-w-7xl'    // 80rem
} as const;

export function Container({
  size = 'lg',
  as: Tag = 'div',
  className = '',
  children
}: {
  size?: 'sm' | 'md' | 'lg';
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`mx-auto w-full ${SIZES[size]} px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
