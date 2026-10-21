'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Users,
  Download,
  Eye,
  BookOpen,
  ShieldCheck,
  TrendingUp,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Activity,
  RefreshCw,
  Lock,
  Unlock,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { getAnalyticsSummary, clearStoredEvents, trackEvent } from '@/lib/analytics';

const DEFAULT_PIN = '2026';

export default function AnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [summary, setSummary] = useState<ReturnType<typeof getAnalyticsSummary> | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');
  const [refreshKey, setRefreshKey] = useState(0);

  // Check if previously unlocked in this browser
  useEffect(() => {
    const savedAuth = localStorage.getItem('ag_analytics_authenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setSummary(getAnalyticsSummary(timeRange));
  }, [refreshKey, timeRange]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN) {
      localStorage.setItem('ag_analytics_authenticated', 'true');
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  const handleLock = () => {
    localStorage.removeItem('ag_analytics_authenticated');
    setIsAuthenticated(false);
    setPinInput('');
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to reset your local recorded telemetry events?')) {
      clearStoredEvents();
      setRefreshKey((k) => k + 1);
    }
  };

  if (!summary) return null;

  // Passcode Gate View
  if (!isAuthenticated) {
    return (
      <main
        style={{
          minHeight: '100vh',
          backgroundColor: '#090a0f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'Inter, sans-serif',
          color: '#f8fafc',
          position: 'relative',
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(129, 140, 248, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            width: '100%',
            maxWidth: '420px',
            backgroundColor: 'rgba(18, 22, 34, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '40px 32px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'rgba(129, 140, 248, 0.12)',
              border: '1px solid rgba(129, 140, 248, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              color: '#818cf8',
            }}
          >
            <Lock size={26} />
          </div>

          <h1
            style={{
              fontSize: '22px',
              fontWeight: 700,
              fontFamily: 'Space Grotesk, sans-serif',
              marginBottom: '8px',
              color: '#ffffff',
            }}
          >
            Private Analytics Hub
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: '#94a3b8',
              lineHeight: 1.5,
              marginBottom: '28px',
            }}
          >
            Audience profile, project engagement, and recruiter intent are strictly private to you.
          </p>

          <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <input
                type="password"
                placeholder="Enter Passcode (Default: 2026)"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                autoFocus
                style={{
                  width: '100%',
                  padding: '13px 18px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: pinError ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  fontSize: '15px',
                  textAlign: 'center',
                  letterSpacing: '0.2em',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
              />
              {pinError && (
                <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>
                  Incorrect passcode. Default is 2026.
                </div>
              )}
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '12px',
                backgroundColor: '#818cf8',
                color: '#090a0f',
                fontSize: '14px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                transition: 'filter 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
            >
              Unlock Dashboard
            </button>
          </form>

          <div style={{ marginTop: '24px' }}>
            <Link
              href="/"
              style={{
                fontSize: '13px',
                color: '#64748b',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <ArrowLeft size={14} /> Back to Portfolio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#090a0f',
        color: '#f8fafc',
        fontFamily: 'Inter, sans-serif',
        padding: 'clamp(24px, 4vw, 48px) clamp(16px, 4vw, 56px)',
        position: 'relative',
      }}
    >
      {/* Top Header Bar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '36px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#cbd5e1',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 500,
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)')}
          >
            <ArrowLeft size={15} />
            <span>Portfolio</span>
          </Link>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1
                style={{
                  fontSize: 'clamp(20px, 3vw, 26px)',
                  fontWeight: 800,
                  fontFamily: 'Space Grotesk, sans-serif',
                  letterSpacing: '-0.02em',
                }}
              >
                Audience &amp; Engagement Intelligence
              </h1>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10b981',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 8px #10b981',
                  }}
                />
                Live Active
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>
              Real-time insights on visitor interest, project clicks, and recruiter conversions.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Time range switcher */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '10px',
              padding: '3px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {(['7d', '30d', 'all'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '7px',
                  fontSize: '12px',
                  fontWeight: 600,
                  backgroundColor: timeRange === t ? '#818cf8' : 'transparent',
                  color: timeRange === t ? '#090a0f' : '#94a3b8',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {t === '7d' ? '7 Days' : t === '30d' ? '30 Days' : 'All Time'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            title="Refresh metrics"
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#cbd5e1',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
            }}
          >
            <RefreshCw size={13} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleLock}
            title="Lock dashboard"
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#cbd5e1',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
            }}
          >
            <Lock size={13} />
            <span>Lock</span>
          </button>
        </div>
      </header>

      {/* KPI Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {/* Visitors */}
        <div
          style={{
            backgroundColor: 'rgba(18, 22, 34, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '18px',
            padding: '22px 20px',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>Total Audience</span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif' }}>
            {summary.totalVisitors.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#10b981', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={13} />
            <span>{summary.totalPageViews} pageviews recorded</span>
          </div>
        </div>

        {/* Resume Downloads */}
        <div
          style={{
            backgroundColor: 'rgba(18, 22, 34, 0.75)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '18px',
            padding: '22px 20px',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: '#f59e0b', fontWeight: 600 }}>Resume Downloads</span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                color: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Download size={18} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', color: '#ffffff' }}>
            {summary.resumeDownloads}
          </div>
          <div style={{ fontSize: '12px', color: '#f59e0b', marginTop: '6px' }}>
            ★ High-intent recruiter conversion
          </div>
        </div>

        {/* Project Clicks */}
        <div
          style={{
            backgroundColor: 'rgba(18, 22, 34, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '18px',
            padding: '22px 20px',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>Project Actions</span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(129, 140, 248, 0.12)',
                color: '#818cf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Eye size={18} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif' }}>
            {summary.projectInteractions}
          </div>
          <div style={{ fontSize: '12px', color: '#818cf8', marginTop: '6px' }}>
            Live demos &amp; source code views
          </div>
        </div>

        {/* Magazine & Credential Reads */}
        <div
          style={{
            backgroundColor: 'rgba(18, 22, 34, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '18px',
            padding: '22px 20px',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>Magazine &amp; Proofs</span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BookOpen size={18} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif' }}>
            {summary.magazineReads + summary.credentialViews}
          </div>
          <div style={{ fontSize: '12px', color: '#10b981', marginTop: '6px' }}>
            {summary.magazineReads} book reads • {summary.credentialViews} credential inspects
          </div>
        </div>
      </div>

      {/* Main Grid: Funnel & Referrers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        {/* 1. Engagement Conversion Funnel */}
        <div
          style={{
            backgroundColor: 'rgba(18, 22, 34, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '28px',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif' }}>
                Audience Journey Funnel
              </h2>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>
                How visitors convert from first visit to downloading your resume
              </p>
            </div>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 700, backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '8px' }}>
              {summary.conversionRate}% Final Conversion
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {summary.funnel.map((item, idx) => (
              <div key={item.step}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{item.step}</span>
                  <span style={{ color: '#94a3b8', fontFamily: 'Space Grotesk, sans-serif' }}>
                    {item.count} visitors ({item.pct}%)
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${item.pct}%`,
                      borderRadius: '9999px',
                      background:
                        idx === 4
                          ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                          : 'linear-gradient(90deg, #818cf8, #38bdf8)',
                      transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Referral Acquisition Channels */}
        <div
          style={{
            backgroundColor: 'rgba(18, 22, 34, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '28px',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif' }}>
                Where Your Audience Comes From
              </h2>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>
                Top referral origins and platforms bringing readers to your work
              </p>
            </div>
            <Globe size={18} style={{ color: '#38bdf8' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {Object.keys(summary.referrers).length === 0 ? (
              <div
                style={{
                  padding: '24px 0',
                  textAlign: 'center',
                  color: '#64748b',
                  fontSize: '13px',
                }}
              >
                No external referral sources recorded yet.
              </div>
            ) : (
              Object.entries(summary.referrers).map(([ref, count]) => {
                const maxRef = Math.max(1, ...Object.values(summary.referrers));
                const pct = Math.round((count / maxRef) * 100);
                const isLead = count === maxRef && count > 0;

                return (
                  <div key={ref}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#ffffff', fontWeight: 600 }}>{ref}</span>
                        {isLead && (
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: 700,
                              padding: '1px 6px',
                              borderRadius: '4px',
                              backgroundColor: 'rgba(14, 165, 233, 0.2)',
                              color: '#38bdf8',
                            }}
                          >
                            Top Source
                          </span>
                        )}
                      </div>
                      <span style={{ color: '#94a3b8', fontFamily: 'Space Grotesk, sans-serif' }}>{count} visits</span>
                    </div>
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '9999px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${pct}%`,
                          borderRadius: '9999px',
                          backgroundColor: isLead ? '#38bdf8' : '#818cf8',
                        }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Device & Browser Mini Strip */}
          <div
            style={{
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#cbd5e1' }}>
              <Monitor size={16} style={{ color: '#818cf8' }} />
              <span>Desktop: {summary.devices.Desktop}%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#cbd5e1' }}>
              <Smartphone size={16} style={{ color: '#38bdf8' }} />
              <span>Mobile: {summary.devices.Mobile}%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#cbd5e1' }}>
              <Tablet size={16} style={{ color: '#10b981' }} />
              <span>Tablet: {summary.devices.Tablet}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Popularity Leaderboard */}
      <div
        style={{
          backgroundColor: 'rgba(18, 22, 34, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '28px',
          backdropFilter: 'blur(20px)',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif' }}>
              Project Engagement Leaderboard
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>
              Shows which projects capture the most recruiter curiosity and demo clicks
            </p>
          </div>
          <Activity size={18} style={{ color: '#818cf8' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {summary.topProjects.map((p, idx) => (
            <div
              key={p.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
                padding: '14px 18px',
                borderRadius: '14px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '240px' }}>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: p.color,
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  #{idx + 1}
                </span>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#ffffff' }}>{p.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{p.views} total card inspections</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#38bdf8', fontFamily: 'Space Grotesk, sans-serif' }}>
                    {p.demos} launches
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Live Demo Clicks</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#cbd5e1', fontFamily: 'Space Grotesk, sans-serif' }}>
                    {p.code} opens
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>GitHub Inspects</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Interaction Feed */}
      <div
        style={{
          backgroundColor: 'rgba(18, 22, 34, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '28px',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif' }}>
              Live Telemetry Stream
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>
              Chronological log of real actions taken on your portfolio in this browser
            </p>
          </div>

          {summary.recentEvents.length > 0 && (
            <button
              onClick={handleClear}
              style={{
                fontSize: '12px',
                color: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                padding: '6px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Clear Log
            </button>
          )}
        </div>

        {summary.recentEvents.length === 0 ? (
          <div
            style={{
              padding: '32px',
              textAlign: 'center',
              color: '#64748b',
              fontSize: '13.5px',
            }}
          >
            No events recorded in this session yet. Browse your portfolio, click a project, or download your resume, then click Refresh!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {summary.recentEvents.map((ev) => {
              const timeStr = new Date(ev.timestamp).toLocaleTimeString();
              const isResume = ev.eventName === 'resume_download';
              const isDemo = ev.eventName === 'project_demo_open';

              return (
                <div
                  key={ev.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    backgroundColor: isResume
                      ? 'rgba(245, 158, 11, 0.08)'
                      : 'rgba(255, 255, 255, 0.02)',
                    border: isResume
                      ? '1px solid rgba(245, 158, 11, 0.25)'
                      : '1px solid rgba(255, 255, 255, 0.05)',
                    fontSize: '13px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: isResume
                          ? '#f59e0b'
                          : isDemo
                          ? '#38bdf8'
                          : 'rgba(255, 255, 255, 0.1)',
                        color: isResume || isDemo ? '#090a0f' : '#cbd5e1',
                      }}
                    >
                      {ev.eventName}
                    </span>
                    <span style={{ color: '#cbd5e1' }}>
                      {ev.properties?.title || ev.properties?.section || ev.properties?.platform || ev.properties?.path || 'Action'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#64748b', fontSize: '11.5px' }}>
                    <span>{ev.device}</span>
                    <span>•</span>
                    <span>{ev.referrer}</span>
                    <span>•</span>
                    <span style={{ fontFamily: 'monospace' }}>{timeStr}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
