import React from 'react'
import './Table.css'

export interface Column { key: string; title: string; width?: number }

interface TableProps<T extends Record<string, any>> {
  columns: Column[]
  data: T[]
}

export default function Table<T extends Record<string, any>> ({ columns, data }: TableProps<T>) {
  return (
    <div className="tbl-wrap" role="table" aria-rowcount={data.length} aria-colcount={columns.length}>
      <table className="tbl">
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={c.key} style={{ width: c.width }} className={i===0 ? 'is-sticky-left' : ''}>{c.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rIdx) => (
            <tr key={rIdx}>
              {columns.map((c, i) => (
                <td key={c.key} className={i===0 ? 'is-sticky-left' : ''}>{String(row[c.key] ?? '')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
