import { BrandLockup } from "@/components/site/BrandLockup";
import { lazy, Suspense, useEffect, useState } from "react";
import { m as motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

const MobileMenu = lazy(() => import("./MobileMenu"));
const prefetchMobileMenu = () => {
  void import("./MobileMenu");
};

const navItems = [
  { label: "Solução", href: "#solucoes", id: "solucoes" },
  { label: "Como funciona", href: "#como-funciona", id: "como-funciona" },
  { label: "Casos", href: "#casos", id: "casos" },
  { label: "Governança", href: "#seguranca", id: "seguranca" },
  { label: "Bu1lders", href: import.meta.env.BASE_URL + "parceiros/", id: "bu1lders" },
  { label: "Contato", href: "#contato", id: "contato" },
];

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  const scaleX = reduced ? scrollYProgress : smooth;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = navItems
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.01, 0.5, 1] },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => {
    setHasOpened(true);
    setOpen((o) => !o);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border/80"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div
        className={`container-editorial flex items-center justify-between transition-all duration-500 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <Link to="/" className="flex items-center gap-2 group">
          <BrandLockup />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`group relative text-sm transition-colors py-1 ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                <span
                  className={`pointer-events-none absolute left-0 -bottom-0.5 h-px w-full origin-left bg-gradient-to-r from-brand-cyan to-brand-blue transition-transform duration-300 ease-out ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />
          <Button
            size="sm"
            asChild
            className="bg-gradient-to-r from-brand-cyan to-brand-blue text-background hover:opacity-90 motion-safe:hover:-translate-y-0.5 transition-all duration-300 shadow-[0_8px_30px_-8px_oklch(0.82_0.14_210/0.6)] hover:shadow-[0_12px_40px_-10px_oklch(0.82_0.14_210/0.8)]"
          >
            <a href="#contato">Agendar demo</a>
          </Button>
        </div>

        <button
          className="lg:hidden relative p-2 rounded-md hover:bg-white/5 active:bg-white/10 transition-colors"
          onClick={toggleMenu}
          onPointerEnter={prefetchMobileMenu}
          onPointerDown={prefetchMobileMenu}
          onFocus={prefetchMobileMenu}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="relative grid place-items-center size-5">
            <motion.span
              animate={{ opacity: open ? 0 : 1, rotate: open ? -90 : 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.25, ease: EASE_OUT_EXPO }}
              className="absolute inset-0 grid place-items-center"
            >
              <Menu className="size-5" />
            </motion.span>
            <motion.span
              animate={{ opacity: open ? 1 : 0, rotate: open ? 0 : 90 }}
              transition={reduced ? { duration: 0 } : { duration: 0.25, ease: EASE_OUT_EXPO }}
              className="absolute inset-0 grid place-items-center"
            >
              <X className="size-5" />
            </motion.span>
          </span>
        </button>
      </div>

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      {hasOpened && (
        <Suspense fallback={null}>
          <MobileMenu
            open={open}
            onClose={() => setOpen(false)}
            activeId={activeId}
            scrolled={scrolled}
            items={navItems}
          />
        </Suspense>
      )}
    </header>
  );
}
