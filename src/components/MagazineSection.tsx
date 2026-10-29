'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
  Award,
  Terminal,
  Compass,
  FileCode,
  ShieldCheck,
  Globe,
  TrendingUp,
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function MagazineSection() {
  // Book open / closed state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpeningTransition, setIsOpeningTransition] = useState(false);

  // Spread index (0 to 5)
  const [currentSpread, setCurrentSpread] = useState(1); // Default to Contents & Manifesto
  const [turningState, setTurningState] = useState<{
    isTurning: boolean;
    direction: 'next' | 'prev' | null;
    fromSpread: number;
    toSpread: number;
  }>({
    isTurning: false,
    direction: null,
    fromSpread: 1,
    toSpread: 1,
  });

  const totalSpreads = 6;

  const tabs = [
    { label: 'Intro & Mindset', spread: 0 },
    { label: 'TOC & Manifesto', spread: 1 },
    { label: 'Architecture', spread: 2 },
    { label: 'War Stories', spread: 3 },
    { label: 'AI & Community', spread: 4 },
    { label: 'Colophon', spread: 5 },
  ];

  // Turn page forward
  const turnNext = () => {
    if (turningState.isTurning) return;
    const nextIdx = currentSpread < totalSpreads - 1 ? currentSpread + 1 : 0;
    triggerPageTurn('next', currentSpread, nextIdx);
  };

  // Turn page backward
  const turnPrev = () => {
    if (turningState.isTurning) return;
    const prevIdx = currentSpread > 0 ? currentSpread - 1 : totalSpreads - 1;
    triggerPageTurn('prev', currentSpread, prevIdx);
  };

  // Jump to specific spread
  const jumpToSpread = (targetSpread: number) => {
    if (targetSpread === currentSpread || turningState.isTurning) return;
    const direction = targetSpread > currentSpread ? 'next' : 'prev';
    triggerPageTurn(direction, currentSpread, targetSpread);
  };

  const triggerPageTurn = (direction: 'next' | 'prev', from: number, to: number) => {
    setTurningState({
      isTurning: true,
      direction,
      fromSpread: from,
      toSpread: to,
    });
    trackEvent('magazine_spread_turn', { fromSpread: from, toSpread: to, direction });

    setTimeout(() => {
      setCurrentSpread(to);
      setTurningState({
        isTurning: false,
        direction: null,
        fromSpread: to,
        toSpread: to,
      });
    }, 620); // Sync with CSS 3D animation duration
  };

  // Open book handler
  const handleOpenBook = () => {
    trackEvent('magazine_open');
    setIsOpeningTransition(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsOpeningTransition(false);
    }, 450);
  };

  // Close book handler
  const handleCloseBook = () => {
    setIsOpen(false);
  };

  return (
    <section
      id="magazine"
      style={{
        position: 'relative',
        minHeight: '110vh',
        width: '100vw',
        backgroundColor: '#090a0f',
        color: '#f8fafc',
        padding: '100px 32px 100px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Image Layer */}
      <div
        id="magazine-bg-image"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: isOpen
            ? `url('/assets/workspace-table.png')`
            : `url('/assets/workspace-with-closed-book.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(1.18) contrast(1.05)',
          zIndex: 1,
        }}
      />

      {/* Atmospheric Vignette & Soft Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 50% 50%, rgba(9, 10, 15, 0.25) 0%, rgba(7, 8, 12, 0.65) 100%),
            linear-gradient(to bottom, rgba(9, 10, 15, 0.88) 0%, rgba(9, 10, 15, 0.45) 22%, transparent 38%, transparent 80%, rgba(9, 10, 15, 0.88) 100%)
          `,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Floating Section Header (Pure typography, no heavy bounding box, high contrast) */}
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          marginBottom: isOpen ? '24px' : '44px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isOpen ? 'center' : 'flex-start',
          textAlign: isOpen ? 'center' : 'left',
          position: 'relative',
          zIndex: 20,
        }}
      >
        {/* Issue Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            color: '#f59e0b',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '14px',
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          <BookOpen size={13} />
          <span>PORTFOLIO MAGAZINE • ISSUE 01</span>
        </div>

        {/* Section Heading */}
        <h2
          style={{
            fontSize: 'clamp(32px, 4.2vw, 48px)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.025em',
            marginBottom: '12px',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 0.85)',
            lineHeight: 1.15,
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          The Developer Magazine
        </h2>

        {/* Subtitle - Shifted to left over dark area with high contrast */}
        <p
          id="magazine-subtitle"
          style={{
            fontSize: '15px',
            color: '#cbd5e1',
            maxWidth: '520px',
            lineHeight: 1.6,
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.95)',
            margin: 0,
          }}
        >
          {isOpen
            ? 'Flip through backstage engineering memoirs, architectural blueprints, and hackathon war stories.'
            : 'Click the book on the desk to flip through architectural blueprints, 36h hackathon war stories, and core engineering principles.'}
        </p>

        {/* When Open: Controls and Category Tabs */}
        {isOpen && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '1180px',
              marginTop: '24px',
              flexWrap: 'wrap',
              gap: '14px',
            }}
          >
            {/* Close / Return to Desk */}
            <button
              onClick={handleCloseBook}
              id="magazine-close-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#f1f5f9',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.2)';
                e.currentTarget.style.color = '#f59e0b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = '#f1f5f9';
              }}
            >
              <RotateCcw size={13} />
              <span>Close Book</span>
            </button>

            {/* Navigation Tabs */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'rgba(15, 17, 26, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '9999px',
                padding: '4px',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                flexWrap: 'wrap',
                gap: '4px',
              }}
            >
              {tabs.map((tab) => {
                const isActive = currentSpread === tab.spread;
                return (
                  <button
                    key={tab.label}
                    onClick={() => jumpToSpread(tab.spread)}
                    style={{
                      background: isActive ? '#f59e0b' : 'transparent',
                      color: isActive ? '#090a0f' : '#94a3b8',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '6px 14px',
                      fontSize: '12px',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'Space Grotesk, sans-serif',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Spread Indicator and Prev/Next buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  fontSize: '12px',
                  color: '#94a3b8',
                  fontFamily: 'Space Grotesk, monospace',
                  marginRight: '6px',
                }}
              >
                Spread {currentSpread + 1} of {totalSpreads}
              </span>

              <button
                onClick={turnPrev}
                title="Previous Spread"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: 'none',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.25)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)')}
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={turnNext}
                title="Next Spread"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: 'none',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.25)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)')}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 3D BOOK STAGE                                                */}
      {/* ============================================================ */}
      <div
        style={{
          position: 'relative',
          zIndex: 15,
          perspective: '2400px',
          width: '100%',
          maxWidth: isOpen ? '1180px' : '520px',
          transition: 'max-width 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* STATE 1: CLOSED MAGAZINE RESTING DIRECTLY ON DESK TABLE */}
        {!isOpen && (
          <div
            onClick={handleOpenBook}
            id="closed-magazine-trigger"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '640px',
              height: '360px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Interactive Invitation Badge floating cleanly above the book */}
            <div
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 28px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(245, 158, 11, 0.95)',
                color: '#090a0f',
                fontSize: '12.5px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                boxShadow: '0 10px 32px rgba(245, 158, 11, 0.55), 0 0 20px rgba(245, 158, 11, 0.35)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                userSelect: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 14px 40px rgba(245, 158, 11, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 32px rgba(245, 158, 11, 0.55)';
              }}
            >
              <Sparkles size={16} />
              <span>CLICK TO OPEN MAGAZINE</span>
              <BookOpen size={16} />
            </div>
          </div>
        )}

        {/* STATE 2: OPEN DUAL-PAGE SPREAD ON DESK */}
        {isOpen && (
          <div
            id="open-magazine-spread"
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '680px',
              backgroundColor: '#0c0d12',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: `
                0 30px 80px -15px rgba(0, 0, 0, 0.95),
                0 0 50px rgba(0, 0, 0, 0.8),
                inset 0 0 20px rgba(0, 0, 0, 0.6)
              `,
              display: 'flex',
              overflow: 'hidden',
              perspective: '2000px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Left Edge Multi-page Stack Detailing */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${Math.max(4, currentSpread * 3)}px`,
                height: '100%',
                background: 'repeating-linear-gradient(to right, #475569 0px, #cbd5e1 1px, #1e293b 2px)',
                zIndex: 4,
                boxShadow: 'inset 1px 0 2px rgba(0,0,0,0.6)',
              }}
            />

            {/* Right Edge Multi-page Stack Detailing */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: `${Math.max(4, (totalSpreads - currentSpread) * 3)}px`,
                height: '100%',
                background: 'repeating-linear-gradient(to left, #475569 0px, #cbd5e1 1px, #1e293b 2px)',
                zIndex: 4,
                boxShadow: 'inset -1px 0 2px rgba(0,0,0,0.6)',
              }}
            />

            {/* Center Spine Crease / Binding Shadow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '100%',
                background:
                  'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.7) 100%)',
                zIndex: 25,
                pointerEvents: 'none',
              }}
            />

            {/* LEFT PAGE OF SPREAD */}
            <div
              onClick={turnPrev}
              title="Click left page to turn back"
              style={{
                flex: 1,
                padding: '48px 44px 40px 52px',
                backgroundColor: '#12141d',
                backgroundImage: `
                  radial-gradient(circle at 10% 20%, rgba(245, 158, 11, 0.04) 0%, transparent 60%),
                  linear-gradient(to right, #12141d 0%, #10121a 90%, #0a0b10 100%)
                `,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                borderRight: '1px solid rgba(0, 0, 0, 0.7)',
                cursor: 'pointer',
              }}
            >
              {/* Running Folio Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '12px',
                  marginBottom: '24px',
                }}
              >
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: '#818cf8',
                    textTransform: 'uppercase',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  AG EDITORIAL • ISSUE 01
                </span>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  PAGE {String(currentSpread * 2 + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Dynamic Left Page Content */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {renderLeftPage(currentSpread, jumpToSpread)}
              </div>

              {/* Page Turn Indicator Hint */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '16px',
                  fontSize: '11px',
                  color: '#475569',
                }}
              >
                <ChevronLeft size={13} />
                <span>Click page to turn back</span>
              </div>
            </div>

            {/* RIGHT PAGE OF SPREAD */}
            <div
              onClick={turnNext}
              title="Click right page to turn forward"
              style={{
                flex: 1,
                padding: '48px 52px 40px 44px',
                backgroundColor: '#12141d',
                backgroundImage: `
                  radial-gradient(circle at 90% 80%, rgba(129, 140, 248, 0.04) 0%, transparent 60%),
                  linear-gradient(to left, #12141d 0%, #10121a 90%, #0a0b10 100%)
                `,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              {/* Running Folio Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '12px',
                  marginBottom: '24px',
                }}
              >
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  PAGE {String(currentSpread * 2 + 2).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: '#f59e0b',
                    textTransform: 'uppercase',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  DEVELOPER MAGAZINE
                </span>
              </div>

              {/* Dynamic Right Page Content */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {renderRightPage(currentSpread)}
              </div>

              {/* Page Turn Indicator Hint */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '6px',
                  marginTop: '16px',
                  fontSize: '11px',
                  color: '#475569',
                }}
              >
                <span>Click page to turn forward</span>
                <ChevronRight size={13} />
              </div>
            </div>

            {/* 3D TURNING PAGE OVERLAY */}
            {turningState.isTurning && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: turningState.direction === 'next' ? '50%' : 0,
                  width: '50%',
                  height: '100%',
                  transformOrigin: turningState.direction === 'next' ? 'left center' : 'right center',
                  animation: `${
                    turningState.direction === 'next' ? 'pageFlipNext' : 'pageFlipPrev'
                  } 0.62s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`,
                  transformStyle: 'preserve-3d',
                  zIndex: 30,
                  pointerEvents: 'none',
                }}
              >
                {/* Front of Turning Leaf */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: '#12141d',
                    padding: '48px 44px',
                    backfaceVisibility: 'hidden',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div style={{ opacity: 0.35 }}>
                    {turningState.direction === 'next'
                      ? renderRightPage(turningState.fromSpread)
                      : renderLeftPage(turningState.fromSpread, jumpToSpread)}
                  </div>
                </div>

                {/* Back of Turning Leaf */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: '#10121a',
                    padding: '48px 44px',
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div style={{ opacity: 0.35 }}>
                    {turningState.direction === 'next'
                      ? renderLeftPage(turningState.toSpread, jumpToSpread)
                      : renderRightPage(turningState.toSpread)}
                  </div>
                </div>

                {/* Moving Curvature Shadow */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%, rgba(0,0,0,0.5) 100%)',
                    zIndex: 2,
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Global CSS for 3D page flip keyframes & Responsive Layout */}
      <style jsx global>{`
        @keyframes pageFlipNext {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(-90deg) scale(0.96);
          }
          100% {
            transform: rotateY(-180deg);
          }
        }

        @keyframes pageFlipPrev {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(90deg) scale(0.96);
          }
          100% {
            transform: rotateY(180deg);
          }
        }
      `}</style>
    </section>
  );
}

