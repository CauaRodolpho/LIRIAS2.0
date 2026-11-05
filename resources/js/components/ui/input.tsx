import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, id, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? props.name ?? generatedId
    const descriptionId = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined

    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        ) : null}
        <div className="relative">
          {leftIcon ? (
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">
              {leftIcon}
            </span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'h-11 w-full rounded-lg border border-input bg-background-tertiary px-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/35',
              leftIcon && 'pl-10',
              error && 'border-destructive focus:border-destructive focus:ring-destructive/35',
              className
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={descriptionId}
            {...props}
          />
        </div>
        {error ? (
          <p id={descriptionId} className="text-xs text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        {hint && !error ? (
          <p id={descriptionId} className="text-xs text-muted-foreground">
            {hint}
          </p>
        ) : null}
      </div>
    )
  }
)
Input.displayName = 'Input'

