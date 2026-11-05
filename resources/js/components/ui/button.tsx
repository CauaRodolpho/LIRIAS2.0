import { type ButtonHTMLAttributes, forwardRef, cloneElement, isValidElement } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'lirias-primary-action active:translate-y-px',
        secondary: 'bg-card text-foreground border border-border hover:border-border-hover hover:bg-card-hover',
        ghost: 'text-muted-foreground hover:text-foreground hover:bg-accent',
        outline: 'border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary',
        danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        xs: 'h-8 px-3 text-xs',
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-sm',
        lg: 'h-13 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, disabled, asChild, ...props }, ref) => {
    if (asChild && isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string; children?: React.ReactNode }>
      return cloneElement(child, {
        className: cn(buttonVariants({ variant, size }), className, child.props.className),
        children: <>{leftIcon}{child.props.children}{rightIcon}</>,
      })
    }

    return (
      <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} disabled={disabled || isLoading} aria-busy={isLoading} {...props}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  }
)
Button.displayName = 'Button'

