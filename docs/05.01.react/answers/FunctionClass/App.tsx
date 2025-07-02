import FunctionComponent from './FunctionComponent'
import ClassComponent from './ClassComponent'
import { useState } from 'react'

export default function App () {
  const [value, setValue] = useState('A')
  return (
    <div>
      <button onClick={() => setValue(v => v === 'A' ? 'B' : 'A')}>切换 value {value}</button>
      <FunctionComponent value={value} />
      <ClassComponent value={value} />
    </div>
  )
}
