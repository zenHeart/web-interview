import React, { useState } from 'react'

// hooks 示例组件 import
import UseState from './useState'
import UseEffect from './useEffect'
import UseContext from './useContext'
import UseReducer from './useReducer'
import UseCallback from './useCallback'
import UseMemo from './useMemo'
import UseRef from './useRef'
import UseLayoutEffect from './useLayoutEffect'
import UseImperativeHandle from './useImperativeHandle'
import UseDebugValue from './useDebugValue'
import UseId from './useId'
import UseDeferredValue from './useDeferredValue'
import UseTransition from './useTransition'
import UseSyncExternalStore from './useSyncExternalStore'
import UseInsertionEffect from './useInsertionEffect'
import UseOptimistic from './useOptimistic'
import UseActionState from './useActionState'

// hooks 映射
const hookComponents: Record<string, React.ReactElement> = {
  useState: <UseState />,
  useEffect: <UseEffect />,
  useContext: <UseContext />,
  useReducer: <UseReducer />,
  useCallback: <UseCallback />,
  useMemo: <UseMemo />,
  useRef: <UseRef />,
  useLayoutEffect: <UseLayoutEffect />,
  useImperativeHandle: <UseImperativeHandle />,
  useDebugValue: <UseDebugValue />,
  useId: <UseId />,
  useDeferredValue: <UseDeferredValue />,
  useTransition: <UseTransition />,
  useSyncExternalStore: <UseSyncExternalStore />,
  useInsertionEffect: <UseInsertionEffect />,
  useOptimistic: <UseOptimistic />,
  useActionState: <UseActionState />
}

const hookOptions = Object.keys(hookComponents)

export default function ReactHooksDemo () {
  // 当前选中的 hook
  const [selectedHook, setSelectedHook] = useState<string>(hookOptions[0])

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>React Hooks 示例</h1>
      <p>选择下拉框查看各个 Hook 的示例和用法</p>
      <div style={{ marginBottom: 20 }}>
        <select
          value={selectedHook}
          onChange={e => setSelectedHook(e.target.value)}
          style={{ fontSize: 16, padding: '6px 12px' }}
        >
          {hookOptions.map(hook => (
            <option key={hook} value={hook}>
              {hook}
            </option>
          ))}
        </select>
      </div>
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        minHeight: 200
      }}>
        {hookComponents[selectedHook]}
      </div>
    </div>
  )
}
