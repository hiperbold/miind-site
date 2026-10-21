import { useEffect, useRef } from "react";
import { m as motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type NavItem = { label: string; href: string; id: string };

type Props = {
  open: boolean;
  onClose: () => void;
  activeId: string | null;
  scrolled: boolean;
  items: NavItem[];
};

export default function MobileMenu({ open, onClose, activeId, scrolled, items }: Props) {
  const reduced = useReducedMotion();
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Lock body scroll + escape + focus first link
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstLinkRef.current?.focus(), reduced ? 0 : 120);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose, reduced]);

  const fade = reduced
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
      };

  const panelAnim = reduced
    ? { initial: false, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.28, ease: EASE_OUT_EXPO },
      };

  const containerVariants = reduced
    ? { hidden: {}, show: {} }
    : {
        hidden: {},
        show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
      };

  const itemVariants = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: -8 },
        show: { opacity: 1, x: 0, transition: { duration: 0.22, ease: EASE_OUT_EXPO } },
      };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            {...fade}
            onClick={onClose}
            className={`lg:hidden fixed inset-x-0 bottom-0 z-40 bg-background/60 backdrop-blur-sm ${
              scrolled ? "top-14" : "top-16"
            }`}
            aria-hidden="true"
          />

          <motion.div
            key="panel"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            {...panelAnim}
            className="lg:hidden fixed left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl"
            style={{ top: scrolled ? "3.5rem" : "4rem" }}
          >
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={containerVariants}
              className="container-editorial py-4 flex flex-col gap-1"
            >
              {items.map((item, i) => {
                const isActive = activeId === item.id;
                return (
                  <motion.a
                    key={item.href}
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    variants={itemVariants}
                    whileTap={reduced ? undefined : { scale: 0.98 }}
                    className={`group flex items-center gap-3 text-sm py-2.5 rounded-md transition-all duration-200 ${
                      isActive
                        ? "bg-white/[0.04] border-l-2 border-brand-cyan pl-3 font-medium text-foreground"
                        : "border-l-2 border-transparent pl-3 text-muted-foreground hover:text-foreground motion-safe:hover:translate-x-0.5"
                    }`}
                  >
                    <span className="text-[10px] tabular-nums text-muted-foreground/60 w-5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`size-1.5 rounded-full bg-brand-cyan transition-opacity ${
                        isActive
                          ? "opacity-100 shadow-[0_0_8px_oklch(0.82_0.14_210/0.6)]"
                          : "opacity-0"
                      }`}
                    />
                    <span>{item.label}</span>
                  </motion.a>
                );
              })}

              <motion.div
                variants={itemVariants}
                className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-2"
              />

              <motion.div variants={itemVariants}>
                <Button
                  size="sm"
                  asChild
                  className="w-full bg-gradient-to-r from-brand-cyan to-brand-blue text-background"
                >
                  <a href="#contato" onClick={onClose}>
                    Agendar demonstração
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
