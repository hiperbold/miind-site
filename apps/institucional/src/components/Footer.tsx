import { assetUrl } from '@/asset-url';
import { useState } from 'react';
import { ArrowRight, Linkedin, Instagram, ShieldCheck, FileText, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import miindLogoAsset from '@/assets/miind-logo.svg.asset.json';
import miindLogoBlueAsset from '@/assets/miind-logo-blue.svg.asset.json';
import { useTheme } from '@/hooks/useTheme';
import { useT } from '@/i18n/useT';
import { CONTACT_EMAIL, CONTACT_PHONE_E164, CONTACT_PHONE_DISPLAY } from '@/lib/contact';

const platformLinks = [
  { k: 'footer.plat.1', href: '#bu1lder' },
  { k: 'footer.plat.2', href: '#bu1lder' },
  { k: 'footer.plat.3', href: '#bu1lder' },
  { k: 'footer.plat.4', href: '#bu1lder' },
];

const miindLinks = [
  { k: 'footer.miind.1', href: '#hero' },
  { k: 'footer.miind.2', href: '#methodology' },
  { k: 'footer.miind.3', href: '#ecosystem' },
  { k: 'footer.miind.4', href: '#solutions' },
  { k: 'footer.miind.5', href: '#why' },
  { k: 'nav.blog', href: '/blog', route: true as const },
  { k: 'footer.miind.6', href: '#next-step' },
];

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

const miindLogoDark = assetUrl(miindLogoAsset.url);
const miindLogoLight = assetUrl(miindLogoBlueAsset.url);

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useT();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmail(email)) {
      toast.error(t('footer.newsletter.invalid') as string);
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: email.toLowerCase().trim(), source: 'footer' });

      if (error) {
        if (error.code === '23505') {
          toast.success(t('footer.newsletter.dup') as string);
          setEmail('');
          return;
        }
        throw error;
      }

      toast.success(t('footer.newsletter.ok') as string);
      setEmail('');
    } catch (err) {
      toast.error(t('footer.newsletter.err') as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative text-foreground py-8 sm:py-12 px-0">
      <div className="section-frame">
        <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div aria-hidden="true" className="aurora-beam" />

        <div className="relative z-10 px-5 sm:px-10 lg:px-14 xl:px-16 py-14 sm:py-16 lg:py-20">
        <div className="pb-10 border-b border-border pt-2">
          <img
            src={theme === "light" ? miindLogoLight : miindLogoDark}
            alt="MIIND"
            width={400}
            height={140}
            className="h-16 lg:h-20 w-auto mb-4"
          />
          <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.32em] text-muted-foreground/80">
            A.I. Tech Company.

          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 py-12 lg:py-14">
          <div className="min-w-0">
            <h4 className="eyebrow mb-5">{t('footer.col.platform')}</h4>
            <ul className="space-y-2.5">
              {platformLinks.map((l) => (
                <li key={l.k}>
                  <a href={l.href} className="ink-link text-sm leading-snug text-muted-foreground hover:text-foreground transition-colors break-words">
                    {t(l.k)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="eyebrow mb-5">{t('footer.col.miind')}</h4>
            <ul className="space-y-2.5">
              {miindLinks.map((l) => (
                <li key={l.k}>
                  {('route' in l && l.route) ? (
                    <Link to={l.href} className="ink-link text-sm leading-snug text-muted-foreground hover:text-foreground transition-colors break-words">
                      {t(l.k)}
                    </Link>
                  ) : (
                    <a href={l.href} className="ink-link text-sm leading-snug text-muted-foreground hover:text-foreground transition-colors break-words">
                      {t(l.k)}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="eyebrow mb-5">{t('footer.col.legal')}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/politica-de-privacidade" className="inline-flex items-start gap-2 text-sm leading-snug text-muted-foreground hover:text-foreground transition-colors">
                  <ShieldCheck aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-brand-cyan" />
                  <span>{t('footer.legal.privacy')}</span>
                </Link>
              </li>
              <li>
                <Link to="/termos-de-servico" className="inline-flex items-start gap-2 text-sm leading-snug text-muted-foreground hover:text-foreground transition-colors">
                  <FileText aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-brand-cyan" />
                  <span>{t('footer.legal.terms')}</span>
                </Link>
              </li>
            </ul>
            <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
              {t('footer.legal.lgpd')}
            </p>
          </div>

          <div className="min-w-0">
            <h4 className="eyebrow mb-5">{t('footer.col.social')}</h4>
            <div className="space-y-2.5">
              <a href="https://www.linkedin.com/company/miind-ia/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm leading-snug text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin aria-hidden="true" className="w-4 h-4 shrink-0 text-brand-cyan" />
                LinkedIn
              </a>
              <a href="https://www.instagram.com/miind.oficial/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm leading-snug text-muted-foreground hover:text-foreground transition-colors">
                <Instagram aria-hidden="true" className="w-4 h-4 shrink-0 text-brand-cyan" />
                Instagram
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="block text-sm leading-snug text-muted-foreground hover:text-foreground transition-colors break-all">
                {CONTACT_EMAIL}
              </a>
              <a href={`tel:${CONTACT_PHONE_E164}`} className="block text-sm leading-snug num text-muted-foreground hover:text-foreground transition-colors">
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-border">

          <div className="eyebrow mb-5"><span>{t('footer.newsletter.eyebrow')}</span></div>
          <h4 className="font-display text-xl font-semibold mb-2">{t('footer.newsletter.title')}</h4>
          <p className="text-sm text-muted-foreground mb-5 max-w-xl">{t('footer.newsletter.lead')}</p>
          <form onSubmit={handleSubmit} className="relative flex items-center gap-2 glass rounded-xl p-1.5 max-w-xl">
            <label htmlFor="newsletter-email" className="sr-only">{t('footer.newsletter.label')}</label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder={t('footer.newsletter.placeholder') as string}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 aria-hidden="true" className="w-3.5 h-3.5 animate-spin" />
                  {t('footer.newsletter.sending')}
                </>
              ) : (
                <>
                  {t('footer.newsletter.submit')}
                  <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="pt-6 mt-10 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono tracking-wider">
            © <span className="num">{new Date().getFullYear()}</span> MIIND · {t('footer.copyright')}
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
