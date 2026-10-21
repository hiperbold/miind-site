import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ClientLogosSection } from "@/components/site/NarrativeSections";

// Tudo abaixo da dobra entra em um chunk separado para reduzir o JS inicial.
const BelowFoldSections = lazy(() => import("@/components/site/BelowFoldSections"));


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bu1lder by Miind | Agentes, automações e software com IA generativa" },
      {
        name: "description",
        content:
          "Crie agentes de IA, fluxos de automação, integrações e aplicações digitais com governança enterprise. Conheça o Bu1lder, a plataforma da Miind.",
      },
      {
        name: "keywords",
        content:
          "IA generativa, agentes de IA, automação empresarial, builder visual, chatbot enterprise, governança de IA, Miind, Bu1lder",
      },
      { property: "og:title", content: "Bu1lder by Miind" },
      {
        property: "og:description",
        content:
          "A plataforma da Miind para criar agentes, fluxos e aplicações com IA generativa e governança enterprise.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:image:width", content: "1216" },
      { property: "og:image:height", content: "640" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Bu1lder by Miind" },
      {
        name: "twitter:description",
        content:
          "A plataforma da Miind para criar agentes, fluxos e aplicações com IA generativa e governança enterprise.",
      },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Bu1lder by Miind",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description:
            "Plataforma para criação de agentes de IA generativa, fluxos visuais de automação e aplicações digitais com governança enterprise.",
          publisher: {
            "@type": "Organization",
            name: "Miind",
            slogan: "Tecnologia para humanos criativos.",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { q: "O Bu1lder é apenas um construtor de chatbot?", a: "Não. O Bu1lder permite criar agentes, fluxos, automações, integrações, dashboards e experiências digitais — chat é só um dos canais possíveis." },
            { q: "A plataforma se integra aos sistemas da empresa?", a: "Sim, de forma nativa. Conectamos APIs, CRMs, ERPs, bancos de dados, mensageria e ferramentas corporativas via conectores e webhooks." },
            { q: "É possível ter aprovação antes de publicar um fluxo?", a: "Toda alteração entra como uma versão. Você define quem aprova, e nada vai para produção sem o ok do responsável." },
            { q: "O Bu1lder usa IA generativa?", a: "Sim. Orquestramos modelos de linguagem, bases de conhecimento (RAG), prompts versionados, regras de negócio e agentes especializados num mesmo builder." },
            { q: "Serve para grandes empresas?", a: "Foi desenhado para esse cenário: segurança, governança, rastreabilidade, segregação de ambientes e escala estão na base do produto." },
            { q: "A Miind também ajuda na implantação?", a: "O time da Miind atua como parceiro estratégico — do discovery à evolução contínua — pela metodologia descrita acima." },
            { q: "Posso começar por um caso de uso específico?", a: "É o caminho recomendado. Comece por uma dor clara, valide resultados em semanas e depois escale para novos fluxos, áreas e agentes." },
          ].map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }),
      },
    ],
  }),

  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.18_0.05_265),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0.18_0.05_295/0.4),transparent_55%)]" />
      </div>

      <Header />
      <main id="conteudo">
        <Hero />
        <ClientLogosSection />
        <Suspense fallback={<div className="min-h-[40vh]" aria-hidden="true" />}>
          <BelowFoldSections />
        </Suspense>
      </main>


    </div>
  );
}
