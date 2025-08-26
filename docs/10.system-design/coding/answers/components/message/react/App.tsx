import * as Message from './MessageApi'

function App () {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button onClick={() => Message.info('信息提示')}>Info</button>
      <button onClick={() => Message.success('成功提示')}>Success</button>
      <button onClick={() => Message.warning('警告提示')}>Warning</button>
      <button onClick={() => Message.error('错误提示')}>Error</button>
    </div>
  )
}

export default App
