import { getAttribution } from './attribution';

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: unknown;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

const measurementId = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY as string | undefined;
const pixelId = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

// Regions requiring prior consent: no ad/analytics tags are loaded there.
const CONSENT_REGIONS = new Set([
  'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL',
  'PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH',
]);

let allowed: boolean | null = null;
let initStarted = false;
const pending: Array<() => void> = [];

async function resolveRegion(): Promise<boolean> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 2000);
    const res = await fetch('/cdn-cgi/trace', { signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) return location.hostname === 'localhost';
    const loc = (await res.text()).match(/loc=([A-Z0-9]+)/)?.[1];
    if (!loc || loc === 'XX' || loc === 'T1') return false;
    return !CONSENT_REGIONS.has(loc);
  } catch {
    return false;
  }
}

function loadGtag() {
  if (!measurementId) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params -- gtag.js needs the Arguments object
    window.dataLayer.push(arguments);
  };
  window.gtag('set', 'developer_id.dZjgwMW', true);
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });
}

function loadPixel() {
  if (!pixelId || window.fbq) return;
  const n = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod.apply(n, args);
    else n.queue.push(args);
  } as Fbq;
  n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
  window.fbq = n; window._fbq = n;
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(s);
  n('init', pixelId);
}

export function initAnalytics() {
  if (import.meta.env.VITE_SITE_PREVIEW === "true") return;
  if (initStarted || typeof window === 'undefined') return;
  initStarted = true;
  resolveRegion().then((ok) => {
    allowed = ok;
    if (ok) { loadGtag(); loadPixel(); }
    pending.splice(0).forEach((fn) => ok && fn());
  });
}

function run(fn: () => void) {
  if (allowed === null) pending.push(fn);
  else if (allowed) fn();
}

export function trackPageView(path: string) {
  run(() => {
    window.gtag?.('event', 'page_view', { page_path: path, page_location: location.href, page_title: document.title });
    window.fbq?.('track', 'PageView');
  });
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  run(() => window.gtag?.('event', name, params));
}

/** Fires GA4 generate_lead + Meta Lead with campaign attribution (no personal data). */
export function trackLead(params: Record<string, unknown> = {}) {
  const eventID = `lead-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const data = { ...getAttribution(), ...params };
  run(() => {
    window.gtag?.('event', 'generate_lead', { ...data, event_id: eventID });
    window.fbq?.('track', 'Lead', data, { eventID });
  });
}

export function getUtmParams(): Record<string, string> {
  return getAttribution();
}
