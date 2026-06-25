import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_KEYWORDS } from '@/lib/site';

const geist = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Portland Old Town / Chinatown`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${SITE_NAME} — Portland Old Town / Chinatown`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Portland Old Town / Chinatown`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Public Policy',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
