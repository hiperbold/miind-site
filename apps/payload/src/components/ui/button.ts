import { cn } from '@/lib/utils'

// Classes do Button de apps/bu1lder/src/components/ui/button.tsx (cva), sem o
// Slot: quem usa aplica as classes direto no <a> ou no <button>.
const BASE =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'

const VARIANTES = {
  default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
  outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
} as const

const TAMANHOS = {
  default: 'h-9 px-4 py-2',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-10 rounded-md px-8',
} as const

export function botaoClasses({
  variant = 'default',
  size = 'default',
  className,
}: {
  variant?: keyof typeof VARIANTES
  size?: keyof typeof TAMANHOS
  className?: string
} = {}) {
  return cn(BASE, VARIANTES[variant], TAMANHOS[size], className)
}
