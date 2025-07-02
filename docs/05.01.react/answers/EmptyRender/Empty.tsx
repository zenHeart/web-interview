function EmptyRenderNull () {
  return null
}

function EmptyRenderUndefined () {
  return undefined
}
function EmptyRenderFalse () {
  return false
}
function EmptyRenderTrue () {
  return true
}

function App () {
  return (<>
      <p>JSX 返回 null、undefined、false, true 均为空</p>
      <EmptyRenderNull />
      <EmptyRenderUndefined />
      <EmptyRenderFalse />
      <EmptyRenderTrue />
      <p>JSX 渲染 null、undefined、false, true 均为空</p>
      {null}
      {undefined}
      {false}
      {true}
      {0}
      {''}
      <p>注意在条件渲染的时候确保条件为 boolean 值，避免 0 和 '' 被当成 false</p>
      {0 && '0 被错误渲染'}
      {'' && '空字符串被错误渲染'}
   </>)
}

export default App
