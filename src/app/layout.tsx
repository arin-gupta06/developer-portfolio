import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Arin Gupta — Full-Stack Developer & AI Systems',
  description:
    'Full-stack developer building purposeful solutions with system thinking and AI-driven design. Explore portfolio, engineering systems, and digital magazine.',
  keywords: ['Arin Gupta', 'Full-Stack Developer', 'Portfolio', 'AI Engineer', 'System Design'],
  authors: [{ name: 'Arin Gupta' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#090a0f',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
