import { cn } from '@/lib/utils'

export interface ProgressProps {
  value: number
  max?: number
  className?: string
  barClassName?: string
  variant?: 'primary' | 'success' | 'warning' | 'danger'
  showLabel?: boolean
  label?: string
}

const variantStyles = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
}

export function Progress({
  value,
  max = 100,
  className,
  barClassName,
  variant = 'primary',
  showLabel = false,
  label,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const autoVariant =
    percentage > 90 ? 'danger' : percentage > 70 ? 'warning' : variant

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium text-foreground">{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div
        className={cn('h-2 w-full overflow-hidden rounded-full bg-muted', className)}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            'h-full rounded-full transition-[width] duration-[1400ms] ease-out',
            variantStyles[autoVariant],
            barClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

