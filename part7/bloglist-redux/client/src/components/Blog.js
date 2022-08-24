import { useDispatch, useSelector } from 'react-redux'
import { addLikeToBlog, deleteBlog } from '../reducers/blogReducer'

import { useParams, useNavigate } from 'react-router-dom'

const Blog = ({ loggedUser }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
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

  return (
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <div><a href=''>{blog.url}</a></div>
      <div>
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {blog.user.username === loggedUser.username ? (
        <button onClick={handleDeleteBlog}>remove</button>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Blog
