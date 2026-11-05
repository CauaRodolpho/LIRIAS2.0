import { forwardRef, useId, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const generatedId = useId()
    const textareaId = id ?? props.name ?? generatedId
    const descriptionId = error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined

    return (
      <div className="flex flex-col gap-1.5">
        {label ? <label htmlFor={textareaId} className="text-sm font-medium text-foreground">{label}</label> : null}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'min-h-28 w-full resize-y rounded-lg border border-input bg-background-tertiary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/35',
            error && 'border-destructive focus:border-destructive focus:ring-destructive/35',
            className,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={descriptionId}
          {...props}
        />
        {error ? <p id={descriptionId} className="text-xs text-destructive" role="alert">{error}</p> : null}
        {hint && !error ? <p id={descriptionId} className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

