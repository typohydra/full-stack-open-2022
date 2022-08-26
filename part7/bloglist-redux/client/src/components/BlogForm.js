import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks/index'
import { Button, Form } from '../StyledComponents/form.styled'

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
      <Form onSubmit={handleCreateBlog}>
        <h2>create new</h2>
        <label>title
          <input
            data-cy="title"
            name="title"
            id='title'
            {...title}
          />
        </label>
        <label>author
          <input
            data-cy="author"
            name="author"
            id="author"
            {...author}
          />
        </label>
        <label>url
          <input
            data-cy="url"
            name="url"
            id="url"
            {...url}
          />
        </label>
        <Button data-cy="create" type="submit">
          create
        </Button>
      </Form>
    </>
  )
}

export default BlogForm
