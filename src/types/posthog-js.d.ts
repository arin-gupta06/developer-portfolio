declare module 'posthog-js' {
  export interface PostHogConfig {
    api_host?: string;
    person_profiles?: 'always' | 'never' | 'identified_only';
    capture_pageview?: boolean;
    capture_pageleave?: boolean;
    autocapture?: boolean;
    disable_session_recording?: boolean;
    [key: string]: any;
  }

  export interface PostHog {
    init: (apiKey: string, config?: PostHogConfig, name?: string) => void;
    capture: (eventName: string, properties?: Record<string, any>) => void;
    identify: (distinctId: string, properties?: Record<string, any>) => void;
    reset: () => void;
    [key: string]: any;
  }

  const posthog: PostHog;
  export default posthog;
}
