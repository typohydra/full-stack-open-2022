import { createSlice } from '@reduxjs/toolkit'

let activeTimerID = null

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
    if(activeTimerID) clearTimeout(activeTimerID)
    dispatch(displayNotification(message))
    activeTimerID = setTimeout(() => { dispatch(removeNotification()) }, 1000 * seconds)    
  }
} 

export const {displayNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer