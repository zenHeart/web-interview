import { useState, useDeferredValue } from 'react'
import SlowList from './SlowList.tsx'

function RenderSlowListWithDeferredValue () {
  const [text, setText] = useState('')
  const deferredText = useDeferredValue(text)
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  )
}

function RenderSlowList () {
  const [text, setText] = useState('')
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={text} />
    </>
  )
}

function App () {
  return (
    <div>
      <h2>使用 useDeferredValue 渲染慢速列表</h2>
      <p>输入内容会被延迟处理，避免输入时卡顿</p>
      <RenderSlowListWithDeferredValue />
      <p>直接渲染会导致输入时卡顿</p>
      <RenderSlowList />
    </div>
  )
}

export default App
