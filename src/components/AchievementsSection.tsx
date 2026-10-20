'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  FileCheck,
  Layers,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';
import AchievementModal, { MilestoneItem } from './AchievementModal';

export default function AchievementsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [cardWidth, setCardWidth] = useState(440);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const cardGap = 24;

  // Dynamically calculate responsive card widths
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 640) {
        setCardWidth(Math.min(window.innerWidth - 64, 340));
      } else if (window.innerWidth < 1024) {
        setCardWidth(380);
      } else {
        setCardWidth(440);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamic automatic sliding timer: pauses immediately when hovered or when modal is open
  useEffect(() => {
    if (isCarouselHovered || selectedMilestone) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 5);
    }, 3800);

    return () => clearInterval(timer);
  }, [isCarouselHovered, selectedMilestone]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + 5) % 5);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % 5);
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

  const stats = [
    { value: 'Finalist', label: 'VibeState’25 Hackathon', sub: 'Singularity — National Finalist' },
    { value: 'SWE Intern', label: 'ByteEdu Learning Platform', sub: 'Chronos Open Source Org (2026)' },
    { value: 'AI Intern', label: 'Decode Labs Tech', sub: 'AI Track & LOR Commendation (2026)' },
    { value: 'Contributor', label: 'NSoC 2026 Cohort', sub: 'Nexus Spring of Code (April 2026)' },
    { value: 'Contributor', label: 'GSSoC 2026 Global', sub: 'GirlScript Summer of Code' },
  ];

  const milestones: MilestoneItem[] = [
    {
      id: '01',
      category: 'HACKATHON FINALIST',
      title: 'VibeState’25 Hackathon',
      subtitle: 'Top Finalist · Product Innovation',
      org: 'Singularity • 2025',
      year: '2025',
      badge: 'National Finalist',
      role: 'Team Lead & Full-Stack Architect',
      duration: 'VibeState’25 Season',
      recognition: 'Certificate of Appreciation',
      organizedBy: 'Singularity (Aditya Batra & Shivansh Das)',
      accentColor: '#f59e0b',
      accentGlow: 'rgba(245, 158, 11, 0.25)',
      overview:
        'Awarded the Certificate of Appreciation at VibeState’25 hosted by Singularity for architecting Guardian, a real-time emergency distress telemetry and triage dispatch system engineered during an intense 36-hour sprint. Pitched before national judges with an electric atmosphere recognition.',
      tech: ['React Native', 'FastAPI', 'Edge AI', 'WebSockets', 'PyTorch'],
      impact:
        'Demonstrated real-time emergency telemetry pipeline and rapid triage response before national industry panel.',
      slides: [
        {
          type: 'document',
          title: 'Official Certificate of Appreciation (VibeState’25)',
          src: '/assets/achievements/vibestate_cert_p1.png',
          alt: 'VibeState 25 Certificate of Appreciation presented to Arin Gupta by Singularity',
        },
      ],
      fullDocUrl: '/assets/achievements/docs/vibestate_certificate.pdf',
      eventUrl: '#',
    },
    {
      id: '02',
      category: 'SOFTWARE ENGINEERING INTERNSHIP',
      title: 'ByteEdu Learning Platform',
      subtitle: 'Software Developer Intern · Chronos Initiative',
      org: 'ByteEdu Tech Learning • 2026',
      year: '2026',
      badge: 'SWE Intern',
      role: 'Software Developer Intern',
      duration: 'Appointed 06 March 2026',
      recognition: 'Internship Appointment as Software Developer',
      organizedBy: 'ByteEdu Learning Platform (Founder: Manan Chawla)',
      accentColor: '#38bdf8',
      accentGlow: 'rgba(56, 189, 248, 0.25)',
      overview:
        'Appointed as Software Developer Intern at ByteEdu Learning Platform on March 6, 2026, in recognition of active contributions to the Chronos Open Source Organization under the ByteEdu ecosystem. Entrusted with building and maintaining open-source repositories, managing developer workflows, and reviewing contributor pull requests.',
      tech: ['TypeScript', 'React', 'Node.js', 'REST APIs', 'Open Source', 'GitHub Actions'],
      impact:
        'Maintaining Chronos open-source ecosystem, enforcing PR quality benchmarks, and guiding developer workflows.',
      slides: [
        {
          type: 'document',
          title: 'Official Internship Appointment Letter (06/03/2026)',
          src: '/assets/achievements/byteedu_letter_p1.png',
          alt: 'ByteEdu Software Developer Internship Appointment Letter for Arin Gupta dated 06 March 2026',
        },
      ],
      fullDocUrl: '/assets/achievements/docs/byteedu_internship_letter.pdf',
      eventUrl: 'https://byteedu.co.in',
    },
    {
      id: '03',
      category: 'ARTIFICIAL INTELLIGENCE & RESEARCH',
      title: 'Decode Labs Tech',
      subtitle: 'Artificial Intelligence (AI) Intern · LOR Awarded',
      org: 'Decode Labs • 2026',
      year: '2026',
      badge: 'AI Intern',
      role: 'Artificial Intelligence (AI) Intern',
      duration: '03 June 2026 – 03 July 2026 (LOR: 12 July 2026)',
      recognition: 'Offer of Internship & Letter of Recommendation',
      organizedBy: 'Decode Labs (Govt. Registered Enterprise)',
      accentColor: '#6366f1',
      accentGlow: 'rgba(99, 102, 241, 0.25)',
      overview:
        'Completed an intensive Artificial Intelligence (AI) internship at Decode Labs from 3 June 2026 to 3 July 2026. Operated within the AI vertical architecting deep learning pipelines, translating theoretical concepts into robust production-ready models, and earned a formal executive Letter of Recommendation on 12 July 2026 commended for exceptional performance.',
      tech: ['Python', 'FastAPI', 'Neural Models', 'Data Pipelines', 'API Benchmarking'],
      impact:
        'Shipped production AI vertical milestones and awarded formal Letter of Recommendation commending technical competence.',
      slides: [
        {
          type: 'document',
          title: 'Official Offer of Internship (Dated 03 June 2026)',
          src: '/assets/achievements/offer_letter_p1.png',
          alt: 'Decode Labs Offer of Internship for Arin Gupta dated 03 June 2026',
        },
        {
          type: 'document',
          title: 'Official Letter of Recommendation (Dated 12 July 2026)',
          src: '/assets/achievements/decodelabs_letter.jpg',
          alt: 'Decode Labs Letter of Recommendation for Arin Gupta dated 12 July 2026',
        },
      ],
      fullDocUrl: '/assets/achievements/docs/decodelabs_offer_letter.pdf',
      eventUrl: 'https://decodelabs.tech',
    },
    {
      id: '04',
      category: 'OPEN SOURCE INITIATIVE',
      title: 'Nexus Spring of Code (NSoC)',
      subtitle: 'Selected Contributor · Open Source',
      org: 'Nexus Spring of Code • 2026',
      year: '2026',
      badge: 'NSoC Contributor',
      role: 'Open Source Contributor',
      duration: '15 April 2026 – Present (Selected April 2026)',
      recognition: 'Official Contributor Selection (NSoC ’26)',
      organizedBy: 'Nexus Spring of Code (nsoc.in)',
      accentColor: '#10b981',
      accentGlow: 'rgba(16, 185, 129, 0.25)',
      overview:
        'Selected as an official open-source contributor for Nexus Spring of Code 2026 (NSoC ’26, starting April 15, 2026). Collaborating across active public codebases, addressing issues, shipping pull requests, and building software with mentor guidance on Discord and GitHub.',
      tech: ['Open Source', 'Git & GitHub', 'Python', 'TypeScript', 'CI/CD', 'Code Review'],
      impact:
        'Selected through competitive open-source applicant pool to contribute validated code and feature enhancements.',
      slides: [
        {
          type: 'document',
          title: 'Official NSoC 2026 Selection Confirmation Email',
          src: '/assets/achievements/nsoc_selection_email_1.png',
          alt: 'Nexus Spring of Code 2026 Contributor Selection Confirmation Email',
        },
        {
          type: 'document',
          title: 'NSoC 2026 Contributor Period & Discord Onboarding',
          src: '/assets/achievements/nsoc_selection_email_2.png',
          alt: 'NSoC 2026 Contributor Roadmap starting April 15',
        },
      ],
      fullDocUrl: '/assets/achievements/nsoc_selection_email_1.png',
      eventUrl: 'https://www.nsoc.in/projects',
    },
    {
      id: '05',
      category: 'GLOBAL OPEN SOURCE PROGRAM',
      title: 'GirlScript Summer of Code (GSSoC)',
      subtitle: 'Open Source Contributor · Certificate of Participation',
      org: 'GirlScript Foundation • 2026',
      year: '2026',
      badge: 'GSSoC Contributor',
      role: 'Open Source Contributor',
      duration: 'GSSoC 2026 Season',
      recognition: 'Official Certificate of Participation',
      organizedBy: 'GirlScript Foundation & GS Labs',
      accentColor: '#8b5cf6',
      accentGlow: 'rgba(139, 92, 246, 0.25)',
      overview:
        'Awarded the official Certificate of Participation for contributions to GirlScript Summer of Code 2026 (GSSoC 2026), hosted by GirlScript Foundation and GS Labs. Recognized for curiosity and commitment to open source, collaboration across community repositories, and authoring impactful pull requests.',
      tech: ['Open Source', 'Git & GitHub', 'JavaScript', 'React', 'Problem Solving', 'Peer Review'],
      impact:
        'Contributed code improvements and feature patches to open-source projects hosted under GirlScript Foundation.',
      slides: [
        {
          type: 'document',
          title: 'Official Certificate of Participation (GSSoC 2026)',
          src: '/assets/achievements/gssoc_cert_p1.png',
          alt: 'GirlScript Summer of Code 2026 Certificate presented to Arin Gupta',
        },
      ],
      fullDocUrl: '/assets/achievements/docs/gssoc_2026_certificate.pdf',
      eventUrl: 'https://gssoc.girlscript.tech',
    },
  ];

  return (
    <section
      id="achievements"
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
      {/* Background Image Layer with Enhanced Brightness & Clarity */}
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
          opacity: 1,
          filter: 'brightness(1.25) contrast(1.06)',
        }}
      />

      {/* Atmospheric Vignette & Soft Gradient Overlay */}
      <div
        id="achievements-atmosphere-overlay"
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
              marginBottom: 0,
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
            backgroundColor: 'rgba(20, 24, 38, 0.78)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
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

        {/* Carousel Control Ribbon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '28px',
            padding: '0 8px',
          }}
        >
          {/* Dynamic Auto-sliding Status Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 16px',
              borderRadius: '9999px',
              backgroundColor: isCarouselHovered
                ? 'rgba(245, 158, 11, 0.1)'
                : 'rgba(16, 185, 129, 0.1)',
              border: `1px solid ${
                isCarouselHovered ? 'rgba(245, 158, 11, 0.3)' : 'rgba(16, 185, 129, 0.25)'
              }`,
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: 'Space Grotesk, sans-serif',
              transition: 'all 0.3s ease',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: isCarouselHovered ? '#f59e0b' : '#10b981',
                boxShadow: isCarouselHovered
                  ? '0 0 10px #f59e0b'
                  : '0 0 10px #10b981',
              }}
            />
            <span style={{ color: isCarouselHovered ? '#fbbf24' : '#34d399' }}>
              {isCarouselHovered ? 'Paused on Hover' : 'Dynamic Auto-Slider Active'}
            </span>
            <span style={{ color: '#64748b', fontSize: '11px' }}>
              {isCarouselHovered
                ? '• Click card to inspect credentials'
                : '• Hover any card to freeze'}
            </span>
          </div>

          {/* Right: Milestone Dots & Navigation Arrows */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Direct Milestone Indicator Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {milestones.map((item, idx) => {
                const isActive = currentIndex === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Jump to milestone ${item.id} ${item.title}`}
                    style={{
                      height: '24px',
                      padding: isActive ? '0 10px' : '0 6px',
                      borderRadius: '9999px',
                      backgroundColor: isActive
                        ? `${item.accentColor}22`
                        : 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${
                        isActive ? item.accentColor : 'rgba(255, 255, 255, 0.1)'
                      }`,
                      color: isActive ? item.accentColor : '#64748b',
                      fontSize: '11px',
                      fontWeight: 700,
                      fontFamily: 'Space Grotesk, sans-serif',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.id}
                  </button>
                );
              })}
            </div>

            {/* Prev & Next Arrow Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handlePrev}
                aria-label="Previous milestone"
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
                aria-label="Next milestone"
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

        {/* Dynamic Horizontal Auto-Slider Carousel Viewport */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            padding: '12px 0 24px 0',
          }}
          onMouseEnter={() => setIsCarouselHovered(true)}
          onMouseLeave={() => setIsCarouselHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Edge Atmospheric Gradient Vignette */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: '60px',
              background: 'linear-gradient(to right, #090a0f 0%, rgba(9, 10, 15, 0) 100%)',
              zIndex: 5,
              pointerEvents: 'none',
            }}
          />

          {/* Right Edge Atmospheric Gradient Vignette */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: '60px',
              background: 'linear-gradient(to left, #090a0f 0%, rgba(9, 10, 15, 0) 100%)',
              zIndex: 5,
              pointerEvents: 'none',
            }}
          />

          {/* The Animated Flex Track */}
          <div
            style={{
              display: 'flex',
              gap: `${cardGap}px`,
              transform: `translateX(-${currentIndex * (cardWidth + cardGap)}px)`,
              transition: 'transform 0.65s cubic-bezier(0.2, 0.85, 0.25, 1)',
              willChange: 'transform',
            }}
          >
            {/* Render with seamless trailing duplication */}
            {[...milestones, ...milestones].map((item, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <div
                  key={`${item.id}-${idx}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedMilestone(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedMilestone(item);
                    }
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    flex: `0 0 ${cardWidth}px`,
                    width: `${cardWidth}px`,
                    minWidth: `${cardWidth}px`,
                    maxWidth: `${cardWidth}px`,
                    position: 'relative',
                    backgroundColor: isHovered
                      ? 'rgba(25, 30, 48, 0.94)'
                      : 'rgba(18, 22, 34, 0.78)',
                    border: isHovered
                      ? `1px solid ${item.accentColor}88`
                      : '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '24px',
                    padding: '32px 28px',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                    boxShadow: isHovered
                      ? `0 24px 48px -15px ${item.accentGlow}, 0 0 24px -5px ${item.accentGlow}`
                      : '0 8px 30px rgba(0, 0, 0, 0.35)',
                  }}
                >
                  {/* Top Row: Category, Org, Badge */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '14px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                        <span style={{ fontSize: '11.5px', color: '#64748b' }}>{item.org}</span>
                      </div>

                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          fontSize: '10.5px',
                          fontWeight: 700,
                          backgroundColor: `${item.accentColor}18`,
                          border: `1px solid ${item.accentColor}44`,
                          color: item.accentColor,
                          letterSpacing: '0.04em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#ffffff',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.3,
                        marginBottom: '10px',
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '13.5px',
                        color: '#94a3b8',
                        lineHeight: 1.6,
                        marginBottom: '16px',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.overview}
                    </p>

                    {/* Impact Highlight */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        marginBottom: '16px',
                      }}
                    >
                      <CheckCircle2
                        size={14}
                        style={{ color: item.accentColor, marginTop: '2px', flexShrink: 0 }}
                      />
                      <span style={{ fontSize: '11.5px', color: '#cbd5e1', lineHeight: 1.45 }}>
                        <strong>Key Impact:</strong> {item.impact}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Row: Tech Stack Pills & Interactive Cue */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '10px',
                      paddingTop: '14px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {item.tech.slice(0, 4).map((t) => (
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

                    {/* Interactive Cue */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        color: isHovered ? item.accentColor : '#64748b',
                        transition: 'all 0.25s ease',
                        fontFamily: 'Space Grotesk, sans-serif',
                      }}
                    >
                      <FileCheck size={13} />
                      <span>Inspect</span>
                      <ArrowUpRight
                        size={13}
                        style={{
                          transform: isHovered ? 'translate(2px, -2px)' : 'none',
                          transition: 'transform 0.25s ease',
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Overlay Modal */}
      <AchievementModal
        milestone={selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
      />
    </section>
  );
}
