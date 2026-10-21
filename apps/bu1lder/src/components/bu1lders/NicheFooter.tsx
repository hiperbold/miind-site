import { BrandLockup } from "@/components/site/BrandLockup";
const institutionalBase = import.meta.env.BASE_URL.replace(/bu1lder\/$/, "");

export function NicheFooter() {
  return (
    <footer
      className="niche-footer relative border-t border-border overflow-hidden"
      aria-label="Rodapé Bu1lder"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent"
      />
      <div className="container-editorial relative py-14 sm:py-16 flex flex-col sm:flex-row justify-between gap-10">
        <div className="niche-footer-brand">
          <BrandLockup />
        </div>
        <nav aria-label="Legal">
          <h2 className="eyebrow text-brand-cyan mb-5">Legal</h2>
          <ul className="grid gap-3 text-sm text-muted-foreground">
            <li>
              <a
                className="hover:text-foreground transition-colors"
                href={`${institutionalBase}politica-de-privacidade/`}
              >
                Política de privacidade
              </a>
            </li>
            <li>
              <a
                className="hover:text-foreground transition-colors"
                href={`${institutionalBase}termos-de-servico/`}
              >
                Termos de serviço
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="container-editorial pt-6 pb-20">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MIIND. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
