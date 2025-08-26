import React, { useEffect, useRef, useState } from 'react'
import './Tabs.css'

interface TabItem { key: string; label: string; content: React.ReactNode }

interface Props { items: TabItem[]; defaultActiveKey?: string }

export default function Tabs ({ items, defaultActiveKey }: Props) {
  const [activeKey, setActiveKey] = useState(defaultActiveKey || items[0]?.key)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const idx = items.findIndex(i => i.key === activeKey)
    const btn = listRef.current?.querySelectorAll<HTMLButtonElement>('[role=tab]')[idx]
    btn?.focus()
  }, [activeKey, items])

  function onKeyDown (e: React.KeyboardEvent) {
    const tabs = items
    const idx = tabs.findIndex(i => i.key === activeKey)
    if (e.key === 'ArrowRight') setActiveKey(tabs[(idx + 1) % tabs.length].key)
    if (e.key === 'ArrowLeft') setActiveKey(tabs[(idx - 1 + tabs.length) % tabs.length].key)
    if (e.key === 'Home') setActiveKey(tabs[0].key)
    if (e.key === 'End') setActiveKey(tabs[tabs.length - 1].key)
  }

  const active = items.find(i => i.key === activeKey)

  return (
    <div className="tabs">
      <div
        className="tablist"
        role="tablist"
        aria-label="Tabs"
        onKeyDown={onKeyDown}
        ref={listRef}
      >
        {items.map((it, i) => (
          <button
            key={it.key}
            role="tab"
            aria-selected={it.key === activeKey}
            tabIndex={it.key === activeKey ? 0 : -1}
            className={[ 'tab', it.key === activeKey ? 'is-active' : '' ].join(' ')}
            onClick={() => setActiveKey(it.key)}
          >{it.label}</button>
        ))}
      </div>
      <div role="tabpanel" className="tabpanel">{active?.content}</div>
    </div>
  )
}
