import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_DEFAULT } from '@/lib/contact';
import { useT } from '@/i18n/useT';

const HIDDEN_ROUTES = ['/blog/admin'];

const FloatingWhatsApp = () => {
  const { pathname } = useLocation();
  const { t } = useT();
  if (HIDDEN_ROUTES.some((r) => pathname.startsWith(r))) return null;

  const label = (t('float.whatsapp.label') as string) || 'Falar no WhatsApp';
  const aria = (t('float.whatsapp.aria') as string) || label;

  return (
    <a
      href={WHATSAPP_DEFAULT}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      className="group fixed z-50 right-5 bottom-5 md:right-6 md:bottom-6 outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)]/60 rounded-full"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <span className="pointer-events-none absolute right-[68px] top-1/2 -translate-y-1/2 hidden md:inline-flex items-center whitespace-nowrap px-3 py-1.5 rounded-lg glass border border-border/60 text-xs font-medium text-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-[0_8px_24px_-8px_oklch(0_0_0/0.4)]">
        {label}
      </span>

      <span className="relative inline-flex">
        <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[var(--brand-cyan)]/30 animate-ping" style={{ animationDuration: '2.4s' }} />
        <span
          className="relative inline-flex items-center justify-center w-14 h-14 rounded-full text-white shadow-[0_10px_28px_-8px_oklch(0.62_0.22_250/0.55),0_4px_12px_-4px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_36px_-10px_oklch(0.62_0.22_250/0.7),0_6px_14px_-4px_rgba(0,0,0,0.4)]"
          style={{ background: 'linear-gradient(135deg, oklch(0.84 0.16 220) 0%, oklch(0.58 0.22 285) 100%)' }}
        >
          <MessageCircle aria-hidden="true" className="w-6 h-6 fill-white/10" strokeWidth={2.2} />
        </span>
      </span>
    </a>
  );
};

export default FloatingWhatsApp;
