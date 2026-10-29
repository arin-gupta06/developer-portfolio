'use client';

import React, { useState } from 'react';
import {
  Code2,
  Cpu,
  Layers,
  Database,
  Terminal,
  Globe,
  GitBranch,
  Sparkles,
  Zap,
} from 'lucide-react';

interface TechItem {
  name: string;
  category: 'Language' | 'Frontend' | 'Backend' | 'Database' | 'DevOps & Tools' | 'AI & ML';
  color: string;
}

export default function TechStackTicker() {
  const [isPaused, setIsPaused] = useState(false);

  const technologies: TechItem[] = [
    { name: 'JavaScript (ES6+)', category: 'Language', color: '#f7df1e' },
    { name: 'TypeScript', category: 'Language', color: '#3178c6' },
    { name: 'Python', category: 'Language', color: '#3b82f6' },
    { name: 'PyTorch', category: 'AI & ML', color: '#ee4c2c' },
    { name: 'React', category: 'Frontend', color: '#61dafb' },
    { name: 'Next.js', category: 'Frontend', color: '#ffffff' },
    { name: 'Transformers', category: 'AI & ML', color: '#ffcc00' },
    { name: 'Node.js', category: 'Backend', color: '#22c55e' },
    { name: 'FastAPI', category: 'Backend', color: '#009688' },
    { name: 'RAG & Embeddings', category: 'AI & ML', color: '#a855f7' },
    { name: 'Express.js', category: 'Backend', color: '#94a3b8' },
    { name: 'DistilBERT / NLP', category: 'AI & ML', color: '#38bdf8' },
    { name: 'TailwindCSS', category: 'Frontend', color: '#38bdf8' },
    { name: 'PostgreSQL', category: 'Database', color: '#336791' },
    { name: 'Redis', category: 'Database', color: '#dc2626' },
    { name: 'scikit-learn', category: 'AI & ML', color: '#f59e0b' },
    { name: 'MongoDB', category: 'Database', color: '#47a248' },
    { name: 'WebSockets', category: 'Backend', color: '#f59e0b' },
    { name: 'REST APIs', category: 'Backend', color: '#06b6d4' },
    { name: 'Docker', category: 'DevOps & Tools', color: '#2496ed' },
    { name: 'Git & GitHub', category: 'DevOps & Tools', color: '#f05032' },
    { name: 'Linux / CLI', category: 'DevOps & Tools', color: '#eab308' },
  ];

  // Duplicate for seamless infinite loop
  const tickerItems = [...technologies, ...technologies, ...technologies];

  const getCategoryIcon = (category: TechItem['category']) => {
    switch (category) {
      case 'Language':
        return <Code2 size={13} />;
      case 'Frontend':
        return <Globe size={13} />;
      case 'Backend':
        return <Terminal size={13} />;
      case 'Database':
        return <Database size={13} />;
      case 'DevOps & Tools':
        return <GitBranch size={13} />;
      case 'AI & ML':
        return <Cpu size={13} />;
      default:
        return <Layers size={13} />;
    }
  };

  return (
    <section
      id="tech-stack"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#090a0f',
        padding: '36px 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        overflow: 'hidden',
        zIndex: 20,
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle Ambient Background Lighting */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.04) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Left Atmospheric Vignette Fade */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '120px',
          background: 'linear-gradient(to right, #090a0f 30%, rgba(9, 10, 15, 0) 100%)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Right Atmospheric Vignette Fade */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: '120px',
          background: 'linear-gradient(to left, #090a0f 30%, rgba(9, 10, 15, 0) 100%)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Header Eyebrow inside Ticker */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#64748b',
            fontFamily: 'Space Grotesk, sans-serif',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Sparkles size={12} style={{ color: '#38bdf8' }} />
          <span>Tools &amp; Technologies I Work With</span>
        </span>
      </div>

      {/* Infinite Auto-Scrolling Track */}
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'techTickerScroll 42s linear infinite',
          animationPlayState: isPaused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {tickerItems.map((tech, idx) => (
          <div
            key={`${tech.name}-${idx}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              margin: '0 8px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(15, 18, 28, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              cursor: 'default',
              transition: 'all 0.25s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(25, 30, 48, 0.9)';
              e.currentTarget.style.borderColor = `${tech.color}66`;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 8px 20px -6px ${tech.color}44`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(15, 18, 28, 0.75)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Category Icon */}
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: tech.color,
              }}
            >
              {getCategoryIcon(tech.category)}
            </span>

            {/* Tech Name */}
            <span
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#f1f5f9',
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '-0.01em',
              }}
            >
              {tech.name}
            </span>

            {/* Category Taglet */}
            <span
              style={{
                fontSize: '9.5px',
                fontWeight: 600,
                color: '#64748b',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: '2px 7px',
                borderRadius: '9999px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {tech.category}
            </span>
          </div>
        ))}
      </div>

      {/* Global CSS Animation Keyframes for Smooth Marquee */}
      <style jsx>{`
        @keyframes techTickerScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }
      `}</style>
    </section>
  );
}
