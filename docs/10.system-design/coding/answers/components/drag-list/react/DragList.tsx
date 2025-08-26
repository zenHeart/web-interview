import React, { useState } from 'react'
import './DragList.css'

interface Props { initial: string[] }

export default function DragList ({ initial }: Props) {
  const [items, setItems] = useState(initial)
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  function onDragStart (index: number) {
    setDragIndex(index)
  }
  function onDragOver (e: React.DragEvent) { e.preventDefault() }
  function onDrop (index: number) {
    if (dragIndex == null || dragIndex === index) return
    const next = items.slice()
    const [moved] = next.splice(dragIndex, 1)
    next.splice(index, 0, moved)
    setItems(next)
    setDragIndex(null)
  }

  return (
    <ul className="dl" role="list" aria-label="可拖拽列表">
      {items.map((text, i) => (
        <li
          key={text}
          className={[ 'dl-item', dragIndex===i? 'is-drag':''].join(' ')}
          draggable
          onDragStart={() => onDragStart(i)}
          onDragOver={onDragOver}
          onDrop={() => onDrop(i)}
          aria-grabbed={dragIndex===i}
        >{text}</li>
      ))}
    </ul>
  )
}
