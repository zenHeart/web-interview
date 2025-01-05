/**
 * 问题，一个问题对应一个原问题下的具体考察点
 */

import React from 'react'

const Answer = (props) => {
  return (
      <>
          <details open={props.open ?? false}>
            <summary>
               <strong>解析</strong>
            </summary>
            {props.children}
          </details>
      </>
  )
}

export default Answer
