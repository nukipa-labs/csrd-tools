'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { NAV_GROUPS, PRIMARY_CTA, type NavGroup } from '@/lib/nav';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={
        'sticky top-0 z-20 transition-[background-color,border-color,box-shadow] duration-[var(--duration-slow)] ' +
        (scrolled
          ? 'bg-paper/95 border-b border-line shadow-[0_1px_0_rgba(15,42,63,0.06)] backdrop-blur-[2px]'
          : 'bg-paper border-b border-transparent')
      }
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8 h-16">
        <Link href="/" aria-label="CSRD Tools home" className="flex items-center">
          <Logo tone="light" size="md" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_GROUPS.map((group) => (
            <DesktopGroup
              key={group.label}
              group={group}
              active={isActive(group.href)}
              open={openGroup === group.label}
              onEnter={() => setOpenGroup(group.label)}
              onLeave={() => setOpenGroup(null)}
            />
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={PRIMARY_CTA.href}
            className="hidden sm:inline-flex min-h-[44px] items-center rounded-md bg-accent px-4 font-body font-semibold text-ink transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:[transform:translateY(-2px)] hover:shadow-[var(--shadow-cta-hover)] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            {PRIMARY_CTA.label}
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <MobileDrawer open={open} onClose={() => setOpen(false)} isActive={isActive} />
    </header>
  );
}

function DesktopGroup({
  group,
  active,
  open,
  onEnter,
  onLeave
}: {
  group: NavGroup;
  active: boolean;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const linkCls =
    'inline-flex items-center gap-1 rounded-md px-3 py-2 text-[0.95rem] font-medium text-ink hover:text-primary transition-colors ' +
    (active ? 'text-primary' : '');

  if (!group.items) {
    return (
      <li>
        <Link href={group.href} className={linkCls}>
          <span className={active ? 'border-b-2 border-accent pb-0.5' : ''}>{group.label}</span>
        </Link>
      </li>
    );
  }

  return (
    <li className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Link
        href={group.href}
        className={linkCls}
        aria-haspopup="true"
        aria-expanded={open}
        onFocus={onEnter}
      >
        <span className={active ? 'border-b-2 border-accent pb-0.5' : ''}>{group.label}</span>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 opacity-60" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Link>
      <div
        className={
          'absolute left-0 top-full min-w-56 origin-top rounded-card border border-line bg-card p-1.5 shadow-[var(--shadow-elevated)] transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-in-out)] ' +
          (open
            ? 'pointer-events-auto opacity-100 translate-y-0'
            : 'pointer-events-none opacity-0 -translate-y-1.5')
        }
      >
        {group.items.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className="block rounded-md px-3 py-2 text-sm text-ink hover:bg-sand-tint hover:text-primary transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </li>
  );
}

function MobileDrawer({
  open,
  onClose,
  isActive
}: {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  return (
    <div className="lg:hidden" aria-hidden={!open}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={
          'fixed inset-0 z-30 bg-ink/35 transition-opacity duration-[var(--duration-slow)] ' +
          (open ? 'opacity-100' : 'pointer-events-none opacity-0')
        }
      />
      {/* Drawer from the right */}
      <div
        className={
          'fixed right-0 top-0 z-30 h-[100dvh] w-[86%] max-w-sm overflow-y-auto bg-paper shadow-[var(--shadow-elevated)] transition-transform duration-[var(--duration-slow)] ease-[var(--ease-drawer)] ' +
          (open ? 'translate-x-0' : 'translate-x-full')
        }
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-line">
          <Logo tone="light" size="sm" />
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6 18 18M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="p-5">
          <Link
            href={PRIMARY_CTA.href}
            className="flex min-h-[48px] items-center justify-center rounded-md bg-accent px-4 font-body font-semibold text-ink"
          >
            {PRIMARY_CTA.label}
          </Link>

          <ul className="mt-6 space-y-1">
            {NAV_GROUPS.map((group) => (
              <li key={group.label}>
                <Link
                  href={group.href}
                  className={
                    'block rounded-md px-3 py-3 text-base font-medium ' +
                    (isActive(group.href) ? 'text-primary' : 'text-ink')
                  }
                >
                  {group.label}
                </Link>
                {group.items && (
                  <ul className="ml-3 border-l border-line pl-3 pb-2">
                    {group.items.map((item) => (
                      <li key={item.href + item.label}>
                        <Link
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-sm text-muted hover:text-primary"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
