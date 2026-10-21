import { Reveal } from './Reveal'

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string | null
  title?: string | null
  subtitle?: string | null
}) {
  if (!eyebrow && !title && !subtitle) return null
  return (
    <Reveal>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow text-brand-violet">{eyebrow}</p>}
        {title && (
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-[-0.03em] leading-[1.1] text-foreground">
            {title}
          </h2>
        )}
        {subtitle && <p className="mt-4 lead">{subtitle}</p>}
      </div>
    </Reveal>
  )
}
