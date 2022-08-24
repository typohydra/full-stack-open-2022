import { useRef } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

import { useSelector } from 'react-redux'

const Blogs = ({ user }) => {
  const blogFormRef = useRef()

  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} loggedUser={user} />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            loggedUser={user}
          />
        ))
      }
    </div>

  )
}

export default Blogs