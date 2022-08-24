import { useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = ({ user }) => {
  const blogFormRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} loggedUser={user} />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div style={blogStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        ))
      }
    </div>

  )
}

export default Blogs