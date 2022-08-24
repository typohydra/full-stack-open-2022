import { useEffect } from 'react'
import Login from './components/Login'
import Notification from './components/Notification'
import Users from './components/Users'
import Blogs from './components/Blogs'
import User from './components/User'
import Blog from './components/Blog'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logOutUser, setLoggedUser } from './reducers/userReducer'

import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setLoggedUser(loggedUser))
    }
  }, [])

  const handleLogout = () => {
    dispatch(logOutUser())
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <Login />
      </div>
    )
  }

  return (
    <Router>
      <Notification />
      <h2>blogs</h2>
      {user.name} logged in
      <div>
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </div>

      <Routes>
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<Blog loggedUser={user} />} />
        <Route path="/" element={<Blogs user={user} />} />
      </Routes>
    </Router>
  )
}

export default App
