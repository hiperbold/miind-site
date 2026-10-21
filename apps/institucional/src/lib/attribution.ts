// First-touch attribution stored in a long-lived cookie.
const COOKIE = 'miind_ft';
const MAX_AGE = 34560000; // ~400 days (browser maximum); refreshed on every visit.

export const TRACKED_PARAMS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id',
  'xcod', 'src', 'sck', 'fbclid', 'gclid', 'gbraid', 'wbraid', 'gad_source', 'gads',
  'msclkid', 'ttclid', 'li_fat_id',
] as const;

function readCookie(): Record<string, string> | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
  if (!m) return null;
  try { return JSON.parse(decodeURIComponent(m[1])); } catch { return null; }
}

function writeCookie(data: Record<string, string>) {
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(data))}; path=/; max-age=${MAX_AGE}; SameSite=Lax${secure}`;
}

export function captureFirstTouch() {
  if (typeof window === 'undefined') return;
  const existing = readCookie();
  if (existing) { writeCookie(existing); return; }
  const url = new URLSearchParams(location.search);
  const data: Record<string, string> = {};
  TRACKED_PARAMS.forEach((k) => {
    const v = url.get(k)?.trim();
    if (v) data[k] = v.slice(0, 300);
  });
  if (!Object.keys(data).length) return;
  data.landing_page = location.pathname;
  data.first_visit = new Date().toISOString();
  writeCookie(data);
}

export function getAttribution(): Record<string, string> {
  return (typeof document !== 'undefined' && readCookie()) || {};
}

export function formatAttribution(): string {
  const a = getAttribution();
  const keys = Object.keys(a);
  if (!keys.length) return '\n\n📊 Origem da campanha: acesso direto (sem parâmetros)';
  return '\n\n📊 Origem da campanha (primeiro acesso):\n' + keys.map((k) => `${k}: ${a[k]}`).join('\n');
}
