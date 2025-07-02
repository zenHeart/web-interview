import { Children } from 'react'

function RowList ({ children }) {
  return (
    <div className="RowList">
      {Children.map(children, child =>
        <div style={{ border: '1px solid #ccc', padding: '5px', margin: '5px' }} className="Row">
          {child}
        </div>
      )}
    </div>
  )
}

function RowListWithChildren ({ children }) {
  return (
    <div className="RowList">
      {children.map((child, index) =>
        <div key={index} style={{ border: '1px solid #ccc', padding: '5px', margin: '5px' }} className="Row">
          {child}
        </div>
      )}
    </div>
  )
}

function MoreRows () {
  return (
    <>
      <p>This is the second item.</p>
      <p>This is the third item.</p>
    </>
  )
}

export default function App () {
  return (
   <>
    <RowList>
      <p>This is the first item.</p>
      <MoreRows />
    </RowList>

    <RowListWithChildren>
      <p>This is the first item.</p>
      <MoreRows />
    </RowListWithChildren>
    </>
  )
}
