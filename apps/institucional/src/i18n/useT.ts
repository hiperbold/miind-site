import { useCallback } from 'react';
import { useLocaleStore } from './store';
import { translate } from './dict';

export function useT() {
  const locale = useLocaleStore();
  const t = useCallback((key: string) => translate(locale, key), [locale]);
  return { t, locale };
}
