import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ResponsiveDataTableProps<T> = {
  rows: T[]
  headers: string[]
  getKey: (row: T) => string
  renderRow: (row: T) => ReactNode
  renderCard: (row: T) => ReactNode
  empty?: ReactNode
  className?: string
  minWidth?: string
}

export function ResponsiveDataTable<T>({ rows, headers, getKey, renderRow, renderCard, empty, className, minWidth = '720px' }: ResponsiveDataTableProps<T>) {
  if (rows.length === 0) return <>{empty}</>

  return (
    <div className={className}>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm" style={{ minWidth }}>
          <thead className="text-xs uppercase tracking-wider text-muted-foreground">
            <tr>{headers.map((label, index) => <th key={`${label}-${index}`} className="pb-3 font-medium">{label}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-border">{rows.map((row) => <tr key={getKey(row)}>{renderRow(row)}</tr>)}</tbody>
        </table>
      </div>
      <div className="divide-y divide-border md:hidden" role="list">
        {rows.map((row) => <article key={getKey(row)} className={cn('py-4 first:pt-0 last:pb-0')} role="listitem">{renderCard(row)}</article>)}
      </div>
    </div>
  )
}
