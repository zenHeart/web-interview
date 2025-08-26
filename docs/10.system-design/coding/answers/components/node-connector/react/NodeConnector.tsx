import React, { useEffect, useRef, useState } from 'react'
import './NodeConnector.css'

interface Point { x: number; y: number }

export default function NodeConnector () {
  const [a, setA] = useState<Point>({ x: 80, y: 80 })
  const [b, setB] = useState<Point>({ x: 260, y: 180 })
  const wrapRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ which: 'a'|'b'|null }>({ which: null })

  function onMouseDown(which: 'a'|'b'){ return (e: React.MouseEvent) => { dragRef.current.which = which } }
  function onMouseUp(){ dragRef.current.which = null }
  function onMouseMove(e: React.MouseEvent){
    if (!dragRef.current.which || !wrapRef.current) return
    const rect = wrapRef.current.getBoundingClientRect()
    const p = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    if (dragRef.current.which === 'a') setA(p)
    else setB(p)
  }

  return (
    <div className="nc-wrap" ref={wrapRef} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
      <svg className="nc-svg" width="100%" height="100%">
        <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#1677ff" strokeWidth="2" />
      </svg>
      <div className="nc-node" style={{ left: a.x - 16, top: a.y - 16 }} onMouseDown={onMouseDown('a')} role="button" aria-label="节点A" />
      <div className="nc-node" style={{ left: b.x - 16, top: b.y - 16 }} onMouseDown={onMouseDown('b')} role="button" aria-label="节点B" />
    </div>
  )
}
