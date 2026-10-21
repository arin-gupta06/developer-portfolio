'use client';

import React, { useEffect } from 'react';
import posthog from 'posthog-js';
import { Analytics } from '@vercel/analytics/react';
import { trackEvent } from '@/lib/analytics';
import { useRouter } from 'next/navigation';

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // 1. Record local page view
    if (typeof window !== 'undefined') {
      trackEvent('page_view', { path: window.location.pathname });
    }

    // 2. Initialize PostHog if key is present
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost =
      process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

    if (posthogKey && typeof window !== 'undefined') {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        person_profiles: 'identified_only',
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
      });
    }

    // 3. Secret keyboard shortcut: Ctrl+Shift+A or Cmd+Shift+A to jump straight to /analytics
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        router.push('/analytics');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