// =========================================================================
// HELPER: RENDER LEFT PAGE CONTENT (Rich Editorial & Systems Essays)
// =========================================================================
function renderLeftPage(spread: number, jumpToSpread: (s: number) => void) {
  switch (spread) {
    case 0: // Spread 0: Editor's Desk / Introduction
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#f59e0b',
              fontSize: '11px',
              fontWeight: 700,
              width: 'fit-content',
            }}
          >
            THE CRAFT OF SOFTWARE
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            The Art of Frictionless Systems
          </h2>
          <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.7 }}>
            Welcome to my interactive engineering memoirs. Software is often marketed through a flurry of buzzwords, but beneath the noise lies a quiet, disciplined craft: turning chaotic real-world friction into dependable digital systems.
          </p>
          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.65 }}>
            You won&apos;t find boilerplate project cards in these pages (those can be verified live in the Projects track). Instead, this publication offers a backstage pass into how I reason about system architecture, performance budgets, and building for human empathy.
          </p>

          <div
            style={{
              marginTop: '12px',
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
              Arin Gupta
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              Software Engineer &amp; AI/ML Developer • MITS Gwalior
            </div>
          </div>
        </div>
      );

    case 1: // Spread 1: Table of Contents
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#f59e0b',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              EDITORIAL INDEX
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>
              Contents of Issue 01
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { num: '01–02', title: "The Editor's Desk & Trade-offs", spread: 0 },
              { num: '03–04', title: 'The Developer Manifesto: 5 Rules', spread: 1 },
              { num: '05–06', title: 'Architecture Blueprint: AST & Daemons', spread: 2 },
              { num: '07–08', title: 'War Stories: 36h Sprints & Post-Mortems', spread: 3 },
              { num: '09–10', title: 'Applied AI & Mentoring 250+ Peers', spread: 4 },
              { num: '11–12', title: 'The Next Horizon & Direct Contact', spread: 5 },
            ].map((item) => (
              <div
                key={item.num}
                onClick={(e) => {
                  e.stopPropagation();
                  jumpToSpread(item.spread);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#f59e0b',
                      fontFamily: 'Space Grotesk, monospace',
                    }}
                  >
                    {item.num}
                  </span>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#f1f5f9' }}>
                    {item.title}
                  </span>
                </div>
                <ArrowRight size={13} color="#94a3b8" />
              </div>
            ))}
          </div>
        </div>
      );

    case 2: // Spread 2: Architecture Blueprint (Deconstructing Complexity)
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              backgroundColor: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              fontSize: '10px',
              fontWeight: 700,
              width: 'fit-content',
            }}
          >
            SYSTEM ARCHITECTURE
          </div>

          <h2 style={{ fontSize: '25px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            Turning Spaghetti into Sanity
          </h2>
          <p style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 600 }}>
            Deconstructing monolithic codebases into visual dependency graphs
          </p>

          <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.65 }}>
            When software scales organically, cognitive load skyrockets. Files import modules in cyclical tangles, and every refactor feels like pulling a Jenga block.
          </p>

          <p style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: 1.6 }}>
            My approach: treat code as AST data. By parsing abstract syntax trees into Directed Acyclic Graphs (DAGs), circular dependencies and dead code paths become instantly visual, transforming dread into clarity.
          </p>

          <div
            style={{
              padding: '12px 14px',
              borderRadius: '10px',
              backgroundColor: 'rgba(56, 189, 248, 0.05)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8' }}>
              CORE DESIGN HEURISTICS:
            </div>
            {['Decouple state transitions from render side effects', 'Isolate third-party SDKs behind typed facades', 'Strict boundary enforcement between domain models'].map((h) => (
              <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#cbd5e1' }}>
                <CheckCircle2 size={12} color="#38bdf8" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 3: // Spread 3: War Stories: Hackathon Trenches
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#f59e0b',
              fontSize: '10px',
              fontWeight: 700,
              width: 'fit-content',
            }}
          >
            BATTLE TESTED
          </div>

          <h2 style={{ fontSize: '25px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            The 36-Hour Crucible
          </h2>
          <p style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 600 }}>
            What sleep deprivation &amp; ticking clocks teach about shipping
          </p>

          <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.65 }}>
            During the VibeState &apos;25 hackathon (where our emergency distress system reached the National Finals) and LakeCity, we had no room for academic perfection.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              style={{
                borderLeft: '2px solid #f59e0b',
                paddingLeft: '12px',
              }}
            >
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#ffffff' }}>
                Rule 1: Scope to 30% of your ambition
              </div>
              <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '2px', lineHeight: 1.5 }}>
                Spend the remaining 70% of sprint time perfecting the primary user flow, handling connection drops, and polishing UI latency.
              </div>
            </div>

            <div
              style={{
                borderLeft: '2px solid #f59e0b',
                paddingLeft: '12px',
              }}
            >
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#ffffff' }}>
                Rule 2: Demos live or die in the first 45 seconds
              </div>
              <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '2px', lineHeight: 1.5 }}>
                Evaluators rarely inspect back-office schemas. They evaluate the visceral feel of the working system in their own hands.
              </div>
            </div>
          </div>
        </div>
      );

    case 4: // Spread 4: Practical AI Beyond Hype
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              backgroundColor: 'rgba(129, 140, 248, 0.12)',
              border: '1px solid rgba(129, 140, 248, 0.3)',
              color: '#818cf8',
              fontSize: '10px',
              fontWeight: 700,
              width: 'fit-content',
            }}
          >
            FRONTIER TECH
          </div>

          <h2 style={{ fontSize: '25px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            AI as a Multiplier, Not a Crutch
          </h2>
          <p style={{ fontSize: '12px', color: '#818cf8', fontWeight: 600 }}>
            Where transformers shine &amp; where deterministic code must hold the line
          </p>

          <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.65 }}>
            Transformers and semantic embeddings are miraculous for contextual search and fuzzy AST matching. But in production systems, probabilistic models cannot be trusted with safety-critical state transitions.
          </p>

          <div
            style={{
              padding: '14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(129, 140, 248, 0.06)',
              border: '1px solid rgba(129, 140, 248, 0.2)',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#818cf8', marginBottom: '4px' }}>
              THE HYBRID PARADIGM
            </div>
            <div style={{ fontSize: '12.5px', color: '#e2e8f0', lineHeight: 1.6 }}>
              Pair the generative flexibility of AI for discovery with the rigid predictability of typed schemas (Zod / Pydantic) for state execution.
            </div>
          </div>
        </div>
      );

    case 5: // Spread 5: The Next Horizon
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              backgroundColor: 'rgba(52, 211, 153, 0.12)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              color: '#34d399',
              fontSize: '10px',
              fontWeight: 700,
              width: 'fit-content',
            }}
          >
            ENGINEERING ROADMAP
          </div>

          <h2 style={{ fontSize: '25px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            What I&apos;m Exploring Next
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                title: 'Rust & Low-Level Runtimes',
                detail: 'Benchmarking kernel-level performance, memory safety, and native daemons.',
              },
              {
                title: 'Local-First CRDT Data Stores',
                detail: 'Building distributed multi-user software where offline resilience is zero-effort.',
              },
              {
                title: 'Autonomous Dev Agent Toolchains',
                detail: 'Structured agent loops that safely interact with real-world developer environments.',
              },
            ].map((exp) => (
              <div
                key={exp.title}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#f1f5f9', marginBottom: '2px' }}>
                  {exp.title}
                </div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.5 }}>
                  {exp.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

// =========================================================================
// HELPER: RENDER RIGHT PAGE CONTENT (Manifesto, Post-Mortems, Community)
// =========================================================================
function renderRightPage(spread: number) {
  switch (spread) {
    case 0: // Spread 0: Editorial Note & Decision Framework
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              backgroundColor: 'rgba(129, 140, 248, 0.1)',
              border: '1px solid rgba(129, 140, 248, 0.3)',
              color: '#818cf8',
              fontSize: '11px',
              fontWeight: 700,
              width: 'fit-content',
            }}
          >
            DECISION FRAMEWORK
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            How I Navigate Trade-Offs
          </h2>

          <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.65 }}>
            Every line of production code is a negotiation between speed of delivery, long-term maintainability, and user latency. Here is how I weigh those forces:
          </p>

          <div
            style={{
              borderLeft: '2px solid #818cf8',
              paddingLeft: '16px',
              margin: '6px 0',
              fontStyle: 'italic',
              fontSize: '12.5px',
              color: '#94a3b8',
              lineHeight: 1.6,
            }}
          >
            &ldquo;Code is read 10 times more often than it is written. If an architecture cannot be explained to a peer in 60 seconds, it is a liability.&rdquo;
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
            {[
              { label: 'Latency Budget', desc: '<100ms for UI reactions, <5ms telemetry overhead' },
              { label: 'Empathy Metric', desc: 'A failed request is a human frustration, not just a 500 status' },
            ].map((p) => (
              <div key={p.label} style={{ fontSize: '12px', color: '#cbd5e1' }}>
                <strong style={{ color: '#818cf8' }}>{p.label}: </strong>
                <span>{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 1: // Spread 1: The Developer's Manifesto
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#818cf8',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              CORE VALUES
            </div>
            <h2 style={{ fontSize: '25px', fontWeight: 800, color: '#ffffff' }}>
              The 5 Engineering Rules
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              {
                title: '1. Measure Before You Optimize',
                desc: 'Profile flamegraphs and memory allocations before writing clever workarounds.',
              },
              {
                title: '2. Fail Loud in Dev, Graceful in Prod',
                desc: 'Expose stacktraces locally; keep user sessions functional under isolated failures.',
              },
              {
                title: '3. UI Is Part of System Architecture',
                desc: 'Optimistic updates and skeletons make 200ms latency feel instantaneous.',
              },
              {
                title: "4. Respect the User's Hardware",
                desc: 'Every background thread, socket listener, and bundle MB must justify its footprint.',
              },
              {
                title: '5. Documentation Is Kindness',
                desc: 'Clear Git histories and typed contracts respect the engineers who inherit your code.',
              },
            ].map((p) => (
              <div
                key={p.title}
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#f1f5f9', marginBottom: '2px' }}>
                  {p.title}
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.45 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case 2: // Spread 2: Real-Time Pipelines & Sensors
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              backgroundColor: 'rgba(129, 140, 248, 0.12)',
              border: '1px solid rgba(129, 140, 248, 0.3)',
              color: '#818cf8',
              fontSize: '10px',
              fontWeight: 700,
              width: 'fit-content',
            }}
          >
            REAL-TIME PIPELINES
          </div>

          <h2 style={{ fontSize: '25px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            Sub-200ms Telemetry Pipelines
          </h2>
          <p style={{ fontSize: '12px', color: '#818cf8', fontWeight: 600 }}>
            Engineering sensor daemons that survive network dropouts
          </p>

          <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.65 }}>
            Real-time systems must handle the messy real world: flaking 4G handoffs, device battery throttling, and erratic packet loss.
          </p>

          <div
            style={{
              padding: '14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(129, 140, 248, 0.06)',
              border: '1px solid rgba(129, 140, 248, 0.2)',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#818cf8', marginBottom: '4px' }}>
              LOCAL-FIRST OPTIMISM
            </div>
            <div style={{ fontSize: '12.5px', color: '#e2e8f0', lineHeight: 1.6 }}>
              Events buffer to indexed local storage instantly. When the socket reconnects, exponential backoff flushes deduplicated deltas without blocking the 60 FPS render thread.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
            {['WebSockets', 'Worker Threads', 'Vector Timestamps', 'Local-First Cache', 'Delta Sync'].map((t) => (
              <span
                key={t}
                style={{
                  fontSize: '11px',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  color: '#94a3b8',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      );

    case 3: // Spread 3: Post-Mortems & Bugs
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#f59e0b',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              DEBUGGING CHRONICLES
            </div>
            <h2 style={{ fontSize: '25px', fontWeight: 800, color: '#ffffff' }}>
              Bugs That Made Me Better
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#f59e0b', marginBottom: '3px' }}>
                The Ghost Memory Leak (1.2 GB RAM)
              </div>
              <div style={{ fontSize: '11.5px', color: '#cbd5e1', lineHeight: 1.5 }}>
                A telemetry daemon consumed server RAM over 48 hours. Cause: uncleaned listener closures in a reconnect loop. Taught me to always build deterministic disposers.
              </div>
            </div>

            <div
              style={{
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#38bdf8', marginBottom: '3px' }}>
                The Out-of-Order Sensor Dispatch
              </div>
              <div style={{ fontSize: '11.5px', color: '#cbd5e1', lineHeight: 1.5 }}>
                Variable cellular round-trips caused distress events to arrive out of order. Solved by monotonic vector timestamps on device-side dispatches.
              </div>
            </div>
          </div>
        </div>
      );

    case 4: // Spread 4: Community & Mentorship
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              backgroundColor: 'rgba(52, 211, 153, 0.12)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              color: '#34d399',
              fontSize: '10px',
              fontWeight: 700,
              width: 'fit-content',
            }}
          >
            SHARING KNOWLEDGE
          </div>

          <h2 style={{ fontSize: '25px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            Mentoring 250+ Peers &amp; Open Source
          </h2>

          <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.65 }}>
            As GitHub Coordinator at MITS Gwalior, I organized developer bootcamps, git workflows, and hackathon teams for over 250 students.
          </p>

          <p style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: 1.6 }}>
            Teaching is the ultimate test of understanding: if you cannot explain an abstraction without relying on jargon, you don&apos;t truly grasp it yet.
          </p>

          <div
            style={{
              padding: '14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(52, 211, 153, 0.06)',
              border: '1px solid rgba(52, 211, 153, 0.2)',
            }}
          >
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#34d399', fontFamily: 'Space Grotesk, sans-serif' }}>
              250+ Engineers Mentored
            </div>
            <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '2px' }}>
              Active contributor to Nexus Spring of Code (NSoC) and open student tooling.
            </div>
          </div>
        </div>
      );

    case 5: // Spread 5: Colophon & Closing
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#f59e0b',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              COLOPHON &amp; CONTACT
            </div>
            <h2 style={{ fontSize: '25px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Let&apos;s Build Something Resilient
            </h2>
            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6 }}>
              Whether you are looking for an engineer who understands full-stack performance, an internship collaborator, or want to discuss system architectures:
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div style={{ fontSize: '12px', color: '#f1f5f9' }}>
              <strong style={{ color: '#f59e0b' }}>Direct Email: </strong> aringupta2244@gmail.com
            </div>
            <div style={{ fontSize: '12px', color: '#f1f5f9' }}>
              <strong style={{ color: '#818cf8' }}>GitHub: </strong> github.com/arin-gupta06
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748b' }}>
              Open to high-impact software roles &amp; remote collaborations worldwide.
            </div>
          </div>

          {/* Barcode & Publication Seal */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '14px',
            }}
          >
            <div style={{ display: 'flex', gap: '2px', height: '22px', opacity: 0.6 }}>
              {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 1, 3].map((w, i) => (
                <div key={i} style={{ width: `${w}px`, height: '100%', backgroundColor: '#cbd5e1' }} />
              ))}
            </div>
            <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'Space Grotesk, monospace' }}>
              ISSN 2026-ARIN-DEV
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
