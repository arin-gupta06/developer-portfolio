import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Arin Gupta — Full-Stack Developer & AI Systems Engineer',
  description:
    'Portfolio of Arin Gupta, Full-Stack Developer & Systems Engineer. Explore high-performance systems spanning Edge AI telemetry, AST code cartography, legal AI, and verified engineering credentials.',
  keywords: [
    'Arin Gupta',
    'Full-Stack Developer',
    'AI Engineer',
    'Systems Engineer',
    'Software Architecture',
    'React',
    'Next.js',
    'TypeScript',
    'Python',
    'FastAPI',
    'Distributed Systems',
    'AST Cartography',
    'Edge AI',
    'Portfolio',
  ],
  authors: [{ name: 'Arin Gupta', url: 'https://github.com/arin-gupta06' }],
  creator: 'Arin Gupta',
  publisher: 'Arin Gupta',
  metadataBase: new URL('https://arin-gupta.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github.com/arin-gupta06',
    title: 'Arin Gupta — Full-Stack Developer & AI Systems Engineer',
    description:
      'Explore verified engineering projects, real-time telemetry pipelines, interactive digital monographs, and national hackathon milestones.',
    siteName: 'Arin Gupta Developer Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arin Gupta — Full-Stack Developer & AI Systems Engineer',
    description:
      'Full-stack developer architecting intelligent systems, AST cartography visualizers, and edge telemetry platforms.',
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
      jobTitle: 'Full-Stack Developer & Systems Engineer',
      url: 'https://github.com/arin-gupta06',
      sameAs: [
        'https://github.com/arin-gupta06',
        'https://linkedin.com/in/arin-gupta',
      ],
      knowsAbout: [
        'Full-Stack Web Development',
        'Artificial Intelligence',
        'System Architecture',
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
        'Full-stack developer building purposeful software systems with intelligent telemetry, AST cartography, and high-performance design.',
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
      <body>{children}</body>
    </html>
  );
}
