'use client'

import { useState, createContext, useContext, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type AccordionVariant = 'card' | 'line'

interface AccordionContextValue {
  openItems: Set<string>
  toggle: (id: string) => void
  variant: AccordionVariant
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

export function Accordion({
  children,
  allowMultiple = false,
  className,
  variant = 'card',
}: {
  children: ReactNode
  allowMultiple?: boolean
  className?: string
  variant?: AccordionVariant
}) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set<string>(allowMultiple ? prev : [])
      if (prev.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggle, variant }}>
      <div className={cn(variant === 'card' ? 'flex flex-col gap-3' : 'border-t border-border', className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({
  id,
  title,
  children,
  prefix,
}: {
  id: string
  title: string
  children: ReactNode
  prefix?: string
}) {
  const ctx = useContext(AccordionContext)
  if (!ctx) throw new Error('AccordionItem must be used within Accordion')
  const isOpen = ctx.openItems.has(id)
  const line = ctx.variant === 'line'

  return (
    <div className={cn(
      line
        ? 'border-b border-border'
        : 'overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-border-hover'
    )}>
      <button
        id={`${id}-trigger`}
        type="button"
        onClick={() => ctx.toggle(id)}
        className={cn(
          'flex w-full items-center justify-between gap-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
          line ? 'py-5 sm:py-6' : 'p-5'
        )}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
      >
        <span className="flex min-w-0 items-baseline gap-4">
          {prefix && <span className="shrink-0 font-mono text-[10px] tracking-[0.12em] text-primary-light">{prefix}</span>}
          <span className={cn('font-medium text-foreground', line && 'text-base sm:text-lg')}>{title}</span>
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300',
            isOpen && 'rotate-180 text-primary'
          )}
          aria-hidden="true"
        />
      </button>
      <div
        id={`${id}-content`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        aria-hidden={!isOpen}
        className={cn('grid transition-[grid-template-rows,opacity] duration-300 ease-out', isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}
      >
        <div className="overflow-hidden">
          <p className={cn('text-sm leading-7 text-muted-foreground', line ? 'pb-6 pl-10 pr-10 sm:pl-[3.25rem]' : 'px-5 pb-5')}>{children}</p>
        </div>
      </div>
    </div>
  )
}

