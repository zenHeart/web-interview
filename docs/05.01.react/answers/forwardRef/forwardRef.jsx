import { useRef, forwardRef } from 'react'

const MyInput = forwardRef(function MyInput (props, ref) {
  return (
   <div>
      <label>My Input</label>
      <input type="text" ref={ref} {...props} />
   </div>
  )
})

function Parent () {
  const ref = useRef()
  return (
   <div>
      <MyInput ref={ref} />
      <button onClick={() => ref.current.focus()}>Focus</button>
   </div>
  )
}

export default Parent
