import type { Metadata, Viewport } from 'next';
import './globals.css';
import AnalyticsProvider from '@/components/AnalyticsProvider';

export const metadata: Metadata = {
  title: 'Arin Gupta — Full-Stack Developer',
  description:
    "Portfolio of Arin Gupta, Full-Stack Developer. Explore projects in web development, practical AI tools, open-source work, and engineering milestones.",
  keywords: [
    'Arin Gupta',
    'Full-Stack Developer',
    'AI Developer',
    'Software Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Python',
    'FastAPI',
    'Node.js',
    'Portfolio',
  ],
  authors: [{ name: 'Arin Gupta', url: 'https://github.com/arin-gupta06' }],
  creator: 'Arin Gupta',
  publisher: 'Arin Gupta',
  metadataBase: new URL('https://arin-gupta.dev'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github.com/arin-gupta06',
    title: 'Arin Gupta — Full-Stack Developer',
    description:
      'Explore projects, interactive tools, and hackathon milestones built by Arin Gupta.',
    siteName: 'Arin Gupta Developer Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arin Gupta — Full-Stack Developer',
    description:
      'Full-stack developer building clean web apps and practical software tools.',
    creator: '@arin_gupta',
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#090a0f',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://github.com/arin-gupta06#person',
      name: 'Arin Gupta',
      jobTitle: 'Full-Stack Developer',
      url: 'https://github.com/arin-gupta06',
      sameAs: [
        'https://github.com/arin-gupta06',
        'https://linkedin.com/in/arin-gupta',
      ],
      knowsAbout: [
        'Full-Stack Web Development',
        'Artificial Intelligence',
        'React',
        'Next.js',
        'TypeScript',
        'Python',
        'FastAPI',
        'Node.js',
        'PostgreSQL',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://arin-gupta.dev/#website',
      url: 'https://arin-gupta.dev',
      name: 'Arin Gupta — Developer Portfolio',
      description:
        'Full-stack developer building clean, fast web apps and practical software tools.',
      publisher: {
        '@id': 'https://github.com/arin-gupta06#person',
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  );
}
