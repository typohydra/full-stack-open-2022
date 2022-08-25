import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks/index'

const BlogForm = ({ blogFormRef, loggedUser }) => {
  const dispatch = useDispatch()

  const { reset: titleReset, ...title } = useField('text')
  const { reset: authorReset, ...author } = useField('text')
  const { reset: urlReset, ...url } = useField('text')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    dispatch(createBlog(blog, loggedUser.token))
    titleReset()
    authorReset()
    urlReset()
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input
            data-cy="title"
            name="title"
            {...title}
          />
        </div>
        <div>
          author:
          <input
            data-cy="author"
            name="author"
            {...author}
          />
        </div>
        <div>
          url:
          <input
            data-cy="url"
            name="url"
            {...url}
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
