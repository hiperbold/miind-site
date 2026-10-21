import { useCallback } from 'react';
import { useLocaleStore, setLocale, cycleLocale, type Locale } from '@/i18n/store';

export type { Locale };

export function useLocale() {
  const locale = useLocaleStore();
  const toggle = useCallback(() => cycleLocale(), []);
  return { locale, toggle, setLocale };
}
