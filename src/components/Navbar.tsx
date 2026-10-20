'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Download, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab?: string;
}

export default function Navbar({ activeTab = 'Home' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(activeTab);
  const [scrolled, setScrolled] = useState(false);

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
                ? 'Magazine Portfolio'
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
    }
  };

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Magazine Portfolio', href: '#magazine' },
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

      {/* Right Side: Resume Button - Completely borderless, sleek glass glow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <a
          href="/assets/Arin_Gupta_Resume.pdf"
          download="Arin_Gupta_Resume.pdf"
          id="nav-resume-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(129, 140, 248, 0.25)';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(129, 140, 248, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
          }}
        >
          <span>Resume</span>
          <Download size={14} style={{ strokeWidth: 2.2 }} />
        </a>

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
            gap: '16px',
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
                padding: '8px 0',
                textDecoration: 'none',
              }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/assets/Arin_Gupta_Resume.pdf"
            download="Arin_Gupta_Resume.pdf"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: 'rgba(129, 140, 248, 0.2)',
              color: '#ffffff',
              fontSize: '15px',
              fontWeight: 600,
              textDecoration: 'none',
              marginTop: '8px',
            }}
          >
            <span>Download Resume</span>
            <Download size={15} />
          </a>
        </div>
      )}
    </header>
  );
}
