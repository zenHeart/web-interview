import React from 'react'

function ChildrenMapDemo ({ children }: { children: React.ReactNode }) {
  return React.Children.map(children, (child, index) => {
    return React.cloneElement(child as React.ReactElement, {
      key: index,
      style: { border: '1px solid #ccc', padding: '5px', margin: '5px' }
    })
  })
}

function ChildrenMapDemo1 ({ children }: { children: React.ReactNode }) {
  if (children === null || children === undefined) {
    return null
  }
  if (!Array.isArray(children)) {
    return React.cloneElement(children as React.ReactElement, {
      style: { border: '1px solid #ccc', padding: '5px', margin: '5px' }
    })
  } else {
    return children.map((child, index) => {
      return React.cloneElement(child as React.ReactElement, {
        key: index,
        style: { border: '1px solid #ccc', padding: '5px', margin: '5px' }
      })
    })
  }
}

function App () {
  return (
    <div>
      <p>采用 Children.map 会自动兼容个场景</p>
      <ChildrenMapDemo />
      <ChildrenMapDemo>
        <div>Child 1</div>
      </ChildrenMapDemo>
      <ChildrenMapDemo>
        <div>Child 1</div>
        <div>Child 2</div>
      </ChildrenMapDemo>
      <p>采用 children.map 需要自己判断 children 的类型避免错误</p>
      <ChildrenMapDemo1 />
      <ChildrenMapDemo1>
        <div>Child 1</div>
      </ChildrenMapDemo1>
      <ChildrenMapDemo1>
        <div>Child 1</div>
        <div>Child 2</div>
      </ChildrenMapDemo1>
    </div>
  )
}

export default App
