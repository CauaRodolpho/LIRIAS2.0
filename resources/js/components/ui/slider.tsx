'use client'

import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  valueLabel?: string
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, valueLabel, id, ...props }, ref) => {
    const min = Number(props.min ?? 0)
    const max = Number(props.max ?? 100)
    const value = Number(props.value ?? min)
    const percent = max > min ? ((value - min) / (max - min)) * 100 : 0

    return (
      <div className="flex flex-col gap-2">
        {(label || valueLabel) && (
          <div className="flex items-baseline justify-between">
            {label && (
              <label htmlFor={id} className="text-sm font-medium text-foreground">
                {label}
              </label>
            )}
            {valueLabel && (
              <span className="font-mono text-sm font-semibold text-primary">{valueLabel}</span>
            )}
          </div>
        )}
        <input
          ref={ref}
          id={id}
          type="range"
          className={cn(
            'h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary',
            '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110',
            '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-background',
            className
          )}
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) ${percent}%, hsl(var(--border)) ${percent}%)`,
          }}
          {...props}
        />
      </div>
    )
  }
)
Slider.displayName = 'Slider'

