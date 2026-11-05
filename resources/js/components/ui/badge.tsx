import { type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'bg-accent text-muted-foreground border-border',
        primary: 'bg-primary/10 text-primary-light border-primary/20',
        success: 'bg-success/10 text-success-light border-success/20',
        warning: 'bg-warning/10 text-warning-light border-warning/20',
        danger: 'bg-danger/10 text-danger-light border-danger/20',
        info: 'bg-secondary/10 text-secondary-light border-secondary/20',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  dot?: boolean
}

export function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props}>
      {dot && (
        <span
          className={cn('h-1.5 w-1.5 rounded-full', {
            'signal-pulse bg-success text-success': variant === 'success',
            'bg-primary': variant === 'primary',
            'bg-warning': variant === 'warning',
            'bg-danger': variant === 'danger',
            'bg-secondary': variant === 'info',
            'bg-muted-foreground': !variant || variant === 'default',
          })}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}

