import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#090a0f',
        color: '#ffffff',
        padding: '24px',
        textAlign: 'center',
        fontFamily: 'Space Grotesk, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '72px', fontWeight: 800, color: '#818cf8', marginBottom: '16px' }}>404</h1>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>Page Not Found</h2>
      <p style={{ color: '#94a3b8', maxWidth: '420px', marginBottom: '28px', lineHeight: 1.6 }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '12px 24px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(129, 140, 248, 0.2)',
          border: '1px solid rgba(129, 140, 248, 0.4)',
          color: '#ffffff',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'all 0.2s ease',
        }}
      >
        Return to Home
      </Link>
    </main>
  );
}
