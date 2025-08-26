import React, { useMemo, useState } from 'react'
import './LongText.css'

export default function LongText ({ text, collapsedHeight=60 }: { text: string; collapsedHeight?: number }) {
  const [open, setOpen] = useState(false)
  const style = useMemo(() => ({ maxHeight: open ? 'none' : `${collapsedHeight}px` }), [open, collapsedHeight])
  return (
    <div>
      <div className="lt" style={style}>{text}</div>
      <button className="lt-btn" onClick={() => setOpen(o => !o)}>{open ? '收起' : '展开'}</button>
    </div>
  )
}
