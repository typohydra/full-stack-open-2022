import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

  const handleTitleChange = ({ target }) => setBlog({ ...blog, title: target.value })
  const handleAuthorChange = ({ target }) => setBlog({ ...blog, author: target.value })
  const handleUrlChange = ({ target }) => setBlog({ ...blog, url: target.value })

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    createBlog(blog)
    setBlog({ title: '', author: '', url: '' })
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input
            type='text'
            value={blog.title}
            name='title'
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={blog.author}
            name='author'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={blog.url}
            name='url'
            onChange={handleUrlChange}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm