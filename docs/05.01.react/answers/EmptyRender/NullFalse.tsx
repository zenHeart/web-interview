import React from 'react'

const Button = (props) => {
  console.log('render', props.onClick)

  if (props.mode === 'null') return null
  if (props.mode === 'false') return false
  if (props.mode === 'undefined') return undefined // ⚠️ React 会报错
  if (props.mode === 'true') return true // ⚠️ React 会报错

  return <button onClick={props.onClick}>Click me</button>
}

const App = () => {
  const [mode, setMode] = React.useState('null')

  return (
    <div>
      <button onClick={() => setMode('null')}>null</button>
      <button onClick={() => setMode('false')}>false</button>
      <button onClick={() => setMode('undefined')}>undefined</button>
      <button onClick={() => setMode('true')}>true</button>
      <button onClick={() => setMode('button')}>show button</button>

      <Button mode={mode} onClick={() => alert('clicked')} />
    </div>
  )
}

export default App
