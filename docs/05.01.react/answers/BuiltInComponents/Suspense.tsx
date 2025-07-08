import { Suspense } from 'react'

async function fetchApiData () {
  // 模拟一个 API 请求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'John Doe' })
    }, 2000)
  })
}

// 实现一个“资源”管理器
function wrapPromise (promise) {
  let status = 'pending'
  let result
  const suspender = promise.then(
    r => {
      status = 'success'
      result = r
    },
    e => {
      status = 'error'
      result = e
    }
  )
  return {
    read () {
      if (status === 'pending') throw suspender
      if (status === 'error') throw result
      return result
    }
  }
}

// 模拟请求
const resource = wrapPromise(fetchApiData().then(data => {
  return data
}))

function DataComponent () {
  const data = resource.read()
  return <div>{data.name}</div>
}

export default function App () {
  return (
    <Suspense fallback={<div>Loading data...</div>}>
      <DataComponent />
    </Suspense>
  )
}
