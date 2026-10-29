'use client';

import React from 'react';
import { Clock, Briefcase, Award, MapPin, Mail, Sparkles } from 'lucide-react';

export default function AboutSection() {
  const infoItems = [
    {
      icon: Briefcase,
      label: 'ROLE',
      value: 'Software & AI/ML Developer',
      href: null,
    },
    {
      icon: Award,
      label: 'EDUCATION',
      value: 'MITS Gwalior • B.Tech CS & Design (8.3 CGPA)',
      href: null,
    },
    {
      icon: MapPin,
      label: 'LEADERSHIP',
      value: 'GitHub Campus Coordinator & Open Source',
      href: null,
    },
    {
      icon: Mail,
      label: 'EMAIL',
      value: 'aringupta2244@gmail.com',
      href: 'mailto:aringupta2244@gmail.com',
    },
  ];

  return (
    <section
      id="about"
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
        id="about-bg-image"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/about-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
        }}
      />

      {/* Atmospheric Vignette Overlay */}
      <div
        id="about-atmosphere-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to right, 
              rgba(9, 10, 15, 0.98) 0%, 
              rgba(9, 10, 15, 0.92) 35%, 
              rgba(9, 10, 15, 0.65) 55%, 
              rgba(9, 10, 15, 0.2) 80%, 
              rgba(9, 10, 15, 0.05) 100%),
            linear-gradient(to top, 
              rgba(9, 10, 15, 0.9) 0%, 
              transparent 20%),
            linear-gradient(to bottom, 
              rgba(9, 10, 15, 0.8) 0%, 
              transparent 20%)
          `,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Section Content */}
      <div
        id="about-content-grid"
        className="about-content-grid"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1440px',
          width: '100%',
          margin: '0 auto',
          padding: 'clamp(80px, 10vw, 120px) clamp(20px, 4vw, 64px) 80px clamp(20px, 4vw, 64px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
          gap: '64px',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        {/* Left Column: Story & Info Cards */}
        <div>
          {/* Tag: ABOUT ME */}
          <div
            id="about-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#38bdf8',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            <Clock size={15} style={{ strokeWidth: 2.2 }} />
            <span>ABOUT ME</span>
          </div>

          {/* Headline */}
          <h2
            id="about-title"
            style={{
              fontSize: 'clamp(40px, 4.8vw, 64px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              marginBottom: '28px',
            }}
          >
            The person <br />
            behind the{' '}
            <span
              className="text-gradient-purple"
              style={{
                display: 'inline-block',
                position: 'relative',
              }}
            >
              code
            </span>
          </h2>

          {/* Bio Text */}
          <div
            style={{
              maxWidth: '520px',
              marginBottom: '38px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            <p
              style={{
                fontSize: '16.5px',
                lineHeight: 1.7,
                color: '#cbd5e1',
                margin: 0,
              }}
            >
              I&apos;m currently studying Computer Science &amp; Design at{' '}
              <strong style={{ color: '#ffffff', fontWeight: 600 }}>MITS Gwalior</strong>. I focus on building reliable software and practical AI—from clean backend APIs and responsive web interfaces to machine learning pipelines.
            </p>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.75,
                color: '#94a3b8',
                margin: 0,
              }}
            >
              Whether engineering responsive web applications, optimizing backend workflows, or deploying machine learning models for semantic analysis, I focus on building fast, dependable tools that solve real problems with simplicity and care.
            </p>
          </div>

          {/* Quick Info Stack Cards */}
          <div
            id="about-info-stack"
            style={{
              maxWidth: '460px',
              backgroundColor: 'rgba(18, 20, 29, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '18px',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              overflow: 'hidden',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
            }}
          >
            {infoItems.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '18px 24px',
                    borderBottom:
                      idx < infoItems.length - 1
                        ? '1px solid rgba(255, 255, 255, 0.06)'
                        : 'none',
                    transition: 'background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      'rgba(255, 255, 255, 0.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {/* Icon Box */}
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(99, 102, 241, 0.12)',
                      border: '1px solid rgba(99, 102, 241, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#818cf8',
                      flexShrink: 0,
                    }}
                  >
                    <IconComp size={19} style={{ strokeWidth: 2 }} />
                  </div>

                  {/* Label & Value */}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        color: '#64748b',
                        textTransform: 'uppercase',
                        fontFamily: 'Space Grotesk, sans-serif',
                        marginBottom: '2px',
                      }}
                    >
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{
                          fontSize: '15px',
                          fontWeight: 600,
                          color: '#f8fafc',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#818cf8';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#f8fafc';
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span
                        style={{
                          fontSize: '15px',
                          fontWeight: 600,
                          color: '#f8fafc',
                        }}
                      >
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Floating Amber Feature Card */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Subtle Ambient Sparkle / Glow Accents */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '-20px',
              color: 'rgba(245, 158, 11, 0.4)',
              pointerEvents: 'none',
            }}
          >
            <Sparkles size={24} />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '15%',
              right: '-10px',
              color: 'rgba(129, 140, 248, 0.3)',
              pointerEvents: 'none',
            }}
          >
            <Sparkles size={20} />
          </div>

          {/* Amber Floating Card */}
          <div
            id="amber-feature-card"
            style={{
              width: '100%',
              maxWidth: '380px',
              backgroundColor: 'rgba(28, 22, 16, 0.65)',
              border: '1px solid rgba(245, 158, 11, 0.32)',
              borderRadius: '24px',
              padding: '36px 32px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: `
                0 25px 60px -15px rgba(245, 158, 11, 0.2), 
                0 0 0 1px rgba(245, 158, 11, 0.15) inset,
                0 10px 30px rgba(0, 0, 0, 0.5)
              `,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.5)';
              e.currentTarget.style.boxShadow = `
                0 32px 70px -15px rgba(245, 158, 11, 0.3), 
                0 0 0 1px rgba(245, 158, 11, 0.25) inset,
                0 15px 35px rgba(0, 0, 0, 0.6)
              `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.32)';
              e.currentTarget.style.boxShadow = `
                0 25px 60px -15px rgba(245, 158, 11, 0.2), 
                0 0 0 1px rgba(245, 158, 11, 0.15) inset,
                0 10px 30px rgba(0, 0, 0, 0.5)
              `;
            }}
          >
            {/* Top Amber Icon */}
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f59e0b',
                marginBottom: '24px',
                boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)',
              }}
            >
              <Briefcase size={22} style={{ strokeWidth: 2 }} />
            </div>

            {/* Headline */}
            <h3
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '14px',
                letterSpacing: '-0.02em',
              }}
            >
              Software &amp; AI/ML Developer
            </h3>

            {/* Bio Description */}
            <p
              style={{
                fontSize: '14.5px',
                lineHeight: 1.65,
                color: '#cbd5e1',
                marginBottom: '28px',
              }}
            >
              A curious developer building clean web architectures, reliable backends, and practical machine learning solutions people genuinely enjoy using.
            </p>

            {/* Bottom Status Chips */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {/* Chip 1: Always Learning */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 16px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#e2e8f0',
                }}
              >
                <Clock size={14} style={{ color: '#f59e0b' }} />
                <span>Always Learning</span>
              </div>

              {/* Chip 2: Available for Work */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 16px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#e2e8f0',
                }}
              >
                <span
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    width: '7px',
                    height: '7px',
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
                <span>Available for Work</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
