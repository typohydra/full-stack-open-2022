import { Button, CommentForm } from '../StyledComponents/form.styled'
import { Ulist } from '../StyledComponents/list.styled'
import { addCommentToBlog } from '../reducers/blogReducer'
import { useField } from '../hooks/index'
import { useDispatch } from 'react-redux'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const { reset: commentReset, ...comment } = useField('text')

  const handleAddComment = (event) => {
    event.preventDefault()

    if(comment.value.trim()) {
      dispatch(addCommentToBlog(blog, comment.value))
      commentReset()
    }
  }

  return (
    <div>
      <h3>comments</h3>
      <CommentForm onSubmit={handleAddComment}>
        <input {...comment}/>
        <Button>add comment</Button>
      </CommentForm>
      <Ulist>
        {blog.comments.map((comment, key) => (
          <li key={key}>
            {comment}
          </li>
        ))}
      </Ulist>
    </div>
  )
}

export default Comments