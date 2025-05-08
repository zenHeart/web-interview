import { ref, effectScope, onScopeDispose } from 'vue'

/**
 * 创建一个可共享的响应式状态
 */
export function createSharedState (factory) {
  let subscribers = 0
  let state = null
  let scope = null

  const dispose = () => {
    if (scope && --subscribers <= 0) {
      scope.stop()
      state = scope = null
    }
  }

  return () => {
    subscribers++

    if (!state) {
      scope = effectScope(true)
      state = scope.run(() => factory())
    }

    onScopeDispose(dispose)
    return state
  }
}

/**
 * 共享计数器状态
 */
export const useSharedCounter = createSharedState(() => {
  const count = ref(0)

  return {
    count,
    increment: () => { count.value++ },
    decrement: () => { count.value-- }
  }
})
