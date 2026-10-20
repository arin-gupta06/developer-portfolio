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
            radial-gradient(circle at 50% 35%, rgba(245, 158, 11, 0.08) 0%, transparent 65%),
            radial-gradient(circle at 50% 50%, rgba(9, 10, 15, 0.15) 0%, rgba(7, 8, 12, 0.52) 100%),
            linear-gradient(to bottom, rgba(9, 10, 15, 0.75) 0%, transparent 18%, transparent 82%, rgba(9, 10, 15, 0.75) 100%)
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
          <span>PORTFOLIO MONOGRAPH • VOL. 01</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(32px, 4.2vw, 48px)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.025em',
            marginBottom: '10px',
          }}
        >
          The Editorial Magazine
        </h2>

        <p
          style={{
            fontSize: '15px',
            color: '#94a3b8',
            maxWidth: '580px',
            lineHeight: 1.6,
          }}
        >
          {isOpen
            ? 'Flip through the dual spreads to explore system architectures, core engineering philosophies, and project breakdowns.'
            : 'Click the publication to open and explore the 10-page monograph.'}
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
              <span>Close to Desk</span>
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
              <span>CLICK TO OPEN MONOGRAPH</span>
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
                  ENGINEERING MONOGRAPH
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
            PROLOGUE & VISION
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            Engineering with Obsessive Craft
          </h2>
          <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.7 }}>
            In an era where digital noise proliferates, this monograph stands as a dedicated physical artifact of code,
            systems architecture, and user intuition.
          </p>
          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.65 }}>
            Every application I design is anchored in deep system ergonomics — balancing raw algorithmic speed with
            tactile aesthetic cohesion.
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
              Full-Stack Developer • Platform Architect
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
              INDEX OF WORKS
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>
              Table of Contents
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { num: '01–02', title: 'Prologue & Systems Engineering Philosophy', spread: 0 },
              { num: '03–04', title: 'Design Principles & Monograph Index', spread: 1 },
              { num: '05–06', title: 'Flagship Systems: Guardian AI & AetherOS', spread: 2 },
              { num: '07–08', title: 'Adaptive Telemetry (IARIS) & Core Matrix', spread: 3 },
              { num: '09–10', title: 'Hackathon Honors & Community Impact', spread: 4 },
              { num: '11–12', title: 'Back Cover & Collaboration Gateway', spread: 5 },
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
            HACKATHON GRAND PRIZE WINNER
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            Guardian AI
          </h2>
          <p style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 600 }}>
            Autonomous Edge Computer Vision & Distress Detection
          </p>

          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.65 }}>
            An offline-first safety telemetry companion engineered to run lightweight computer vision and acoustic risk models
            directly on local edge devices with sub-200ms trigger latency.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#cbd5e1' }}>ARCHITECTURE SPEC:</div>
            {['Edge YOLOv8 Inference', 'Offline-First SQLite Cache', 'Encrypted WebSocket Mesh', 'Zero Cloud Dependency Mode'].map((spec) => (
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
            ADAPTIVE SYSTEMS & TELEMETRY
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            IARIS
          </h2>
          <p style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 600 }}>
            Intent-Aware Adaptive Resource Intelligence System
          </p>

          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.65 }}>
            An intelligent resource telemetry platform that models running process workloads, computes cold-start predictions
            via Similarity Matching, and applies Delta-Based Caching to minimize runtime monitoring overhead.
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
              KEY ARCHITECTURE
            </div>
            <div style={{ fontSize: '13px', color: '#e2e8f0' }}>
              Python • FastAPI • React Dashboards • EWMA Continuity Learning Engine
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
            PROVEN TRACK RECORD
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            Honors & Accolades
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              {
                title: 'Top Finalist — Vibestate Hackathon (Guardian App)',
                year: '2024',
                desc: 'Recognized as national finalists for Guardian, an emergency distress and safety telemetry platform.',
              },
              {
                title: 'Software Developer Intern — ByteEdu',
                year: '2024',
                desc: 'Scaled educational portals, high-performance responsive web modules, and production RESTful APIs.',
              },
              {
                title: 'AI / ML Intern — DecodeLabs',
                year: '2024 - 2025',
                desc: 'Engineered deep learning pipelines, accelerated model inference latency, and deployed predictive systems.',
              },
              {
                title: 'Open Source Contributor — Nexus Spring of Code (NSoC)',
                year: '2024',
                desc: 'Contributed validated pull requests, codebase enhancements, and resolved issues in open-source repositories.',
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
            SERVICES & EXPERTISE
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            Capabilities & Engagement
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                title: 'Full-Stack Web & Mobile Architecture',
                detail: 'Next.js 15, React 19, TypeScript, React Native, and reactive microservices.',
              },
              {
                title: 'Sandboxed Code Judges & Compute Engines',
                detail: 'Docker runtimes, isolated namespaces, resource cgroups, and secure AST parsers.',
              },
              {
                title: 'High-Impact UI Design Systems',
                detail: 'Vanilla CSS design tokens, smooth fluid typography, and 3D micro-interactions.',
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
            DEVELOPER MANIFESTO
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            The Intersection of Code & Form
          </h2>

          <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.7 }}>
            True software excellence lives at the boundary where architecture meets artistry.
            A system that scales to hundreds of thousands of requests is only as compelling as the clarity and delight of its interface.
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
            "Great code is invisible. What remains is effortless speed, unyielding reliability, and quiet elegance."
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
            {['TypeScript', 'Go', 'Next.js', 'Docker', 'PostgreSQL', 'WebGL'].map((badge) => (
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
              CORE ARCHITECTURAL PILLARS
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>
              The Design Principles
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              {
                title: 'Sub-second Determinism',
                desc: 'Zero unnecessary network hops; aggressive edge caching and optimized bundle weight.',
                tag: 'SPEED',
              },
              {
                title: 'Defensive Modularity',
                desc: 'Strict type boundaries, isolated sandbox domains, and decoupled state synchronizers.',
                tag: 'SCALE',
              },
              {
                title: 'Tactile Polish',
                desc: 'Fluid micro-animations, tailored dark luxury palettes, and deliberate ergonomic contrast.',
                tag: 'AESTHETICS',
              },
              {
                title: 'Fault Tolerance',
                desc: 'Graceful failure degradation, offline synchronization, and resilient retry semantics.',
                tag: 'RESILIENCE',
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
            ARCHITECTURAL INTELLIGENCE
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            AetherOS
          </h2>
          <p style={{ fontSize: '12px', color: '#818cf8', fontWeight: 600 }}>
            Unified Architectural Modeling & System Simulation Platform
          </p>

          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.65 }}>
            A unified architectural platform enabling real-time system modeling, architecture inference, failure simulation,
            and governance validation powered by GitHub repo synchronization and Azure OpenAI.
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
              CORE CAPABILITY
            </div>
            <div style={{ fontSize: '13px', color: '#e2e8f0' }}>
              Live dependency analysis, failure simulation, and AI-driven scalability advisor.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
            {['React Flow', 'Zustand', 'Node.js', 'Express', 'MongoDB', 'Azure OpenAI', 'WebSockets'].map((t) => (
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
              TECHNICAL MATRIX
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>
              Full-Stack Mastery
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { category: 'Frontend', stack: 'Next.js 15, React 19, TypeScript, Vanilla CSS, Tailwind', pct: '95%' },
              { category: 'Backend & APIs', stack: 'Go, Node.js, Express, FastAPI, REST, GraphQL, gRPC', pct: '92%' },
              { category: 'Databases & State', stack: 'PostgreSQL, Redis, MongoDB, Supabase, Prisma', pct: '90%' },
              { category: 'DevOps & Systems', stack: 'Docker, Linux CLI, Git, CI/CD, AWS, Edge Hosting', pct: '88%' },
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
            COMMUNITY & IMPACT
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            Empowering Developers
          </h2>

          <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.65 }}>
            Mentorship is a core tenet of engineering stewardship. I actively conduct technical seminars and deep-dive bootcamps
            guiding developers on modern system architectures, Next.js optimization, and code review rigor.
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
              250+ Engineers
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
              Trained across modern web architectures & algorithmic design.
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
              FINAL MONOGRAPH FOLIO
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Let's Build Together
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>
              Ready to create something exceptional? Inquire for software roles, system design, or engineering leadership.
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
              India • Available for worldwide remote collaboration
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
