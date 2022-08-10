import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    displayNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(displayNotification(message))
    setTimeout(() => { dispatch(removeNotification()) }, 1000 * seconds)    
  }
} 

export const {displayNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer