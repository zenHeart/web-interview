import React from 'react'

interface PriorityTagProps {
  priority: string;
}

const PriorityTag: React.FC<PriorityTagProps> = ({ priority }) => {
  const p = priority.toLowerCase()
  const isP0 = p === 'p0'
  const isP1 = p === 'p1'

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 700,
    marginLeft: '8px',
    fontFamily: 'var(--ifm-font-family-monospace)',
    letterSpacing: '0.02em',
    lineHeight: 1.3,
    verticalAlign: 'middle',
    backgroundColor: isP0 ? 'var(--wi-p0-soft)' : isP1 ? 'var(--wi-p1-soft)' : 'var(--wi-p2-soft)',
    color: isP0 ? 'var(--wi-p0)' : isP1 ? 'var(--wi-p1)' : 'var(--wi-p2)',
    border: `1px solid ${isP0 ? 'rgba(220, 38, 38, 0.25)' : isP1 ? 'rgba(5, 150, 105, 0.25)' : 'rgba(100, 116, 139, 0.25)'}`,
    fontFeatureSettings: "'tnum'"
  }

  return <span style={style}>{priority.toUpperCase()}</span>
}

export default PriorityTag
