import Link from 'next/link';
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-md font-body font-semibold ' +
  'min-h-[44px] text-base text-center select-none ' +
  'transition-[transform,box-shadow,background-color,border-color,color] duration-[var(--duration-base)] ease-[var(--ease-out)] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ' +
  'active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none';

const VARIANTS: Record<Variant, string> = {
  // amber bg + INK label (never white). Lift + amber shadow on hover.
  primary:
    'bg-accent text-ink px-6 py-3 ' +
    'hover:[transform:translateY(-2px)] hover:shadow-[var(--shadow-cta-hover)]',
  // forest outline
  secondary:
    'border-[1.5px] border-primary text-primary bg-transparent px-6 py-3 ' +
    'hover:bg-primary/[0.06] hover:[transform:translateY(-2px)]',
  // forest text + animated underline, no box
  ghost:
    'text-primary px-1 py-1 link-underline'
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type AsAnchor = CommonProps & { as?: 'a'; href: string } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'className' | 'children'
>;
type AsButton = CommonProps & { as: 'button' } & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'children'
>;

export function Button(props: AsAnchor | AsButton) {
  const { variant = 'primary', className = '', children } = props;
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;

  if (props.as === 'button') {
    const { as: _as, variant: _v, className: _c, children: _ch, ...rest } = props;
    return (
      <button className={cls} {...rest}>
        {children}
      </button>
    );
  }

  const { as: _as, variant: _v, className: _c, children: _ch, href, ...rest } = props;
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
