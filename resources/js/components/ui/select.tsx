import { forwardRef, useId, type SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, id, children, ...props }, ref) => {
    const generatedId = useId()
    const selectId = id ?? props.name ?? generatedId
    const descriptionId = error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined

    return (
      <div className="flex flex-col gap-1.5">
        {label ? <label htmlFor={selectId} className="text-sm font-medium text-foreground">{label}</label> : null}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'h-11 w-full appearance-none rounded-lg border border-input bg-background-tertiary px-4 pr-10 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/35',
              error && 'border-destructive focus:border-destructive focus:ring-destructive/35',
              className,
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={descriptionId}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        </div>
        {error ? <p id={descriptionId} className="text-xs text-destructive" role="alert">{error}</p> : null}
        {hint && !error ? <p id={descriptionId} className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>
    )
  },
)
Select.displayName = 'Select'

