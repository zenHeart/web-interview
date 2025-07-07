import { useImperativeHandle, useRef } from 'react'

function CustomInput ({ ref }) {
  const inputRef = useRef(null)

  // 使用 useImperativeHandle 来暴露自定义方法
  useImperativeHandle(ref, () => ({
    focus: () => {
      console.log('CustomInput focused')
      inputRef.current?.focus() // 确保 inputRef 存在
      // 实际上可以调用内部的 input.focus() 方法
    },
    clear: () => {
      console.log('CustomInput cleared')
      inputRef.current.value = '' // 清空内部的 input 值
    }
  }))

  return (
    <input ref={inputRef} type="text" placeholder="Custom Input" />
  )
}

export default function App () {
  const inputRef = useRef(null)

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.clear()
    }
  }

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={handleFocus}>Focus Input</button>
      <button onClick={handleClear}>Clear Input</button>
    </div>
  )
}
