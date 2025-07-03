import React, { useId } from 'react'

export default function UseIdExample () {
  const id = useId()
  const searchId = useId()

  return (
    <div>
      <h3>useId 示例</h3>
      <div>
        <label htmlFor={id}>用户名:</label>
        <input id={id} />
      </div>
      <div>
        <label htmlFor={`${searchId}-input`}>搜索:</label>
        <input id={`${searchId}-input`} />
        <button id={`${searchId}-button`}>搜索</button>
      </div>
      <p>生成的ID: {id}</p>
      <p>useId 用于生成在客户端和服务器端都一致的唯一ID，非常适合无障碍功能</p>
    </div>
  )
}
