import React from 'react'
import './Pagination.css'

interface Props {
  total: number
  pageSize: number
  current: number
  onChange: (page: number) => void
}

function range (start: number, end: number) {
  const arr: number[] = []
  for (let i = start; i <= end; i++) arr.push(i)
  return arr
}

export default function Pagination ({ total, pageSize, current, onChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const go = (p: number) => { if (p < 1 || p > totalPages || p === current) return; onChange(p) }

  const pages: (number | '...')[] = []
  if (totalPages <= 7) {
    pages.push(...range(1, totalPages))
  } else {
    const left = Math.max(2, current - 1)
    const right = Math.min(totalPages - 1, current + 1)
    pages.push(1)
    if (left > 2) pages.push('...')
    pages.push(...range(left, right))
    if (right < totalPages - 1) pages.push('...')
    pages.push(totalPages)
  }

  return (
    <nav className="pager" role="navigation" aria-label="Pagination">
      <button className="pager-btn" disabled={current === 1} onClick={() => go(current - 1)} aria-label="上一页">上一页</button>
      <ul className="pager-list" role="list">
        {pages.map((p, i) => (
          p === '...'
            ? <li key={`e-${i}`} className="pager-ellipsis" aria-hidden>…</li>
            : <li key={p}>
                <button
                  className={['pager-page', p === current ? 'is-current' : ''].join(' ')}
                  aria-current={p === current ? 'page' : undefined}
                  onClick={() => go(p as number)}
                >{p}</button>
              </li>
        ))}
      </ul>
      <button className="pager-btn" disabled={current === totalPages} onClick={() => go(current + 1)} aria-label="下一页">下一页</button>
    </nav>
  )
}
