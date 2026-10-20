'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
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
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#090a0f',
      }}
    >
      {/* Background Image Layer */}
      <div
        id="hero-bg-image"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'right 20% center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
        }}
      />

      {/* Atmospheric Vignette & Moody Gradient Overlay */}
      <div
        id="hero-atmosphere-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to right, 
              rgba(9, 10, 15, 0.98) 0%, 
              rgba(9, 10, 15, 0.92) 28%, 
              rgba(9, 10, 15, 0.75) 45%, 
              rgba(9, 10, 15, 0.25) 65%, 
              rgba(9, 10, 15, 0.1) 100%),
            linear-gradient(to top, 
              rgba(9, 10, 15, 0.9) 0%, 
              transparent 25%),
            linear-gradient(to bottom, 
              rgba(9, 10, 15, 0.7) 0%, 
              transparent 20%)
          `,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Hero Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1440px',
          width: '100%',
          margin: '0 auto',
          padding: '120px 64px 80px 64px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div style={{ maxWidth: '620px' }}>
          {/* Status Badge */}
          <div
            id="status-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              marginBottom: '32px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            {/* Glowing Green Dot */}
            <span
              style={{
                position: 'relative',
                display: 'inline-flex',
                width: '8px',
                height: '8px',
              }}
            >
              <span
                className="pulse-dot"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                }}
              />
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#4ade80',
                textTransform: 'uppercase',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              AVAILABLE FOR WORK
            </span>
          </div>

          {/* Main Headline */}
          <h1
            id="hero-title"
            style={{
              fontSize: 'clamp(46px, 5.8vw, 76px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              marginBottom: '24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Crafting</span>
            <span
              className="text-gradient-purple"
              style={{
                display: 'inline-block',
                position: 'relative',
              }}
            >
              Digital
            </span>
            <span>Experiences</span>
          </h1>

          {/* Subtitle */}
          <p
            id="hero-subtitle"
            style={{
              fontSize: '17px',
              fontWeight: 400,
              lineHeight: 1.65,
              color: '#94a3b8',
              maxWidth: '460px',
              marginBottom: '36px',
            }}
          >
            Full-stack developer building purposeful solutions with system thinking and AI-driven design.
          </p>

          {/* Action Buttons */}
          <div
            id="hero-cta-buttons"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            {/* Primary CTA */}
            <Link
              href="#magazine"
              onClick={scrollTo('magazine')}
              id="cta-view-work"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 26px',
                borderRadius: '10px',
                fontSize: '14.5px',
                fontWeight: 600,
                color: '#ffffff',
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                boxShadow: '0 8px 24px -4px rgba(99, 102, 241, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 28px -4px rgba(99, 102, 241, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.2) inset';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(99, 102, 241, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.1) inset';
              }}
            >
              <span>View My Work</span>
              <ArrowRight size={16} style={{ strokeWidth: 2.2 }} />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="#about"
              onClick={scrollTo('about')}
              id="cta-my-journey"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '13px 26px',
                borderRadius: '10px',
                fontSize: '14.5px',
                fontWeight: 500,
                color: '#e2e8f0',
                backgroundColor: 'rgba(20, 22, 32, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(30, 34, 48, 0.85)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(20, 22, 32, 0.7)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              My Journey
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
