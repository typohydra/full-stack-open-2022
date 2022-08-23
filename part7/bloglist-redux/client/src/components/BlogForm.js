import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ blogFormRef, loggedUser }) => {
  const dispatch = useDispatch()
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

  const handleTitleChange = ({ target }) =>
    setBlog({ ...blog, title: target.value })
  const handleAuthorChange = ({ target }) =>
    setBlog({ ...blog, author: target.value })
  const handleUrlChange = ({ target }) =>
    setBlog({ ...blog, url: target.value })

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blog, loggedUser.token))
    setBlog({ title: '', author: '', url: '' })
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input
            data-cy="title"
            type="text"
            value={blog.title}
            name="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            data-cy="author"
            type="text"
            value={blog.author}
            name="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            data-cy="url"
            type="text"
            value={blog.url}
            name="url"
            onChange={handleUrlChange}
          />
        </div>
        <button data-cy="create" type="submit">
          create
        </button>
      </form>
    </>
  )
}

export default BlogForm
