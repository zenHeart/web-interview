import { useRef } from 'react'
function MyInput ({ inputRef, ...props }) {
  return <div>
      <label>My Input</label>
      <input type="text" ref={inputRef} {...props} />
  </div>
}
function Parent () {
  const ref = useRef()

  return <div>
      <MyInput inputRef={ref} />
      <button onClick={() => ref.current.focus()}>Focus</button>
   </div>
}
export default Parent
