import React, { useEffect, useRef, useState } from 'react'
import './Carousel.css'

interface Props { items: React.ReactNode[]; autoplay?: boolean; interval?: number; width?: number; height?: number }

export default function Carousel ({ items, autoplay=true, interval=2000, width=300, height=160 }: Props) {
  const [index, setIndex] = useState(0)
  const timer = useRef<number | null>(null)
  const count = items.length
  useEffect(() => {
    if (!autoplay) return
    timer.current = window.setInterval(() => setIndex(i => (i + 1) % count), interval)
    return () => { if (timer.current) window.clearInterval(timer.current) }
  }, [autoplay, interval, count])

  function prev(){ setIndex(i => (i - 1 + count) % count) }
  function next(){ setIndex(i => (i + 1) % count) }

  return (
    <div className="car" style={{ width, height }}>
      <div className="car-track" style={{ width: width*count, transform: `translateX(-${index*width}px)` }}>
        {items.map((it, i) => (
          <div key={i} className="car-item" style={{ width, height }}>{it}</div>
        ))}
      </div>
      <button className="car-btn car-prev" onClick={prev} aria-label="上一张">‹</button>
      <button className="car-btn car-next" onClick={next} aria-label="下一张">›</button>
    </div>
  )
}
