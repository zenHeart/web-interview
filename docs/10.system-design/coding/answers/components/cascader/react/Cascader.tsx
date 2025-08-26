import React, { useEffect, useMemo, useRef, useState } from 'react'
import './Cascader.css'

export interface CascaderOption {
  value: string
  label: string
  isLeaf?: boolean
  children?: CascaderOption[]
  disabled?: boolean
}

interface CascaderProps {
  options: CascaderOption[]
  value?: string[]
  onChange?: (path: string[], options: CascaderOption[]) => void
  placeholder?: string
  loadData?: (selectedPath: CascaderOption[]) => Promise<CascaderOption[]>
}

export default function Cascader ({ options, value, onChange, placeholder = '请选择', loadData }: CascaderProps) {
  const [open, setOpen] = useState(false)
  const [activePath, setActivePath] = useState<CascaderOption[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const columns = useMemo(() => {
    const cols: CascaderOption[][] = []
    cols.push(options)
    for (const opt of activePath) {
      cols.push(opt.children || [])
    }
    return cols
  }, [options, activePath])

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  const displayText = useMemo(() => {
    if (value && value.length) {
      const labels: string[] = []
      let level = options
      for (const v of value) {
        const found = level?.find(o => o.value === v)
        if (!found) break
        labels.push(found.label)
        level = found.children
      }
      return labels.join(' / ')
    }
    return ''
  }, [value, options])

  async function onSelect (levelIndex: number, opt: CascaderOption) {
    if (opt.disabled) return
    const nextPath = activePath.slice(0, levelIndex)
    nextPath[levelIndex] = opt

    // lazy load when needed
    if (!opt.isLeaf && (!opt.children || opt.children.length === 0) && loadData) {
      const children = await loadData(nextPath)
      opt.children = children
    }

    setActivePath(nextPath)

    if (opt.isLeaf || !opt.children || opt.children.length === 0) {
      const pathValues = nextPath.map(o => o.value)
      onChange?.(pathValues, nextPath)
      setOpen(false)
    }
  }

  return (
    <div className="cascader" ref={containerRef}>
      <div className="cascader-trigger" onClick={() => setOpen(o => !o)} role="combobox" aria-expanded={open}>
        <span className={displayText ? '' : 'cascader-placeholder'}>
          {displayText || placeholder}
        </span>
        <span className="cascader-arrow">▾</span>
      </div>
      {open && (
        <div className="cascader-panel" role="tree">
          {columns.map((opts, level) => (
            <ul key={level} className="cascader-col" role="group">
              {opts.length === 0 && <li className="cascader-empty">暂无数据</li>}
              {opts.map(o => (
                <li
                  key={o.value}
                  className={[
                    'cascader-option',
                    activePath[level]?.value === o.value ? 'is-active' : '',
                    o.disabled ? 'is-disabled' : ''
                  ].join(' ')}
                  onClick={() => onSelect(level, o)}
                >
                  <span>{o.label}</span>
                  {!o.isLeaf && <span className="cascader-next">›</span>}
                </li>
              ))}
            </ul>
          ))}
        </div>
      )}
    </div>
  )
}
