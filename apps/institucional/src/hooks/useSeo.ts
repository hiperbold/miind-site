import { useEffect } from 'react';

interface SeoOptions {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

/**
 * Lightweight SEO hook — sets <title>, meta description, canonical and OG tags.
 * Title kept under 60 chars, description under 160.
 */
export function useSeo({ title, description, canonical, ogImage }: SeoOptions) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title.length > 60 ? title.slice(0, 57) + '…' : title;

    const setMeta = (selector: string, attrs: Record<string, string>) => {
      let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
      if (!el) {
        if (selector.startsWith('link')) {
          el = document.createElement('link');
        } else {
          el = document.createElement('meta');
        }
        Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
        document.head.appendChild(el);
      } else {
        Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
      }
      return el;
    };

    if (description) {
      const desc = description.length > 160 ? description.slice(0, 157) + '…' : description;
      setMeta('meta[name="description"]', { name: 'description', content: desc });
      setMeta('meta[property="og:description"]', { property: 'og:description', content: desc });
      setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: desc });
    }

    setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });

    if (ogImage) {
      setMeta('meta[property="og:image"]', { property: 'og:image', content: ogImage });
      setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImage });
    }

    const canonicalHref = canonical ?? (typeof window !== 'undefined' ? window.location.origin + window.location.pathname : undefined);
    if (canonicalHref) {
      setMeta('link[rel="canonical"]', { rel: 'canonical', href: canonicalHref });
      setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalHref });
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, canonical, ogImage]);
}
