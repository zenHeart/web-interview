import React, { useEffect, useState } from 'react'
import Skeleton from './Skeleton'
import './Skeleton.css'

export default function App () {
  const [loading, setLoading] = useState(true)
  useEffect(()=>{ const t=setTimeout(()=>setLoading(false), 1000); return ()=>clearTimeout(t) }, [])
  return (
    <Skeleton loading={loading}>
      <div>内容已加载</div>
    </Skeleton>
  )
}
