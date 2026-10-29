'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ExternalLink,
  Github,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Pause,
  Play,
  Globe,
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  statusBadge: string;
  accentColor: string;
  overview: string;
  problemSolved: string;
  keyHighlight: string;
  telemetry: {
    terminalTitle: string;
    metric1: { label: string; value: string };
    metric2: { label: string; value: string };
    metric3: { label: string; value: string };
  };
  pipeline: string[];
  tech: string[];
  imagePreview: string;
  liveUrl: string;
  githubUrl: string;
}

export default function ProjectsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const projects: ProjectItem[] = [
    {
      id: '01',
      title: 'RepoFetcher (RepoLens AI)',
      tagline: 'AI-powered software architecture intelligence and semantic codebase gap analysis',
      category: 'AI ARCHITECTURE & TRANSFORMERS',
      statusBadge: 'Architecture Intelligence',
      accentColor: '#38bdf8',
      overview:
        'An AI-powered software architecture intelligence platform. Scans repository hierarchies, architectural signals, and dependencies using DistilBERT transformers and semantic matchers to predict patterns, detect structural gaps, and benchmark architectures.',
      problemSolved:
        'Developers frequently struggle to identify architectural anti-patterns, missing structural layers, and dependency bottlenecks in large codebases. RepoFetcher automates structural diagnosis and benchmark alignment.',
      keyHighlight: 'DistilBERT transformer semantic architecture inference paired with real-time GitHub signal inspection.',
      telemetry: {
        terminalTitle: 'repo-lens-alpha.vercel.app',
        metric1: { label: 'Inference Engine', value: 'DistilBERT ML' },
        metric2: { label: 'Signal Analysis', value: 'AST & Dependencies' },
        metric3: { label: 'Architecture', value: 'Multi-Tier System' },
      },
      pipeline: ['Repo Ingestion', 'Transformer Embedding', 'Structural Gap Diagnosis'],
      tech: ['Python', 'FastAPI', 'DistilBERT', 'Next.js', 'PyTorch', 'TypeScript'],
      imagePreview: '/assets/projects/repolens.png',
      liveUrl: 'https://repo-lens-alpha.vercel.app',
      githubUrl: 'https://github.com/arin-gupta06/RepoFetcher',
    },
    {
      id: '02',
      title: 'IARIS (Adaptive Resource Intelligence)',
      tagline: 'Intent-aware desktop intelligence that predicts, learns, and optimizes system resources in real time',
      category: 'SYSTEM INTELLIGENCE & OS OPTIMIZATION',
      statusBadge: 'Adaptive Resource System',
      accentColor: '#10b981',
      overview:
        'A desktop-based adaptive resource optimization system that observes process behavior, learns usage patterns, and improves OS efficiency in real time to make computers faster and more responsive without manual intervention.',
      problemSolved:
        'Traditional task managers merely display static CPU and memory stats without taking intelligent action. IARIS actively predicts process needs, mitigates bottlenecks, and dynamically balances hardware workloads.',
      keyHighlight: 'Real-time process telemetry and predictive decision heuristics for dynamic CPU/RAM workload balancing.',
      telemetry: {
        terminalTitle: 'iaris-website-8lha.vercel.app',
        metric1: { label: 'Decision Engine', value: 'Adaptive ML' },
        metric2: { label: 'Telemetry Overhead', value: '< 5ms' },
        metric3: { label: 'Resource Focus', value: 'Predictive CPU/RAM' },
      },
      pipeline: ['Behavior Monitor', 'Intent Predictor', 'Adaptive Allocation'],
      tech: ['Python', 'Machine Learning', 'Process Telemetry', 'OS Kernels', 'Adaptive Heuristics'],
      imagePreview: '/assets/projects/iaris.png',
      liveUrl: 'https://iaris-website-8lha.vercel.app',
      githubUrl: 'https://github.com/arin-gupta06/IARIS-A',
    },
    {
      id: '03',
      title: 'GuardianAI Platform',
      tagline: 'Instant emergency distress alerts and automated live location dispatch',
      category: 'SAFETY & EMERGENCY RESPONSE',
      statusBadge: 'VibeState’25 Finalist',
      accentColor: '#f59e0b',
      overview:
        'Engineered during the 36-hour VibeState’25 hackathon. Uses phone sensor triggers and fast alerts to notify emergency contacts and responders in sub-second latency.',
      problemSolved:
        'In high-stress emergencies, victims rarely have time to unlock their phone, enter credentials, or fill out forms. GuardianAI triggers automated distress alerts with a single gesture or sensor event.',
      keyHighlight: 'Sub-200ms end-to-end alert dispatch latency benchmarked during live hackathon demo.',
      telemetry: {
        terminalTitle: 'guardian-ai-one.vercel.app',
        metric1: { label: 'Dispatch Latency', value: '< 200ms' },
        metric2: { label: 'Telemetry Link', value: 'Live WebSockets' },
        metric3: { label: 'Sensor Suite', value: 'Gesture & Motion' },
      },
      pipeline: ['Sensor Event', 'WebSocket Relay', 'Emergency Dispatch'],
      tech: ['React', 'FastAPI', 'WebSockets', 'Geolocation', 'REST APIs', 'Node.js'],
      imagePreview: '/assets/projects/guardianai.png',
      liveUrl: 'https://guardian-ai-one.vercel.app',
      githubUrl: 'https://github.com/arin-gupta06/GuardianAI-Arin',
    },
    {
      id: '04',
      title: 'CodeBase Cartographic Tool (CBCT)',
      tagline: 'AI-powered codebase cartography to visualize architecture, identify bottlenecks, and refactor with confidence',
      category: 'DEVELOPER TOOLING & AST',
      statusBadge: 'AI Code Cartography',
      accentColor: '#818cf8',
      overview:
        'Built for the LakeCity Hackathon. Scans full project trees, parses Abstract Syntax Trees (ASTs), and plots real-time dependency graphs to onboard developers instantly.',
      problemSolved:
        'Diving into unfamiliar, sprawling enterprise codebases usually takes days of manual tracing. CBCT eliminates spaghetti code confusion with an instant visual atlas of module interdependencies.',
      keyHighlight: 'Scans multi-module repositories to render interactive SVG/Canvas dependency graphs.',
      telemetry: {
        terminalTitle: 'cbct-code-base-cartographic-tool-cl.vercel.app',
        metric1: { label: 'Parsing Engine', value: 'AST Traverser' },
        metric2: { label: 'Graph Render', value: '60 FPS Canvas' },
        metric3: { label: 'Scan Scope', value: 'Full Repo Tree' },
      },
      pipeline: ['Source Ingestion', 'AST Parsing', 'Interactive Canvas'],
      tech: ['JavaScript', 'React', 'AST Parsing', 'Graph Visualization', 'Git Analysis'],
      imagePreview: '/assets/projects/cbct.png',
      liveUrl: 'https://cbct-code-base-cartographic-tool-cl.vercel.app',
      githubUrl: 'https://github.com/arin-gupta06/CBCT-Code-Base-Cartographic-Tool-Arin',
    },
    {
      id: '05',
      title: 'Synapze Platform',
      tagline: 'Student talent marketplace and collaborative mentorship platform powered by task economies',
      category: 'COLLABORATIVE EDTECH & MARKETPLACE',
      statusBadge: 'Mentorship Platform',
      accentColor: '#c084fc',
      overview:
        'A comprehensive student talent marketplace and mentorship platform. Empowers students and teachers to collaborate seamlessly through a task-based bounty economy, professional mentorships, real-time messaging, and intelligent AI assistance.',
      problemSolved:
        'Students struggle to gain hands-on, verifiable industry experience, while educators and mentors lack transparent platforms to evaluate emerging talent. Synapze bridges this gap with practical task-based bounties and gamified rankings.',
      keyHighlight: 'Task-based economy with gamified credit ranks, real-time chat, and structured developer mentorship pipelines.',
      telemetry: {
        terminalTitle: 'synapze.vercel.app',
        metric1: { label: 'Platform Model', value: 'Talent Market' },
        metric2: { label: 'Economy System', value: 'Bounty Credits' },
        metric3: { label: 'Mentorship', value: 'Real-Time Sync' },
      },
      pipeline: ['Task Discovery', 'Peer Submission', 'Mentorship Review'],
      tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'TailwindCSS', 'WebSockets'],
      imagePreview: '/assets/projects/synapze.png',
      liveUrl: 'https://synapze.vercel.app',
      githubUrl: 'https://github.com/VivekChaurasiya95/Synapze',
    },
  ];

  const total = projects.length;

  // Dynamic automatic horizontal sliding timer (moves every 4.6s, pauses on hover)
  useEffect(() => {
    if (!isAutoPlay || isHovered) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % total);
    }, 4600);

    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, total]);

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    trackEvent('project_view', {
      projectId: projects[idx].id,
      title: projects[idx].title,
    });
  };

  const handlePrev = () => {
    const nextIdx = (activeIdx - 1 + total) % total;
    handleSelect(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % total;
    handleSelect(nextIdx);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100vw',
        backgroundColor: '#090a0f',
        color: '#f8fafc',
        padding: 'clamp(60px, 7vw, 100px) clamp(16px, 4vw, 48px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Cinematic Atmosphere Image Layer (Original Aspect & Filter) */}
      <div
        id="projects-bg-image"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/achievements-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
          opacity: 0.95,
          filter: 'brightness(1.25) contrast(1.06)',
        }}
      />

      {/* Atmospheric Vignette & Soft Gradient Overlay */}
      <div
        id="projects-atmosphere-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to right, 
              rgba(9, 10, 15, 0.72) 0%, 
              rgba(9, 10, 15, 0.58) 32%, 
              rgba(9, 10, 15, 0.32) 65%, 
              rgba(9, 10, 15, 0.08) 100%),
            linear-gradient(to top, 
              rgba(9, 10, 15, 0.82) 0%, 
              transparent 25%),
            linear-gradient(to bottom, 
              rgba(9, 10, 15, 0.82) 0%, 
              transparent 20%)
          `,
          zIndex: 2,
          pointerEvents: 'none',
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
        {/* ================= SECTION HEADER ================= */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              marginBottom: '20px',
              lineHeight: 1.15,
            }}
          >
            Featured{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #818cf8 0%, #a855f7 50%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              Projects
            </span>
          </h2>

          {/* Project Navigation Switcher Bar with Tabs, Prev/Next, and AutoPlay Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={handlePrev}
              aria-label="Previous project"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#cbd5e1',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.color = '#cbd5e1';
              }}
            >
              <ChevronLeft size={16} />
            </button>

            {projects.map((proj, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => handleSelect(idx)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${isSelected ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)'}`,
                    color: isSelected ? '#ffffff' : '#94a3b8',
                    fontSize: '12px',
                    fontWeight: isSelected ? 700 : 500,
                    fontFamily: 'Space Grotesk, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
                      e.currentTarget.style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                      e.currentTarget.style.color = '#94a3b8';
                    }
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: isSelected ? proj.accentColor : '#64748b',
                    }}
                  >
                    #{proj.id}
                  </span>
                  <span>{proj.title}</span>
                </button>
              );
            })}

            <button
              onClick={handleNext}
              aria-label="Next project"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#cbd5e1',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.color = '#cbd5e1';
              }}
            >
              <ChevronRight size={16} />
            </button>

            {/* Play / Pause Autoplay Button */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              title={isAutoPlay ? 'Pause auto-slide' : 'Resume auto-slide'}
              aria-label={isAutoPlay ? 'Pause auto-slide' : 'Resume auto-slide'}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: isAutoPlay ? '#10b981' : '#64748b',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginLeft: '4px',
              }}
            >
              {isAutoPlay ? <Pause size={14} /> : <Play size={14} />}
            </button>
          </div>
        </div>

        {/* ================= HORIZONTAL SLIDING CAROUSEL VIEWPORT ================= */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            borderRadius: '24px',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Animated Flex Track containing all 5 landscape cards */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              transform: `translateX(-${activeIdx * 100}%)`,
              transition: 'transform 0.65s cubic-bezier(0.2, 0.85, 0.25, 1)',
              willChange: 'transform',
            }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                style={{
                  width: '100%',
                  minWidth: '100%',
                  flexShrink: 0,
                  boxSizing: 'border-box',
                  borderRadius: '24px',
                  backgroundColor: 'rgba(16, 20, 32, 0.94)',
                  border: '1px solid rgba(255, 255, 255, 0.11)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.55)',
                  padding: 'clamp(24px, 3.5vw, 40px)',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
                    gap: 'clamp(24px, 3.5vw, 44px)',
                    alignItems: 'center',
                  }}
                >
                  {/* LEFT COLUMN: Narrative & Details */}
                  <div>
                    {/* Meta Row: Flagship Tag, Badge, Number */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '10px',
                        marginBottom: '16px',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          fontSize: '10.5px',
                          fontWeight: 800,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          backgroundColor: `${project.accentColor}18`,
                          border: `1px solid ${project.accentColor}55`,
                          color: project.accentColor,
                          fontFamily: 'Space Grotesk, sans-serif',
                        }}
                      >
                        <Sparkles size={11} />
                        FEATURED PROJECT
                      </span>

                      <span
                        style={{
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#cbd5e1',
                        }}
                      >
                        {project.statusBadge}
                      </span>

                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#64748b',
                          fontFamily: 'Space Grotesk, sans-serif',
                        }}
                      >
                        #{project.id}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3
                      style={{
                        fontSize: 'clamp(26px, 3.2vw, 38px)',
                        fontWeight: 800,
                        color: '#ffffff',
                        letterSpacing: '-0.025em',
                        lineHeight: 1.2,
                        marginBottom: '10px',
                        fontFamily: 'Space Grotesk, sans-serif',
                      }}
                    >
                      {project.title}
                    </h3>

                    <p
                      style={{
                        fontSize: 'clamp(14px, 1.5vw, 15.5px)',
                        color: '#cbd5e1',
                        fontWeight: 500,
                        lineHeight: 1.5,
                        marginBottom: '20px',
                      }}
                    >
                      {project.tagline}
                    </p>

                    {/* THE SOLUTION & PURPOSE Callout Box */}
                    <div
                      style={{
                        padding: '16px 20px',
                        borderRadius: '16px',
                        backgroundColor: 'rgba(255, 255, 255, 0.025)',
                        border: '1px solid rgba(255, 255, 255, 0.07)',
                        marginBottom: '18px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: project.accentColor,
                          marginBottom: '6px',
                          fontFamily: 'Space Grotesk, sans-serif',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <CheckCircle2 size={13} />
                        THE SOLUTION & PURPOSE
                      </div>
                      <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                        {project.problemSolved}
                      </p>
                    </div>

                    {/* Performance Highlight Callout Box */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 18px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.025)',
                        border: '1px solid rgba(255, 255, 255, 0.07)',
                        marginBottom: '22px',
                      }}
                    >
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: project.accentColor,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.45 }}>
                        <strong style={{ color: '#ffffff' }}>Technical Highlight:</strong>{' '}
                        {project.keyHighlight}
                      </span>
                    </div>

                    {/* TECHNOLOGIES & ARCHITECTURE */}
                    <div style={{ marginBottom: '26px' }}>
                      <div
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: '#64748b',
                          marginBottom: '10px',
                          fontFamily: 'Space Grotesk, sans-serif',
                        }}
                      >
                        TECHNOLOGIES & ARCHITECTURE
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: '12px',
                              color: '#cbd5e1',
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.09)',
                              padding: '4px 12px',
                              borderRadius: '8px',
                              fontWeight: 600,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons: Clean styling without colored glow */}
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackEvent('project_demo_open', {
                              projectId: project.id,
                              title: project.title,
                              url: project.liveUrl,
                            })
                          }
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            backgroundColor: project.accentColor,
                            color: '#090a0f',
                            fontSize: '13.5px',
                            fontWeight: 700,
                            fontFamily: 'Space Grotesk, sans-serif',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            boxShadow: 'none',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.filter = 'brightness(1.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.filter = 'none';
                          }}
                        >
                          <ExternalLink size={16} />
                          <span>Launch Live App</span>
                        </a>
                      )}

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackEvent('project_code_open', {
                            projectId: project.id,
                            title: project.title,
                            url: project.githubUrl,
                          })
                        }
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '12px 24px',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.14)',
                          color: '#ffffff',
                          fontSize: '13.5px',
                          fontWeight: 600,
                          fontFamily: 'Space Grotesk, sans-serif',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <Github size={16} />
                        <span>View Repository</span>
                      </a>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Browser Preview & System Telemetry */}
                  <div
                    style={{
                      backgroundColor: 'rgba(10, 13, 22, 0.94)',
                      border: '1px solid rgba(255, 255, 255, 0.09)',
                      borderRadius: '20px',
                      padding: 'clamp(18px, 2.5vw, 24px)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    {/* Browser / Terminal Header */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: '12px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
                        gap: '10px',
                      }}
                    >
                      {/* Window Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                      </div>

                      {/* Browser Address Bar */}
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 12px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          color: '#94a3b8',
                          fontSize: '11px',
                          fontFamily: 'monospace',
                          textDecoration: 'none',
                          maxWidth: '280px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#ffffff';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#94a3b8';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                        }}
                      >
                        <Globe size={11} style={{ flexShrink: 0, color: project.accentColor }} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.telemetry.terminalTitle}</span>
                      </a>

                      {/* Live Status Indicator */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                        <span
                          style={{
                            width: '7px',
                            height: '7px',
                            borderRadius: '50%',
                            backgroundColor: '#10b981',
                            display: 'inline-block',
                          }}
                        />
                        <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 700, fontFamily: 'monospace' }}>
                          LIVE
                        </span>
                      </div>
                    </div>

                    {/* Screenshot Preview with Interactive Hover & Link */}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent('project_demo_open', {
                          projectId: project.id,
                          title: project.title,
                          url: project.liveUrl,
                        })
                      }
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 'clamp(190px, 22vw, 240px)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundColor: '#07090e',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'block',
                        textDecoration: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <img
                        src={project.imagePreview}
                        alt={`${project.title} live interface preview`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'top',
                          transition: 'transform 0.4s ease, filter 0.4s ease',
                          display: 'block',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.03)';
                          e.currentTarget.style.filter = 'brightness(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.filter = 'none';
                        }}
                      />

                      {/* Bottom-right Preview Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(9, 10, 15, 0.88)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#f8fafc',
                          fontSize: '11px',
                          fontWeight: 600,
                          pointerEvents: 'none',
                        }}
                      >
                        <ExternalLink size={12} style={{ color: project.accentColor }} />
                        <span>Interactive Preview</span>
                      </div>
                    </a>

                    {/* 3 Telemetry Metrics Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '10px',
                      }}
                    >
                      <div
                        style={{
                          padding: '10px 12px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        <div style={{ fontSize: '9.5px', color: '#64748b', textTransform: 'uppercase', marginBottom: '3px' }}>
                          {project.telemetry.metric1.label}
                        </div>
                        <div
                          style={{
                            fontSize: '12.5px',
                            fontWeight: 700,
                            color: project.accentColor,
                            fontFamily: 'Space Grotesk, sans-serif',
                          }}
                        >
                          {project.telemetry.metric1.value}
                        </div>
                      </div>

                      <div
                        style={{
                          padding: '10px 12px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        <div style={{ fontSize: '9.5px', color: '#64748b', textTransform: 'uppercase', marginBottom: '3px' }}>
                          {project.telemetry.metric2.label}
                        </div>
                        <div
                          style={{
                            fontSize: '12.5px',
                            fontWeight: 700,
                            color: '#f8fafc',
                            fontFamily: 'Space Grotesk, sans-serif',
                          }}
                        >
                          {project.telemetry.metric2.value}
                        </div>
                      </div>

                      <div
                        style={{
                          padding: '10px 12px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        <div style={{ fontSize: '9.5px', color: '#64748b', textTransform: 'uppercase', marginBottom: '3px' }}>
                          {project.telemetry.metric3.label}
                        </div>
                        <div
                          style={{
                            fontSize: '12.5px',
                            fontWeight: 700,
                            color: '#f8fafc',
                            fontFamily: 'Space Grotesk, sans-serif',
                          }}
                        >
                          {project.telemetry.metric3.value}
                        </div>
                      </div>
                    </div>

                    {/* DATA FLOW EXECUTION MODEL */}
                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: '#64748b',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <Cpu size={12} />
                        DATA FLOW EXECUTION MODEL
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '6px',
                        }}
                      >
                        {project.pipeline.map((step, idx) => (
                          <React.Fragment key={step}>
                            <div
                              style={{
                                padding: '5px 8px',
                                borderRadius: '6px',
                                backgroundColor: idx === 0 ? `${project.accentColor}18` : 'rgba(255, 255, 255, 0.04)',
                                border: `1px solid ${idx === 0 ? project.accentColor + '44' : 'rgba(255, 255, 255, 0.08)'}`,
                                fontSize: '10.5px',
                                fontWeight: 600,
                                color: idx === 0 ? project.accentColor : '#cbd5e1',
                                textAlign: 'center',
                                flex: 1,
                              }}
                            >
                              {step}
                            </div>
                            {idx < project.pipeline.length - 1 && (
                              <span style={{ color: '#475569', fontSize: '10px' }}>➔</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
