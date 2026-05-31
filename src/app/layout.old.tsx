// @ts-nocheck
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevTools Hub - Professional Developer Tools & AI Generators',
  description: 'Free online developer tools and AI generators. JSON formatter, Base64 encoder, UUID generator, and more. Fast, secure, and privacy-focused.',
  keywords: ['developer tools', 'online tools', 'json formatter', 'base64', 'uuid', 'ai tools'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
