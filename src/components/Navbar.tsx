'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Download, Menu, X, ChevronDown, Code2, Cpu } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface NavbarProps {
  activeTab?: string;
}

export default function Navbar({ activeTab = 'Home' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(activeTab);
  const [scrolled, setScrolled] = useState(false);
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'magazine', 'achievements'];
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setCurrentSection(
              section === 'home'
                ? 'Home'
                : section === 'magazine'
                ? 'Magazine'
                : section.charAt(0).toUpperCase() + section.slice(1)
            );
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setResumeDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setResumeDropdownOpen(false);
      }
    };

    if (resumeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [resumeDropdownOpen]);

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const offset = 75;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: id === 'home' ? 0 : offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', href);
      setMobileMenuOpen(false);
      setResumeDropdownOpen(false);
      trackEvent('nav_click', { section: id });
    }
  };

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Magazine', href: '#magazine' },
    { label: 'Achievements', href: '#achievements' },
  ];

  return (
    <header
      id="site-navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '16px 56px' : '24px 56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(9, 10, 15, 0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        border: 'none',
        boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.3)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: 'auto',
      }}
    >
      {/* Brand Logo - Completely borderless & unboxed */}
      <Link
        href="#home"
        onClick={(e) => scrollToSection(e, '#home')}
        id="nav-logo"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          textDecoration: 'none',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontSize: '26px',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            color: '#ffffff',
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          A
        </span>
        <span
          style={{
            fontSize: '26px',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            color: '#818cf8',
            fontFamily: 'Space Grotesk, sans-serif',
            textShadow: '0 0 18px rgba(129, 140, 248, 0.7)',
          }}
        >
          G
        </span>
      </Link>

      {/* Desktop Navigation - Borderless, frameless, natural floating typography */}
      <nav
        id="desktop-nav"
        className="desktop-nav"
        style={{
          alignItems: 'center',
          gap: '40px',
          background: 'none',
          border: 'none',
          boxShadow: 'none',
        }}
      >
        {navItems.map((item) => {
          const isActive = item.label === currentSection || (item.label === 'Home' && currentSection === 'Home');
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              style={{
                position: 'relative',
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '15px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                padding: '6px 0',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)';
              }}
            >
              <span>{item.label}</span>
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: '#818cf8',
                    boxShadow: '0 0 10px #818cf8, 0 0 4px #818cf8',
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Right Side: Resume Dropdown Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            type="button"
            id="nav-resume-btn"
            onClick={() => setResumeDropdownOpen((prev) => !prev)}
            aria-expanded={resumeDropdownOpen}
            aria-haspopup="true"
            aria-label="Download Resume Options"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#ffffff',
              backgroundColor: resumeDropdownOpen
                ? 'rgba(129, 140, 248, 0.28)'
                : 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              transition: 'all 0.25s ease',
              cursor: 'pointer',
              boxShadow: resumeDropdownOpen
                ? '0 6px 24px rgba(129, 140, 248, 0.35)'
                : '0 4px 20px rgba(0, 0, 0, 0.2)',
            }}
            onMouseEnter={(e) => {
              if (!resumeDropdownOpen) {
                e.currentTarget.style.backgroundColor = 'rgba(129, 140, 248, 0.25)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(129, 140, 248, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!resumeDropdownOpen) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
              }
            }}
          >
            <span>Resume</span>
            <ChevronDown
              size={14}
              style={{
                strokeWidth: 2.2,
                transform: resumeDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </button>

          {/* Desktop Dropdown Menu */}
          {resumeDropdownOpen && (
            <div
              id="resume-dropdown-menu"
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                width: '300px',
                padding: '8px',
                borderRadius: '16px',
                backgroundColor: 'rgba(13, 15, 23, 0.96)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(129, 140, 248, 0.18)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                zIndex: 110,
              }}
            >
              <div
                style={{
                  padding: '6px 10px 4px 10px',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#64748b',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                Select Track
              </div>

              {/* Option 1: Software Engineer Resume */}
              <a
                href="/assets/Arin_Gupta_Software_Resume.pdf"
                download="Arin_Gupta_Software_Resume.pdf"
                id="resume-download-software"
                onClick={() => {
                  setResumeDropdownOpen(false);
                  trackEvent('resume_download', { location: 'navbar_desktop', track: 'software' });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(129, 140, 248, 0.14)';
                  e.currentTarget.style.transform = 'translateX(2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(99, 102, 241, 0.16)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#818cf8',
                    flexShrink: 0,
                  }}
                >
                  <Code2 size={18} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '13.5px',
                      fontWeight: 600,
                      color: '#ffffff',
                      lineHeight: 1.3,
                    }}
                  >
                    Software Resume
                  </div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      color: '#94a3b8',
                      lineHeight: 1.3,
                      marginTop: '2px',
                    }}
                  >
                    Full-Stack &amp; Web Systems
                  </div>
                </div>
                <Download size={14} style={{ color: '#818cf8', opacity: 0.85, flexShrink: 0 }} />
              </a>

              {/* Option 2: AI / ML Resume */}
              <a
                href="/assets/Arin_Gupta_AI_ML_Resume.pdf"
                download="Arin_Gupta_AI_ML_Resume.pdf"
                id="resume-download-aiml"
                onClick={() => {
                  setResumeDropdownOpen(false);
                  trackEvent('resume_download', { location: 'navbar_desktop', track: 'aiml' });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.14)';
                  e.currentTarget.style.transform = 'translateX(2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(56, 189, 248, 0.16)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38bdf8',
                    flexShrink: 0,
                  }}
                >
                  <Cpu size={18} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '13.5px',
                      fontWeight: 600,
                      color: '#ffffff',
                      lineHeight: 1.3,
                    }}
                  >
                    AI / ML Resume
                  </div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      color: '#94a3b8',
                      lineHeight: 1.3,
                      marginTop: '2px',
                    }}
                  >
                    Transformers, RAG &amp; NLP
                  </div>
                </div>
                <Download size={14} style={{ color: '#38bdf8', opacity: 0.85, flexShrink: 0 }} />
              </a>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          id="mobile-menu-toggle"
          className="mobile-menu-toggle"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(10, 11, 16, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              style={{
                fontSize: '16px',
                fontWeight: item.label === currentSection ? 600 : 400,
                color: item.label === currentSection ? '#818cf8' : '#e2e8f0',
                padding: '6px 0',
                textDecoration: 'none',
              }}
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile Resume Choices */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              paddingTop: '14px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              marginTop: '4px',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#64748b',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              Download Resume
            </div>

            <a
              href="/assets/Arin_Gupta_Software_Resume.pdf"
              download="Arin_Gupta_Software_Resume.pdf"
              onClick={() => {
                setMobileMenuOpen(false);
                trackEvent('resume_download', { location: 'navbar_mobile', track: 'software' });
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 14px',
                borderRadius: '10px',
                backgroundColor: 'rgba(129, 140, 248, 0.15)',
                border: '1px solid rgba(129, 140, 248, 0.25)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Code2 size={16} color="#818cf8" />
                <span>Software Developer Resume</span>
              </div>
              <Download size={15} color="#818cf8" />
            </a>

            <a
              href="/assets/Arin_Gupta_AI_ML_Resume.pdf"
              download="Arin_Gupta_AI_ML_Resume.pdf"
              onClick={() => {
                setMobileMenuOpen(false);
                trackEvent('resume_download', { location: 'navbar_mobile', track: 'aiml' });
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 14px',
                borderRadius: '10px',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Cpu size={16} color="#38bdf8" />
                <span>AI / ML Developer Resume</span>
              </div>
              <Download size={15} color="#38bdf8" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
