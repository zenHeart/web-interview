import { useSyncExternalStore } from 'react'

// 定一订阅函数
function subscribe (callback: () => void) {
  // react 会在内部调用 subrscribe 函数来注册事件监听器
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    // react 会在内部调用返回的函数, 在组件卸载时来取消订阅
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

function getSnapshot () {
  // 获取当前的在线状态
  return navigator.onLine
}

// 封装为自定义钩子
function useOnline () {
  const online = useSyncExternalStore(subscribe, getSnapshot)
  return online
}

function OnlineStatus () {
  const online = useOnline()

  return (
    <div>
      <h1>Online Status</h1>
      <p>{online ? 'You are online' : 'You are offline'}</p>
    </div>
  )
}
export default OnlineStatus
