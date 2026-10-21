'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Maximize2,
  Trophy,
  Award,
  User,
  Clock,
  Building2,
  Cpu,
  Sparkles,
  CheckCircle2,
  ZoomIn,
} from 'lucide-react';

export interface MilestoneSlide {
  type: 'document' | 'site';
  title: string;
  src: string;
  alt: string;
  liveUrl?: string;
}

export interface MilestoneItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  org: string;
  year: string;
  badge: string;
  role: string;
  duration: string;
  recognition: string;
  organizedBy: string;
  accentColor: string;
  accentGlow: string;
  overview: string;
  tech: string[];
  impact: string;
  slides: MilestoneSlide[];
  fullDocUrl?: string;
  eventUrl?: string;
}

interface AchievementModalProps {
  milestone: MilestoneItem | null;
  onClose: () => void;
}

export default function AchievementModal({ milestone, onClose }: AchievementModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset slide index when modal opens with a new milestone
  useEffect(() => {
    setCurrentSlide(0);
    setIsZoomed(false);
  }, [milestone]);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!milestone) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight' && milestone.slides.length > 1) {
        setCurrentSlide((prev) => (prev + 1) % milestone.slides.length);
      } else if (e.key === 'ArrowLeft' && milestone.slides.length > 1) {
        setCurrentSlide((prev) => (prev - 1 + milestone.slides.length) % milestone.slides.length);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [milestone, isZoomed, onClose]);

  if (!milestone) return null;

  const slides = milestone.slides || [];
  const activeSlide = slides[currentSlide];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(5, 7, 12, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        animation: 'modalFadeIn 0.25s ease-out',
      }}
    >
      {/* Modal Dialog Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1120px',
          maxHeight: '92vh',
          backgroundColor: '#0c0e17',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px -10px ${milestone.accentGlow}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Modal Top Header Bar */}
        <div
          style={{
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(15, 18, 28, 0.7)',
            flexShrink: 0,
          }}
        >
          {/* Left: Icon, Title & Subtitle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: `${milestone.accentColor}18`,
                border: `1px solid ${milestone.accentColor}44`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: milestone.accentColor,
                flexShrink: 0,
              }}
            >
              <Trophy size={22} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  {milestone.title}
                </h3>

                <span
                  style={{
                    padding: '2px 10px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: `${milestone.accentColor}18`,
                    border: `1px solid ${milestone.accentColor}44`,
                    color: milestone.accentColor,
                    letterSpacing: '0.04em',
                  }}
                >
                  {milestone.badge}
                </span>
              </div>

              <div
                style={{
                  fontSize: '13px',
                  color: '#94a3b8',
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{milestone.subtitle}</span>
                <span style={{ color: '#475569' }}>•</span>
                <span style={{ color: '#64748b' }}>{milestone.org}</span>
              </div>
            </div>
          </div>

          {/* Right: Year Badge & Close Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                padding: '4px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '12px',
                fontWeight: 600,
                color: '#cbd5e1',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              {milestone.year}
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Main Content - 2 Column Split Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
            flex: 1,
            overflowY: 'auto',
          }}
          className="achievement-modal-grid"
        >
          {/* ================= LEFT COLUMN: Document & Site Glimpse Canvas ================= */}
          <div
            style={{
              padding: '24px',
              backgroundColor: 'rgba(9, 11, 18, 0.6)',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            {/* Slide Title Banner */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 14px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <FileText size={14} style={{ color: milestone.accentColor }} />
                {activeSlide?.title || 'Document Preview'}
              </span>

              {slides.length > 1 && (
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                  Page {currentSlide + 1} of {slides.length}
                </span>
              )}
            </div>

            {/* Document Frame Viewport with Prev/Next Controls */}
            <div
              style={{
                position: 'relative',
                flex: 1,
                minHeight: '340px',
                maxHeight: '440px',
                backgroundColor: '#07080d',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.6)',
              }}
            >
              {/* Prev Slide Button */}
              {slides.length > 1 && (
                <button
                  onClick={handlePrev}
                  aria-label="Previous page"
                  style={{
                    position: 'absolute',
                    left: '12px',
                    zIndex: 10,
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(15, 18, 28, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = milestone.accentColor;
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(15, 18, 28, 0.85)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  <ChevronLeft size={18} />
                </button>
              )}

              {/* Active Slide Image */}
              {activeSlide && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setIsZoomed(true)}
                  title="Click to view full preview"
                >
                  <img
                    src={activeSlide.src}
                    alt={activeSlide.alt}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
                      transition: 'transform 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                </div>
              )}

              {/* Next Slide Button */}
              {slides.length > 1 && (
                <button
                  onClick={handleNext}
                  aria-label="Next page"
                  style={{
                    position: 'absolute',
                    right: '12px',
                    zIndex: 10,
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(15, 18, 28, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = milestone.accentColor;
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(15, 18, 28, 0.85)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              )}
            </div>

            {/* Bottom Controls Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 14px',
                borderRadius: '12px',
                backgroundColor: 'rgba(15, 18, 28, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Slide Counter */}
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#94a3b8',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                {currentSlide + 1} / {slides.length || 1}
              </div>

              {/* Zoom & Expand Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setIsZoomed(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#cbd5e1',
                    fontSize: '11px',
                    fontWeight: 600,
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
                  <ZoomIn size={13} />
                  <span>100%</span>
                </button>

                <button
                  onClick={() => setIsZoomed(true)}
                  aria-label="Expand image"
                  style={{
                    padding: '5px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#cbd5e1',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Maximize2 size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Structured Metadata & Details ================= */}
          <div
            style={{
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div>
              {/* Overview Section */}
              <div style={{ marginBottom: '24px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: milestone.accentColor,
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '10px',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  <Sparkles size={14} />
                  <span>Overview</span>
                </div>

                <p
                  style={{
                    fontSize: '13.5px',
                    color: '#cbd5e1',
                    lineHeight: 1.65,
                  }}
                >
                  {milestone.overview}
                </p>
              </div>

              {/* Key Impact Metric Box */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: `${milestone.accentColor}0e`,
                  border: `1px solid ${milestone.accentColor}33`,
                  marginBottom: '24px',
                }}
              >
                <CheckCircle2
                  size={16}
                  style={{ color: milestone.accentColor, marginTop: '2px', flexShrink: 0 }}
                />
                <span style={{ fontSize: '12.5px', color: '#e2e8f0', lineHeight: 1.5 }}>
                  <strong style={{ color: '#ffffff' }}>Key Highlight:</strong> {milestone.impact}
                </span>
              </div>

              {/* Metadata Table / Key-Value List */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  paddingTop: '6px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                {/* Role */}
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: 600,
                    }}
                  >
                    <User size={14} style={{ color: milestone.accentColor }} />
                    Role
                  </span>
                  <span style={{ fontSize: '13px', color: '#f1f5f9', fontWeight: 500 }}>
                    {milestone.role}
                  </span>
                </div>

                {/* Duration */}
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: 600,
                    }}
                  >
                    <Clock size={14} style={{ color: milestone.accentColor }} />
                    Duration
                  </span>
                  <span style={{ fontSize: '13px', color: '#f1f5f9', fontWeight: 500 }}>
                    {milestone.duration}
                  </span>
                </div>

                {/* Recognition */}
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: 600,
                    }}
                  >
                    <Award size={14} style={{ color: milestone.accentColor }} />
                    Recognition
                  </span>
                  <span style={{ fontSize: '13px', color: '#f1f5f9', fontWeight: 500 }}>
                    {milestone.recognition}
                  </span>
                </div>

                {/* Organized By */}
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: 600,
                    }}
                  >
                    <Building2 size={14} style={{ color: milestone.accentColor }} />
                    Organized by
                  </span>
                  <span style={{ fontSize: '13px', color: '#f1f5f9', fontWeight: 500 }}>
                    {milestone.organizedBy}
                  </span>
                </div>

                {/* Tech Stack */}
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'flex-start', gap: '12px' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: 600,
                      marginTop: '3px',
                    }}
                  >
                    <Cpu size={14} style={{ color: milestone.accentColor }} />
                    Tech Stack
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {milestone.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: '11px',
                          color: '#e2e8f0',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontWeight: 500,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Links */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                flexWrap: 'wrap',
              }}
            >
              {milestone.fullDocUrl && (
                <a
                  href={milestone.fullDocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.07)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${milestone.accentColor}22`;
                    e.currentTarget.style.borderColor = milestone.accentColor;
                    e.currentTarget.style.color = milestone.accentColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  <FileText size={15} />
                  <span>View Full Document</span>
                </a>
              )}

              {milestone.eventUrl && milestone.eventUrl !== '#' && (
                <a
                  href={milestone.eventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#94a3b8',
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.color = '#94a3b8';
                  }}
                >
                  <ExternalLink size={15} />
                  <span>Event / Platform Page</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Lightbox if user clicks on the preview */}
      {isZoomed && activeSlide && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(false);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(3, 4, 8, 0.96)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            animation: 'modalFadeIn 0.2s ease-out',
            cursor: 'zoom-out',
          }}
        >
          <button
            onClick={() => setIsZoomed(false)}
            aria-label="Close full view"
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>

          <img
            src={activeSlide.src}
            alt={activeSlide.alt}
            style={{
              maxWidth: '94vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)',
            }}
          />
        </div>
      )}

      {/* Responsive Styles & Keyframes */}
      <style jsx global>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @media (max-width: 868px) {
          .achievement-modal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
