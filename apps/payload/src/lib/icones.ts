import {
  BadgePercent,
  BarChart3,
  BellRing,
  Briefcase,
  Building2,
  Calculator,
  CalendarCheck,
  CalendarClock,
  Car,
  CarFront,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Code,
  CreditCard,
  Dumbbell,
  FileCheck,
  FileText,
  Gift,
  HeartPulse,
  Home,
  Layers,
  Megaphone,
  MessageCircle,
  PawPrint,
  PiggyBank,
  Plug,
  Receipt,
  Repeat,
  RotateCcw,
  Scissors,
  Search,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  Store,
  Syringe,
  TrendingDown,
  TrendingUp,
  Trophy,
  UserPlus,
  Users,
  UtensilsCrossed,
  Wallet,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react'

import { createElement } from 'react'

import type { NomeIcone } from './icones-nomes'

// Ícones disponíveis nos blocos. Mapa explícito (sem `import *`) para o
// bundle levar só estes. Para incluir um ícone novo: importar acima,
// acrescentar aqui e em icones-nomes.ts (lista do admin).
export const ICONES = {
  BadgePercent,
  BarChart3,
  BellRing,
  Briefcase,
  Building2,
  Calculator,
  CalendarCheck,
  CalendarClock,
  Car,
  CarFront,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Code,
  CreditCard,
  Dumbbell,
  FileCheck,
  FileText,
  Gift,
  HeartPulse,
  Home,
  Layers,
  Megaphone,
  MessageCircle,
  PawPrint,
  PiggyBank,
  Plug,
  Receipt,
  Repeat,
  RotateCcw,
  Scissors,
  Search,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  Store,
  Syringe,
  TrendingDown,
  TrendingUp,
  Trophy,
  UserPlus,
  Users,
  UtensilsCrossed,
  Wallet,
  Workflow,
  Wrench,
  Zap,
} satisfies Record<NomeIcone, LucideIcon>

export function icone(nome: string | null | undefined, padrao: NomeIcone = 'Plug'): LucideIcon {
  if (nome && nome in ICONES) return ICONES[nome as NomeIcone]
  return ICONES[padrao]
}

// Renderiza um ícone pelo nome. createElement direto evita criar componente
// durante o render (regra react-hooks/static-components).
export function IconeLucide({
  nome,
  padrao = 'Plug',
  className,
}: {
  nome: string | null | undefined
  padrao?: NomeIcone
  className?: string
}) {
  return createElement(icone(nome, padrao), { className })
}
