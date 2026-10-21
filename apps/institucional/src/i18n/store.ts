import { useSyncExternalStore } from 'react';

export type Locale = 'pt' | 'en' | 'es';
const KEY = 'miind:lang';
const EVENT = 'miind:langchange';

function detectInitial(): Locale {
  if (typeof window === 'undefined') return 'pt';
  const stored = localStorage.getItem(KEY) as Locale | null;
  if (stored === 'pt' || stored === 'en' || stored === 'es') return stored;
  const nav = (navigator.language || 'pt').toLowerCase();
  if (nav.startsWith('es')) return 'es';
  if (nav.startsWith('en')) return 'en';
  return 'pt';
}

let current: Locale = typeof window !== 'undefined' ? detectInitial() : 'pt';
if (typeof document !== 'undefined') {
  document.documentElement.lang = current === 'pt' ? 'pt-BR' : current;
}

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onEvt = () => cb();
  window.addEventListener(EVENT, onEvt);
  return () => {
    listeners.delete(cb);
    window.removeEventListener(EVENT, onEvt);
  };
}

function getSnapshot(): Locale {
  return current;
}

export function setLocale(l: Locale) {
  if (l === current) return;
  current = l;
  try { localStorage.setItem(KEY, l); } catch {}
  document.documentElement.lang = l === 'pt' ? 'pt-BR' : l;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: l }));
  listeners.forEach((cb) => cb());
}

export function cycleLocale() {
  const next: Locale = current === 'pt' ? 'en' : current === 'en' ? 'es' : 'pt';
  setLocale(next);
}

export function useLocaleStore(): Locale {
  return useSyncExternalStore(subscribe, getSnapshot, () => 'pt');
}
