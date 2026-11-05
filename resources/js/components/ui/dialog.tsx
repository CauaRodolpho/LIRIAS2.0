import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from './button'

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
}) {
  const titleId = useId()
  const descriptionId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!open) return
    returnFocusRef.current = document.activeElement as HTMLElement
    const root = document.getElementById('root')
    const previousOverflow = document.body.style.overflow
    root?.setAttribute('inert', '')
    root?.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = 'hidden'

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false)
        return
      }
      if (event.key !== 'Tab') return
      const focusable = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])') ?? [])
      const first = focusable[0]
      const last = focusable.at(-1)
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }

    window.addEventListener('keydown', handleKeydown)
    window.requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      root?.removeAttribute('inert')
      root?.removeAttribute('aria-hidden')
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeydown)
      returnFocusRef.current?.focus()
    }
  }, [onOpenChange, open])

  if (typeof document === 'undefined') return null
  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" className="absolute inset-0 bg-overlay/65 backdrop-blur-sm" onClick={() => onOpenChange(false)} aria-label="Fechar diálogo" />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative max-h-[min(88dvh,720px)] w-full max-w-lg overflow-y-auto rounded-t-xl border border-border bg-card shadow-2xl sm:rounded-xl"
          >
            <div className="flex items-start justify-between gap-5 border-b border-border px-5 py-4 sm:px-6">
              <div>
                <h2 id={titleId} className="text-lg font-semibold text-foreground">{title}</h2>
                {description ? <p id={descriptionId} className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p> : null}
              </div>
              <Button ref={closeRef} type="button" variant="ghost" size="xs" className="h-10 w-10 shrink-0 px-0" onClick={() => onOpenChange(false)} aria-label="Fechar"><X className="h-5 w-5" /></Button>
            </div>
            {children ? <div className="px-5 py-5 sm:px-6">{children}</div> : null}
            {footer ? <div className="flex flex-col-reverse gap-2 border-t border-border px-5 py-4 sm:flex-row sm:justify-end sm:px-6">{footer}</div> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

