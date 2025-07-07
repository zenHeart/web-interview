import { useState, useOptimistic } from 'react'

async function updateName (name) {
  // 模拟一个更新名字的 API 调用
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(name)
    }, 1000)
  })
}
function ChangeName ({ currentName, onUpdateName }) {
  const [optimisticName, setOptimisticName] = useOptimistic(currentName)

  const submitAction = async formData => {
    const newName = formData.get('name')
    setOptimisticName(newName + ' (optimistic)')
    const updatedName = await updateName(newName)
    onUpdateName(updatedName)
  }

  return (
    <form action={submitAction}>
      <p>Your name is: {optimisticName}</p>
      <p>
        <label>Change Name:</label>
        <input
          type="text"
          name="name"
          disabled={currentName !== optimisticName}
        />
      </p>
      <button
         type="submit"
      >
        Submit
      </button>
    </form>
  )
}

export default function UpdateNameExample () {
  const [name, setName] = useState()

  return (
    <div>
      <h1>Update Name Example</h1>
      <ChangeName currentName={name} onUpdateName={setName} />
      <p>Current Name: {name}</p>
    </div>
  )
}
