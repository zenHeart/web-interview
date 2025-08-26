import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './Affix.css'

interface Props {
  offsetTop?: number
}

export default function Affix ({ offsetTop = 0, children }: React.PropsWithChildren<Props>) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [fixed, setFixed] = useState(false)
  const [style, setStyle] = useState<React.CSSProperties>({})

  function compute () {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const shouldFix = rect.top <= offsetTop
    if (shouldFix !== fixed) setFixed(shouldFix)
    if (shouldFix) {
      setStyle({ top: `${offsetTop}px`, left: `${rect.left + window.scrollX}px`, width: `${rect.width}px` })
    }
  }

  useLayoutEffect(() => { compute() }, [])
  useEffect(() => {
    function onScroll () { compute() }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])

  return (
    <div className="affix-wrap" ref={wrapRef}>
      <div className={fixed ? 'affix affix-fixed' : 'affix'} style={fixed ? style : undefined}>
        {children}
      </div>
    </div>
  )
}
