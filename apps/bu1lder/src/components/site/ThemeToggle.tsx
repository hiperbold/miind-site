import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { m as motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // SSR + first client paint render a stable placeholder to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        aria-label="Alternar tema"
        className="relative w-9 h-9 rounded-full glass grid place-items-center overflow-hidden"
      >
        <Sun className="size-4 text-brand-cyan" />
      </button>
    );
  }

  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={`Ativar modo ${isDark ? "claro" : "escuro"}`}
      className="relative w-9 h-9 rounded-full glass grid place-items-center overflow-hidden hover:border-brand-cyan/40 transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 12, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -12, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.25 }}
          className="absolute"
        >
          {isDark ? (
            <Sun className="size-4 text-brand-cyan" />
          ) : (
            <Moon className="size-4 text-brand-blue" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
