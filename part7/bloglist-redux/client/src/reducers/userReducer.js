import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser, removeUser } = userSlice.actions

export const logInUser = (userCredentials) => {
  return async dispatch => {
    try {
      const loggedUser = await loginService.login(userCredentials)
      dispatch(setUser(loggedUser))
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedUser))
    } catch (exception) {
      dispatch(setNotification({
        text: exception.response.data.error,
        style: 'error',
      }, 3))
    }}
}

export const logOutUser = () => {
  return async dispatch => {
    try {
      window.localStorage.clear()
      dispatch(removeUser(null))
    } catch (exception) {
      dispatch(setNotification({
        text: exception.response.data.error,
        style: 'error',
      }, 3))
    }}
}

export const setLoggedUser = (user) => {
  return async dispatch => {
    dispatch(setUser(user))
  }
}

export default userSlice.reducer