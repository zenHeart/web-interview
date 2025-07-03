import React, { useReducer } from 'react'

type State = { count: number, error: string | null };
type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' };

const initialState: State = { count: 0, error: null }

function reducer (state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1, error: null }
    case 'decrement':
      if (state.count <= 0) {
        return { ...state, error: '计数不能小于0' }
      }
      return { ...state, count: state.count - 1, error: null }
    case 'reset':
      return initialState
    default:
      return state
  }
}

export default function UseReducerExample () {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <h3>useReducer 示例</h3>
      <p>计数: {state.count}</p>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      <button onClick={() => dispatch({ type: 'increment' })}>增加</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>减少</button>
      <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
    </div>
  )
}
