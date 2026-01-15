import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pixelate',
  description: 'An onchain pixel canvas on Base',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
