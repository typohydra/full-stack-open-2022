import { createSlice } from '@reduxjs/toolkit'

let activeTimerID = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    displayNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { displayNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    if(activeTimerID) clearTimeout(activeTimerID)
    dispatch(displayNotification(message))
    activeTimerID = setTimeout(() => { dispatch(clearNotification()) }, 1000 * seconds)
  }
}

export default notificationSlice.reducer