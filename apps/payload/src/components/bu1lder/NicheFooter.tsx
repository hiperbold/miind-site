import { AnoAtual } from './AnoAtual'
import { BrandLockup } from './BrandLockup'

export type FooterLink = { label: string; url: string }

// Porte de NicheFooter: só marca, menu Legal e direitos reservados.
export function NicheFooter({
  linksTitle = 'Legal',
  links,
  rightsText = 'MIIND. Todos os direitos reservados.',
}: {
  linksTitle?: string | null
  links: FooterLink[]
  rightsText?: string | null
}) {
  return (
    <footer className="niche-footer relative border-t border-border overflow-hidden" aria-label="Rodapé Bu1lder">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent"
      />
      <div className="container-editorial relative py-14 sm:py-16 flex flex-col sm:flex-row justify-between gap-10">
        <div className="niche-footer-brand">
          <BrandLockup />
        </div>
        {links.length > 0 && (
          <nav aria-label={linksTitle || 'Legal'}>
            <h2 className="eyebrow text-brand-cyan mb-5">{linksTitle || 'Legal'}</h2>
            <ul className="grid gap-3 text-sm text-muted-foreground">
              {links.map((link) => (
                <li key={link.url}>
                  <a className="hover:text-foreground transition-colors" href={link.url}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <div className="border-t border-border">
        <div className="container-editorial pt-6 pb-20">
          <p className="text-xs text-muted-foreground">
            © <AnoAtual anoDoServidor={new Date().getFullYear()} /> {rightsText}
          </p>
        </div>
      </div>
    </footer>
  )
}
