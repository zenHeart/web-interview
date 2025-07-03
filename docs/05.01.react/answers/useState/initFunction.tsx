import { useState } from 'react'

function createInitialTodos () {
  const initialTodos = []
  const i = Date.now()
  // 模拟一个耗时操作，确保 useState 的初始化函数被调用
  while (Date.now() - i <= 2e2) ;

  for (let i = 0; i < 10; i++) {
    initialTodos.push({
      id: i,
      text: 'Item ' + (i + 1)
    })
  }

  return initialTodos
}

function App () {
  // 错误的使用 createInitialTodos() 计算初始值，导致每次组件渲染时都会重新计算初始值
  const [todos, setTodos] = useState(createInitialTodos())
  const [text, setText] = useState('')

  return (
    <>
      <input
        value={text}
        // 使用 onChange 更新文本框时，因为初始值每次重复计算导致卡顿
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText('')
          setTodos([
            {
              id: todos.length,
              text
            },
            ...todos
          ])
        }}
      >
        Add
      </button>
      <ul>
        {todos.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </>
  )
}

export default App
