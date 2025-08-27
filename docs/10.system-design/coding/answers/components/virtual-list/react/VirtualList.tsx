import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import './VirtualList.css'

interface Props {
  count: number
  height: number
  estimatedItemHeight?: number
  overscanPx?: number
  renderItem: (index: number) => React.ReactNode
}

export default function VirtualList ({ count, height, estimatedItemHeight = 30, overscanPx = 120, renderItem }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)

  // Heights cache and a version bump to trigger recalculation after measurements
  const heightsRef = useRef<number[]>(Array.from({ length: count }, () => estimatedItemHeight))
  const [measureVersion, setMeasureVersion] = useState(0)

  // Build offsets (prefix sum of heights)
  const { offsets, totalHeight } = useMemo(() => {
    const offsetsArr = new Array<number>(count)
    let acc = 0
    for (let i = 0; i < count; i++) {
      offsetsArr[i] = acc
      acc += heightsRef.current[i] ?? estimatedItemHeight
    }
    return { offsets: offsetsArr, totalHeight: acc }
  }, [count, measureVersion, estimatedItemHeight])

  // Binary search helpers
  function findStartIndex (scrollTopPx: number): number {
    let low = 0
    let high = count - 1
    while (low <= high) {
      const mid = (low + high) >>> 1
      if (offsets[mid] + (heightsRef.current[mid] ?? estimatedItemHeight) < scrollTopPx) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }
    return Math.max(0, Math.min(count - 1, low))
  }

  function findEndIndex (bottomPx: number): number {
    let low = 0
    let high = count - 1
    while (low <= high) {
      const mid = (low + high) >>> 1
      if (offsets[mid] <= bottomPx) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }
    return Math.max(0, Math.min(count - 1, low))
  }

  const start = useMemo(() => findStartIndex(Math.max(0, scrollTop - overscanPx)), [scrollTop, overscanPx, measureVersion])
  const end = useMemo(() => findEndIndex(scrollTop + height + overscanPx), [scrollTop, height, overscanPx, measureVersion])
  const offsetY = offsets[start] ?? 0

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    function onScroll () { setScrollTop(el.scrollTop) }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // ResizeObserver to track item height changes
  const roRef = useRef<ResizeObserver | null>(null)
  useLayoutEffect(() => {
    if (typeof ResizeObserver === 'undefined') return
    roRef.current = new ResizeObserver(entries => {
      let changed = false
      for (const entry of entries) {
        const target = entry.target as HTMLElement
        const idxAttr = target.getAttribute('data-index')
        if (!idxAttr) continue
        const index = Number(idxAttr)
        const next = Math.ceil(entry.contentRect.height)
        if (next > 0 && heightsRef.current[index] !== next) {
          heightsRef.current[index] = next
          changed = true
        }
      }
      if (changed) setMeasureVersion(v => v + 1)
    })
    return () => {
      roRef.current?.disconnect()
      roRef.current = null
    }
  }, [])

  const items = useMemo(() => {
    const nodes: React.ReactNode[] = []
    const s = start
    const e = Math.min(count - 1, Math.max(s, end))
    for (let i = s; i <= e; i++) {
      nodes.push(
        <div
          key={i}
          className="vl-item"
          data-index={i}
          ref={el => { if (el && roRef.current) roRef.current.observe(el) }}
        >
          {renderItem(i)}
        </div>
      )
    }
    return nodes
  }, [start, end, count, renderItem, measureVersion])

  return (
    <div className="vl-container" ref={containerRef} style={{ height }}>
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {items}
        </div>
      </div>
    </div>
  )
}
