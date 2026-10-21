'use client';

import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Terminal,
  Code2,
  Globe,
  Cpu,
  Zap,
  Mail,
  Github,
  Linkedin,
  Calendar,
  CheckCircle2,
  BookOpen,
  RotateCcw,
  Maximize2,
  Layers,
  ArrowUpRight,
  Eye,
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function MagazineSection() {
  // Book open / closed state
  const [isOpen, setIsOpen] = useState(false);
  const [isOpeningTransition, setIsOpeningTransition] = useState(false);

  // Spread index (0 to 5)
  const [currentSpread, setCurrentSpread] = useState(1); // Default to Contents & Philosophy
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
    { label: 'Intro', spread: 0 },
    { label: 'Contents', spread: 1 },
    { label: 'Projects', spread: 2 },
    { label: 'Tech Stack', spread: 3 },
    { label: 'Milestones', spread: 4 },
    { label: 'Back Cover', spread: 5 },
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
      {/* Background Image Layer with Enhanced Brightness & Clarity */}
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
          filter: 'brightness(1.22) contrast(1.05)',
          zIndex: 1,
        }}
      />

      {/* Atmospheric Vignette & Soft Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 50% 50%, rgba(9, 10, 15, 0.2) 0%, rgba(7, 8, 12, 0.6) 100%),
            linear-gradient(to bottom, rgba(9, 10, 15, 0.85) 0%, rgba(9, 10, 15, 0.4) 22%, transparent 36%, transparent 80%, rgba(9, 10, 15, 0.85) 100%)
          `,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Floating Section Header */}
      <div
        style={{
          width: '100%',
          maxWidth: '1240px',
          marginBottom: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 20,
        }}
      >
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
            marginBottom: '14px',
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          <BookOpen size={13} />
          <span>PORTFOLIO MAGAZINE</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(32px, 4.2vw, 48px)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.025em',
            marginBottom: '12px',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.85), 0 2px 6px rgba(0, 0, 0, 0.6)',
          }}
        >
          The Developer Magazine
        </h2>

        <p
          id="magazine-subtitle"
          style={{
            fontSize: '15px',
            color: !isOpen ? '#090a0f' : '#94a3b8',
            maxWidth: '580px',
            lineHeight: 1.6,
            fontWeight: !isOpen ? 600 : 400,
          }}
        >
          {isOpen
            ? 'Flip through the pages to read about how I build software, my background, and project highlights.'
            : 'Click the book on the desk to flip through the interactive magazine.'}
        </p>

        {/* When Open: Controls and Category Tabs */}
        {isOpen && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '1160px',
              marginTop: '24px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            {/* Close / Return to Desk button */}
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
                backgroundColor: 'rgba(15, 17, 26, 0.65)',
                borderRadius: '9999px',
                padding: '4px',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
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
          maxWidth: isOpen ? '1180px' : '480px',
          transition: 'max-width 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* ============================================================ */}
        {/* STATE 1: CLOSED MAGAZINE RESTING DIRECTLY ON DESK TABLE      */}
        {/* ============================================================ */}
        {!isOpen && (
          <div
            onClick={handleOpenBook}
            id="closed-magazine-trigger"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '640px',
              height: '340px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            {/* Interactive Invitation Badge floating above the physical book to prevent hindering the cover art */}
            <div
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '11px 26px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(245, 158, 11, 0.95)',
                color: '#090a0f',
                fontSize: '12.5px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                boxShadow: '0 8px 28px rgba(245, 158, 11, 0.5), 0 0 16px rgba(245, 158, 11, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                userSelect: 'none',
                transform: 'translateY(-14px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-18px) scale(1.04)';
                e.currentTarget.style.boxShadow = '0 14px 36px rgba(245, 158, 11, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-14px) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(245, 158, 11, 0.5)';
              }}
            >
              <Sparkles size={15} />
              <span>CLICK TO OPEN MAGAZINE</span>
              <BookOpen size={15} />
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STATE 2: OPEN DUAL-PAGE SPREAD ON DESK                        */}
        {/* ============================================================ */}
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
                background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.7) 100%)',
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

            {/* ======================================================== */}
            {/* 3D TURNING PAGE OVERLAY (During Flip Animation)          */}
            {/* ======================================================== */}
            {turningState.isTurning && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: turningState.direction === 'next' ? '50%' : '0',
                  width: '50%',
                  transformOrigin: turningState.direction === 'next' ? 'left center' : 'right center',
                  transformStyle: 'preserve-3d',
                  animation:
                    turningState.direction === 'next'
                      ? 'pageFlipNext 0.62s cubic-bezier(0.645, 0.045, 0.355, 1) forwards'
                      : 'pageFlipPrev 0.62s cubic-bezier(0.645, 0.045, 0.355, 1) forwards',
                  zIndex: 30,
                  backgroundColor: '#151822',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8)',
                  pointerEvents: 'none',
                }}
              >
                {/* Dynamic Shadow Sweeping Across Curvature */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      turningState.direction === 'next'
                        ? 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 40%, rgba(255,255,255,0.06) 70%, rgba(0,0,0,0.4) 100%)'
                        : 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 40%, rgba(255,255,255,0.06) 70%, rgba(0,0,0,0.4) 100%)',
                    zIndex: 2,
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Global CSS for 3D page flip keyframes */}
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
// HELPER: RENDER LEFT PAGE CONTENT
// =========================================================================
function renderLeftPage(spread: number, jumpToSpread: (s: number) => void) {
  switch (spread) {
    case 0: // Spread 0: Cover / Intro
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
            WELCOME
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            Building with Care &amp; Curiosity
          </h2>
          <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.7 }}>
            Welcome to my portfolio! I believe great software should feel fast, look clean, and make life a little simpler.
          </p>
          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.65 }}>
            Whether it&apos;s building a quick utility tool or designing a full-stack web platform, I focus on readable code, thoughtful design, and software that genuinely works well.
          </p>

          <div
            style={{
              marginTop: '16px',
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
              Full-Stack Developer &amp; Problem Solver
            </div>
          </div>
        </div>
      );

    case 1: // Spread 1: Table of Contents
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
              OVERVIEW
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>
              Table of Contents
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { num: '01–02', title: 'Welcome & How I Think', spread: 0 },
              { num: '03–04', title: 'Guiding Principles & Contents', spread: 1 },
              { num: '05–06', title: 'Featured Projects: Guardian AI & AetherOS', spread: 2 },
              { num: '07–08', title: 'Smart Systems (IARIS) & Technologies', spread: 3 },
              { num: '09–10', title: 'Hackathons, Milestones & Community', spread: 4 },
              { num: '11–12', title: 'Get in Touch & Wrap-up', spread: 5 },
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
                  padding: '10px 14px',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9' }}>
                    {item.title}
                  </span>
                </div>
                <ArrowRight size={13} color="#94a3b8" />
              </div>
            ))}
          </div>
        </div>
      );

    case 2: // Spread 2: Project 1 (Guardian AI)
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
            HACKATHON FINALIST
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            Guardian AI
          </h2>
          <p style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 600 }}>
            Fast emergency distress alerts when seconds count
          </p>

          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.65 }}>
            An offline-first safety app built to detect distress signals using phone sensors and send immediate alerts with almost no delay.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#cbd5e1' }}>HIGHLIGHTS:</div>
            {['Fast sensor alerts', 'Works offline with local storage', 'Direct emergency contact dispatch', 'Single-tap distress activation'].map((spec) => (
              <div key={spec} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94a3b8' }}>
                <CheckCircle2 size={13} color="#f59e0b" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 3: // Spread 3: Project 3 (IARIS Adaptive Resource Engine)
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
            RESOURCE OPTIMIZER
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            IARIS
          </h2>
          <p style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 600 }}>
            Smart resource monitor &amp; optimizer
          </p>

          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.65 }}>
            A lightweight system monitor that tracks how your computer uses resources and predicts needs to keep background performance smooth.
          </p>

          <div
            style={{
              padding: '14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(56, 189, 248, 0.06)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8', marginBottom: '4px' }}>
              BUILT WITH
            </div>
            <div style={{ fontSize: '13px', color: '#e2e8f0' }}>
              Python • FastAPI • React Dashboards • Lightweight analytics
            </div>
          </div>
        </div>
      );

    case 4: // Spread 4: Milestones & Hackathons
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
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
            EXPERIENCE &amp; MILESTONES
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            Milestones Along the Way
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              {
                title: 'Top Finalist — VibeState Hackathon (Guardian App)',
                year: '2025',
                desc: 'Built an emergency response app during a 36-hour sprint and pitched it as a national finalist.',
              },
              {
                title: 'Software Developer Intern — ByteEdu',
                year: '2026',
                desc: 'Helped build web tools, improve responsive pages, and maintain open-source projects.',
              },
              {
                title: 'AI Intern — DecodeLabs',
                year: '2026',
                desc: 'Worked on machine learning pipelines and real-world predictive models.',
              },
              {
                title: 'Open Source Contributor — Nexus Spring of Code (NSoC)',
                year: '2026',
                desc: 'Contributed code fixes and improvements to active open-source repositories.',
              },
            ].map((milestone) => (
              <div
                key={milestone.title}
                style={{
                  borderLeft: '2px solid #f59e0b',
                  paddingLeft: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
                    {milestone.title}
                  </span>
                  <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 600 }}>
                    {milestone.year}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                  {milestone.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case 5: // Spread 5: Services & Collaboration
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
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
            WHAT I CAN DO
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            How I Can Help
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                title: 'Full-Stack Web Development',
                detail: 'Building fast, modern web apps with React, Next.js, and clean backend services.',
              },
              {
                title: 'Practical AI & Automation',
                detail: 'Integrating helpful AI models and smart workflows to solve real problems.',
              },
              {
                title: 'Clean UI & Interaction Design',
                detail: 'Creating polished, responsive interfaces that look great on any screen.',
              },
            ].map((srv) => (
              <div
                key={srv.title}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#f1f5f9', marginBottom: '2px' }}>
                  {srv.title}
                </div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.5 }}>
                  {srv.detail}
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
// HELPER: RENDER RIGHT PAGE CONTENT
// =========================================================================
function renderRightPage(spread: number) {
  switch (spread) {
    case 0: // Spread 0: Editorial Note
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
            HOW I THINK
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            Simple Code, Great Experience
          </h2>

          <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.7 }}>
            Good software is about balance. Clean, dependable code on the inside, paired with an interface that feels effortless and inviting on the outside.
          </p>

          <div
            style={{
              borderLeft: '2px solid #818cf8',
              paddingLeft: '16px',
              margin: '8px 0',
              fontStyle: 'italic',
              fontSize: '13px',
              color: '#94a3b8',
              lineHeight: 1.6,
            }}
          >
            &ldquo;Good software doesn&apos;t need to be complicated. It should just feel fast, reliable, and effortless to use.&rdquo;
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
            {['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'FastAPI'].map((badge) => (
              <span
                key={badge}
                style={{
                  fontSize: '11px',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#cbd5e1',
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      );

    case 1: // Spread 1: The Design Principles
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#818cf8',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              CORE VALUES
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>
              How I Build
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              {
                title: 'Keep It Fast',
                desc: 'Nobody likes waiting. I aim for snappy page loads and efficient data handling.',
                tag: 'SPEED',
              },
              {
                title: 'Keep It Clean',
                desc: 'Code should be straightforward to read and maintain for anyone who touches it next.',
                tag: 'SIMPLICITY',
              },
              {
                title: 'Make It Feel Good',
                desc: 'Smooth interactions, clear layouts, and great contrast make everyday apps enjoyable.',
                tag: 'DESIGN',
              },
              {
                title: 'Keep It Reliable',
                desc: 'Apps should handle errors gracefully and never leave the user guessing.',
                tag: 'STABILITY',
              },
            ].map((p) => (
              <div
                key={p.title}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#f1f5f9' }}>{p.title}</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#818cf8' }}>{p.tag}</span>
                </div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.5 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case 2: // Spread 2: Project 2 (AetherOS Platform)
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
            SYSTEM VISUALIZER
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            AetherOS
          </h2>
          <p style={{ fontSize: '12px', color: '#818cf8', fontWeight: 600 }}>
            Visual system architecture &amp; modeling platform
          </p>

          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.65 }}>
            An interactive platform that lets developers map out their app architectures, simulate component failures, and explore ways to scale cleanly.
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
              CORE IDEA
            </div>
            <div style={{ fontSize: '13px', color: '#e2e8f0' }}>
              Turn abstract backend diagrams into living, interactive maps you can test and explore.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
            {['React Flow', 'Zustand', 'Node.js', 'Express', 'MongoDB', 'OpenAI API', 'WebSockets'].map((t) => (
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

    case 3: // Spread 3: Technical Mastery Matrix
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#38bdf8',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              SKILLS &amp; TOOLS
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>
              Technologies I Work With
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { category: 'Frontend', stack: 'Next.js, React, TypeScript, Vanilla CSS, Tailwind', pct: 'Active' },
              { category: 'Backend & APIs', stack: 'Node.js, Express, Python, FastAPI, REST APIs', pct: 'Active' },
              { category: 'Databases & Storage', stack: 'PostgreSQL, MongoDB, Supabase, Redis', pct: 'Active' },
              { category: 'DevOps & Tools', stack: 'Docker, Linux CLI, Git & GitHub, CI/CD', pct: 'Active' },
            ].map((tier) => (
              <div
                key={tier.category}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#38bdf8' }}>{tier.category}</span>
                  <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'Space Grotesk, monospace' }}>{tier.pct}</span>
                </div>
                <div style={{ fontSize: '11.5px', color: '#cbd5e1' }}>{tier.stack}</div>
              </div>
            ))}
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

          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            Learning &amp; Helping Others
          </h2>

          <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.65 }}>
            I enjoy sharing what I learn. Whether it&apos;s helping peers debug code, contributing to open-source projects, or discussing clean web development, growing together makes engineering fun.
          </p>

          <div
            style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: 'rgba(52, 211, 153, 0.06)',
              border: '1px solid rgba(52, 211, 153, 0.2)',
            }}
          >
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#34d399', fontFamily: 'Space Grotesk, sans-serif' }}>
              250+ Students &amp; Peers
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
              Collaborated with and helped across workshops, hackathons, and developer communities.
            </div>
          </div>
        </div>
      );

    case 5: // Spread 5: Back Cover & Contact Gateway
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
              LET&apos;S CONNECT
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Let&apos;s Build Something Great
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>
              Whether you have an exciting project, an internship opportunity, or just want to chat about tech, feel free to reach out!
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
              <strong>Direct Email:</strong> aringupta2244@gmail.com
            </div>
            <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
              <strong>Portfolio:</strong> aringupta.dev
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              India • Open to remote opportunities worldwide
            </div>
          </div>

          {/* Barcode & Publication Seal */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '16px',
            }}
          >
            <div style={{ display: 'flex', gap: '2px', height: '24px', opacity: 0.6 }}>
              {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 1, 3].map((w, i) => (
                <div key={i} style={{ width: `${w}px`, height: '100%', backgroundColor: '#cbd5e1' }} />
              ))}
            </div>
            <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'Space Grotesk, monospace' }}>
              ISSN 2026-AG-DEV
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
