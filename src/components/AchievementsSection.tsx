'use client';

import React, { useState } from 'react';
import { Trophy, Award, Star, Code2, Users, Rocket, ExternalLink, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function AchievementsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const stats = [
    { value: 'Finalist', label: 'Vibestate Hackathon', sub: 'Guardian App — National Finalist' },
    { value: 'SWE Intern', label: 'ByteEdu Platform', sub: 'Full-Stack Software Development' },
    { value: 'AI/ML Intern', label: 'DecodeLabs Tech', sub: 'Machine Learning & Neural Inference' },
    { value: 'Contributor', label: 'Nexus Spring of Code', sub: 'NSoC Open Source Program' },
  ];

  const milestones = [
    {
      id: '01',
      category: 'HACKATHON FINALIST',
      title: 'Top Finalist — Guardian App',
      org: 'Vibestate Hackathon • 2024',
      badge: 'National Finalist',
      accentColor: '#f59e0b',
      accentGlow: 'rgba(245, 158, 11, 0.25)',
      description:
        'Selected as top finalists at Vibestate for architecting Guardian, an emergency distress and safety telemetry platform engineered under intense 36-hour hackathon constraints.',
      tech: ['React Native', 'FastAPI', 'Edge AI', 'WebSockets', 'PyTorch'],
      impact: 'Demonstrated real-time emergency telemetry pipeline and rapid triage response before the national jury panel.',
    },
    {
      id: '02',
      category: 'SOFTWARE ENGINEERING INTERNSHIP',
      title: 'Software Developer Intern',
      org: 'ByteEdu • 2024',
      badge: 'SWE Intern',
      accentColor: '#38bdf8',
      accentGlow: 'rgba(56, 189, 248, 0.25)',
      description:
        'Built and scaled production full-stack features, interactive learning portals, and reliable RESTful APIs supporting active student workflows.',
      tech: ['TypeScript', 'React', 'Node.js', 'REST APIs', 'PostgreSQL', 'TailwindCSS'],
      impact: 'Optimized client-side rendering performance, shipped production curriculum modules, and elevated user experience benchmarks.',
    },
    {
      id: '03',
      category: 'ARTIFICIAL INTELLIGENCE & RESEARCH',
      title: 'AI / ML Intern',
      org: 'DecodeLabs • 2024 - 2025',
      badge: 'AI/ML Intern',
      accentColor: '#a855f7',
      accentGlow: 'rgba(168, 85, 247, 0.25)',
      description:
        'Engineered deep learning pipelines, accelerated model inference speeds, and integrated intelligent predictive capabilities into production applications.',
      tech: ['Python', 'PyTorch', 'TensorFlow', 'LLMs', 'Computer Vision', 'FastAPI'],
      impact: 'Accelerated neural network inference latency and benchmarked predictive model accuracy across production datasets.',
    },
    {
      id: '04',
      category: 'OPEN SOURCE PROGRAM',
      title: 'Open Source Contributor',
      org: 'Nexus Spring of Code (NSoC) • 2024',
      badge: 'NSoC Contributor',
      accentColor: '#10b981',
      accentGlow: 'rgba(16, 185, 129, 0.25)',
      description:
        'Selected as an active contributor for Nexus Spring of Code (NSoC), collaborating on open-source repositories, resolving critical issues, and implementing community-driven features.',
      tech: ['Open Source', 'Git & GitHub', 'Python', 'TypeScript', 'CI/CD', 'Code Review'],
      impact: 'Authored validated pull requests, resolved core codebase issues, and collaborated with distributed developer teams.',
    },
  ];

  return (
    <section
      id="achievements"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#090a0f',
        color: '#f8fafc',
        padding: '120px 48px 120px 48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Image Layer (Unique Developer Workstation with Warm Sphere Lamp & Code Laptop) */}
      <div
        id="achievements-bg-image"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/achievements-unique-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'right 20% center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
          opacity: 0.85,
        }}
      />

      {/* Atmospheric Vignette & Moody Gradient Overlay */}
      <div
        id="achievements-atmosphere-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to right, 
              rgba(9, 10, 15, 0.95) 0%, 
              rgba(9, 10, 15, 0.88) 32%, 
              rgba(9, 10, 15, 0.65) 65%, 
              rgba(9, 10, 15, 0.3) 100%),
            linear-gradient(to top, 
              rgba(9, 10, 15, 0.95) 0%, 
              rgba(9, 10, 15, 0.45) 25%, 
              transparent 55%),
            linear-gradient(to bottom, 
              rgba(9, 10, 15, 0.95) 0%, 
              rgba(9, 10, 15, 0.45) 20%, 
              transparent 50%)
          `,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Background Subtle Ambient Glows */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '15%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.04) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(129, 140, 248, 0.05) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              color: '#f59e0b',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '18px',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            <Sparkles size={13} />
            <span>HONORS & MILESTONES</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(36px, 4.5vw, 54px)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              marginBottom: '16px',
              lineHeight: 1.15,
            }}
          >
            Recognized for{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 40%, #e2e8f0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Engineering Impact
            </span>
          </h2>

          <p
            style={{
              fontSize: '16px',
              color: '#94a3b8',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Proven industry contributions across software engineering internships, AI/ML research pipelines, national hackathon finals, and open-source contributions in Nexus Spring of Code.
          </p>
        </div>

        {/* High-Impact Stat Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '56px',
            padding: '24px 32px',
            borderRadius: '20px',
            backgroundColor: 'rgba(15, 17, 26, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {stats.map((s, idx) => (
            <div
              key={s.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                borderRight: idx < stats.length - 1 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
                paddingRight: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '30px',
                  fontWeight: 800,
                  color: '#ffffff',
                  fontFamily: 'Space Grotesk, sans-serif',
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9' }}>{s.label}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Sleek Milestone Cards - Grid with Elegant Editorial Detailing */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))',
            gap: '24px',
          }}
        >
          {milestones.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  position: 'relative',
                  backgroundColor: isHovered ? 'rgba(20, 24, 38, 0.85)' : 'rgba(14, 16, 24, 0.65)',
                  border: isHovered
                    ? `1px solid ${item.accentColor}66`
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '24px',
                  padding: '36px 32px',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '24px',
                  transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: isHovered
                    ? `0 20px 40px -15px ${item.accentGlow}, 0 0 20px -5px ${item.accentGlow}`
                    : '0 8px 30px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Top Row: Category, Number, Badge */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          color: item.accentColor,
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.category}
                      </span>
                      <span style={{ color: '#475569', fontSize: '11px' }}>•</span>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>{item.org}</span>
                    </div>

                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: `${item.accentColor}18`,
                        border: `1px solid ${item.accentColor}44`,
                        color: item.accentColor,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.3,
                      marginBottom: '12px',
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#94a3b8',
                      lineHeight: 1.65,
                      marginBottom: '18px',
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Impact Highlight */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      marginBottom: '18px',
                    }}
                  >
                    <CheckCircle2
                      size={15}
                      style={{ color: item.accentColor, marginTop: '2px', flexShrink: 0 }}
                    />
                    <span style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5 }}>
                      <strong>Key Impact:</strong> {item.impact}
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Tech Stack Pills & Accent Indicator */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: '11px',
                          color: '#94a3b8',
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                          padding: '3px 10px',
                          borderRadius: '6px',
                          fontWeight: 500,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: isHovered ? item.accentColor : '#475569',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'color 0.25s ease',
                      fontFamily: 'Space Grotesk, sans-serif',
                    }}
                  >
                    {item.id}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
