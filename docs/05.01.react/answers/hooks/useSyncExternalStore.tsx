import React, { useSyncExternalStore, useMemo } from 'react'

export default function UseSyncExternalStoreExample () {
  const createStore = (initialValue: number) => {
    let value = initialValue
    const listeners = new Set<() => void>()
    return {
      subscribe: (listener: () => void) => {
        listeners.add(listener)
        return () => listeners.delete(listener)
      },
      getSnapshot: () => value,
      increment: () => {
        value += 1
        listeners.forEach(listener => listener())
      }
    }
  }

  const store = useMemo(() => createStore(0), [])

  const count = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot
  )

  return (
    <div>
      <h3>useSyncExternalStore 示例</h3>
      <p>计数: {count}</p>
      <button onClick={() => store.increment()}>增加</button>
      <p>useSyncExternalStore 用于安全地订阅外部数据源，确保一致性</p>
    </div>
  )
}
