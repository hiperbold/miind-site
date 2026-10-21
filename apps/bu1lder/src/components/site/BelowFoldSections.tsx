import {
  ProblemSection,
  SolutionSection,
  WhatYouBuildSection,
  HowItWorksSection,
  UseCasesSection,
  DifferentialsSection,
  GovernanceSection,
  MethodologySection,
  BenefitsSection,
  AudienceSection,
  CTABanner,
  FAQSection,
  FinalSection,
  Footer,
} from "@/components/site/Sections";
import {
  ManifestoSection,
  MetricsSection,
  TestimonialSection,
} from "@/components/site/NarrativeSections";

/**
 * Agrupa todas as seções abaixo da dobra para serem carregadas como um
 * único chunk via React.lazy() em routes/index.tsx. Reduz o JS inicial e
 * melhora LCP/TBT sem alterar a ordem visual da página.
 */
export default function BelowFoldSections() {
  return (
    <>
      {/* Por quê */}
      <ProblemSection />
      <SolutionSection />
      <AudienceSection />
      {/* O quê */}
      <WhatYouBuildSection />
      <HowItWorksSection />
      <UseCasesSection />
      {/* Prova */}
      <MetricsSection />
      <TestimonialSection />
      {/* Por que confiar */}
      <DifferentialsSection />
      <GovernanceSection />
      <MethodologySection />
      <BenefitsSection />
      {/* Conversão */}
      <ManifestoSection />
      <FAQSection />
      <CTABanner />
      <FinalSection formId="contato" />
      <Footer />
    </>
  );
}
