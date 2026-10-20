'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ExternalLink,
  Github,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Layers,
  Cpu,
  Globe,
  Shield,
  FileCode2,
} from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  statusBadge: string;
  accentColor: string;
  accentGlow: string;
  overview: string;
  problemSolved: string;
  keyHighlight: string;
  tech: string[];
  liveUrl?: string;
  githubUrl: string;
}

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const projects: ProjectItem[] = [
    {
      id: '01',
      title: 'GuardianAI Platform',
      tagline: 'Emergency Distress Telemetry & Rapid Triage Dispatch Engine',
      category: 'EDGE AI & SAFETY SYSTEMS',
      statusBadge: 'VibeState’25 National Finalist',
      accentColor: '#f59e0b',
      accentGlow: 'rgba(245, 158, 11, 0.25)',
      overview:
        'Engineered an emergency telemetry platform during the 36-hour VibeState’25 national hackathon. Combines edge device sensor telemetry with low-latency dispatch coordination to deliver instant panic triage before emergency responders.',
      problemSolved:
        'Traditional distress apps rely on manual form submissions that fail during active panic events. GuardianAI activates instantaneous sensor telemetry, audio triggers, and geographic dispatch within milliseconds.',
      keyHighlight:
        'Demonstrated sub-200ms emergency distress pipeline and rapid triage simulation before national jury panel.',
      tech: ['React', 'FastAPI', 'WebSockets', 'REST APIs', 'Geolocation', 'Node.js'],
      liveUrl: 'https://guardian-ai-one.vercel.app',
      githubUrl: 'https://github.com/arin-gupta06/GuardianAI-Arin',
    },
    {
      id: '02',
      title: 'ChronOS & AI RTI Generator',
      tagline: 'Open-Source Civic Intelligence & Legal Grievance Drafting Engine',
      category: 'CIVIC TECH & OPEN SOURCE',
      statusBadge: 'ByteEdu Chronos Ecosystem',
      accentColor: '#38bdf8',
      accentGlow: 'rgba(56, 189, 248, 0.25)',
      overview:
        'An open-source legal AI framework developed within the Chronos ecosystem to empower citizens in drafting structured Right to Information (RTI) petitions, municipal grievances, and administrative appeals automatically.',
      problemSolved:
        'Citizens face intimidating procedural friction and legal jargon when seeking public accountability. ChronOS translates plain-language grievances into legally formatted statutory RTI documentation.',
      keyHighlight:
        'Powers structured citizen RTI drafts, automated statutory format validation, and open-source civic repository maintenance.',
      tech: ['Python', 'JavaScript', 'FastAPI', 'NLP', 'Open Source', 'REST APIs'],
      liveUrl: 'https://chronallab-site.vercel.app/',
      githubUrl: 'https://github.com/arin-gupta06/ChronOS-Arin',
    },
    {
      id: '03',
      title: 'CodeBase Cartographic Tool (CBCT)',
      tagline: 'Distributed Repository Architecture Mapping & Visual AST Cartography',
      category: 'DEVELOPER TOOLING & AST',
      statusBadge: 'LakeCity Hackathon Project',
      accentColor: '#10b981',
      accentGlow: 'rgba(16, 185, 129, 0.25)',
      overview:
        'Architected for the LakeCity Hackathon, CBCT parses complex distributed software repositories into interactive architectural node graphs, tracing imports, circular dependencies, and module coupling in real time.',
      problemSolved:
        'Onboarding developers onto unfamiliar codebases takes weeks of manual file browsing. CBCT generates dynamic architectural dependency cartography directly from AST parsing in minutes.',
      keyHighlight:
        'Parsed cross-module dependency trees and visualized deep architectural coupling across enterprise repositories.',
      tech: ['JavaScript', 'React', 'AST Parsing', 'Graph Visualization', 'Git Analysis'],
      liveUrl: 'https://cbct-code-base-cartographic-tool-cl.vercel.app',
      githubUrl: 'https://github.com/arin-gupta06/CBCT-Code-Base-Cartographic-Tool-Arin',
    },
    {
      id: '04',
      title: 'Smart Resume & Job-Fit Analyzer',
      tagline: 'Semantic Resume Parsing & ATS Contextual Alignment Scoring Engine',
      category: 'AI / ML & NLP',
      statusBadge: 'AI Intelligence Project',
      accentColor: '#6366f1',
      accentGlow: 'rgba(99, 102, 241, 0.25)',
      overview:
        'An intelligent candidate-job alignment engine utilizing semantic natural language embeddings to evaluate resumes against target job descriptions, computing contextual similarity, skill gaps, and ATS pass scores beyond superficial keyword counting.',
      problemSolved:
        'Traditional keyword-matching ATS systems reject qualified candidates based on minor phrasing differences. This engine evaluates contextual semantic embeddings to capture true technical proficiency.',
      keyHighlight:
        'Calculated contextual cosine embeddings, identified actionable skill deficits, and generated personalized ATS optimization advice.',
      tech: ['Python', 'NLP Embeddings', 'Cosine Similarity', 'Streamlit', 'Text Parsing'],
      liveUrl: 'https://smart-resume-job-fit-analyzer-a.vercel.app',
      githubUrl: 'https://github.com/arin-gupta06/Smart-Resume---Job-Fit-Analyzer-A',
    },
    {
      id: '05',
      title: 'GearGuard Maintenance Tracker',
      tagline: 'Industrial Asset & Preventive Maintenance Lifecycle System',
      category: 'FULL-STACK & SYSTEMS',
      statusBadge: 'Odoo Hackathon Platform',
      accentColor: '#8b5cf6',
      accentGlow: 'rgba(139, 92, 246, 0.25)',
      overview:
        'Built during the Odoo Hackathon, GearGuard is an equipment telemetry and preventive maintenance scheduling tracker engineered to eliminate unplanned industrial downtime through automated service logging and wear-cycle forecasting.',
      problemSolved:
        'Factory machinery often experiences catastrophic breakdowns due to disjointed paper logs and uncoordinated maintenance intervals. GearGuard automates component lifecycle scheduling.',
      keyHighlight:
        'Designed component lifecycle state machine, real-time service interval tracking, and automated preventive maintenance tickets.',
      tech: ['TypeScript', 'React', 'Node.js', 'State Machines', 'REST API', 'Analytics'],
      githubUrl: 'https://github.com/arin-gupta06/GearGuard-The-Ultimate-Maintenance-Tracker',
    },
  ];

  const total = projects.length;
  const activeProject = projects[activeIndex];

  // Automatic dynamic shuffle timer (every 4.8 seconds, pauses on hover)
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4800);

    return () => clearInterval(timer);
  }, [isHovered, total]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
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
        padding: 'clamp(80px, 10vw, 120px) clamp(16px, 4vw, 48px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Cinematic Atmosphere Image Layer with Enhanced Brightness & Clarity */}
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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(129, 140, 248, 0.08)',
              border: '1px solid rgba(129, 140, 248, 0.25)',
              color: '#818cf8',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '18px',
              fontFamily: 'Space Grotesk, sans-serif',
              transition: 'all 0.5s ease',
            }}
          >
            <Sparkles size={13} />
            <span>SOFTWARE ARCHITECTURE & LABS</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(36px, 4.5vw, 54px)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              marginBottom: 0,
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
              Engineering Projects
            </span>
          </h2>
        </div>

        {/* ================= SPLIT VIEW: 3D STACK (LEFT) + DOSSIER (RIGHT) ================= */}
        <div
          id="projects-split-grid"
          className="projects-split-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {/* ================= LEFT COLUMN: 3D Interactive Layered Deck ================= */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '480px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              perspective: '1200px',
            }}
          >
            {/* The Stack Container */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
                height: 'clamp(340px, 45vw, 400px)',
              }}
            >
              {projects.map((project, idx) => {
                const offset = (idx - activeIndex + total) % total;
                const isTop = offset === 0;

                // Refined, architectural layered depth offsets (clean, rectilinear, no chaotic tilts)
                const translateY = offset * 18;
                const scale = 1 - offset * 0.05;
                const opacity = offset > 3 ? 0 : 1 - offset * 0.2;
                const zIndex = total - offset;

                return (
                  <div
                    key={project.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveIndex(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveIndex(idx);
                      }
                    }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '24px',
                      backgroundColor: isTop ? 'rgba(20, 25, 40, 0.88)' : 'rgba(14, 18, 28, 0.78)',
                      border: isTop
                        ? '1px solid rgba(255, 255, 255, 0.16)'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(24px)',
                      WebkitBackdropFilter: 'blur(24px)',
                      padding: 'clamp(20px, 3.5vw, 32px) clamp(18px, 3.5vw, 28px)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      cursor: isTop ? 'default' : 'pointer',
                      transform: `translate3d(0, ${translateY}px, -${offset * 35}px) scale(${scale})`,
                      opacity: opacity,
                      zIndex: zIndex,
                      transition: 'all 0.65s cubic-bezier(0.2, 0.85, 0.25, 1)',
                      boxShadow: isTop
                        ? '0 20px 40px rgba(0, 0, 0, 0.55), 0 1px 2px rgba(0, 0, 0, 0.4)'
                        : '0 10px 30px rgba(0, 0, 0, 0.4)',
                      pointerEvents: offset > 3 ? 'none' : 'auto',
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              letterSpacing: '0.12em',
                              color: project.accentColor,
                              textTransform: 'uppercase',
                            }}
                          >
                            {project.category}
                          </span>
                          <span style={{ color: '#475569' }}>•</span>
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

                        <span
                          style={{
                            padding: '3px 10px',
                            borderRadius: '9999px',
                            fontSize: '10.5px',
                            fontWeight: 700,
                            backgroundColor: `${project.accentColor}18`,
                            border: `1px solid ${project.accentColor}44`,
                            color: project.accentColor,
                            letterSpacing: '0.04em',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {project.statusBadge}
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
                          marginBottom: '8px',
                          fontFamily: 'Space Grotesk, sans-serif',
                        }}
                      >
                        {project.title}
                      </h3>

                      {/* Tagline */}
                      <p
                        style={{
                          fontSize: '13.5px',
                          color: '#cbd5e1',
                          lineHeight: 1.5,
                          marginBottom: '18px',
                        }}
                      >
                        {project.tagline}
                      </p>

                      {/* Overview snippet */}
                      <p
                        style={{
                          fontSize: '13px',
                          color: '#94a3b8',
                          lineHeight: 1.6,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {project.overview}
                      </p>
                    </div>

                    {/* Bottom Row on Card */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '16px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      }}
                    >
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {project.tech.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: '10.5px',
                              color: '#94a3b8',
                              backgroundColor: 'rgba(255, 255, 255, 0.04)',
                              padding: '2px 8px',
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
                          fontSize: '11.5px',
                          fontWeight: 700,
                          color: isTop ? project.accentColor : '#64748b',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontFamily: 'Space Grotesk, sans-serif',
                        }}
                      >
                        {isTop ? 'Active Dossier' : 'Bring to Front'}
                        {isTop && <ArrowUpRight size={13} />}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Deck Navigation Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '460px',
                marginTop: '42px',
                padding: '0 4px',
              }}
            >
              {/* Progress Dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {projects.map((p, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Switch to project ${p.title}`}
                      style={{
                        height: '24px',
                        padding: isActive ? '0 10px' : '0 6px',
                        borderRadius: '9999px',
                        backgroundColor: isActive ? `${p.accentColor}22` : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${isActive ? p.accentColor : 'rgba(255, 255, 255, 0.1)'}`,
                        color: isActive ? p.accentColor : '#64748b',
                        fontSize: '11px',
                        fontWeight: 700,
                        fontFamily: 'Space Grotesk, sans-serif',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {p.id}
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next Arrows */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={handlePrev}
                  aria-label="Previous project"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Next project"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Dynamic Synchronized Dossier ================= */}
          <div
            style={{
              backgroundColor: 'rgba(18, 22, 36, 0.82)',
              border: '1px solid rgba(255, 255, 255, 0.11)',
              borderRadius: '24px',
              padding: 'clamp(24px, 4vw, 36px) clamp(18px, 4vw, 32px)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px',
              transition: 'all 0.5s cubic-bezier(0.2, 0.85, 0.25, 1)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div>
              {/* Category & Status Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: activeProject.accentColor,
                      textTransform: 'uppercase',
                    }}
                  >
                    {activeProject.category}
                  </span>
                  <span style={{ color: '#475569' }}>•</span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Live Intelligence Dossier</span>
                </div>

                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: `${activeProject.accentColor}18`,
                    border: `1px solid ${activeProject.accentColor}44`,
                    color: activeProject.accentColor,
                    letterSpacing: '0.04em',
                  }}
                >
                  {activeProject.statusBadge}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                  marginBottom: '8px',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                {activeProject.title}
              </h3>
              <p
                style={{
                  fontSize: '14.5px',
                  color: '#cbd5e1',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  marginBottom: '20px',
                }}
              >
                {activeProject.tagline}
              </p>

              {/* Problem Solved Box */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  marginBottom: '18px',
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#94a3b8',
                    marginBottom: '6px',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  The Engineering Challenge
                </div>
                <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6 }}>
                  {activeProject.problemSolved}
                </p>
              </div>

              {/* Key Impact Highlight Metric */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '14px 16px',
                  borderRadius: '14px',
                  backgroundColor: `${activeProject.accentColor}0e`,
                  border: `1px solid ${activeProject.accentColor}33`,
                  marginBottom: '22px',
                }}
              >
                <CheckCircle2
                  size={16}
                  style={{ color: activeProject.accentColor, marginTop: '2px', flexShrink: 0 }}
                />
                <span style={{ fontSize: '13px', color: '#f1f5f9', lineHeight: 1.5 }}>
                  <strong style={{ color: '#ffffff' }}>Architectural Breakthrough:</strong>{' '}
                  {activeProject.keyHighlight}
                </span>
              </div>

              {/* Tech Stack Pills */}
              <div style={{ marginBottom: '24px' }}>
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
                  Engineered With
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '11.5px',
                        color: '#cbd5e1',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
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
            </div>

            {/* Action Buttons: Live Demo, GitHub */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '11px 22px',
                    borderRadius: '12px',
                    backgroundColor: activeProject.accentColor,
                    color: '#090a0f',
                    fontSize: '13px',
                    fontWeight: 700,
                    fontFamily: 'Space Grotesk, sans-serif',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
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
                  <ExternalLink size={15} />
                  <span>Launch Live App</span>
                </a>
              )}

              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 22px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: 'Space Grotesk, sans-serif',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
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
                <Github size={15} />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
