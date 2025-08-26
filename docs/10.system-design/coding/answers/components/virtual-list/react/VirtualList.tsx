import React, { useEffect, useMemo, useRef, useState } from 'react'
import './VirtualList.css'

interface Props {
  count: number
  itemHeight: number
  height: number
  renderItem: (index: number) => React.ReactNode
}

export default function VirtualList ({ count, itemHeight, height, renderItem }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const totalHeight = count * itemHeight
  const visibleCount = Math.ceil(height / itemHeight) + 2
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - 1)
  const end = Math.min(count - 1, start + visibleCount)
  const offsetY = start * itemHeight

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    function onScroll () { setScrollTop(el.scrollTop) }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const items = useMemo(() => {
    const arr: React.ReactNode[] = []
    for (let i = start; i <= end; i++) { arr.push(renderItem(i)) }
    return arr
  }, [start, end, renderItem])

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
