import { useState } from 'react'

function Counter () {
  const [age, setAge] = useState(42)

  function increment () {
    setAge(age + 1)
  }

  return (
    <>
      <h1>Your age: {age}</h1>
      <button onClick={() => {
        increment()
        increment()
        increment()
      }}>+3</button>
      <button onClick={() => {
        increment()
      }}>+1</button>
    </>
  )
}

function CallbackUpdateCounter () {
  const [age, setAge] = useState(42)

  function increment () {
    setAge(a => a + 1)
  }

  return (
    <>
      <h1>Your age: {age}</h1>
      <button onClick={() => {
        increment()
        increment()
        increment()
      }}>+3</button>
      <button onClick={() => {
        increment()
      }}>+1</button>
    </>
  )
}

export default function SetStateCallBack () {
  return (
    <div>
      <h2>setState 回调函数示例</h2>
      <p>直接传递状态，多次调用的时候会导致不正确的结果。</p>
      <Counter />
      <p>使用回调函数可以确保每次更新都基于最新的状态。</p>
      <CallbackUpdateCounter />
    </div>
  )
}
