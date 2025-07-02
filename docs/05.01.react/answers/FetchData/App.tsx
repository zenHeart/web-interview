import { useState } from 'react'
import UserDataClass from './ClassDemo'
import UserDataFunction from './FunctionDemo'

// 主组件：展示两种方式
function App () {
  const [show, setShow] = useState(true)

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>React 请求发起与取消示例</h1>
      <button onClick={() => setShow(!show)}>
        {show ? '卸载组件（取消请求）' : '挂载组件（重新发起请求）'}
      </button>

      {show && (
        <>
          <UserDataClass />
          <UserDataFunction />
        </>
      )}
    </div>
  )
}

export default App
