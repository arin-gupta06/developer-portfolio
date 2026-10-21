import { track as vercelTrack } from '@vercel/analytics';
import posthog from 'posthog-js';

export type AnalyticsEvent =
  | 'page_view'
  | 'resume_download'
  | 'project_view'
  | 'project_demo_open'
  | 'project_code_open'
  | 'magazine_open'
  | 'magazine_spread_turn'
  | 'credential_view'
  | 'contact_email_click'
  | 'social_link_click'
  | 'nav_click';

export interface StoredEvent {
  id: string;
  eventName: string;
  timestamp: number;
  properties?: Record<string, any>;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  browser: string;
  referrer: string;
  sessionId?: string;
}

const STORAGE_KEY = 'ag_portfolio_analytics_events';
const SESSION_KEY = 'ag_portfolio_current_session';

// Helper to get or create a session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  try {
    let sid = sessionStorage.getItem('ag_portfolio_session_id');
    if (!sid) {
      sid = 's_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
      sessionStorage.setItem('ag_portfolio_session_id', sid);
    }
    return sid;
  } catch {
    return 'default_session';
  }
}

// Helper to detect device category
function getDeviceType(): 'Desktop' | 'Mobile' | 'Tablet' {
  if (typeof window === 'undefined') return 'Desktop';
  const ua = navigator.userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet';
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(
      ua
    )
  ) {
    return 'Mobile';
  }
  return 'Desktop';
}

// Helper to detect browser
function getBrowser(): string {
  if (typeof window === 'undefined') return 'Unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  return 'Other';
}

// Clean referrer parser
function getCleanReferrer(): string {
  if (typeof window === 'undefined') return 'Direct';
  const ref = document.referrer;
  if (!ref) return 'Direct / Link';
  try {
    const url = new URL(ref);
    if (url.hostname.includes('linkedin')) return 'LinkedIn';
    if (url.hostname.includes('github')) return 'GitHub';
    if (url.hostname.includes('twitter') || url.hostname.includes('x.com')) return 'Twitter / X';
    if (url.hostname.includes('google')) return 'Google Search';
    return url.hostname.replace('www.', '');
  } catch {
    return 'Referral';
  }
}

// Save event to local storage
function saveLocalEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing: StoredEvent[] = raw ? JSON.parse(raw) : [];

    const newEvent: StoredEvent = {
      id: Math.random().toString(36).substring(2, 9),
      eventName,
      timestamp: Date.now(),
      properties: properties || {},
      device: getDeviceType(),
      browser: getBrowser(),
      referrer: getCleanReferrer(),
      sessionId: getSessionId(),
    };

    // Keep up to 600 events locally
    const updated = [newEvent, ...existing].slice(0, 600);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Gracefully handle storage quotas
  }
}

// Main event dispatcher
export function trackEvent(
  eventName: AnalyticsEvent | string,
  properties?: Record<string, string | number | boolean | null | undefined>
) {
  if (typeof window === 'undefined') return;

  // 1. Save to local storage for the In-Portfolio Visual Dashboard
  saveLocalEvent(eventName, properties);

  // 2. PostHog Tracking (if configured)
  try {
    if (posthog && typeof posthog.capture === 'function') {
      posthog.capture(eventName, properties);
    }
  } catch {
    // Fail silently
  }

  // 3. Vercel Web Analytics Custom Event Tracking
  try {
    if (typeof vercelTrack === 'function') {
      vercelTrack(eventName, properties);
    }
  } catch {
    // Fail silently
  }
}

// Retrieve raw events
export function getStoredEvents(): StoredEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Clear all local stored stats
export function clearStoredEvents() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SESSION_KEY);
  } catch {}
}

