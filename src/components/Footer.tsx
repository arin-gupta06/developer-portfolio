'use client';

import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#07080c',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#94a3b8',
        padding: '64px 48px 40px 48px',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(129, 140, 248, 0.4), transparent)',
        }}
      />

      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '32px',
          }}
        >
          {/* Logo & Tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '16px',
                  letterSpacing: '1px',
                  color: '#ffffff',
                  boxShadow: '0 4px 16px rgba(56, 189, 248, 0.3)',
                }}
              >
                AG
              </div>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.02em' }}>
                Arin Gupta
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, maxWidth: '340px' }}>
              Full-Stack Developer & Systems Enthusiast building fast, reliable, and aesthetically pleasing digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            {[
              { label: 'Home', href: '#home' },
              { label: 'About', href: '#about' },
              { label: 'Magazine', href: '#magazine' },
              { label: 'Achievements', href: '#achievements' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  const id = link.href.replace('#', '');
                  const el = document.getElementById(id);
                  if (el) {
                    const offset = 75;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = el.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({
                      top: id === 'home' ? 0 : offsetPosition,
                      behavior: 'smooth',
                    });
                    window.history.pushState(null, '', link.href);
                  }
                }}
                style={{
                  color: '#94a3b8',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials & Back to Top */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="https://github.com/arin-gupta06"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              title="GitHub Profile"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cbd5e1',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.color = '#cbd5e1';
              }}
            >
              <Github size={16} />
            </a>

            <a
              href="https://www.linkedin.com/in/arin-gupta-2b94b032a/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cbd5e1',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#38bdf8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.color = '#cbd5e1';
              }}
            >
              <Linkedin size={16} />
            </a>

            <a
              href="mailto:aringupta2244@gmail.com"
              aria-label="Email Arin Gupta"
              title="Email aringupta2244@gmail.com"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cbd5e1',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#f59e0b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.color = '#cbd5e1';
              }}
            >
              <Mail size={16} />
            </a>

            <button
              onClick={scrollToTop}
              title="Back to Top"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(129, 140, 248, 0.15)',
                border: '1px solid rgba(129, 140, 248, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#818cf8',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(129, 140, 248, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(129, 140, 248, 0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '12px',
            color: '#64748b',
          }}
        >
          <div>
            © {new Date().getFullYear()} Arin Gupta. Designed & built with obsessive attention to craft.
          </div>
          {/* Handwritten Signature: Arin Gupta */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: "'Caveat', 'Dancing Script', cursive",
                fontSize: '26px',
                fontWeight: 600,
                color: '#e2e8f0',
                letterSpacing: '0.04em',
                transform: 'rotate(-2deg)',
                display: 'inline-block',
                textShadow: '0 0 16px rgba(255, 255, 255, 0.12)',
                userSelect: 'none',
                transition: 'all 0.25s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#38bdf8';
                e.currentTarget.style.textShadow = '0 0 20px rgba(56, 189, 248, 0.5)';
                e.currentTarget.style.transform = 'rotate(-2deg) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#e2e8f0';
                e.currentTarget.style.textShadow = '0 0 16px rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.transform = 'rotate(-2deg) scale(1)';
              }}
            >
              Arin Gupta
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
