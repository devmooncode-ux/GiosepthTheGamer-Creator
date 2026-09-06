type AnalyticsEvent =
  | { type: 'latest_video_click'; videoId: string }
  | { type: 'youtube_click'; location: string }
  | { type: 'membership_cta'; location: string }
  | { type: 'subscription_attempt'; tierId: string }
  | { type: 'contact_form_submit'; campaignType?: string }
  | { type: 'social_click'; platform: string };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', event.type, event);
  }

  if (window.dataLayer) {
    window.dataLayer.push({ event: event.type, ...event });
  }

  if (import.meta.env.DEV) {
    console.debug('[analytics]', event);
  }
}
