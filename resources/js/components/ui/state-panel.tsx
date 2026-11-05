import type { LucideIcon } from 'lucide-react'
import { AlertTriangle, CheckCircle2, CloudOff, FileQuestion, Loader2, LockKeyhole } from 'lucide-react'
import { cn } from '@/lib/utils'

type StateKind = 'empty' | 'error' | 'loading' | 'offline' | 'stale' | 'forbidden' | 'success'

const stateConfig: Record<StateKind, { icon: LucideIcon; tone: string }> = {
  empty: { icon: FileQuestion, tone: 'text-muted-foreground bg-muted' },
  error: { icon: AlertTriangle, tone: 'text-danger-light bg-danger/10' },
  loading: { icon: Loader2, tone: 'text-primary-light bg-primary/10' },
  offline: { icon: CloudOff, tone: 'text-warning-light bg-warning/10' },
  stale: { icon: AlertTriangle, tone: 'text-warning-light bg-warning/10' },
  forbidden: { icon: LockKeyhole, tone: 'text-danger-light bg-danger/10' },
  success: { icon: CheckCircle2, tone: 'text-success-light bg-success/10' },
}

export function StatePanel({ kind, title, description, action, compact = false, className }: { kind: StateKind; title: string; description?: string; action?: React.ReactNode; compact?: boolean; className?: string }) {
  const config = stateConfig[kind]
  const Icon = config.icon
  return (
    <div className={cn('flex flex-col items-center justify-center text-center', compact ? 'gap-3 py-7' : 'min-h-64 gap-4 py-12', className)} role={kind === 'error' || kind === 'offline' ? 'alert' : 'status'} aria-live="polite">
      <span className={cn('flex items-center justify-center rounded-xl', compact ? 'h-10 w-10' : 'h-12 w-12', config.tone)}><Icon className={cn(compact ? 'h-5 w-5' : 'h-6 w-6', kind === 'loading' && 'animate-spin')} aria-hidden="true" /></span>
      <div><p className="font-semibold text-foreground">{title}</p>{description ? <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-muted-foreground">{description}</p> : null}</div>
      {action}
    </div>
  )
}

