import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, loggedUser }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = () => {
    likeBlog({ ...blog, likes: ++blog.likes })
  }

  const handleDeleteBlog = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle} data-cy="blog">
      <div style={hideWhenVisible} className="title-author">
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>view</button>
      </div>
      <div style={showWhenVisible} className="title-author-url-likes">
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(!visible)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {blog.user.username === loggedUser.username ? (
          <button onClick={handleDeleteBlog}>remove</button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default Blog
