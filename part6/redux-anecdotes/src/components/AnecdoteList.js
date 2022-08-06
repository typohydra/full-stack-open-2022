import { useDispatch, useSelector } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes
        .sort((a,b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote
            key={ anecdote.id }
            anecdote={ anecdote }
            handleClick={ () => dispatch(addVoteTo(anecdote.id)) }
          />
      )}
    </div>
  )
}

export default AnecdoteList