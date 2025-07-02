import { useState, useEffect } from 'react'

// 函数组件
function UserDataFunction () {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetch('https://jsonplaceholder.typicode.com/users/1', {
      signal: controller.signal
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('[Function] Request aborted')
        } else {
          console.error(err)
        }
      })

    return () => controller.abort() // 清理取消请求
  }, [])

  return (
    <div style={{ border: '1px solid #aaa', padding: '10px', margin: '10px' }}>
      <h2>函数组件</h2>
      {loading ? <p>加载中...</p> : <p>用户名：{data.name}</p>}
    </div>
  )
}

export default UserDataFunction
