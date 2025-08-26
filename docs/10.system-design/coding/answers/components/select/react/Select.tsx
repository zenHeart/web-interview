import React, { useEffect, useMemo, useRef, useState } from 'react'
import './Select.css'

export interface Option { value: string; label: string; disabled?: boolean }

interface SelectProps {
  options: Option[]
  value?: string
  onChange?: (v: string | undefined) => void
  placeholder?: string
}

export default function Select ({ options, value, onChange, placeholder = '请选择' }: SelectProps) {
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase()
    return k ? options.filter(o => o.label.toLowerCase().includes(k)) : options
  }, [keyword, options])

  const selectedOption = useMemo(() => options.find(o => o.value === value), [options, value])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const commit = (opt?: Option) => {
    if (!opt || opt.disabled) return
    onChange?.(opt.value)
    setOpen(false)
    setKeyword('')
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) { setOpen(true); return }
    if (!open) return
    if (e.key === 'Escape') { setOpen(false); return }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const opt = filtered[activeIndex]
      commit(opt)
    }
  }

  useEffect(() => {
    if (activeIndex < 0) return
    const el = listRef.current?.children[activeIndex] as HTMLElement | undefined
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  return (
    <div className="select" onKeyDown={onKeyDown}>
      <div
        className="select-control"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        tabIndex={0}
        onClick={() => setOpen(o => !o)}
      >
        <span className={selectedOption ? '' : 'select-placeholder'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="select-arrow">▾</span>
      </div>
      {open && (
        <div className="select-dropdown">
          <input
            ref={inputRef}
            className="select-input"
            placeholder="搜索..."
            value={keyword}
            onChange={e => { setKeyword(e.target.value); setActiveIndex(0) }}
          />
          <ul ref={listRef} role="listbox" className="select-list">
            {filtered.length === 0 && <li className="select-empty">无匹配项</li>}
            {filtered.map((o, i) => (
              <li
                key={o.value}
                role="option"
                aria-selected={o.value === value}
                className={[
                  'select-option',
                  o.disabled ? 'is-disabled' : '',
                  i === activeIndex ? 'is-active' : ''
                ].join(' ')}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => commit(o)}
              >
                {o.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
