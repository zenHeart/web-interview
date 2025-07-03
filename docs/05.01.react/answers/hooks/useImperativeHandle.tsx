import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react'

type CustomInputHandle = {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
};

const CustomInput = forwardRef<CustomInputHandle, { placeholder?: string }>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus()
    },
    clear: () => {
      setValue('')
    },
    getValue: () => value
  }))

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder={props.placeholder}
    />
  )
})

export default function UseImperativeHandleExample () {
  const inputRef = useRef<CustomInputHandle>(null)

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const clearInput = () => {
    inputRef.current?.clear()
  }

  const logValue = () => {
    const value = inputRef.current?.getValue()
    console.log('输入值:', value)
    alert(`输入值: ${value}`)
  }

  return (
    <div>
      <h3>useImperativeHandle 示例</h3>
      <CustomInput ref={inputRef} placeholder="请输入文本" />
      <div>
        <button onClick={focusInput}>聚焦</button>
        <button onClick={clearInput}>清空</button>
        <button onClick={logValue}>获取值</button>
      </div>
      <p>useImperativeHandle 允许你在使用 ref 时自定义暴露给父组件的实例值</p>
    </div>
  )
}