// Compute genuine analytics summary strictly from real events
export function getAnalyticsSummary(timeRange: '7d' | '30d' | 'all' = '7d') {
  const allEvents = getStoredEvents();
  const now = Date.now();

  const events = allEvents.filter((ev) => {
    if (timeRange === '7d') return ev.timestamp >= now - 7 * 86400000;
    if (timeRange === '30d') return ev.timestamp >= now - 30 * 86400000;
    return true;
  });

  // Calculate unique sessions
  const sessionSet = new Set<string>();
  events.forEach((ev) => {
    if (ev.sessionId) {
      sessionSet.add(ev.sessionId);
    }
  });

  const totalVisitors = sessionSet.size > 0 ? sessionSet.size : events.length > 0 ? 1 : 0;

  let realPageViews = 0;
  let realResume = 0;
  let realProjects = 0;
  let realMagazine = 0;
  let realCredentials = 0;
  let realContact = 0;

  const referrerCounts: Record<string, number> = {};
  const browserCounts: Record<string, number> = {};
  let desktopCount = 0;
  let mobileCount = 0;
  let tabletCount = 0;

  const projectStatsMap: Record<
    string,
    { name: string; views: number; demos: number; code: number; color: string }
  > = {
    'GuardianAI Platform': { name: 'GuardianAI Platform', views: 0, demos: 0, code: 0, color: '#f59e0b' },
    'ChronOS & AI RTI Generator': { name: 'ChronOS & AI RTI Generator', views: 0, demos: 0, code: 0, color: '#38bdf8' },
    'CodeBase Cartographic Tool (CBCT)': { name: 'CodeBase Cartographic Tool (CBCT)', views: 0, demos: 0, code: 0, color: '#10b981' },
    'Smart Resume & Job-Fit Analyzer': { name: 'Smart Resume & Job-Fit Analyzer', views: 0, demos: 0, code: 0, color: '#6366f1' },
    'GearGuard Maintenance Tracker': { name: 'GearGuard Maintenance Tracker', views: 0, demos: 0, code: 0, color: '#8b5cf6' },
  };

  events.forEach((ev) => {
    if (ev.eventName === 'page_view') realPageViews++;
    if (ev.eventName === 'resume_download') realResume++;
    if (ev.eventName.includes('project')) realProjects++;
    if (ev.eventName.includes('magazine')) realMagazine++;
    if (ev.eventName === 'credential_view') realCredentials++;
    if (ev.eventName === 'contact_email_click') realContact++;

    // Referrers
    const ref = ev.referrer || 'Direct / Link';
    referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;

    // Devices
    if (ev.device === 'Desktop') desktopCount++;
    else if (ev.device === 'Mobile') mobileCount++;
    else if (ev.device === 'Tablet') tabletCount++;

    // Browsers
    const b = ev.browser || 'Other';
    browserCounts[b] = (browserCounts[b] || 0) + 1;

    // Project interactions
    const title = ev.properties?.title || ev.properties?.name;
    if (title) {
      if (!projectStatsMap[title]) {
        projectStatsMap[title] = { name: title, views: 0, demos: 0, code: 0, color: '#818cf8' };
      }
      if (ev.eventName === 'project_view') projectStatsMap[title].views++;
      else if (ev.eventName === 'project_demo_open') projectStatsMap[title].demos++;
      else if (ev.eventName === 'project_code_open') projectStatsMap[title].code++;
    }
  });

  const totalDev = events.length;
  const devices = {
    Desktop: totalDev > 0 ? Math.round((desktopCount / totalDev) * 100) : 0,
    Mobile: totalDev > 0 ? Math.round((mobileCount / totalDev) * 100) : 0,
    Tablet: totalDev > 0 ? Math.round((tabletCount / totalDev) * 100) : 0,
  };

  const browsers: Record<string, number> = {};
  for (const [k, v] of Object.entries(browserCounts)) {
    browsers[k] = totalDev > 0 ? Math.round((v / totalDev) * 100) : 0;
  }

  const topProjects = Object.values(projectStatsMap).sort((a, b) => {
    const sumA = a.views * 2 + a.demos * 3 + a.code;
    const sumB = b.views * 2 + b.demos * 3 + b.code;
    return sumB - sumA;
  });

  // Funnel calculations
  const landedAudience = totalVisitors > 0 ? totalVisitors : realPageViews;
  const highIntentCount = realResume + realContact;
  const calcPct = (val: number) =>
    landedAudience > 0 ? Math.min(100, Math.round((val / landedAudience) * 100)) : 0;

  const funnel = [
    { step: '1. Landed on Portfolio', count: landedAudience, pct: landedAudience > 0 ? 100 : 0 },
    { step: '2. Explored Projects', count: realProjects, pct: calcPct(realProjects) },
    { step: '3. Read Interactive Magazine', count: realMagazine, pct: calcPct(realMagazine) },
    { step: '4. Inspected Proof & Credentials', count: realCredentials, pct: calcPct(realCredentials) },
    { step: '5. Downloaded Resume / Reached Out', count: highIntentCount, pct: calcPct(highIntentCount) },
  ];

  const conversionRate = calcPct(highIntentCount);

  return {
    isLive: events.length > 0,
    eventCount: events.length,
    totalVisitors,
    totalPageViews: realPageViews,
    resumeDownloads: realResume,
    projectInteractions: realProjects,
    magazineReads: realMagazine,
    credentialViews: realCredentials,
    referrers: referrerCounts,
    devices,
    browsers,
    topProjects,
    funnel,
    conversionRate,
    recentEvents: events.slice(0, 30),
  };
}
