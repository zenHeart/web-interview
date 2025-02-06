import { useState, useEffect } from 'react'

// Higher Order Component
const withLoading = (WrappedComponent, fetchData) => {
  return function WithLoadingComponent (props) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
      const loadData = async () => {
        try {
          setLoading(true)
          const result = await fetchData()
          setData(result)
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }

      loadData()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    return <WrappedComponent data={data} {...props} />
  }
}

// Example component that displays user data
const UserList = ({ data }) => {
  return (
      <ul>
         {data.map(user => (
            <li key={user.id}>{user.name}</li>
         ))}
      </ul>
  )
}

// Mock API call
const fetchUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Bob Johnson' }
      ])
    }, 1000)
  })
}

const UserListWithLoading = withLoading(UserList, fetchUsers)

const App = () => {
  return (
      <div>
         <h1>Users</h1>
         <UserListWithLoading />
      </div>
  )
}

export default App
