import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function ToggleRow({ checked, onCheckedChange, title, description, leading, className }: { checked: boolean; onCheckedChange: (checked: boolean) => void; title: ReactNode; description?: ReactNode; leading?: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn('flex w-full items-start gap-3 rounded-lg border p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background', checked ? 'border-primary/40 bg-primary/10' : 'border-border bg-background hover:bg-card-hover', className)}
    >
      {leading ? <span className="shrink-0">{leading}</span> : null}
      <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-foreground">{title}</span>{description ? <span className="mt-1 block text-xs leading-5 text-muted-foreground">{description}</span> : null}</span>
      <span className={cn('mt-0.5 flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors', checked ? 'bg-primary' : 'bg-muted')} aria-hidden="true"><span className={cn('h-5 w-5 rounded-full bg-white shadow-sm transition-transform', checked && 'translate-x-5')} /></span>
    </button>
  )
}

