import { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react'

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
  const startPointRef = useRef({ x: 0, y: 0 })
  const movedRef = useRef(false)
  const MOVE_THRESHOLD = 6 // px

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

  const start = useCallback((e: ReactMouseEvent | ReactTouchEvent) => {
    const point = 'touches' in e ? e.touches[0] : (e as ReactMouseEvent)
    draggingRef.current = true
    offsetRef.current = { x: point.clientX - pos.x, y: point.clientY - pos.y }
    startPointRef.current = { x: point.clientX, y: point.clientY }
    movedRef.current = false
    // Improve perf: disable text selection during drag
    document.body.style.userSelect = 'none'
  }, [pos])

  const move = useCallback((e: MouseEvent | TouchEvent) => {
    if (!draggingRef.current) return
    const point = 'touches' in e ? e.touches[0] : (e as MouseEvent)
    if (!movedRef.current) {
      const dx = point.clientX - startPointRef.current.x
      const dy = point.clientY - startPointRef.current.y
      if (Math.hypot(dx, dy) > MOVE_THRESHOLD) movedRef.current = true
    }
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
    isDragging: draggingRef.current,
    isMoved: () => movedRef.current,
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
