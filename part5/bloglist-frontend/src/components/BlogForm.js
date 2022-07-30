const BlogForm = ({blog, handleTitleChange, handleAuthorChange, handleUrlChange, handleCreateBlog}) => {
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