import { useDispatch, useSelector } from 'react-redux'
import { addLikeToBlog, deleteBlog, addCommentToBlog } from '../reducers/blogReducer'

import { useParams, useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'

const Blog = ({ loggedUser }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const { reset: commentReset, ...comment } = useField('text')

  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))

  if(!blog) return null

  const handleLike = () => {
    dispatch(addLikeToBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const handleDeleteBlog = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog, loggedUser.token))
      navigate('/')
    }
  }

  const handleAddComment = (event) => {
    event.preventDefault()
    dispatch(addCommentToBlog(blog, comment.value))
    commentReset()
  }

  return (
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <div><a href=''>{blog.url}</a></div>
      <div>
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {
        blog.user.username === loggedUser.username
          ? <button onClick={handleDeleteBlog}>remove</button>
          : ''
      }
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input {...comment}/>
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, key) => (
          <li key={key}>
            {comment}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
