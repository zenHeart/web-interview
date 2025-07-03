import React, { useState, useRef, useLayoutEffect } from 'react'

export default function UseLayoutEffectExample () {
  const [width, setWidth] = useState(0)
  const divRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (divRef.current) {
      setWidth(divRef.current.getBoundingClientRect().width)
    }
  }, [])

  return (
    <div>
      <h3>useLayoutEffect 示例</h3>
      <div
        ref={divRef}
        style={{
          border: '1px solid black',
          padding: '10px',
          maxWidth: '400px'
        }}
      >
        这个div的测量宽度是 {width}px
      </div>
      <p>useLayoutEffect 会在浏览器绘制前同步执行，适用于需要在DOM绘制前进行的操作</p>
    </div>
  )
}
