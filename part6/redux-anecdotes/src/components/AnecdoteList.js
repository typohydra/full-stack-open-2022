import { useDispatch, useSelector } from 'react-redux'
import { addVoteToAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({anecdote, handleClick}) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.filter
      ? state.anecdotes.filter(anecdote => (
          (anecdote.content).toLowerCase().includes(state.filter.toLowerCase())
        ))
      : state.anecdotes
  })
  const dispatch = useDispatch()

  const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes
        .map(anecdote => 
          <Anecdote
          key={ anecdote.id }
          anecdote={ anecdote }
          handleClick={ () => {
            dispatch(addVoteToAnecdote(anecdote)) 
            dispatch(setNotification(`You voted '${anecdote.content}'`))
            setTimeout(() => { dispatch(removeNotification()) }, 5000)    
          } }
          />
        )
      }
    </div>
  )
}

export default AnecdoteList