import React, { useEffect, useRef, useState } from 'react'
import './Elevator.css'

interface Section { id: string; title: string }

export default function Elevator ({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio > 0.65) {
          setActive((e.target as HTMLElement).id)
        }
      })
    }, { threshold: [0.2,0.3,0.4,0.5,0.6,0.7,0.8] })
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [sections])

  function go (id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="elv-wrap" ref={containerRef}>
      <ul className="elv-nav">
        {sections.map(s => (
          <li key={s.id} className={active===s.id? 'active':''} onClick={() => go(s.id)} role="link" aria-current={active===s.id? 'true': undefined}>{s.title}</li>
        ))}
      </ul>
      <div className="elv-content">
        {sections.map(s => (
          <div key={s.id} id={s.id} className="elv-section">{s.title} 内容</div>
        ))}
      </div>
    </div>
  )
}
