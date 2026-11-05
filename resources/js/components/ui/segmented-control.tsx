import { cn } from '@/lib/utils'

export type Segment<T extends string> = { value: T; label: string; count?: number }

export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string
  value: T
  options: readonly Segment<T>[]
  onChange: (value: T) => void
  className?: string
}) {
  return (
    <div className={cn('flex max-w-full gap-1 overflow-x-auto rounded-lg border border-border bg-card/60 p-1', className)} role="group" aria-label={label}>
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              'flex min-h-10 shrink-0 items-center gap-2 rounded-md px-3.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
              selected ? 'bg-foreground text-background shadow-sm' : 'text-muted-foreground hover:bg-accent hover:text-foreground',
            )}
          >
            {option.label}
            {option.count !== undefined ? <span className={cn('text-xs', selected ? 'text-background/70' : 'text-muted-foreground')}>{option.count}</span> : null}
          </button>
        )
      })}
    </div>
  )
}

