import React from 'react'

interface Props {
  value?: string
  onChange?: (v: string) => void
  min?: string
  max?: string
}

export default function DatePicker ({ value, onChange, min, max }: Props) {
  return (
    <input
      type="date"
      value={value || ''}
      min={min}
      max={max}
      onChange={e => onChange?.(e.target.value)}
      aria-label="日期选择"
    />
  )
}
