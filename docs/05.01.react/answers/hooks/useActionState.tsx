import React, { useState, useActionState } from 'react'

async function saveData (text: string) {
  await new Promise(resolve => setTimeout(resolve, 2000))
  if (text === 'error') {
    throw new Error('保存失败')
  }
  return `保存成功: ${text}`
}

export default function UseActionStateExample () {
  const [inputText, setInputText] = useState('')

  const [result, saveAction, state] = useActionState(
    async (text: string) => {
      return await saveData(text)
    },
    null
  )

  return (
    <div>
      <h3>useActionState 示例 (React 19)</h3>
      <input
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        placeholder="输入 'error' 触发错误"
      />
      <button
        onClick={() => saveAction(inputText)}
        disabled={state.status === 'pending'}
      >
        {state.status === 'pending' ? '保存中...' : '保存数据'}
      </button>
      {state.status === 'pending' && <p>正在保存...</p>}
      {state.status === 'success' && <p style={{ color: 'green' }}>✓ {result}</p>}
      {state.status === 'error' && <p style={{ color: 'red' }}>✗ {state.error.message}</p>}
      <p>useActionState 用于处理异步操作状态管理，React 19 新增</p>
    </div>
  )
}
