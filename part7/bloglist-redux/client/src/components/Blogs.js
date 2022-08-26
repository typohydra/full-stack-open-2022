import { useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Ulist } from '../StyledComponents/list.styled'

const Blogs = ({ user }) => {
  const blogFormRef = useRef()

  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} loggedUser={user} />
      </Togglable>
      <Ulist>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.author}
              </Link>
            </li>
          ))
        }
      </Ulist>
    </div>
  )
}

export default Blogs