import type { Metadata } from 'next';
import { Press_Start_2P, Inter } from 'next/font/google';
import './globals.css';
import '@coinbase/onchainkit/styles.css';
import { Providers } from './providers';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Pixelate',
  description: 'A shared pixel canvas on Base — like r/place, but onchain',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pixelFont.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <Providers>
          <Header />
          <div className="flex-1 flex overflow-hidden">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
