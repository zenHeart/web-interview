import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './Popover.css'

interface Props {
  content: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

export default function Popover ({ content, placement = 'bottom', children }: React.PropsWithChildren<Props>) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [style, setStyle] = useState<React.CSSProperties>({})

  function computePosition () {
    const t = triggerRef.current
    const p = popRef.current
    if (!t || !p) return
    const tr = t.getBoundingClientRect()
    const pr = p.getBoundingClientRect()
    let top = 0, left = 0, plc = placement
    if (placement === 'bottom') { top = tr.bottom + 8; left = tr.left + tr.width/2 - pr.width/2 }
    if (placement === 'top') { top = tr.top - pr.height - 8; left = tr.left + tr.width/2 - pr.width/2 }
    if (placement === 'left') { top = tr.top + tr.height/2 - pr.height/2; left = tr.left - pr.width - 8 }
    if (placement === 'right') { top = tr.top + tr.height/2 - pr.height/2; left = tr.right + 8 }
    // simple flip if out of viewport vertically
    const vw = window.innerWidth, vh = window.innerHeight
    if (top + pr.height > vh && placement === 'bottom') { plc = 'top'; top = tr.top - pr.height - 8 }
    if (top < 0 && placement === 'top') { plc = 'bottom'; top = tr.bottom + 8 }
    if (left + pr.width > vw) left = vw - pr.width - 8
    if (left < 0) left = 8
    setStyle({ top: `${top + window.scrollY}px`, left: `${left + window.scrollX}px` })
  }

  useLayoutEffect(() => { if (open) computePosition() }, [open])
  useEffect(() => {
    function onScroll () { if (open) computePosition() }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [open])

  return (
    <>
      <button className="pop-trigger" ref={triggerRef} onClick={() => setOpen(o => !o)} aria-expanded={open}>{children}</button>
      {open && (
        <div className="popover" ref={popRef} style={style} role="dialog" aria-modal={false}>
          {content}
        </div>
      )}
    </>
  )
}
