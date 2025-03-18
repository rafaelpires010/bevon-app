import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { FloatingCTA } from '@/components/floating-cta';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bevon - Marketing Digital e Desenvolvimento de Software',
  description: 'Transforme sua presença digital com soluções personalizadas de marketing e desenvolvimento de software.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Navbar />
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}