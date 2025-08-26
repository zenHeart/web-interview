import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './Tooltip.css'

interface Props { title: React.ReactNode }

export default function Tooltip ({ title, children }: React.PropsWithChildren<Props>) {
  const triggerRef = useRef<HTMLSpanElement>(null)
  const tipRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [style, setStyle] = useState<React.CSSProperties>({})

  function place () {
    const t = triggerRef.current, p = tipRef.current
    if (!t || !p) return
    const tr = t.getBoundingClientRect(), pr = p.getBoundingClientRect()
    const top = tr.bottom + 8 + window.scrollY
    let left = tr.left + tr.width/2 - pr.width/2 + window.scrollX
    const vw = window.innerWidth
    if (left + pr.width > vw) left = vw - pr.width - 8
    if (left < 0) left = 8
    setStyle({ top: `${top}px`, left: `${left}px` })
  }

  useLayoutEffect(() => { if (open) place() }, [open])

  return (
    <span
      className="tip-trigger"
      ref={triggerRef}
      tabIndex={0}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-describedby="tooltip"
    >
      {children}
      {open && (
        <div className="tooltip" ref={tipRef} style={style} role="tooltip" id="tooltip">{title}</div>
      )}
    </span>
  )
}
