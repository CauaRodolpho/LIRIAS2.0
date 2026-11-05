import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ChoiceCard({
  selected,
  onSelect,
  title,
  description,
  leading,
  trailing,
  meta,
  className,
}: {
  selected: boolean
  onSelect: () => void
  title: ReactNode
  description?: ReactNode
  leading?: ReactNode
  trailing?: ReactNode
  meta?: ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        'group flex min-h-20 w-full items-start gap-3 rounded-lg border p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        selected ? 'border-primary/50 bg-primary/10' : 'border-border bg-background hover:border-border-hover hover:bg-card-hover',
        className,
      )}
    >
      {leading ? <span className="shrink-0">{leading}</span> : null}
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">{title}{meta}</span>
        {description ? <span className="mt-1 block text-xs leading-5 text-muted-foreground">{description}</span> : null}
      </span>
      {trailing ?? <span className={cn('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border', selected ? 'border-primary bg-primary text-primary-foreground' : 'border-border')}><Check className={cn('h-3 w-3', !selected && 'opacity-0')} aria-hidden="true" /></span>}
    </button>
  )
}

