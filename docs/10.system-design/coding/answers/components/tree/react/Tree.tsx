import React, { useMemo, useState } from 'react'
import './Tree.css'

export interface TreeNode {
  key: string
  title: string
  children?: TreeNode[]
  disabled?: boolean
}

interface TreeProps {
  data: TreeNode[]
  defaultExpandedKeys?: string[]
  onSelect?: (key: string | undefined, node?: TreeNode) => void
}

export default function Tree ({ data, defaultExpandedKeys = [], onSelect }: TreeProps) {
  const [expanded, setExpanded] = useState(() => new Set(defaultExpandedKeys))
  const [selected, setSelected] = useState<string | undefined>()

  const flat = useMemo(() => data, [data])

  function toggle (key: string) {
    const next = new Set(expanded)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    setExpanded(next)
  }

  function select (key: string | undefined, node?: TreeNode) {
    setSelected(key)
    onSelect?.(key, node)
  }

  function renderNodes (nodes: TreeNode[], level = 0) {
    return (
      <ul className="tree-level" role={level === 0 ? 'tree' : 'group'}>
        {nodes.map(node => {
          const hasChildren = !!(node.children && node.children.length)
          const isExpanded = expanded.has(node.key)
          const isSelected = selected === node.key
          return (
            <li key={node.key} role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined} aria-selected={isSelected} className="tree-item" style={{ paddingLeft: level * 16 }}>
              <span className="tree-toggle" onClick={() => hasChildren && toggle(node.key)}>{hasChildren ? (isExpanded ? '▾' : '▸') : '·'}</span>
              <span className={['tree-title', isSelected ? 'is-selected' : ''].join(' ')} onClick={() => select(node.key, node)}>{node.title}</span>
              {hasChildren && isExpanded && renderNodes(node.children!, level + 1)}
            </li>
          )
        })}
      </ul>
    )
  }

  return <div className="tree">{renderNodes(flat)}</div>
}
