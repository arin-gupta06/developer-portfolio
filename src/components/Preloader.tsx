'use client';

import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedSubtext, setDisplayedSubtext] = useState('');
  const [typingStage, setTypingStage] = useState<'title' | 'subtext' | 'done'>('title');
  const [progress, setProgress] = useState(0);

  const fullTitle = 'Arin Gupta Edition';
  const fullSubtext = 'Welcomes you';

  useEffect(() => {
    // Prevent body scroll during preload
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let isCancelled = false;
    let titleIdx = 0;
    let subtextIdx = 0;

    // 1. Type "Arin Gupta Edition" first
    const titleTimer = setInterval(() => {
      if (isCancelled) return;
      if (titleIdx < fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, titleIdx + 1));
        titleIdx++;
      } else {
        clearInterval(titleTimer);
        setTypingStage('subtext');

        // 2. Pause briefly, then type "Welcomes you"
        setTimeout(() => {
          if (isCancelled) return;
          const subtextTimer = setInterval(() => {
            if (isCancelled) return;
            if (subtextIdx < fullSubtext.length) {
              setDisplayedSubtext(fullSubtext.slice(0, subtextIdx + 1));
              subtextIdx++;
            } else {
              clearInterval(subtextTimer);
              setTypingStage('done');
            }
          }, 55);
        }, 150);
      }
    }, 45);

    // 3. Slider progress animation from 0% to 100%
    const startTime = performance.now();
    const duration = 1800; // 1.8s total duration

    const animateProgress = (currentTime: number) => {
      if (isCancelled) return;
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(100, (elapsed / duration) * 100);

      // Smooth easing curve
      const easedProgress = Math.min(
        100,
        Math.round(rawProgress < 50 ? 2 * rawProgress * rawProgress / 100 : 100 - Math.pow(-2 * rawProgress + 200, 2) / 200)
      );

      setProgress(easedProgress);

      if (elapsed < duration) {
        requestAnimationFrame(animateProgress);
      } else {
        setProgress(100);
        // Short pause at 100% before smooth dissolve exit
        setTimeout(() => {
          if (isCancelled) return;
          setIsExiting(true);
          // Wait for exit transition to finish before unmounting from DOM
          setTimeout(() => {
            if (isCancelled) return;
            setIsVisible(false);
            document.body.style.overflow = originalOverflow;
          }, 600);
        }, 220);
      }
    };

    const animFrame = requestAnimationFrame(animateProgress);

    return () => {
      isCancelled = true;
      clearInterval(titleTimer);
      cancelAnimationFrame(animFrame);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      id="preloader-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#090a0f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.02)' : 'scale(1)',
        filter: isExiting ? 'blur(10px)' : 'none',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isExiting ? 'none' : 'auto',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow - matches hero section */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(129, 140, 248, 0.05) 50%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Atmospheric hairline border top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.4), transparent)',
        }}
      />

      {/* Central Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        {/* Monogram Badge (Brand continuity with Navbar and Footer) */}
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '17px',
            letterSpacing: '1px',
            color: '#ffffff',
            boxShadow: '0 4px 20px rgba(56, 189, 248, 0.35)',
            marginBottom: '24px',
          }}
        >
          AG
        </div>

        {/* Edition Label / Micro tag */}
        <div
          style={{
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#38bdf8',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            marginBottom: '10px',
            opacity: 0.85,
          }}
        >
          PORTFOLIO ARCHIVE
        </div>

        {/* Main Text: "Arin Gupta Edition" with typing animation */}
        <h1
          style={{
            fontSize: 'clamp(28px, 4.5vw, 42px)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.025em',
            fontFamily: 'Space Grotesk, "Plus Jakarta Sans", sans-serif',
            margin: '0 0 10px 0',
            lineHeight: 1.15,
            minHeight: '48px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span>{displayedTitle}</span>
          {typingStage === 'title' && (
            <span
              style={{
                display: 'inline-block',
                width: '3px',
                height: '32px',
                backgroundColor: '#38bdf8',
                marginLeft: '4px',
                animation: 'preloaderCursorBlink 0.8s infinite',
                verticalAlign: 'middle',
                boxShadow: '0 0 10px rgba(56, 189, 248, 0.9)',
              }}
            />
          )}
        </h1>

        {/* Subtext: "Welcomes you" with typing animation followed by */}
        <div
          style={{
            fontSize: 'clamp(15px, 2vw, 17px)',
            color: '#94a3b8',
            minHeight: '26px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 500,
            marginBottom: '36px',
          }}
        >
          <span>{displayedSubtext}</span>
          {typingStage !== 'title' && (
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '18px',
                backgroundColor: '#38bdf8',
                marginLeft: '2px',
                animation: 'preloaderCursorBlink 0.8s infinite',
                verticalAlign: 'middle',
                boxShadow: '0 0 8px rgba(56, 189, 248, 0.8)',
              }}
            />
          )}
        </div>

        {/* Loader Filling Up Slider */}
        <div
          style={{
            width: '240px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {/* Slider Bar Track */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '3px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '9999px',
              overflow: 'hidden',
            }}
          >
            {/* Slider Bar Fill */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #38bdf8 0%, #818cf8 60%, #c084fc 100%)',
                borderRadius: '9999px',
                boxShadow: '0 0 12px rgba(56, 189, 248, 0.8)',
                transition: 'width 0.05s linear',
              }}
            />
          </div>

          {/* Micro Status Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '11px',
              color: '#64748b',
              fontFamily: 'Space Grotesk, monospace',
              fontWeight: 600,
              letterSpacing: '0.06em',
            }}
          >
            <span style={{ color: progress === 100 ? '#4ade80' : '#64748b', transition: 'color 0.2s ease' }}>
              {progress === 100 ? 'SYSTEM READY' : 'INITIALIZING'}
            </span>
            <span style={{ color: '#cbd5e1' }}>{progress}%</span>
          </div>
        </div>
      </div>

      {/* Embedded keyframe for smooth cursor blinking */}
      <style>{`
        @keyframes preloaderCursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
