import React from 'react'
import './Skeleton.css'

interface Props { loading: boolean }

export default function Skeleton ({ loading, children }: React.PropsWithChildren<Props>) {
  if (loading) return <div className="sk" aria-busy="true"><div className="sk-line" /><div className="sk-line" /><div className="sk-line short" /></div>
  return <div aria-busy="false">{children}</div>
}
