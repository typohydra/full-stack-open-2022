import {
  useParams
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Ulist } from '../StyledComponents/list.styled'

const User = () => {
  const id = useParams().id
  const user = useSelector(state => state.users.find(user => user.id === id))

  if (!user) return null

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <Ulist>
        {
          user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))
        }
      </Ulist>
    </div>
  )
}

export default User