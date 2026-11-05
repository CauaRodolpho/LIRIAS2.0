'use client'

import { useId, useState, createContext, useContext, type KeyboardEvent, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TabsContextValue {
  active: string
  setActive: (id: string) => void
  baseId: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

function itemId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9_-]+/g, '-')
}

export function Tabs({
  defaultValue,
  children,
  className,
}: {
  defaultValue: string
  children: ReactNode
  className?: string
}) {
  const [active, setActive] = useState(defaultValue)
  const baseId = useId()

  return (
    <TabsContext.Provider value={{ active, setActive, baseId }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn(
        'inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-lg border border-border bg-background-tertiary p-1',
        className
      )}
    >
      {children}
    </div>
  )
}

export function TabsTrigger({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('TabsTrigger must be used within Tabs')
  const isActive = ctx.active === value
  const suffix = itemId(value)

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return

    const list = event.currentTarget.closest('[role="tablist"]')
    const tabs = Array.from(list?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [])
    const currentIndex = tabs.indexOf(event.currentTarget)
    if (currentIndex < 0 || tabs.length === 0) return

    event.preventDefault()
    const nextIndex =
      event.key === 'Home' ? 0
        : event.key === 'End' ? tabs.length - 1
          : event.key === 'ArrowRight' ? (currentIndex + 1) % tabs.length
            : (currentIndex - 1 + tabs.length) % tabs.length

    tabs[nextIndex]?.focus()
    tabs[nextIndex]?.click()
  }

  return (
    <button
      id={`${ctx.baseId}-tab-${suffix}`}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`${ctx.baseId}-panel-${suffix}`}
      tabIndex={isActive ? 0 : -1}
      onClick={() => ctx.setActive(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        'shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('TabsContent must be used within Tabs')
  if (ctx.active !== value) return null

  const suffix = itemId(value)
  return (
    <div
      id={`${ctx.baseId}-panel-${suffix}`}
      role="tabpanel"
      aria-labelledby={`${ctx.baseId}-tab-${suffix}`}
      tabIndex={0}
      className="animate-fade-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      {children}
    </div>
  )
}

