import { useReducer, useState } from 'react'

// 注意 action 实际上可以传任意结构，只是习惯上通过 action.type 来区分不同的操作
function reducer (state, action) {
  if (action.type === 'addAge') {
    return { ...state, age: state.age + 1 }
  } else if (action.type === 'changeName') {
    return { ...state, name: action.name }
  } else if (action.type === 'reset') {
    return { name: 'tom', age: 3 }
  } else {
    throw new Error('Unknown action type')
  }
}

function UseReducerApp () {
  const [state, dispatch] = useReducer(reducer, { name: 'tom', age: 3 })

  return (
    <div>
      <h1>age: {state.age}, name: {state.name}</h1>
      <button onClick={() => dispatch({ type: 'addAge' })}>Add Age</button>
      <input onChange={(e) => dispatch({ type: 'changeName', name: e.target.value })} />
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  )
}

function UseStateApp () {
  const [name, setName] = useState('tom')
  const [age, setAge] = useState(3)

  return (
     <div>
       <h1>age: {age}, name: {name}</h1>
       <button onClick={() => setAge(age + 1)}>Add Age</button>
       <input onChange={(e) => setName(e.target.value)} />
       <button onClick={() => {
         setName('tom')
         setAge(3)
       }}>Reset</button>
     </div>
  )
}

export default function App () {
  return (
      <div>
         <h2>useReducer vs useState</h2>
         <p>useReducer 更适合复杂状态逻辑，尤其是多个子值依赖于其他子值的情况。</p>
         <UseReducerApp />
         <p>useState 更简单，适合单一状态更新。</p>
         <UseStateApp />
      </div>
  )
}
