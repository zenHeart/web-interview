import React, { useState, useOptimistic } from 'react'

export default function UseOptimisticExample () {
  const [todos, setTodos] = useState<string[]>([
    '学习React', '学习Hooks', '构建项目'
  ])

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: string) => [...state, newTodo + ' (保存中...)']
  )

  const addTodo = async (text: string) => {
    addOptimisticTodo(text)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setTodos(prev => [...prev, text])
  }

  const [newTodo, setNewTodo] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodo(newTodo)
      setNewTodo('')
    }
  }

  return (
    <div>
      <h3>useOptimistic 示例</h3>
      <form onSubmit={handleSubmit}>
        <input
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="新任务"
        />
        <button type="submit">添加</button>
      </form>
      <ul>
        {optimisticTodos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      <p>useOptimistic 用于在异步操作完成前展示乐观更新的UI状态</p>
    </div>
  )
}
