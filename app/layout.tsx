import type { Metadata } from 'next';
import './globals.css';
import '@coinbase/onchainkit/styles.css';
import { Providers } from './providers';
import { Header } from './components/Header';

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
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a]">
        <Providers>
          <Header />
          <main className="pt-16">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
