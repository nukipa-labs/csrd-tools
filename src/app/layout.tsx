import type { Metadata } from 'next';
import { NukipaFeedback } from '@/components/NukipaFeedback';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { displayFont, bodyFont, monoFont } from '@/lib/fonts';
import { SITE_LIVE } from '@/lib/seo';
import './globals.css';

// PLATFORM CONTRACT: <NukipaFeedback /> must remain inside <body> for the
// design-review feedback loop. Do not remove.

export const metadata: Metadata = {
  metadataBase: new URL('https://csrd-tools.com'),
  // Until the public domain resolves, keep the whole site out of the index so
  // the csrd.nukipa.com preview is not crawled with canonicals pointing at a
  // domain that does not resolve. Flip SITE_LIVE in lib/seo.ts to go live.
  robots: SITE_LIVE
    ? undefined
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  title: {
    default: 'CSRD Tools: the plain-English CSRD & ESRS hub',
    template: '%s · CSRD Tools'
  },
  description:
    'Plain-English answers, free tools and trustworthy updates on the EU Corporate Sustainability Reporting Directive (CSRD), the ESRS standards and the Omnibus changes.',
  applicationName: 'CSRD Tools',
  openGraph: {
    type: 'website',
    siteName: 'CSRD Tools',
    title: 'CSRD Tools: the plain-English CSRD & ESRS hub',
    description:
      'Find your way through EU sustainability reporting. Plain-English answers, free tools and trustworthy updates on CSRD, ESRS and the Omnibus.',
    url: 'https://csrd-tools.com',
    images: [{ url: '/brand/og.png', width: 1200, height: 630, alt: 'CSRD Tools' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSRD Tools: the plain-English CSRD & ESRS hub',
    description:
      'Find your way through EU sustainability reporting. Plain-English answers, free tools and trustworthy updates on CSRD, ESRS and the Omnibus.',
    images: ['/brand/og.png']
  },
  alternates: { canonical: '/' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400..700,0..1,0&display=block"
        />
      </head>
      <body className="bg-paper text-ink antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <NukipaFeedback />
      </body>
    </html>
  );
}
