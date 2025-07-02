import { useEffect } from 'react'

export default function FunctionComponent ({ value }: { value: string }) {
  useEffect(() => {
    setTimeout(() => {
      console.log('函数组件 props（快照）:', value)
    }, 3000)
  }, [])
  return <div>函数组件当前 value: {value}</div>
}
