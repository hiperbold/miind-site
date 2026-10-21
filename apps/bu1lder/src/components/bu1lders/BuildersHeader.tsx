import { assetUrl } from '@/asset-url';
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import logoB from "@/assets/logo-b.png.asset.json";

export function BuildersHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/80">
      <div className="container-editorial flex items-center justify-between gap-2 h-14">
        <Link to="/bu1lders" className="flex items-center gap-2 group min-w-0 shrink">
          <div className="relative shrink-0 rounded-lg bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-violet grid place-items-center w-7 h-7 motion-safe:group-hover:rotate-3 transition-transform">
            <img src={assetUrl(logoB.url)} alt="" aria-hidden="true" className="w-full h-full object-contain p-1" />
            <span className="absolute inset-0 rounded-lg bg-brand-cyan/40 blur-md opacity-50 group-hover:opacity-80 transition-opacity -z-10" />
          </div>
          <div className="leading-tight min-w-0">
            <div className="font-bold text-sm tracking-[-0.04em] truncate">
              Bu<span className="bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-violet bg-clip-text text-transparent">1</span>lder.com
            </div>
          </div>
          <span className="ml-2 hidden md:inline-flex items-center rounded-full border border-brand-violet/30 bg-brand-violet/10 text-brand-violet text-[10px] tracking-[0.22em] uppercase font-semibold px-2.5 h-6 shrink-0">
            Programa Bu1lders
          </span>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Link
            to="/"
            className="hidden md:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Voltar ao site
          </Link>
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <a
            href="#cadastro"
            className="inline-flex items-center whitespace-nowrap rounded-full bg-gradient-to-r from-brand-cyan to-brand-blue text-background text-xs sm:text-sm font-semibold px-3 sm:px-4 h-9 shadow-[0_8px_30px_-8px_oklch(0.82_0.14_210/0.6)] hover:shadow-[0_12px_40px_-10px_oklch(0.82_0.14_210/0.8)] motion-safe:hover:-translate-y-0.5 transition-all"
          >
            <span className="sm:hidden">Cadastrar</span>
            <span className="hidden sm:inline">Quero ser um Bu1lder</span>
          </a>
        </div>
      </div>
    </header>
  );
}
