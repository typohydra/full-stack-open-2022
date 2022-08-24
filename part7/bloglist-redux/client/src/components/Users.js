import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const users = useSelector(state => state.users)

  if (users) {
    return (
      <div>
        <h1>Users</h1>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return <div></div>
}

export default Users
