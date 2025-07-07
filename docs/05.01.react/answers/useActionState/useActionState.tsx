import { useActionState } from 'react'

async function increment (previousState, formData) {
  console.log('increment called with:', previousState, formData)
  return previousState + 1
}

export default function StatefulForm () {
  const [state, formAction] = useActionState(increment, 0)
  return (
    <form>
      {state}
      <button formAction={formAction}>Increment</button>
    </form>
  )
}
