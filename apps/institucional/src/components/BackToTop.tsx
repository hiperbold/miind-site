import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const HIDDEN_ROUTES = ['/blog/admin'];

const BackToTop = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (HIDDEN_ROUTES.some((r) => pathname.startsWith(r))) return null;

  const handleClick = () =>
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          type="button"
          onClick={handleClick}
          aria-label="Voltar ao topo"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed z-40 left-5 bottom-5 md:left-6 md:bottom-6 outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)]/60 rounded-full"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <span className="relative inline-flex">
            <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[var(--brand-cyan)]/30 animate-ping" style={{ animationDuration: '2.4s' }} />
            <span
              className="relative inline-flex items-center justify-center w-14 h-14 rounded-full text-white shadow-[0_10px_28px_-8px_oklch(0.62_0.22_250/0.55),0_4px_12px_-4px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_36px_-10px_oklch(0.62_0.22_250/0.7),0_6px_14px_-4px_rgba(0,0,0,0.4)]"
              style={{ background: 'linear-gradient(135deg, oklch(0.84 0.16 220) 0%, oklch(0.58 0.22 285) 100%)' }}
            >
              <ArrowUp aria-hidden="true" className="w-6 h-6 text-white transition-transform group-hover:-translate-y-0.5" strokeWidth={2.2} />
            </span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>

  );
};

export default BackToTop;
