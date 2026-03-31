import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

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
  title: 'Old Town Free Enterprise District',
  description: "A proposal to make Portland's Old Town / Chinatown a zero local business-income-tax zone for ten years.",
  openGraph: {
    title: 'Old Town Free Enterprise District',
    description: "A proposal to make Portland's Old Town / Chinatown a zero local business-income-tax zone for ten years.",
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
