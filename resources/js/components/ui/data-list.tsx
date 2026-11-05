import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function DataList({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('divide-y divide-border', className)} role="list">{children}</div>
}

export function DataListItem({ leading, title, description, meta, action, className }: { leading?: ReactNode; title: ReactNode; description?: ReactNode; meta?: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <div className={cn('grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center', className)} role="listitem">
      <div className="flex min-w-0 items-start gap-3">
        {leading ? <div className="shrink-0">{leading}</div> : null}
        <div className="min-w-0"><div className="text-sm font-medium text-foreground">{title}</div>{description ? <div className="mt-1 text-xs leading-5 text-muted-foreground">{description}</div> : null}</div>
      </div>
      {(meta || action) ? <div className="flex items-center justify-between gap-3 pl-11 sm:justify-end sm:pl-0">{meta}{action}</div> : null}
    </div>
  )
}

