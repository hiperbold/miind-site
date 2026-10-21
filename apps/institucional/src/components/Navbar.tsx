import { assetUrl } from '@/asset-url';
import { useState, useEffect } from 'react';
import { Menu, ArrowRight, Sun, Moon, Globe, Check, ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../components/ui/dropdown-menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import miindLogoAsset from '@/assets/miind-logo.svg.asset.json';
import miindLogoBlueAsset from '@/assets/miind-logo-blue.svg.asset.json';
const miindLogoDark = assetUrl(miindLogoAsset.url);
const miindLogoLight = assetUrl(miindLogoBlueAsset.url);
import { useActiveSection } from '@/hooks/useActiveSection';
import { useTheme } from '@/hooks/useTheme';
import { useLocale } from '@/hooks/useLocale';
import { useT } from '@/i18n/useT';
import ReadingProgress from './ReadingProgress';
import SkipToContent from './SkipToContent';

type NavLink = { key: string; href: string; type: 'anchor' | 'route' | 'dropdown' };
const navLinks: NavLink[] = [
  { key: 'nav.metodologia', href: '#methodology', type: 'anchor' },
  { key: 'nav.bu1lder', href: '#bu1lder', type: 'dropdown' },
  { key: 'nav.signals', href: '#signals', type: 'anchor' },
  { key: 'nav.solutions', href: '#solutions', type: 'anchor' },
  { key: 'nav.voices', href: '#voices', type: 'anchor' },
  { key: 'nav.why', href: '#why', type: 'anchor' },
  { key: 'nav.portfolio', href: '/portfolio', type: 'route' },
  { key: 'nav.blog', href: '/blog', type: 'route' },
];

const anchorIds = navLinks.filter((l) => l.type !== 'route').map((l) => l.href.slice(1));

const BU1LDER_SUBLINKS = [
  { key: 'nav.bu1lder.contabilidade', href: '/bu1lder/contabilidade' },
  { key: 'nav.bu1lder.beleza', href: '/bu1lder/beleza' },
  { key: 'nav.bu1lder.odontologia', href: '/bu1lder/odontologia' },
];

const LANG_OPTIONS: Array<{ code: 'pt' | 'en' | 'es'; label: string }> = [
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

const LangSwitcher = ({ size = 'sm' }: { size?: 'sm' | 'md' }) => {
  const { locale, setLocale } = useLocale();
  const { t } = useT();
  const dim = size === 'md' ? 'h-10 w-10' : 'h-9 w-9';
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`relative inline-flex items-center justify-center ${dim} rounded-lg glass text-foreground/80 hover:text-foreground transition-colors`}
        aria-label={t('nav.lang.aria') as string}
      >
        <Globe aria-hidden="true" className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[170px]">
        {LANG_OPTIONS.map((opt) => (
          <DropdownMenuItem
            key={opt.code}
            onSelect={() => setLocale(opt.code)}
            aria-current={locale === opt.code ? 'true' : undefined}
            className="flex items-center justify-between gap-3 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground w-6">
                {opt.code}
              </span>
              <span className="text-sm">{opt.label}</span>
            </span>
            {locale === opt.code ? <Check className="w-4 h-4 text-brand-cyan" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const active = useActiveSection(location.pathname === '/' ? anchorIds : []);
  const { theme, toggle: toggleTheme } = useTheme();
  const { t } = useT();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (href: string) => {
    const sectionId = href.replace('#', '');
    if (location.pathname !== '/') {
      navigate(`/${href}`);
      setIsSheetOpen(false);
      return;
    }
    if (sectionId === 'hero') window.scrollTo({ top: 0, behavior: 'smooth' });
    else document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsSheetOpen(false);
  };

  const scrollToCta = () => {
    if (location.pathname !== '/') { navigate('/#next-step'); return; }
    document.getElementById('next-step')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SkipToContent />
      <ReadingProgress />
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 glass ${
          isScrolled
            ? 'py-1.5 lg:py-2 bg-background/85 border-b border-border/60 shadow-[0_8px_32px_-12px_oklch(0_0_0/0.45)]'
            : 'py-2 lg:py-3'
        }`}
      >
        <div className="px-3 sm:px-6 lg:px-8">
          <div className="px-3 sm:px-6 lg:px-10 xl:px-12 flex items-center justify-between gap-3 lg:gap-4">
            <Link to="/" aria-label={t('nav.home.aria') as string} className="flex-shrink-0">
              <img
                src={theme === "light" ? miindLogoLight : miindLogoDark}
                alt="MIIND"
                width={238}
                height={95}
                className={`w-auto transition-all duration-300 ${
                  isScrolled ? 'h-12 lg:h-14' : 'h-14 lg:h-20'
                }`}

              />
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.type === 'route'
                    ? location.pathname.startsWith(link.href)
                    : link.type === 'dropdown'
                      ? location.pathname.startsWith('/builders') ||
                        (location.pathname === '/' && active === link.href.slice(1))
                      : location.pathname === '/' && active === link.href.slice(1);
                const baseCls = `relative ink-link px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-foreground' : 'text-foreground/75 hover:text-foreground'
                }`;
                const dot = isActive ? (
                  <span aria-hidden="true" className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px w-6 bg-gradient-to-r from-brand-cyan to-brand-violet" />
                ) : null;
                const label = t(link.key);
                if (link.type === 'dropdown') {
                  return (
                    <DropdownMenu key={link.key}>
                      <DropdownMenuTrigger
                        className={`${baseCls} inline-flex items-center gap-1 outline-none`}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        {label}
                        <ChevronDown aria-hidden="true" className="w-3.5 h-3.5 text-brand-cyan" />
                        {dot}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="min-w-[210px]">
                        <DropdownMenuItem
                          onSelect={() => handleAnchorClick(link.href)}
                          className="flex items-center justify-between gap-3 cursor-pointer"
                        >
                          <span className="text-sm">{t('nav.bu1lder.overview')}</span>
                          <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 text-brand-cyan" />
                        </DropdownMenuItem>
                        {BU1LDER_SUBLINKS.map((sub) => (
                          <DropdownMenuItem key={sub.key} asChild className="cursor-pointer">
                            <a href={import.meta.env.BASE_URL + sub.href.replace(/^\//, "")} className="flex items-center justify-between gap-3">
                              <span className="text-sm">{t(sub.key)}</span>
                              <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 text-brand-cyan" />
                            </a>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                }
                return link.type === 'route' ? (
                  <Link key={link.key} to={link.href} className={baseCls} aria-current={isActive ? 'page' : undefined}>
                    {label}{dot}
                  </Link>
                ) : (
                  <a
                    key={link.key}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleAnchorClick(link.href); }}
                    className={baseCls}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {label}{dot}
                  </a>
                );
              })}

              <div className="ml-3 flex items-center gap-1.5">
                <LangSwitcher />
                <button
                  onClick={toggleTheme}
                  className="inline-flex items-center justify-center h-9 w-9 rounded-lg glass text-foreground/80 hover:text-foreground transition-colors"
                  aria-label={(theme === 'dark' ? t('nav.theme.light') : t('nav.theme.dark')) as string}
                >
                  {theme === 'dark' ? <Sun aria-hidden="true" className="w-4 h-4" /> : <Moon aria-hidden="true" className="w-4 h-4" />}
                </button>
              </div>

              <button
                onClick={scrollToCta}
                className="group ml-2 inline-flex items-center gap-2 px-5 h-10 rounded-lg text-sm font-semibold text-background bg-gradient-to-r from-brand-cyan to-brand-violet shadow-[0_8px_24px_-8px_hsl(var(--brand-cyan)/0.55)] hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_hsl(var(--brand-violet)/0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 transition-all duration-200"
              >
                {t('nav.cta')}
                <ArrowRight aria-hidden="true" className="w-4 h-4 text-background transition-transform group-hover:translate-x-0.5" />
              </button>
            </nav>

            {/* Mobile */}
            <div className="lg:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <button
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-foreground glass active:scale-95 transition-transform"
                    aria-label={t('nav.menu.open') as string}
                    aria-expanded={isSheetOpen}
                  >
                    <Menu aria-hidden="true" className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] p-0 bg-surface-1 border-l border-border">
                  <div className="px-6 py-5 border-b border-border">
                    <img src={theme === "light" ? miindLogoLight : miindLogoDark} alt="MIIND" width={238} height={82} className="h-14 w-auto" />
                  </div>

                  <nav aria-label="Mobile navigation" className="px-4 py-6 space-y-1">
                    {navLinks.map((link) =>
                      link.type === 'dropdown' ? (
                        <div key={link.key}>
                          <a
                            href={link.href}
                            onClick={(e) => { e.preventDefault(); handleAnchorClick(link.href); }}
                            className="flex items-center justify-between px-4 py-3.5 text-base font-medium text-foreground rounded-xl hover:bg-surface-2 transition-all"
                          >
                            {t(link.key)}
                            <ArrowRight aria-hidden="true" className="w-4 h-4 text-brand-cyan" />
                          </a>
                          <div className="ml-4 pl-3 border-l border-border/60 space-y-0.5">
                            {BU1LDER_SUBLINKS.map((sub) => (
                              <a
                                key={sub.key}
                                href={import.meta.env.BASE_URL + sub.href.replace(/^\//, "")}
                                onClick={() => setIsSheetOpen(false)}
                                className="flex items-center justify-between px-3 py-2.5 text-sm text-foreground/80 rounded-lg hover:bg-surface-2 hover:text-foreground transition-all"
                              >
                                {t(sub.key)}
                                <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 text-brand-cyan" />
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : link.type === 'route' ? (
                        <Link
                          key={link.key}
                          to={link.href}
                          onClick={() => setIsSheetOpen(false)}
                          className="flex items-center justify-between px-4 py-3.5 text-base font-medium text-foreground rounded-xl hover:bg-surface-2 transition-all"
                        >
                          {t(link.key)}
                          <ArrowRight aria-hidden="true" className="w-4 h-4 text-brand-cyan" />
                        </Link>
                      ) : (
                        <a
                          key={link.key}
                          href={link.href}
                          onClick={(e) => { e.preventDefault(); handleAnchorClick(link.href); }}
                          className="flex items-center justify-between px-4 py-3.5 text-base font-medium text-foreground rounded-xl hover:bg-surface-2 transition-all"
                        >
                          {t(link.key)}
                          <ArrowRight aria-hidden="true" className="w-4 h-4 text-brand-cyan" />
                        </a>
                      )
                    )}
                  </nav>

                  <div className="px-4 pb-6 space-y-3">
                    <div className="flex items-center justify-end gap-2">
                      <LangSwitcher size="md" />
                      <button
                        onClick={toggleTheme}
                        className="inline-flex items-center justify-center h-10 w-10 rounded-lg glass text-foreground/80"
                        aria-label={(theme === 'dark' ? t('nav.theme.light') : t('nav.theme.dark')) as string}
                      >
                        {theme === 'dark' ? <Sun aria-hidden="true" className="w-4 h-4" /> : <Moon aria-hidden="true" className="w-4 h-4" />}
                      </button>
                    </div>
                    <button
                      onClick={scrollToCta}
                      className="group w-full inline-flex items-center justify-center gap-2 h-11 rounded-lg text-sm font-semibold text-background bg-gradient-to-r from-brand-cyan to-brand-violet shadow-[0_8px_24px_-8px_hsl(var(--brand-cyan)/0.55)] hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 transition-all duration-200"
                    >
                      {t('nav.cta')}
                      <ArrowRight aria-hidden="true" className="w-4 h-4 text-background transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
