import { Spectral, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';

// DESIGN.md type system: Spectral (display, roman only), Hanken Grotesk (body),
// JetBrains Mono (datestamps / data labels only). Banned picks (Fraunces/Inter)
// overridden with justification in DESIGN.md.

export const displayFont = Spectral({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal'],
  variable: '--font-display',
  display: 'swap'
});

export const bodyFont = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap'
});

export const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap'
});
