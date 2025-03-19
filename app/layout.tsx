import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { FloatingCTA } from '@/components/floating-cta';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bevon - Marketing Digital e Desenvolvimento de Software em BH',
  description: 'A Bevon é uma agência especializada em marketing digital e desenvolvimento de software em Belo Horizonte. Aumente suas vendas com estratégias personalizadas de marketing digital, SEO, desenvolvimento web e aplicativos.',
  keywords: 'marketing digital bh, desenvolvimento de software, agência marketing digital, seo, desenvolvimento web, aplicativos, marketing digital belo horizonte',
  authors: [{ name: 'Bevon Digital' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.bevon.com.br',
    siteName: 'Bevon Digital',
    title: 'Bevon - Marketing Digital e Desenvolvimento de Software em BH',
    description: 'Transforme sua presença digital com a Bevon. Especialistas em marketing digital e desenvolvimento de software em Belo Horizonte.',
    images: [
      {
        url: '/og-image.jpg', // Crie uma imagem específica para compartilhamento
        width: 1200,
        height: 630,
        alt: 'Bevon Digital - Marketing e Desenvolvimento',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'adicione_seu_código_do_google_search_console',
  },
  icons: {
    icon: '/bevon-icon.png',
    shortcut: '/bevon-icon.png',
    apple: '/bevon-icon.png',
  },
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