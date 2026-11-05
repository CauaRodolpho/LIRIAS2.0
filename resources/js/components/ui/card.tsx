import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export type CardVariant = 'default' | 'surface' | 'interactive' | 'data' | 'commerce' | 'plain'

const cardVariantClasses: Record<CardVariant, string> = {
  default: 'surface-card',
  surface: 'surface-card bg-card/55',
  interactive:
    'surface-card surface-card-interactive',
  data: 'surface-card bg-card/75',
  commerce: 'surface-card bg-card/90',
  plain: 'bg-transparent',
}

export function cardVariants({
  variant = 'default',
  className,
}: {
  variant?: CardVariant
  className?: string
} = {}) {
  return cn(
    'text-card-foreground',
    cardVariantClasses[variant],
    className
  )
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cardVariants({ variant, className })}
      {...props}
    />
  )
)
Card.displayName = 'Card'

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1.5 p-6', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-lg font-semibold text-card-foreground', className)} {...props} />
  )
)
CardTitle.displayName = 'CardTitle'

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
)
CardDescription.displayName = 'CardDescription'

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'

