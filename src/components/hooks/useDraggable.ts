import { useCallback, useEffect, useRef, useState } from 'react'

export interface DraggableOptions {
  getInitial: () => { x: number; y: number };
  onChange?: (pos: { x: number; y: number }) => void;
  bounds?: { top?: number; left?: number; right?: number; bottom?: number };
}

// A lightweight hook for fixed-position draggable floating widgets.
export function useDraggable (options: DraggableOptions) {
  const { getInitial, onChange, bounds } = options
  const [pos, setPos] = useState<{ x: number; y: number }>(() => getInitial())
  const draggingRef = useRef(false)
  const offsetRef = useRef({ x: 0, y: 0 })

  const clamp = useCallback((x: number, y: number) => {
    const w = window.innerWidth
    const h = window.innerHeight
    const minX = bounds?.left ?? 0
    const minY = bounds?.top ?? 0
    const maxX = (bounds?.right != null) ? (w - bounds.right) : (w)
    const maxY = (bounds?.bottom != null) ? (h - bounds.bottom) : (h)
    return {
      x: Math.min(Math.max(x, minX), maxX),
      y: Math.min(Math.max(y, minY), maxY)
    }
  }, [bounds])

  const start = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const point = 'touches' in e ? e.touches[0] : (e as React.MouseEvent)
    draggingRef.current = true
    offsetRef.current = { x: point.clientX - pos.x, y: point.clientY - pos.y }
    // Improve perf: disable text selection during drag
    document.body.style.userSelect = 'none'
  }, [pos])

  const move = useCallback((e: MouseEvent | TouchEvent) => {
    if (!draggingRef.current) return
    const point = 'touches' in e ? e.touches[0] : (e as MouseEvent)
    const next = clamp(point.clientX - offsetRef.current.x, point.clientY - offsetRef.current.y)
    setPos(next)
    onChange?.(next)
  }, [clamp, onChange])

  const end = useCallback(() => {
    if (!draggingRef.current) return
    draggingRef.current = false
    document.body.style.userSelect = ''
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', move)
    window.addEventListener('touchmove', move, { passive: false })
    window.addEventListener('mouseup', end)
    window.addEventListener('touchend', end)
    window.addEventListener('resize', () => {
      // Re-clamp on resize
      setPos(p => clamp(p.x, p.y))
    })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('touchmove', move)
      window.removeEventListener('mouseup', end)
      window.removeEventListener('touchend', end)
    }
  }, [move, end, clamp])

  return {
    pos,
    bind: {
      onMouseDown: start,
      onTouchStart: start
    },
    style: {
      position: 'fixed' as const,
      left: pos.x,
      top: pos.y
    }
  }
}

export default useDraggable
