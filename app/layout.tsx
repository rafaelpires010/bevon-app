import './globals.css';
import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { FloatingCTA } from '@/components/floating-cta';
import { SiteBackground } from '@/components/SiteBackground';

/**
 * A fonte da marca.
 *
 * O guia da Bevon chama a face de "Bevon Sans", que não é uma fonte pública
 * e não pode ser instalada. A Archivo é a correspondência mais próxima do
 * desenho do guia: grotesca geométrica, mesmo 'a' de dois andares, e a faixa
 * de pesos 100 a 900 cobre os sete pesos que o guia especifica, de Thin a
 * ExtraBold. Se um dia o arquivo real da Bevon Sans existir, a troca é aqui
 * e só aqui.
 */
const bevonSans = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bevon',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bevon.com.br'),
  title: 'Bevon - Marketing Digital e Desenvolvimento de Software em BH',
  description:
    'A Bevon é uma agência especializada em marketing digital e desenvolvimento de software em Belo Horizonte. Aumente suas vendas com estratégias personalizadas de marketing digital, SEO, desenvolvimento web e aplicativos.',
  keywords:
    'marketing digital bh, desenvolvimento de software, agência marketing digital, seo, desenvolvimento web, aplicativos, marketing digital belo horizonte',
  authors: [{ name: 'Bevon Digital' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.bevon.com.br',
    siteName: 'Bevon Digital',
    title: 'Bevon - Marketing Digital e Desenvolvimento de Software em BH',
    description:
      'Transforme sua presença digital com a Bevon. Especialistas em marketing digital e desenvolvimento de software em Belo Horizonte.',
    images: [
      {
        url: '/og-image.jpg',
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
    <html lang="pt-BR" className={bevonSans.variable}>
      <body className="font-sans">
        {/* Cena 3D persistente: um único canvas fixo por trás de todas as páginas. */}
        <SiteBackground />
        <Navbar />
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}
