import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addVoteTo(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id) 
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    },
    createAnecdote(state, action) {
      console.log(action.payload);
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVoteTo, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer