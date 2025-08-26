import React, { useMemo, useRef, useState } from 'react'
import './Upload.css'

interface Props {
  chunkSize?: number
  concurrency?: number
}

interface ProgressItem {
  name: string
  size: number
  uploaded: number
  percent: number
  status: 'pending' | 'uploading' | 'done' | 'error' | 'canceled'
}

export default function Upload ({ chunkSize = 256 * 1024, concurrency = 3 }: Props) {
  const [list, setList] = useState<ProgressItem[]>([])
  const abortRef = useRef<{ canceled: boolean }>({ canceled: false })

  function simulateUploadChunk (file: File, start: number, end: number) {
    // simulate network delay per chunk
    return new Promise<void>((resolve) => {
      const duration = 60 + Math.random() * 140
      setTimeout(() => resolve(), duration)
    })
  }

  async function uploadFile (file: File) {
    const total = file.size
    const name = file.name
    const item: ProgressItem = { name, size: total, uploaded: 0, percent: 0, status: 'uploading' }
    setList(prev => [...prev.filter(i => i.name !== name), item])

    const chunks: Array<[number, number]> = []
    for (let start = 0; start < total; start += chunkSize) {
      const end = Math.min(start + chunkSize, total)
      chunks.push([start, end])
    }

    let uploaded = 0
    let cursor = 0

    async function worker () {
      while (cursor < chunks.length && !abortRef.current.canceled) {
        const [start, end] = chunks[cursor++]
        await simulateUploadChunk(file, start, end)
        uploaded += (end - start)
        const percent = Math.min(100, Math.round((uploaded / total) * 100))
        setList(prev => prev.map(i => i.name === name ? { ...i, uploaded, percent } : i))
      }
    }

    const workers = Array.from({ length: Math.min(concurrency, chunks.length) }, () => worker())
    await Promise.all(workers)

    if (abortRef.current.canceled) {
      setList(prev => prev.map(i => i.name === name ? { ...i, status: 'canceled' } : i))
      return
    }
    setList(prev => prev.map(i => i.name === name ? { ...i, status: 'done', percent: 100, uploaded: total } : i))
  }

  function onSelect (e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || !files.length) return
    abortRef.current.canceled = false
    Array.from(files).forEach(uploadFile)
    e.currentTarget.value = ''
  }

  function cancelAll () {
    abortRef.current.canceled = true
  }

  return (
    <div>
      <div className="u-toolbar">
        <input type="file" multiple onChange={onSelect} />
        <button onClick={cancelAll}>取消全部</button>
      </div>
      <ul className="u-list">
        {list.map(item => (
          <li key={item.name} className="u-item">
            <div className="u-row">
              <span className="u-name">{item.name}</span>
              <span className="u-size">{Math.round(item.size/1024)} KB</span>
              <span className={`u-status u-${item.status}`}>{item.status}</span>
            </div>
            <div className="u-bar"><span style={{ width: `${item.percent}%` }} /></div>
          </li>
        ))}
      </ul>
    </div>
  )
}
