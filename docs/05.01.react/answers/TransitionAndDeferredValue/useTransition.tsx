import { useState, useTransition } from 'react'

async function apiGennerateId () {
  console.log('触发异步请求')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random().toString(36).substring(2, 15))
    }, (~~(Math.random() * 1000) + 500))
  })
}

function GetId () {
  const [id, setId] = useState(null)
  const [isPending, setPending] = useState(false)

  async function handleClick () {
    setPending(true)
    const newId = await apiGennerateId()
    // 每次更新都会触发渲染
    setId(newId)
    setPending(false)
  }

  return (
    <div>
      <button onClick={handleClick}>获取 ID</button>
      {isPending ? <p>生成中...</p> : id && <p>生成的 ID: {id}</p>}
    </div>
  )
}

function GetIdWithTransition () {
  const [id, setId] = useState(null)
  const [isPending, startTransition] = useTransition()

  async function handleClick () {
    startTransition(async () => {
      const id = await apiGennerateId()
      setId(id)
    })
  }

  return (
    <div>
      <button onClick={handleClick}>获取 ID</button>
      {isPending ? <p>生成中...</p> : id && <p>生成的 ID: {id}</p>}
    </div>
  )
}

function GetIdDemo () {
  return (
    <div>
      <h2>获取 ID 示例</h2>
      <p>不使用 transition 需要手动管理 pending, 每次更新都会触发刷新</p>
      <GetId />
      <p>只会在异步状态结束后才会触发更新避免不必要的渲染</p>
      <GetIdWithTransition />
    </div>
  )
}

export default GetIdDemo
